import { ShieldCheck } from 'lucide-react'
import { Reveal } from './Reveal'
import type { Copy } from '../i18n'

export function Trust({ copy }: { copy: Copy }) {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-4xl rounded-2xl border border-line bg-panel/60 p-8 md:p-10">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{copy.trust.kicker}</p>
          <h2 className="font-mono text-2xl font-semibold tracking-tight text-ink">{copy.trust.heading}</h2>
        </div>
        <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
          {copy.trust.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
