import type { ReactNode } from 'react'
import { CHECKOUT_URL, CARD, Cta, GradientIcon, ICON_CHIP, ICONS } from '@/components/ui'

const ROWS: { icon: keyof typeof ICONS; full?: boolean; text: ReactNode }[] = [
  {
    icon: 'layers',
    full: true,
    text: (
      <>
        <strong>30 שיעורים דיגיטליים קצרים, מושקעים וממוקדים</strong> - <br className="hidden sm:inline" />
        תוכלו לעבור עליהם בקצב שלכם (עם 2 עצירות מובנות בדרך, כדי להקדיש מחשבה במקומות החשובים ולהטמיע)
      </>
    ),
  },
  { icon: 'pen', text: (<><strong>מחברת מלווה</strong> לשם יישום והטמעה</>) },
  {
    icon: 'compass',
    text: (<><strong>מנחה מלווה פר משתתף</strong> - בן אדם אמיתי שילווה אתכם בכל שאלה, התייעצות ויישום</>),
  },
  {
    icon: 'bot',
    text: (<><strong>צ׳ט בוט מיוחד</strong> - שיעזור לכם, בכל שלב ובכל שעה, לדייק את המטרות שלכם במסגרת התהליך</>),
  },
  {
    icon: 'cast',
    text: (<><strong>וובינר שו״ת באמצע (במגוון מועדים)</strong> - שאלות ותשובות עם ד״ר אייל דורון</>),
  },
  { icon: 'people', text: (<><strong>קהילה</strong> שלא תאפשר לשגרה להשכיח מה שחשוב באמת</>) },
  {
    icon: 'nodes',
    text: (
      <>
        <strong>סדנה שבה הכל מתחבר</strong> - סדנה מעשית מסכמת פרונטלית (במגוון מועדים) - עם ד״ר אייל דורון
      </>
    ),
  },
]

/** "How it works" — icon-chip rows laid out two-up, the headline row spanning both columns. */
export function How() {
  return (
    <section id="how" className="px-4 py-[50px] sm:px-[clamp(16px,3vw,4em)] sm:pt-[70px] sm:pb-[50px]">
      <h2 data-reveal className="text-headline mb-9 pt-[.12em] pb-[.15em] text-center text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
        איך זה עובד?
      </h2>
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-[14px] sm:gap-4 md:grid-cols-2">
        {ROWS.map((row, i) => (
          <div
            key={i}
            data-reveal
            data-reveal-early
            className={`${CARD} flex items-center gap-4 rounded-[20px] p-[20px_24px] ${row.full ? 'md:col-span-full' : ''}`}
          >
            <div className={ICON_CHIP}>
              <GradientIcon id={`how-${i}`} paths={ICONS[row.icon]} size={28} color="#FFFFFF" />
            </div>
            <p className="text-[22.5px] leading-[1.2em] text-ink sm:text-[clamp(20px,2.55vw,29px)]">{row.text}</p>
          </div>
        ))}
      </div>
      <div data-reveal data-reveal-early className="mt-11 text-center">
        <Cta href={CHECKOUT_URL} className="px-[22px] py-3 text-[20.7px] sm:px-10 sm:py-4 sm:text-[21.3px]">
          יוצאים לדרך!
        </Cta>
      </div>
    </section>
  )
}
