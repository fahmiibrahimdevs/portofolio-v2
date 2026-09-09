/**
 * Utility helper to ensure image and thumbnail paths from database,
 * upload responses, or legacy cloud storage resolve to valid, accessible browser URLs.
 */
export function resolveImageUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed) return "";

  // Already a full HTTP/HTTPS URL or Data URI / Blob
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // Already an absolute path on current host (e.g. /uploads/xyz.webp)
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // Legacy R2 cloudflare storage paths (thumbnails/..., images/...)
  if (trimmed.startsWith("thumbnails/") || trimmed.startsWith("images/")) {
    return `https://pub-86b20ee5713942938c6c816f94e1eca1.r2.dev/portofolio/${trimmed}`;
  }

  // Local uploads stored as relative filename (e.g. thumbnail_xyz.webp)
  return `/uploads/${trimmed}`;
}
