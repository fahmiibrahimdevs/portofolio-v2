import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import crypto from "crypto";

export const experienceRoutes = new Hono();

// Helper to normalize description points
function parsePoints(points: any): string[] {
  if (!points) return [];
  if (Array.isArray(points)) return points;
  try {
    const parsed = JSON.parse(points);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

// GET /api/experiences
experienceRoutes.get("/", async (c) => {
  try {
    const rows = await query("SELECT * FROM work_experiences ORDER BY order_index ASC, created_at DESC");
    const experiences = rows.map((r: any) => ({
      ...r,
      description_points: parsePoints(r.description_points),
      is_current: Boolean(r.is_current),
    }));
    return c.json({ experiences });
  } catch (err: any) {
    console.error("Get experiences error:", err);
    return c.json({ error: "Failed to fetch experiences" }, 500);
  }
});

// POST /api/experiences
experienceRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      company_name,
      company_url,
      company_logo,
      role_title,
      employment_type,
      location,
      start_date,
      end_date,
      is_current,
      order_index,
      description_points,
    } = body;

    if (!company_name || !role_title || !start_date) {
      return c.json({ error: "Company name, role title, and start date are required" }, 400);
    }

    const id = "exp-" + crypto.randomUUID().slice(0, 8);
    const pointsJson = JSON.stringify(Array.isArray(description_points) ? description_points : []);

    await execute(
      `INSERT INTO work_experiences (
        id, company_name, company_url, company_logo, role_title, employment_type,
        location, start_date, end_date, is_current, order_index, description_points
      ) VALUES (
        :id, :company_name, :company_url, :company_logo, :role_title, :employment_type,
        :location, :start_date, :end_date, :is_current, :order_index, :description_points
      )`,
      {
        id,
        company_name,
        company_url: company_url || "",
        company_logo: company_logo || "",
        role_title,
        employment_type: employment_type || "Full-time",
        location: location || "",
        start_date,
        end_date: is_current ? "Present" : (end_date || "Present"),
        is_current: is_current ? 1 : 0,
        order_index: Number(order_index) || 0,
        description_points: pointsJson,
      }
    );

    const created = await queryOne("SELECT * FROM work_experiences WHERE id = :id", { id });
    return c.json({
      message: "Experience created",
      experience: {
        ...created,
        description_points: parsePoints(created.description_points),
        is_current: Boolean(created.is_current),
      },
    }, 201);
  } catch (err: any) {
    console.error("Create experience error:", err);
    return c.json({ error: "Failed to create experience" }, 500);
  }
});

// PUT /api/experiences/:id
experienceRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const {
      company_name,
      company_url,
      company_logo,
      role_title,
      employment_type,
      location,
      start_date,
      end_date,
      is_current,
      order_index,
      description_points,
    } = body;

    const existing = await queryOne("SELECT id FROM work_experiences WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Experience not found" }, 404);
    }

    const pointsJson = JSON.stringify(Array.isArray(description_points) ? description_points : []);

    await execute(
      `UPDATE work_experiences SET
        company_name = :company_name,
        company_url = :company_url,
        company_logo = :company_logo,
        role_title = :role_title,
        employment_type = :employment_type,
        location = :location,
        start_date = :start_date,
        end_date = :end_date,
        is_current = :is_current,
        order_index = :order_index,
        description_points = :description_points,
        updated_at = NOW()
      WHERE id = :id`,
      {
        id,
        company_name,
        company_url: company_url || "",
        company_logo: company_logo || "",
        role_title,
        employment_type: employment_type || "Full-time",
        location: location || "",
        start_date,
        end_date: is_current ? "Present" : (end_date || "Present"),
        is_current: is_current ? 1 : 0,
        order_index: Number(order_index) || 0,
        description_points: pointsJson,
      }
    );

    const updated = await queryOne("SELECT * FROM work_experiences WHERE id = :id", { id });
    return c.json({
      message: "Experience updated",
      experience: {
        ...updated,
        description_points: parsePoints(updated.description_points),
        is_current: Boolean(updated.is_current),
      },
    });
  } catch (err: any) {
    console.error("Update experience error:", err);
    return c.json({ error: "Failed to update experience" }, 500);
  }
});

// DELETE /api/experiences/:id
experienceRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await queryOne("SELECT id FROM work_experiences WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Experience not found" }, 404);
    }

    await execute("DELETE FROM work_experiences WHERE id = :id", { id });
    return c.json({ message: "Experience successfully deleted" });
  } catch (err: any) {
    console.error("Delete experience error:", err);
    return c.json({ error: "Failed to delete experience" }, 500);
  }
});
