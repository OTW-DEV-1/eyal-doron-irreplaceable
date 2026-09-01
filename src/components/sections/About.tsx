import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'

/** Dr. Eyal Doron bio: portrait bleeding off the right, copy on the left. */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-[18px] py-[50px] sm:py-10 sm:pr-0 sm:pl-[clamp(18px,6vw,8em)]">
      <Aurora
        colors="#725AF6,#E15839,#F6C760"
        intensity={0.9}
        style={{ top: 0, bottom: 0, right: 0, width: '66%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(246,245,243,0)_0%,rgba(246,245,243,0)_34%,rgba(246,245,243,.6)_52%,rgba(246,245,243,.92)_68%,#f6f5f3_82%,#f6f5f3_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-[linear-gradient(180deg,rgba(246,245,243,.92)_12%,rgba(246,245,243,0)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-[linear-gradient(180deg,rgba(246,245,243,0)_0%,rgba(246,245,243,.95)_88%)]" />

      <div className="relative z-[1] grid w-full grid-cols-1 items-center gap-14 md:grid-cols-[1fr_1.1fr]">
        <div
          data-reveal
          className="relative z-[1] flex min-h-0 w-full items-end justify-end self-stretch sm:min-h-[clamp(520px,58vw,820px)]"
        >
          <img
            src={asset('eyal-bg3.webp')}
            alt="ד״ר אייל דורון"
            className="static mx-auto block h-auto w-full max-w-[440px] sm:absolute sm:right-10 sm:bottom-0 sm:mx-0 sm:w-[118%] sm:max-w-[780px]"
          />
        </div>
        <div data-reveal className="relative z-[30] mr-0 text-center sm:mr-[clamp(20px,4.5vw,90px)] sm:ml-[clamp(40px,4.5vw,90px)] sm:text-right">
          <h2 className="text-headline mb-[10px] pt-[.12em] pb-[.18em] text-[44px] leading-[0.8em] font-bold sm:text-[clamp(34px,5.6vw,68px)]">
            ד״ר אייל דורון
          </h2>
          <p className="text-b2c mb-6 text-[clamp(20px,2.2vw,27px)] font-semibold">
            הקול המוביל בישראל לפיתוח חשיבה יצירתית.
          </p>
          <p className="text-[22.5px] leading-[1.2em] text-pretty text-ink-black sm:text-[clamp(20px,2.55vw,29px)]">
            דורון חקר בפוסט-דוקטורט שלו מודלים לפיתוח גמישות מחשבתית בקרב ילדים ובני-נוער. הוא יועץ ומלווה אסטרטגית
            ארגונים גלובליים, שימש כראש החטיבה לפסיכולוגיה ורוח בבית הספר לפסיכולוגיה באוניברסיטת רייכמן, ראש התוכנית
            Creativity in Action באוניברסיטת רייכמן, חוקר ומומחה לאסטרטגיה יצירתית ולניהול בעולם חסר ודאות.
          </p>
          <p className="mt-4 text-[22.5px] leading-[1.2em] text-pretty text-ink-black sm:text-[clamp(20px,2.55vw,29px)]">
            דורון עובד באופן שוטף עם מנהלים וארגונים ומוביל תהליכים מורכבים ומשני מציאות בארץ ובעולם. מחבר מספר רבי
            מכר שתורגמו לשפות שונות, האחרון שבהם הוא רב-המכר ״יש ממי ללמוד: 8 שיעורים משני חיים״.
          </p>
        </div>
      </div>
    </section>
  )
}
