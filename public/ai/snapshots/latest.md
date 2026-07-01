---
status: active
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph Editor — State Snapshot (v0.4.0)

A short, dated snapshot of EveGlyph Editor's current state, for agents that
want the latest facts without reading the full corpus. For the longer
technical description see [`../corpus/current.md`](../corpus/current.md); for
the declared local capability surface see [`../tools/catalog.json`](../tools/catalog.json).

- **What it is.** EveGlyph Editor is a local-first, agent-native Markdown
  workspace/editor — the editor half of the **EveGlyph-MD** format
  (`EG-MD-2026`) — built around one loop: **workspace ↔ agent ↔ diff-review ↔
  human**. Humans write clean Markdown; a local CLI agent edits files on disk;
  every change is git-snapshotted and shown as a reviewable diff; the human
  accepts or rejects. Nothing is applied silently. Part of EveMissLab.
- **Version & status.** v0.4.0, shipped 2026-06-27. Pre-1.0 local prototype.
- **License & ownership.** MIT (`LICENSE`). Copyright EVEMISS TECHNOLOGY CO.,
  LTD. (一言諾科技有限公司); author Neo.K (許筌崴), Taipei, Taiwan. Business/
  licensing contact: kakon77777@evemisslab.com.
- **Stack.** A vanilla ES-module frontend with CodeMirror 6, talking to a
  dev-only Vite plugin bridge (`vite-agent-bridge.js`) over localhost-gated
  HTTP. The bridge only exists while a user runs `npm run dev` on their own
  machine — there is no public, network-reachable API.
- **AI providers.** Anthropic (Claude), any OpenAI-compatible endpoint, or a
  local CLI agent (Claude Code / Codex / Gemini). Cloud providers never touch
  the filesystem; only the local-agent path edits files, and only on the
  user's own machine.
- **PatchMD diff review.** Before a local agent runs, the workspace is
  git-snapshotted. Afterwards a real `git diff` renders as per-file cards with
  `+`/`−` counts. **Accept** commits (`agent: <message>`); **Reject** runs
  `git reset --hard HEAD` + `git clean -fd`, discarding all agent edits and
  untracked files — destructive to uncommitted work.
- **Permission tiers.** Cautious / Standard / Trusted flow from the UI to the
  bridge and, as of v0.4.0, map to real CLI enforcement (Claude Code
  `--permission-mode` + tool allow-list, Codex `--sandbox` levels/bypass,
  Gemini `--approval-mode`) — not just prompt text as in earlier versions.
- **EveGlyph-MD frontmatter.** A round-trip-safe `type` / `status` / `tags`
  classification layer (`src/frontmatter.js`) that edits the raw YAML-subset
  block line-by-line, preserving a human's untouched formatting. The active
  document's class is injected into the agent context as fenced,
  enum-clamped, sanitized metadata — treated as data, never as instructions.
- **Workspace memory (`.eveglyph/`, gitignored).** `rules.md` is injected
  verbatim with elevated authority into every agent run; plus `glossary.md`
  and `memory/pitfalls.md` / `memory/recent.md`. A back-stage Monitor tab
  tail-reads a local diagnostic JSONL log.
- **Security posture.** Local-agent mode runs a CLI with auto-approve — it can
  read, create, edit, and delete files in the opened workspace without
  per-file confirmation. `isLocalRequest` gates every request to
  localhost/127.0.0.1/::1; `resolveInside` plus a pinned `confirmedWorkspace`
  confine every file, git, and agent operation to the one opened folder. The
  agent prompt is delivered over stdin, never as CLI args; there is a hard
  180-second timeout. API keys are stored in `localStorage` in plaintext.
- **Roadmap (not yet shipped).** A Tauri desktop rewrite is the intended real
  v0.4/v0.5 headline, deferred from this "0.4-lite" web release; OS-keychain
  API-key storage is a future desktop improvement, not current.

## Stable links

- Repository: <https://github.com/kakon77777-commits/eveglyph-editor>
- Website: <https://eveglypheditor.com>
- AI corpus (fuller description): [`../corpus/current.md`](../corpus/current.md)
- Local capability surface (dev-only): [`../tools/catalog.json`](../tools/catalog.json)
- Worked example: [`../examples/basic.md`](../examples/basic.md)
- Licensing contact: kakon77777@evemisslab.com
