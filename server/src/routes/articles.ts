import { Hono } from "hono";
import { query, queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";
import { formatThumbnailUrl } from "./projects";

export const articleRoutes = new Hono();

// Helper to calculate reading time
function estimateReadingTime(content?: string): number {
  if (!content) return 1;
  const wordCount = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// GET /api/articles/categories
articleRoutes.get("/categories", async (c) => {
  try {
    const categories = await query(
      "SELECT id, name AS category_name, name, order_index FROM tech_categories ORDER BY order_index ASC"
    );
    return c.json({ categories });
  } catch (err: any) {
    console.error("Get article categories error:", err);
    return c.json({ error: "Failed to fetch article categories" }, 500);
  }
});

// GET /api/articles/sub-categories
articleRoutes.get("/sub-categories", async (c) => {
  try {
    const categoryId = c.req.query("category_id");
    let sql = "SELECT id, category_id, name AS sub_category_name, name, icon_url, order_index FROM tech_skills";
    const params: Record<string, any> = {};

    if (categoryId && categoryId !== "all") {
      sql += " WHERE category_id = :categoryId";
      params.categoryId = String(categoryId);
    }

    sql += " ORDER BY order_index ASC, name ASC";
    const subCategories = await query(sql, params);
    return c.json({ subCategories });
  } catch (err: any) {
    console.error("Get article sub-categories error:", err);
    return c.json({ error: "Failed to fetch article sub-categories" }, 500);
  }
});

// GET /api/articles
articleRoutes.get("/", async (c) => {
  try {
    const isAll = c.req.query("all") === "1";
    const categoryId = c.req.query("category");
    const subCategoryId = c.req.query("sub_category");

    let sql = `
      SELECT a.*, tc.name AS category_name, ts.name AS sub_category_name, ts.icon_url AS sub_category_icon 
      FROM article_posts a
      LEFT JOIN tech_categories tc ON a.category_id = tc.id
      LEFT JOIN tech_skills ts ON a.sub_category_id = ts.id
    `;

    const conditions: string[] = [];
    const params: Record<string, any> = {};

    if (!isAll) {
      conditions.push("(a.status_publish = 'Published' OR a.status_publish IS NULL)");
    }

    if (categoryId && categoryId !== "all") {
      conditions.push("a.category_id = :categoryId");
      params.categoryId = String(categoryId);
    }

    if (subCategoryId && subCategoryId !== "all") {
      conditions.push("a.sub_category_id = :subCategoryId");
      params.subCategoryId = String(subCategoryId);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY a.id DESC";

    const rows = await query(sql, params);

    const articles = rows.map((r: any) => ({
      ...r,
      thumbnail_url: formatThumbnailUrl(r.thumbnail),
      read_time_minutes: estimateReadingTime(r.fill_content || r.description),
    }));

    return c.json({ articles, total: articles.length });
  } catch (err: any) {
    console.error("Get articles error:", err);
    return c.json({ error: "Failed to fetch articles" }, 500);
  }
});

// GET /api/articles/:idOrSlug
articleRoutes.get("/:idOrSlug", async (c) => {
  try {
    const idOrSlug = c.req.param("idOrSlug");
    const isNumeric = /^\d+$/.test(idOrSlug);

    const sql = `
      SELECT a.*, tc.name AS category_name, ts.name AS sub_category_name, ts.icon_url AS sub_category_icon 
      FROM article_posts a
      LEFT JOIN tech_categories tc ON a.category_id = tc.id
      LEFT JOIN tech_skills ts ON a.sub_category_id = ts.id
      WHERE ${isNumeric ? "a.id = :id" : "a.slug = :slug"}
      LIMIT 1
    `;

    const article = await queryOne(sql, isNumeric ? { id: Number(idOrSlug) } : { slug: idOrSlug });
    if (!article) {
      return c.json({ error: "Article not found" }, 404);
    }

    return c.json({
      article: {
        ...article,
        thumbnail_url: formatThumbnailUrl(article.thumbnail),
        read_time_minutes: estimateReadingTime(article.fill_content || article.description),
      },
    });
  } catch (err: any) {
    console.error("Get article detail error:", err);
    return c.json({ error: "Failed to fetch article detail" }, 500);
  }
});

// POST /api/articles (Admin)
articleRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      title,
      slug,
      category_id,
      sub_category_id,
      thumbnail,
      description,
      fill_content,
      status_publish,
    } = body;

    if (!title) {
      return c.json({ error: "Article title is required" }, 400);
    }

    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const dateStr = new Date().toISOString().slice(0, 10);

    const result = await execute(
      `INSERT INTO article_posts (
        user_id, category_id, sub_category_id, thumbnail, date, title, slug,
        description, fill_content, status_publish, created_at, updated_at
      ) VALUES (
        '1', :category_id, :sub_category_id, :thumbnail, :date, :title, :slug,
        :description, :fill_content, :status_publish, NOW(), NOW()
      )`,
      {
        category_id: category_id ? String(category_id) : "1",
        sub_category_id: sub_category_id ? String(sub_category_id) : "1",
        thumbnail: thumbnail || "",
        date: dateStr,
        title,
        slug: cleanSlug,
        description: description || "",
        fill_content: fill_content || "",
        status_publish: status_publish || "Published",
      }
    );

    const createdId = result.insertId;
    const created = await queryOne(
      `SELECT a.*, ac.category_name, asc_sub.sub_category_name 
       FROM article_posts a
       LEFT JOIN article_categories ac ON a.category_id = ac.id
       LEFT JOIN article_sub_categories asc_sub ON a.sub_category_id = asc_sub.id
       WHERE a.id = :id`,
      { id: createdId }
    );

    return c.json({
      message: "Article created successfully",
      article: {
        ...created,
        thumbnail_url: formatThumbnailUrl(created.thumbnail),
      },
    }, 201);
  } catch (err: any) {
    console.error("Create article error:", err);
    return c.json({ error: "Failed to create article" }, 500);
  }
});

