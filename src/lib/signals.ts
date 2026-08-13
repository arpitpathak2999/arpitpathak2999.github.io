/**
 * Synthetic signal generators — ILLUSTRATIVE ONLY.
 * These produce plausible-looking waveforms for visualisation. They are not
 * recordings, not derived from any dataset, and not clinically meaningful.
 * Every UI surface that uses them says so explicitly.
 */

/** Deterministic pseudo-random noise so renders are stable frame to frame. */
export function hashNoise(i: number, seed = 1): number {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

export interface SignalParams {
  amplitude: number // 0.2 – 1.6
  frequency: number // 0.4 – 2.2 (relative multiplier)
  noise: number // 0 – 1
  phase: number // animation phase
}

export type SignalKind = 'eeg' | 'gsr' | 'emg'

/**
 * EEG-like trace: a sum of band components (delta/theta/alpha/beta-ish),
 * plus broadband noise. Not band-accurate — visual analogy only.
 */
export function eegSample(x: number, p: SignalParams, seed = 3): number {
  const t = x * p.frequency + p.phase
  // Band tilt: as the frequency control drops, faster components fade and the
  // trace takes on a slow-wave character. Visual analogy, not a filter model.
  const f = Math.min(1.25, Math.max(0.25, p.frequency))
  const slowGain = 1.6 - f * 0.5
  const delta = 0.55 * slowGain * Math.sin(t * 0.7)
  const theta = 0.32 * (0.7 + f * 0.3) * Math.sin(t * 1.9 + 0.7)
  const alpha = 0.42 * f * Math.sin(t * 4.1 + 1.4) * (0.6 + 0.4 * Math.sin(t * 0.23))
  const beta = 0.16 * f * f * Math.sin(t * 9.3 + 2.1)
  const gamma = 0.07 * f * f * Math.sin(t * 17.7)
  const n = hashNoise(x * 7.3, seed) * 0.24 * p.noise * (0.4 + f * 0.6)
  return (delta + theta + alpha + beta + gamma) * 0.6 * p.amplitude + n
}

/**
 * GSR/EDA-like trace: slow tonic drift with occasional phasic rises that decay
 * exponentially — the characteristic asymmetric shape of a skin-conductance
 * response.
 */
export function gsrSample(x: number, p: SignalParams, seed = 11): number {
  const t = x * p.frequency * 0.45 + p.phase * 0.9
  // slow tonic drift
  const tonic = 0.72 * Math.sin(t * 0.3) + 0.3 * Math.sin(t * 0.115 + 1.2)
  // phasic skin-conductance responses: fast rise, slow exponential recovery
  const period = 11
  const cycle = ((t % period) + period) % period
  let phasic = 0
  for (let k = 0; k < 4; k++) {
    const centre = 0.9 + k * 2.7 + hashNoise(k, seed) * 0.6
    const gain = 0.78 + 0.3 * hashNoise(k + 3, seed)
    const d = cycle - centre
    if (d > 0) phasic += gain * Math.exp(-d * 0.75) * (1 - Math.exp(-d * 6))
  }
  const n = hashNoise(x * 2.1, seed) * 0.04 * p.noise
  return (tonic * 0.62 + phasic * 0.62 - 0.22) * p.amplitude + n
}

/**
 * EMG-like trace: near-silent baseline punctuated by high-frequency
 * interference-pattern bursts under a smooth envelope.
 */
export function emgSample(x: number, p: SignalParams, seed = 23): number {
  const t = x * p.frequency + p.phase
  const cycle = 26
  const pos = ((t % cycle) + cycle) % cycle
  // three bursts per cycle, different widths
  const bursts = [
    { c: 5, w: 2.6, g: 1.0 },
    { c: 13, w: 1.5, g: 0.72 },
    { c: 20, w: 3.4, g: 0.9 },
  ]
  let env = 0
  for (const b of bursts) {
    const d = (pos - b.c) / b.w
    env = Math.max(env, b.g * Math.exp(-d * d))
  }
  const carrier =
    Math.sin(t * 21.7) * 0.5 + Math.sin(t * 37.3 + 1.1) * 0.3 + hashNoise(x * 13.7, seed) * 0.7
  const rest = hashNoise(x * 5.1, seed + 7) * 0.045
  return (carrier * env * 1.05 + rest) * p.amplitude + hashNoise(x * 3.3, seed) * 0.05 * p.noise
}

export function sampleFor(kind: SignalKind, x: number, p: SignalParams): number {
  if (kind === 'eeg') return eegSample(x, p)
  if (kind === 'gsr') return gsrSample(x, p)
  return emgSample(x, p)
}

/** Simple causal moving-average smoother — the "processed" trace. */
export function movingAverage(series: number[], window: number): number[] {
  if (window <= 1) return series.slice()
  const out = new Array<number>(series.length)
  let acc = 0
  const q: number[] = []
  for (let i = 0; i < series.length; i++) {
    q.push(series[i])
    acc += series[i]
    if (q.length > window) acc -= q.shift() as number
    out[i] = acc / q.length
  }
  return out
}

/** One-pole high-pass, used to show baseline/drift removal. */
export function highPass(series: number[], alpha: number): number[] {
  const out = new Array<number>(series.length)
  let prevIn = series[0] ?? 0
  let prevOut = 0
  for (let i = 0; i < series.length; i++) {
    const x = series[i]
    prevOut = alpha * (prevOut + x - prevIn)
    prevIn = x
    out[i] = prevOut
  }
  return out
}

/** RMS envelope — the standard EMG feature, used as an illustrative read-out. */
export function rmsEnvelope(series: number[], window: number): number[] {
  const out = new Array<number>(series.length)
  const q: number[] = []
  let acc = 0
  for (let i = 0; i < series.length; i++) {
    const v = series[i] * series[i]
    q.push(v)
    acc += v
    if (q.length > window) acc -= q.shift() as number
    out[i] = Math.sqrt(acc / q.length)
  }
  return out
}

/** Build an SVG polyline path from a numeric series mapped into a viewbox. */
export function toPath(series: number[], w: number, h: number, gain = 1): string {
  if (!series.length) return ''
  const mid = h / 2
  const step = w / (series.length - 1 || 1)
  let d = ''
  for (let i = 0; i < series.length; i++) {
    const x = i * step
    const y = mid - series[i] * mid * 0.86 * gain
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${Math.max(0.5, Math.min(h - 0.5, y)).toFixed(2)} `
  }
  return d.trim()
}

/**
 * Illustrative hypnogram: a plausible night's stage sequence.
 * Hand-authored shape, not derived from data.
 * Values index into ['W','N1','N2','N3','REM'].
 */
export const illustrativeHypnogram: { stage: number; minutes: number }[] = [
  { stage: 0, minutes: 12 },
  { stage: 1, minutes: 8 },
  { stage: 2, minutes: 34 },
  { stage: 3, minutes: 42 },
  { stage: 2, minutes: 18 },
  { stage: 4, minutes: 14 },
  { stage: 1, minutes: 5 },
  { stage: 2, minutes: 40 },
  { stage: 3, minutes: 30 },
  { stage: 2, minutes: 22 },
  { stage: 4, minutes: 24 },
  { stage: 0, minutes: 4 },
  { stage: 2, minutes: 36 },
  { stage: 3, minutes: 12 },
  { stage: 2, minutes: 26 },
  { stage: 4, minutes: 32 },
  { stage: 1, minutes: 6 },
  { stage: 2, minutes: 24 },
  { stage: 4, minutes: 28 },
  { stage: 0, minutes: 9 },
]
