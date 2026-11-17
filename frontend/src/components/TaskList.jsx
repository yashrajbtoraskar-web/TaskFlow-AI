import { useEffect, useState } from "react";
import { request } from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await request("/tasks");
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const task = await request("/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      setTasks((prev) => [task, ...prev]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(task) {
    try {
      const updated = await request(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !task.completed }),
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      await request(`/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const done = tasks.filter((t) => t.completed).length;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your tasks</h2>
        <span className="text-sm text-slate-400">
          {done}/{tasks.length} done
        </span>
      </div>

      <form onSubmit={addTask} className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="What needs to get done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          className="input flex-1"
        />
        <button type="submit" className="btn-primary px-5">
          Add
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {loading && <p className="text-slate-400">Loading...</p>}
        {!loading && tasks.length === 0 && (
          <p className="text-slate-400">No tasks yet. Add your first one above.</p>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900 px-4 py-3 transition hover:border-indigo-400/40"
          >
            <label className="flex min-w-0 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
                className="h-4 w-4 shrink-0 accent-indigo-500"
              />
              <span
                className={`truncate ${task.completed ? "text-slate-500 line-through" : ""}`}
              >
                {task.title}
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className="shrink-0 text-sm text-red-400 transition hover:text-red-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
