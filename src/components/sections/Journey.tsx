import { Aurora } from '@/components/reactbits/Aurora'
import { Cta } from '@/components/ui'

const STEPS = [
  'דיוק עצמי ופוקוס ברמה חדשה לגמרי',
  'הגדרת ״המטרה הגדולה״ לשנים הקרובות - באופן מקורי, אישי, מלהיב ומדויק',
  'הגדרת הקווים האדומים שלנו ולצידם הערכים המובילים והאג׳נדה האישית',
  'הרכבת ״מפת הקשרים החדשה שלי בעולם״ - זיהוי ומיפוי ״משלימי הגאונות שלי״ ו״בורד היועצים״, לצד כלים לטיפוח קשרים חלשים ולבניית הלהקה שלנו בעולם',
  'נלמד להתיידד עם חוסר ודאות, לאהוב שינויים ולהתמודד עם המכשולים הפנימיים והחיצוניים שבדרך',
  'נבנה תוכנית עבודה יצירתית מעשית המשלבת אסטרטגיה ייחודית וטקטיקה מקורית להגדרת המטרות הגדולות שלנו לקראת מימושן',
]

function StepCard({ text }: { text: string }) {
  return (
    <div data-reveal className="relative rounded-[18px] bg-white/5 p-[24px_26px] text-center backdrop-blur-[6px]">
      <p data-tl-txt className="text-[22.5px] leading-[1.25em] font-normal text-pretty text-white sm:text-[clamp(20px,2.55vw,29px)]">
        {text}
      </p>
      {/* Two stacked borders; MotionProvider cross-fades them as the spine's
          glowing fill passes this row's dot. */}
      <span
        data-tl-bd2
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 opacity-100 transition-opacity duration-500"
      />
      <span data-tl-bd aria-hidden className="tl-grad-border" />
    </div>
  )
}

function Dot() {
  return (
    <div className="flex items-center justify-center">
      <div data-tl-dot className="h-5 w-5 rounded-full bg-dark-dot transition-[background,box-shadow,transform] duration-400" />
    </div>
  )
}

/**
 * "What we'll do" — an alternating timeline. A gradient fill climbs the spine
 * with scroll; dots ignite and their cards swap to a gradient border as it
 * passes (all driven by MotionProvider).
 *
 * Below 901px everything collapses to one column with the spine on the right.
 */
export function Journey() {
  return (
    <section id="journey" className="px-3 py-5 sm:px-[clamp(16px,4.5vw,5em)] sm:py-[30px]">
      <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-dark px-[14px] pt-[46px] pb-9 text-on-dark sm:px-7 sm:pt-14 sm:pb-20">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={0.55} style={{ inset: 0 }} />
        <div className="relative z-[2] w-full">
          <h2 data-reveal className="mb-14 pt-[.12em] pb-[.18em] text-center text-[44px] leading-[0.8em] font-bold text-white sm:text-[clamp(34px,5.6vw,68px)]">
            מה נעשה בתהליך?
          </h2>
          <div data-tl-wrap className="relative mx-auto max-w-[980px] py-[10px]">
            <div
              data-tl-bg
              className="absolute top-0 bottom-0 right-[14px] w-[3px] translate-x-1/2 rounded-full bg-white/10 md:right-auto md:left-1/2 md:-translate-x-1/2"
            />
            <div
              data-tl-line
              className="absolute top-0 right-[14px] h-0 w-[3px] translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#F6C760,#E15839,#725AF6)] shadow-[0_0_14px_rgba(225,88,57,.55)] md:right-auto md:left-1/2 md:-translate-x-1/2"
            />
            {STEPS.map((text, i) => {
              const onRight = i % 2 === 0
              return (
                <div
                  key={i}
                  data-tl-row
                  className="mb-[34px] grid grid-cols-[28px_1fr] items-center gap-x-[18px] md:grid-cols-[1fr_56px_1fr]"
                >
                  {/* Cards alternate sides on desktop; on mobile the dot always
                      sits in the narrow right-hand column and the card fills the rest. */}
                  <div className={onRight ? 'col-start-2 row-start-1 md:col-start-1' : 'hidden md:col-start-1 md:block'}>
                    {onRight && <StepCard text={text} />}
                  </div>
                  <div className="col-start-1 row-start-1 md:col-start-2">
                    <Dot />
                  </div>
                  <div className={onRight ? 'hidden md:col-start-3 md:block' : 'col-start-2 row-start-1 md:col-start-3'}>
                    {!onRight && <StepCard text={text} />}
                  </div>
                </div>
              )
            })}
          </div>
          <div data-reveal data-reveal-early className="-mt-[15px] text-center sm:mt-9">
            <Cta href="#price" className="px-[22px] py-3 text-[20.7px] sm:px-10 sm:py-[15px] sm:text-[21.3px]">
              אני רוצה לצאת לדרך!
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
