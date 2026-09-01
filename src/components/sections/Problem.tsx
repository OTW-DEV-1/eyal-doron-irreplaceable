import { Aurora } from '@/components/reactbits/Aurora'
import { CHECKOUT_URL, Cta } from '@/components/ui'

/** Outlined keyword floating behind the copy. */
function Ghost({ className, children }: { className: string; children: string }) {
  return <span className={`absolute font-bold text-transparent ${className}`}>{children}</span>
}

/** Dark "the world is flipping" panel with outlined buzzwords drifting behind. */
export function Problem() {
  return (
    <section id="problem" className="px-[14px] py-5 sm:px-[clamp(16px,4.5vw,5em)] sm:py-[30px]">
      <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-dark px-5 py-14 text-center text-on-dark sm:px-[39px] sm:pt-[clamp(49px,6.2vw,83px)] sm:pb-[clamp(77px,9.7vw,124px)]">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={0.55} style={{ inset: 0 }} />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50 sm:opacity-100">
          <Ghost className="top-[9%] right-[6%] text-[clamp(37px,4.4vw,66px)] [-webkit-text-stroke:1.3px_rgba(255,255,255,.22)]">AI</Ghost>
          <Ghost className="bottom-[4%] left-[8%] text-[clamp(35px,4.1vw,62px)] [-webkit-text-stroke:1.3px_rgba(255,255,255,.22)]">עתיד</Ghost>
          <Ghost className="top-[54%] -left-[4%] -rotate-90 text-[clamp(31px,3.3vw,51px)] [-webkit-text-stroke:1.3px_rgba(255,255,255,.19)] sm:top-[44%] sm:left-[2%]">קריירה</Ghost>
          <Ghost className="right-[8%] bottom-[6%] -rotate-3 text-[clamp(33px,3.7vw,57px)] [-webkit-text-stroke:1.3px_rgba(255,255,255,.2)]">בינה מלאכותית</Ghost>
        </div>
        <div className="relative z-[2] mx-auto flex max-w-[1000px] flex-col items-center gap-[26px]">
          <h2 data-reveal className="pt-[.12em] pb-[.18em] text-[44px] leading-[0.95em] font-bold text-white sm:text-[clamp(34px,5.6vw,68px)]">
            מרגישים שהכל משתנה? <br />
            לא יציב? לא ברור?
          </h2>
          <p data-reveal className="-mt-[10px] max-w-[860px] text-[22.5px] leading-[1.2em] font-bold text-pretty text-white sm:text-[clamp(22px,2.6vw,32px)]">
            המציאות החדשה שלנו בשתי מילים:
          </p>
          <div data-reveal className="-mt-[14px] self-center text-center">
            <p className="hidden text-[22.5px] leading-[1.2em] font-bold text-white sm:block sm:text-[clamp(22px,2.6vw,32px)]">(בגדול)</p>
            <div className="text-b2c pt-[.02em] pb-[.08em] text-[78px] leading-[0.8em] font-bold sm:text-[clamp(57.6px,9.9vw,135px)]">
              אין לדעת.
            </div>
          </div>
          <p data-reveal className="max-w-[900px] text-[24px] leading-[1.2em] font-normal text-pretty text-on-dark sm:text-[clamp(20px,2.55vw,29px)]">
            משבר רודף משבר, מגפה, מלחמה ובדרך ל...
            <br />
            משבר הבא.
            <br />
            <span className="hidden sm:inline">
              מה חייבים להבין?
              <br />
            </span>
            איך נשארים בלתי-ניתנים להחלפה בעולם שלא מפסיק לרוץ?
          </p>
          <p data-reveal className="max-w-[900px] text-[24px] leading-[1.2em] font-bold text-pretty text-white sm:text-[clamp(20px,2.55vw,29px)]">
            כי אם העולם מתהפך עלינו - הגיע הזמן להתהפך עליו בחזרה!
          </p>
          <div data-reveal data-reveal-early className="mt-2">
            <Cta href={CHECKOUT_URL} className="px-[22px] py-3 text-[20.7px] sm:px-11 sm:py-4 sm:text-[21.3px]">
              אני רוצה להתהפך עליו בחזרה!
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
