import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, isAdminConfigured, isValidSession } from '@/lib/admin-auth'
import { listLeads, type Lead, type LeadFilters } from '@/lib/leads'
import { login, logout } from './actions'

export const metadata: Metadata = {
  title: 'פניות מהאתר',
  robots: { index: false, follow: false },
}

const dateFmt = new Intl.DateTimeFormat('he-IL', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Jerusalem',
})

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; q?: string; from?: string; to?: string; page?: string; per?: string }>
}) {
  const cookieStore = await cookies()
  const authed = isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)
  const params = await searchParams

  if (!authed) {
    return <LoginScreen wrongPassword={Boolean(params.error)} />
  }

  const filters: LeadFilters = { q: params.q, from: params.from, to: params.to }
  const filtering = Boolean(params.q || params.from || params.to)

  let leads: Lead[]
  try {
    leads = await listLeads(filters)
  } catch (err) {
    return (
      <Shell>
        <p className="rounded-xl bg-red-50 p-4 text-red-700">
          טעינת הפניות נכשלה. ודאו שטבלת <code dir="ltr">b2c_leads</code> קיימת ב-Supabase
          (ראו supabase/migrations) ושמשתני הסביבה מוגדרים.
          <span className="mt-2 block text-sm text-red-500" dir="ltr">
            {err instanceof Error ? err.message : String(err)}
          </span>
        </p>
      </Shell>
    )
  }

  // Pagination: the DB query is shared with the filters; only the requested
  // page is rendered. Out-of-range page numbers clamp instead of 404ing.
  const per = PER_OPTIONS.includes(Number(params.per)) ? Number(params.per) : PER_OPTIONS[0]
  const totalPages = Math.max(1, Math.ceil(leads.length / per))
  const page = Math.min(Math.max(1, Math.trunc(Number(params.page)) || 1), totalPages)
  const pageLeads = leads.slice((page - 1) * per, page * per)

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-ink">פניות מהאתר ({leads.length})</h1>
        <div className="flex items-center gap-4">
          <a href="/admin/settings" className="text-sm text-ink-gray hover:text-ink hover:underline">
            הגדרות
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-white"
            >
              התנתקות
            </button>
          </form>
        </div>
      </div>

      <form method="get" className="mb-6 flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 shadow-sm">
        {/* Re-filtering resets to page 1 (no page field) but keeps the page size. */}
        {per !== PER_OPTIONS[0] && <input type="hidden" name="per" value={per} />}
        <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm text-ink-gray">
          חיפוש חופשי
          <input
            type="search"
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="שם, אימייל, טלפון, הודעה…"
            className="rounded-lg border border-ink/15 px-3 py-2 text-ink outline-none focus:border-brand-violet"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-ink-gray">
          מתאריך
          <input
            type="date"
            name="from"
            defaultValue={params.from ?? ''}
            className="rounded-lg border border-ink/15 px-3 py-2 text-ink outline-none focus:border-brand-violet"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-ink-gray">
          עד תאריך
          <input
            type="date"
            name="to"
            defaultValue={params.to ?? ''}
            className="rounded-lg border border-ink/15 px-3 py-2 text-ink outline-none focus:border-brand-violet"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-violet"
        >
          סינון
        </button>
        {filtering && (
          <a href="/admin/leads" className="px-2 py-2.5 text-sm text-ink-gray hover:text-ink hover:underline">
            ניקוי
          </a>
        )}
        <a
          href={`/admin/leads/export${leadsQuery(filters)}`}
          download
          className="rounded-full border border-brand-violet px-6 py-2.5 text-sm font-semibold text-brand-violet transition hover:bg-brand-violet hover:text-white"
        >
          ייצוא CSV
        </a>
      </form>

      {leads.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-gray-body shadow-sm">
          {filtering ? 'לא נמצאו פניות מתאימות לסינון.' : 'אין עדיין פניות.'}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-right text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-ink-gray">
                <Th>תאריך</Th>
                <Th>שם מלא</Th>
                <Th>אימייל</Th>
                <Th>טלפון</Th>
                <Th>הודעה</Th>
                <Th>דיוור</Th>
                <Th>מקור</Th>
              </tr>
            </thead>
            <tbody>
              {pageLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-ink/5 last:border-0 hover:bg-page">
                  <Td>
                    <span dir="ltr">{dateFmt.format(new Date(lead.created_at))}</span>
                  </Td>
                  <Td className="font-semibold text-ink">{lead.fullname}</Td>
                  <Td>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} dir="ltr" className="text-brand-violet hover:underline">
                        {lead.email}
                      </a>
                    )}
                  </Td>
                  <Td>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} dir="ltr" className="text-brand-violet hover:underline">
                        {lead.phone}
                      </a>
                    )}
                  </Td>
                  <Td>
                    {lead.message && (
                      <span className="block max-w-[320px] whitespace-pre-wrap" title={lead.message}>
                        {lead.message}
                      </span>
                    )}
                  </Td>
                  <Td>{lead.updates ? 'כן' : 'לא'}</Td>
                  <Td>
                    {lead.source && (
                      <span dir="ltr" className="block max-w-[240px] truncate text-ink-gray" title={lead.source}>
                        {lead.source}
                      </span>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {leads.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-gray">
          <p>
            מציג {(page - 1) * per + 1}–{Math.min(page * per, leads.length)} מתוך {leads.length}
          </p>

          {totalPages > 1 && (
            <nav className="flex items-center gap-1">
              <PageLink filters={filters} per={per} page={page - 1} disabled={page === 1}>
                ‹ הקודם
              </PageLink>
              {pageWindow(page, totalPages).map((p, i) =>
                p === null ? (
                  <span key={`gap-${i}`} className="px-1">
                    …
                  </span>
                ) : (
                  <PageLink key={p} filters={filters} per={per} page={p} current={p === page}>
                    {String(p)}
                  </PageLink>
                ),
              )}
              <PageLink filters={filters} per={per} page={page + 1} disabled={page === totalPages}>
                הבא ›
              </PageLink>
            </nav>
          )}

          <p className="flex items-center gap-2">
            בעמוד:
            {PER_OPTIONS.map((n) => (
              <PageLink key={n} filters={filters} per={n} page={1} current={n === per}>
                {String(n)}
              </PageLink>
            ))}
          </p>
        </div>
      )}
    </Shell>
  )
}

