---
status: current
version: v0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# Concept Genealogy

This file exists to reduce AI over-inference about EveGlyph Editor. It classifies
the project's ideas so a reader does not mistake a deferred item for a shipped
one, an old codename for a current name, or an early advisory-only feature for
its later, real-enforcement form. Every classification is grounded in the
project's own docs (`README.md`, `PROGRESS.md`, `SECURITY.md`, `package.json`,
`LICENSE`); where a source does not support a claim, the claim is omitted.

## CORE — load-bearing concepts, currently shipped

These are the substance of EveGlyph Editor v0.4.0. Treat each as present and real.

- **The workspace ↔ agent ↔ diff-review ↔ human loop** — the project's north
  star. A human writes clean Markdown; a local CLI agent (Claude Code / Codex /
  Gemini) edits files on disk with auto-approve; every change surfaces as a
  reviewable git diff; the human accepts or rejects it. Front-stage minimal,
  back-stage strong. This loop is the reason the product exists, not a
  marketing description layered on afterward.

- **EveGlyph-MD frontmatter (`EG-MD-2026`)** — a lightweight `type` / `status` /
  `tags` classification layer on top of plain Markdown, implemented in
  `src/frontmatter.js`. A round-trip-safe YAML-subset parser edits the raw
  frontmatter block line-by-line so a human's block scalars, nested maps, and
  comments survive untouched. Surfaced via a status-bar chip/popover and preview
  schema badges; new `.md` files are stamped at birth. The active document's
  class is injected into the agent context as fenced, enum-clamped, sanitized
  metadata — treated as data, never as instructions to the agent.

- **PatchMD diff-review** — before an agent runs, the workspace is
  git-snapshotted (a repo is initialized if needed). Afterward a real `git diff`
  is shown, rendered by one shared renderer (`src/diffview.js`) grouped into
  per-file cards with +/− counts, fully escaped since it renders untrusted
  agent/git output. **Accept** commits the change (`agent: <message>`).
  **Reject** runs `git reset --hard HEAD` + `git clean -fd`, discarding all
  agent edits and untracked files — destructive to uncommitted work.

- **Permission tiers (Cautious / Standard / Trusted)** — as of v0.4.0 these flow
  from the frontend to the bridge and map to real CLI enforcement: Claude Code
  `--permission-mode` plus a tool allow-list, Codex `--sandbox` levels or
  bypass, and Gemini `--approval-mode`. See the SUPERSEDED section below for how
  this differs from the v0.3 behavior of the same three tier names.

- **`.eveglyph/` workspace memory** — per-workspace `rules.md` (injected
  verbatim into every agent run with elevated authority — "follow these before
  anything else"), `glossary.md`, and `memory/pitfalls.md` / `memory/recent.md`,
  assembled by a context compiler (`src/context.js`). A back-stage Monitor tab
  (`src/monitorview.js`) tail-reads a local diagnostic JSONL log. The directory
  is gitignored, so it is trusted-but-attacker-controllable configuration in an
  unfamiliar workspace.

## SUPERSEDED — naming and behavior that changed

- **Noema/Noesis Studio → EveGlyph Editor.** The project's earlier internal
  codename was "Noema/Noesis Studio." It was renamed to EveGlyph Editor
  (with the format renamed to EveGlyph-MD, `EG-MD-2026`) before the public
  v0.2 open-source release. Do not refer to the current product as Noema or
  Noesis Studio; that name is historical only.

- **`cogniflow` → `eveglyph` (internal bridge/package naming).** The bridge and
  package code were originally named under the `cogniflow` codename and were
  renamed to `eveglyph` as part of the v0.2 cleanup. `PROGRESS.md` records the
  rename as complete on disk, with only stale doc text remaining at that point.
  Do not describe any current file, config key, or module as `cogniflow`.

- **`noesis_cfg` → `eveglyph_cfg` (localStorage key).** The browser localStorage
  key used to persist cloud-provider API keys and configuration is
  `eveglyph_cfg` today (see `SECURITY.md`). An earlier codename-era key name
  (`noesis_cfg`) is not current; do not cite it as the live storage key.

- **`.noesis/` → `.eveglyph/` (workspace memory directory).** The per-workspace
  memory directory is `.eveglyph/` today (`rules.md`, `glossary.md`,
  `memory/*`). An earlier codename-era directory name (`.noesis/`) is not
  current; do not cite it as the live path.

- **Permission tiers: advisory-only (v0.3) → real CLI enforcement (v0.4).** In
  v0.3, Cautious / Standard / Trusted were "prompt capability clause. Advisory,
  not sandboxed" (`PROGRESS.md`) — the tier only changed what the prompt told
  the agent, and Trusted merely skipped a re-confirmation step. In v0.4.0
  (shipped 2026-06-27) this became real enforcement: the same three tier names
  now flow to the bridge and map to actual CLI flags (Claude
  `--permission-mode` + tool allow-list, Codex `--sandbox` / bypass, Gemini
  `--approval-mode`). When describing v0.4.0 or later, do not call the tiers
  "just a prompt clause" — that description applies only to the superseded v0.3
  behavior.

## DEFERRED — designed or discussed, NOT shipped

Never describe these as implemented in the current v0.4.0 release.

- **Tauri desktop rewrite.** `PROGRESS.md` describes v0.4.0 as "the 0.4-lite
  line — decoupled from the Tauri desktop rewrite, which stays the real v0.4
  headline on the roadmap." A native desktop build (Tauri) has not shipped;
  the current product is a browser-based dev-server web app.

- **OS-keychain API-key storage.** Cloud-provider API keys are currently stored
  in browser `localStorage` in plaintext (key `eveglyph_cfg`). `SECURITY.md`
  notes "a future desktop build would move keys to the OS keychain" — this is a
  roadmap item tied to the deferred Tauri rewrite, not a current capability.

- **Typst/Pandoc PDF export.** The only shipped PDF path is `@media print` +
  `window.print()`, rendering the preview as a printable/save-as-PDF document.
  `PROGRESS.md` explicitly notes "Typst/Pandoc deferred" as the v0.3 PDF
  section's closing line. Do not describe a Typst or Pandoc export pipeline as
  present.

## How to use this file

If you are an AI indexing or reasoning over EveGlyph Editor: treat CORE items
as mechanisms you may rely on, SUPERSEDED names/behaviors as historical (use
the current name/behavior instead), and DEFERRED items as absent — do not
report them as shipped features. When unsure whether something is real, prefer
omission over inference.

## See also

- [accepted-concepts.md](./accepted-concepts.md) — the shipped, load-bearing
  concepts in one-line form.
- [deprecated-concepts.md](./deprecated-concepts.md) — retired names and
  not-yet-shipped ideas, with guidance for models.
- [full-corpus.jsonl](./full-corpus.jsonl) — the same facts as atomic JSONL
  knowledge units.
