import { mapBranches } from '../data/structures'
import { accentHex, accentText } from '../lib/accents'
import { Reveal, SectionHeading } from './ui'

export default function ResearchMap() {
  return (
    <section id="map" className="relative z-10 scroll-mt-20 py-20 sm:py-24" aria-labelledby="map-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="02"
            label="Domains"
            title={<span id="map-title">My research map</span>}
            lead="Four directions, one question underneath all of them: what can a machine learn about a living system from the signals it emits?"
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 grid gap-px bg-paper-line sm:grid-cols-2">
            {mapBranches.map((b) => (
              <div key={b.id} className="bg-paper-card p-5">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: accentHex[b.accent] }}
                  />
                  <h3 className="text-[15px] text-ink-900">{b.label}</h3>
                </div>
                <p className="prose-sci mt-2 text-[13px]">{b.blurb}</p>
                <ul className="mt-4 space-y-2.5">
                  {b.children.map((c) => (
                    <li key={c.id}>
                      <p className={`text-[10.5px] uppercase tracking-wide ${accentText[b.accent]}`}>
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-ink-700">{c.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
