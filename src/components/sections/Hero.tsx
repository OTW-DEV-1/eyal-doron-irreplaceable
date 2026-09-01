import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'
import { CHECKOUT_URL, Cta } from '@/components/ui'

/**
 * Full-height opener.
 *
 * Desktop layers an aurora canvas behind the copy, scrimmed left-to-right so
 * the left (image) side glows and the text side stays readable. Below 641px
 * the aurora is replaced by a bottom-masked animated gradient wash, per the
 * prototype's mobile #hero::before rule.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-[5] flex min-h-0 flex-col justify-start overflow-hidden px-4 pt-[84px] pb-14 sm:min-h-screen sm:pt-[120px] sm:pr-[clamp(16px,4.5vw,5em)] sm:pb-10 sm:pl-0"
    >
      {/* Mobile-only gradient wash, masked toward the bottom of the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 animate-[b2cGradShift_9s_ease-in-out_infinite_alternate] bg-[linear-gradient(90deg,#725AF6_0%,#E15839_50%,#F6C760_100%)] bg-[length:300%_100%] opacity-40 [mask-image:linear-gradient(180deg,transparent_0%,transparent_46%,rgba(0,0,0,.5)_62%,#000_76%,rgba(0,0,0,.55)_90%,transparent_100%)] sm:hidden"
      />

      <div className="hidden sm:block">
        {/* The prototype anchors the aurora to the LEFT 70% of the section (the
            portrait side in this RTL layout). speed 0 + a fixed seed hold a
            single art-directed composition: drifting blobs kept wandering into
            washed-out corners, which read as a broken background. */}
        <Aurora
          colors="#725AF6,#E15839,#F6C760"
          intensity={1.7}
          speed={0}
          seed={8.11}
          style={{ top: 0, bottom: 0, left: 0, width: '70%', height: 'auto' }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,245,242,0)_0%,rgba(246,245,242,0)_46%,rgba(246,245,242,.62)_60%,rgba(246,245,242,.9)_72%,#F6F5F2_100%)]" />
          <div className="absolute inset-x-0 top-0 h-[150px] bg-[linear-gradient(180deg,rgba(246,245,242,.85)_20%,rgba(246,245,242,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[linear-gradient(180deg,rgba(246,245,243,0)_0%,rgba(246,245,243,.96)_70%,#f6f5f3_100%)]" />
        </div>
      </div>

      <div className="relative z-[2] grid w-full grid-cols-1 items-start gap-6 sm:pt-[8vh] md:grid-cols-[1.05fr_.95fr] md:gap-14">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-right md:-translate-y-[4%]">
          <div data-reveal className="mt-[10px] sm:mt-0">
            <h1 className="text-headline pt-0 pb-[.06em] text-[min(63.75px,16.15vw)] leading-[0.9] font-bold sm:pt-[.04em] sm:text-[clamp(51.8px,9.15vw,119.6px)] sm:leading-[0.8em]">
              הבלתי-ניתנים
              <br />
              <span className="text-b2c">להחלפה</span>
            </h1>
          </div>
          <p
            data-reveal
            className="mt-2 mb-0 text-[24.8px] leading-[1.26em] font-normal tracking-[.02em] text-ink-black sm:mt-3 sm:mb-0 sm:text-[clamp(22.6px,3vw,39.7px)] sm:leading-[1.2em]"
          >
            תוכנית פעולה חדשה לעולם מסוג חדש
          </p>
          <p
            data-reveal
            className="mt-5 w-full max-w-full pb-[10px] text-[22.5px] leading-[1.1em] font-semibold text-pretty text-ink sm:mt-10 sm:w-auto sm:max-w-[945px] sm:pb-0 sm:text-[clamp(22.5px,2.97vw,33.7px)] sm:leading-[1.05em]"
          >
            הקורס הדיגיטלי-פיזי החדש <span className="whitespace-nowrap">של ד״ר אייל דורון</span>
          </p>
          <p
            data-reveal
            className="-mt-1 mb-[10px] w-full max-w-full text-[22.5px] leading-[1.26em] font-normal text-pretty text-ink sm:mt-[4px] sm:mb-0 sm:w-auto sm:max-w-[920px] sm:text-[clamp(19.9px,2.52vw,28.8px)] sm:leading-[1.15em]"
          >
            עם כלים ואסטרטגיה לחיים בעולם שלא מפסיק להתהפך.
          </p>
          <div data-reveal className="mt-0 flex flex-col items-center gap-[14px] pt-0 sm:mt-[1em] sm:items-start sm:pt-[0.5em]">
            <div className="mt-[18px] mb-[15px] flex w-full flex-wrap items-center justify-center gap-4 sm:mt-7 sm:mb-0 sm:w-auto sm:justify-start">
              <Cta href={CHECKOUT_URL} className="px-[22px] py-3 text-[20.7px] sm:px-[53px] sm:py-[20px] sm:text-[30px]">
                אני רוצה לצאת לדרך!
              </Cta>
            </div>
            {/* Desktop "start here" badge: rendered from a zero-height wrapper
                so it always sits below the CTA, right-aligned with it, at
                every size - without adding column height that would shift the
                portrait. The ring spins gently, the arrow floats inside. */}
            <div className="hidden h-0 self-stretch md:block">
              <a href="#logos" className="relative mt-8 block aspect-square w-[clamp(112px,9.5vw,150px)]">
                <img
                  src={asset('circle-badge.png')}
                  alt=""
                  className="absolute inset-0 h-full w-full animate-[spinSlow_18s_linear_infinite] object-contain"
                />
                <img
                  src={asset('scroll-arrow.png')}
                  alt="לסקשן הבא"
                  className="absolute top-1/2 left-1/2 h-[38%] w-[32%] animate-[bobArrow_2.2s_ease-in-out_infinite] object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="relative order-2 mt-0 flex min-h-0 items-end justify-start self-stretch md:order-none md:min-h-[460px]"
        >
          <img
            src={asset('about-eyal.webp')}
            alt="ד״ר אייל דורון"
            className="relative mx-auto block h-auto w-full max-w-[420px] md:absolute md:top-1/2 md:left-0 md:mx-0 md:w-[97.1%] md:max-w-[770px] md:translate-x-[25%] md:-translate-y-[40%]"
          />
        </div>
      </div>
    </section>
  )
}
