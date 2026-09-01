'use client'

import { useEffect, useState } from 'react'

const VIMEO_ID = '1219221055'
const VIMEO_HASH = '2dba3f212d'
const PLAYER_URL = `https://player.vimeo.com/video/${VIMEO_ID}?h=${VIMEO_HASH}`
/** Instant low-effort poster; replaced by the sharper oEmbed thumbnail once fetched. */
const FALLBACK_POSTER = `https://vumbnail.com/${VIMEO_ID}.jpg`

/** Split section: gradient headline + CTA on one side, a 9:16 Vimeo teaser on the other. */
export function IntroVideo() {
  const [playing, setPlaying] = useState(false)
  const [poster, setPoster] = useState(FALLBACK_POSTER)

  useEffect(() => {
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${VIMEO_ID}/${VIMEO_HASH}`)}&width=720`,
    )
      .then((r) => r.json())
      .then((d: { thumbnail_url?: string }) => {
        if (d?.thumbnail_url) setPoster(d.thumbnail_url.replace(/-d_[0-9x]+$/, '-d_720x1280'))
      })
      .catch(() => {})
  }, [])

  return (
    <section
      id="intro-video"
      className="relative px-4 pt-5 pb-[6px] sm:px-[clamp(18px,6vw,8em)] sm:pt-2 sm:pb-[110px]"
    >
      {/* Animated gradient washing in from both sides, fading toward the video
          and toward the top/bottom edges so it blends into the sections around it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 animate-[b2cGradShift_9s_ease-in-out_infinite_alternate] bg-[linear-gradient(90deg,#725AF6_0%,#E15839_50%,#F6C760_100%)] bg-[length:300%_100%] opacity-35 [mask-image:linear-gradient(90deg,#000_0%,transparent_32%,transparent_68%,#000_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[140px] bg-[linear-gradient(180deg,#f6f5f3_0%,rgba(246,245,243,0)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[140px] bg-[linear-gradient(0deg,#f6f5f3_0%,rgba(246,245,243,0)_100%)]" />
      <div data-reveal className="relative z-[1] mx-auto w-[min(100%,460px)] overflow-hidden rounded-[32px] bg-dark">
        {playing ? (
          <iframe
            src={`${PLAYER_URL}&autoplay=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="block aspect-[9/16] w-full border-none bg-[#111]"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label="נגן את סרטון הפתיחה"
            className="relative flex aspect-[9/16] w-full cursor-pointer items-center justify-center border-none bg-dark p-0"
          >
            <img src={poster} alt="סרטון הפתיחה" className="absolute inset-0 h-full w-full object-cover" />
            <span className="bg-b2c relative z-[2] flex h-16 w-16 items-center justify-center rounded-full shadow-[0_14px_36px_rgba(225,88,57,.35)] transition-transform duration-300 hover:scale-[1.08]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
