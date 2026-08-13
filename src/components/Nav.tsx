import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const sections = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'map', label: 'Research Map' },
  { id: 'research', label: 'Research' },
  { id: 'lab', label: 'Signal Lab' },
  { id: 'timeline', label: 'Timeline' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink-800 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bone-50"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? 'border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-14 items-center justify-between sm:h-16">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 no-underline"
            aria-label={`${profile.name} — home`}
          >
            <span className="display text-[15px] tracking-tight text-bone-50 sm:text-base">
              {profile.name}
            </span>
            <span className="hidden font-mono text-[9.5px] uppercase tracking-label text-bone-400 transition-colors group-hover:text-signal-eeg sm:inline">
              AI × Neuro × Biomed
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {sections.map((s) => (
              <a
                key={s.id}
                href={sectionHref(s.id)}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                {s.label}
              </a>
            ))}
            <Link
              to="/publications"
              className={`font-mono text-[11px] uppercase tracking-[0.14em] no-underline transition-colors hover:text-signal-eeg ${
                pathname === '/publications' ? 'text-signal-eeg' : 'text-bone-300'
              }`}
            >
              Publications
            </Link>
            <Link
              to="/about"
              className={`font-mono text-[11px] uppercase tracking-[0.14em] no-underline transition-colors hover:text-signal-eeg ${
                pathname === '/about' ? 'text-signal-eeg' : 'text-bone-300'
              }`}
            >
              About
            </Link>
            <a
              href={onHome ? '#contact' : '/#contact'}
              className="border border-signal-eeg/40 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-eeg no-underline transition-colors hover:bg-signal-eeg/10"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-bone-200 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>

        <div
          aria-hidden
          className="h-px w-full origin-left bg-gradient-to-r from-signal-eeg/70 via-signal-model/60 to-signal-gsr/60"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-14 z-40 origin-top border-b border-white/[0.08] bg-ink-950/97 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav className="shell flex flex-col py-4" aria-label="Mobile">
          {sections.map((s) => (
            <a
              key={s.id}
              href={sectionHref(s.id)}
              onClick={() => setOpen(false)}
              className="border-b border-white/[0.06] py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone-200 no-underline"
            >
              {s.label}
            </a>
          ))}
          <Link
            to="/publications"
            className="border-b border-white/[0.06] py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone-200 no-underline"
          >
            Publications
          </Link>
          <Link
            to="/about"
            className="border-b border-white/[0.06] py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone-200 no-underline"
          >
            About
          </Link>
          <a
            href={onHome ? '#contact' : '/#contact'}
            onClick={() => setOpen(false)}
            className="py-3 font-mono text-xs uppercase tracking-[0.14em] text-signal-eeg no-underline"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  )
}
