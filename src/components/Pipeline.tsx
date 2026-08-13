import { useRef, useState } from 'react'
import { pipelineStages } from '../data/structures'
import { accentHex, accentText, rgba } from '../lib/accents'
import { Reveal, SectionHeading } from './ui'

/**
 * Interactive research pipeline — an accessible tab set laid out as a
 * scientific process rail. Arrow keys move between stages.
 */
export default function Pipeline() {
  const [active, setActive] = useState(0)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const stage = pipelineStages[active]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = pipelineStages.length
    let next = active
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setActive(next)
    btnRefs.current[next]?.focus()
  }

  return (
    <section id="pipeline" className="relative z-10 scroll-mt-20 py-20 sm:py-24" aria-labelledby="pipeline-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="05"
            label="Method"
            title={
              <span id="pipeline-title">
                From biological signal to <em className="not-italic text-signal-eeg">intelligence</em>
              </span>
            }
            lead="Every project I work on is a walk down the same six steps. Select a stage to see what I actually work with there."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10">
            {/* ── stage rail ── */}
            <div
              role="tablist"
              aria-label="Research pipeline stages"
              onKeyDown={onKeyDown}
              className="grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-6"
            >
              {pipelineStages.map((s, i) => {
                const on = i === active
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      btnRefs.current[i] = el
                    }}
                    role="tab"
                    id={`pipe-tab-${s.id}`}
                    aria-selected={on}
                    aria-controls={`pipe-panel-${s.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="group relative flex flex-col items-start gap-2 bg-ink-950 px-3.5 py-4 text-left transition-colors hover:bg-ink-900"
                    style={on ? { backgroundColor: rgba(s.accent, 0.06) } : undefined}
                  >
                    {/* top progress hairline */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] transition-all"
                      style={{
                        background: on ? accentHex[s.accent] : 'transparent',
                      }}
                    />
                    <span className="flex w-full items-center justify-between">
                      <span
                        className={`font-mono text-[10px] tracking-[0.14em] ${
                          on ? accentText[s.accent] : 'text-bone-400'
                        }`}
                      >
                        {s.ordinal}
                      </span>
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full transition-colors"
                        style={{
                          background: on ? accentHex[s.accent] : 'rgba(255,255,255,0.18)',
                        }}
                      />
                    </span>
                    <span
                      className={`min-h-[2.5em] text-[13px] leading-tight transition-colors ${
                        on ? 'text-bone-50' : 'text-bone-200 group-hover:text-bone-50'
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="mt-auto font-mono text-[9.5px] uppercase tracking-[0.13em] text-bone-400">
                      {s.annotation}
                    </span>
                    {/* flow arrow between rail cells (desktop) */}
                    {i < pipelineStages.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] text-bone-400 lg:block"
                      >
                        ▸
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* ── stage panel ── */}
            <div
              role="tabpanel"
              id={`pipe-panel-${stage.id}`}
              aria-labelledby={`pipe-tab-${stage.id}`}
              className="panel corner-ticks mt-px grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.05fr_1.4fr]"
              style={{ borderTopColor: rgba(stage.accent, 0.3) }}
            >
              <div>
                <p className={`font-mono text-[10px] uppercase tracking-label ${accentText[stage.accent]}`}>
                  Stage {stage.ordinal} / 06
                </p>
                <h3 className="display mt-2 text-2xl text-bone-50 sm:text-[1.7rem]">{stage.name}</h3>
                <p className="prose-sci mt-3.5 text-[14.5px]">{stage.summary}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {stage.groups.map((g) => (
                  <div key={g.label}>
                    <p className="label border-b border-white/[0.08] pb-2">{g.label}</p>
                    <ul className="mt-3 space-y-2">
                      {g.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5 text-[13px] text-bone-200">
                          <span
                            aria-hidden
                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: rgba(stage.accent, 0.85) }}
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
