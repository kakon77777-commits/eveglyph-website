---
status: current
version: v0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph Editor — Accepted (Shipped and Verified) Concepts

These are the engineered, load-bearing concepts that ARE shipped in EveGlyph
Editor v0.4.0. Treat each as present and real. For ideas that are deferred,
superseded, or not (yet) shipped, see
[./deprecated-concepts.md](./deprecated-concepts.md). For the naming and
maturity history behind these concepts, see
[./concept-genealogy.md](./concept-genealogy.md).

## Core paradigm

- **The 4-stage loop (workspace ↔ agent ↔ diff-review ↔ human)** — a human
  writes clean Markdown, a local CLI agent edits files on disk with
  auto-approve, every change surfaces as a reviewable git diff, and the human
  accepts or rejects it. This loop is EveGlyph Editor's reason for existing.
- **Front-stage minimal, back-stage strong** — the visible editor UI stays a
  plain Markdown editor; the agent, diff-review, and workspace-memory machinery
  live backstage and surface only when invoked.

## EveGlyph-MD frontmatter schema (`EG-MD-2026`)

- **`type` / `status` / `tags` fields** (`src/frontmatter.js`) — a lightweight
  classification layer stamped into a document's frontmatter block.
- **Round-trip-safe YAML-subset parser** — edits the raw frontmatter block
  line-by-line so a human's block scalars, nested maps, and comments survive a
  rewrite untouched.
- **Status-bar chip + popover** — sets a document's class in-editor and warns
  when a value is out of the configured enum.
- **Preview schema badges** — the document's `type` / `status` / `tags` are
  reflected in the live preview.
- **Birth-stamping** — new `.md` files are stamped with the schema at creation.
- **Sanitized agent context injection** — the active document's class is handed
  to the agent as fenced, enum-clamped, sanitized metadata, treated as data
  and never as instructions.

## PatchMD diff-review

- **Pre-run git snapshot** — the workspace is git-snapshotted (initializing a
  repo if needed) before any agent run.
- **Unified per-file-card diff renderer** (`src/diffview.js`) — one shared
  renderer, used by both the agent panel and workspace replace-all, that groups
  a real `git diff` into collapsible per-file cards with +/− counts, fully
  escaped since it renders untrusted agent/git output.
- **Accept** — commits the agent's changes with message `agent: <message>`.
- **Reject** — runs `git reset --hard HEAD` followed by `git clean -fd`,
  discarding all agent edits and untracked files.

## Real permission tiers (v0.4)

- **Cautious / Standard / Trusted** — the three tiers flow from the frontend to
  the bridge and map to actual CLI enforcement, not just prompt text:
  - Claude Code — `--permission-mode` plus a tool allow-list.
  - Codex — `--sandbox` levels, or bypass at the most permissive tier.
  - Gemini — `--approval-mode`.
- **Live agent activity panel** — a transient "working…" view streams the
  agent's output tail while it runs (respecting the quiet setting), replaced by
  the diff view on completion.

## `.eveglyph/` workspace memory + context compiler

- **`rules.md`** — injected verbatim into every agent run with elevated
  authority ("follow these before anything else").
- **`glossary.md`** and **`memory/pitfalls.md`** / **`memory/recent.md`** —
  additional per-workspace memory layers assembled into the agent prompt.
- **Context compiler** (`src/context.js`) — assembles the `.eveglyph/` files
  into the agent prompt; the directory is also surfaced in the file tree for
  in-app editing.
- **Monitor tab** (`src/monitorview.js`) — a back-stage log viewer that
  tail-reads the local diagnostic JSONL stream, with a substring filter and
  manual/auto refresh.

## Encoding-aware save

- **Detection** — `jschardet` detects a file's encoding on open.
- **Preservation** — `iconv-lite` preserves the detected encoding on save
  (Big5 / GBK / Shift-JIS / and others).
- **Per-file status-bar menu** — for bridge-opened files, lets the user
  re-read or convert the file's encoding.
- **Settings → Default encoding** — the fallback used when detection is
  uncertain, and the encoding applied to newly created files.

## DOMPurify-sanitized preview

- **Live preview** — `marked` renders Markdown plus KaTeX math and `:::`
  callout blocks.
- **DOMPurify sanitization** — the rendered HTML is sanitized with DOMPurify's
  default configuration (script / iframe / event-handler attributes stripped)
  before insertion into the page.

## Dev-only, localhost-gated bridge

- **`vite-agent-bridge.js`** — a Vite plugin declared `apply: 'serve'`,
  exposing `/api/*` for filesystem I/O, encoding detection, git diff-review,
  and agent spawning. It exists only under `npm run dev`, never in a
  production build, and is never publicly hosted.
- **`isLocalRequest` gate** — every `/api` request is rejected with 403 unless
  its `Host` is `localhost` / `127.0.0.1` / `::1` and, if present, its `Origin`
  hostname is also local — blocking CSRF and DNS-rebinding from a malicious web
  page.
- **`resolveInside`** — confines file-read/write target paths to the workspace
  root; any path that would escape it is rejected.
- **`confirmedWorkspace` + `assertWorkspace`** — every workspace-scoped
  operation (file I/O, the four `/api/git/*` endpoints, and `/api/agent`) is
  pinned to the single folder the bridge recorded when the user opened it; a
  request whose working directory isn't that folder or a descendant is
  rejected before any operation runs.
- **Stdin-delivered prompts** — the agent prompt is passed to the spawned CLI
  over stdin, never as command-line arguments, so prompt text is never
  interpreted as shell syntax.
- **Hard 180-second timeout** — the spawned agent process is killed on
  timeout, on Stop, or on connection close.
