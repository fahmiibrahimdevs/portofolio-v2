import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import crypto from "crypto";

export const universityRoutes = new Hono();

function safeParseJson(data: any, fallback: any = []) {
  if (!data) return fallback;
  if (typeof data === "object") return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
}

// GET /api/university
universityRoutes.get("/", async (c) => {
  try {
    const rows = await query("SELECT * FROM university_achievements ORDER BY order_index ASC, created_at DESC");
    const achievements = rows.map((r: any) => ({
      ...r,
      organizational_involvement: safeParseJson(r.organizational_involvement, []),
      research_experience: safeParseJson(r.research_experience, []),
      key_projects: safeParseJson(r.key_projects, []),
      skills_gained: safeParseJson(r.skills_gained, []),
    }));
    return c.json({ achievements });
  } catch (err: any) {
    console.error("Get university achievements error:", err);
    return c.json({ error: "Failed to fetch university achievements" }, 500);
  }
});

// POST /api/university
universityRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      institution_name,
      institution_logo,
      degree,
      period,
      order_index,
      organizational_involvement,
      research_experience,
      key_projects,
      skills_gained,
    } = body;

    if (!institution_name || !degree || !period) {
      return c.json({ error: "Institution name, degree, and period are required" }, 400);
    }

    const id = "univ-" + crypto.randomUUID().slice(0, 8);

    await execute(
      `INSERT INTO university_achievements (
        id, institution_name, institution_logo, degree, period, order_index,
        organizational_involvement, research_experience, key_projects, skills_gained
      ) VALUES (
        :id, :institution_name, :institution_logo, :degree, :period, :order_index,
        :organizational_involvement, :research_experience, :key_projects, :skills_gained
      )`,
      {
        id,
        institution_name,
        institution_logo: institution_logo || "",
        degree,
        period,
        order_index: Number(order_index) || 0,
        organizational_involvement: JSON.stringify(organizational_involvement || []),
        research_experience: JSON.stringify(research_experience || []),
        key_projects: JSON.stringify(key_projects || []),
        skills_gained: JSON.stringify(skills_gained || []),
      }
    );

    const created = await queryOne("SELECT * FROM university_achievements WHERE id = :id", { id });
    return c.json({
      message: "University achievement created",
      achievement: {
        ...created,
        organizational_involvement: safeParseJson(created.organizational_involvement, []),
        research_experience: safeParseJson(created.research_experience, []),
        key_projects: safeParseJson(created.key_projects, []),
        skills_gained: safeParseJson(created.skills_gained, []),
      },
    }, 201);
  } catch (err: any) {
    console.error("Create university achievement error:", err);
    return c.json({ error: "Failed to create university achievement" }, 500);
  }
});

// PUT /api/university/:id
universityRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const {
      institution_name,
      institution_logo,
      degree,
      period,
      order_index,
      organizational_involvement,
      research_experience,
      key_projects,
      skills_gained,
    } = body;

    const existing = await queryOne("SELECT id FROM university_achievements WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "University achievement not found" }, 404);
    }

    await execute(
      `UPDATE university_achievements SET
        institution_name = :institution_name,
        institution_logo = :institution_logo,
        degree = :degree,
        period = :period,
        order_index = :order_index,
        organizational_involvement = :organizational_involvement,
        research_experience = :research_experience,
        key_projects = :key_projects,
        skills_gained = :skills_gained,
        updated_at = NOW()
      WHERE id = :id`,
      {
        id,
        institution_name,
        institution_logo: institution_logo || "",
        degree,
        period,
        order_index: Number(order_index) || 0,
        organizational_involvement: JSON.stringify(organizational_involvement || []),
        research_experience: JSON.stringify(research_experience || []),
        key_projects: JSON.stringify(key_projects || []),
        skills_gained: JSON.stringify(skills_gained || []),
      }
    );

    const updated = await queryOne("SELECT * FROM university_achievements WHERE id = :id", { id });
    return c.json({
      message: "University achievement updated",
      achievement: {
        ...updated,
        organizational_involvement: safeParseJson(updated.organizational_involvement, []),
        research_experience: safeParseJson(updated.research_experience, []),
        key_projects: safeParseJson(updated.key_projects, []),
        skills_gained: safeParseJson(updated.skills_gained, []),
      },
    });
  } catch (err: any) {
    console.error("Update university achievement error:", err);
    return c.json({ error: "Failed to update university achievement" }, 500);
  }
});

// DELETE /api/university/:id
universityRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await queryOne("SELECT id FROM university_achievements WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "University achievement not found" }, 404);
    }

    await execute("DELETE FROM university_achievements WHERE id = :id", { id });
    return c.json({ message: "University achievement successfully deleted" });
  } catch (err: any) {
    console.error("Delete university achievement error:", err);
    return c.json({ error: "Failed to delete university achievement" }, 500);
  }
});
