import { CurvedLoop } from '@/components/reactbits/CurvedLoop'

/** Outlined "Creativity in Action" marquee arcing under the hero. */
export function CreativityStrip() {
  return (
    <section id="creativity-strip" className="relative z-[6] overflow-hidden bg-page pt-[26px] pb-[6px] sm:z-auto sm:bg-transparent sm:pt-0 sm:pb-16">
      {/* On phones the arc is zoomed in (scale 2.55) and its extra height folded
          away with negative margins, exactly as the prototype does. */}
      <div data-reveal className="-my-7 [&_svg]:scale-[2.55] sm:my-0 sm:[&_svg]:scale-100">
        <CurvedLoop text="Creativity in Action" fontSize={94} curve={64} speed={90} height={170} />
      </div>
    </section>
  )
}
