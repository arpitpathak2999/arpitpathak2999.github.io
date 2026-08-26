import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import { links, profile } from '../data/profile'
import { pubStats } from '../data/publications'

export default function Hero() {
  return (
    <section className="relative z-10 pt-24 sm:pt-28 lg:pt-32" aria-labelledby="hero-title">
      <div className="shell">
        {/* status strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ink-900/10 pb-4">
          <span className="text-[12px] text-ink-700">{profile.currentRole}</span>
          <span aria-hidden className="hidden h-3 w-px bg-ink-900/12 sm:block" />
          <span className="text-[12px] text-ink-500">{profile.currentOrg}</span>
          <span aria-hidden className="hidden h-3 w-px bg-ink-900/12 sm:block" />
          <span className="text-[12px] text-ink-500">{profile.instituteShort}</span>
        </div>

        <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between lg:py-14">
          <div className="max-w-2xl">
            <h1
              id="hero-title"
              className="display text-[clamp(2.6rem,7vw,4.2rem)] leading-[1.02] text-ink-900"
            >
              Arpit Pathak
            </h1>

            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-500">
              <span>AI</span>
              <span aria-hidden>×</span>
              <span>Neuroscience</span>
              <span aria-hidden>×</span>
              <span>Biomedical Intelligence</span>
            </p>

            <p className="prose-sci mt-6 max-w-[52ch] text-[16px]">{profile.heroSupport}</p>

            {/* signal → intelligence arc */}
            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Research arc">
              {profile.arc.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="border border-ink-900/12 bg-paper-card px-2.5 py-1 text-[12px] text-ink-700">
                    {step}
                  </span>
                  {i < profile.arc.length - 1 && (
                    <span aria-hidden className="text-[12px] text-ink-400">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href="#research" className="link-underline inline-flex items-center gap-1.5">
                View research
                <ArrowDownRight size={13} aria-hidden />
              </a>
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline inline-flex items-center gap-1.5"
              >
                Google Scholar
                <ArrowUpRight size={13} aria-hidden />
              </a>
              <a href={links.email} className="link-underline inline-flex items-center gap-1.5">
                <Mail size={13} aria-hidden />
                Email
              </a>
            </div>
          </div>

          <img
            src="/photo-river.jpg"
            alt={profile.name}
            className="hidden h-40 w-40 shrink-0 border border-ink-900/10 object-cover sm:block sm:h-48 sm:w-48 lg:h-56 lg:w-56"
          />
        </div>

        {/* quantitative strip — every number traceable to the résumé */}
        <dl className="grid grid-cols-2 gap-px border-t border-ink-900/10 bg-paper-line sm:grid-cols-4">
          {[
            { k: 'Conference papers', v: String(pubStats.conference) },
            { k: 'Book chapter', v: `${pubStats.chapters} · accepted` },
            { k: 'Research internships', v: '4' },
            { k: 'Signal modalities', v: 'EEG · GSR · EMG · FMG' },
          ].map((s) => (
            <div key={s.k} className="bg-paper px-4 py-5">
              <dt className="label">{s.k}</dt>
              <dd className="mt-1.5 text-[13px] text-ink-900">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
