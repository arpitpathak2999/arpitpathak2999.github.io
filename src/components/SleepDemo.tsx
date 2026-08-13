import { useMemo, useState } from 'react'
import { sleepStages } from '../data/structures'
import { eegSample, gsrSample, illustrativeHypnogram, toPath } from '../lib/signals'
import { Reveal, SectionHeading, SyntheticNotice } from './ui'

/**
 * Conceptual demonstration of the sleep-staging idea behind my current
 * research. Everything here is schematic: the traces are synthetic, the
 * hypnogram is hand-authored, and the feature bars are qualitative
 * illustrations of textbook stage characteristics — not measurements.
 */

interface StageProfile {
  eeg: { amplitude: number; frequency: number; noise: number }
  gsr: { amplitude: number; frequency: number; noise: number }
  bars: { label: string; v: number }[]
}

const profiles: Record<string, StageProfile> = {
  W: {
    eeg: { amplitude: 0.5, frequency: 2.0, noise: 0.7 },
    gsr: { amplitude: 1.1, frequency: 1.6, noise: 0.5 },
    bars: [
      { label: 'Slow-wave content', v: 0.15 },
      { label: 'Faster activity', v: 0.85 },
      { label: 'Autonomic activity', v: 0.7 },
      { label: 'Signal variability', v: 0.8 },
    ],
  },
  N1: {
    eeg: { amplitude: 0.7, frequency: 1.45, noise: 0.55 },
    gsr: { amplitude: 0.85, frequency: 1.1, noise: 0.35 },
    bars: [
      { label: 'Slow-wave content', v: 0.32 },
      { label: 'Faster activity', v: 0.55 },
      { label: 'Autonomic activity', v: 0.5 },
      { label: 'Signal variability', v: 0.6 },
    ],
  },
  N2: {
    eeg: { amplitude: 0.95, frequency: 1.0, noise: 0.4 },
    gsr: { amplitude: 0.6, frequency: 0.8, noise: 0.25 },
    bars: [
      { label: 'Slow-wave content', v: 0.5 },
      { label: 'Faster activity', v: 0.35 },
      { label: 'Autonomic activity', v: 0.35 },
      { label: 'Signal variability', v: 0.45 },
    ],
  },
  N3: {
    eeg: { amplitude: 1.45, frequency: 0.45, noise: 0.22 },
    gsr: { amplitude: 0.4, frequency: 0.5, noise: 0.15 },
    bars: [
      { label: 'Slow-wave content', v: 0.95 },
      { label: 'Faster activity', v: 0.12 },
      { label: 'Autonomic activity', v: 0.2 },
      { label: 'Signal variability', v: 0.25 },
    ],
  },
  REM: {
    eeg: { amplitude: 0.62, frequency: 1.75, noise: 0.6 },
    gsr: { amplitude: 1.25, frequency: 1.9, noise: 0.55 },
    bars: [
      { label: 'Slow-wave content', v: 0.25 },
      { label: 'Faster activity', v: 0.6 },
      { label: 'Autonomic activity', v: 0.6 },
      { label: 'Signal variability', v: 0.9 },
    ],
  },
}

const HYP_W = 960
const HYP_H = 190

