import { useEffect, useRef } from 'react'
import { useCanvasSize, useRafLoop, useReducedMotion } from '../lib/hooks'
import { eegSample, gsrSample } from '../lib/signals'

/**
 * "Biological signal → representation → intelligence"
 *
 * Canvas 2D. Three zones read left → right:
 *   1. acquisition  — scrolling EEG + GSR/EDA traces
 *   2. representation — time–frequency style cell grid + band spectrum
 *   3. intelligence  — small layered network, output state lights up
 *
 * Pointer position gently modulates amplitude and adds a probe cursor.
 * Static single frame when the visitor prefers reduced motion.
 */

const OUTPUTS = ['N2', 'REM', 'N3', 'Wake']

export default function HeroViz() {
  const reduced = useReducedMotion()
  const { ref: wrapRef, size } = useCanvasSize<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const phase = useRef(0)
  const pointer = useRef({ x: 0.5, y: 0.5, active: false })
  const activeOut = useRef(0)
  const outT = useRef(0)

  // Pointer tracking (skip on touch — it fights scrolling)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      pointer.current = {
        x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
        y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
        active: true,
      }
    }
    const leave = () => {
      pointer.current = { ...pointer.current, active: false }
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [wrapRef])

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

    const narrow = w < 620
    const p = phase.current
    const ptr = pointer.current
    const boost = ptr.active ? 0.82 + ptr.y * 0.55 : 1

    /* ── zone geometry ─────────────────────────────── */
    const pad = narrow ? 10 : 16
    const zones = narrow
      ? { sig: [pad, w * 0.5], rep: [w * 0.55, w * 0.78], net: [w * 0.82, w - pad] }
      : { sig: [pad, w * 0.44], rep: [w * 0.5, w * 0.68], net: [w * 0.73, w - pad] }

    const topPad = narrow ? 26 : 34
    const bottomPad = narrow ? 22 : 30
    const innerH = h - topPad - bottomPad

    /* ── 1. signal traces ──────────────────────────── */
    const sigX0 = zones.sig[0]
    const sigW = zones.sig[1] - sigX0
    const rowH = innerH / 2
    const traces = [
      { fn: eegSample, color: '#5eead4', y: topPad + rowH * 0.42, gain: 0.42, lw: 1.35 },
      { fn: gsrSample, color: '#f0b429', y: topPad + rowH * 1.34, gain: 0.34, lw: 1.5 },
    ]

    // faint per-row baseline
    ctx.strokeStyle = 'rgba(255,255,255,0.055)'
    ctx.lineWidth = 1
    for (const t of traces) {
      ctx.beginPath()
      ctx.moveTo(sigX0, Math.round(t.y) + 0.5)
      ctx.lineTo(sigX0 + sigW, Math.round(t.y) + 0.5)
      ctx.stroke()
    }

    const step = narrow ? 3 : 2
    const params = { amplitude: boost, frequency: 1, noise: 0.55, phase: p }

    for (const t of traces) {
      ctx.beginPath()
      for (let sx = 0; sx <= sigW; sx += step) {
        const v = t.fn(sx * 0.09, params)
        const y = t.y - v * rowH * t.gain
        if (sx === 0) ctx.moveTo(sigX0 + sx, y)
        else ctx.lineTo(sigX0 + sx, y)
      }
      ctx.strokeStyle = t.color
      ctx.lineWidth = t.lw
      ctx.lineJoin = 'round'
      ctx.shadowColor = t.color
      ctx.shadowBlur = 7
      ctx.globalAlpha = 0.92
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // leading sample marker
      const vEnd = t.fn(sigW * 0.09, params)
      const yEnd = t.y - vEnd * rowH * t.gain
      ctx.beginPath()
      ctx.arc(sigX0 + sigW, yEnd, 2.1, 0, Math.PI * 2)
      ctx.fillStyle = t.color
      ctx.fill()
    }

    // pointer probe line over the signal zone
    if (ptr.active) {
      const px = sigX0 + sigW * Math.min(1, Math.max(0, (ptr.x * w - sigX0) / sigW))
      if (px >= sigX0 && px <= sigX0 + sigW) {
        ctx.strokeStyle = 'rgba(244,246,247,0.20)'
        ctx.lineWidth = 1
        ctx.setLineDash([2, 4])
        ctx.beginPath()
        ctx.moveTo(px, topPad - 6)
        ctx.lineTo(px, h - bottomPad + 6)
        ctx.stroke()
        ctx.setLineDash([])
        for (const t of traces) {
          const v = t.fn((px - sigX0) * 0.09, params)
          ctx.beginPath()
          ctx.arc(px, t.y - v * rowH * t.gain, 3.2, 0, Math.PI * 2)
          ctx.strokeStyle = t.color
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }
    }

    /* ── 2. representation grid ─────────────────────── */
    const repX0 = zones.rep[0]
    const repW = zones.rep[1] - repX0
    const cols = narrow ? 8 : 12
    const rows = narrow ? 7 : 9
    const cw = repW / cols
    const ch = innerH / rows
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const band = (rows - r) / rows
        const s = eegSample((c * 3.1 + r * 0.6) * 0.6 + p * 0.55, {
          amplitude: 1,
          frequency: 0.6 + band * 1.9,
          noise: 0.3,
          phase: p * 0.6,
        })
        const inten = Math.min(1, Math.abs(s) * (0.55 + band * 1.15))
        const a = 0.05 + inten * 0.62
        // teal → violet up the frequency axis
        const mix = band
        const rr = Math.round(94 + mix * 73)
        const gg = Math.round(234 - mix * 95)
        const bb = Math.round(212 - mix * 10)
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${a})`
        ctx.fillRect(
          repX0 + c * cw + 0.6,
          topPad + r * ch + 0.6,
          Math.max(1, cw - 1.6),
          Math.max(1, ch - 1.6),
        )
      }
    }
    // frame
    ctx.strokeStyle = 'rgba(255,255,255,0.10)'
    ctx.lineWidth = 1
    ctx.strokeRect(repX0 + 0.5, topPad + 0.5, repW - 1, innerH - 1)

    /* ── 3. network ─────────────────────────────────── */
    const netX0 = zones.net[0]
    const netW = zones.net[1] - netX0
    const layers = narrow ? [3, 4, 3] : [4, 5, 4, OUTPUTS.length]
    const layerX = layers.map((_, i) =>
      layers.length === 1 ? netX0 : netX0 + (netW * i) / (layers.length - 1),
    )
    const nodePos: { x: number; y: number }[][] = layers.map((count, li) =>
      Array.from({ length: count }, (_, ni) => ({
        x: layerX[li],
        y: topPad + (innerH * (ni + 0.5)) / count,
      })),
    )

    // edges
    for (let li = 0; li < nodePos.length - 1; li++) {
      for (const a of nodePos[li]) {
        for (const b of nodePos[li + 1]) {
          const pulse = 0.5 + 0.5 * Math.sin(p * 1.7 + a.y * 0.06 + b.y * 0.04 + li)
          ctx.strokeStyle = `rgba(167,139,250,${0.05 + pulse * 0.16})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }
    // nodes
    for (let li = 0; li < nodePos.length; li++) {
      const isOut = li === nodePos.length - 1 && !narrow
      for (let ni = 0; ni < nodePos[li].length; ni++) {
        const n = nodePos[li][ni]
        const lit = isOut && ni === activeOut.current
        const pulse = 0.45 + 0.55 * Math.sin(p * 2.1 + li * 1.1 + ni * 0.8)
        const rad = lit ? 4.2 : 2.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2)
        if (lit) {
          ctx.fillStyle = '#5eead4'
          ctx.shadowColor = '#5eead4'
          ctx.shadowBlur = 12
        } else {
          ctx.fillStyle = `rgba(167,139,250,${0.35 + pulse * 0.5})`
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0
        if (lit) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, 8, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(94,234,212,0.35)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    /* ── connectors between zones ──────────────────── */
    const arrowY = topPad + innerH / 2
    const gaps = [
      [zones.sig[1], zones.rep[0]],
      [zones.rep[1], zones.net[0]],
    ]
    ctx.setLineDash([3, 5])
    ctx.lineDashOffset = -p * 9
    ctx.strokeStyle = 'rgba(244,246,247,0.26)'
    ctx.lineWidth = 1
    for (const [a, b] of gaps) {
      ctx.beginPath()
      ctx.moveTo(a + 4, arrowY)
      ctx.lineTo(b - 6, arrowY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(b - 6, arrowY)
      ctx.lineTo(b - 10, arrowY - 3)
      ctx.lineTo(b - 10, arrowY + 3)
      ctx.closePath()
      ctx.fillStyle = 'rgba(244,246,247,0.42)'
      ctx.fill()
      ctx.setLineDash([3, 5])
    }
    ctx.setLineDash([])
  }

  useRafLoop((dt) => {
    phase.current += dt * 0.0042
    outT.current += dt
    if (outT.current > 2600) {
      outT.current = 0
      activeOut.current = (activeOut.current + 1) % OUTPUTS.length
    }
    draw()
  }, !reduced)

  // static frame for reduced motion / first paint
  useEffect(() => {
    draw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w, size.h, size.dpr, reduced])

  const narrow = size.w > 0 && size.w < 620

  return (
    <div
      ref={wrapRef}
      className="corner-ticks relative h-[280px] w-full border border-white/[0.09] bg-ink-900/50 sm:h-[340px] lg:h-[400px]"
      role="img"
      aria-label="Illustrative visualisation: synthetic EEG and GSR/EDA traces feeding a time–frequency representation, which feeds a small neural network producing a physiological state read-out."
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* Crisp HTML labels over the canvas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-3 top-2 font-mono text-[9px] uppercase tracking-[0.16em] text-signal-eeg/80 sm:text-[9.5px]">
          EEG
        </span>
        <span className="absolute left-3 top-1/2 mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-signal-gsr/80 sm:text-[9.5px]">
          GSR / EDA
        </span>
        <span
          className="absolute bottom-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-bone-400 sm:text-[9px]"
          style={{ left: narrow ? '55%' : '50%' }}
        >
          {narrow ? 'Repr.' : 'Representation'}
        </span>
        <span
          className="absolute bottom-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-signal-model/80 sm:text-[9px]"
          style={{ left: narrow ? '82%' : '73%' }}
        >
          Model
        </span>
        <span className="absolute bottom-2 left-3 font-mono text-[8.5px] uppercase tracking-[0.16em] text-bone-400 sm:text-[9px]">
          Acquisition
        </span>
        <span className="absolute right-3 top-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-bone-400/80 sm:text-[9px]">
          Synthetic · illustrative
        </span>
      </div>
    </div>
  )
}
