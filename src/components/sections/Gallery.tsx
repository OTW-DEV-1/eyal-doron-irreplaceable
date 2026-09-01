'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/assets'

/** Two stacked marquee rows: the top one cycles images 1-5, the bottom 6-13. */
const TOP = ['image1', 'image2', 'image3', 'image4', 'image5']
const BOTTOM = ['image6', 'image7', 'image8', 'image9', 'image10', 'image11', 'image12', 'image13']

/** Marquee speed in px per frame; matched across both rows. */
const SPEED = 0.4

/**
 * One continuously drifting panoramic row. The set is rendered twice and the
 * track's offset wraps inside [-half, 0), so the loop point is invisible in
 * both directions. Each panel's rotateY/translateZ is derived every frame from
 * its live distance to the viewport centre — straight in the middle, receding
 * toward the edges — which keeps the concave read correct while the row moves.
 *
 * All animation state lives in refs and inline styles; React never re-renders
 * during the loop.
 */
function Row({ images, direction }: { images: string[]; direction: 1 | -1 }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const panels = Array.from(track.children) as HTMLElement[]
    let offset = 0
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const half = track.scrollWidth / 2
      if (!half) return
      if (!reduced) {
        offset += SPEED * direction
        if (offset <= -half) offset += half
        if (offset > 0) offset -= half
      }
      track.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`

      const vr = viewport.getBoundingClientRect()
      const mid = vr.left + vr.width / 2
      const mobile = vr.width < 641
      const maxDeg = mobile ? 5 : 12
      const depth = mobile ? 26 : 70
      for (const p of panels) {
        const r = p.getBoundingClientRect()
        const n = Math.max(-1, Math.min(1, (r.left + r.width / 2 - mid) / (vr.width / 2)))
        p.style.transform = `rotateY(${(n * maxDeg).toFixed(2)}deg) translateZ(${(-Math.abs(n) * depth).toFixed(1)}px)`
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [direction])

  return (
    <div ref={viewportRef} dir="ltr" className="overflow-hidden [perspective:1200px]">
      <div ref={trackRef} className="flex w-max gap-[10px] [transform-style:preserve-3d] will-change-transform">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            aria-hidden={i >= images.length || undefined}
            className="aspect-video w-[62vw] flex-none bg-page will-change-transform sm:w-[32.5vw]"
          >
            <img
              src={asset(`gallery/${img}.webp`)}
              alt="מתוך חוויית הקורס"
              draggable={false}
              className="pointer-events-none block h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Course-experience gallery: two full-bleed panoramic marquees stacked
 * vertically — the top row drifts right, the bottom row drifts left — with a
 * subtle concave 3D read, like a shallow curved cinema screen.
 */
export function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden py-10 sm:py-[60px]">
      <div data-reveal className="flex flex-col gap-4 sm:gap-6">
        <Row images={TOP} direction={1} />
        <Row images={BOTTOM} direction={-1} />
      </div>
    </section>
  )
}
