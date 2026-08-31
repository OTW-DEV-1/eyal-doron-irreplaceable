'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

type RevealEl = HTMLElement & { _seenAtLoad?: boolean; _lastP?: number }

const B2C_GRAD =
  'linear-gradient(135deg,#F6C760,#EC8A4B 22%,#E15839 45%,#C55A96 64%,#9A5BD9 82%,#725AF6)'

/**
 * Scroll-driven motion for the whole page.
 *
 * Performance note: every frame is split into a read phase and a write phase.
 * Interleaving `getBoundingClientRect` with style writes would force the
 * browser to recalculate layout once per element — with ~100 animated elements
 * that alone is enough to make scrolling stutter. All geometry is gathered
 * first, then all styles are applied.
 */

/**
 * Lenis smooths the scroll position toward the real one over ~0.9s. That is a
 * deliberate effect, but it is also, by definition, input latency — if the page
 * feels sluggish to drag, this is the first thing to turn off. Everything else
 * (reveals, timeline, nav highlight) keeps working; it is driven by scroll
 * position, not by Lenis.
 */
const SMOOTH_SCROLL = true
const SMOOTH_SCROLL_DURATION = 0.9

export function MotionProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The section markup is static, so these lists are collected once rather
    // than re-queried on every frame.
    let reveals = Array.from(document.querySelectorAll<RevealEl>('[data-reveal]'))
    const tl = document.querySelector<HTMLElement>('[data-tl-wrap]')
    const tlLine = tl?.querySelector<HTMLElement>('[data-tl-line]') ?? null
    const tlBg = tl?.querySelector<HTMLElement>('[data-tl-bg]') ?? null
    const tlDots = tl ? Array.from(tl.querySelectorAll<HTMLElement>('[data-tl-dot]')) : []
    const tlRows = tl ? Array.from(tl.querySelectorAll<HTMLElement>('[data-tl-row]')) : []
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav] a'))

    const refreshNodes = () => {
      reveals = Array.from(document.querySelectorAll<RevealEl>('[data-reveal]'))
    }

    let ticking = false
    let firstPaint = true

    const paint = () => {
      ticking = false
      const vh = window.innerHeight || 800
      const sy = window.scrollY || 0

      /* ---------------- read phase: no style writes below this line -------- */

      const docH = document.body.scrollHeight || 0
      const revealRects = reveals.map((el) => el.getBoundingClientRect())
      const tlRect = tl ? tl.getBoundingClientRect() : null
      const tlDotRects = tlRect ? tlDots.map((d) => d.getBoundingClientRect()) : []

      /* ---------------- write phase ---------------------------------------- */

      reveals.forEach((el, i) => {
        const r = revealRects[i]
        // Anything already on screen at load is shown outright — no fade-in for
        // content the visitor can already see.
        if ((firstPaint || sy < 40) && r.top < vh && r.bottom > 0) el._seenAtLoad = true
        if (r.bottom < -300 || r.top > vh + 300) return

        // Near the document end there is no scroll left to drive the reveal, so
        // push the last screenful in explicitly.
        const endBoost = r.top < vh ? clamp01((sy + vh - (docH - vh * 0.3)) / (vh * 0.25)) : 0
        const early = el.hasAttribute('data-reveal-early')
        const enter = el._seenAtLoad
          ? 1
          : Math.max(
              early
                ? clamp01((vh * 1.04 - r.top) / (vh * 0.16))
                : clamp01((vh * 0.97 - r.top) / (vh * 0.34)),
              clamp01((vh * 0.98 - r.bottom) / (vh * 0.18)),
              endBoost,
            )
        // Near the top of the page there is nowhere to have scrolled from, so
        // the exit fade must not apply — otherwise content that naturally sits
        // just under the fixed header gets nudged up underneath it.
        const exit = Math.max(clamp01(r.bottom / (vh * 0.22)), clamp01(1 - sy / (vh * 0.3)))
        const p = Math.min(enter, exit)

        // Once an element is settled, stop re-writing identical styles.
        if (el._lastP === 1 && p === 1) return

        // At p === 1 the transform is the identity, so strip the inline styles
        // entirely rather than writing `scale(1) translate(0,0)`. A lingering
        // transform keeps the element on its own compositor layer forever;
        // clearing is visually identical and lets the layer go.
        if (p === 1) {
          el._lastP = 1
          gsap.set(el, { clearProps: 'transform,opacity,filter,willChange' })
          el.style.opacity = '1'
          return
        }
        el._lastP = p

        const y = (1 - enter) * 90 - (1 - exit) * 90

        // The prototype also animated `filter: blur()` here. A blur forces the
        // element into an offscreen buffer and a separate blur pass at its full
        // rendered size, every frame — the single most expensive thing during a
        // scroll. Opacity, translate and scale are compositor-only and cost
        // effectively nothing. The reveal reads the same without it.
        const xa = el.getAttribute('data-reveal-x')
        const md = el.getAttribute('data-reveal-mode')
        let vals: gsap.TweenVars
        if (xa) vals = { opacity: p, x: (1 - p) * (xa === 'right' ? 130 : -130), y: 0, scale: 1 }
        else if (md === 'scale') vals = { opacity: p, x: 0, y: 0, scale: 0.55 + 0.45 * p }
        else vals = { opacity: p, x: 0, y, scale: 0.93 + 0.07 * p }

        // force3D:false keeps GSAP on a 2D matrix() — matrix3d() would promote
        // every animated full-width section to its own compositor layer.
        vals.force3D = false
        gsap.set(el, vals)
      })
      firstPaint = false

      // Journey timeline: fill the spine, light dots up as it passes them, and
      // swap each row's card border from hairline white to the brand gradient.
      if (tl && tlRect) {
        const prog = clamp01((vh * 0.6 - tlRect.top) / tlRect.height)
        let topOff = 0
        let botOff = 0
        if (tlDotRects.length) {
          // Trim the spine to run between the first and last dot centres.
          const fr = tlDotRects[0]
          const lr = tlDotRects[tlDotRects.length - 1]
          topOff = fr.top + fr.height / 2 - tlRect.top
          botOff = tlRect.bottom - (lr.top + lr.height / 2)
          if (tlBg) {
            tlBg.style.top = `${topOff}px`
            tlBg.style.bottom = `${botOff}px`
          }
        }
        const span = Math.max(1, tlRect.height - topOff - botOff)
        if (tlLine) {
          tlLine.style.top = `${topOff}px`
          tlLine.style.height = `${(prog * span).toFixed(1)}px`
        }
        const lineY = tlRect.top + topOff + span * prog
        tlDots.forEach((d, i) => {
          const dr = tlDotRects[i]
          const on = dr.top + dr.height / 2 <= lineY + 2
          d.style.background = on ? B2C_GRAD : '#3A3844'
          d.style.boxShadow = on ? '0 0 20px rgba(225,88,57,.75)' : 'none'
          d.style.transform = on ? 'scale(1.3)' : 'scale(1)'
          const row = tlRows[i]
          if (row) {
            const grad = row.querySelector<HTMLElement>('[data-tl-bd]')
            const plain = row.querySelector<HTMLElement>('[data-tl-bd2]')
            if (grad) grad.style.opacity = on ? '1' : '0'
            if (plain) plain.style.opacity = on ? '0' : '1'
          }
        })
      }

      // Header nav: highlight the link whose section is currently on screen.
      // Styling lives in globals.css keyed off data-active, so the CSS :hover
      // gradient keeps working (inline styles would override it).
      if (navLinks.length) {
        const extra: Record<string, string[]> = { '#journey': ['#process'], '#price': ['#contact'] }
        let active: HTMLAnchorElement | null = null
        let best = -Infinity
        navLinks.forEach((a) => {
          const href = a.getAttribute('href')
          if (!href) return
          ;[href, ...(extra[href] ?? [])].forEach((sel) => {
            const sec = document.querySelector(sel)
            if (!sec) return
            const top = sec.getBoundingClientRect().top
            if (top <= vh * 0.4 && top > best) {
              best = top
              active = a
            }
          })
        })
        navLinks.forEach((a) => {
          if (a === active) a.setAttribute('data-active', 'true')
          else a.removeAttribute('data-active')
        })
      }
    }

    // One listener, one rAF per frame, covering reveals, timeline and nav.
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(paint)
      }
    }
    const onResize = () => {
      refreshNodes()
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    paint()
    // Late repaints catch layout that settles after fonts and images load.
    const t1 = setTimeout(paint, 400)
    const t2 = setTimeout(() => {
      refreshNodes()
      paint()
    }, 1200)

    const lenis = SMOOTH_SCROLL
      ? new Lenis({ duration: SMOOTH_SCROLL_DURATION, smoothWheel: true })
      : null
    let lraf = 0
    if (lenis) {
      const raf = (time: number) => {
        lenis.raf(time)
        lraf = requestAnimationFrame(raf)
      }
      lraf = requestAnimationFrame(raf)
    }

    // Anchor links go through Lenis when it is active, otherwise native smooth
    // scrolling fights it and the page jitters. One delegated listener.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -70 })
      } else {
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
    document.addEventListener('click', onAnchorClick)

    // Magnetic buttons: nudge toward the cursor, spring back on leave. Bound by
    // delegation so no per-element listeners are attached, and skipped entirely
    // on touch-primary devices where there is no cursor to follow.
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onPointerMove = (ev: PointerEvent) => {
      const el = (ev.target as HTMLElement | null)?.closest?.('[data-magnet]') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      gsap.to(el, {
        x: (ev.clientX - r.left - r.width / 2) * 0.22,
        y: (ev.clientY - r.top - r.height / 2) * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    const onPointerOut = (ev: PointerEvent) => {
      const el = (ev.target as HTMLElement | null)?.closest?.('[data-magnet]') as HTMLElement | null
      if (!el) return
      if (el.contains(ev.relatedTarget as Node | null)) return
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
    }
    if (hasHover) {
      document.addEventListener('pointermove', onPointerMove, { passive: true })
      document.addEventListener('pointerout', onPointerOut, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearTimeout(t1)
      clearTimeout(t2)
      cancelAnimationFrame(lraf)
      lenis?.destroy()
      document.removeEventListener('click', onAnchorClick)
      if (hasHover) {
        document.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('pointerout', onPointerOut)
      }
    }
  }, [])

  return null
}
