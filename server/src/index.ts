import { Hono } from "hono";
import { cors } from "hono/cors";
import { join } from "path";
import { initDatabase } from "./db/database";
import { authRoutes } from "./routes/auth";
import { profileRoutes } from "./routes/profile";
import { experienceRoutes } from "./routes/experiences";
import { universityRoutes } from "./routes/university";
import { techRoutes } from "./routes/technology";
import { credentialRoutes } from "./routes/credentials";
import { uploadRoutes } from "./routes/upload";
import { projectRoutes } from "./routes/projects";
import { articleRoutes } from "./routes/articles";
import { contactRoutes } from "./routes/contacts";

const app = new Hono();

// CORS Middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Serve uploaded files
const uploadsDir = join(import.meta.dir, "../uploads");
app.get("/uploads/*", async (c) => {
  const rawPath = c.req.path.replace(/^\/uploads\//, "");
  const fullPath = join(uploadsDir, rawPath);
  const file = Bun.file(fullPath);

  if (await file.exists()) {
    return new Response(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
  return c.text("File Not Found", 404);
});

// Health Check
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.route("/api/auth", authRoutes);
app.route("/api/profile", profileRoutes);
app.route("/api/experiences", experienceRoutes);
app.route("/api/university", universityRoutes);
app.route("/api/technology", techRoutes);
app.route("/api/credentials", credentialRoutes);
app.route("/api/upload", uploadRoutes);
app.route("/api/projects", projectRoutes);
app.route("/api/articles", articleRoutes);
app.route("/api/contacts", contactRoutes);

// Serve built frontend assets from client/dist (Production SPA Mode)
const clientDist = join(import.meta.dir, "../../client/dist");

app.get("*", async (c) => {
  const reqPath = c.req.path === "/" ? "/index.html" : c.req.path;
  const filePath = join(clientDist, reqPath);
  const file = Bun.file(filePath);

  if (await file.exists()) {
    return new Response(file);
  }

  // SPA fallback to index.html
  const indexHtml = Bun.file(join(clientDist, "index.html"));
  if (await indexHtml.exists()) {
    return new Response(indexHtml);
  }

  return c.json({
    status: "online",
    message: "Fahmi Ibrahim Portfolio API is running 🚀",
  });
});

// Initialize DB and Start
const PORT = Number(process.env.PORT) || 3002;

async function startServer() {
  try {
    await initDatabase();
    console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

export default {
  port: PORT,
  fetch: app.fetch,
};
