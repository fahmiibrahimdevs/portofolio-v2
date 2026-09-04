import { Hono } from "hono";
import { queryOne, execute } from "../db/database";
import { authMiddleware } from "../middlewares/auth";

export const profileRoutes = new Hono();

// GET /api/profile
profileRoutes.get("/", async (c) => {
  try {
    const profile = await queryOne(
      "SELECT * FROM profile_settings WHERE id = 'profile_main'"
    );

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ profile });
  } catch (err: any) {
    console.error("Get profile error:", err);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

// PUT /api/profile
profileRoutes.put("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {
      full_name,
      tagline,
      bio,
      avatar_url,
      resume_url,
      resume_filename,
      email,
      github_url,
      linkedin_url,
      youtube_url,
      instagram_url,
      location,
      available_for_work,
    } = body;

    if (!full_name) {
      return c.json({ error: "Full name is required" }, 400);
    }

    await execute(
      `INSERT INTO profile_settings (
        id, full_name, tagline, bio, avatar_url, resume_url, resume_filename, email,
        github_url, linkedin_url, youtube_url, instagram_url, location, available_for_work
      ) VALUES (
        'profile_main', :full_name, :tagline, :bio, :avatar_url, :resume_url, :resume_filename, :email,
        :github_url, :linkedin_url, :youtube_url, :instagram_url, :location, :available_for_work
      ) ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        tagline = VALUES(tagline),
        bio = VALUES(bio),
        avatar_url = VALUES(avatar_url),
        resume_url = VALUES(resume_url),
        resume_filename = VALUES(resume_filename),
        email = VALUES(email),
        github_url = VALUES(github_url),
        linkedin_url = VALUES(linkedin_url),
        youtube_url = VALUES(youtube_url),
        instagram_url = VALUES(instagram_url),
        location = VALUES(location),
        available_for_work = VALUES(available_for_work),
        updated_at = NOW()`,
      {
        full_name,
        tagline: tagline || "",
        bio: bio || "",
        avatar_url: avatar_url || "",
        resume_url: resume_url || "",
        resume_filename: resume_filename || "CV_Fahmi_Ibrahim.pdf",
        email: email || "",
        github_url: github_url || "",
        linkedin_url: linkedin_url || "",
        youtube_url: youtube_url || "",
        instagram_url: instagram_url || "",
        location: location || "Jakarta, Indonesia",
        available_for_work: available_for_work ? 1 : 0,
      }
    );

    const updated = await queryOne("SELECT * FROM profile_settings WHERE id = 'profile_main'");
    return c.json({ message: "Profile successfully updated", profile: updated });
  } catch (err: any) {
    console.error("Update profile error:", err);
    return c.json({ error: "Failed to update profile" }, 500);
  }
});
