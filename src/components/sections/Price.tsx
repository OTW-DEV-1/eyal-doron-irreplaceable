import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'
import { CARD, Cta, GradientIcon, ICONS } from '@/components/ui'

/** Price card with a running conic border, plus the book-bundle perk row. */
export function Price() {
  return (
    <section id="price" className="px-4 pt-5 pb-10 sm:px-[clamp(18px,6vw,8em)] sm:pt-[30px] sm:pb-[60px]">
      <div
        data-reveal
        className="anim-border relative overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#FFFFFF_0%,#EFEEEB_100%)] p-[clamp(36px,4vw,60px)_clamp(24px,4vw,56px)] text-center"
      >
        <Aurora
          colors="#725AF6,#E15839,#F6C760"
          intensity={1.12}
          style={{
            inset: 0,
            zIndex: 1,
            WebkitMaskImage:
              'radial-gradient(ellipse 30% 42% at 0% 0%, #000 0%, rgba(0,0,0,.6) 30%, transparent 52%),radial-gradient(ellipse 30% 42% at 100% 100%, #000 0%, rgba(0,0,0,.6) 30%, transparent 52%)',
            maskImage:
              'radial-gradient(ellipse 30% 42% at 0% 0%, #000 0%, rgba(0,0,0,.6) 30%, transparent 52%),radial-gradient(ellipse 30% 42% at 100% 100%, #000 0%, rgba(0,0,0,.6) 30%, transparent 52%)',
          }}
        />
        <img src={asset('price-texture.png')} alt="" className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-80" />
        <div className="relative z-[2]">
          <h3 className="text-headline mb-[26px] pt-[.12em] pb-[.18em] text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
            עלות התהליך כולו*
          </h3>
          <div className="text-[26px] font-semibold text-ink-black sm:text-[clamp(24px,2.8vw,34px)]">
            מחיר רגיל <span className="font-semibold text-ink-gray line-through [text-decoration-thickness:2px]">3,500 ש״ח</span>
          </div>
          <div className="mt-[14px] text-[clamp(19px,2vw,24px)] font-semibold text-ink-black">מחיר לאחר הנחה</div>
          <div className="text-b2c mt-[6px] py-[.08em] text-[64px] leading-none font-bold sm:text-[clamp(56px,8vw,110px)]">
            1,500 ₪
          </div>
          <div className="text-[clamp(19px,2vw,24px)] font-semibold text-ink-black">כולל מע״מ</div>
          <p className="mx-auto mt-[18px] max-w-[760px] text-[22.5px] leading-[1.2em] text-pretty text-ink-black sm:text-[clamp(20px,2.55vw,29px)]">
            * העלות כוללת את השיעורים המוקלטים וסדנת הסיכום הפרונטלית.
          </p>
          <div className="mt-[30px] pt-[22px]">
            <Cta href="#contact" className="px-[22px] py-3 text-[20.7px] sm:px-[52px] sm:py-[17px] sm:text-[23px]">
              להרשמה מהירה
            </Cta>
          </div>
        </div>
      </div>

      <div
        data-reveal
        data-reveal-early
        className={`${CARD} mt-5 flex flex-col flex-nowrap items-center justify-center gap-[18px] rounded-[26px] p-[30px_22px] text-center sm:flex-row sm:justify-between sm:p-[30px_clamp(22px,3vw,44px)] sm:text-right`}
      >
        <div className="flex flex-1 flex-col items-center gap-[18px] text-center sm:min-w-0 sm:flex-row sm:items-center sm:text-right">
          <div className="flex-none">
            <GradientIcon id="perk-gift" paths={ICONS.gift} size={52} />
          </div>
          <div>
            <h4 className="mb-1 text-[24px] font-bold sm:text-[clamp(24px,2.9vw,33px)]">הטבה מיוחדת שתגיע עד אליכם</h4>
            <p className="text-[20.7px] leading-[1.2em] text-pretty text-ink-black sm:text-[clamp(18px,2.3vw,26.1px)]">
              קבלת מחברת הקורס המלווה <br className="sm:hidden" />
              עם הספר החדש של ד״ר אייל דורון <br className="sm:hidden" />
              ״יש ממי ללמוד״ בעלות נוספת <br className="sm:hidden" />
              של 50 ש״ח בלבד.
            </p>
          </div>
        </div>
        <Cta href="#contact" variant="outline" className="flex-none px-7 py-[13px] text-[20px] whitespace-nowrap">
          להרשמה כולל ההטבה
        </Cta>
      </div>
    </section>
  )
}
