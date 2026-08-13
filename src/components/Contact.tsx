import { ArrowUpRight, Mail } from 'lucide-react'
import { links, profile } from '../data/profile'
import { Reveal, SectionHeading } from './ui'

const elsewhere = [
  { label: 'GitHub', href: links.github, note: 'Code and experiments' },
  { label: 'LinkedIn', href: links.linkedin, note: 'Professional profile' },
  { label: 'Google Scholar', href: links.scholar, note: 'Publication record' },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="09"
            label="Contact"
            title={<span id="contact-title">Get in touch</span>}
            lead="Open to research collaboration, graduate research opportunities, and work at the intersection of AI, neuroscience and biomedical signals."
          />
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-10 grid gap-px bg-paper-line lg:grid-cols-[1.3fr_1fr]">
            <div className="bg-paper-card p-6 sm:p-8">
              <p className="label">Email</p>
              <a
                href={links.email}
                className="mt-3 inline-flex items-center gap-3 text-[clamp(1rem,3vw,1.45rem)] text-ink-900 no-underline transition-colors hover:text-signal-eeg"
              >
                <Mail size={17} aria-hidden className="shrink-0 text-signal-eeg" />
                <span className="break-all">{profile.email}</span>
              </a>
              <p className="prose-sci mt-6 max-w-[48ch] text-[13.5px]">
                The fastest way to reach me. If you are writing about a specific piece of work, mentioning
                which signal modality or method you are interested in helps me reply usefully.
              </p>
            </div>

            <ul className="grid bg-paper-card">
              {elsewhere.map((e) => (
                <li key={e.label} className="border-b border-ink-900/10 last:border-b-0">
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-3 px-6 py-5 no-underline transition-colors hover:bg-ink-900/[0.04]"
                  >
                    <span>
                      <span className="block text-[11px] uppercase tracking-wide text-ink-900 transition-colors group-hover:text-signal-eeg">
                        {e.label}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-ink-500">{e.note}</span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="shrink-0 text-ink-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-eeg"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
