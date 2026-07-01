import { GitCompare, ShieldCheck, Terminal, FileCode2 } from 'lucide-react'
import { Reveal } from './Reveal'
import type { Copy } from '../i18n'

const ICONS = [GitCompare, ShieldCheck, Terminal, FileCode2]

export function Pillars({ copy }: { copy: Copy }) {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{copy.pillars.kicker}</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">{copy.pillars.heading}</h2>
          <p className="mt-4 leading-relaxed text-muted">{copy.pillars.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {copy.pillars.cards.map((c, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <div className="group h-full rounded-xl border border-line bg-panel p-6 transition-colors hover:border-accent/40">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-panel-2/40 text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-mono text-lg font-medium text-ink">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
