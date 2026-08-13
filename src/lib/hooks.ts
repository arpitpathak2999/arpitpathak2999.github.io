import { useCallback, useEffect, useRef, useState } from 'react'

/** Respects the OS "reduce motion" setting, live. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** True once the element has scrolled into view. Never flips back. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08, ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [options])

  return { ref, inView }
}

/** requestAnimationFrame loop that pauses when the tab is hidden or motion is reduced. */
export function useRafLoop(cb: (dt: number, t: number) => void, active = true) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    if (!active) return
    let raf = 0
    let last = performance.now()
    let running = true

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min(now - last, 48)
      last = now
      cbRef.current(dt, now)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onVis = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [active])
}

/** Canvas sized to its container with devicePixelRatio handling. */
export function useCanvasSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0, dpr: 1 })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setSize({
      w: Math.max(1, Math.round(r.width)),
      h: Math.max(1, Math.round(r.height)),
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
  }, [])

  useEffect(() => {
    measure()
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  return { ref, size }
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://arpitpathak2999.github.io').replace(
  /\/+$/,
  '',
)

/** Sets document title + meta description per route. */
export function useSeo(title: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'description')
        document.head.appendChild(m)
      }
      m.setAttribute('content', description)
    }
    const og = document.querySelector('meta[property="og:title"]')
    og?.setAttribute('content', title)
    if (canonicalPath) {
      let l = document.querySelector('link[rel="canonical"]')
      if (!l) {
        l = document.createElement('link')
        l.setAttribute('rel', 'canonical')
        document.head.appendChild(l)
      }
      l.setAttribute('href', `${SITE_URL}${canonicalPath}`)
    }
  }, [title, description, canonicalPath])
}
