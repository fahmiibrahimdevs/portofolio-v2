import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";

export const projectRoutes = new Hono();

// Helper to format thumbnail URL
export function formatThumbnailUrl(thumbnail?: string | null): string {
  if (!thumbnail) return "";
  if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
    return thumbnail;
  }
  if (thumbnail.startsWith("/uploads/")) {
    return thumbnail;
  }
  if (thumbnail.startsWith("thumbnails/") || thumbnail.startsWith("images/")) {
    return `https://pub-86b20ee5713942938c6c816f94e1eca1.r2.dev/portofolio/${thumbnail}`;
  }
  return `/uploads/${thumbnail}`;
}

// GET /api/projects/categories
projectRoutes.get("/categories", async (c) => {
  try {
    const categories = await query("SELECT * FROM project_categories ORDER BY id ASC");
    return c.json({ categories });
  } catch (err: any) {
    console.error("Get project categories error:", err);
    return c.json({ error: "Failed to fetch project categories" }, 500);
  }
});

// GET /api/projects/tags
projectRoutes.get("/tags", async (c) => {
  try {
    const tags = await query("SELECT * FROM project_tags ORDER BY id ASC");
    return c.json({ tags });
  } catch (err: any) {
    console.error("Get project tags error:", err);
    return c.json({ error: "Failed to fetch project tags" }, 500);
  }
});

// GET /api/projects
projectRoutes.get("/", async (c) => {
  try {
    const isAll = c.req.query("all") === "1";
    const categoryId = c.req.query("category");
    
    let sql = `
      SELECT p.*, pc.category_name, pc.category_desc 
      FROM projects p
      LEFT JOIN project_categories pc ON p.category_id = pc.id
    `;

    const conditions: string[] = [];
    const params: Record<string, any> = {};

    if (!isAll) {
      conditions.push("(p.status_publish = 'Published' OR p.status_publish IS NULL)");
    }

    if (categoryId && categoryId !== "all") {
      conditions.push("p.category_id = :categoryId");
      params.categoryId = categoryId;
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY p.id DESC";

    const rows = await query(sql, params);
    const tags = await query("SELECT * FROM project_tags");
    const tagMap = new Map(tags.map((t: any) => [String(t.id), t.tag_name]));

    const projects = rows.map((r: any) => {
      // Parse tags
      let tagNames: string[] = [];
      if (r.tag_id) {
        const tagIds = String(r.tag_id).split(",").map((s) => s.trim());
        tagNames = tagIds.map((id) => tagMap.get(id) || id).filter(Boolean);
      }

      return {
        ...r,
        thumbnail_url: formatThumbnailUrl(r.thumbnail),
        tags: tagNames,
      };
    });

    return c.json({ projects, total: projects.length });
  } catch (err: any) {
    console.error("Get projects error:", err);
    return c.json({ error: "Failed to fetch projects" }, 500);
  }
});

// GET /api/projects/:idOrSlug
projectRoutes.get("/:idOrSlug", async (c) => {
  try {
    const idOrSlug = c.req.param("idOrSlug");
    const isNumeric = /^\d+$/.test(idOrSlug);

    const sql = `
      SELECT p.*, pc.category_name, pc.category_desc 
      FROM projects p
      LEFT JOIN project_categories pc ON p.category_id = pc.id
      WHERE ${isNumeric ? "p.id = :id" : "p.slug = :slug"}
      LIMIT 1
    `;

    const project = await queryOne(sql, isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug });
    if (!project) {
      return c.json({ error: "Project not found" }, 404);
    }

    const tags = await query("SELECT * FROM project_tags");
    const tagMap = new Map(tags.map((t: any) => [String(t.id), t.tag_name]));
    let tagNames: string[] = [];
    if (project.tag_id) {
      const tagIds = String(project.tag_id).split(",").map((s) => s.trim());
      tagNames = tagIds.map((id) => tagMap.get(id) || id).filter(Boolean);
    }

    return c.json({
      project: {
        ...project,
        thumbnail_url: formatThumbnailUrl(project.thumbnail),
        tags: tagNames,
      },
    });
  } catch (err: any) {
    console.error("Get project detail error:", err);
    return c.json({ error: "Failed to fetch project detail" }, 500);
  }
});

