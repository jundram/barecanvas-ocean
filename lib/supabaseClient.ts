import { createClient } from "@supabase/supabase-js";

// These come from Supabase → Project Settings → API, and get set as
// environment variables in Vercel (and in .env.local for local dev).
//
// IMPORTANT: @supabase/supabase-js throws immediately if given an empty
// string as the URL, which would crash every page that imports this file
// (Photos, Settings/Account) before Supabase is even configured. So we fall
// back to a syntactically valid placeholder URL/key — real network calls
// will simply fail gracefully at runtime (caught and logged) instead of
// crashing at import time.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Convenience helper for the admin-only check once real auth is wired in.
export const OWNER_EMAIL = "j.undram@gmail.com";

export async function getCurrentUserEmail(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.email ?? null;
}

