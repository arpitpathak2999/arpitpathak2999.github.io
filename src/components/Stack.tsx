import { useMemo, useState } from 'react'
import { stackGroups } from '../data/structures'
import { accentHex } from '../lib/accents'
import { hashNoise } from '../lib/signals'
import { Reveal, SectionHeading } from './ui'

interface Item {
  id: string
  label: string
  group: string
  accent: string
  size: 'lg' | 'md' | 'sm'
}

/** Items the résumé lists as core languages/frameworks read larger. */
const PROMINENT = new Set(['Python', 'PyTorch', 'EEG', 'GSR / EDA'])
const SECONDARY = new Set(['C++', 'TensorFlow', 'Scikit-learn', 'EMG', 'GCN', 'CNN'])

export default function Stack() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const items: Item[] = useMemo(
    () =>
      stackGroups.flatMap((g) =>
        g.items.map((it) => ({
          id: `${g.id}-${it}`,
          label: it,
          group: g.id,
          accent: accentHex[g.accent],
          size: PROMINENT.has(it) ? 'lg' : SECONDARY.has(it) ? 'md' : 'sm',
        })),
      ),
    [],
  )

  // deterministic decorative constellation points
  const dots = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        x: 50 + ((hashNoise(i, 5) + 1) / 2) * 900,
        y: 20 + ((hashNoise(i, 17) + 1) / 2) * 300,
        r: 0.6 + ((hashNoise(i, 31) + 1) / 2) * 1.3,
      })),
    [],
  )

  return (
    <section
      id="stack"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="stack-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="09"
            label="Toolkit"
            title={<span id="stack-title">Technical constellation</span>}
            lead="Languages and frameworks from my résumé, alongside the signal modalities and AI methods I actually build with. Hover a category to isolate it."
          />
        </Reveal>

        <Reveal delay={70}>
          <div className="panel corner-ticks relative mt-10 overflow-hidden">
            {/* decorative backdrop */}
            <svg
              aria-hidden
              viewBox="0 0 1000 340"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
              preserveAspectRatio="xMidYMid slice"
            >
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="rgba(255,255,255,0.22)" />
              ))}
              {dots.slice(0, 30).map((d, i) => {
                const n = dots[(i + 7) % dots.length]
                const dist = Math.hypot(n.x - d.x, n.y - d.y)
                if (dist > 190) return null
                return (
                  <line
                    key={`l${i}`}
                    x1={d.x}
                    y1={d.y}
                    x2={n.x}
                    y2={n.y}
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth={0.6}
                  />
                )
              })}
            </svg>

            <div className="relative grid lg:grid-cols-[230px_1fr]">
              {/* categories */}
              <div
                className="border-b border-white/[0.08] lg:border-b-0 lg:border-r"
                onMouseLeave={() => setActiveGroup(null)}
              >
                <ul>
                  {stackGroups.map((g) => {
                    const on = activeGroup === g.id
                    return (
                      <li key={g.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveGroup(g.id)}
                          onFocus={() => setActiveGroup(g.id)}
                          onBlur={() => setActiveGroup(null)}
                          onClick={() => setActiveGroup(on ? null : g.id)}
                          aria-pressed={on}
                          className="flex w-full items-center justify-between gap-2 border-b border-white/[0.06] px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                          style={on ? { backgroundColor: `${accentHex[g.accent]}0e` } : undefined}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              aria-hidden
                              className="h-1.5 w-1.5 rounded-full transition-transform"
                              style={{
                                background: accentHex[g.accent],
                                transform: on ? 'scale(1.6)' : 'scale(1)',
                              }}
                            />
                            <span
                              className="font-mono text-[10.5px] uppercase tracking-[0.13em]"
                              style={{ color: on ? accentHex[g.accent] : undefined }}
                            >
                              {g.label}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] text-bone-400">{g.items.length}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* chip cloud */}
              <div className="flex flex-wrap content-start items-center gap-2.5 p-6 sm:gap-3 sm:p-8">
                {items.map((it) => {
                  const dim = activeGroup !== null && activeGroup !== it.group
                  const on = activeGroup === it.group
                  const sizeCls =
                    it.size === 'lg'
                      ? 'text-[15.5px] px-3.5 py-2'
                      : it.size === 'md'
                        ? 'text-[13.5px] px-3 py-1.5'
                        : 'text-[12px] px-2.5 py-1.5'
                  return (
                    <span
                      key={it.id}
                      className={`inline-flex items-center gap-2 border font-mono uppercase tracking-[0.08em] transition-all duration-300 ${sizeCls}`}
                      style={{
                        borderColor: on ? `${it.accent}66` : 'rgba(255,255,255,0.11)',
                        color: on ? it.accent : dim ? 'rgba(154,166,177,0.4)' : '#c8d0d6',
                        background: on ? `${it.accent}0f` : 'rgba(255,255,255,0.02)',
                        opacity: dim ? 0.4 : 1,
                        transform: on ? 'translateY(-1px)' : 'none',
                      }}
                    >
                      <span
                        aria-hidden
                        className="h-[3px] w-[3px] rounded-full"
                        style={{ background: on ? it.accent : 'rgba(255,255,255,0.3)' }}
                      />
                      {it.label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
