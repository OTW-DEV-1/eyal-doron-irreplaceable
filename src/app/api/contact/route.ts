import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { saveLead } from '@/lib/leads'
import { EMPTY_SETTINGS, getSettings } from '@/lib/settings'

export const runtime = 'nodejs'

const FROM = process.env.CONTACT_FROM_EMAIL
const API_KEY = process.env.RESEND_API_KEY
/** Fallback when /admin/settings has no value stored. */
const ENV_TO = process.env.CONTACT_TO_EMAIL

type Payload = {
  fullname?: unknown
  email?: unknown
  phone?: unknown
  message?: unknown
  updates?: unknown
  /** Full URL of the page the form was submitted from. */
  source?: unknown
  /** Honeypot — real users never fill this. */
  website?: unknown
}

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/**
 * Naive per-IP throttle. This is a single-page marketing site with one form, so
 * an in-process map is proportionate; it resets on redeploy, which is fine.
 */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

/** Header injection guard: a newline in the reply-to would let a submitter add headers. */
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  // Silently accept honeypot hits so bots do not learn they were caught.
  if (str(body.website)) return NextResponse.json({ ok: true })

  const fullname = str(body.fullname, 120)
  const email = str(body.email, 160)
  const phone = str(body.phone, 40)
  const message = str(body.message, 4000)
  // The checkbox posts "on" via FormData; anything truthy counts as consent.
  const updates = body.updates === true || str(body.updates) !== ''
  // Prefer the URL the browser reported; fall back to the Referer header.
  const source = str(body.source, 2000) || str(req.headers.get('referer') ?? '', 2000)

  // Mirrors the `required` attributes on the form; the message is optional there.
  if (!fullname || !email || !phone || !updates) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'bad_email' }, { status: 400 })
  }

  const rows: [string, string][] = (
    [
      ['שם מלא', fullname],
      ['טלפון', phone],
      ['אימייל', email],
      ['הודעה', message],
      ['אישור דיוור', updates ? 'כן' : 'לא'],
    ] as [string, string][]
  ).filter((r) => Boolean(r[1]))

  const html = `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1B1A1F">
  <h2 style="margin:0 0 16px">פנייה חדשה מהאתר</h2>
  <table cellpadding="6" style="border-collapse:collapse">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:700;white-space:nowrap">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`,
      )
      .join('')}
  </table>
</div>`

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  // Admin-editable overrides; if Supabase is down we fall back to env so the
  // form keeps working.
  const overrides = await getSettings().catch(() => EMPTY_SETTINGS)
  // The webhook has no env fallback on purpose: leads are relayed only when an
  // admin has entered a URL at /admin/settings.
  const webhookUrl = overrides.zapier_webhook_url
  const to = overrides.contact_to_email || ENV_TO

  // Relay to Zapier, Resend, and the Supabase leads table in parallel. The
  // lead is accepted if any channel took it, so a hiccup on one side does not
  // lose the submission.
  const [zapierOk, emailOk, dbOk] = await Promise.all([
    sendToZapier(webhookUrl, { fullname, email, phone, message, updates: String(updates), source }),
    sendEmail({ to, fullname, email, html, text }),
    saveLead({ fullname, email, phone, message, updates, source }),
  ])

  // An unconfigured webhook is not a failure — only a configured one that fails.
  if (zapierOk !== true && !emailOk && !dbOk) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

/** Returns null when no webhook is configured, otherwise whether the relay succeeded. */
async function sendToZapier(webhookUrl: string | undefined, lead: Record<string, string>) {
  if (!webhookUrl) return null
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
    })
    if (!res.ok) console.error('Zapier webhook rejected the lead:', res.status)
    return res.ok
  } catch (err) {
    console.error('Zapier webhook threw:', err)
    return false
  }
}

async function sendEmail({
  to,
  fullname,
  email,
  html,
  text,
}: {
  to: string | undefined
  fullname: string
  email: string
  html: string
  text: string
}) {
  if (!API_KEY || !to || !FROM) {
    console.error(
      'Email relay is not configured: RESEND_API_KEY / CONTACT_FROM_EMAIL / recipient (settings or CONTACT_TO_EMAIL)',
    )
    return false
  }
  try {
    const resend = new Resend(API_KEY)
    const { error } = await resend.emails.send({
      from: FROM,
      to: to.split(',').map((s) => s.trim()),
      subject: `פנייה חדשה מהאתר — ${fullname}`,
      html,
      text,
      ...(email ? { replyTo: email } : {}),
    })
    if (error) {
      console.error('Resend rejected the message:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Contact form send threw:', err)
    return false
  }
}
