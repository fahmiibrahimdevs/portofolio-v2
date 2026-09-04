import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import { createRateLimiter } from "../middlewares/rateLimiter";
import crypto from "crypto";

export const contactRoutes = new Hono();

// Rate limiter: Max 5 messages per 15 minutes per IP address
const contactRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 messages max
  message: "Too many contact messages sent from your IP address. Please wait a few minutes before trying again.",
});

// POST /api/contacts (Public submit with IP Rate Limiter protection)
contactRoutes.post("/", contactRateLimiter, async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();

    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required" }, 400);
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ error: "Please enter a valid email address" }, 400);
    }

    const id = "msg-" + crypto.randomUUID().slice(0, 8);

    await execute(
      `INSERT INTO contact_messages (id, name, email, subject, message, is_read, created_at)
       VALUES (:id, :name, :email, :subject, :message, 0, NOW())`,
      {
        id,
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message,
      }
    );

    return c.json({
      message: "Thank you for reaching out! Your message has been sent successfully.",
      id,
    }, 201);
  } catch (err: any) {
    console.error("Submit contact error:", err);
    return c.json({ error: "Failed to send message. Please try again later." }, 500);
  }
});

// GET /api/contacts (Admin list)
contactRoutes.get("/", authMiddleware, async (c) => {
  try {
    const messages = await query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    const unreadCount = messages.filter((m: any) => !m.is_read).length;
    return c.json({ messages, unreadCount });
  } catch (err: any) {
    console.error("Get contacts error:", err);
    return c.json({ error: "Failed to fetch contact messages" }, 500);
  }
});

// PUT /api/contacts/:id/read (Admin mark as read)
contactRoutes.put("/:id/read", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const { is_read } = await c.req.json();

    await execute("UPDATE contact_messages SET is_read = :is_read WHERE id = :id", {
      is_read: is_read ? 1 : 0,
      id,
    });

    return c.json({ message: "Message status updated" });
  } catch (err: any) {
    console.error("Update message status error:", err);
    return c.json({ error: "Failed to update message" }, 500);
  }
});

// DELETE /api/contacts/:id (Admin delete message)
contactRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    await execute("DELETE FROM contact_messages WHERE id = :id", { id });
    return c.json({ message: "Message deleted successfully" });
  } catch (err: any) {
    console.error("Delete contact error:", err);
    return c.json({ error: "Failed to delete message" }, 500);
  }
});
