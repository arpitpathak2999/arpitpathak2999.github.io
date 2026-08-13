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
            index="08"
            label="Approach"
            title={<span id="approach-title">How I think</span>}
            lead="Six steps, in order. Skipping one shows up later as a result you cannot trust."
          />
        </Reveal>

        <ol className="mt-10 grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 50}>
              <div className="group relative h-full bg-ink-950 p-6 transition-colors hover:bg-ink-900/70">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-10 transition-all duration-500 group-hover:w-full"
                  style={{ background: accentHex[s.accent] }}
                />
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[11px] tracking-[0.14em]"
                    style={{ color: accentHex[s.accent] }}
                  >
                    {s.step}
                  </span>
                  <h3 className="display text-[1.35rem] text-bone-50">{s.title}</h3>
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
