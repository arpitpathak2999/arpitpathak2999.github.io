import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CursorField from './components/CursorField'
import Home from './pages/Home'

const ResearchDetail = lazy(() => import('./pages/ResearchDetail'))
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Reset scroll on route change, but preserve in-page hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

function RouteFallback() {
  return (
    <div className="shell pt-32">
      <div className="h-[60vh] w-full border border-white/[0.07] bg-ink-900/30" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <CursorField />
      <ScrollManager />
      <Nav />
      <main id="main" className="relative z-10">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research/:slug" element={<ResearchDetail />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
