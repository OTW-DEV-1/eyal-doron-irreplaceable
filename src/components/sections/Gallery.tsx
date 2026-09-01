'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/assets'

/** Two stacked marquee rows: the top one cycles images 1-5, the bottom 6-13. */
const TOP = ['image1', 'image2', 'image3', 'image4', 'image5']
const BOTTOM = ['image6', 'image7', 'image8', 'image9', 'image10', 'image11', 'image12', 'image13']

/** Marquee speed in px per frame; matched across both rows. */
const SPEED = 0.4

/** Soft fade toward both side edges of each row. */
const EDGE_FADE = 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)'

/**
 * One continuously drifting flat row. The set is rendered twice and the
 * track's offset wraps inside [-half, 0), so the loop point is invisible in
 * both directions.
 *
 * All animation state lives in refs and inline styles; React never re-renders
 * during the loop.
 */
function Row({ images, direction }: { images: string[]; direction: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let offset = 0
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const half = track.scrollWidth / 2
      if (!half) return
      offset += SPEED * direction
      if (offset <= -half) offset += half
      if (offset > 0) offset -= half
      track.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [direction])

  return (
    <div dir="ltr" className="overflow-hidden" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
      <div ref={trackRef} className="flex w-max gap-[16px] will-change-transform">
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            aria-hidden={i >= images.length || undefined}
            className="flex aspect-video w-[62vw] flex-none items-center sm:w-[32.5vw]"
          >
            {/* w-full + h-auto keeps the element box identical to the bitmap,
                so the 10px radius rounds the visible image itself. */}
            <img
              src={asset(`gallery/${img}.webp`)}
              alt="מתוך חוויית הקורס"
              draggable={false}
              className="pointer-events-none block h-auto max-h-full w-full rounded-[10px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Course-experience gallery: two full-bleed flat marquees stacked vertically —
 * the top row drifts right, the bottom row drifts left — with a soft fade at
 * both side edges.
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
