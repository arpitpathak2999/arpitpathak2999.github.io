import { Link } from 'react-router-dom'
import { links, profile } from '../data/profile'
import { caseStudies } from '../data/research'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.08] bg-ink-950/60">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="display text-lg text-bone-50">{profile.name}</p>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-label text-bone-400">
            {profile.tagline}
          </p>
          <p className="prose-sci mt-4 max-w-sm text-[13.5px]">
            {profile.role} · {profile.instituteShort}
          </p>
        </div>

        <nav aria-label="Research pages">
          <p className="label">Research</p>
          <ul className="mt-3 space-y-2">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/research/${c.slug}`}
                  className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
                >
                  {c.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Elsewhere">
          <p className="label">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={links.email}
                className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                Google Scholar
              </a>
            </li>
            <li>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link
                to="/publications"
                className="text-[13px] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                Publications
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/[0.06] py-5 font-mono text-[10px] uppercase tracking-[0.13em] text-bone-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} {profile.name}</span>
        <span className="normal-case tracking-normal text-bone-400/80">
          Interactive visualisations on this site use synthetic, illustrative signals — not patient data.
        </span>
      </div>
    </footer>
  )
}
