import { useState } from 'react'
import { Copy as CopyIcon, Check } from 'lucide-react'
import { Reveal } from './Reveal'
import type { Copy } from '../i18n'

export function QuickStart({ copy }: { copy: Copy }) {
  const [copied, setCopied] = useState<number | null>(null)

  const doCopy = (text: string, i: number) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(i)
      setTimeout(() => setCopied(c => (c === i ? null : c)), 1500)
    }).catch(() => {})
  }

  return (
    <section id="quickstart" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{copy.quickstart.kicker}</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">{copy.quickstart.heading}</h2>
          <p className="mt-4 leading-relaxed text-muted">{copy.quickstart.sub}</p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-xl border border-line bg-panel">
          <div className="flex items-center gap-2 border-b border-line bg-panel-2/30 px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-1 font-mono text-xs text-muted">bash</span>
          </div>
          <div className="divide-y divide-line">
            {copy.quickstart.steps.map((s, i) => (
              <div key={i} className="group flex items-start gap-3 px-4 py-3.5">
                <span className="select-none pt-0.5 font-mono text-sm text-accent">$</span>
                <div className="min-w-0 flex-1">
                  <code className="block break-all font-mono text-[13px] text-ink">{s.cmd}</code>
                  <span className="mt-1 block font-mono text-[11px] text-muted">{s.note}</span>
                </div>
                <button
                  onClick={() => doCopy(s.cmd, i)}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:text-ink cursor-pointer"
                  aria-label={copy.quickstart.copy}
                >
                  {copied === i ? <Check size={12} className="text-accent" /> : <CopyIcon size={12} />}
                  {copied === i ? copy.quickstart.copied : copy.quickstart.copy}
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
