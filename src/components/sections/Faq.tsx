'use client'

import { useState } from 'react'
import { Aurora } from '@/components/reactbits/Aurora'
import { CARD } from '@/components/ui'

const FAQS = [
  {
    q: 'מה התהליך מצריך ממני?',
    a: 'או... שאלה טובה. כבר הגעתם עד הלום, אז רצון יש. צורך יש. ואתם מבינים ששינוי מצריך עבודה. כל שנותר הוא להישאר עם ראש פתוח, לבוא עם נכונות ללמוד ולהיות מופתעים, ולקחת את הכלים והתובנות לחיי היום-יום שלכם. אה ו... ליהנות מהדרך.',
  },
  {
    q: 'עד מתי השיעורים המוקלטים יהיו זמינים לי?',
    a: 'השיעורים יהיו זמינים עד שנה מיום ההרשמה, כדי שתוכלו לחזור אליהם ולרענן תובנות. ואל תשכחו, יש לכם גם מחברת מלווה ורשמים שיישארו איתכם.',
  },
  {
    q: 'האם אקבל סיוע תוך כדי התהליך הדיגיטלי? וממי?',
    a: 'בטח. אנחנו מלווים אתכם מרגע ההרשמה ולאורך התהליך כולו – גם מנחה מלווה משלכם וגם אייל עצמו בוובינר שבמהלך הדרך ובסדנת הסיכום שתהדק את הכל יחד.',
  },
  {
    q: 'האם אפשר לראות את השיעורים מתי שרוצים?',
    a: 'כן. השיעורים זמינים לצפייה בקצב שלכם, ותוכלו להיכנס בזמן שנוח לכם, מהנייד או מהמחשב. לאורך התהליך יהיו שתי נקודות עצירה מובנות של 48 שעות, שנועדו לאפשר חשיבה, דיוק והפנמה. מעבר לכך, תוכלו להתקדם באופן עצמאי ולהסתנכרן עם המנחה המלווה שלכם כבר מההתחלה ולאורך התהליך.',
  },
  {
    q: 'ומה אם המועד של סדנת הסיכום הפרונטלית לא יתאים לי?',
    a: 'סדנאות הסיכום המעשיות עם ד״ר אייל דורון מתקיימות באופן תדיר במרכז הארץ, במגוון מועדים, כך שתוכלו לבחור את הסדנה שתשתלב לכם בלו״ז. ואם בכל זאת תתקשו למצוא מועד מתאים, אנחנו נעשה כל מאמץ לסייע.',
  },
  {
    q: 'מה קורה אחרי הסדנה?',
    a: 'התוכנית האישית שלכם יוצאת לדרך, ואם תרצו - תוכלו להמשיך איתנו ולהצטרף לקהילת Creativity in Action, לקבל עדכונים ותובנות, להיות מוזמנים לאירועים מיוחדים ולהמשיך להרחיב את מעגל החיבורים שלכם. ואם יש לכם עוד רעיונות – נשמח לשמוע.',
  },
]

/** Two-column FAQ accordion over a faded aurora. */
export function Faq() {
  const [open, setOpen] = useState(-1)

  return (
    <section id="faq" className="px-4 pt-10 pb-[30px] sm:px-[clamp(18px,6vw,8em)] sm:pb-5">
      <h2 data-reveal className="text-headline mb-13 pt-[.12em] pb-[.18em] text-center text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
        שאלות שהרבה שואלים
      </h2>
      <div className="relative pb-[2em]">
        <Aurora
          colors="#725AF6,#E15839,#F6C760"
          intensity={0.55}
          fadeEdges
          style={{ inset: '-8% -4%' }}
        />
        <div className="pointer-events-none absolute -inset-y-[8%] -inset-x-[4%] bg-[linear-gradient(180deg,#f6f5f3_0%,#f6f5f3_5%,rgba(246,245,243,.78)_26%,rgba(246,245,243,.62)_50%,rgba(246,245,243,.78)_74%,#f6f5f3_95%,#f6f5f3_100%)]" />
        <div className="relative grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} data-reveal className={`${CARD} overflow-hidden rounded-[26px]`}>
                <button
                  onClick={() => setOpen((v) => (v === i ? -1 : i))}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-[22px_26px] text-right text-[24px] font-semibold text-ink sm:text-[clamp(22px,2.6vw,30px)]"
                >
                  <span>{f.q}</span>
                  <span
                    className="inline-flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#F6C760,#EC8A4B_22%,#E15839_45%,#C55A96_64%,#9A5BD9_82%,#725AF6)] text-white transition-transform duration-[450ms]"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[450ms] ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="p-[0_26px_24px] text-[22.5px] leading-[1.3] text-ink-black sm:text-[clamp(20px,2.55vw,29px)]">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
