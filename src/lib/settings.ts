import { unstable_cache } from 'next/cache'
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
  /** Tracking markup injected at the top of <body> on every page (GTM, GA, pixels). */
  head_scripts: string
  /** Markup injected right after it (e.g. the GTM noscript iframe). */
  body_scripts: string
}

export const EMPTY_SETTINGS: SiteSettings = {
  zapier_webhook_url: '',
  contact_to_email: '',
  head_scripts: '',
  body_scripts: '',
}

/** Revalidation tag for {@link getCachedSettings}; busted whenever settings are saved. */
export const SETTINGS_TAG = 'b2c-settings'

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

/**
 * Cached read for the public site (the root layout). Without it every page view
 * would hit Supabase and the landing page could no longer be prerendered.
 * `saveSettings` callers revalidate SETTINGS_TAG so edits show up immediately.
 */
export const getCachedSettings = unstable_cache(
  async () => getSettings().catch(() => EMPTY_SETTINGS),
  [SETTINGS_TAG],
  { tags: [SETTINGS_TAG], revalidate: 300 },
)