const PER_OPTIONS = [25, 50, 100]

/** Page numbers to show: 1 … around current … last, with null for gaps. */
function pageWindow(current: number, total: number): (number | null)[] {
  const wanted = new Set([1, total, current - 1, current, current + 1])
  const pages = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: (number | null)[] = []
  for (const [i, p] of pages.entries()) {
    if (i > 0 && p - pages[i - 1] > 1) out.push(null)
    out.push(p)
  }
  return out
}

function PageLink({
  filters,
  per,
  page,
  current = false,
  disabled = false,
  children,
}: {
  filters: LeadFilters
  per: number
  page: number
  current?: boolean
  disabled?: boolean
  children: React.ReactNode
}) {
  const base = 'rounded-lg px-3 py-1.5 transition'
  if (disabled) return <span className={`${base} opacity-40`}>{children}</span>
  if (current) return <span className={`${base} bg-ink font-semibold text-white`}>{children}</span>
  return (
    <a href={`/admin/leads${leadsQuery(filters, { per, page })}`} className={`${base} hover:bg-ink/10 hover:text-ink`}>
      {children}
    </a>
  )
}

/** Query string preserving the filters plus pagination state. */
function leadsQuery(filters: LeadFilters, extra: { per?: number; page?: number } = {}): string {
  const params = new URLSearchParams()
  if (filters.q) params.set('q', filters.q)
  if (filters.from) params.set('from', filters.from)
  if (filters.to) params.set('to', filters.to)
  if (extra.per && extra.per !== PER_OPTIONS[0]) params.set('per', String(extra.per))
  if (extra.page && extra.page > 1) params.set('page', String(extra.page))
  const s = params.toString()
  return s ? `?${s}` : ''
}

function LoginScreen({ wrongPassword }: { wrongPassword: boolean }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-page px-4">
      <form action={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold text-ink">כניסת מנהל</h1>
        <p className="mb-6 text-sm text-gray-body">הזינו סיסמה כדי לצפות בפניות מהאתר.</p>
        {!isAdminConfigured() && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            ADMIN_PASSWORD אינו מוגדר בסביבת השרת.
          </p>
        )}
        {wrongPassword && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">סיסמה שגויה, נסו שוב.</p>
        )}
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="סיסמה"
          className="mb-4 w-full rounded-lg border border-ink/15 px-4 py-3 text-ink outline-none focus:border-brand-violet"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-ink py-3 font-semibold text-white transition hover:bg-brand-violet"
        >
          כניסה
        </button>
      </form>
    </main>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-page px-4 py-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  )
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="whitespace-nowrap px-4 py-3 font-semibold">{children}</th>
}

function Td({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-gray-body ${className}`}>{children}</td>
}
