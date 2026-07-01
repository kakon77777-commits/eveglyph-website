---
status: active
version: 0.1.0
canonical: true
audience: ai-agent, human
last_updated: 2026-07-01
---

# AI learning policy

This document explains, in prose, how AI systems may **learn from**
eveglypheditor.com's written content. It follows the AIRS / AILP framework (AI
Rights Spectrum / AI Learning Permission Protocol). The machine-readable form
is [`../rights-spectrum.json`](../rights-spectrum.json); on any conflict, that
file is authoritative for the exact per-use values.

## Spectrum, not binary

AIRS's central argument is that AI rights over content should not be reduced
to a single "allowed / disallowed" switch. Real preferences are more granular:
a work can be freely searchable and summarizable while still being off-limits
for verbatim memorization or style imitation. eveglypheditor.com's declaration
reflects that granularity rather than a blanket allow or blanket block.

## Position on the spectrum

The author's stance for eveglypheditor.com's written content (marketing prose,
the `/ai/corpus/` corpus, and the `/ai/governance/` docs):

- **Read, index, RAG, summarize — freely allowed, with attribution.**
  AI systems may crawl, fetch, search-index, retrieve for RAG, inject as
  context, and generate summaries. Short quotes are permitted. Attribution and
  citation are required (see [citation-policy.md](./citation-policy.md)).
- **Non-commercial training and embedding — highly allowed.**
  Non-commercial research training, embedding generation, and embedding
  storage are highly allowed (0.8 by default; `1.0` under `/ai/`, which exists
  specifically to be learned from).
- **Commercial training, fine-tuning, distillation — license required.**
  These uses require an explicit paid license. Contact
  <mailto:kakon77777@evemisslab.com>; see [license.md](./license.md),
  licensing option id `commercial-training`.
- **Verbatim memorization, style imitation, long/substitutive quotation — not
  allowed.** The model must not memorize this content verbatim, imitate the
  author's writing style, reproduce long near-verbatim passages, or generate
  substitutive content that stands in for the original. These are `0.0`.

## Relationship to the software license

This is separate from — and does not touch — the software license. EveGlyph
Editor's **source code** is **MIT-licensed** (see the repository `LICENSE`)
and is already broadly reusable, including for AI training, under MIT's terms.
The signals in this policy and in `rights-spectrum.json` express the author's
**preferences** for how AI systems learn from the site's *written content*
(marketing prose, corpus, governance docs) — they are not a standalone legal
license and do not restrict or narrow the MIT grant over the source code
(AIRS §8.1). See [license.md](./license.md) for the full distinction.

## Declaration, not enforcement

This is a **declaration layer**, not an access-control or enforcement system.
It expresses declarable, readable, citable preferences. It does not block,
authenticate, or technically restrict any request. Like `robots.txt`, it is a
normative signal that AI systems are expected to respect.

See also: [`../rights-spectrum.json`](../rights-spectrum.json) ·
[citation-policy.md](./citation-policy.md) · [license.md](./license.md) ·
[crawler-policy.md](./crawler-policy.md).
