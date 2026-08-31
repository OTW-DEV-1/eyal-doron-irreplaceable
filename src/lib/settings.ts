import { supabaseServer } from './supabase-server'

/**
 * Site settings editable at /admin/settings, stored in the Supabase
 * `b2c_settings` table (see supabase/migrations). The Supabase project is
 * shared with the Supertalent site, hence the b2c_ prefix. An empty
 * contact_to_email means "use the env fallback"; an empty zapier_webhook_url
 * means no webhook is sent at all.
 */
const TABLE = 'b2c_settings'
export type SiteSettings = {
  /** Zapier catch hook that receives every lead. Empty = no webhook is sent. */
  zapier_webhook_url: string
  /** Where lead notification emails go; comma-separated list allowed. */
  contact_to_email: string
}

export const EMPTY_SETTINGS: SiteSettings = { zapier_webhook_url: '', contact_to_email: '' }

const KEYS = Object.keys(EMPTY_SETTINGS) as (keyof SiteSettings)[]

/** Throws when Supabase is unreachable — callers that must not fail should catch. */
export async function getSettings(): Promise<SiteSettings> {
  const supabase = supabaseServer()
  if (!supabase) throw new Error('Settings storage is not configured')
  const { data, error } = await supabase.from(TABLE).select('key, value')
  if (error) throw new Error(`Failed to load settings: ${error.message}`)
  const out = { ...EMPTY_SETTINGS }
  for (const row of data ?? []) {
    if ((KEYS as string[]).includes(row.key)) out[row.key as keyof SiteSettings] = row.value
  }
  return out
}

export async function saveSettings(values: SiteSettings): Promise<void> {
  const supabase = supabaseServer()
  if (!supabase) throw new Error('Settings storage is not configured')
  const rows = KEYS.map((key) => ({ key, value: values[key].trim(), updated_at: new Date().toISOString() }))
  const { error } = await supabase.from(TABLE).upsert(rows, { onConflict: 'key' })
  if (error) throw new Error(`Failed to save settings: ${error.message}`)
}
