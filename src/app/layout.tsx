import type { Metadata, Viewport } from 'next'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="overflow-x-clip">{children}</body>
    </html>
  )
}
