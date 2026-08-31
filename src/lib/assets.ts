/**
 * Resolves an image path to its public URL.
 *
 * Images can live in Supabase Storage in production; the same relative paths
 * resolve in both sources — `logos/logo-nestle.png` is the same file either way.
 *
 * Asset hosting is gated on NEXT_PUBLIC_ASSETS_BUCKET (not on the Supabase URL):
 * this project shares the Supertalent Supabase for lead storage, so the URL is
 * set while this site's images are NOT in that project's bucket. Only set
 * NEXT_PUBLIC_ASSETS_BUCKET once a bucket holding THIS site's /public/assets
 * tree exists; until then /public/assets is served.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const ASSETS_BUCKET = process.env.NEXT_PUBLIC_ASSETS_BUCKET

export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '')
  if (!SUPABASE_URL || !ASSETS_BUCKET) return `/assets/${clean}`
  return `${SUPABASE_URL.replace(/\/+$/, '')}/storage/v1/object/public/${ASSETS_BUCKET}/${clean}`
}

/** True when images are served from Supabase rather than the local /public copy. */
export const usingSupabaseAssets = Boolean(SUPABASE_URL && ASSETS_BUCKET)
