import { useEffect, useRef, useState } from 'react'
import { accentHex } from '../lib/accents'
import { useCanvasSize, useInView, useRafLoop, useReducedMotion } from '../lib/hooks'
import { movingAverage, rmsEnvelope, sampleFor, type SignalKind } from '../lib/signals'
import { Reveal, SectionHeading, SyntheticNotice } from './ui'

const KINDS: { id: SignalKind; label: string; accent: 'eeg' | 'gsr' | 'emg'; blurb: string; processLabel: string }[] = [
  {
    id: 'eeg',
    label: 'EEG',
    accent: 'eeg',
    blurb:
      'Cortical electrophysiology — several rhythmic components superimposed, buried in broadband noise.',
    processLabel: 'Low-pass smoothing',
  },
  {
    id: 'gsr',
    label: 'GSR / EDA',
    accent: 'gsr',
    blurb:
      'Electrodermal activity — a slow tonic level with asymmetric phasic rises that decay back down.',
    processLabel: 'Tonic component (smoothed)',
  },
  {
    id: 'emg',
    label: 'EMG',
    accent: 'emg',
    blurb:
      'Surface electromyography — near-silent baseline punctuated by high-frequency contraction bursts.',
    processLabel: 'RMS envelope',
  },
]

const N = 460

export default function SignalLab() {
  const reduced = useReducedMotion()
  const [kind, setKind] = useState<SignalKind>('eeg')
  const [amplitude, setAmplitude] = useState(1)
  const [frequency, setFrequency] = useState(1)
  const [noise, setNoise] = useState(0.45)
  const [smoothing, setSmoothing] = useState(9)

  const { ref: wrapRef, size } = useCanvasSize<HTMLDivElement>()
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const phase = useRef(0)
  const cfg = KINDS.find((k) => k.id === kind)!

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas || !size.w || !size.h) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h, dpr } = size
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const p = { amplitude, frequency, noise, phase: phase.current }
    const raw = new Array<number>(N)
    for (let i = 0; i < N; i++) raw[i] = sampleFor(kind, i * 0.11, p)

    const win = Math.max(1, Math.round(smoothing))
    const processed =
      kind === 'emg' ? rmsEnvelope(raw, Math.max(4, win * 2)) : movingAverage(raw, kind === 'gsr' ? win * 3 : win)

    const gap = 12
    const rowH = (h - gap) / 2
    const color = accentHex[cfg.accent]

    const plot = (series: number[], top: number, stroke: string, lw: number, fill?: string) => {
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'
      ctx.lineWidth = 1
      for (let g = 1; g < 4; g++) {
        const y = Math.round(top + (rowH * g) / 4) + 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      for (let g = 1; g < 8; g++) {
        const x = Math.round((w * g) / 8) + 0.5
        ctx.beginPath()
        ctx.moveTo(x, top)
        ctx.lineTo(x, top + rowH)
        ctx.stroke()
      }
      // midline
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.beginPath()
      ctx.moveTo(0, Math.round(top + rowH / 2) + 0.5)
      ctx.lineTo(w, Math.round(top + rowH / 2) + 0.5)
      ctx.stroke()

      const mid = top + rowH / 2
      const gain = rowH * 0.42
      const step = w / (series.length - 1)

      if (fill) {
        ctx.beginPath()
        ctx.moveTo(0, mid)
        for (let i = 0; i < series.length; i++) {
          ctx.lineTo(i * step, mid - Math.max(-1.6, Math.min(1.6, series[i])) * gain)
        }
        ctx.lineTo(w, mid)
        ctx.closePath()
        ctx.fillStyle = fill
        ctx.fill()
      }

      ctx.beginPath()
      for (let i = 0; i < series.length; i++) {
        const y = mid - Math.max(-1.7, Math.min(1.7, series[i])) * gain
        if (i === 0) ctx.moveTo(0, y)
        else ctx.lineTo(i * step, y)
      }
      ctx.strokeStyle = stroke
      ctx.lineWidth = lw
      ctx.lineJoin = 'round'
      ctx.stroke()
    }

    plot(raw, 0, `${color}cc`, 1.1)
    plot(processed, rowH + gap, color, 1.7, `${color}18`)

    // divider
    ctx.strokeStyle = 'rgba(255,255,255,0.09)'
    ctx.setLineDash([2, 4])
    ctx.beginPath()
    ctx.moveTo(0, Math.round(rowH + gap / 2) + 0.5)
    ctx.lineTo(w, Math.round(rowH + gap / 2) + 0.5)
    ctx.stroke()
    ctx.setLineDash([])
  }

  useRafLoop((dt) => {
    phase.current += dt * (kind === 'gsr' ? 0.0055 : 0.0032)
    draw()
  }, !reduced && inView)

  // Static redraw whenever parameters, size or animation state change.
  // Covers reduced-motion visitors and off-screen first paint.
  useEffect(() => {
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, amplitude, frequency, noise, smoothing, size.w, size.h, size.dpr, reduced, inView])

  return (
    <section id="lab" className="relative z-10 scroll-mt-20 py-20 sm:py-24" aria-labelledby="lab-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="06"
            label="Interactive"
            title={<span id="lab-title">Signal Lab</span>}
            lead="The same three modalities I work with, generated synthetically so you can feel how they differ — and what a filter does to them."
          />
        </Reveal>

        <Reveal delay={80}>
          <div ref={inViewRef} className="mt-10">
            <div className="panel corner-ticks">
              {/* modality selector */}
              <div
                className="flex flex-wrap gap-px border-b border-white/[0.08] bg-white/[0.06]"
                role="radiogroup"
                aria-label="Signal modality"
              >
                {KINDS.map((k) => {
                  const on = k.id === kind
                  return (
                    <button
                      key={k.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setKind(k.id)}
                      className="flex-1 basis-[110px] bg-ink-950 px-4 py-3.5 text-left transition-colors hover:bg-ink-900"
                      style={on ? { backgroundColor: `${accentHex[k.accent]}12` } : undefined}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full transition-colors"
                          style={{
                            background: on ? accentHex[k.accent] : 'rgba(255,255,255,0.2)',
                          }}
                        />
                        <span
                          className="font-mono text-[11px] uppercase tracking-[0.14em]"
                          style={{ color: on ? accentHex[k.accent] : undefined }}
                        >
                          {k.label}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="grid lg:grid-cols-[1.6fr_1fr]">
                {/* plots */}
                <div className="border-b border-white/[0.08] lg:border-b-0 lg:border-r">
                  <div className="flex items-center justify-between px-4 pt-3.5">
                    <span className="label">Raw signal</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone-400">
                      synthetic
                    </span>
                  </div>
                  <div ref={wrapRef} className="relative h-[260px] w-full px-1 sm:h-[300px]">
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 h-full w-full"
                      role="img"
                      aria-label={`Synthetic ${cfg.label} trace shown raw and after ${cfg.processLabel.toLowerCase()}.`}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-3 top-1/2 mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em]"
                      style={{ color: accentHex[cfg.accent] }}
                    >
                      {cfg.processLabel}
                    </span>
                  </div>
                  <p className="px-4 pb-4 text-[12.5px] leading-relaxed text-bone-300">{cfg.blurb}</p>
                </div>

                {/* controls */}
                <div className="p-5 sm:p-6">
                  <p className="label">Controls</p>
                  <div className="mt-4 space-y-5">
                    <Slider
                      label="Amplitude"
                      value={amplitude}
                      min={0.25}
                      max={1.6}
                      step={0.05}
                      onChange={setAmplitude}
                      accent={accentHex[cfg.accent]}
                      format={(v) => `${v.toFixed(2)}×`}
                    />
                    <Slider
                      label="Frequency"
                      value={frequency}
                      min={0.4}
                      max={2.2}
                      step={0.05}
                      onChange={setFrequency}
                      accent={accentHex[cfg.accent]}
                      format={(v) => `${v.toFixed(2)}×`}
                    />
                    <Slider
                      label="Noise"
                      value={noise}
                      min={0}
                      max={1}
                      step={0.02}
                      onChange={setNoise}
                      accent={accentHex[cfg.accent]}
                      format={(v) => `${Math.round(v * 100)}%`}
                    />
                    <Slider
                      label="Smoothing window"
                      value={smoothing}
                      min={1}
                      max={40}
                      step={1}
                      onChange={setSmoothing}
                      accent={accentHex[cfg.accent]}
                      format={(v) => `${v} samples`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAmplitude(1)
                      setFrequency(1)
                      setNoise(0.45)
                      setSmoothing(9)
                    }}
                    className="mt-6 w-full border border-white/[0.14] py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone-300 transition-colors hover:border-white/30 hover:text-bone-50"
                  >
                    Reset parameters
                  </button>

                  <div className="mt-5">
                    <SyntheticNotice>
                      Illustrative synthetic signals generated in the browser. Not recordings, not patient
                      data, not clinically meaningful.
                    </SyntheticNotice>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  accent,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  accent: string
  format: (v: number) => string
}) {
  const id = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-bone-300">
          {label}
        </label>
        <span className="font-mono text-[10.5px] text-bone-400">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 outline-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-bone-50 [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(5,7,10,0.9)]"
        style={{
          background: `linear-gradient(to right, ${accent} ${pct}%, rgba(255,255,255,0.10) ${pct}%)`,
          // thumb colour via accent-color for Firefox, box-shadow trick for WebKit
          accentColor: accent,
        }}
      />
    </div>
  )
}
