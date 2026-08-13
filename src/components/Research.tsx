import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '../data/research'
import { publications } from '../data/publications'
import { accentBorder, accentText, rgba } from '../lib/accents'
import { Chip, FlowChain, Reveal, SectionHeading } from './ui'

export default function Research() {
  return (
    <section id="research" className="relative z-10 scroll-mt-20 py-20 sm:py-24" aria-labelledby="research-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03"
            label="Featured research"
            title={<span id="research-title">Case studies</span>}
            lead="Four strands of work, each stated as a question first. Results appear only where they are established; ongoing work says so."
          />
        </Reveal>

        <div className="mt-12 space-y-px">
          {caseStudies.map((c, i) => {
            const pubs = publications.filter((p) => c.publicationIds.includes(p.id))
            return (
              <Reveal key={c.slug} as="article" delay={i * 60}>
                <div
                  className="group relative border border-ink-900/10 bg-paper-card"
                  style={{ borderTopColor: rgba(c.accent, 0.45) }}
                >
                  <div className="grid gap-0 lg:grid-cols-[1.45fr_1fr]">
                    {/* ── left: narrative ── */}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className={`text-[11px] ${accentText[c.accent]}`}>
                          Research {c.index}
                        </span>
                        <span aria-hidden className="h-3 w-px bg-ink-900/12" />
                        <span className="label">{c.status}</span>
                      </div>

                      <h3 className="display mt-3 text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.15] text-ink-900">
                        <Link
                          to={`/research/${c.slug}`}
                          className="no-underline transition-colors hover:text-signal-eeg"
                        >
                          {c.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-[11px] uppercase tracking-wide text-ink-500">
                        {c.affiliation} · {c.period}
                      </p>

                      <p className="prose-sci mt-5 max-w-[62ch] text-[14.5px]">{c.question}</p>

                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="label border-b border-ink-900/10 pb-2">Signals & data</p>
                          <ul className="mt-2.5 space-y-1.5">
                            {c.data.map((d) => (
                              <li key={d} className="text-[12.5px] leading-snug text-ink-700">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label border-b border-ink-900/10 pb-2">AI approach</p>
                          <ul className="mt-2.5 space-y-1.5">
                            {c.ai.slice(0, 4).map((d) => (
                              <li key={d} className="text-[12.5px] leading-snug text-ink-700">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {c.outcome && (
                        <div
                          className={`mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-l-2 pl-4 ${accentBorder[c.accent]}`}
                          style={{ borderLeftColor: rgba(c.accent, 0.6) }}
                        >
                          <span className={`display text-[2.1rem] leading-none ${accentText[c.accent]}`}>
                            {c.outcome.value}
                          </span>
                          <span className="label">{c.outcome.label}</span>
                          <p className="w-full max-w-[52ch] text-[11.5px] leading-relaxed text-ink-500">
                            {c.outcome.caption}
                          </p>
                        </div>
                      )}

                      {pubs.length > 0 && (
                        <ul className="mt-6 space-y-1.5">
                          {pubs.map((p) => (
                            <li key={p.id} className="text-[12px] leading-snug text-ink-500">
                              <span className="text-[10px] uppercase tracking-wide text-ink-700">
                                {p.venueShort}
                              </span>
                              {' — '}
                              {p.url ? (
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="link-underline text-ink-700"
                                >
                                  {p.title}
                                </a>
                              ) : (
                                p.title
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-7 flex flex-wrap items-center gap-1.5">
                        {c.tech.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>

                      <Link
                        to={`/research/${c.slug}`}
                        className={`mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide no-underline transition-colors ${accentText[c.accent]} hover:opacity-75`}
                      >
                        Full case study
                        <ArrowRight
                          size={13}
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>

                    {/* ── right: pipeline ── */}
                    <div className="border-t border-ink-900/10 p-6 sm:p-7 lg:border-l lg:border-t-0">
                      <p className="label">Pipeline</p>
                      <div className="mt-3.5">
                        <FlowChain steps={c.pipeline} accent={c.accent} dense />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
