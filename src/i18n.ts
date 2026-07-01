import { useEffect, useState } from 'react'

export type Lang = 'en' | 'zh'

const ZH_REGIONS = new Set(['TW', 'HK', 'MO', 'CN', 'SG'])
const LS_KEY = 'eveglyph_lang'

function guessFromNavigator(): Lang {
  const l = (navigator.language || 'en').toLowerCase()
  return l.startsWith('zh') ? 'zh' : 'en'
}

// IP-based default (Cloudflare /cdn-cgi/trace → loc=XX). Works in production behind
// Cloudflare; on local dev it 404s and we keep the navigator-language guess. A manual
// choice (localStorage) always wins and skips this.
async function detectByIp(): Promise<Lang | null> {
  try {
    const r = await fetch('/cdn-cgi/trace', { cache: 'no-store' })
    if (!r.ok) return null
    const txt = await r.text()
    const loc = /(?:^|\n)loc=([A-Z]{2})/.exec(txt)?.[1]
    if (!loc) return null
    return ZH_REGIONS.has(loc) ? 'zh' : 'en'
  } catch {
    return null
  }
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Lang | null
      if (saved === 'en' || saved === 'zh') return saved
    } catch { /* ignore */ }
    return guessFromNavigator()
  })

  // Refine by IP once, only when the user hasn't made a manual choice.
  useEffect(() => {
    let alive = true
    try { if (localStorage.getItem(LS_KEY)) return } catch { /* ignore */ }
    detectByIp().then(l => { if (alive && l) setLangState(l) })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en'
  }, [lang])

  const setLang = (l: Lang) => {
    try { localStorage.setItem(LS_KEY, l) } catch { /* ignore */ }
    setLangState(l)
  }

  return [lang, setLang]
}

type Node = { title: string; desc: string }
type Card = { title: string; desc: string }

