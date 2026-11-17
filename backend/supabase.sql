-- Run this in Supabase: SQL Editor > New query > Run

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  completed boolean not null default false,
  created_at timestamptz default now()
);

create index if not exists tasks_user_id_idx on tasks(user_id);

-- Block public access through the anon key. The backend uses the
-- service role key, which bypasses RLS, so the API keeps working.
alter table users enable row level security;
alter table tasks enable row level security;
