import { cookies } from 'next/headers'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-auth'
import { listLeads } from '@/lib/leads'

export const runtime = 'nodejs'

/** RFC 4180 quoting; also neutralise leading =+-@ so Excel won't run formulas. */
function csvCell(v: string): string {
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v
  return `"${safe.replace(/"/g, '""')}"`
}

const dateFmt = new Intl.DateTimeFormat('he-IL', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Jerusalem',
})

/** CSV download of the leads table, honouring the same q/from/to filters as the page. */
export async function GET(req: Request) {
  const cookieStore = await cookies()
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const params = new URL(req.url).searchParams
  const leads = await listLeads({
    q: params.get('q') ?? undefined,
    from: params.get('from') ?? undefined,
    to: params.get('to') ?? undefined,
  })

  const header = ['תאריך', 'שם מלא', 'אימייל', 'טלפון', 'הודעה', 'אישור דיוור', 'מקור']
  const rows = leads.map((l) => [
    dateFmt.format(new Date(l.created_at)),
    l.fullname,
    l.email,
    l.phone,
    l.message,
    l.updates ? 'כן' : 'לא',
    l.source,
  ])
  // BOM so Excel opens the Hebrew as UTF-8 instead of mojibake.
  const csv = '﻿' + [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')

  const stamp = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem' }).format(new Date())
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
