import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import path from "path";
import fs from "fs";

export const uploadRoutes = new Hono();

const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// POST /api/upload
uploadRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"];

    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file uploaded or invalid file format" }, 400);
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    
    // Allowed extensions: images and documents
    const allowedExtensions = [
      ".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif",
      ".pdf", ".doc", ".docx"
    ];

    if (!allowedExtensions.includes(ext)) {
      return c.json({ error: `File type ${ext} is not allowed` }, 400);
    }

    // Generate safe filename: timestamp_sanitizedName
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const safeFileName = `${Date.now()}_${baseName}${ext}`;
    const targetPath = path.join(UPLOADS_DIR, safeFileName);

    const arrayBuffer = await file.arrayBuffer();
    await Bun.write(targetPath, arrayBuffer);

    const fileUrl = `/uploads/${safeFileName}`;

    return c.json({
      message: "File uploaded successfully",
      url: fileUrl,
      filename: originalName,
      savedName: safeFileName,
      size: file.size,
    }, 201);
  } catch (err: any) {
    console.error("Upload error:", err);
    return c.json({ error: "Failed to upload file" }, 500);
  }
});
