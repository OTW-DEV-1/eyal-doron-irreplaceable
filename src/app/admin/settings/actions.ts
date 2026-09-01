'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth'
import { SETTINGS_TAG, saveSettings } from '@/lib/settings'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Server Functions are reachable by direct POST, so auth is re-checked here. */
export async function updateSettings(formData: FormData) {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    redirect('/admin/leads')
  }

  const webhook = String(formData.get('zapier_webhook_url') ?? '').trim()
  const toEmail = String(formData.get('contact_to_email') ?? '').trim()
  const headScripts = String(formData.get('head_scripts') ?? '').trim()
  const bodyScripts = String(formData.get('body_scripts') ?? '').trim()

  if (webhook && !/^https:\/\/.+/.test(webhook)) {
    redirect('/admin/settings?error=webhook')
  }
  if (toEmail && !toEmail.split(',').every((s) => isEmail(s.trim()))) {
    redirect('/admin/settings?error=email')
  }

  try {
    await saveSettings({
      zapier_webhook_url: webhook,
      contact_to_email: toEmail,
      head_scripts: headScripts,
      body_scripts: bodyScripts,
    })
  } catch {
    redirect('/admin/settings?error=save')
  }
  // The public pages render the snippets from a cached read; expire: 0 so the
  // next visit sees the new values instead of being served the stale ones.
  revalidateTag(SETTINGS_TAG, { expire: 0 })
  redirect('/admin/settings?saved=1')
}
