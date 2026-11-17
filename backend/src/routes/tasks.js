import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Every task route requires a logged-in user
router.use(requireAuth);

// GET /api/tasks
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, completed, created_at")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks   body: { title }
router.post("/", async (req, res, next) => {
  try {
    const title = String(req.body.title || "").trim();

    if (!title || title.length > 200) {
      return res
        .status(400)
        .json({ message: "Title is required (max 200 characters)" });
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, user_id: req.user.id })
      .select("id, title, completed, created_at")
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id   body: { completed }
router.put("/:id", async (req, res, next) => {
  try {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ message: "completed must be true or false" });
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: req.body.completed })
      .eq("id", req.params.id)
      .eq("user_id", req.user.id)
      .select("id, title, completed, created_at")
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Task not found" });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", req.user.id)
      .select("id")
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
