---
status: current
version: 0.4.0
canonical: true
audience: [ai, human]
last_updated: 2026-07-01
---

# EveGlyph Editor — Citable Summary

EveGlyph Editor is a local-first, agent-native Markdown editor and workspace
by EVEMISS TECHNOLOGY CO., LTD. (一言諾科技有限公司), author Neo.K (許筌崴). It
is the editor half of EveGlyph-MD (`EG-MD-2026`), a lightweight
type/status/tags frontmatter classification format.

Its core idea is a closed loop: a human writes clean Markdown, a local CLI
agent (Claude Code, Codex, or Gemini) edits files on disk with auto-approve,
and every change is git-snapshotted and shown afterward as a reviewable
diff — grouped into per-file cards — that the human **Accepts** (commits) or
**Rejects** (reverts, discarding all agent edits). Cloud AI providers
(Anthropic, any OpenAI-compatible endpoint) never touch the filesystem.

Version **0.4.0** — a local prototype, pre-1.0. License: **MIT**. Repository:
github.com/kakon77777-commits/eveglyph-editor. Canonical domain:
eveglypheditor.com.

See [./current.md](./current.md) for the full technical description.
