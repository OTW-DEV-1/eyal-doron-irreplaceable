import { Aurora } from '@/components/reactbits/Aurora'
import { Cta } from '@/components/ui'

/** Dark panel where Dr. Doron pitches the process in his own voice. */
export function Process() {
  return (
    <section id="process" className="px-3 py-5 sm:px-[clamp(16px,4.5vw,5em)] sm:py-[30px]">
      <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-dark px-4 pt-[46px] pb-14 text-on-dark sm:px-[clamp(20px,4vw,60px)] sm:py-[clamp(50px,6vw,80px)]">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={0.55} style={{ inset: 0 }} />
        <div className="relative z-[2]">
          <h2 data-reveal className="mb-[2px] pt-[.12em] pb-[.15em] text-center text-[44px] leading-[0.8em] font-bold text-white sm:text-[clamp(34px,5.6vw,68px)]">
            אני רוצה להציע לכם
          </h2>
          <div className="h-9" />
          <div data-reveal className="mx-auto max-w-[1000px] text-center">
            <p className="text-[22.5px] leading-[1.3em] text-pretty text-on-dark sm:text-[clamp(20px,2.55vw,29px)]">
              תהליך דיגיטלי ופיזי חדש שפיתחתי, עם המון ידע מפיל אסימונים, תובנות ומקורות מגוונים ללמידה, ובעיקר עם דגש
              גדול על כלים מעשיים ותהליך מובנה ליישום.
              <br />
              &nbsp;זהו מסלול ייחודי המשלב שיעורים מצולמים, ליווי אישי, הן פרסונלי (בני אדם.. כן כן)
              <br />
              והן של צ׳ט בוט מיוחד להתייעצות, וסדנה מעשית מסכמת פרונטלית איתי.
            </p>
          </div>
          <p data-reveal className="mx-auto mt-11 text-center text-[27.5px] font-bold text-white sm:text-[clamp(22px,2.6vw,30px)]">
            הצטרפו לקהילה של אנשים שחושבים אחרת, ביחד.
            <br />
            <span className="text-[.85em] font-normal text-on-dark-muted">ד״ר אייל דורון</span>
          </p>
          <div data-reveal data-reveal-early className="mt-[30px] text-center">
            <Cta href="#price" className="px-[22px] py-3 text-[20.7px] sm:px-[38px] sm:py-4 sm:text-[21.3px]">
              גם אני רוצה תוכנית אסטרטגית לעולם מתהפך!
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
