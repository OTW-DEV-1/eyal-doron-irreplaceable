'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/assets'
import { CARD } from '@/components/ui'

/** Two copies of this sequence make the strip loop seamlessly at the halfway point. */
const SEQUENCE = ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-3']

/**
 * Course-experience gallery: an endlessly drifting horizontal strip whose cards
 * dip and tilt into a shallow arc the further they are from centre.
 */
export function Gallery() {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const c = stripRef.current
    if (!c) return
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
      if (!paused) {
        pos += window.innerWidth < 640 ? 0.18 : 0.35
        c.scrollLeft = pos
      }
      if (c.scrollLeft >= half) {
        c.scrollLeft -= half
        pos = c.scrollLeft
      }
      if (c.scrollLeft < 1) {
        c.scrollLeft += half - c.clientWidth
        pos = c.scrollLeft
      }
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
          className="no-scrollbar flex cursor-grab gap-3 overflow-x-auto p-[24px_20vw_70px] [scrollbar-width:none] sm:gap-7 sm:p-[36px_40px_210px]"
        >
          {[...SEQUENCE, ...SEQUENCE].map((img, i) => (
            <div
              key={i}
              data-arc-card
              className={`${CARD} aspect-[3/4] w-[58vw] flex-none overflow-hidden rounded-3xl shadow-[0_18px_44px_rgba(20,19,24,.12)] will-change-transform sm:w-[clamp(240px,25vw,350px)]`}
            >
              <img
                src={asset(`gallery/${img}.png`)}
                alt="מתוך חוויית הקורס"
                draggable={false}
                className="pointer-events-none block h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
