import type { Copy } from '../i18n'

export function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2 font-mono font-medium text-ink">
            <span className="text-lg text-accent">⬡</span> EveGlyph<span className="text-muted">Editor</span>
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{copy.footer.tagline}</p>
          <p className="mt-5 font-mono text-xs text-muted/80">eveglypheditor.com</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{copy.footer.resources}</p>
          <ul className="mt-4 space-y-2.5">
            {copy.footer.links.map(l => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-ink/80 transition-colors hover:text-accent cursor-pointer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-line pt-6">
        <p className="text-xs leading-relaxed text-muted">{copy.footer.legal}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted/80">{copy.footer.patent}</p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted/70">
          <span>{copy.footer.madeBy}</span>
          <span className="text-line">·</span>
          <a
            href="/ai/"
            title={copy.footer.aiLayerTitle}
            className="text-accent underline decoration-dotted underline-offset-4 transition-colors hover:text-accent-dim cursor-pointer"
          >
            {copy.footer.aiLayer}
          </a>
        </p>
      </div>
    </footer>
  )
}