export interface Copy {
  nav: { features: string; loop: string; demo: string; quickstart: string; github: string; star: string }
  hero: {
    badge: string
    titleLines: string[]
    accentWord: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    peek: string
  }
  loop: { kicker: string; heading: string; sub: string; nodes: Node[] }
  demo: { kicker: string; heading: string; sub: string; editorLabel: string; previewLabel: string; note: string }
  pillars: { kicker: string; heading: string; sub: string; cards: Card[] }
  quickstart: { kicker: string; heading: string; sub: string; steps: { cmd: string; note: string }[]; copy: string; copied: string }
  trust: { kicker: string; heading: string; items: string[] }
  footer: { tagline: string; product: string; resources: string; links: { label: string; href: string }[]; legal: string; patent: string; madeBy: string; aiLayer: string; aiLayerTitle: string }
}

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: { features: 'Features', loop: 'The loop', demo: 'Demo', quickstart: 'Quick start', github: 'GitHub', star: 'Star' },
    hero: {
      badge: 'Open source · MIT · pre-1.0',
      titleLines: ['Write Markdown.', 'Agents edit.', 'You review the diff.'],
      accentWord: 'diff',
      subtitle: 'A local-first, agent-native Markdown workspace. You write clean Markdown, local CLI agents edit files on disk, and every change lands as a reviewable git diff you accept or reject.',
      ctaPrimary: 'Get started',
      ctaSecondary: 'View on GitHub',
      peek: 'examples/welcome.md',
    },
    loop: {
      kicker: 'The core idea',
      heading: 'A loop you stay in control of',
      sub: 'Front stage minimal, back stage strong. The human writes; the agent edits on disk; git captures every change; you review and decide.',
      nodes: [
        { title: 'Workspace', desc: 'Your folder of clean Markdown — opened locally, never uploaded.' },
        { title: 'Agent', desc: 'A local CLI agent (Claude Code / Codex / Gemini) edits files on disk under rules you set.' },
        { title: 'Diff-review', desc: 'Every change is git-snapshotted and shown as a per-file diff. Accept or reject.' },
        { title: 'Human', desc: 'You decide what lands. Nothing is silently applied.' },
      ],
    },
    demo: {
      kicker: 'Try it',
      heading: 'Editor + live preview',
      sub: 'Type EveGlyph-MD on the left, see it render on the right — frontmatter badges, math, and callouts, sanitized.',
      editorLabel: 'EveGlyph-MD',
      previewLabel: 'Preview',
      note: 'This is the editor + preview. The full workspace ↔ agent ↔ diff-review loop runs against your local files — clone the repo to use it.',
    },
    pillars: {
      kicker: 'What makes it different',
      heading: 'Built around review, not autocomplete',
      sub: 'Four things EveGlyph Editor takes seriously.',
      cards: [
        { title: 'Diff-first review', desc: 'Agent changes surface as per-file cards with +/− counts. Accept commits; reject reverts. No silent edits.' },
        { title: 'Real permission tiers', desc: 'Cautious / Standard / Trusted map to actual CLI enforcement — tool allow-lists and sandbox levels, not just a prompt.' },
        { title: 'Local-first CLI agents', desc: 'Claude Code, Codex, or Gemini run on your machine against your files. Cloud providers never touch your disk.' },
        { title: 'EveGlyph-MD format', desc: 'A lightweight type / status / tags layer — semantic classification handed to the agent as data, never instructions.' },
      ],
    },
    quickstart: {
      kicker: 'Run it locally',
      heading: 'Up in three commands',
      sub: 'Node 18+. The dev server binds to localhost only.',
      steps: [
        { cmd: 'git clone https://github.com/kakon77777-commits/eveglyph-editor', note: 'Clone the repo' },
        { cmd: 'npm install && npm run dev', note: 'Install and start the dev server' },
        { cmd: '# Open Folder → examples/', note: 'Open the bundled example workspace' },
      ],
      copy: 'Copy',
      copied: 'Copied',
    },
    trust: {
      kicker: 'Honest by design',
      heading: 'You stay in control',
      items: [
        'Dev-only, localhost-gated bridge — no LAN exposure by default',
        'Git snapshot + diff review on every agent run',
        'Local-agent mode runs with auto-approve — read SECURITY.md first',
        'MIT licensed · your files and API keys never leave your machine',
      ],
    },
    footer: {
      tagline: 'A local-first, agent-native Markdown workspace.',
      product: 'Product',
      resources: 'Resources',
      links: [
        { label: 'GitHub', href: 'https://github.com/kakon77777-commits/eveglyph-editor' },
        { label: 'SECURITY.md', href: 'https://github.com/kakon77777-commits/eveglyph-editor/blob/main/SECURITY.md' },
        { label: 'Releases', href: 'https://github.com/kakon77777-commits/eveglyph-editor/releases' },
        { label: 'License (MIT)', href: 'https://github.com/kakon77777-commits/eveglyph-editor/blob/main/LICENSE' },
      ],
      legal: 'EVEMISS TECHNOLOGY CO., LTD. (一言諾科技有限公司)',
      patent: 'Open-sourced under MIT. Patent rights reserved on future advanced modules.',
      madeBy: 'Built by Neo.K under EveMissLab.',
      aiLayer: '/ai/ — for agents & models',
      aiLayerTitle: 'AI Ingestion & Capability Layer — machine-readable corpus + rights',
    },
  },
  zh: {
    nav: { features: '特色', loop: '迴路', demo: '展示', quickstart: '快速開始', github: 'GitHub', star: 'Star' },
    hero: {
      badge: '開源 · MIT · pre-1.0',
      titleLines: ['你寫一次 Markdown，', 'agent 動手改，', '之後審 diff 即拍板。'],
      accentWord: 'diff',
      subtitle: '一個本地優先、agent-native 的 Markdown 工作台。你寫乾淨的 Markdown，本機 CLI agent 直接改磁碟上的檔案，而每一次改動都化為一份可審閱的 git diff——由你接受或拒絕。',
      ctaPrimary: '開始使用',
      ctaSecondary: '上 GitHub 看',
      peek: 'examples/welcome.md',
    },
    loop: {
      kicker: '核心理念',
      heading: '一條由你掌控的迴路',
      sub: '前台極簡，後台強悍。人類書寫；agent 改磁碟；git 留下每一筆變更；由你審閱、由你決定。',
      nodes: [
        { title: 'Workspace 工作區', desc: '你那一整個乾淨 Markdown 資料夾——在本機開啟，絕不上傳。' },
        { title: 'Agent 代理', desc: '本機 CLI agent（Claude Code／Codex／Gemini）依你設的規則，直接編輯磁碟上的檔案。' },
        { title: 'Diff 審閱', desc: '每次改動都先 git 快照，再以「逐檔 diff」呈現。接受或拒絕，一鍵決定。' },
        { title: 'Human 人類', desc: '什麼能落地，由你說了算。沒有任何東西會被默默套用。' },
      ],
    },
    demo: {
      kicker: '動手玩',
      heading: '編輯器 ＋ 即時預覽',
      sub: '在左邊敲 EveGlyph-MD，右邊即時渲染——frontmatter 徽章、數學式、callout，全程消毒。',
      editorLabel: 'EveGlyph-MD',
      previewLabel: '預覽',
      note: '這是「編輯器＋預覽」。完整的 workspace ↔ agent ↔ diff 審閱迴路會跑在你本機的檔案上——clone 專案即可使用。',
    },
    pillars: {
      kicker: '與眾不同之處',
      heading: '為「審閱」而生，不是為自動補全',
      sub: 'EveGlyph Editor 認真對待的四件事。',
      cards: [
        { title: 'Diff 優先審閱', desc: 'agent 的改動以「逐檔卡片＋增刪計數」呈現。接受即 commit，拒絕即還原。沒有偷偷改檔。' },
        { title: '真正的權限分層', desc: 'Cautious／Standard／Trusted 對應到實際的 CLI 強制——工具白名單與沙箱層級，不只是一句 prompt。' },
        { title: '本地優先的 CLI agent', desc: 'Claude Code、Codex 或 Gemini 都在你的機器上、對你的檔案執行。雲端供應商永遠碰不到你的磁碟。' },
        { title: 'EveGlyph-MD 格式', desc: '輕量的 type／status／tags 分類層——語義分類以「資料」交給 agent，絕不當成指令。' },
      ],
    },
    quickstart: {
      kicker: '在本機跑起來',
      heading: '三行指令就上手',
      sub: '需要 Node 18+。dev server 只綁定 localhost。',
      steps: [
        { cmd: 'git clone https://github.com/kakon77777-commits/eveglyph-editor', note: 'Clone 專案' },
        { cmd: 'npm install && npm run dev', note: '安裝並啟動 dev server' },
        { cmd: '# Open Folder → examples/', note: '開啟附帶的範例工作區' },
      ],
      copy: '複製',
      copied: '已複製',
    },
    trust: {
      kicker: '誠實的設計',
      heading: '主控權永遠在你手上',
      items: [
        '僅開發用、限 localhost 的橋接——預設不對區網曝露',
        '每次 agent 執行都先 git 快照、再做 diff 審閱',
        '本機 agent 模式以 auto-approve 執行——請先讀 SECURITY.md',
        'MIT 授權 · 你的檔案與 API 金鑰永不離開你的機器',
      ],
    },
    footer: {
      tagline: '一個本地優先、agent-native 的 Markdown 工作台。',
      product: '產品',
      resources: '資源',
      links: [
        { label: 'GitHub', href: 'https://github.com/kakon77777-commits/eveglyph-editor' },
        { label: 'SECURITY.md', href: 'https://github.com/kakon77777-commits/eveglyph-editor/blob/main/SECURITY.md' },
        { label: '版本發布', href: 'https://github.com/kakon77777-commits/eveglyph-editor/releases' },
        { label: '授權 (MIT)', href: 'https://github.com/kakon77777-commits/eveglyph-editor/blob/main/LICENSE' },
      ],
      legal: 'EVEMISS TECHNOLOGY CO., LTD.（一言諾科技有限公司）',
      patent: '本專案以 MIT 開源；未來進階模組之專利權利保留。',
      madeBy: '由 Neo.K 於 EveMissLab 打造。',
      aiLayer: '/ai/ — 給 agent 與模型',
      aiLayerTitle: 'AI 攝取與能力層——機器可讀語料與 AI 學習權利聲明',
    },
  },
}
