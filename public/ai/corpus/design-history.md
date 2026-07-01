---
status: current
version: 0.4.0
canonical: true
audience: [ai, human]
last_updated: 2026-07-01
---

# Design History

The verified version lineage of EveGlyph Editor across four shipped
milestones: v0.1, v0.2, v0.3, v0.4. Nothing here describes work that has not
actually shipped; the pending Tauri desktop rewrite is called out separately
as roadmap, not as current state.

## v0.1 — prototype

The initial build: the editor core (CodeMirror 6 + `marked` + KaTeX), a file
tree and tabs, a Settings panel, the local-agent bridge (with Claude Code /
Codex / Gemini support), AI presets, and agent detection.

## Internal rename — 2026-06-25

Before the public release, the project was internally renamed from an
earlier codename — **Noema/Noesis Studio**, with the bridge/package
internally code-named **`cogniflow`** — to **EveGlyph Editor**, and its
document format was named **EveGlyph-MD**. The rename is complete on disk;
`cogniflow` → `eveglyph` is finished in code, with only stale documentation
text having referenced the old name at the time.

## v0.2 — open-source cleanup (shipped, `0.2.0`)

The hardening pass that made the project ready to publish:

- **DOMPurify** XSS guard on the preview.
- Origin/CSRF guard (the `isLocalRequest` gate on the bridge).
- Monitor log rotation.
- Encoding support — detection plus a per-file menu, and a Settings default
  as a soft fallback.
- The internal `cogniflow` → `eveglyph` rename.
- **PatchMD** git diff-review (the first version of the diff-based
  accept/reject flow).
- In-file find/replace.
- README and SECURITY.md written and fact-checked.

## v0.3 — agent-native workspace (shipped, `0.3.0`)

The milestone PROGRESS.md calls "the main line" — the release that made the
workspace itself agent-aware:

- **`.eveglyph/` workspace memory + context compiler** (`src/context.js`) —
  injecting `rules.md`, `glossary.md`, `memory/pitfalls.md`, and
  `memory/recent.md` into every agent run, editable in-app via the file tree.
- **Agent modes** — Suggest (advise only), Patch (edit plus diff-review,
  the default), and Direct (apply plus one-click revert).
- **8 presets** — clean, academic-expand, preserve-voice, fix-katex,
  normalize-headings, extract-whitepaper, plus workspace-scoped
  generate-changelog and workspace-audit presets, and an import-fix preset.
- **Workspace search** (`src/search.js`) — exact string/regex, case and
  whole-word options, current-file or workspace scope, with a results list
  and click-to-jump. Explicitly a human-owned navigator, not an AI feature.
- **Workspace replace** — in-file replace is `Ctrl+Z`-undoable; workspace-wide
  replace goes through a git snapshot, diff, and revert, with a confirmation
  step, a regex warning, and per-file failure tracking.
- **Config layer** (`src/config.js`) as the system's explicit contract for
  every configurable variable and its default.
- **Settings UI** — light/dark theme, editor font size and family, memory
  master and per-layer toggles, agent permission, run timeout, and
  show-raw-output.
- **Agent permission tiers introduced** — Cautious / Standard / Trusted — but
  at this stage they were **advisory only**: they changed the wording of a
  capability clause added to the agent's prompt, and "Trusted" only skipped a
  re-confirmation step. They did not yet change what the underlying CLI was
  actually allowed to do.
- **DOCX → MD import** (`src/import.js`) via `mammoth` and `turndown`, with a
  three-stage workflow: import, then a rules cleanup pass, then an optional
  AI preset.
- **Print/PDF output** via `@media print` and `window.print()`.
- **EveGlyph-MD frontmatter schema** (`src/frontmatter.js`) — `type` /
  `status` / `tags`, with a round-trip-safe line-based YAML-subset parser, a
  status-bar chip and popover, preview schema badges, and new-file stamping.
  The active document's class is injected into agent context as fenced,
  enum-clamped, sanitized metadata.
- **Monitor log viewer** (`src/monitorview.js`) reading the diagnostic
  stream, plus Gemini CLI parity (locating the npm-global shim so Gemini is
  detected even when off-`PATH`).
- **Product identity/licensing** — a single `CONFIG.product` source feeding
  an About panel (version, `EG-MD-2026`, author, company, license) and a
  topbar version badge; MIT `LICENSE`, real `package.json` metadata, and the
  README's "About & License" section.

## v0.4 — review UX + real permission-tier enforcement (shipped 2026-06-27, `0.4.0`)

Described in PROGRESS.md as the "0.4-lite" line — deliberately decoupled
from the Tauri desktop rewrite, which stays the project's actual, still
unshipped, v0.4/v0.5 roadmap headline (see below). What shipped as 0.4.0:

- **Bug-fix and cleanup batch** — a corrected `.eveglyph/memory/pitfalls.md`
  path; a failed diff-read now surfaces a warning instead of a false
  "no changes" result (`fetchAgentDiff`); whole-word regex search groups its
  pattern correctly; the agent output stream now uses a **stateful UTF-8
  decoder**, fixing CJK mojibake caused by multi-byte sequences split across
  stream chunks; dead `persistKeys` code removed; stale config tags and
  mojibake comments fixed; `Ctrl+F` behavior made coherent (CodeMirror's
  in-file search inside the editor, the workspace Find panel everywhere
  else).
- **Diff-review UX unification** (`src/diffview.js`) — one shared renderer
  used by both the agent panel and workspace replace-all: a unified diff
  grouped into per-file cards with +/− counts, collapsible, and fully
  escaped since it renders untrusted agent/git output.
- **Real permission-tier enforcement** — Cautious / Standard / Trusted now
  flow to the bridge and map to actual CLI behavior: Claude Code's
  `--permission-mode` plus a tool allow-list, Codex's `--sandbox` levels (or
  bypass), and Gemini's `--approval-mode`. This replaced the v0.3 tiers,
  which had only changed prompt text.
- **Live agent activity panel** — a transient "working…" view streaming the
  agent's output tail (respecting the quiet setting), replaced by the diff
  view once the run completes.
- **Onboarding and a bundled `examples/` workspace** — a three-step empty
  state for a fresh clone, plus a sample workspace containing EveGlyph-MD
  documents and a starter `.eveglyph/` directory, so there is something to
  open immediately.

## Roadmap — not yet shipped

- **Tauri desktop rewrite.** PROGRESS.md is explicit that this — not the
  0.4.0 web release described above — is the intended "real" v0.4/v0.5
  headline: a large bridge rewrite, deliberately decoupled from and shipped
  after the 0.4-lite line. It has not shipped as of this writing.
- **OS-keychain API-key storage** is noted as a future improvement tied to
  that desktop build; today API keys remain in browser `localStorage` in
  plaintext (see SECURITY.md).

## See also

- [origin.md](./origin.md) — the problem this project addresses.
- [current.md](./current.md) — the authoritative description of v0.4.0.
- [public-summary.md](./public-summary.md) — a short citable summary.
