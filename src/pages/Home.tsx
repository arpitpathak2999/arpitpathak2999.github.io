import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Pipeline from '../components/Pipeline'
import ResearchMap from '../components/ResearchMap'
import Research from '../components/Research'
import Publications from '../components/Publications'
import Timeline from '../components/Timeline'
import { site } from '../data/profile'
import { useSeo } from '../lib/hooks'

// Heavier sections load on demand.
const Philosophy = lazy(() => import('../components/Philosophy'))
const Stack = lazy(() => import('../components/Stack'))
const Contact = lazy(() => import('../components/Contact'))

function Skeleton({ h = 420 }: { h?: number }) {
  return <div className="shell py-20"><div style={{ height: h }} className="w-full border border-ink-900/10 bg-paper-card" /></div>
}

export default function Home() {
  useSeo(site.title, site.description, '/')
  const { hash } = useLocation()

  // Support /#section deep links arriving from other routes.
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <ResearchMap />
      <Research />
      <Publications />
      <Pipeline />
      <Timeline />
      <Suspense fallback={<Skeleton h={320} />}>
        <Philosophy />
      </Suspense>
      <Suspense fallback={<Skeleton h={300} />}>
        <Stack />
      </Suspense>
      <Suspense fallback={<Skeleton h={260} />}>
        <Contact />
      </Suspense>
    </>
  )
}
