import { stackGroups } from '../data/structures'
import { Chip, Reveal, SectionHeading } from './ui'

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="stack-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="08"
            label="Toolkit"
            title={<span id="stack-title">Languages, frameworks & methods</span>}
            lead="Languages and frameworks from my résumé, alongside the signal modalities and AI methods I actually build with."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {stackGroups.map((g) => (
              <div key={g.id}>
                <p className="label border-b border-ink-900/10 pb-2">{g.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Chip key={it} accent={g.accent}>
                      {it}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
