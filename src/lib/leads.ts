import { supabaseServer } from './supabase-server'

/**
 * Server-only access to the `b2c_leads` table (see supabase/migrations).
 * The Supabase project is SHARED with the Supertalent site, whose leads live
 * in `leads` — this site's tables carry the b2c_ prefix to keep them apart.
 * Uses the secret key, which bypasses RLS — never import this from a
 * client component.
 */
const TABLE = 'b2c_leads'
export type Lead = {
  id: string
  created_at: string
  fullname: string
  email: string
  phone: string
  message: string
  updates: boolean
  source: string
}

/** Inserts one submission. Returns false (and logs) on any failure. */
export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<boolean> {
  const supabase = supabaseServer()
  if (!supabase) {
    console.error('Lead storage is not configured: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY')
    return false
  }
  const { error } = await supabase.from(TABLE).insert(lead)
  if (error) {
    console.error('Supabase rejected the lead:', error.message)
    return false
  }
  return true
}

export type LeadFilters = {
  /** Free-text search across every field, case-insensitive. */
  q?: string
  /** Inclusive date bounds, YYYY-MM-DD, interpreted in Asia/Jerusalem. */
  from?: string
  to?: string
}

/** created_at -> the calendar day (YYYY-MM-DD) it fell on in Israel. */
const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem' })

/**
 * Newest first. Filtering happens here in JS rather than in PostgREST: the
 * volume is tiny (a lead-gen form), and it keeps the date maths in Israel's
 * timezone and the search free of PostgREST `or=`/`ilike` escaping pitfalls.
 * Capped so a spam flood cannot blow up the admin page.
 */
export async function listLeads(filters: LeadFilters = {}, limit = 2000): Promise<Lead[]> {
  const supabase = supabaseServer()
  if (!supabase) throw new Error('Lead storage is not configured')
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error(`Failed to load leads: ${error.message}`)

  let leads = data as Lead[]

  const q = filters.q?.trim().toLowerCase()
  if (q) {
    leads = leads.filter((l) =>
      [l.fullname, l.email, l.phone, l.message, l.source].some((v) => v.toLowerCase().includes(q)),
    )
  }
  if (filters.from || filters.to) {
    leads = leads.filter((l) => {
      const day = dayKey.format(new Date(l.created_at))
      if (filters.from && day < filters.from) return false
      if (filters.to && day > filters.to) return false
      return true
    })
  }
  return leads
}
