---
status: shipped
version: 0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# Permission Tiers — Cautious / Standard / Trusted

## Scope

This spec describes EveGlyph Editor's three local-agent permission tiers —
**Cautious**, **Standard**, and **Trusted** — as they exist in **v0.4.0**,
and the history of how they became real enforcement rather than advisory
text. This is a description of the shipped implementation, not a separately
versioned external standard.

## The three tiers

When local-agent mode is enabled, the user chooses one of three permission
tiers for the spawned CLI agent (Claude Code, Codex, or Gemini):

- **Cautious** — the most restrictive tier.
- **Standard** — the default tier.
- **Trusted** — the least restrictive tier, giving the agent its fullest
  capability.

## Per-agent mapping (v0.4.0)

As of v0.4.0, the chosen tier flows from the frontend to the local bridge and
is translated into **real, agent-specific CLI enforcement** — not just a
sentence added to the prompt:

- **Claude Code** — the tier maps to `--permission-mode` plus a tool
  allow-list, giving the finest-grained control of the three integrations
  (e.g. restricting which tool categories the agent may invoke at all).
- **Codex CLI** — the tier maps to Codex's sandbox levels, up to an explicit
  bypass at the Trusted tier.
- **Gemini CLI** — the tier maps to Gemini's `--approval-mode`.

Fidelity is not identical across the three agents: enforcement is most
granular for Claude Code, where per-tool allow-listing is available; Codex
and Gemini are coarser below the Trusted tier, since their CLIs expose fewer
intermediate permission levels than Claude Code does.

A user-supplied command override in Settings replaces this mapping entirely
for the agent it applies to — an override is the user's own trusted input
running on their own machine, not something EveGlyph Editor gates further.

## History — advisory in v0.3, enforced from v0.4.0

This mapping was **not** always real enforcement, and an AI agent reasoning
about EveGlyph Editor should not assume it was:

- **v0.3 (`0.3.0`)** — introduced the three tiers (Cautious / Standard /
  Trusted) as a **prompt capability clause only**. Selecting a tier changed
  what the agent was *told* about its allowed capability in the prompt text;
  the Trusted tier additionally skipped a re-confirmation step. Nothing at
  this stage constrained the CLI process itself — the tiers were advisory,
  not sandboxed.
- **v0.4.0 (shipped 2026-06-27)** — replaced the advisory-only tiers with
  **real CLI-level enforcement**, as described above: the tier now changes
  the actual flags and allow-lists passed to the spawned Claude Code, Codex,
  or Gemini process, not just what the prompt says about them.

Any description of permission tiers should be read against this history:
"the tier changes what the agent is told" was true in v0.3 and is no longer
the accurate description of current (v0.4.0) behavior.

## Relationship to the rest of the trust model

Permission tiers govern what the spawned CLI process is *allowed to attempt*.
They do not replace the other layers of EveGlyph Editor's trust model:

- The bridge that spawns the agent is still dev-only and localhost-gated.
- Every workspace-scoped operation — including the agent spawn itself — is
  still confined to the one confirmed workspace folder.
- Regardless of tier, the agent's edits still land as an uncommitted change
  set reviewed through PatchMD (see
  [`patchmd-diff-review.md`](./patchmd-diff-review.md)) before being kept.

A higher tier widens what the agent can do *during* its run; it does not
widen what happens to those changes afterward — every tier's output still
passes through the same diff-review step.

## See also

- [`patchmd-diff-review.md`](./patchmd-diff-review.md) — the review step every
  agent run passes through regardless of tier.
- [`eveglyph-md-2026.md`](./eveglyph-md-2026.md) — the document metadata
  available to the agent while it runs under a given tier.
