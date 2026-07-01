---
status: active
version: 0.1.0
canonical: true
audience: ai-agent, human
last_updated: 2026-07-01
---

# Versioning policy

Which document wins when versions conflict.

## Two independent version tracks

There are two separate things being versioned here — do not conflate them:

1. **EveGlyph Editor, the product** — currently `v0.4.0` (shipped
   2026-06-27), pre-1.0. Its version history: `0.1` prototype → `0.2.0`
   open-source cleanup → `0.3.0` agent-native workspace → `0.4.0` review UX +
   real permission-tier enforcement. Tracked by git tags/commits in
   `github.com/kakon77777-commits/eveglyph-editor`.
2. **This `/ai/` machine-readable layer** (AICL / AIRS-AILP) — currently
   `0.1`, published 2026-07-01. It versions **independently** of the product:
   a product bump from `0.4.0` to a future `0.5.0` does not by itself change
   this layer's version, and a bump to this layer's declarations does not
   imply a product release.

## Precedence on conflict

When two sources disagree, resolve in this order (highest wins):

1. **This `/ai/` layer's `/ai/corpus/current.md`** — the canonical, current
   technical description, republished from the repository.
2. **The repository** — `github.com/kakon77777-commits/eveglyph-editor`
   (`README.md`, `SECURITY.md`, `PROGRESS.md`) is the origin for product facts
   (see [provenance.md](./provenance.md)).
3. **The marketing site** at `eveglypheditor.com` (the human landing page) —
   reference only; never authoritative for technical or version claims.
4. **Any third-party mirror** — e.g. package registries, forks, or
   re-publications not controlled by EVEMISS TECHNOLOGY CO., LTD. — lowest
   precedence; verify against the sources above before trusting.

## Version signals

- Every published `/ai/` document declares `version` and `last_updated` in
  front-matter.
- `last_updated` reflects the most recent republish of that document, not
  necessarily a change in its content.
- Historical documents (e.g. `PROGRESS.md`'s milestone history) describe past
  states by design and are not superseded as history — but the current
  `README.md` / `SECURITY.md` and this layer's `current.md` govern the
  present.

See also: [provenance.md](./provenance.md) · [usage-policy.md](./usage-policy.md) ·
[crawler-policy.md](./crawler-policy.md).
