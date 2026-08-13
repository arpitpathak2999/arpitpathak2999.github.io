import { progression, timeline } from '../data/structures'
import { accentHex, accentText } from '../lib/accents'
import { Reveal, SectionHeading } from './ui'

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative z-10 scroll-mt-20 py-20 sm:py-24"
      aria-labelledby="timeline-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="06"
            label="Trajectory"
            title={<span id="timeline-title">Research timeline</span>}
            lead="Signal processing first, then learning, then biology. Each step kept the previous one — that accumulation is the point."
          />
        </Reveal>

        {/* progression rail */}
        <Reveal delay={60}>
          <ol
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-y border-white/[0.08] py-4"
            aria-label="Skill progression"
          >
            {progression.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{
                    color: `hsl(${168 + i * 12} 62% ${72 - i * 2}%)`,
                  }}
                >
                  {s}
                </span>
                {i < progression.length - 1 && (
                  <span aria-hidden className="font-mono text-[10px] text-bone-400">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* entries */}
        <ol className="mt-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} as="li" delay={i * 70}>
              <div className="relative grid gap-4 border-b border-white/[0.08] py-8 sm:grid-cols-[112px_1fr] sm:gap-8">
                {/* year + spine */}
                <div className="relative">
                  <p
                    className={`display text-[2.4rem] leading-none ${accentText[t.accent]}`}
                    style={{ color: accentHex[t.accent] }}
                  >
                    {t.year}
                  </p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.13em] text-bone-400">
                    {t.org}
                  </p>
                </div>

                <div>
                  <h3 className="text-[17px] leading-snug text-bone-50 sm:text-[18px]">{t.title}</h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-400">
                    {t.stage}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13px] leading-snug text-bone-300">
                        <span
                          aria-hidden
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: accentHex[t.accent] }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
