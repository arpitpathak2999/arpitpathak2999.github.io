import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

type NavItem =
  | { type: 'anchor'; id: string; label: string }
  | { type: 'route'; to: string; label: string }

const navItems: NavItem[] = [
  { type: 'anchor', id: 'about', label: 'About' },
  { type: 'anchor', id: 'research', label: 'Research' },
  { type: 'route', to: '/publications', label: 'Publications' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-card focus:px-4 focus:py-2 focus:text-xs focus:text-ink-900"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-300 ${
          scrolled || open ? 'border-b border-ink-900/10' : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-14 items-center justify-between sm:h-16">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 no-underline"
            aria-label={`${profile.name} — home`}
          >
            <span className="display text-[15px] tracking-tight text-ink-900 sm:text-base">
              {profile.name}
            </span>
            <span className="hidden text-[11px] text-ink-500 sm:inline">AI × Neuro × Biomed</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map((item) =>
              item.type === 'anchor' ? (
                <a
                  key={item.id}
                  href={sectionHref(item.id)}
                  className="text-[13px] text-ink-700 no-underline transition-colors hover:text-signal-eeg"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-[13px] no-underline transition-colors hover:text-signal-eeg ${
                    pathname === item.to ? 'text-signal-eeg' : 'text-ink-700'
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={onHome ? '#contact' : '/#contact'}
              className="border border-signal-eeg/45 px-3 py-1.5 text-[12px] text-signal-eeg no-underline transition-colors hover:bg-signal-eeg/10"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-ink-700 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-14 z-40 origin-top border-b border-ink-900/10 bg-paper transition-all duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav className="shell flex flex-col py-4" aria-label="Mobile">
          {navItems.map((item) =>
            item.type === 'anchor' ? (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                onClick={() => setOpen(false)}
                className="border-b border-ink-900/10 py-3 text-[13px] text-ink-700 no-underline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-ink-900/10 py-3 text-[13px] text-ink-700 no-underline"
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href={onHome ? '#contact' : '/#contact'}
            onClick={() => setOpen(false)}
            className="py-3 text-[13px] text-signal-eeg no-underline"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  )
}
