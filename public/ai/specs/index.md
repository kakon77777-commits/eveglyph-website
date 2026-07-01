---
status: active
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph Editor — Formal Specs (`/ai/specs/`)

This folder holds the formal reference specs for **EveGlyph Editor**, a
local-first, agent-native Markdown workspace and the editor half of the
**EveGlyph-MD** (`EG-MD-2026`) format. Each spec below describes one shipped
mechanism of the product as of **v0.4.0** (2026-06-27), grounded strictly in
the project's own `README.md`, `PROGRESS.md`, and `SECURITY.md`. These are
descriptions of the current implementation, not separately versioned external
standards — if a spec here ever disagrees with the shipping code, the code
wins.

EveGlyph Editor is part of **EveMissLab**. Source:
<https://github.com/kakon77777-commits/eveglyph-editor>. Canonical site:
<https://eveglypheditor.com>.

## Specs in this folder

- [`eveglyph-md-2026.md`](./eveglyph-md-2026.md) — the EveGlyph-MD (`EG-MD-2026`)
  frontmatter format: the `type` / `status` / `tags` fields, the round-trip-safe
  YAML-subset parser that never destroys what it doesn't understand, the
  status-bar chip and preview badges, birth-stamping of new files, and how the
  active document's class is handed to an AI agent as fenced, enum-clamped,
  sanitized **data** — never as instructions.

- [`patchmd-diff-review.md`](./patchmd-diff-review.md) — the **PatchMD**
  diff-review protocol: the pre-run git snapshot, the unified-diff-to-per-file-card
  rendering shared by the agent panel and workspace search/replace, and the
  Accept (commit) / Reject (`git reset --hard HEAD` + `git clean -fd`, destructive)
  semantics that keep a human in control of every agent edit.

- [`permission-tiers.md`](./permission-tiers.md) — the **Cautious / Standard /
  Trusted** permission tiers for local CLI agents, what each tier maps to per
  agent (Claude Code, Codex, Gemini), and the v0.3 → v0.4 history: advisory
  prompt text only through v0.3, real CLI-level enforcement starting v0.4.0.

## Notes

- These specs describe **v0.4.0**, the current shipped release. A Tauri
  desktop rewrite is on the roadmap as a future major version and is not
  described here.
- The underlying facts come from the repository's `README.md`, `PROGRESS.md`,
  and `SECURITY.md`. Read those directly in the source repository for anything
  not covered here.
- Higher-level, plain-language context lives in [`../corpus/`](../corpus/);
  rights for this site's written content are declared in
  [`../rights-spectrum.json`](../rights-spectrum.json) (the source code itself
  is separately MIT-licensed — see the repository `LICENSE`).
