import { lazy, Suspense } from 'react'
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import { links, profile } from '../data/profile'
import { pubStats } from '../data/publications'

const HeroViz = lazy(() => import('./HeroViz'))

function VizFallback() {
  return (
    <div className="h-[280px] w-full animate-pulse border border-white/[0.09] bg-ink-900/50 sm:h-[340px] lg:h-[400px]" />
  )
}

export default function Hero() {
  return (
    <section className="relative z-10 pt-24 sm:pt-28 lg:pt-32" aria-labelledby="hero-title">
      <div className="shell">
        {/* status strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.08] pb-4">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-bone-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-eeg opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-eeg" />
            </span>
            {profile.currentRole}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-white/12 sm:block" />
          <span className="font-mono text-[10px] uppercase tracking-label text-bone-400">
            {profile.currentOrg}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-white/12 sm:block" />
          <span className="font-mono text-[10px] uppercase tracking-label text-bone-400">
            {profile.instituteShort}
          </span>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-14">
          {/* ── text column ── */}
          <div className="animate-fade-up">
            <h1
              id="hero-title"
              className="display text-[clamp(2.9rem,9vw,5.4rem)] leading-[0.94] text-bone-50"
            >
              Arpit Pathak
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12px] uppercase tracking-[0.16em] sm:text-[13px]">
              <span className="text-signal-model">AI</span>
              <span className="text-bone-400">×</span>
              <span className="text-signal-eeg">Neuroscience</span>
              <span className="text-bone-400">×</span>
              <span className="text-signal-gsr">Biomedical Intelligence</span>
            </p>

            <p className="prose-sci mt-6 max-w-[46ch] text-[15.5px] sm:text-[16.5px]">
              {profile.heroSupport}
            </p>

            {/* signal → intelligence arc */}
            <ol className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Research arc">
              {profile.arc.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="border border-white/[0.12] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-200">
                    {step}
                  </span>
                  {i < profile.arc.length - 1 && (
                    <span aria-hidden className="font-mono text-[11px] text-signal-eeg/60">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#research"
                className="group inline-flex items-center gap-2 border border-signal-eeg/45 bg-signal-eeg/[0.07] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-eeg no-underline transition-colors hover:bg-signal-eeg/[0.14]"
              >
                View research
                <ArrowDownRight
                  size={13}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href={links.scholar}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 border border-white/[0.14] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-200 no-underline transition-colors hover:border-white/30 hover:text-bone-50"
              >
                Google Scholar
                <ArrowUpRight
                  size={13}
                  aria-hidden
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={links.email}
                className="inline-flex items-center gap-2 px-1 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-300 no-underline transition-colors hover:text-signal-eeg"
              >
                <Mail size={13} aria-hidden />
                Email
              </a>
            </div>
          </div>

          {/* ── visualisation column ── */}
          <div className="lg:pt-2">
            <Suspense fallback={<VizFallback />}>
              <HeroViz />
            </Suspense>

            <p className="mt-3 max-w-[52ch] font-mono text-[10px] leading-relaxed text-bone-400">
              Biological signal → representation → intelligence. Traces above are synthetic and
              illustrative; they are not recordings.
            </p>
          </div>
        </div>

        {/* quantitative strip — every number traceable to the résumé */}
        <dl className="grid grid-cols-2 gap-px border-t border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
          {[
            { k: 'Conference papers', v: String(pubStats.conference) },
            { k: 'Book chapter', v: `${pubStats.chapters} · accepted` },
            { k: 'Research internships', v: '4' },
            { k: 'Signal modalities', v: 'EEG · GSR · EMG · FMG' },
          ].map((s) => (
            <div key={s.k} className="bg-ink-950 px-4 py-5">
              <dt className="label">{s.k}</dt>
              <dd className="mt-1.5 font-mono text-[13px] text-bone-100">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
