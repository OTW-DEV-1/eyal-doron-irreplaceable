import type { NextConfig } from 'next'
import { execSync } from 'node:child_process'

/**
 * Build stamp: the short git SHA this server was built (or, in dev, started)
 * from. Rendered as <meta name="build-commit"> so anyone can confirm which
 * version a browser is showing:
 *   document.querySelector('meta[name="build-commit"]').content
 */
let buildCommit = 'unknown'
try {
  buildCommit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim()
} catch {
  // Not a git checkout — the stamp stays "unknown".
}

/**
 * Images can be served from Supabase Storage in production and from
 * /public/assets in local development (see src/lib/assets.ts).
 */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILD_COMMIT: buildCommit },
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }]
      : [],
  },
}

export default nextConfig
