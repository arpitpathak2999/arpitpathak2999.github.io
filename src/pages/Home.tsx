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

// Heavier interactive sections load on demand.
const SignalLab = lazy(() => import('../components/SignalLab'))
const SleepDemo = lazy(() => import('../components/SleepDemo'))
const Philosophy = lazy(() => import('../components/Philosophy'))
const Stack = lazy(() => import('../components/Stack'))
const Contact = lazy(() => import('../components/Contact'))

function Skeleton({ h = 420 }: { h?: number }) {
  return <div className="shell py-20"><div style={{ height: h }} className="w-full border border-white/[0.07] bg-ink-900/30" /></div>
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
      <Divider label="Signal → Biology → Representation → Intelligence" />
      <Pipeline />
      <Timeline />
      <Suspense fallback={<Skeleton />}>
        <SignalLab />
      </Suspense>
      <Suspense fallback={<Skeleton h={520} />}>
        <SleepDemo />
      </Suspense>
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

function Divider({ label }: { label: string }) {
  return (
    <div className="relative z-10 border-y border-white/[0.08] bg-ink-900/30">
      <div className="shell overflow-hidden py-3">
        <p className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.28em] text-bone-400 sm:text-[10.5px]">
          {label}
        </p>
      </div>
    </div>
  )
}
