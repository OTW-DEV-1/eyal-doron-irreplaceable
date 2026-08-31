import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth'
import { EMPTY_SETTINGS, getSettings } from '@/lib/settings'
import { updateSettings } from './actions'

export const metadata: Metadata = {
  title: 'הגדרות אתר',
  robots: { index: false, follow: false },
}

const ENV_TO = process.env.CONTACT_TO_EMAIL
const ENV_ZAPIER = process.env.ZAPIER_WEBHOOK_URL

const ERROR_MESSAGES: Record<string, string> = {
  webhook: 'כתובת ה-Webhook חייבת להתחיל ב-https://',
  email: 'אחת מכתובות האימייל אינה תקינה (אפשר להפריד בפסיקים).',
  save: 'השמירה נכשלה. ודאו שטבלת b2c_settings קיימת ב-Supabase (ראו supabase/migrations).',
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    // Login lives on the leads page; one session covers both admin pages.
    redirect('/admin/leads')
  }

  const params = await searchParams
  let settings = EMPTY_SETTINGS
  let loadError = ''
  try {
    settings = await getSettings()
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err)
  }

  return (
    <main className="min-h-dvh bg-page px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-ink">הגדרות אתר</h1>
          <a href="/admin/leads" className="text-sm text-ink-gray hover:text-ink hover:underline">
            ← חזרה לפניות
          </a>
        </div>

        {params.saved && (
          <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">ההגדרות נשמרו.</p>
        )}
        {params.error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {ERROR_MESSAGES[params.error] ?? 'אירעה שגיאה.'}
          </p>
        )}
        {loadError && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            טעינת ההגדרות נכשלה. ודאו שטבלת <code dir="ltr">b2c_settings</code> קיימת ב-Supabase
            (ראו supabase/migrations).
            <span className="mt-2 block text-red-500" dir="ltr">{loadError}</span>
          </p>
        )}

        <form action={updateSettings} className="rounded-2xl bg-white p-8 shadow-sm">
          <label className="mb-6 block">
            <span className="mb-1 block font-semibold text-ink">Zapier Webhook URL</span>
            <span className="mb-2 block text-sm text-gray-body">
              כל פנייה מהאתר נשלחת לכתובת הזו. ריק = ברירת המחדל מהסביבה
              {ENV_ZAPIER ? '' : ' (לא מוגדרת כרגע)'}.
            </span>
            <input
              type="url"
              name="zapier_webhook_url"
              defaultValue={settings.zapier_webhook_url}
              placeholder={ENV_ZAPIER ?? 'https://hooks.zapier.com/hooks/catch/…'}
              dir="ltr"
              className="w-full rounded-lg border border-ink/15 px-4 py-3 text-ink outline-none focus:border-brand-violet"
            />
          </label>

          <label className="mb-8 block">
            <span className="mb-1 block font-semibold text-ink">אימייל לקבלת פניות</span>
            <span className="mb-2 block text-sm text-gray-body">
              לכתובת הזו נשלחת הודעה על כל פנייה. אפשר כמה כתובות מופרדות בפסיקים; ריק =
              ברירת המחדל מהסביבה{ENV_TO ? ` (${ENV_TO})` : ''}.
            </span>
            <input
              type="text"
              name="contact_to_email"
              defaultValue={settings.contact_to_email}
              placeholder={ENV_TO ?? 'name@example.com'}
              dir="ltr"
              className="w-full rounded-lg border border-ink/15 px-4 py-3 text-ink outline-none focus:border-brand-violet"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-ink py-3 font-semibold text-white transition hover:bg-brand-violet"
          >
            שמירה
          </button>
        </form>
      </div>
    </main>
  )
}
