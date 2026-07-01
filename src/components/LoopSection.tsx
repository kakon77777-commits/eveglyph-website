import { FolderGit2, Bot, GitCompare, UserRound } from 'lucide-react'
import { Reveal } from './Reveal'
import type { Copy } from '../i18n'

const ICONS = [FolderGit2, Bot, GitCompare, UserRound]

export function LoopSection({ copy }: { copy: Copy }) {
  return (
    <section id="loop" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{copy.loop.kicker}</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">{copy.loop.heading}</h2>
          <p className="mt-4 leading-relaxed text-muted">{copy.loop.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {copy.loop.nodes.map((n, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={i} delay={i * 0.08} className="relative">
                <div className="h-full rounded-xl border border-line bg-panel p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel-2/40 text-accent">
                      <Icon size={17} />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-mono text-base font-medium text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{n.desc}</p>
                </div>
                {i < copy.loop.nodes.length - 1 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent md:block">→</span>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
