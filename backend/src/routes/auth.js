import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase.js";

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function readCredentials(body = {}) {
  return {
    email: String(body.email || "").trim().toLowerCase(),
    password: String(body.password || ""),
  };
}

// POST /api/auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = readCredentials(req.body);

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (password.length < 6 || password.length > 72) {
      return res
        .status(400)
        .json({ message: "Password must be 6 to 72 characters" });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from("users")
      .insert({ email, password_hash })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({ message: "Email already registered" });
      }
      throw error;
    }

    res.status(201).json({ token: makeToken(data.id) });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = readCredentials(req.body);

    if (!EMAIL_RE.test(email) || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    // Same message for unknown email and wrong password, so attackers
    // can't use this route to check which emails are registered.
    const valid = user && (await bcrypt.compare(password, user.password_hash));
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ token: makeToken(user.id) });
  } catch (err) {
    next(err);
  }
});

export default router;
