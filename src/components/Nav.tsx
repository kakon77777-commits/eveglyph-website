import { Github } from 'lucide-react'
import type { Lang, Copy } from '../i18n'

const GH = 'https://github.com/kakon77777-commits/eveglyph-editor'

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-lg border border-line overflow-hidden text-xs font-mono">
      {(['en', 'zh'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 cursor-pointer transition-colors ${lang === l ? 'bg-panel-2 text-ink' : 'text-muted hover:text-ink'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function Nav({ copy, lang, setLang }: { copy: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="fixed top-3 inset-x-3 z-50">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 rounded-xl border border-line bg-panel/70 px-4 py-2.5 backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2 font-mono font-medium text-ink">
          <span className="text-lg leading-none text-accent">⬡</span>
          EveGlyph<span className="text-muted">Editor</span>
        </a>
        <div className="ml-2 hidden items-center gap-5 text-sm text-muted md:flex">
          <a href="#loop" className="transition-colors hover:text-ink">{copy.nav.loop}</a>
          <a href="#demo" className="transition-colors hover:text-ink">{copy.nav.demo}</a>
          <a href="#features" className="transition-colors hover:text-ink">{copy.nav.features}</a>
          <a href="#quickstart" className="transition-colors hover:text-ink">{copy.nav.quickstart}</a>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LangToggle lang={lang} setLang={setLang} />
          <a
            href={GH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-dim cursor-pointer"
          >
            <Github size={15} /> {copy.nav.star}
          </a>
        </div>
      </nav>
    </header>
  )
}
