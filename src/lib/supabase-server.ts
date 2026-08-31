import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client authenticated with the secret key, which bypasses RLS.
 * Server-side only — never import from a client component.
 * Returns null when the env vars are missing (local dev without Supabase).
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

export function supabaseServer(): SupabaseClient | null {
  if (!SUPABASE_URL || !SECRET_KEY) return null
  return createClient(SUPABASE_URL, SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
