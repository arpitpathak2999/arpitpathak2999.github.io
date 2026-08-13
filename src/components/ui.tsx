import type { ReactNode } from 'react'
import { useInView, useReducedMotion } from '../lib/hooks'
import { accentText, type AccentKey } from '../lib/accents'

/* ── Scroll reveal ───────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
  className?: string
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>()
  const show = reduced || inView

  return (
    <As
      ref={ref as never}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'none' : 'translateY(14px)',
        transition: reduced
          ? 'none'
          : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: show ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </As>
  )
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
        {index && <span className="font-mono text-[11px] text-signal-eeg/80">{index}</span>}
        <span className="label">{label}</span>
        <span
          aria-hidden
          className={`h-px flex-1 bg-gradient-to-r from-white/20 to-transparent ${
            align === 'center' ? 'hidden' : ''
          }`}
        />
      </div>
      <Title className="display mt-4 text-[clamp(1.85rem,4.2vw,2.9rem)] leading-[1.08] text-bone-50">
        {title}
      </Title>
      {lead && <p className="prose-sci mt-4">{lead}</p>}
    </header>
  )
}

/* ── Small technical bits ────────────────────────────────────── */

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
    <div className="border-t border-white/[0.08] py-3">
      <dt className="label">{k}</dt>
      <dd className="mt-1.5 text-sm text-bone-100">{v}</dd>
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
              <span className={`w-px flex-1 ${dense ? 'min-h-[18px]' : 'min-h-[24px]'} bg-white/12`} />
            )}
          </div>
          <span
            className={`${dense ? 'pb-2 text-[12.5px]' : 'pb-3 text-[13px]'} font-mono leading-snug ${
              i === steps.length - 1 ? 'text-bone-100' : 'text-bone-300'
            }`}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  )
}

/** Non-fabrication / synthetic-data notice. */
export function SyntheticNotice({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 border border-signal-gsr/25 bg-signal-gsr/[0.05] px-3 py-2 font-mono text-[10.5px] leading-relaxed tracking-wide text-signal-gsr/90">
      <span aria-hidden className="mt-[3px] block h-1.5 w-1.5 shrink-0 rounded-full bg-signal-gsr/70" />
      <span>{children}</span>
    </p>
  )
}
