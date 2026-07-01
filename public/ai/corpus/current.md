---
status: current
version: 0.4.0
canonical: true
audience: [ai, human]
last_updated: 2026-07-01
---

# EveGlyph Editor — Current State (v0.4.0)

This is the authoritative technical description of what EveGlyph Editor
v0.4.0 actually ships. It is intentionally calmer and more precise than
marketing copy. For a short citable version see
[./public-summary.md](./public-summary.md); for how it got here see
[./design-history.md](./design-history.md); for the problem it addresses see
[./origin.md](./origin.md).

## Status

**v0.4.0** — a **local prototype, pre-1.0**. Product code `EG-MD-2026`. Built
by Neo.K under EveMissLab (EVEMISS TECHNOLOGY CO., LTD. / 一言諾科技有限公司),
Taipei, Taiwan. Licensed under MIT.

## What it is

EveGlyph Editor is a local-first, agent-native Markdown editor and workspace.
It runs as a local dev server (`npm run dev`) and is used through a browser
at `http://localhost:5173`. It is the editor half of EveGlyph-MD, a
lightweight Markdown classification format.

## Editor

- **CodeMirror 6** for the editing surface, with Markdown syntax and built-in
  search & replace (`Ctrl+F`).
- **Live preview** built on `marked`, with KaTeX math rendering and `:::`
  callout blocks, sanitized with **DOMPurify** (default configuration —
  script/iframe/event-handler attributes stripped) before being shown.

## Workspace

- A **file tree**, **tabs**, and a **folder browser**. A workspace can be
  opened either through the browser's File System Access API (a folder
  picker) or through the local bridge using an absolute path.
- **Encoding-aware I/O** — a file's encoding is detected (`jschardet`) and
  preserved on save (`iconv-lite`: Big5 / GBK / Shift-JIS, and others). A
  per-file status-bar menu (for bridge-opened files) allows re-reading or
  converting; a Settings → Default encoding value is the fallback used when
  detection is uncertain, and the encoding applied to newly created files.

## AI providers

Three provider paths are supported: **Anthropic (Claude)**, **any
OpenAI-compatible endpoint**, and a **local CLI agent** (Claude Code, Codex,
or Gemini). The cloud providers never touch the local filesystem — only the
local-agent path edits files, and only on the machine where EveGlyph Editor
is running.

## PatchMD — diff-first agent review

Before a local agent runs, the workspace is git-snapshotted (a repo is
initialized if one does not already exist). The agent then runs with
auto-approve, confined to the one confirmed workspace folder. Afterward, a
real `git diff` is shown through a shared renderer (`src/diffview.js`, used
by both the agent panel and workspace replace-all): a unified diff grouped
into **per-file cards with +/− counts**, collapsible, and fully escaped since
it renders untrusted agent/git output. The human then chooses:

- **Accept** — commits the agent's changes (`agent: <message>`).
- **Reject** — `git reset --hard HEAD` plus `git clean -fd`, discarding all
  agent edits *and* untracked files. This is destructive to any uncommitted
  work in the workspace.

A live agent activity panel streams a transient "working…" view of the
agent's output tail while it runs, replaced by the diff view on completion.

## Permission tiers — real enforcement as of v0.4

Three tiers — **Cautious**, **Standard**, **Trusted** — flow from the
frontend to the bridge and map to actual CLI enforcement, not just prompt
text: Claude Code's `--permission-mode` plus a tool allow-list, Codex's
`--sandbox` levels (or bypass), and Gemini's `--approval-mode`. (Prior to
v0.4, these same three tiers only varied the text of the prompt sent to the
agent; see [design-history.md](./design-history.md).)

## EveGlyph-MD frontmatter

`src/frontmatter.js` implements a `type` / `status` / `tags` classification
layer on top of a document's YAML frontmatter, using a round-trip-safe
YAML-subset parser that edits the raw frontmatter block line-by-line so a
human's block scalars, nested maps, and comments survive untouched. A
status-bar chip and popover let a person set the class (and warn if a value
is out of the configured enum); the preview shows schema badges; new `.md`
files are stamped with a class at creation. The active document's class is
injected into the agent's context as fenced, enum-clamped, sanitized
metadata — treated strictly as data for the agent to read, never as
instructions for it to follow.

## Workspace memory (`.eveglyph/`)

A workspace-local, gitignored `.eveglyph/` directory can hold `rules.md`
(injected verbatim, with elevated authority, into every agent run — "follow
these before anything else"), `glossary.md`, and `memory/pitfalls.md` /
`memory/recent.md`. A context compiler (`src/context.js`) assembles these
into the prompt sent to the agent.

## Monitor tab

A back-stage **Monitor** tab (`src/monitorview.js`) tail-reads a local
diagnostic JSONL log, rendering color-coded rows (agent/git/file/ui/error)
with a substring filter and manual or automatic refresh.

## Architecture and the dev-only bridge

```
browser frontend  ⇄  vite-agent-bridge (/api)  ⇄  filesystem · git · CLI agent
```

The frontend is vanilla ES modules plus CodeMirror, with mutable state held
in a single `S` singleton (`src/`). The bridge (`vite-agent-bridge.js`) is a
**dev-only** Vite plugin declared `apply: 'serve'` — it exists only while
running `npm run dev`, is never part of a production build, and is never
publicly hosted or network-reachable. It exposes `/api/*` endpoints for
filesystem I/O, encoding detection, git diff-review, and agent spawning, and
every endpoint is gated to local requests only (Host/Origin must resolve to
localhost). These endpoints exist solely on the end user's own machine, for
the duration of their own local dev session — there is no hosted or public
`/api/*` surface for EveGlyph Editor anywhere.

## Pre-1.0 status

EveGlyph Editor is explicitly described by its own README as a **local
prototype, pre-1.0**. It is under active development, and the current
architecture (a browser frontend talking to a dev-only local bridge) is
expected to be reworked in a future desktop rewrite (see
[design-history.md](./design-history.md) for the roadmap note).

## See also

- [origin.md](./origin.md) — the problem this project addresses.
- [design-history.md](./design-history.md) — the v0.1 → v0.4 version lineage.
- [public-summary.md](./public-summary.md) — a short citable summary.
