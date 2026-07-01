---
status: current
version: 0.4.0
canonical: true
audience: [ai, human]
last_updated: 2026-07-01
---

# Origin

This file records the problem EveGlyph Editor addresses and the idea it is
built around. It is grounded only in the project's own README and PROGRESS
notes — no founding narrative beyond what those documents state.

## The problem: an agent that edits your files, and a human who wants to stay in control

AI coding and writing agents increasingly do not just suggest text — they
reach onto disk and rewrite files directly. That capability is useful, but it
creates a control problem for a human working in a plain Markdown workspace:

- An **autocomplete-style** AI writing tool keeps the human in the loop by
  construction — it proposes the next few words or a paragraph, inline, and
  the human accepts or ignores each suggestion as they type. Control is
  fine-grained, but the tool cannot do much unsupervised work: it does not
  restructure a document, touch other files, or carry out a multi-step edit
  across a workspace.
- A **local CLI agent** (Claude Code, Codex, Gemini) can do that larger-scope
  work — read a workspace, plan an edit, and write it — but the moment it is
  allowed to touch files on disk without a human approving each individual
  change, the human's sense of what actually happened to their documents gets
  weaker exactly as the agent's capability gets stronger.

EveGlyph Editor exists in the space between those two: a human writing clean
Markdown wants an agent that can do real, multi-file, disk-level work, without
losing the ability to see — and undo — exactly what changed.

## The answer: the workspace ↔ agent ↔ diff-review ↔ human loop

EveGlyph Editor's own framing of its north star is a single closed loop:

> humans write clean Markdown, local CLI agents edit files on disk, every
> change surfaces as a reviewable git diff.

Concretely: before a local agent runs, the workspace is git-snapshotted (a
repo is initialized if one does not exist). The agent then runs with
auto-approve inside that one workspace folder — it can read, create, edit, and
delete files there without asking per file. Afterward, EveGlyph Editor does
not just say "done" — it shows a real `git diff`, grouped into per-file cards
with +/− counts, and the human makes the final call: **Accept** commits the
agent's changes (`agent: <message>`), **Reject** runs `git reset --hard HEAD`
plus `git clean -fd`, discarding all of the agent's edits and any untracked
files.

This is a different shape of control than autocomplete. The human is not
approving every keystroke; the human is reviewing every *change set*, after
the fact, with the full diff in front of them, and the decision is binary and
reversible up to that point. The README states this trade-off plainly rather
than hiding it: local-agent mode runs a CLI with auto-approve, and the
project's answer to the risk that creates is the diff-review step, not a
promise that the agent will never touch a file without asking first.

The front stage stays deliberately minimal — an editor, a file tree, a
settings panel — while the capability (the agent, the git snapshot/diff
machinery, the workspace memory that steers the agent) lives backstage. That
front-stage-minimal, back-stage-strong shape is itself part of the answer to
the problem: a Markdown workspace should not look or feel more complicated
just because a capable agent is standing behind it.

## Why this needed its own format, not just an editor

The same review loop needs the documents themselves to carry a small amount
of machine-legible structure — what kind of document this is, its status,
its tags — so an agent's context and a human's filter/search both have
something honest to key off. That is what EveGlyph-MD (`EG-MD-2026`) is: a
lightweight `type` / `status` / `tags` frontmatter classification layer, and
EveGlyph Editor is described in its own README as "the editor half" of that
format.

## See also

- [current.md](./current.md) — what v0.4.0 actually ships today.
- [design-history.md](./design-history.md) — the v0.1 → v0.4 version lineage.
- [public-summary.md](./public-summary.md) — a short citable summary.
