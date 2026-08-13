import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { education, experience, links, profile, skills } from '../data/profile'
import { Chip, Reveal, SectionHeading } from './ui'

const blocks = [
  {
    label: 'Who I am',
    body: 'A Computer Science student and researcher interested in the intersection of artificial intelligence, neuroscience and biomedical signal processing. I am not a neuroscientist or a clinician — I am a computer scientist who works on biological data, alongside researchers who bring the domain expertise.',
  },
  {
    label: 'What I study',
    body: 'Biological signals and medical data: EEG, GSR/EDA, EMG, FMG, and biomedical images. Most of my work starts with the measurement itself — how it was acquired, what contaminates it, and what remains after cleaning.',
  },
  {
    label: 'What I build',
    body: 'Machine learning systems that turn complex biological data into interpretable representations. In practice that means preprocessing pipelines, geometry-aware and learned representations, and models chosen to match the structure of the signal rather than the other way round.',
  },
  {
    label: 'What I want to explore',
    body: 'The deeper intersection of neuroscience, AI and biology — particularly whether physiological signals we can measure cheaply carry information we currently only extract from expensive, invasive or clinical setups.',
  },
]

export default function About({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="about"
      className={`relative z-10 scroll-mt-20 ${standalone ? 'pt-28 sm:pt-32' : 'py-20 sm:py-24'}`}
      aria-labelledby="about-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index={standalone ? undefined : '01'}
            level={standalone ? 1 : 2}
            label="About"
            title={<span id="about-title">Computer scientist working on biological signals</span>}
            lead={profile.positioning}
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 grid gap-px bg-white/[0.07] sm:grid-cols-2">
            {blocks.map((b) => (
              <div key={b.label} className="bg-ink-950 p-6 sm:p-7">
                <p className="label">{b.label}</p>
                <p className="prose-sci mt-3 text-[14.5px]">{b.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* research interests */}
        <Reveal delay={80}>
          <section className="mt-16" aria-labelledby="interests-title">
            <div className="flex items-center gap-3">
              <h2 id="interests-title" className="label !text-bone-200">
                Research interests
              </h2>
              <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.researchInterests.map((r) => (
                <span
                  key={r}
                  className="border border-signal-eeg/30 bg-signal-eeg/[0.05] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.11em] text-signal-eeg"
                >
                  {r}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {/* experience */}
        <Reveal delay={100}>
          <section className="mt-16" aria-labelledby="exp-title">
            <div className="flex items-center gap-3">
              <h2 id="exp-title" className="label !text-bone-200">
                Research experience
              </h2>
              <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <ol className="mt-6 space-y-px">
              {experience.map((e) => (
                <li key={e.org} className="border border-white/[0.08] bg-ink-900/40 p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[16.5px] text-bone-50">
                      {e.org}
                      {'current' in e && e.current && (
                        <span className="ml-3 align-middle font-mono text-[9.5px] uppercase tracking-[0.14em] text-signal-eeg">
                          current
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone-400">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] italic text-bone-300">
                    {e.role}
                    {'supervisor' in e && e.supervisor ? ` · ${e.supervisor}` : ''}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-400">
                    {e.location}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-signal-eeg/70"
                        />
                        <span className="prose-sci text-[13.5px]">{p}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* education */}
        <Reveal delay={110}>
          <section className="mt-16" aria-labelledby="edu-title">
            <div className="flex items-center gap-3">
              <h2 id="edu-title" className="label !text-bone-200">
                Education
              </h2>
              <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <ol className="mt-5">
              {education.map((e) => (
                <li
                  key={e.institution}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/[0.08] py-4"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] text-bone-50">{e.institution}</span>
                    <span className="mt-0.5 block text-[13px] text-bone-300">{e.credential}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone-400">
                      {e.period}
                    </span>
                    <span className="mt-0.5 block font-mono text-[12px] text-bone-200">{e.metric}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* skills */}
        <Reveal delay={120}>
          <section className="mt-16" aria-labelledby="skills-title">
            <div className="flex items-center gap-3">
              <h2 id="skills-title" className="label !text-bone-200">
                Technical skills
              </h2>
              <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <dl className="mt-5 grid gap-6 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="label">{s.group}</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-1.5">
                    {s.items.map((i) => (
                      <Chip key={i}>{i}</Chip>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* links */}
        <Reveal delay={130}>
          <section className="mt-16 border-t border-white/[0.08] pt-8" aria-labelledby="links-title">
            <h2 id="links-title" className="label !text-bone-200">
              Elsewhere
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {[
                { label: 'Email', href: links.email, external: false },
                { label: 'Google Scholar', href: links.scholar, external: true },
                { label: 'LinkedIn', href: links.linkedin, external: true },
                { label: 'GitHub', href: links.github, external: true },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="inline-flex items-center gap-2 border border-white/[0.14] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.13em] text-bone-200 no-underline transition-colors hover:border-signal-eeg/40 hover:text-signal-eeg"
                >
                  {l.label}
                  {l.external && <ArrowUpRight size={12} aria-hidden />}
                </a>
              ))}
            </div>
            <p className="mt-8 max-w-[62ch] text-[12.5px] leading-relaxed text-bone-400">
              Referee contact details are available on request rather than published here. For work-specific
              questions, see the{' '}
              <Link to="/publications" className="link-underline">
                publications
              </Link>{' '}
              page.
            </p>
          </section>
        </Reveal>
      </div>
    </section>
  )
}
