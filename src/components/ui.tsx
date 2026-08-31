import type { ReactNode, SVGProps } from 'react'

/* ---------------------------------------------------------------------------
   Icons

   Every icon is a thin-stroke 24×24 line drawing stroked with the B2C brand
   spectrum. The gradient must be defined per-instance (each needs a unique id)
   and uses userSpaceOnUse so the ramp spans the icon box rather than the path
   bounding box — otherwise single-line icons render as a flat colour.
--------------------------------------------------------------------------- */

type IconPath = string | [tag: 'circle' | 'rect', attrs: SVGProps<SVGElement>]

type GradientIconProps = {
  id: string
  paths: IconPath[]
  size?: number
  /** Solid colour instead of the spectrum gradient. */
  color?: string
  /** Stroke width, or 'thin' for a hairline that ignores scaling. */
  strokeWidth?: number | 'thin'
  className?: string
}

export function GradientIcon({
  id,
  paths,
  size = 26,
  color,
  strokeWidth = 1.7,
  className,
}: GradientIconProps) {
  const stroke = color || `url(#${id})`
  const extra =
    strokeWidth === 'thin'
      ? { strokeWidth: 2, vectorEffect: 'non-scaling-stroke' as const }
      : { strokeWidth }
  const shared = {
    stroke,
    ...extra,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={24} y1={0} x2={0} y2={24}>
          <stop offset="0%" stopColor="#725AF6" />
          <stop offset="18%" stopColor="#9A5BD9" />
          <stop offset="36%" stopColor="#C55A96" />
          <stop offset="55%" stopColor="#E15839" />
          <stop offset="76%" stopColor="#EC8A4B" />
          <stop offset="100%" stopColor="#F6C760" />
        </linearGradient>
      </defs>
      {paths.map((p, i) =>
        Array.isArray(p) ? (
          p[0] === 'circle' ? (
            <circle key={i} {...(p[1] as SVGProps<SVGCircleElement>)} {...shared} />
          ) : (
            <rect key={i} {...(p[1] as SVGProps<SVGRectElement>)} {...shared} />
          )
        ) : (
          <path key={i} d={p} {...shared} />
        ),
      )}
    </svg>
  )
}

/** Shared icon geometry, keyed by name — lifted verbatim from the prototype. */
export const ICONS = {
  layers: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 12l10 5 10-5', 'M2 17l10 5 10-5'],
  pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
  compass: [['circle', { cx: 12, cy: 12, r: 9 }], 'M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5z'],
  bot: [
    ['rect', { x: 4.5, y: 8.5, width: 15, height: 10, rx: 3 }],
    'M12 8.5V5.2',
    ['circle', { cx: 12, cy: 4, r: 1.2 }],
    'M9.3 12.6v1.8',
    'M14.7 12.6v1.8',
  ],
  cast: [
    ['circle', { cx: 12, cy: 12, r: 1.8 }],
    'M8.5 15.5a5 5 0 0 1 0-7',
    'M15.5 8.5a5 5 0 0 1 0 7',
    'M5.7 18.3a9 9 0 0 1 0-12.6',
    'M18.3 5.7a9 9 0 0 1 0 12.6',
  ],
  people: [
    ['circle', { cx: 9, cy: 8, r: 3.5 }],
    'M2.5 20a6.5 6.5 0 0 1 13 0',
    ['circle', { cx: 17.5, cy: 9.5, r: 2.8 }],
    'M15.5 14.6a5.5 5.5 0 0 1 6 5.4',
  ],
  nodes: [
    ['circle', { cx: 5.5, cy: 6, r: 2.4 }],
    ['circle', { cx: 18.5, cy: 6, r: 2.4 }],
    ['circle', { cx: 12, cy: 18, r: 2.4 }],
    'M7.2 7.8 10.8 16',
    'M16.8 7.8 13.2 16',
    'M7.9 6h8.2',
  ],
  map: ['M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z', 'M9 4v14', 'M15 6v14'],
  doc: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h5'],
  ticket: [
    'M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z',
    'M13 5v2',
    'M13 11v2',
    'M13 17v2',
  ],
  gift: [
    ['rect', { x: 3, y: 8, width: 18, height: 4, rx: 1 }],
    'M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8',
    'M12 8v13',
    'M12 8s-1.5-5-4.5-5A2.5 2.5 0 0 0 5 5.5C5 7 6.5 8 8 8z',
    'M12 8s1.5-5 4.5-5A2.5 2.5 0 0 1 19 5.5C19 7 17.5 8 16 8z',
  ],
} satisfies Record<string, IconPath[]>

/* ---------------------------------------------------------------------------
   Buttons
--------------------------------------------------------------------------- */

export const B2C_GRADIENT =
  'bg-[linear-gradient(to_left,#725AF6_0%,#9A5BD9_18%,#C55A96_36%,#E15839_55%,#EC8A4B_76%,#F6C760_100%)]'

type CtaProps = {
  href: string
  children: ReactNode
  className?: string
  /** Outlined variant used for the price perk's secondary action. */
  variant?: 'solid' | 'outline'
}

/**
 * `data-magnet` opts the element into the cursor-follow effect wired up by
 * MotionProvider.
 */
export function Cta({ href, children, className = '', variant = 'solid' }: CtaProps) {
  const base =
    'inline-block rounded-full font-semibold transition-[filter,transform,background-color,color,box-shadow] duration-300'
  const skin =
    variant === 'solid'
      ? `${B2C_GRADIENT} text-white hover:brightness-110 hover:text-white`
      : 'bg-page-alt text-ink border-[1.5px] border-ink hover:bg-ink hover:text-white'

  // Tracking hook: any CTA leading into the checkout funnel gets tagged.
  const tracking = href === '#price' || href === '#contact' ? ' go_to_checkout' : ''

  return (
    <a href={href} data-magnet className={`${base} ${skin} ${className}${tracking}`}>
      {children}
    </a>
  )
}

/** Every CTA on the page leads straight to the course checkout. */
export const CHECKOUT_URL = 'https://eyaldoron-course.co.il/checkout/?add-to-cart=8845&quantity=1'

/** The site's recurring light card: warm white gradient, hairline white border. */
export const CARD = 'bg-[linear-gradient(160deg,#FFFFFF_0%,#EFEEEB_100%)] border border-white'

/** White icon chip used across the "how it works" rows. */
export const ICON_CHIP =
  'flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#725AF6_0%,#B15BB4_25%,#E15839_55%,#EC8A4B_78%,#F6C760_100%)]'
