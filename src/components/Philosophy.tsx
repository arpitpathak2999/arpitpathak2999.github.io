import { philosophy } from '../data/structures'
import { accentHex } from '../lib/accents'
import { Reveal, SectionHeading } from './ui'

export default function Philosophy() {
  return (
    <section
      id="approach"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="approach-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="07"
            label="Approach"
            title={<span id="approach-title">How I think</span>}
            lead="Six steps, in order. Skipping one shows up later as a result you cannot trust."
          />
        </Reveal>

        <ol className="mt-10 grid gap-px bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 50}>
              <div className="h-full border-t-2 bg-paper-card p-6" style={{ borderTopColor: accentHex[s.accent] }}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] tracking-wide" style={{ color: accentHex[s.accent] }}>
                    {s.step}
                  </span>
                  <h3 className="display text-[1.35rem] text-ink-900">{s.title}</h3>
                </div>
                <p className="prose-sci mt-3 text-[13.5px]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