// POST /api/projects (Admin)
projectRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      title,
      slug,
      category_id,
      tag_id,
      thumbnail,
      short_desc,
      description,
      status_publish,
      link_github,
      link_demo,
      version,
    } = body;

    if (!title) {
      return c.json({ error: "Project title is required" }, 400);
    }

    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const dateStr = new Date().toISOString().slice(0, 16).replace("T", " ");

    const result = await execute(
      `INSERT INTO projects (
        user_id, category_id, tag_id, thumbnail, date, title, slug, price,
        short_desc, description, status_publish, version, link_demo, link_github,
        created_at, updated_at
      ) VALUES (
        '1', :category_id, :tag_id, :thumbnail, :date, :title, :slug, '0',
        :short_desc, :description, :status_publish, :version, :link_demo, :link_github,
        NOW(), NOW()
      )`,
      {
        category_id: category_id ? String(category_id) : "1",
        tag_id: tag_id ? String(tag_id) : "",
        thumbnail: thumbnail || "",
        date: dateStr,
        title,
        slug: cleanSlug,
        short_desc: short_desc || "",
        description: description || "",
        status_publish: status_publish || "Published",
        version: version || "1.0.0",
        link_demo: link_demo || "",
        link_github: link_github || "",
      }
    );

    const createdId = result.insertId;
    const created = await queryOne("SELECT * FROM projects WHERE id = :id", { id: createdId });

    return c.json({
      message: "Project created successfully",
      project: {
        ...created,
        thumbnail_url: formatThumbnailUrl(created.thumbnail),
      },
    }, 201);
  } catch (err: any) {
    console.error("Create project error:", err);
    return c.json({ error: "Failed to create project" }, 500);
  }
});

// PUT /api/projects/:id (Admin)
projectRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const {
      title,
      slug,
      category_id,
      tag_id,
      thumbnail,
      short_desc,
      description,
      status_publish,
      link_github,
      link_demo,
      version,
    } = body;

    const existing = await queryOne("SELECT id FROM projects WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Project not found" }, 404);
    }

    await execute(
      `UPDATE projects SET
        category_id = :category_id,
        tag_id = :tag_id,
        thumbnail = :thumbnail,
        title = :title,
        slug = :slug,
        short_desc = :short_desc,
        description = :description,
        status_publish = :status_publish,
        version = :version,
        link_demo = :link_demo,
        link_github = :link_github,
        updated_at = NOW()
      WHERE id = :id`,
      {
        id,
        category_id: category_id ? String(category_id) : "1",
        tag_id: tag_id ? String(tag_id) : "",
        thumbnail: thumbnail || "",
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        short_desc: short_desc || "",
        description: description || "",
        status_publish: status_publish || "Published",
        version: version || "1.0.0",
        link_demo: link_demo || "",
        link_github: link_github || "",
      }
    );

    const updated = await queryOne("SELECT * FROM projects WHERE id = :id", { id });
    return c.json({
      message: "Project updated successfully",
      project: {
        ...updated,
        thumbnail_url: formatThumbnailUrl(updated.thumbnail),
      },
    });
  } catch (err: any) {
    console.error("Update project error:", err);
    return c.json({ error: "Failed to update project" }, 500);
  }
});

// DELETE /api/projects/:id (Admin)
projectRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const existing = await queryOne("SELECT id FROM projects WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Project not found" }, 404);
    }

    await execute("DELETE FROM projects WHERE id = :id", { id });
    return c.json({ message: "Project deleted successfully" });
  } catch (err: any) {
    console.error("Delete project error:", err);
    return c.json({ error: "Failed to delete project" }, 500);
  }
});
