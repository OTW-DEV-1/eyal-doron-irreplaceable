'use client'

import { useState } from 'react'
import { asset } from '@/lib/assets'
import { CHECKOUT_URL, B2C_GRADIENT } from '@/components/ui'

const LINKS = [
  { href: '#journey', label: 'התהליך' },
  { href: '#how', label: 'איך זה עובד?' },
  { href: '#benefits', label: 'Quick Wins' },
  { href: '#about', label: 'ד״ר אייל דורון' },
  { href: '#voices', label: 'המלצות' },
  { href: '#faq', label: 'שאלות ותשובות' },
  { href: '#price', label: 'הרשמה' },
]

/**
 * Floating pill nav. Below 1181px the link row disappears and a burger opens a
 * half-width drawer from the left (the page is RTL, so left is the "far" side).
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-[10px] z-[100] px-3 sm:top-4 sm:px-[clamp(16px,4.5vw,5em)]">
      <div className="flex w-full items-center justify-start gap-[10px] rounded-full border border-white/15 bg-black/78 p-[10px_14px] shadow-[inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-[18px] backdrop-saturate-[1.4] sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-[18px]">
        <img
          src={asset('New-Logo-White.png')}
          alt="dr. eyal doron"
          className="mr-3 ml-auto block h-[34px] sm:order-none sm:mr-3 sm:ml-0 sm:h-[37px] sm:justify-self-start"
        />
        <nav
          data-nav
          className="hidden items-center justify-center gap-[14px] text-[16.9px] font-medium whitespace-nowrap lg:flex 2xl:gap-6 2xl:text-[19.4px]"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-magnet
          className={`${B2C_GRADIENT} go_to_checkout inline-block rounded-full px-[14px] py-[6px] text-[15px] font-semibold text-white transition-[filter,transform] duration-300 hover:text-white hover:brightness-110 sm:justify-self-end sm:px-[26px] sm:py-3 sm:text-[19.4px]`}
        >
          אני בפנים!
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
          className="flex cursor-pointer flex-col items-start gap-[5px] border-none bg-transparent p-2 sm:hidden"
        >
          <span className="block h-[2.5px] w-6 rounded-[2px] bg-white" />
          <span className="block h-[2.5px] w-6 rounded-[2px] bg-white" />
          <span className="block h-[2.5px] w-6 rounded-[2px] bg-white" />
        </button>
      </div>

      {/* Overlay + drawer */}
      <div
        onClick={close}
        className="fixed inset-0 z-[198] bg-black/35 transition-opacity duration-400"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />
      <div
        className="fixed top-0 bottom-0 left-0 z-[199] flex w-[50vw] flex-col justify-start gap-[18px] bg-[rgba(20,19,24,.96)] p-[26px_22px] text-right backdrop-blur-[16px] transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-110%)' }}
      >
        <img src={asset('New-Logo-White.png')} alt="dr. eyal doron" className="mx-auto mb-[18px] h-[39px] self-center" />
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close} className="text-[18px] font-semibold text-white">
            {l.label}
          </a>
        ))}
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className={`${B2C_GRADIENT} go_to_checkout mt-auto rounded-full px-[26px] py-[13px] text-center text-[18px] font-semibold text-white`}
        >
          אני בפנים!
        </a>
      </div>
    </header>
  )
}
