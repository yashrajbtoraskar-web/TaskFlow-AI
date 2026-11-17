# TaskFlow AI

A responsive landing page plus a working task manager. React + Tailwind on the frontend, Node.js + Express + Supabase on the backend, JWT authentication.

## Project structure

```
taskflow-ai/
├── frontend/   React (Vite) + Tailwind CSS
└── backend/    Node.js + Express REST API + Supabase
```

## 1. Set up Supabase

1. Create a free project at supabase.com.
2. Open **SQL Editor**, paste the contents of `backend/supabase.sql`, and click **Run**.
3. Go to **Project Settings > API** and copy the **Project URL** and the **service_role** key.

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env     # then fill in your Supabase URL, service key, and JWT secret
npm run dev              # runs on http://localhost:5000
```

Check it works: open `http://localhost:5000/api/health`. You should see `{"status":"ok"}`.

## 3. Run the frontend

```bash
cd frontend
npm install
cp .env.example .env     # optional, defaults to http://localhost:5000/api
npm run dev              # runs on http://localhost:5173
```

## API reference

Base URL: `http://localhost:5000/api`. Send JSON. Protected routes need the header `Authorization: Bearer <token>`.

| Method | Route | Auth | Body | Response |
|---|---|---|---|---|
| GET | `/health` | No | - | `{ status }` |
| POST | `/auth/signup` | No | `{ email, password }` | `201 { token }` |
| POST | `/auth/login` | No | `{ email, password }` | `200 { token }` |
| GET | `/tasks` | Yes | - | Array of tasks |
| POST | `/tasks` | Yes | `{ title }` | `201` task |
| PUT | `/tasks/:id` | Yes | `{ completed }` | Updated task |
| DELETE | `/tasks/:id` | Yes | - | `{ message }` |

A task looks like: `{ "id", "title", "completed", "created_at" }`.

Errors return `{ "message": "..." }` with a matching status code (400, 401, 404, 409, 500).

## Security practices

- Passwords are hashed with bcrypt (12 rounds). They are never stored in plain text.
- Authentication uses signed JWTs that expire after 7 days.
- Secrets live in `.env`, which is git-ignored. The Supabase service key never reaches the browser.
- `helmet` sets secure HTTP headers. CORS only allows the frontend origin.
- Request bodies are limited to 10 KB.
- Every task query filters by `user_id`, so users can only see and change their own tasks.
- Login returns the same error for a wrong password and an unknown email.
- Row Level Security is enabled on both tables.

## Deploy

- **Backend:** push `backend/` to GitHub and deploy on Render. Set the environment variables from `.env` in the Render dashboard. Set `CLIENT_URL` to your frontend URL.
- **Frontend:** push `frontend/` to GitHub and deploy on Vercel. Add `VITE_API_URL=https://your-backend.onrender.com/api` as an environment variable, then redeploy.

## What I'd build next

- Due dates and AI-based task prioritization using an LLM API
- Drag-and-drop reordering
- Password reset by email
