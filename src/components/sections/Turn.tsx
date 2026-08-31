import { asset } from '@/lib/assets'
import { Aurora } from '@/components/reactbits/Aurora'
import { Cta } from '@/components/ui'

/** Big statement break: aurora + photographic texture behind a single headline. */
export function Turn() {
  return (
    <section id="turn" className="relative overflow-hidden px-4 py-[60px] text-center sm:px-[clamp(18px,6vw,8em)] sm:py-[210px]">
      <Aurora
        colors="#725AF6,#E15839,#F6C760,#F6C760,#E15839,#725AF6"
        speed={2.2}
        intensity={1.19}
        style={{ inset: 0 }}
      />
      <img src={asset('turn-texture.png')} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute top-[8%] -right-[12%] bottom-[8%] w-[42%] bg-[radial-gradient(ellipse_60%_46%_at_72%_50%,rgba(114,90,246,.35)_0%,rgba(225,88,57,.22)_45%,rgba(246,199,96,.11)_66%,rgba(246,245,243,0)_82%)] blur-[40px]" />
      <div className="pointer-events-none absolute top-[8%] bottom-[8%] -left-[12%] w-[42%] bg-[radial-gradient(ellipse_60%_46%_at_28%_50%,rgba(246,199,96,.35)_0%,rgba(225,88,57,.22)_45%,rgba(114,90,246,.13)_66%,rgba(246,245,243,0)_82%)] blur-[40px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f6f5f3_0%,#f6f5f3_18%,rgba(246,245,243,0)_38%,rgba(246,245,243,0)_68%,#f6f5f3_88%,#f6f5f3_100%),linear-gradient(90deg,rgba(246,245,243,0)_0%,rgba(246,245,243,0)_12%,rgba(246,245,243,.5)_32%,rgba(246,245,243,.62)_50%,rgba(246,245,243,.5)_68%,rgba(246,245,243,0)_88%,rgba(246,245,243,0)_100%)]" />

      <h2
        data-reveal
        className="text-headline relative z-[1] pt-[.12em] pb-[.18em] text-[44px] leading-[1.05] font-bold text-pretty sm:text-[clamp(38px,6.6vw,84px)] sm:leading-[0.8em]"
      >
        העולם מתהפך עלינו. <br />
        הגיע הזמן <br className="sm:hidden" />
        <span className="text-b2c">להתהפך עליו בחזרה.</span>
      </h2>
      <div data-reveal data-reveal-early className="relative z-[1] mt-10">
        <Cta href="#price" className="px-[22px] py-3 text-[20.7px] sm:px-11 sm:py-4 sm:text-[22px]">
          אני רוצה להתהפך עליו בחזרה!
        </Cta>
      </div>
    </section>
  )
}
