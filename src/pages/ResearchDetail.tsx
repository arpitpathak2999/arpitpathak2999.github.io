import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { caseStudies, caseStudyBySlug } from '../data/research'
import { publications } from '../data/publications'
import { accentText, rgba } from '../lib/accents'
import CaseGlyph from '../components/CaseGlyph'
import { Chip, FlowChain, KeyValue, Reveal } from '../components/ui'
import { useSeo } from '../lib/hooks'

export default function ResearchDetail() {
  const { slug = '' } = useParams()
  const c = caseStudyBySlug(slug)

  useSeo(
    c ? `${c.shortTitle} — Arpit Pathak` : 'Research — Arpit Pathak',
    c ? `${c.title}. ${c.subtitle}` : undefined,
    c ? `/research/${c.slug}` : undefined,
  )

  if (!c) return <Navigate to="/" replace />

  const idx = caseStudies.findIndex((x) => x.slug === c.slug)
  const next = caseStudies[(idx + 1) % caseStudies.length]
  const pubs = publications.filter((p) => c.publicationIds.includes(p.id))

  const sections: { label: string; body: string | string[] }[] = [
    { label: 'Problem', body: c.detail.problem },
    { label: 'Biological context', body: c.detail.biological },
    { label: 'Data', body: c.detail.dataset },
    { label: 'Preprocessing', body: c.detail.preprocessing },
    { label: 'Model & methodology', body: c.detail.model },
    { label: 'Results', body: c.detail.results },
    { label: 'Limitations & scope', body: c.detail.limitations },
    { label: 'Research significance', body: c.detail.significance },
  ]

  return (
    <article className="relative z-10 pt-24 sm:pt-28">
      <div className="shell">
        <Link
          to="/#research"
          className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone-400 no-underline transition-colors hover:text-signal-eeg"
        >
          <ArrowLeft size={12} aria-hidden />
          All research
        </Link>

        {/* header */}
        <header className="mt-6 border-b border-white/[0.08] pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className={`font-mono text-[11px] ${accentText[c.accent]}`}>Research {c.index}</span>
            <span aria-hidden className="h-3 w-px bg-white/12" />
            <span className="label">{c.status}</span>
          </div>
          <h1 className="display mt-4 max-w-[24ch] text-[clamp(2rem,5.4vw,3.3rem)] leading-[1.06] text-bone-50">
            {c.title}
          </h1>
          <p className="prose-sci mt-5 max-w-[62ch] text-[15.5px]">{c.subtitle}</p>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[1fr_320px] lg:gap-14">
          {/* body */}
          <div className="min-w-0">
            <div
              className="mb-10 h-[132px] w-full border border-white/[0.09]"
              style={{ background: rgba(c.accent, 0.03) }}
            >
              <CaseGlyph kind={c.glyph} accent={c.accent} />
            </div>

            <p className="prose-sci border-l-2 pl-5 text-[15px]" style={{ borderLeftColor: rgba(c.accent, 0.5) }}>
              {c.question}
            </p>

            <div className="mt-12 space-y-11">
              {sections.map((s, i) => (
                <Reveal key={s.label} as="section" delay={i * 30}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-bone-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="label !text-bone-200">{s.label}</h2>
                    <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
                  </div>
                  {Array.isArray(s.body) ? (
                    <ul className="mt-4 space-y-3">
                      {s.body.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: rgba(c.accent, 0.85) }}
                          />
                          <span className="prose-sci text-[14.5px]">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="prose-sci mt-4 max-w-[68ch] text-[14.5px]">{s.body}</p>
                  )}
                </Reveal>
              ))}
            </div>

            {pubs.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-3">
                  <h2 className="label !text-bone-200">Publications from this work</h2>
                  <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
                </div>
                <ul className="mt-4 grid gap-px bg-white/[0.07]">
                  {pubs.map((p) => (
                    <li key={p.id} className="bg-ink-950 px-5 py-4">
                      <p className={`font-mono text-[10px] uppercase tracking-label ${accentText[p.accent]}`}>
                        {p.venueShort}
                        {p.status ? ` · ${p.status}` : ''}
                      </p>
                      <p className="mt-1.5 text-[14.5px] leading-snug text-bone-100">{p.title}</p>
                      <p className="mt-1.5 text-[12px] text-bone-400">{p.authors.join(', ')}</p>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-300 no-underline hover:text-signal-eeg"
                        >
                          {p.urlLabel ?? 'View'}
                          <ArrowUpRight size={11} aria-hidden />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="panel p-5">
              <p className="label">Pipeline</p>
              <div className="mt-3.5">
                <FlowChain steps={c.pipeline} accent={c.accent} dense />
              </div>
            </div>

            <dl className="mt-6">
              <KeyValue k="Affiliation" v={c.affiliation} />
              <KeyValue k="Period" v={c.period} />
              <KeyValue k="Status" v={c.status} />
              <KeyValue
                k="Signals & data"
                v={
                  <ul className="space-y-1">
                    {c.data.map((d) => (
                      <li key={d} className="text-[13px] text-bone-300">
                        {d}
                      </li>
                    ))}
                  </ul>
                }
              />
              <KeyValue
                k="Methodology"
                v={
                  <ul className="space-y-1">
                    {c.methodology.map((d) => (
                      <li key={d} className="text-[13px] text-bone-300">
                        {d}
                      </li>
                    ))}
                  </ul>
                }
              />
              {c.outcome && (
                <KeyValue
                  k={c.outcome.label}
                  v={<span className={`display text-2xl ${accentText[c.accent]}`}>{c.outcome.value}</span>}
                />
              )}
            </dl>

            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <p className="label">Technologies</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* next */}
        <nav className="border-t border-white/[0.08] py-10" aria-label="Next research">
          <Link
            to={`/research/${next.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-4 no-underline"
          >
            <span>
              <span className="label">Next research</span>
              <span className="display mt-2 block text-[clamp(1.3rem,3.4vw,2rem)] text-bone-50 transition-colors group-hover:text-signal-eeg">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={20}
              aria-hidden
              className="text-bone-400 transition-transform group-hover:translate-x-1.5"
            />
          </Link>
        </nav>
      </div>
    </article>
  )
}