export default function SleepDemo() {
  const [stageId, setStageId] = useState('N3')
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const stage = sleepStages.find((s) => s.id === stageId)!
  const prof = profiles[stageId]

  // synthetic traces for the selected stage (2× width for the marquee)
  const { eegPath, gsrPath } = useMemo(() => {
    const n = 420
    const eeg = Array.from({ length: n }, (_, i) =>
      eegSample(i * 0.13, { ...prof.eeg, phase: 0.3 }),
    )
    const gsr = Array.from({ length: n }, (_, i) =>
      gsrSample(i * 0.13, { ...prof.gsr, phase: 0.9 }),
    )
    return {
      eegPath: toPath([...eeg, ...eeg], 960, 60, 0.9),
      gsrPath: toPath([...gsr, ...gsr], 960, 60, 0.55),
    }
  }, [prof])

  // hypnogram geometry
  const total = illustrativeHypnogram.reduce((a, b) => a + b.minutes, 0)
  const segs = useMemo(() => {
    let acc = 0
    return illustrativeHypnogram.map((s) => {
      const x = (acc / total) * HYP_W
      const w = (s.minutes / total) * HYP_W
      acc += s.minutes
      return { ...s, x, w }
    })
  }, [total])

  const rowY = (stageIdx: number) => 22 + stageIdx * ((HYP_H - 44) / (sleepStages.length - 1))

  const stepPath = useMemo(() => {
    let d = ''
    segs.forEach((s, i) => {
      const y = rowY(s.stage)
      if (i === 0) d += `M${s.x.toFixed(1)},${y.toFixed(1)} `
      else d += `L${s.x.toFixed(1)},${y.toFixed(1)} `
      d += `L${(s.x + s.w).toFixed(1)},${y.toFixed(1)} `
    })
    return d.trim()
  }, [segs])

  return (
    <section
      id="sleep"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="sleep-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="07"
            label="Conceptual demo"
            title={<span id="sleep-title">Sleep staging, conceptually</span>}
            lead="My current research asks whether peripheral physiology can complement neural signals in sleep assessment. This is the idea in miniature — pick a stage and watch what changes."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="panel corner-ticks mt-10">
            {/* stage selector */}
            <div
              className="flex flex-wrap gap-px border-b border-white/[0.08] bg-white/[0.06]"
              role="radiogroup"
              aria-label="Sleep stage"
            >
              {sleepStages.map((s) => {
                const on = s.id === stageId
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setStageId(s.id)}
                    className="flex-1 basis-[80px] bg-ink-950 px-3 py-3 transition-colors hover:bg-ink-900"
                    style={on ? { backgroundColor: `${s.accent}14` } : undefined}
                  >
                    <span
                      className="font-mono text-[12px] uppercase tracking-[0.16em]"
                      style={{ color: on ? s.accent : undefined }}
                    >
                      {s.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="grid lg:grid-cols-[1.35fr_1fr]">
              {/* traces + features */}
              <div className="border-b border-white/[0.08] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <div className="space-y-4">
                  {[
                    { label: 'EEG', path: eegPath, color: '#5eead4', dur: '26s' },
                    { label: 'GSR / EDA', path: gsrPath, color: '#f0b429', dur: '34s' },
                  ].map((t) => (
                    <div key={t.label}>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-mono text-[10px] uppercase tracking-label"
                          style={{ color: t.color }}
                        >
                          {t.label}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone-400">
                          synthetic
                        </span>
                      </div>
                      <div className="mt-1.5 h-[60px] overflow-hidden border border-white/[0.07] bg-ink-950/60">
                        <svg
                          viewBox="0 0 480 60"
                          preserveAspectRatio="none"
                          className="h-full w-full"
                          aria-hidden
                        >
                          <line x1="0" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.07)" />
                          <g
                            style={{
                              animation: `sleep-marquee ${t.dur} linear infinite`,
                            }}
                          >
                            <path
                              d={t.path}
                              fill="none"
                              stroke={t.color}
                              strokeWidth={1.2}
                              vectorEffect="non-scaling-stroke"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="label mt-6">Feature representation — schematic</p>
                <ul className="mt-3 space-y-2.5">
                  {prof.bars.map((b) => (
                    <li key={b.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] text-bone-300">{b.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bone-400">
                          {b.v < 0.34 ? 'low' : b.v < 0.67 ? 'mid' : 'high'}
                        </span>
                      </div>
                      <div className="mt-1.5 h-[3px] w-full bg-white/[0.08]">
                        <div
                          className="h-full transition-[width] duration-500"
                          style={{ width: `${b.v * 100}%`, background: stage.accent }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* prediction read-out */}
              <div className="p-5 sm:p-6">
                <p className="label">Predicted stage — illustrative</p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="display text-[3rem] leading-none" style={{ color: stage.accent }}>
                    {stage.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-bone-400">
                    selected
                  </span>
                </div>
                <p className="prose-sci mt-4 text-[13.5px]">{stage.character}</p>

                <div className="mt-6 space-y-2">
                  <p className="label">Flow</p>
                  <ol className="space-y-1.5">
                    {['EEG + GSR waveform', 'Feature representation', 'Predicted stage'].map((s, i) => (
                      <li key={s} className="flex items-center gap-2 font-mono text-[11.5px] text-bone-300">
                        <span className="text-bone-400">{i + 1}</span>
                        <span aria-hidden className="text-bone-400">↓</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6">
                  <SyntheticNotice>
                    Interactive conceptual demonstration — not a clinical diagnostic tool. No model runs
                    here and no real recordings are used.
                  </SyntheticNotice>
                </div>
              </div>
            </div>

            {/* hypnogram */}
            <div className="border-t border-white/[0.08] p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="label">Illustrative hypnogram — a hand-drawn night, not measured data</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone-400">
                  {Math.round(total / 60)} h
                </p>
              </div>

              <div className="mt-3 overflow-x-auto">
                <svg
                  viewBox={`0 0 ${HYP_W} ${HYP_H}`}
                  className="h-[190px] w-full min-w-[560px]"
                  role="img"
                  aria-label="Illustrative hypnogram showing a hand-authored sequence of sleep stages across a night."
                >
                  {sleepStages.map((s, i) => (
                    <g key={s.id}>
                      <line
                        x1="46"
                        y1={rowY(i)}
                        x2={HYP_W}
                        y2={rowY(i)}
                        stroke={s.id === stageId ? `${s.accent}44` : 'rgba(255,255,255,0.055)'}
                        strokeDasharray="2 5"
                      />
                      <text
                        x="38"
                        y={rowY(i) + 4}
                        textAnchor="end"
                        className="font-mono"
                        fill={s.id === stageId ? s.accent : '#71808d'}
                        style={{ fontSize: 11, letterSpacing: '0.1em' }}
                      >
                        {s.label}
                      </text>
                    </g>
                  ))}

                  <g transform="translate(46,0)">
                    <path
                      d={stepPath}
                      fill="none"
                      stroke="rgba(244,246,247,0.32)"
                      strokeWidth={1.4}
                      transform={`scale(${(HYP_W - 46) / HYP_W},1)`}
                    />
                    {segs.map((s, i) => {
                      const sc = (HYP_W - 46) / HYP_W
                      const st = sleepStages[s.stage]
                      const on = hoverIdx === i || (hoverIdx === null && st.id === stageId)
                      return (
                        <g key={i}>
                          <rect
                            x={s.x * sc}
                            y={rowY(s.stage) - 5}
                            width={Math.max(1.5, s.w * sc)}
                            height={10}
                            fill={st.accent}
                            opacity={on ? 0.95 : 0.4}
                            style={{ transition: 'opacity 200ms' }}
                          />
                          <rect
                            x={s.x * sc}
                            y={8}
                            width={Math.max(3, s.w * sc)}
                            height={HYP_H - 16}
                            fill="transparent"
                            onMouseEnter={() => {
                              setHoverIdx(i)
                              setStageId(st.id)
                            }}
                            onMouseLeave={() => setHoverIdx(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <title>{`${st.label} — ${s.minutes} min (illustrative)`}</title>
                          </rect>
                        </g>
                      )
                    })}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes sleep-marquee {
          from { transform: translateX(0px); }
          to { transform: translateX(-480px); }
        }
      `}</style>
    </section>
  )
}
