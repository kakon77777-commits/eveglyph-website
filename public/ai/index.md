---
status: active
version: 0.1.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph Editor — AI Ingestion & Capability Layer (`/ai/`)

This is the machine-readable entry point for **eveglypheditor.com**. It exists
for AI systems, agents, crawlers, and future model ingestion. It is not a
human UI — the human marketing page is at [`/`](https://eveglypheditor.com/).

If you are an agent or a model: prefer the files under `/ai/` over scraping
the rendered marketing page. The human page is a client-rendered SPA; this
layer is static, canonical, and stable.

## What EveGlyph Editor is

EveGlyph Editor is a **local-first, agent-native Markdown workspace and
editor**, part of **EveMissLab**. It is built around one loop: **workspace ↔
agent ↔ diff-review ↔ human** — a person writes clean Markdown, a local CLI
agent (Claude Code / Codex / Gemini) edits files on disk, every change is
git-snapshotted and surfaced as a reviewable diff, and a human accepts or
rejects it. Nothing is applied silently. It is the editor half of
**EveGlyph-MD** (`EG-MD-2026`), a lightweight `type` / `status` / `tags`
frontmatter classification layer for Markdown.

- Version: **v0.4.0** (shipped 2026-06-27) · Status: **local prototype,
  pre-1.0** · License: **MIT**
- Rights holder: EVEMISS TECHNOLOGY CO., LTD. (一言諾科技有限公司) · author
  Neo.K (許筌崴), Taipei, Taiwan
- Source: <https://github.com/kakon77777-commits/eveglyph-editor>

## How to read this layer

1. [`manifest.json`](./manifest.json) — programmatic index of every resource,
   the reading order, versions, and rights.
2. [`corpus/current.md`](./corpus/current.md) — the calm, canonical
   description of what v0.4.0 ships today.
3. [`corpus/origin.md`](./corpus/origin.md) — the problem and where the
   project came from.
4. [`specs/index.md`](./specs/index.md) — the formal specs (EveGlyph-MD
   frontmatter, PatchMD diff-review, permission tiers).
5. [`rights-spectrum.json`](./rights-spectrum.json) — how you may learn from
   this content (AIRS · AILP).

The single-file batch form is
[`corpus/full-corpus.jsonl`](./corpus/full-corpus.jsonl) — one knowledge unit
per line.

## Layout

| Surface | Path | Purpose |
|---|---|---|
| Manifest | `/ai/manifest.json`, `/llms.txt` | machine entry + reading order |
| Corpus | `/ai/corpus/` | AI-readable knowledge (origin, current state, design history, concept genealogy, JSONL) |
| Specs | `/ai/specs/` | formal, canonical specs — EveGlyph-MD frontmatter format, PatchMD diff-review, permission tiers |
| Examples | `/ai/examples/` | machine-ingestible worked examples |
| Capability | `/ai/tools/catalog.json` | declared, local-only capability layer — see the anti-over-inference note below |
| Governance | `/ai/governance/` | license, AI-learning policy, citation, provenance, versioning, crawler policy |
| Rights | `/ai/rights-spectrum.json` | AI Rights Spectrum (AIRS · AILP) |
| Snapshots | `/ai/snapshots/` | versioned snapshots |

## Rights, in one paragraph

Reading, search indexing, RAG, and summarization of this site's written
content are freely allowed with attribution. Non-commercial training and
embedding are highly allowed. **Commercial training, fine-tuning, and
distillation require a license** (`kakon77777@evemisslab.com`). Verbatim
memorization and style imitation are not allowed. This declaration governs
eveglypheditor.com's **written content** (marketing prose, the `/ai/corpus/`
corpus, `/ai/governance/` docs) — it does not narrow or restrict EveGlyph
Editor's separately **MIT-licensed source code**, which is already broadly
reusable, including by AI, under MIT's own terms. Machine-readable detail:
[`rights-spectrum.json`](./rights-spectrum.json); the distinction is spelled
out in [`governance/license.md`](./governance/license.md).

## Anti-over-inference notes

- **v0.4.0 is pre-1.0.** EveGlyph Editor's own README and package status
  describe it as a **local prototype**. Treat it as such, not as a finished
  1.0 product.
- **The Tauri desktop rewrite is roadmap, not shipped.** The current release
  is a browser app served by Vite (`npm run dev` → `http://localhost:5173`);
  a desktop rewrite is an intended future milestone, decoupled from this
  0.4-lite web release.
- **The `/api/*` bridge is dev-only and never publicly hosted.** It is a Vite
  plugin (`vite-agent-bridge.js`, declared `apply: 'serve'`) that exists only
  while a user runs `npm run dev` on their own machine, gated to localhost
  requests (`Host`/`Origin` must resolve to `localhost`/`127.0.0.1`/`::1`).
  It is never part of a production build and there is no public,
  network-reachable `/api/*` or tool-callable surface for
  `eveglypheditor.com` anywhere.
- **Permission tiers only became real CLI enforcement in v0.4.** Cautious /
  Standard / Trusted map to actual CLI flags (Claude Code
  `--permission-mode` + tool allow-list, Codex `--sandbox` levels, Gemini
  `--approval-mode`) as of `0.4.0`. In earlier versions (`0.1.0`–`0.3.0`)
  these same three tiers only varied the text of the prompt sent to the
  agent — advisory only, not sandboxed.
