import { Hono } from "hono";
import { queryOne, execute } from "../db/database";
import { generateToken, authMiddleware } from "../middlewares/auth";
import { createRateLimiter } from "../middlewares/rateLimiter";

export const authRoutes = new Hono();

// Rate limiter: Max 10 login attempts per 15 minutes per IP
const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait 15 minutes before trying again.",
});

// POST /api/auth/login
authRoutes.post("/login", loginRateLimiter, async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ error: "Username and password are required" }, 400);
    }

    const user = await queryOne<{
      id: string;
      username: string;
      email: string;
      password_hash: string;
      name: string;
    }>(
      "SELECT id, username, email, password_hash, name FROM admin_users WHERE username = :username OR email = :username",
      { username }
    );

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const isMatch = await Bun.password.verify(password, user.password_hash);
    if (!isMatch) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: "admin",
    });

    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// GET /api/auth/me
authRoutes.get("/me", authMiddleware, async (c) => {
  const authUser = c.get("user");
  const user = await queryOne<{
    id: string;
    username: string;
    email: string;
    name: string;
  }>("SELECT id, username, email, name FROM admin_users WHERE id = :id", {
    id: authUser.userId,
  });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ user });
});

// PUT /api/auth/change-password
authRoutes.put("/change-password", authMiddleware, async (c) => {
  try {
    const authUser = c.get("user");
    const { currentPassword, newPassword } = await c.req.json();

    if (!currentPassword || !newPassword) {
      return c.json({ error: "Current and new passwords are required" }, 400);
    }

    if (newPassword.length < 6) {
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    }

    const user = await queryOne<{ id: string; password_hash: string }>(
      "SELECT id, password_hash FROM admin_users WHERE id = :id",
      { id: authUser.userId }
    );

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const isMatch = await Bun.password.verify(currentPassword, user.password_hash);
    if (!isMatch) {
      return c.json({ error: "Current password is incorrect" }, 400);
    }

    const newHash = await Bun.password.hash(newPassword);
    await execute("UPDATE admin_users SET password_hash = :hash WHERE id = :id", {
      hash: newHash,
      id: user.id,
    });

    return c.json({ message: "Password successfully updated" });
  } catch (err) {
    console.error("Change password error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});
