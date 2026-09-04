import { Context, Next } from "hono";

interface RateLimiterOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Max requests per window
  message?: string; // Custom error message
}

interface ClientRecord {
  timestamps: number[];
}

/**
 * Extract client IP from various proxy and direct connection headers
 */
export function getClientIp(c: Context): string {
  // 1. Cloudflare header
  const cfIp = c.req.header("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // 2. Standard X-Forwarded-For (can contain multiple comma-separated IPs; first one is client)
  const forwardedFor = c.req.header("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",");
    if (ips.length > 0 && ips[0].trim()) {
      return ips[0].trim();
    }
  }

  // 3. X-Real-IP header (common in Nginx reverse proxies)
  const realIp = c.req.header("x-real-ip");
  if (realIp) return realIp.trim();

  // 4. Fallback to localhost
  return "127.0.0.1";
}

/**
 * Factory for IP-based Sliding Window Rate Limiter middleware
 */
export function createRateLimiter(options: RateLimiterOptions) {
  const {
    windowMs,
    max,
    message = "Too many requests. Please slow down and try again later.",
  } = options;

  // In-memory store: Map<IP, ClientRecord>
  const ipStore = new Map<string, ClientRecord>();

  // Periodic cleanup of stale records every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      const validTimestamps = record.timestamps.filter((t) => now - t < windowMs);
      if (validTimestamps.length === 0) {
        ipStore.delete(ip);
      } else {
        record.timestamps = validTimestamps;
      }
    }
  }, 5 * 60 * 1000);

  return async function rateLimiterMiddleware(c: Context, next: Next) {
    const clientIp = getClientIp(c);
    const now = Date.now();

    let record = ipStore.get(clientIp);
    if (!record) {
      record = { timestamps: [] };
      ipStore.set(clientIp, record);
    }

    // Filter out timestamps outside the sliding window
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

    // Check if client exceeded limit
    if (record.timestamps.length >= max) {
      const oldestTimestamp = record.timestamps[0];
      const resetTimeMs = oldestTimestamp + windowMs;
      const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));

      c.header("Retry-After", String(retryAfterSeconds));
      c.header("X-RateLimit-Limit", String(max));
      c.header("X-RateLimit-Remaining", "0");
      c.header("X-RateLimit-Reset", String(Math.ceil(resetTimeMs / 1000)));

      return c.json(
        {
          error: message,
          retryAfter: retryAfterSeconds,
        },
        429
      );
    }

    // Record this valid request
    record.timestamps.push(now);

    const remaining = max - record.timestamps.length;
    const resetTimeMs = record.timestamps[0] + windowMs;

    c.header("X-RateLimit-Limit", String(max));
    c.header("X-RateLimit-Remaining", String(remaining));
    c.header("X-RateLimit-Reset", String(Math.ceil(resetTimeMs / 1000)));

    await next();
  };
}
