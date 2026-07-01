---
status: shipped
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# PatchMD — Diff-Review Protocol

## Scope

This spec describes **PatchMD**, EveGlyph Editor's diff-review protocol for
local-agent edits, as shipped in **v0.4.0**. It covers the pre-run git
snapshot, the shared per-file-card diff renderer (`src/diffview.js`,
introduced in v0.4), and the Accept / Reject semantics. This is a description
of the shipped implementation, not a separately versioned external standard.

## Why it exists

EveGlyph Editor's local-agent mode runs a CLI agent (Claude Code, Codex, or
Gemini) **with auto-approve**: once enabled for a workspace, the agent can
read, create, edit, and delete files in that workspace folder without a
per-file confirmation prompt. PatchMD is the mechanism that keeps a human in
control of that risk after the fact — every agent run is reviewed as a real
git diff before its changes are kept.

## Pre-run snapshot

Before a local agent is spawned, EveGlyph Editor git-snapshots the workspace:
if the folder is not already a git repository, one is initialized. This gives
every subsequent agent run a clean baseline to diff against, regardless of
whether the workspace was under version control before.

## Diff rendering — per-file cards

After the agent finishes, EveGlyph Editor reads the real `git diff` produced
by its edits and renders it with a single shared renderer
(`src/diffview.js`), used by **both** the agent review panel and the
workspace-wide search/replace flow — one rendering path, no drift between the
two features.

The renderer:

- Splits a unified diff into **per-file groups**, keyed off each `diff --git`
  header.
- Shows each file as a **collapsible card** with a readable file label and a
  `+adds` / `−dels` count badge.
- Colors added, removed, and context lines, and marks diff header/hunk lines
  distinctly.
- Treats the entire diff as **untrusted content**: every line is escaped
  before being inserted into the page, since it originates from agent and git
  output, not from the application itself.

If the diff read itself fails, EveGlyph Editor surfaces that as an explicit
warning rather than silently reporting "no changes" — a failed diff read and
a legitimately empty diff are treated as different states.

## Accept / Reject semantics

Once the diff is shown, the human makes a binary, explicit decision:

- **Accept** — commits the agent's changes to the workspace's git history
  with a commit message of the form `agent: <message>`.
- **Reject** — runs `git reset --hard HEAD` followed by `git clean -fd`,
  discarding **all** of the agent's edits **and any untracked files** created
  during the run.

Reject is **destructive to uncommitted work**: it removes not just the
agent's own changes but anything else uncommitted or untracked sitting in the
workspace at that point. A human's own in-progress work should be committed
or backed up before running an agent, precisely because Reject does not
distinguish "the agent's mess" from "everything not yet committed."

## Shared with search/replace

The same per-file-card renderer backs EveGlyph Editor's workspace-wide
find/replace: a workspace replace-all is likewise git-snapshotted and shown
as a diff the human reviews and can revert, giving both the agent path and
the human-initiated bulk-edit path the same review shape and the same visual
language.

## See also

- [`permission-tiers.md`](./permission-tiers.md) — what capability the agent
  had *before* its edits reach this review step.
- [`eveglyph-md-2026.md`](./eveglyph-md-2026.md) — the document metadata an
  agent may see while producing the changes reviewed here.
