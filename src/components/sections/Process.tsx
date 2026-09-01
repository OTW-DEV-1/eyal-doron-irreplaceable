import { Aurora } from '@/components/reactbits/Aurora'
import { CHECKOUT_URL, Cta } from '@/components/ui'

/** Dark panel where Dr. Doron pitches the process in his own voice. */
export function Process() {
  return (
    <section id="process" className="px-3 py-5 sm:px-[clamp(16px,4.5vw,5em)] sm:py-[30px]">
      <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-dark px-4 pt-[46px] pb-14 text-on-dark sm:px-[clamp(20px,4vw,60px)] sm:py-[clamp(50px,6vw,80px)]">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={0.55} style={{ inset: 0 }} />
        <div className="relative z-[2]">
          <h2 data-reveal className="mb-[2px] pt-[.12em] pb-[.15em] text-center text-[44px] leading-[0.8em] font-bold text-white sm:text-[clamp(34px,5.6vw,68px)]">
            הבלתי-ניתנים להחלפה
          </h2>
          <div className="h-9" />
          <div data-reveal className="mx-auto max-w-[1240px] text-center">
            <p className="text-[22.5px] leading-[1.3em] text-pretty text-on-dark sm:text-[clamp(20px,2.55vw,29px)]">
              תהליך דיגיטלי-פיזי חדש המשלב ידע תיאורטי וניסיון של שנים בעבודה בשטח.
              <br />
              מסלול ייחודי של ידע והשראה ממגוון עולמות, מודלים ומחקר, תובנות מפילות אסימונים וכלים מעשיים ליישום.
            </p>
            <p className="mt-6 text-[22.5px] leading-[1.3em] text-pretty text-on-dark sm:text-[clamp(20px,2.55vw,29px)]">
              שיעורים מצולמים, חומרים מקוריים לתרגול, קהילת עבודה משותפת, ליווי אישי של מנחה,
              <br className="hidden sm:inline" />
              {' '}צ׳ט-בוט מיוחד להתייעצות וסדנת סיום פיסית.
              <br />
              הרעיון הוא לא רק לחשוב אחרת, אלא לקחת את החשיבה הזאת לחיים ולעבודה ולתרגם אותה לאסטרטגיה ולתוכנית פעולה
              מעשית משלכם.
            </p>
          </div>
          <p data-reveal className="mx-auto mt-11 text-center text-[27.5px] font-bold text-white sm:text-[clamp(22px,2.6vw,30px)]">
            בואו לחשוב אחרת, ביחד.
          </p>
          <div data-reveal data-reveal-early className="mt-[30px] text-center">
            <Cta href={CHECKOUT_URL} className="px-[22px] py-3 text-[20.7px] sm:px-[38px] sm:py-4 sm:text-[21.3px]">
              אני בפנים!
            </Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
