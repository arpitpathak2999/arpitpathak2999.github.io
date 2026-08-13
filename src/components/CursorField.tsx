import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

/**
 * Subtle cursor-following field: brightens the scientific grid locally.
 * Pointer-events none, mouse only, disabled under reduced-motion.
 */
export default function CursorField() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    let raf = 0
    let tx = -400
    let ty = -400
    let x = -400
    let y = -400
    let seen = false

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        seen = true
        x = tx
        y = ty
        el.style.opacity = '1'
      }
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] opacity-0 transition-opacity duration-700 will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(94,234,212,0.055) 0%, rgba(94,234,212,0.02) 38%, transparent 68%)',
      }}
    />
  )
}
