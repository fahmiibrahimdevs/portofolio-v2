import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import crypto from "crypto";

export const credentialRoutes = new Hono();

// GET /api/credentials
credentialRoutes.get("/", async (c) => {
  try {
    const credentials = await query("SELECT * FROM credentials ORDER BY order_index ASC, created_at DESC");
    return c.json({ credentials });
  } catch (err: any) {
    console.error("Get credentials error:", err);
    return c.json({ error: "Failed to fetch credentials" }, 500);
  }
});

// POST /api/credentials
credentialRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      title,
      issuer,
      issue_date,
      expiry_date,
      credential_url,
      file_url,
      logo_url,
      order_index,
    } = body;

    if (!title || !issuer) {
      return c.json({ error: "Certificate title and issuer are required" }, 400);
    }

    const id = "cred-" + crypto.randomUUID().slice(0, 8);
    await execute(
      `INSERT INTO credentials (
        id, title, issuer, issue_date, expiry_date, credential_url, file_url, logo_url, order_index
      ) VALUES (
        :id, :title, :issuer, :issue_date, :expiry_date, :credential_url, :file_url, :logo_url, :order_index
      )`,
      {
        id,
        title,
        issuer,
        issue_date: issue_date || "",
        expiry_date: expiry_date || "No Expired",
        credential_url: credential_url || "",
        file_url: file_url || "",
        logo_url: logo_url || "",
        order_index: Number(order_index) || 0,
      }
    );

    const created = await queryOne("SELECT * FROM credentials WHERE id = :id", { id });
    return c.json({ message: "Credential created", credential: created }, 201);
  } catch (err: any) {
    console.error("Create credential error:", err);
    return c.json({ error: "Failed to create credential" }, 500);
  }
});

// PUT /api/credentials/:id
credentialRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const {
      title,
      issuer,
      issue_date,
      expiry_date,
      credential_url,
      file_url,
      logo_url,
      order_index,
    } = body;

    const existing = await queryOne("SELECT id FROM credentials WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Credential not found" }, 404);
    }

    await execute(
      `UPDATE credentials SET
        title = :title,
        issuer = :issuer,
        issue_date = :issue_date,
        expiry_date = :expiry_date,
        credential_url = :credential_url,
        file_url = :file_url,
        logo_url = :logo_url,
        order_index = :order_index,
        updated_at = NOW()
      WHERE id = :id`,
      {
        id,
        title,
        issuer,
        issue_date: issue_date || "",
        expiry_date: expiry_date || "No Expired",
        credential_url: credential_url || "",
        file_url: file_url || "",
        logo_url: logo_url || "",
        order_index: Number(order_index) || 0,
      }
    );

    const updated = await queryOne("SELECT * FROM credentials WHERE id = :id", { id });
    return c.json({ message: "Credential updated", credential: updated });
  } catch (err: any) {
    console.error("Update credential error:", err);
    return c.json({ error: "Failed to update credential" }, 500);
  }
});

// DELETE /api/credentials/:id
credentialRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await queryOne("SELECT id FROM credentials WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Credential not found" }, 404);
    }

    await execute("DELETE FROM credentials WHERE id = :id", { id });
    return c.json({ message: "Credential successfully deleted" });
  } catch (err: any) {
    console.error("Delete credential error:", err);
    return c.json({ error: "Failed to delete credential" }, 500);
  }
});