// PUT /api/articles/:id (Admin)
articleRoutes.put("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const {
      title,
      slug,
      category_id,
      sub_category_id,
      thumbnail,
      description,
      fill_content,
      status_publish,
    } = body;

    const existing = await queryOne("SELECT id FROM article_posts WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Article not found" }, 404);
    }

    await execute(
      `UPDATE article_posts SET
        category_id = :category_id,
        sub_category_id = :sub_category_id,
        thumbnail = :thumbnail,
        title = :title,
        slug = :slug,
        description = :description,
        fill_content = :fill_content,
        status_publish = :status_publish,
        updated_at = NOW()
      WHERE id = :id`,
      {
        id,
        category_id: category_id ? String(category_id) : "1",
        sub_category_id: sub_category_id ? String(sub_category_id) : "1",
        thumbnail: thumbnail || "",
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: description || "",
        fill_content: fill_content || "",
        status_publish: status_publish || "Published",
      }
    );

    const updated = await queryOne(
      `SELECT a.*, ac.category_name, asc_sub.sub_category_name 
       FROM article_posts a
       LEFT JOIN article_categories ac ON a.category_id = ac.id
       LEFT JOIN article_sub_categories asc_sub ON a.sub_category_id = asc_sub.id
       WHERE a.id = :id`,
      { id }
    );

    return c.json({
      message: "Article updated successfully",
      article: {
        ...updated,
        thumbnail_url: formatThumbnailUrl(updated.thumbnail),
      },
    });
  } catch (err: any) {
    console.error("Update article error:", err);
    return c.json({ error: "Failed to update article" }, 500);
  }
});

// DELETE /api/articles/:id (Admin)
articleRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const existing = await queryOne("SELECT id FROM article_posts WHERE id = :id", { id });
    if (!existing) {
      return c.json({ error: "Article not found" }, 404);
    }

    await execute("DELETE FROM article_posts WHERE id = :id", { id });
    return c.json({ message: "Article deleted successfully" });
  } catch (err: any) {
    console.error("Delete article error:", err);
    return c.json({ error: "Failed to delete article" }, 500);
  }
});
