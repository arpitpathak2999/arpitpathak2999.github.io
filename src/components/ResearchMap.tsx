import { useMemo, useState } from 'react'
import { mapBranches } from '../data/structures'
import { accentHex, accentText } from '../lib/accents'
import { Reveal, SectionHeading } from './ui'
import { useReducedMotion } from '../lib/hooks'

const W = 1000
const H = 660
const CX = W / 2
const CY = H / 2
const R_BRANCH = 168
const R_LEAF = 318
const BASE_ANGLES = [-142, -38, 38, 142]

interface Placed {
  id: string
  label: string
  detail: string
  x: number
  y: number
  branchId: string
  accent: (typeof mapBranches)[number]['accent']
  anchor: 'start' | 'end'
}

export default function ResearchMap() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)

  const { branchNodes, leafNodes } = useMemo(() => {
    const branchNodes = mapBranches.map((b, i) => {
      const a = (BASE_ANGLES[i] * Math.PI) / 180
      return {
        ...b,
        x: CX + Math.cos(a) * R_BRANCH,
        y: CY + Math.sin(a) * R_BRANCH,
        angle: BASE_ANGLES[i],
      }
    })

    const leafNodes: Placed[] = []
    mapBranches.forEach((b, i) => {
      const base = BASE_ANGLES[i]
      const n = b.children.length
      const spread = n > 4 ? 34 : 27
      b.children.forEach((c, j) => {
        const a = ((base + (n === 1 ? 0 : -spread + (2 * spread * j) / (n - 1))) * Math.PI) / 180
        const x = CX + Math.cos(a) * R_LEAF
        const y = CY + Math.sin(a) * R_LEAF
        leafNodes.push({
          id: c.id,
          label: c.label,
          detail: c.detail,
          x,
          y,
          branchId: b.id,
          accent: b.accent,
          anchor: Math.cos(a) >= 0 ? 'start' : 'end',
        })
      })
    })
    return { branchNodes, leafNodes }
  }, [])

  const activeId = hover ?? selected
  const activeNode =
    leafNodes.find((l) => l.id === activeId) ??
    (() => {
      const b = mapBranches.find((x) => x.id === activeId)
      return b ? { id: b.id, label: b.label, detail: b.blurb, accent: b.accent, branchId: b.id } : null
    })()

  const isDim = (branchId: string) => {
    if (!activeId) return false
    const leaf = leafNodes.find((l) => l.id === activeId)
    const owner = leaf ? leaf.branchId : activeId
    return owner !== branchId
  }

  return (
    <section id="map" className="relative z-10 scroll-mt-20 py-20 sm:py-24" aria-labelledby="map-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="02"
            label="Domains"
            title={<span id="map-title">My research map</span>}
            lead="Four directions, one question underneath all of them: what can a machine learn about a living system from the signals it emits?"
          />
        </Reveal>

        <Reveal delay={80}>
          {/* ── desktop: radial graph ── */}
          <div className="mt-10 hidden lg:block">
            <div className="panel corner-ticks relative overflow-hidden pb-[58px]">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-auto w-full"
                role="group"
                aria-label="Interactive research domain map"
              >
                <defs>
                  <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(94,234,212,0.22)" />
                    <stop offset="100%" stopColor="rgba(94,234,212,0)" />
                  </radialGradient>
                </defs>

                {/* faint concentric rings */}
                {[R_BRANCH, R_LEAF].map((r) => (
                  <circle
                    key={r}
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="2 6"
                  />
                ))}

                {/* branch edges */}
                {branchNodes.map((b) => (
                  <line
                    key={`e-${b.id}`}
                    x1={CX}
                    y1={CY}
                    x2={b.x}
                    y2={b.y}
                    stroke={accentHex[b.accent]}
                    strokeWidth={1.4}
                    opacity={isDim(b.id) ? 0.15 : 0.55}
                    strokeDasharray={reduced ? undefined : '5 4'}
                    className={reduced ? undefined : 'animate-flow-dash'}
                    style={{ transition: 'opacity 300ms' }}
                  />
                ))}

                {/* leaf edges */}
                {leafNodes.map((l) => {
                  const b = branchNodes.find((x) => x.id === l.branchId)!
                  const dim = isDim(l.branchId)
                  const on = activeId === l.id
                  return (
                    <line
                      key={`le-${l.id}`}
                      x1={b.x}
                      y1={b.y}
                      x2={l.x}
                      y2={l.y}
                      stroke={accentHex[l.accent]}
                      strokeWidth={on ? 1.5 : 0.9}
                      opacity={dim ? 0.1 : on ? 0.8 : 0.32}
                      style={{ transition: 'opacity 300ms, stroke-width 200ms' }}
                    />
                  )
                })}

                {/* core */}
                <circle cx={CX} cy={CY} r={62} fill="url(#core-glow)" />
                <circle
                  cx={CX}
                  cy={CY}
                  r={34}
                  fill="#080b10"
                  stroke="rgba(94,234,212,0.55)"
                  strokeWidth={1.2}
                />
                <text
                  x={CX}
                  y={CY + 4}
                  textAnchor="middle"
                  className="fill-bone-50 font-mono"
                  style={{ fontSize: 13, letterSpacing: '0.14em' }}
                >
                  ARPIT
                </text>

                {/* branch nodes */}
                {branchNodes.map((b) => {
                  const dim = isDim(b.id)
                  const on = activeId === b.id
                  const right = Math.cos((b.angle * Math.PI) / 180) >= 0
                  const below = Math.sin((b.angle * Math.PI) / 180) > 0
                  return (
                    <g
                      key={b.id}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selected === b.id}
                      aria-label={`${b.label}. ${b.blurb}`}
                      onMouseEnter={() => setHover(b.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(b.id)}
                      onBlur={() => setHover(null)}
                      onClick={() => setSelected(selected === b.id ? null : b.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelected(selected === b.id ? null : b.id)
                        }
                      }}
                      style={{ cursor: 'pointer', opacity: dim ? 0.35 : 1, transition: 'opacity 300ms' }}
                    >
                      <circle
                        cx={b.x}
                        cy={b.y}
                        r={on ? 9 : 6.5}
                        fill="#080b10"
                        stroke={accentHex[b.accent]}
                        strokeWidth={1.6}
                        style={{ transition: 'r 200ms' }}
                      />
                      <circle cx={b.x} cy={b.y} r={2.6} fill={accentHex[b.accent]} />
                      {/* Labels sit above (upper branches) or below (lower branches)
                          the node so they never collide with the mid leaf label. */}
                      <text
                        x={b.x + (right ? 14 : -14)}
                        y={b.y + (below ? 32 : -28)}
                        textAnchor={right ? 'start' : 'end'}
                        className="fill-bone-50"
                        style={{ fontSize: 15 }}
                      >
                        {b.label}
                      </text>
                      <text
                        x={b.x + (right ? 14 : -14)}
                        y={b.y + (below ? 48 : -12)}
                        textAnchor={right ? 'start' : 'end'}
                        className="fill-bone-400 font-mono"
                        style={{ fontSize: 10, letterSpacing: '0.1em' }}
                      >
                        {b.children.length} areas
                      </text>
                    </g>
                  )
                })}

                {/* leaf nodes */}
                {leafNodes.map((l) => {
                  const dim = isDim(l.branchId)
                  const on = activeId === l.id
                  return (
                    <g
                      key={l.id}
                      tabIndex={0}
                      role="button"
                      aria-pressed={selected === l.id}
                      aria-label={`${l.label}. ${l.detail}`}
                      onMouseEnter={() => setHover(l.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(l.id)}
                      onBlur={() => setHover(null)}
                      onClick={() => setSelected(selected === l.id ? null : l.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelected(selected === l.id ? null : l.id)
                        }
                      }}
                      style={{ cursor: 'pointer', opacity: dim ? 0.3 : 1, transition: 'opacity 300ms' }}
                    >
                      <circle
                        cx={l.x}
                        cy={l.y}
                        r={on ? 5.5 : 3.4}
                        fill={on ? accentHex[l.accent] : '#0b0f15'}
                        stroke={accentHex[l.accent]}
                        strokeWidth={1.2}
                        style={{ transition: 'r 180ms' }}
                      />
                      <text
                        x={l.x + (l.anchor === 'start' ? 12 : -12)}
                        y={l.y + 4}
                        textAnchor={l.anchor}
                        className={on ? 'fill-bone-50' : 'fill-bone-300'}
                        style={{ fontSize: 12.5 }}
                      >
                        {l.label}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* detail readout */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/[0.08] bg-ink-950/80 px-6 py-4 backdrop-blur-sm"
                aria-live="polite"
              >
                {activeNode ? (
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-label ${accentText[activeNode.accent]}`}
                    >
                      {activeNode.label}
                    </span>
                    <span className="text-[13.5px] text-bone-200">{activeNode.detail}</span>
                  </div>
                ) : (
                  <p className="font-mono text-[10.5px] uppercase tracking-label text-bone-400">
                    Hover or focus a node to inspect it
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── mobile / tablet: readable branch columns ── */}
          <div className="mt-10 grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:hidden">
            {mapBranches.map((b) => (
              <div key={b.id} className="bg-ink-950 p-5">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: accentHex[b.accent] }}
                  />
                  <h3 className="text-[15px] text-bone-50">{b.label}</h3>
                </div>
                <p className="prose-sci mt-2 text-[13px]">{b.blurb}</p>
                <ul className="mt-4 space-y-2.5">
                  {b.children.map((c) => (
                    <li key={c.id}>
                      <p className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${accentText[b.accent]}`}>
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-bone-300">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
