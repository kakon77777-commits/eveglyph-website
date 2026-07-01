---
status: shipped
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph-MD (`EG-MD-2026`) — Frontmatter Format

## Scope

This spec describes the **EveGlyph-MD frontmatter layer** as shipped in
EveGlyph Editor **v0.4.0** (implemented in `src/frontmatter.js`, product code
`EG-MD-2026`). It is a description of the current, working implementation
shipped inside one editor — **not** a separately versioned external standard,
and not a general-purpose YAML specification. If this document and the
shipping code ever disagree, the code is authoritative.

## What it is

EveGlyph-MD is a lightweight document-classification layer: a small,
optional YAML frontmatter block at the top of a Markdown file carrying three
fields — `type`, `status`, and `tags`. It exists so that a human's filter and
search, and an AI agent's context, have something honest and machine-legible
to key off, without imposing a heavier document schema.

## The three fields

- **`type`** — a single string classifying what kind of document this is
  (e.g. a note, a draft, a spec — the concrete enum is defined by the
  editor's configuration).
- **`status`** — a single string classifying the document's state in its
  lifecycle (again, an enum defined by configuration).
- **`tags`** — a list of free-form strings.

`type` and `status` are checked against a configured enum **advisorily**: an
out-of-enum value is warned about, never blocked or rewritten — a human may
legitimately use a `type` or `status` the current build doesn't know about,
and the format must tolerate that rather than fight it.

## Round-trip safety

The frontmatter reader/writer is a small, hand-rolled **YAML subset** parser —
not a general YAML implementation. It understands the shapes this schema
actually uses (scalars and a flat string list) well enough to read and edit
them, but it is deliberately conservative about what it rewrites: editing a
document's frontmatter touches only the specific fields being changed, and a
human's own block scalars, nested maps, comments, and spacing elsewhere in
the same frontmatter block survive a save untouched. The goal is that adding
or changing `type` / `status` / `tags` on a file a human has already hand-edited
never silently destroys content the parser doesn't model.

## Editor surface

- **Status-bar chip** — the active document's class is shown in the status
  bar; a popover lets the user set `type` / `status` (and warns if a value
  falls outside the configured enum, without blocking it).
- **Preview badges** — the rendered Markdown preview shows the document's
  class as schema badges.
- **Birth-stamping** — newly created `.md` files are stamped with default
  `type` / `status` values at creation time, so the frontmatter habit is
  established from the start rather than requiring a later backfill across an
  existing corpus.

## Handoff to an AI agent — data, not instructions

When a local or cloud AI agent is given context about the workspace, the
**active document's** EveGlyph-MD class is included in that context — but
only as tightly bounded, sanitized metadata, never as free text that could be
mistaken for a command:

- Only the current document's class is sent, gated by configuration (the
  document-class injection can be turned off, and only applies to `.md`
  files).
- `type` and `status` are **enum-clamped** before being handed to the agent:
  a value outside the configured enum is not passed through verbatim.
- `tags` and other rendered values are sanitized and length-capped.
- The whole block is **fenced** and explicitly labeled as descriptive
  metadata — file attributes — with an accompanying instruction that its
  contents must never be treated as commands.

This matters because a document's frontmatter can itself be authored by a
human, an imported file, or a previous agent run — it is not a trusted
instruction channel, and EveGlyph Editor's context layer treats it
accordingly: as data about the file, handed to the agent for classification
purposes only.

## See also

- [`patchmd-diff-review.md`](./patchmd-diff-review.md) — how any agent edit to
  a document (including its frontmatter) surfaces for human review.
- [`permission-tiers.md`](./permission-tiers.md) — what a local agent is
  allowed to do to files while it has this context.
