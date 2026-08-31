import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'
import { CARD, Cta, GradientIcon, ICONS } from '@/components/ui'

const PULSE =
  'absolute rounded-full bg-[linear-gradient(90deg,rgba(114,90,246,0),#725AF6_35%,#E15839_50%,#F6C760_65%,rgba(246,199,96,0))] shadow-[0_0_18px_rgba(225,88,57,1),0_0_40px_rgba(225,88,57,.75)]'
const PULSE_V =
  'absolute rounded-full bg-[linear-gradient(180deg,rgba(114,90,246,0),#725AF6_35%,#E15839_50%,#F6C760_65%,rgba(246,199,96,0))] shadow-[0_0_18px_rgba(114,90,246,1),0_0_40px_rgba(114,90,246,.75)]'

/** Full-bleed horizontal tracer line with two travelling light pulses. */
function HLine({ top }: { top: string }) {
  return (
    <div
      aria-hidden
      className="absolute left-[calc(50%-50vw)] z-0 hidden h-px w-screen overflow-hidden bg-[rgba(225,88,57,.32)] sm:block"
      style={{ top }}
    >
      <div className={`${PULSE} top-0 h-px w-[18%] animate-[pulseR_3.4s_cubic-bezier(.4,0,.6,1)_infinite]`} />
      <div className={`${PULSE} top-0 h-px w-[18%] animate-[pulseL_3.4s_cubic-bezier(.4,0,.6,1)_infinite]`} />
    </div>
  )
}

/** Vertical tracer line spanning the grid's height. */
function VLine({ left }: { left: string }) {
  return (
    <div
      aria-hidden
      className="absolute top-0 bottom-0 z-0 hidden w-px overflow-hidden bg-[rgba(246,199,96,.40)] sm:block"
      style={{ left }}
    >
      <div className={`${PULSE_V} left-0 h-[20%] w-px animate-[pulseD_3.4s_cubic-bezier(.4,0,.6,1)_infinite]`} />
      <div className={`${PULSE_V} left-0 h-[20%] w-px animate-[pulseU_3.4s_cubic-bezier(.4,0,.6,1)_infinite]`} />
    </div>
  )
}

const CARDS: { icon: keyof typeof ICONS; title: string; text: string; from: 'right' | 'left' }[] = [
  {
    icon: 'map',
    title: '״מפת הקשרים״ שלכם בעולם',
    text: 'תוצר אישי המרכז ומסווג את רשת הקשרים והחיבורים שלכם, ומשמש כלי ותשתית להמשך פיתוחה.',
    from: 'right',
  },
  {
    icon: 'doc',
    title: 'מקורות מעוררי מחשבה',
    text: 'הפניות לספרים ולמאמרים שפשוט חייבים להכיר.',
    from: 'left',
  },
  {
    icon: 'ticket',
    title: 'הזמנה לאירועים',
    text: 'הזמנה לאירועים ייחודיים ומעוררי השראה.',
    from: 'right',
  },
  {
    icon: 'people',
    title: 'קהילת Creativity in Action',
    text: 'הזדמנות להצטרף לקהילה שלא תאפשר לשגרה להשכיח את מה שחשוב באמת - להמשיך לקבל עדכונים ותובנות ולהרחיב את מעגל החיבורים והאפשרויות.',
    from: 'left',
  },
]

/**
 * "What else do you get" — four cards around a glowing logo tile, wired
 * together by animated tracer lines. On phones only the cards remain, in a
 * single column.
 */
export function More() {
  return (
    <section id="more" className="px-4 pt-10 pb-[60px] sm:px-[clamp(18px,6vw,8em)] sm:pt-[90px] sm:pb-[70px]">
      <h2 data-reveal className="text-headline mb-3 pt-[.12em] pb-[.18em] text-center text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
        מה עוד מקבלים?
      </h2>
      <p data-reveal className="mb-[54px] pt-[10px] text-center text-[22.5px] font-semibold text-ink-black sm:text-[clamp(23px,2.7vw,31px)]">
        וכל מה שממשיך איתכם הלאה
      </p>
      <div className="relative mx-auto max-w-[1280px]">
        <div className="hidden sm:block">
          <Aurora
            colors="#725AF6,#E15839,#F6C760"
            intensity={0.64}
            fadeEdges
            style={{ top: '-8%', bottom: '-8%', left: '50%', transform: 'translateX(-50%)', width: '100vw', zIndex: 0 }}
          />
          <div className="pointer-events-none absolute -top-[8%] -bottom-[8%] left-1/2 z-0 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#f6f5f3_0%,rgba(246,245,243,.42)_20%,rgba(246,245,243,.2)_50%,rgba(246,245,243,.42)_80%,#f6f5f3_100%)]" />
        </div>
        <div className="relative grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_minmax(300px,380px)_1fr] sm:grid-rows-2 sm:gap-[26px_44px]">
          <HLine top="calc(25% - 40px)" />
          <HLine top="25%" />
          <HLine top="calc(25% + 40px)" />
          <HLine top="calc(75% - 40px)" />
          <HLine top="75%" />
          <HLine top="calc(75% + 40px)" />
          <VLine left="7%" />
          <VLine left="13%" />
          <VLine left="87%" />
          <VLine left="93%" />

          <MoreCard {...CARDS[0]} idx={0} />
          <div data-reveal data-reveal-mode="scale" className="relative z-[1] hidden min-h-[480px] items-center justify-center sm:row-span-2 sm:flex">
            <div className="flex h-[280px] w-[280px] items-center justify-center rounded-[44px] bg-[linear-gradient(135deg,#725AF6,#E15839_55%,#F6C760)] shadow-[0_14px_36px_rgba(114,90,246,.28)]">
              <img src={asset('logo-white.png')} alt="ד״ר אייל דורון" className="block h-auto w-[78%]" />
            </div>
          </div>
          <MoreCard {...CARDS[1]} idx={1} />
          <MoreCard {...CARDS[2]} idx={2} />
          <MoreCard {...CARDS[3]} idx={3} />
        </div>
      </div>
      <div data-reveal data-reveal-early className="mt-11 text-center">
        <Cta href="#price" className="px-[22px] py-3 text-[20.7px] sm:px-10 sm:py-4 sm:text-[21.3px]">
          הנה - הצטרפתי
        </Cta>
      </div>
    </section>
  )
}

function MoreCard({
  icon,
  title,
  text,
  from,
  idx,
}: {
  icon: keyof typeof ICONS
  title: string
  text: string
  from: 'right' | 'left'
  idx: number
}) {
  return (
    <div
      data-reveal
      data-reveal-x={from}
      className={`${CARD} relative z-[1] flex flex-col items-center justify-center gap-[10px] rounded-[30px] p-[38px_40px] text-center shadow-[0_12px_34px_rgba(20,19,24,.07)] transition-[transform,box-shadow] duration-[350ms] hover:-translate-y-[5px] hover:shadow-[0_22px_48px_rgba(20,19,24,.14)]`}
    >
      <GradientIcon id={`more-${idx}`} paths={ICONS[icon]} size={56} />
      <h4 className="text-[24px] leading-[1.3] font-bold sm:text-[25.5px]">{title}</h4>
      <p className="text-[21.5px] leading-[1.4] text-pretty text-gray-body">{text}</p>
    </div>
  )
}
