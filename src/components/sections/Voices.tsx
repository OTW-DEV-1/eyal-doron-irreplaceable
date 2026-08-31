'use client'

import { useRef, useState } from 'react'
import { asset } from '@/lib/assets'
import { CARD } from '@/components/ui'

const TESTIMONIALS: { name: string; role: string; img?: string; text: string }[] = [
  {
    name: 'עינת הר לוי',
    role: 'מנהלת, הבנק הבינלאומי',
    img: 'testimonials/einat-har-levi.png',
    text: 'ממליצה בחום על הקורס. קורס מעולה. יצאתי ממנו עם הרבה תובנות, כלים מעשיים ודרך חשיבה חדשה. במהלך הקורס עברתי תהליך משמעותי שבו רכשתי כלים והרגלים שאני בטוחה שילוו אותי בכל תחומי החיים. זה לא עוד קורס שנותן רק ידע אלא הוא משנה את הדרך שבה אנחנו מסתכלים על עצמנו ועל מה שאפשרי עבורנו. התכנים מונגשים באמצעות סדרת סרטונים מצוינת של ד״ר אייל דורון שמעביר את המסרים בצורה רהוטה, ברורה, מעוררת מחשבה ומאתגר אותנו להסתכל אחרת על היכולות והפוטנציאל שלנו. לפעמים כל מה שצריך הוא אדם אחד והחלטה אחת כדי להתחיל לחיות את החיים שבאמת רוצים. עבורי, הקורס הזה היה בדיוק זה.',
  },
  {
    name: 'יעל',
    role: 'מנהלת פרויקטים במגזר הציבורי והחברתי',
    img: 'testimonials/yael.png',
    text: 'הגעתי לקורס מתוך רצון לקבל ערך מוסף כמנהלת, וסיימתי עם הרבה יותר מזה. מעבר לכלים המעשיים להגדרת מטרות, קבלת החלטות והובלת תהליכים הקורס העניק לי הזדמנות אמיתית לעצור, להתבונן בעצמי ולהתפתח כאשת מקצוע וכמנהלת. השילוב בין תכנים מקצועיים לבין תהליך של התפתחות אישית היה בעיניי הייחוד האמיתי של הקורס. אני ממליצה עליו בחום לכל מנהל בדרגי ביניים ומעלה שרוצה לא רק לנהל טוב יותר, אלא גם לצמוח ולהוביל מתוך מודעות, ביטחון ותחושת שליחות.',
  },
  {
    name: 'עינת אברהם',
    role: 'Solution Engineer, Salesforce',
    text: 'המלצה חמה על הקורס החשוב הזה: מכירים מישהו או מישהי בסביבתכם שהשאלה האם הבינה המלאכותית תחליף אותי בשלב זה או אחר לא חלפה במוחם או השתקעה לה שם? הקורס הזה הוא הזמנה לחתור למגע עם השאלה הזאת ולקבל כלים פרקטיים, המלצות והשראה ענקית לאיך להתמודד עם הנושא, לחנות רגע את השוטף ולהעמיק במה שלי אין זמן ביום-יום. קורס גמיש בשעות שלי עם הנחייה צמודה שמקפיצה את היכולות והביצועים. אל תרשו לעצמכם לפספס אותה - הרשמו לקורס!! אני הצבעתי ברגליים ואני שמחה מאוד על כך.',
  },
  {
    name: 'מרב נירן',
    role: 'מנהלת תחום גמילה מהתמכרויות בקבוצת מובמנט',
    text: 'הקורס ״הבלתי-ניתנים להחלפה״ של אייל דורון עזר לי להסתכל אחרת על הרבה דברים שלרוב אני נוטה לקחת כמובן מאליו. פתאום שמתי עליהם פוקוס והבנתי שאפשר לשפר שם. הוא עוזר להיות יצירתיים ואמיצים יותר, לחדד מטרות, לכוון רחוק ובעיקר לפרק רעיונות ומטרות גדולות לצעדים קטנים שאפשר באמת להתחיל ליישם. ממליצה עליו לכל מי שמרגיש שהוא רוצה לקפוץ מדרגה, בכל תחום בחיים.',
  },
]

const ARROW_HOVER =
  'hover:border-transparent hover:text-white hover:bg-[linear-gradient(to_left,#725AF6_0%,#9A5BD9_18%,#C55A96_36%,#E15839_55%,#EC8A4B_76%,#F6C760_100%)]'

/** Participant testimonials: a snap-scrolling three-up strip with read-more clamps. */
export function Voices() {
  const stripRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  // The strip is RTL, so "previous" scrolls toward positive left offsets.
  const by = (dir: 1 | -1) => {
    const c = stripRef.current
    if (!c) return
    c.scrollBy({ left: dir * ((c.clientWidth - 44) / 3 + 22), behavior: 'smooth' })
  }

  return (
    <section id="voices" className="px-4 py-10 sm:px-[clamp(18px,6vw,8em)]">
      <h2 data-reveal className="text-headline mb-13 pt-[.12em] pb-[.18em] text-center text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
        עברו את התהליך <br className="sm:hidden" />
        ורוצים לשתף
      </h2>
      <div className="relative">
        <div
          ref={stripRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-[22px] overflow-x-auto p-[6px_2px_14px] [scrollbar-width:none]"
        >
          {TESTIMONIALS.map((t, i) => {
            const open = !!expanded[i]
            return (
              <div
                key={t.name}
                data-reveal
                className={`${CARD} flex min-w-0 flex-none basis-full snap-start flex-col gap-[14px] rounded-[26px] p-[36px_32px] sm:min-w-[300px] sm:basis-[calc((100%-44px)/3)]`}
              >
                <div className="text-b2c inline-block self-start text-[55px] leading-[.65] font-bold">&quot;</div>
                <div className="flex-1">
                  <p
                    data-clamped={String(!open)}
                    className="testimonial-text text-[22.5px] leading-[1.2em] text-pretty text-ink-black sm:text-[clamp(20px,2.55vw,29px)]"
                  >
                    {t.text}
                  </p>
                </div>
                <button
                  onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                  className="text-b2c cursor-pointer self-start border-none bg-transparent p-0 text-right text-[20px] font-bold"
                >
                  {open ? 'הצג פחות' : 'לקרוא עוד'}
                </button>
                <div className="mt-[6px] flex min-h-[132px] flex-col items-start justify-end gap-[10px]">
                  {t.img && (
                    <img
                      src={asset(t.img)}
                      alt={t.name}
                      className="h-[58px] w-[58px] rounded-full border-2 border-white object-cover object-top shadow-[0_4px_12px_rgba(20,19,24,.14)]"
                    />
                  )}
                  <div>
                    <div className="text-[23px] font-bold text-ink-black">{t.name}</div>
                    <div className="text-[19.5px] text-ink-black">{t.role}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button
          onClick={() => by(1)}
          aria-label="הקודם"
          className={`absolute top-1/2 -right-[6px] z-[2] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E3E1DC] bg-white text-ink transition-all duration-300 sm:-right-6 sm:h-[52px] sm:w-[52px] ${ARROW_HOVER}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <button
          onClick={() => by(-1)}
          aria-label="הבא"
          className={`absolute top-1/2 -left-[6px] z-[2] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E3E1DC] bg-white text-ink transition-all duration-300 sm:-left-6 sm:h-[52px] sm:w-[52px] ${ARROW_HOVER}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
