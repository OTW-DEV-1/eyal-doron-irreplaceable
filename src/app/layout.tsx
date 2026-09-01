import type { Metadata, Viewport } from 'next'
import { getCachedSettings } from '@/lib/settings'
import './globals.css'

const title = 'הבלתי-ניתנים להחלפה | ד״ר אייל דורון'
const description =
  'תוכנית חדשה לעולם מסוג חדש. קורס דיגיטלי שיגרום לכם לחשוב אחרת וייתן לכם כלים לגיבוש אסטרטגיה ותוכנית פעולה — התהליך הדיגיטלי והפיזי החדש של ד״ר אייל דורון.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website', locale: 'he_IL' },
  robots: { index: true, follow: true },
  // Which commit this page was built from — see next.config.ts.
  other: { 'build-commit': process.env.NEXT_PUBLIC_BUILD_COMMIT ?? 'unknown' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f5f3',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Tracking snippets pasted at /admin/settings. They are rendered as raw markup
  // in the server HTML — that is the only way a pasted <script> tag actually
  // runs — so only the admin form may ever write them.
  //
  // Both go at the top of <body>, never into <head>: React hoists the app's
  // stylesheet links into <head>, and giving <head> a dangerouslySetInnerHTML
  // wipes them on hydration, leaving every page unstyled. Top-of-body is early
  // enough for Google Tag Manager and the like.
  const { head_scripts: topScripts, body_scripts: bodyStart } = await getCachedSettings()

  return (
    <html lang="he" dir="rtl">
      <body className="overflow-x-clip">
        {topScripts ? <div dangerouslySetInnerHTML={{ __html: topScripts }} /> : null}
        {bodyStart ? <div dangerouslySetInnerHTML={{ __html: bodyStart }} /> : null}
        {children}
      </body>
    </html>
  )
}
