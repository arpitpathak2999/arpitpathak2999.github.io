import type { ReactNode } from 'react'
import { accentText, type AccentKey } from '../lib/accents'

/* ── Section reveal (now a plain passthrough — no scroll animation) ── */

export function Reveal({
  children,
  as: As = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
  className?: string
}) {
  return <As className={className}>{children}</As>
}

/* ── Section heading ─────────────────────────────────────────── */

export function SectionHeading({
  index,
  label,
  title,
  lead,
  align = 'left',
  level = 2,
}: {
  index?: string
  label: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  /** Standalone pages pass 1 so each route has exactly one h1. */
  level?: 1 | 2
}) {
  const Title = level === 1 ? 'h1' : 'h2'
  return (
    <header className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {index && <span className="text-[12px] text-ink-500">{index}</span>}
        <span className="label">{label}</span>
        <span
          aria-hidden
          className={`h-px flex-1 bg-gradient-to-r from-ink-900/15 to-transparent ${
            align === 'center' ? 'hidden' : ''
          }`}
        />
      </div>
      <Title className="display mt-4 text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.08] text-ink-900">
        {title}
      </Title>
      {lead && <p className="prose-sci mt-4">{lead}</p>}
    </header>
  )
}

/* ── Small bits ──────────────────────────────────────────────── */

export function Chip({
  children,
  accent,
  className = '',
}: {
  children: ReactNode
  accent?: AccentKey
  className?: string
}) {
  return (
    <span className={`chip ${accent ? accentText[accent] : ''} ${className}`}>
      {accent && (
        <span
          aria-hidden
          className="inline-block h-1 w-1 rounded-full bg-current opacity-80"
        />
      )}
      {children}
    </span>
  )
}

export function KeyValue({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="border-t border-ink-900/10 py-3">
      <dt className="label">{k}</dt>
      <dd className="mt-1.5 text-sm text-ink-900">{v}</dd>
    </div>
  )
}

/** Vertical pipeline flow used inside case studies and detail pages. */
export function FlowChain({
  steps,
  accent,
  dense = false,
}: {
  steps: string[]
  accent: AccentKey
  dense?: boolean
}) {
  return (
    <ol className="relative" aria-label="Processing pipeline">
      {steps.map((s, i) => (
        <li key={s + i} className="relative flex items-start gap-3">
          <div className="flex flex-col items-center" aria-hidden>
            <span
              className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                i === 0 || i === steps.length - 1 ? 'bg-current' : 'bg-current/45'
              } ${accentText[accent]}`}
            />
            {i < steps.length - 1 && (
              <span className={`w-px flex-1 ${dense ? 'min-h-[18px]' : 'min-h-[24px]'} bg-ink-900/10`} />
            )}
          </div>
          <span
            className={`${dense ? 'pb-2 text-[12.5px]' : 'pb-3 text-[13px]'} leading-snug ${
              i === steps.length - 1 ? 'text-ink-900' : 'text-ink-700'
            }`}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  )
}
