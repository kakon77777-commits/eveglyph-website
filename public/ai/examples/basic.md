---
status: active
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# Worked example — the workspace → agent → diff-review → human loop

This is the exact worked example shown on the EveGlyph Editor homepage
(`src/components/Hero.tsx`), reproduced here verbatim so the AI corpus and the
human-facing site never disagree. It walks through one document
(`examples/welcome.md`), one agent edit (`notes/foo.md`), and the resulting
diff-review card — the same **workspace ↔ agent ↔ diff-review ↔ human loop**
described in the README.

## 1. The document — `examples/welcome.md`

Frontmatter (EveGlyph-MD, `type` / `status`):

```yaml
---
type: article
status: final
---
```

Rendered body:

```markdown
# Welcome to EveGlyph Editor

You write clean Markdown; local agents edit on disk; every change lands as a
reviewable diff.

::: note {title="Try the loop"}
Point a local agent at this folder…
:::
```

Nothing here is agent output — this is the human-authored starting document,
shown in the editor with its EveGlyph-MD class (`article` / `final`) as
status-bar badges.

## 2. A local agent edits `notes/foo.md`

Following the "Try the loop" callout, a local CLI agent (Claude Code / Codex /
Gemini, spawned by EveGlyph Editor's dev-only bridge) is pointed at the
workspace. Before the agent runs, EveGlyph Editor git-snapshots the workspace
(initializing a repo if one doesn't exist yet). The agent then reads and edits
`notes/foo.md` on disk, with auto-approve — no per-file confirmation during the
run.

## 3. The diff card

After the agent finishes, EveGlyph Editor runs a real `git diff` and renders it
as a per-file card with a `+`/`−` line count (`src/diffview.js`, the same
renderer used for the agent panel and for workspace replace-all):

```
notes/foo.md                                              +2 −1

@@ -1,3 +1,4 @@
- old line
+ tightened prose
+ fixed heading
```

This card is the entire review surface: one file, one unified hunk, colored
by addition/removal, fully escaped because it renders untrusted agent/git
output.

## 4. Accept / Reject semantics

The human reviewing the card has exactly two outcomes, both git-based:

- **Accept** — commits the agent's change with message `agent: <message>`.
  The edit to `notes/foo.md` becomes a normal commit in the workspace's git
  history.
- **Reject** — runs `git reset --hard HEAD` followed by `git clean -fd`. This
  discards **all** of the agent's edits *and* any untracked files that existed
  in the workspace at the time — not just the one card being reviewed. Reject
  is destructive to uncommitted work; commit or back up anything you care about
  before running an agent.

There is no partial-accept or per-hunk staging in v0.4.0 — the review unit is
the whole agent run, accepted or discarded as one git operation.
