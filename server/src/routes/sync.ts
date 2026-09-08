import { Hono } from "hono";
import { resolve } from "path";
import { exportLocalData, pullDataFromRemote } from "../utils/syncEngine";

const router = new Hono();
const uploadsDir = resolve(import.meta.dir, "../../uploads");

function verifyToken(c: any): boolean {
  const authHeader = c.req.header("Authorization") || "";
  const xToken = c.req.header("X-Sync-Token") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim() || xToken.trim();
  const validToken = process.env.SYNC_TOKEN || "portfolio_sync_7e3b91fa02c84d65";
  return Boolean(token && token === validToken);
}

// GET /api/sync/export - Expose entire portfolio database and uploads manifest (protected)
router.get("/export", async (c) => {
  if (!verifyToken(c)) {
    return c.json({ error: "Unauthorized: Invalid or missing sync token." }, 401);
  }

  try {
    const data = await exportLocalData(uploadsDir);
    return c.json(data);
  } catch (error: any) {
    return c.json({ error: `Export failed: ${error.message}` }, 500);
  }
});

// POST /api/sync/pull - Pull latest database and uploads from remote VPS into local
router.post("/pull", async (c) => {
  // Security guard: Prevent running sync pull on VPS production server
  const host = (c.req.header("host") || "").toLowerCase();
  if (host.includes("fahmiibrahim.my.id") || process.env.IS_VPS === "true") {
    return c.json({ error: "Forbidden: Sync pull is strictly disabled on production VPS." }, 403);
  }

  const remoteUrl = process.env.SYNC_REMOTE_URL || "https://fahmiibrahim.my.id";
  const syncToken = process.env.SYNC_TOKEN || "portfolio_sync_7e3b91fa02c84d65";

  const result = await pullDataFromRemote(remoteUrl, syncToken, uploadsDir);
  return c.json(result);
});

export default router;
