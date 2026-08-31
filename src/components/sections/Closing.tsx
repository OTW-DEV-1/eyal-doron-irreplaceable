import { Aurora } from '@/components/reactbits/Aurora'
import { CHECKOUT_URL, Cta } from '@/components/ui'

/** Closing message + personal quote card over a soft aurora. */
export function Closing() {
  return (
    <section id="closing" className="px-3 py-5 sm:px-0 sm:py-[30px]">
      <div className="relative overflow-hidden px-[18px] py-[60px] text-center sm:px-[clamp(16px,4.5vw,5em)] sm:pt-[clamp(60px,7vw,100px)] sm:pb-[clamp(90px,10vw,150px)]">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={1.2} fadeEdges style={{ inset: 0 }} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f6f5f3_0%,rgba(246,245,243,.55)_30%,rgba(246,245,243,.45)_55%,rgba(246,245,243,.6)_80%,#f6f5f3_100%)]" />
        <div className="relative z-[2] mx-auto flex max-w-[980px] flex-col items-center gap-[26px]">
          <h2
            data-reveal
            className="text-headline w-full self-center pt-[.12em] pb-[.12em] text-center text-[42px] leading-[0.9em] font-bold whitespace-normal sm:w-[96vw] sm:text-[clamp(24px,4.4vw,68px)] sm:whitespace-nowrap"
          >
            תפסיקו לנסות להתכונן לעתיד, תיצרו אותו. <br />
            <span className="text-b2c">תייצרו עתיד מקורי ומלא בהפתעה עצמית.</span>
          </h2>
          <p data-reveal className="text-[22.5px] leading-[1.2em] font-semibold text-ink sm:text-[clamp(20px,2.55vw,29px)]">
            ובמאמר אישי ממני
          </p>
          <div
            data-reveal
            className="max-w-[760px] rounded-[22px] border border-white bg-[linear-gradient(160deg,rgba(255,255,255,.85)_0%,rgba(239,238,235,.85)_100%)] p-[28px_32px] backdrop-blur-[8px]"
          >
            <p className="text-[22.5px] leading-[1.2em] text-pretty text-ink sm:text-[clamp(20px,2.55vw,29px)]">
              ״מניסיון של אלפי סדנאות ותהליכים, אנשים הם הרבה יותר מוכשרים ויצירתיים ממה שנדמה להם. הבעיה שהם מביאים
              זאת לידי ביטוי לרוב רק במצבי קיצון. הרעיון הוא לחיות ׳על מלא׳ ביום-יום שלנו, כל פעם מחדש.״
            </p>
            <p className="mt-[14px] text-[26px] font-bold text-ink-gray">אייל</p>
          </div>
          <div data-reveal data-reveal-early className="mt-[6px]">
            <Cta href={CHECKOUT_URL} className="px-[22px] py-3 text-[20.7px] sm:px-[46px] sm:py-[17px] sm:text-[22.5px]">
              אני רוצה לצאת לדרך!
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
