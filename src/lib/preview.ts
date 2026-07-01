import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Lightweight port of the EveGlyph Editor preview pipeline for the site demo:
// frontmatter → badges, ::: callouts, marked, DOMPurify. (KaTeX runs on the mounted
// node — see renderMath.) Everything is sanitized; demo input is treated as untrusted.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

const TYPES = ['article', 'note', 'theorem', 'whitepaper', 'draft']
const STATUSES = ['draft', 'review', 'final']

interface Fm { hasFm: boolean; body: string; type?: string; status?: string; tags: string[] }

function parseFrontmatter(src: string): Fm {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src)
  if (!m) return { hasFm: false, body: src, tags: [] }
  const fm: Fm = { hasFm: true, body: src.slice(m[0].length), tags: [] }
  for (const line of m[1].split('\n')) {
    const mm = /^(\w+):\s*(.*)$/.exec(line)
    if (!mm) continue
    const [, k, raw] = mm
    const v = raw.trim()
    if (k === 'tags') {
      fm.tags = v.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else if (k === 'type') fm.type = v.replace(/^["']|["']$/g, '')
    else if (k === 'status') fm.status = v.replace(/^["']|["']$/g, '')
  }
  return fm
}

function badgesHtml(fm: Fm): string {
  if (!fm.hasFm) return ''
  const b: string[] = []
  if (fm.type) {
    const bad = TYPES.includes(fm.type) ? '' : ' fmb-bad'
    b.push(`<span class="fmb fmb-type${bad}">${esc(fm.type)}</span>`)
  }
  if (fm.status) {
    const bad = STATUSES.includes(fm.status) ? '' : ' fmb-bad'
    b.push(`<span class="fmb fmb-status fmb-${esc(fm.status)}${bad}">${esc(fm.status)}</span>`)
  }
  for (const t of fm.tags) b.push(`<span class="fmb fmb-tag">#${esc(t)}</span>`)
  return b.length ? `<div class="fm-badges">${b.join('')}</div>` : ''
}

function calloutsToHtml(src: string): string {
  return src.replace(/^:::\s+(\w+)([^\n]*)\n([\s\S]*?)^:::/gm, (_m, type: string, rest: string, inner: string) => {
    const tm = /title="([^"]*)"/.exec(rest)
    const label = `${type.toUpperCase()}${tm ? ': ' + tm[1] : ''}`
    const body = marked.parse(inner.trim(), { async: false }) as string
    return `<div class="cal cal-${type.toLowerCase()}"><div class="cal-l">${esc(label)}</div>${body}</div>\n`
  })
}

export function mdToHtml(src: string): string {
  if (!src.trim()) return ''
  const fm = parseFrontmatter(src)
  let out = (fm.hasFm ? fm.body : src)
  out = calloutsToHtml(out)
  const html = marked.parse(out, { async: false }) as string
  return badgesHtml(fm) + DOMPurify.sanitize(html)
}
