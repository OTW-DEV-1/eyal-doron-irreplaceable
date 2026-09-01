'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/assets'
import { CARD } from '@/components/ui'

/** Two copies of this sequence make the strip loop seamlessly at the halfway point. */
const SEQUENCE = [
  'gallery-1',
  'gallery-2',
  'gallery-3',
  'gallery-4',
  'gallery-5',
  'gallery-6',
  'gallery-7',
  'gallery-8',
  'gallery-9',
]

/**
 * Course-experience gallery: an endlessly drifting horizontal strip whose cards
 * dip and tilt into a shallow arc the further they are from centre.
 */
export function Gallery() {
  const stripRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const c = stripRef.current
    const track = trackRef.current
    if (!c || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let pos: number | null = null
    let paused = false

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (c.scrollWidth <= c.clientWidth) return
      const half = c.scrollWidth / 2
      // A user drag moves scrollLeft under us; resync instead of fighting it.
      if (pos == null || Math.abs(c.scrollLeft - pos) > 2) pos = c.scrollLeft
      if (!paused) pos += window.innerWidth < 640 ? 0.26 : 0.35
      if (pos >= half) pos -= half
      if (pos < 1) pos += half - c.clientWidth
      // scrollLeft is quantized to whole pixels, which makes a slow drift
      // visibly step. Scroll the integer part and put the sub-pixel remainder
      // on the track as a transform so the motion stays perfectly smooth.
      const whole = Math.floor(pos)
      c.scrollLeft = whole
      track.style.transform = `translateX(${(whole - pos).toFixed(3)}px)`
      const cr = c.getBoundingClientRect()
      const mid = cr.left + cr.width / 2
      const mob = cr.width < 640
      c.querySelectorAll<HTMLElement>('[data-arc-card]').forEach((card) => {
        const r = card.getBoundingClientRect()
        const nx = (r.left + r.width / 2 - mid) / (cr.width / 2)
        card.style.transform = `translateY(${(nx * nx * (mob ? 26 : 120)).toFixed(1)}px) rotate(${(nx * (mob ? 4 : 9)).toFixed(2)}deg)`
      })
    }

    const onTouchStart = () => {
      paused = true
    }
    let resume = 0
    const onTouchEnd = () => {
      clearTimeout(resume)
      resume = window.setTimeout(() => {
        paused = false
      }, 1200)
    }
    c.addEventListener('touchstart', onTouchStart, { passive: true })
    c.addEventListener('touchend', onTouchEnd, { passive: true })

    const start = setTimeout(() => {
      c.scrollLeft = 2
      tick()
    }, 300)

    return () => {
      clearTimeout(start)
      clearTimeout(resume)
      cancelAnimationFrame(raf)
      c.removeEventListener('touchstart', onTouchStart)
      c.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <section id="gallery" className="pt-10 pb-0 sm:pt-5 sm:pb-[30px]">
      <div data-reveal className="relative overflow-hidden">
        <div
          ref={stripRef}
          dir="ltr"
          className="no-scrollbar cursor-grab overflow-x-auto [scrollbar-width:none]"
        >
          <div ref={trackRef} className="flex w-max gap-3 p-[24px_20vw_70px] will-change-transform sm:gap-7 sm:p-[36px_40px_210px]">
          {[...SEQUENCE, ...SEQUENCE].map((img, i) => (
            <div
              key={i}
              data-arc-card
              className={`${CARD} aspect-[3/4] w-[58vw] flex-none overflow-hidden rounded-3xl shadow-[0_18px_44px_rgba(20,19,24,.12)] will-change-transform sm:w-[clamp(240px,25vw,350px)]`}
            >
              <img
                src={asset(`gallery/${img}.webp`)}
                alt="מתוך חוויית הקורס"
                draggable={false}
                className="pointer-events-none block h-full w-full object-cover"
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
