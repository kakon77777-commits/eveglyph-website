import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowRight, Github } from 'lucide-react'
import type { Copy } from '../i18n'

const GH = 'https://github.com/kakon77777-commits/eveglyph-editor'

function AccentLine({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent)
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  )
}

export function Hero({ copy }: { copy: Copy }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.h-badge', { opacity: 0, y: 14, duration: 0.5 })
      .from('.h-line', { opacity: 0, y: 26, duration: 0.6, stagger: 0.12 }, '-=0.2')
      .from('.h-sub', { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
      .from('.h-cta', { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .from('.h-ribbon', { opacity: 0, y: 14, duration: 0.5 }, '-=0.2')
      .from('.h-show', { opacity: 0, y: 36, duration: 0.9 }, '-=0.3')
  }, { scope: root })

  return (
    <section id="top" ref={root} className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40">
      {/* hex dot motif */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #1c2a3f 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 35%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 35%, #000 30%, transparent 75%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="h-badge inline-block rounded-full border border-line bg-panel/60 px-3 py-1 font-mono text-xs text-muted">
          {copy.hero.badge}
        </span>
        <h1 className="mt-6 font-mono text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl md:text-6xl">
          {copy.hero.titleLines.map((line, i) => (
            <span key={i} className="h-line block">
              <AccentLine text={line} accent={copy.hero.accentWord} />
            </span>
          ))}
        </h1>
        <p className="h-sub mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">{copy.hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#quickstart"
            className="h-cta inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium text-canvas transition-colors hover:bg-accent-dim cursor-pointer"
          >
            {copy.hero.ctaPrimary} <ArrowRight size={17} />
          </a>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer"
            className="h-cta inline-flex items-center gap-2 rounded-lg border border-line bg-panel/50 px-5 py-2.5 font-medium text-ink transition-colors hover:bg-panel cursor-pointer"
          >
            <Github size={17} /> {copy.hero.ctaSecondary}
          </a>
        </div>

        {/* compact loop ribbon */}
        <div className="h-ribbon mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-muted">
          {copy.loop.nodes.map((n, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="rounded-md border border-line bg-panel/50 px-2.5 py-1 text-ink/80">{n.title.split(' ')[0]}</span>
              {i < copy.loop.nodes.length - 1 && <span className="text-accent">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* showcase: editor peek + diff-review mini card */}
      <div className="h-show relative mx-auto mt-14 max-w-3xl">
        <EditorPeek file={copy.hero.peek} />
        <DiffMini />
      </div>
    </section>
  )
}

function WinDots() {
  return (
    <span className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </span>
  )
}

function EditorPeek({ file }: { file: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-line bg-panel-2/40 px-4 py-2.5">
        <WinDots />
        <span className="font-mono text-xs text-muted">{file}</span>
        <span className="ml-auto flex gap-1.5">
          <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-accent">article</span>
          <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-[#7dd3fc]">final</span>
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
        <code>
          <span className="text-muted">---</span>{'\n'}
          <span className="text-[#7dd3fc]">type</span><span className="text-muted">: </span><span className="text-ink">article</span>{'\n'}
          <span className="text-[#7dd3fc]">status</span><span className="text-muted">: </span><span className="text-ink">final</span>{'\n'}
          <span className="text-muted">---</span>{'\n'}
          {'\n'}
          <span className="text-accent"># </span><span className="text-ink">Welcome to EveGlyph Editor</span>{'\n'}
          {'\n'}
          <span className="text-ink/80">You write clean Markdown; local agents edit on</span>{'\n'}
          <span className="text-ink/80">disk; every change lands as a reviewable </span><span className="text-accent">diff</span><span className="text-ink/80">.</span>{'\n'}
          {'\n'}
          <span className="text-muted">::: note </span><span className="text-ink/60">{'{title="Try the loop"}'}</span>{'\n'}
          <span className="text-ink/80">Point a local agent at this folder…</span>{'\n'}
          <span className="text-muted">:::</span>
        </code>
      </pre>
    </div>
  )
}

function DiffMini() {
  return (
    <div className="absolute -bottom-8 -right-2 w-56 rotate-1 overflow-hidden rounded-lg border border-line bg-panel shadow-xl shadow-black/50 md:-right-10 md:w-64">
      <div className="flex items-center justify-between border-b border-line bg-panel-2/50 px-3 py-1.5">
        <span className="font-mono text-[11px] text-ink/80">notes/foo.md</span>
        <span className="font-mono text-[10px]">
          <span className="text-[#86efac]">+2</span> <span className="text-[#fca5a5]">−1</span>
        </span>
      </div>
      <pre className="p-2.5 font-mono text-[10.5px] leading-snug">
        <span className="block text-[#7dd3fc]">@@ -1,3 +1,4 @@</span>
        <span className="block bg-[#fca5a5]/10 text-[#fca5a5]">- old line</span>
        <span className="block bg-[#86efac]/10 text-[#86efac]">+ tightened prose</span>
        <span className="block bg-[#86efac]/10 text-[#86efac]">+ fixed heading</span>
      </pre>
      <div className="flex gap-1.5 border-t border-line p-2">
        <span className="rounded bg-accent px-2 py-1 font-mono text-[10px] text-canvas">✓ Accept</span>
        <span className="rounded border border-line px-2 py-1 font-mono text-[10px] text-[#fca5a5]">✗ Reject</span>
      </div>
    </div>
  )
}
