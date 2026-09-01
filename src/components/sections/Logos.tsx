import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'
import { LogoLoop } from '@/components/reactbits/LogoLoop'
import { CARD } from '@/components/ui'

const ROW_A = [
  { file: 'logo-nestle.png', alt: 'נסטלה' },
  { file: 'logo-matrix.png', alt: 'מטריקס' },
  { file: 'logo-babcom.png', alt: 'באבקום' },
  { file: 'logo-movement.png', alt: 'מובמנט' },
]

const ROW_B = [
  { file: 'logo-bezeq.png', alt: 'בזק' },
  { file: 'logo-bluebird.png', alt: 'בלובירד' },
  { file: 'logo-cibus.png', alt: 'סיבוס' },
  { file: 'logo-lusha.png', alt: 'לושה' },
]

function LogoCard({ file, alt }: { file: string; alt: string }) {
  return (
    <div className={`${CARD} h-[110px] w-[210px] flex-none rounded-[18px] p-[22px_28px] sm:h-[140px] sm:w-[270px] sm:rounded-3xl sm:p-[28px_38px]`}>
      <img src={asset(`logos/${file}`)} alt={alt} className="block h-full w-full object-contain" />
    </div>
  )
}

/** Trust strip: double marquee of client logos over a faded aurora. */
export function Logos() {
  return (
    <section id="logos" className="relative z-[1] pt-[50px] pb-4 sm:pt-[100px] sm:pb-8">
      <Aurora
        colors="#725AF6,#E15839,#F6C760"
        intensity={0.6}
        fadeEdges
        style={{ top: 0, left: 0, right: 0, height: '480px', bottom: 'auto' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[linear-gradient(180deg,#f6f5f3_0%,#f6f5f3_6%,rgba(246,245,243,.8)_24%,rgba(246,245,243,.62)_50%,rgba(246,245,243,.8)_76%,#f6f5f3_94%,#f6f5f3_100%)]" />
      <div className="relative z-[1] w-full text-center">
        <p
          data-reveal
          className="mx-auto mb-11 px-5 pb-[10px] text-center text-[25px] leading-[1.27em] font-bold whitespace-normal text-ink sm:pb-7 sm:text-[clamp(18px,2.75vw,45px)] sm:leading-[1.25em] sm:whitespace-nowrap"
        >
          במשך שנים מלווה ד״ר אייל דורון יזמים, ארגונים, הנהלות בכירות, מובילי חינוך ומשרדי ממשלה <br className="hidden sm:inline" />
          באסטרטגיה יצירתית, בפיתוח טלנטים ודור עתיד וחתירה להישגי שיא בעולם של חוסר ודאות.
        </p>
        <div data-reveal>
          <LogoLoop gap={40} duration={26}>
            {ROW_A.map((l) => (
              <LogoCard key={l.file} {...l} />
            ))}
          </LogoLoop>
          <div className="h-7" />
          <LogoLoop gap={40} duration={26} reverse>
            {ROW_B.map((l) => (
              <LogoCard key={l.file} {...l} />
            ))}
          </LogoLoop>
        </div>
        <p
          data-reveal
          className="mx-auto mt-11 px-5 text-center text-[6.6vw] leading-[1.27em] font-bold whitespace-normal text-ink sm:text-[clamp(18px,2.75vw,45px)] sm:leading-normal sm:whitespace-nowrap"
        >
          וכעת, לראשונה, הוא הופך את הידע, <br className="sm:hidden" />
          הניסיון והכלים שצבר <br className="sm:hidden" />
          לתהליך הפתוח לכולם.
        </p>
      </div>
    </section>
  )
}
