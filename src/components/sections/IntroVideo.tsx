'use client'

import { useEffect, useState } from 'react'
import { Cta } from '@/components/ui'

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
      className="grid grid-cols-1 items-center gap-[clamp(16px,2vw,30px)] px-4 pt-5 pb-[6px] sm:grid-cols-1 sm:px-[clamp(18px,6vw,8em)] sm:pt-10 sm:pb-[110px] md:grid-cols-2"
    >
      <div data-reveal className="text-center">
        <p className="pb-[18px] text-[34.5px] leading-[1.15em] font-bold text-pretty text-ink sm:pb-0 sm:text-[clamp(37px,4.1vw,60px)] sm:leading-[1.09em]">
          וכעת, לראשונה,
          <br className="hidden sm:inline" />
          הוא גיבש את הכל <br className="sm:hidden" />
          לכדי&nbsp;
          <br className="hidden sm:inline" />
          תהליך דיגיטלי פיזי <br />
          <span className="text-b2c">מיוחד לאנשים פרטיים.</span>
        </p>
        <div className="mt-8 hidden pt-5 sm:block">
          <Cta href="#price" className="px-10 py-4 text-[21.5px]">
            אני רוצה לצאת לדרך!
          </Cta>
        </div>
      </div>

      <div data-reveal className="relative mx-auto w-[min(100%,460px)] justify-self-center overflow-hidden rounded-[32px] bg-dark">
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
