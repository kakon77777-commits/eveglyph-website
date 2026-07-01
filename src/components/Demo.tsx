import { useEffect, useRef, useState } from 'react'
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import { Reveal } from './Reveal'
import { mdToHtml } from '../lib/preview'
import type { Copy } from '../i18n'

const INITIAL = `---
type: note
status: draft
tags: [demo, eveglyph-md]
---

# Try EveGlyph-MD

Type on the left — it renders on the right.

- **Math** via KaTeX: inline $e^{i\\pi} + 1 = 0$, or display:

$$\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}$$

::: note {title="Callouts render too"}
Frontmatter badges, math, and \`:::\` callouts — all sanitized.
:::

多語系：中文也正確渲染。
`

export function Demo({ copy }: { copy: Copy }) {
  const editorHost = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [src, setSrc] = useState(INITIAL)

  // Create the CodeMirror editor once (same stack as the product: basicSetup +
  // markdown + oneDark). Doc changes flow into React state to drive the preview.
  useEffect(() => {
    if (!editorHost.current) return
    const view = new EditorView({
      doc: INITIAL,
      parent: editorHost.current,
      extensions: [
        basicSetup,
        markdown(),
        oneDark,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': { height: '100%', backgroundColor: 'transparent', fontSize: '12.5px' },
          '.cm-scroller': { fontFamily: "'JetBrains Mono', monospace" },
          '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
          '&.cm-focused': { outline: 'none' },
        }),
        EditorView.updateListener.of(u => { if (u.docChanged) setSrc(u.state.doc.toString()) }),
      ],
    })
    return () => view.destroy()
  }, [])

  // Render preview HTML + KaTeX whenever the source changes.
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    el.innerHTML = mdToHtml(src)
    try {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      })
    } catch { /* ignore */ }
  }, [src])

  return (
    <section id="demo" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{copy.demo.kicker}</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight text-ink md:text-4xl">{copy.demo.heading}</h2>
          <p className="mt-4 leading-relaxed text-muted">{copy.demo.sub}</p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/40">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-line md:border-b-0 md:border-r">
              <div className="border-b border-line bg-panel-2/30 px-4 py-2 font-mono text-xs text-muted">{copy.demo.editorLabel}</div>
              <div ref={editorHost} className="demo-editor h-[420px] overflow-auto" />
            </div>
            <div>
              <div className="border-b border-line bg-panel-2/30 px-4 py-2 font-mono text-xs text-muted">{copy.demo.previewLabel}</div>
              <div ref={previewRef} className="preview h-[420px] overflow-auto px-6 py-5" />
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-muted">{copy.demo.note}</p>
      </div>
    </section>
  )
}
