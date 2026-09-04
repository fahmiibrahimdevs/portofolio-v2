import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import crypto from "crypto";

export const techRoutes = new Hono();

// GET /api/technology (all categories with nested skills)
techRoutes.get("/", async (c) => {
  try {
    const categories = await query("SELECT * FROM tech_categories ORDER BY order_index ASC, created_at ASC");
    const skills = await query("SELECT * FROM tech_skills ORDER BY order_index ASC, created_at ASC");

    const categoryMap = categories.map((cat: any) => ({
      ...cat,
      skills: skills.filter((s: any) => s.category_id === cat.id),
    }));

    return c.json({ categories: categoryMap });
  } catch (err: any) {
    console.error("Get tech stack error:", err);
    return c.json({ error: "Failed to fetch technology stack" }, 500);
  }
});

// GET /api/technology/categories
techRoutes.get("/categories", async (c) => {
  try {
    const categories = await query("SELECT * FROM tech_categories ORDER BY order_index ASC");
    return c.json({ categories });
  } catch (err: any) {
    console.error("Get categories error:", err);
    return c.json({ error: "Failed to fetch categories" }, 500);
  }
});

// POST /api/technology/categories
techRoutes.post("/categories", authMiddleware, async (c) => {
  try {
    const { name, order_index } = await c.req.json();
    if (!name) {
      return c.json({ error: "Category name is required" }, 400);
    }

    const id = "cat-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + crypto.randomUUID().slice(0, 4);
    await execute(
      "INSERT INTO tech_categories (id, name, order_index) VALUES (:id, :name, :order_index)",
      {
        id,
        name,
        order_index: Number(order_index) || 0,
      }
    );

    const created = await queryOne("SELECT * FROM tech_categories WHERE id = :id", { id });
    return c.json({ message: "Category created", category: created }, 201);
  } catch (err: any) {
    console.error("Create category error:", err);
    return c.json({ error: "Failed to create category" }, 500);
  }
});

// PUT /api/technology/categories/:id
techRoutes.put("/categories/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const { name, order_index } = await c.req.json();

    const existing = await queryOne("SELECT id FROM tech_categories WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Category not found" }, 404);
    }

    await execute(
      "UPDATE tech_categories SET name = :name, order_index = :order_index WHERE id = :id",
      {
        id,
        name,
        order_index: Number(order_index) || 0,
      }
    );

    const updated = await queryOne("SELECT * FROM tech_categories WHERE id = :id", { id });
    return c.json({ message: "Category updated", category: updated });
  } catch (err: any) {
    console.error("Update category error:", err);
    return c.json({ error: "Failed to update category" }, 500);
  }
});

// DELETE /api/technology/categories/:id
techRoutes.delete("/categories/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await queryOne("SELECT id FROM tech_categories WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Category not found" }, 404);
    }

    // Delete associated skills first
    await execute("DELETE FROM tech_skills WHERE category_id = :id", { id });
    await execute("DELETE FROM tech_categories WHERE id = :id", { id });

    return c.json({ message: "Category and its skills successfully deleted" });
  } catch (err: any) {
    console.error("Delete category error:", err);
    return c.json({ error: "Failed to delete category" }, 500);
  }
});

// POST /api/technology/skills
techRoutes.post("/skills", authMiddleware, async (c) => {
  try {
    const { category_id, name, icon_url, order_index } = await c.req.json();
    if (!category_id || !name) {
      return c.json({ error: "Category ID and Skill name are required" }, 400);
    }

    const id = "sk-" + crypto.randomUUID().slice(0, 8);
    await execute(
      "INSERT INTO tech_skills (id, category_id, name, icon_url, order_index) VALUES (:id, :category_id, :name, :icon_url, :order_index)",
      {
        id,
        category_id,
        name,
        icon_url: icon_url || "",
        order_index: Number(order_index) || 0,
      }
    );

    const created = await queryOne("SELECT * FROM tech_skills WHERE id = :id", { id });
    return c.json({ message: "Skill created", skill: created }, 201);
  } catch (err: any) {
    console.error("Create skill error:", err);
    return c.json({ error: "Failed to create skill" }, 500);
  }
});

// PUT /api/technology/skills/:id
techRoutes.put("/skills/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const { category_id, name, icon_url, order_index } = await c.req.json();

    const existing = await queryOne("SELECT id FROM tech_skills WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Skill not found" }, 404);
    }

    await execute(
      `UPDATE tech_skills SET
        category_id = :category_id,
        name = :name,
        icon_url = :icon_url,
        order_index = :order_index
      WHERE id = :id`,
      {
        id,
        category_id,
        name,
        icon_url: icon_url || "",
        order_index: Number(order_index) || 0,
      }
    );

    const updated = await queryOne("SELECT * FROM tech_skills WHERE id = :id", { id });
    return c.json({ message: "Skill updated", skill: updated });
  } catch (err: any) {
    console.error("Update skill error:", err);
    return c.json({ error: "Failed to update skill" }, 500);
  }
});

// DELETE /api/technology/skills/:id
techRoutes.delete("/skills/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await queryOne("SELECT id FROM tech_skills WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Skill not found" }, 404);
    }

    await execute("DELETE FROM tech_skills WHERE id = :id", { id });
    return c.json({ message: "Skill successfully deleted" });
  } catch (err: any) {
    console.error("Delete skill error:", err);
    return c.json({ error: "Failed to delete skill" }, 500);
  }
});
