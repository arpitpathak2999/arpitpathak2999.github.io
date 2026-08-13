import { accentHex, type AccentKey } from '../lib/accents'
import { eegSample, emgSample, gsrSample, toPath } from '../lib/signals'

/** Small static SVG signatures for each research case study. */
export default function CaseGlyph({
  kind,
  accent,
}: {
  kind: 'eeg-gsr' | 'manifold' | 'burst' | 'image'
  accent: AccentKey
}) {
  const c = accentHex[accent]
  const W = 320
  const H = 132

  if (kind === 'eeg-gsr') {
    const eeg = Array.from({ length: 160 }, (_, i) =>
      eegSample(i * 0.16, { amplitude: 1, frequency: 1, noise: 0.5, phase: 0.4 }),
    )
    const gsr = Array.from({ length: 160 }, (_, i) =>
      gsrSample(i * 0.3, { amplitude: 1, frequency: 1, noise: 0.2, phase: 1.1 }),
    )
    return (
      <Frame>
        <path d={toPath(eeg, W, H * 0.52, 0.72)} fill="none" stroke={c} strokeWidth={1.2} opacity={0.9} />
        <g transform={`translate(0,${H * 0.48})`}>
          <path
            d={toPath(gsr, W, H * 0.52, 0.55)}
            fill="none"
            stroke={accentHex.gsr}
            strokeWidth={1.4}
            opacity={0.85}
          />
        </g>
        <line x1="0" y1={H * 0.48} x2={W} y2={H * 0.48} stroke="rgba(255,255,255,0.07)" />
        {[0.18, 0.42, 0.66, 0.88].map((f) => (
          <line
            key={f}
            x1={W * f}
            y1="0"
            x2={W * f}
            y2={H}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2 4"
          />
        ))}
      </Frame>
    )
  }

  if (kind === 'manifold') {
    // curved manifold mesh + graph overlay
    const rows = 5
    const cols = 8
    const pt = (i: number, j: number) => {
      const u = i / (cols - 1)
      const v = j / (rows - 1)
      const x = 24 + u * (W - 48)
      const y = 22 + v * (H - 44) + Math.sin(u * Math.PI) * 16 * (0.5 - v) * 2
      return [x, y] as const
    }
    return (
      <Frame>
        {Array.from({ length: rows }, (_, j) => (
          <path
            key={`r${j}`}
            d={Array.from({ length: cols }, (_, i) => {
              const [x, y] = pt(i, j)
              return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
          />
        ))}
        {Array.from({ length: cols }, (_, i) => (
          <path
            key={`c${i}`}
            d={Array.from({ length: rows }, (_, j) => {
              const [x, y] = pt(i, j)
              return `${j === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
          />
        ))}
        {/* graph over the manifold */}
        {[
          [1, 1],
          [3, 0],
          [4, 2],
          [6, 1],
          [2, 3],
          [5, 3],
        ].map((a, ai, arr) =>
          arr.slice(ai + 1).map((b, bi) => {
            const [x1, y1] = pt(a[0], a[1])
            const [x2, y2] = pt(b[0], b[1])
            const d = Math.hypot(x2 - x1, y2 - y1)
            if (d > 120) return null
            return (
              <line
                key={`g${ai}-${bi}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={c}
                strokeWidth={0.8}
                opacity={0.4}
              />
            )
          }),
        )}
        {[
          [1, 1],
          [3, 0],
          [4, 2],
          [6, 1],
          [2, 3],
          [5, 3],
        ].map((a, i) => {
          const [x, y] = pt(a[0], a[1])
          return <circle key={i} cx={x} cy={y} r={3} fill={c} opacity={0.95} />
        })}
      </Frame>
    )
  }

  if (kind === 'burst') {
    const emg = Array.from({ length: 220 }, (_, i) =>
      emgSample(i * 0.13, { amplitude: 1, frequency: 1, noise: 0.4, phase: 0 }),
    )
    const env = emg.map((_, i) => {
      const w = 9
      let m = 0
      for (let k = Math.max(0, i - w); k < Math.min(emg.length, i + w); k++) m = Math.max(m, Math.abs(emg[k]))
      return m
    })
    return (
      <Frame>
        <path d={toPath(emg, W, H, 0.82)} fill="none" stroke={c} strokeWidth={0.9} opacity={0.75} />
        <path d={toPath(env, W, H, 0.8)} fill="none" stroke="#fff" strokeWidth={1.1} opacity={0.35} />
        <path
          d={toPath(
            env.map((v) => -v),
            W,
            H,
            0.8,
          )}
          fill="none"
          stroke="#fff"
          strokeWidth={1.1}
          opacity={0.35}
        />
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.08)" />
      </Frame>
    )
  }

  // image / ROI
  const cells = 12
  return (
    <Frame>
      {Array.from({ length: cells }, (_, i) =>
        Array.from({ length: 6 }, (_, j) => {
          const cw = W / cells
          const chh = H / 6
          const d = Math.hypot(i - 7.2, j - 2.6)
          const a = Math.max(0, 0.42 - d * 0.07)
          return (
            <rect
              key={`${i}-${j}`}
              x={i * cw}
              y={j * chh}
              width={cw - 1}
              height={chh - 1}
              fill={`rgba(96,165,250,${(a + 0.02).toFixed(3)})`}
            />
          )
        }),
      )}
      {/* ROI box */}
      <rect
        x={W * 0.5}
        y={H * 0.24}
        width={W * 0.24}
        height={H * 0.42}
        fill="none"
        stroke={c}
        strokeWidth={1.3}
        strokeDasharray="4 3"
      />
      <circle cx={W * 0.62} cy={H * 0.45} r={16} fill="none" stroke={c} strokeWidth={1} opacity={0.6} />
      <circle cx={W * 0.62} cy={H * 0.45} r={7} fill={c} opacity={0.35} />
      <text
        x={W * 0.5}
        y={H * 0.2}
        className="fill-bone-400 font-mono"
        style={{ fontSize: 8, letterSpacing: '0.1em' }}
      >
        ROI
      </text>
    </Frame>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 132"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  )
}
