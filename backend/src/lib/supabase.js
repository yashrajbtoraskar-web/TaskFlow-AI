import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

// Service role key is server-only. Never expose it to the frontend.
export const supabase = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});