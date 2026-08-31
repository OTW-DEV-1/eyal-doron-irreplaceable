'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth'
import { saveSettings } from '@/lib/settings'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Server Functions are reachable by direct POST, so auth is re-checked here. */
export async function updateSettings(formData: FormData) {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect('/admin/leads')
  }

  const webhook = String(formData.get('zapier_webhook_url') ?? '').trim()
  const toEmail = String(formData.get('contact_to_email') ?? '').trim()

  if (webhook && !/^https:\/\/.+/.test(webhook)) {
    redirect('/admin/settings?error=webhook')
  }
  if (toEmail && !toEmail.split(',').every((s) => isEmail(s.trim()))) {
    redirect('/admin/settings?error=email')
  }

  try {
    await saveSettings({ zapier_webhook_url: webhook, contact_to_email: toEmail })
  } catch {
    redirect('/admin/settings?error=save')
  }
  redirect('/admin/settings?saved=1')
}
