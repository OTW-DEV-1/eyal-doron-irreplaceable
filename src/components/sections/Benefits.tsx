import { CARD, Cta } from '@/components/ui'

const BENEFITS = [
  { num: '01', title: 'כלים משני חשיבה', text: 'ליישום ולפתרון בעיות ביום-יום, בחיים ובעבודה.' },
  { num: '02', title: 'פיתוח מיומנויות של ניהול', text: 'שינוי דפוסי חשיבה וחידוד יכולות יצירתיות.' },
  { num: '03', title: 'אסטרטגיה אישית', text: 'לשנים הקרובות.' },
  {
    num: '04',
    title: 'מתווה מובנה של תכנית עבודה מעשית',
    text: 'שישמש אתכם הרבה אחרי שהתהליך הדיגיטלי יסתיים.',
  },
  { num: '05', title: 'הזדמנויות', text: 'השראה מיוצרים והוגי דעות וחיבורים לאנשים מעניינים.' },
  {
    num: '06',
    title: 'חשיפה לעולמות מרתקים',
    text: 'של פילוסופיה, חשיבה יצירתית, תורות ניהול בעולם החדש, מתודות של ארגונים פורצי דרך ומחקר של משפיעים עולמיים.',
  },
  { num: '07', title: 'להיות במקום שבו אנו הכי מעולים', text: 'באופן הכי אינטואיטיבי, משמח ומצליח.' },
]

/**
 * "What do you gain" — a stack of sticky cards. Each card pins 18px lower than
 * the one before it, so scrolling shingles them into a deck.
 */
export function Benefits() {
  return (
    <section id="benefits" className="relative px-4 pt-[30px] pb-[50px] sm:px-[clamp(28px,8vw,10em)] sm:pt-[60px] sm:pb-[70px]">
      <h2 data-reveal className="text-headline mb-3 pt-[.12em] pb-[.18em] text-center text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
        מה מרוויחים?
      </h2>
      <p data-reveal className="mb-13 pt-[6px] text-center text-[25.9px] font-semibold text-ink-black sm:text-[clamp(26.4px,3.04vw,35.2px)]">
        באנו להכין יחד תוכנית חדשה <br className="sm:hidden" />
        לעולם מסוג חדש.
      </p>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-4 sm:gap-6">
        {BENEFITS.map((b, i) => (
          <div
            key={b.num}
            data-reveal
            className={`${CARD} sticky grid min-h-[230px] content-center grid-cols-1 items-center gap-5 overflow-hidden rounded-[26px] p-[30px_20px] shadow-[0_12px_34px_rgba(20,19,24,.07)] sm:min-h-[250px] sm:content-normal sm:grid-cols-[clamp(100px,13vw,180px)_1fr_clamp(100px,13vw,180px)] sm:px-[clamp(24px,4vw,64px)] sm:py-10`}
            style={{ top: `calc(120px + ${i * 18}px)` }}
          >
            <div
              dir="ltr"
              className="numeral-outline absolute top-[6px] right-[10px] text-center text-[96px] leading-none font-bold opacity-80 sm:static sm:top-auto sm:right-auto sm:text-[clamp(84px,11vw,150px)] sm:opacity-100"
            >
              {b.num}
            </div>
            <div className="relative z-[1] pt-[30px] text-center sm:pt-0">
              <h4 className="mb-3 text-[24px] leading-[1.2] font-bold text-ink-black sm:text-[clamp(24px,2.9vw,33px)]">{b.title}</h4>
              <p className="mx-auto max-w-full text-[22.5px] leading-[1.25em] text-pretty text-ink-black sm:max-w-[820px] sm:text-[clamp(20px,2.55vw,29px)]">
                {b.text}
              </p>
            </div>
            <div className="hidden sm:block" />
            <div className="pointer-events-none absolute -bottom-[154px] -left-[132px] h-[374px] w-[462px] rounded-full bg-[radial-gradient(circle,rgba(114,90,246,.13)_0%,rgba(246,199,96,.07)_45%,rgba(255,255,255,0)_74%)] blur-[6px]" />
          </div>
        ))}
      </div>

      <p data-reveal className="mx-auto mt-11 max-w-[1000px] text-center text-[22.5px] leading-[1.25em] font-semibold text-pretty text-ink sm:text-[clamp(20px,2.55vw,29px)]">
        סדנה שבה הכל מתחבר, כולנו נפגשים, מדייקים ומתניעים את תוכנית הפעולה האישית שלנו.
      </p>
      <div data-reveal data-reveal-early className="mt-12 text-center">
        <Cta href="#price" className="px-[22px] py-3 text-[20.7px] sm:px-10 sm:py-4 sm:text-[21.3px]">
          הנה הצטרפתי!
        </Cta>
      </div>
    </section>
  )
}
