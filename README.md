# הבלתי-ניתנים להחלפה — B2C Landing Page

Next.js implementation of the Claude Design prototype in
`../eyaldoron b2c html/Eyal Doron B2C.dc.html` (the B2C sibling of
`eyal-doron-course-landing-page`, which this project's architecture mirrors).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (tokens in `src/app/globals.css`; breakpoints are aligned
  to the prototype's max-width media queries: sm 641 / md 901 / lg 1181 / 2xl 1381)
- **GSAP + Lenis** for the scroll-driven motion engine
  (`src/components/MotionProvider.tsx`)
- Optional **Supabase** (lead storage + asset hosting), **Resend** (email),
  **Zapier** (webhook) — all off by default, see `.env.example`

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Layout

- `src/app/page.tsx` — section order; one component per design section in
  `src/components/sections/`
- `src/components/reactbits/` — Aurora (canvas blobs), LogoLoop (marquee),
  CurvedLoop (arc marquee), ported from the react-bits components the design
  references, with the performance fixes from the sibling project
- `src/lib/assets.ts` — `asset('x.png')` resolves to `/public/assets` locally
  or Supabase Storage when `NEXT_PUBLIC_SUPABASE_URL` is set
- `src/app/api/contact/route.ts` — lead intake: honeypot, per-IP throttle,
  fan-out to Zapier + Resend + Supabase (accepted if any channel took it)
- `supabase/migrations/0001_leads.sql` — the `leads` table

## Brand notes (binding, from the design bundle)

- Copy is locked verbatim from the client's section breakdown — do not fix
  typos or invent text.
- "שחור" means `#000000`, "אפור" means `#5b5b5a`.
- B2C spectrum (one gradient word per headline, CTAs):
  `#725AF6 → #9A5BD9 → #C55A96 → #E15839 → #EC8A4B → #F6C760` (to left).
- Light page (`#f6f5f3`); dark panels use `#232227`, never pure black.
