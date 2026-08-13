import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { publications, underReview, type Publication } from '../data/publications'
import { accentHex, accentText } from '../lib/accents'
import { Chip, Reveal, SectionHeading } from './ui'

function AuthorLine({ authors }: { authors: string[] }) {
  return (
    <p className="text-[12.5px] leading-relaxed text-ink-500">
      {authors.map((a, i) => (
        <span key={a + i}>
          <span className={a === 'A. Pathak' ? 'text-ink-900' : undefined}>{a}</span>
          {i < authors.length - 1 && ', '}
        </span>
      ))}
    </p>
  )
}

function PubCard({ p, index }: { p: Publication; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `pub-panel-${p.id}`

  return (
    <li className="bg-paper-card transition-colors hover:bg-ink-900/[0.03]">
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[2px]"
          style={{ background: `${accentHex[p.accent]}${open ? 'ee' : '55'}` }}
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className="mt-[3px] text-[10.5px] text-ink-500">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className={`text-[10px] uppercase tracking-wide ${accentText[p.accent]}`}>
                {p.venueShort}
              </span>
              {p.status && (
                <span className="text-[9.5px] uppercase tracking-wide text-ink-500">
                  · {p.status}
                </span>
              )}
            </span>
            <span className="mt-1.5 block text-[15px] leading-snug text-ink-900 sm:text-[15.5px]">
              {p.title}
            </span>
            <span className="mt-1.5 block text-[10.5px] uppercase tracking-wide text-ink-500">
              {p.area}
            </span>
          </span>

          <span
            aria-hidden
            className="mt-0.5 shrink-0 border border-ink-900/15 p-1.5 text-ink-700"
          >
            {open ? <Minus size={11} /> : <Plus size={11} />}
          </span>
        </button>

        <div
          id={panelId}
          hidden={!open}
          className="border-t border-ink-900/10 px-5 pb-6 pt-5 sm:px-6 sm:pl-[62px]"
        >
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="label">Authors</p>
              <div className="mt-2">
                <AuthorLine authors={p.authors} />
              </div>
              <p className="label mt-5">Venue</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-700">
                {p.venue}
                {', '}
                {p.year}
              </p>
            </div>
            <div>
              <p className="label">Topics</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.topics.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`mt-5 inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wide no-underline ${accentText[p.accent]}`}
                >
                  {p.urlLabel ?? 'View'}
                  <ArrowUpRight size={12} aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Publications({ standalone = false }: { standalone?: boolean }) {
  const [filter, setFilter] = useState<'all' | 'conference' | 'chapter'>('all')
  const shown = publications.filter((p) => filter === 'all' || p.kind === filter)

  const filters: { id: typeof filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: publications.length },
    { id: 'conference', label: 'Conference', count: publications.filter((p) => p.kind === 'conference').length },
    { id: 'chapter', label: 'Book chapter', count: publications.filter((p) => p.kind === 'chapter').length },
  ]

  return (
    <section
      id="publications"
      className={`relative z-10 scroll-mt-20 ${standalone ? 'pt-28 pb-8 sm:pt-32' : 'py-20 sm:py-24'}`}
      aria-labelledby="pubs-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index={standalone ? undefined : '04'}
            level={standalone ? 1 : 2}
            label="Publications"
            title={<span id="pubs-title">Peer-reviewed work</span>}
            lead="Expand any entry for authors, venue and topics. Links go to the publisher or Google Scholar record where one exists — nothing is fabricated."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap gap-1.5" role="group" aria-label="Filter publications">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`border px-3 py-1.5 text-[10px] uppercase tracking-wide transition-colors ${
                  filter === f.id
                    ? 'border-signal-eeg/50 bg-signal-eeg/10 text-signal-eeg'
                    : 'border-ink-900/12 text-ink-700 hover:border-ink-900/25 hover:text-ink-900'
                }`}
              >
                {f.label} <span className="opacity-60">{f.count}</span>
              </button>
            ))}
          </div>

          <ul className="mt-5 grid gap-px bg-paper-line">
            {shown.map((p, i) => (
              <PubCard key={p.id} p={p} index={i} />
            ))}
          </ul>

          {/* under review — stated exactly as the résumé reports it */}
          <div className="mt-10">
            <p className="label">Under review</p>
            <ul className="mt-3 grid gap-px bg-paper-line">
              {underReview.map((u) => (
                <li key={u.title} className="bg-paper-card px-5 py-4 sm:px-6">
                  <p className="text-[10px] uppercase tracking-wide text-ink-500">
                    {u.status} · {u.venue} · {u.year}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-snug text-ink-900">{u.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
