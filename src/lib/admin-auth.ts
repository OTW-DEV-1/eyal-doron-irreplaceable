import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Single-password gate for /admin/leads.
 *
 * The session cookie holds an HMAC derived from ADMIN_PASSWORD rather than the
 * password itself, so the password never travels back and forth after login,
 * and changing ADMIN_PASSWORD invalidates every existing session.
 */
const PASSWORD = process.env.ADMIN_PASSWORD

export const ADMIN_COOKIE = 'admin_session'

export function isAdminConfigured(): boolean {
  return Boolean(PASSWORD)
}

export function sessionToken(): string {
  if (!PASSWORD) throw new Error('ADMIN_PASSWORD is not set')
  return createHmac('sha256', PASSWORD).update('leads-admin-v1').digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function isValidPassword(candidate: string): boolean {
  return Boolean(PASSWORD) && safeEqual(candidate, PASSWORD!)
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue || !PASSWORD) return false
  return safeEqual(cookieValue, sessionToken())
}
