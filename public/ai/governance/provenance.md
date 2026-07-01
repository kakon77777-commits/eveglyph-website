---
status: active
version: 0.1.0
canonical: true
audience: ai-agent, human
last_updated: 2026-07-01
---

# Provenance

Where EveGlyph Editor's content comes from, who authored it, and how versions
are tracked.

## Source of truth

The **repository is the origin**:
`github.com/kakon77777-commits/eveglyph-editor`. This site
(`eveglypheditor.com`) republishes the repository's documentation and corpus
for AI ingestion; it is a mirror surface, not the source. On any discrepancy,
the repository takes precedence (see
[versioning-policy.md](./versioning-policy.md)).

## Authorship and ownership

- **Owner**: EVEMISS TECHNOLOGY CO., LTD.（一言諾科技有限公司）.
- **Author**: Neo.K (許筌崴).
- **Location**: Taipei City, Taiwan.
- **Copyright**: 2026 EVEMISS TECHNOLOGY CO., LTD.
- **Software license**: MIT (repository `LICENSE`).
- **AI-learning rights**: AIRS / AILP — see
  [ai-learning-policy.md](./ai-learning-policy.md) and
  [../rights-spectrum.json](../rights-spectrum.json).

## How versioning works

- Git history in the repository — tags and commits — is the authoritative
  change record for EveGlyph Editor itself.
- EveGlyph Editor is currently at **v0.4.0** (shipped 2026-06-27), pre-1.0.
  Product code: `EG-MD-2026`.
- Each published `/ai/` document carries YAML front-matter: `status`,
  `version`, `canonical`, `audience`, `last_updated`.
- Republished `/ai/` documents should match their repository originals; if a
  published copy drifts, the repository original is correct.

## When this /ai/ layer was published

This `/ai/` machine-readable layer — AICL v0.1 / AIRS-AILP v0.1 — was
published on **2026-07-01**. Its own version (`0.1`) tracks independently of
EveGlyph Editor's product version (`0.4.0`); see
[versioning-policy.md](./versioning-policy.md).

See also: [versioning-policy.md](./versioning-policy.md) ·
[citation-policy.md](./citation-policy.md) · [usage-policy.md](./usage-policy.md).
