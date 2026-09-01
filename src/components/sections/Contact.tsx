'use client'

import { useState, type FormEvent } from 'react'
import { Aurora } from '@/components/reactbits/Aurora'
import { B2C_GRADIENT } from '@/components/ui'

const FIELD =
  'rounded-[14px] border border-white/15 bg-white/5 p-[16px_18px] text-[22px] text-on-dark outline-none placeholder:text-white/85 focus:border-brand-gold sm:text-[24px]'

/** Lead form on the dark panel. Submits to /api/contact. */
export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: window.location.href }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-3 pt-[10px] pb-[30px] sm:px-[clamp(16px,4.5vw,5em)] sm:pb-10">
      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-dark px-4 py-14 text-on-dark sm:px-8 sm:py-[81px]">
        <Aurora colors="#725AF6,#E15839,#F6C760" intensity={0.6} style={{ inset: 0 }} />
        <div className="relative z-[2] mx-auto max-w-[840px] text-center">
          <h2 data-reveal className="mb-11 pt-[.12em] pb-[.18em] text-[10.2vw] leading-[0.8em] font-bold text-white sm:text-[clamp(34px,6vw,76px)]">
            יש לי עוד <span className="text-b2c">כמה תהיות...</span>
          </h2>
          <form
            data-reveal
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-[14px] text-right sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
          >
            <input required name="fullname" placeholder="קוראים לי *" className={FIELD} />
            <input type="tel" name="phone" required placeholder="הטלפון שלי *" dir="rtl" className={`${FIELD} text-right`} />
            <input type="email" name="email" required placeholder="האימייל שלי *" className={FIELD} />
            {/* Honeypot — real users never see or fill this. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <textarea name="message" placeholder="הודעה:" rows={3} className={`${FIELD} resize-y sm:col-span-full`} />
            <label className="flex cursor-pointer items-start gap-[10px] text-[18px] leading-[1.35] text-on-dark-muted sm:col-span-full">
              <input
                type="checkbox"
                name="updates"
                required
                className="mt-[3px] h-[18px] w-[18px] flex-none cursor-pointer accent-brand-violet"
              />
              בהשארת הפרטים אני מסכים/ה לקבל חומרים מקצועיים, הזמנות לאירועים ועדכונים שוטפים.
            </label>
            <div className="mt-3 flex justify-center sm:col-span-full">
              <button
                type="submit"
                data-magnet
                disabled={status === 'sending'}
                className={`${B2C_GRADIENT} submit_btn block w-full cursor-pointer rounded-full border-none px-5 py-[14px] text-[26px] font-semibold text-white transition-[filter,transform] duration-300 hover:brightness-110 disabled:opacity-80 sm:w-auto sm:px-11 sm:py-[15px]`}
              >
                {status === 'sent' ? 'נשלח ✓' : status === 'sending' ? 'שולח...' : 'דברו איתי'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-[18px] text-[#F6C760] sm:col-span-full">משהו השתבש בשליחה. נסו שוב או כתבו לנו ישירות.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
