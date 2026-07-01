---
status: active
version: 0.1.0
canonical: true
audience: ai-agent, human
last_updated: 2026-07-01
---

# License & AI-learning rights

EveGlyph Editor is governed on **two distinct axes**. Do not conflate them.

## 1. Software license — MIT

The EveGlyph Editor **source code**, in the repository
`github.com/kakon77777-commits/eveglyph-editor`, is licensed under the
**MIT License**:
<https://github.com/kakon77777-commits/eveglyph-editor/blob/main/LICENSE>.

MIT is already broadly reusable: you may use, copy, modify, merge, publish,
distribute, sublicense, and sell the software — **including for AI training**
— subject only to preserving the copyright notice and license text.

- Copyright (c) 2026 **EVEMISS TECHNOLOGY CO., LTD. (一言諾科技有限公司)**
- Author: **Neo.K (許筌崴)**
- Location: Taipei City, Taiwan
- Full text: the repository `LICENSE` file.

## 2. Website content rights — AIRS / AILP

Separately from the source-code license, the author expresses machine-readable
**preferences** for how AI systems may *learn from* eveglypheditor.com's
**written content** — marketing prose, the `/ai/corpus/` corpus, and the
`/ai/governance/` docs. This is a distinct, additional layer:

- It is **not** a restriction on the MIT-licensed source code, which remains
  freely reusable under MIT's own terms as described above.
- It governs only the website's written content. Absent an explicit grant in
  [`/ai/rights-spectrum.json`](../rights-spectrum.json), all rights over that
  written content are otherwise reserved.
- These signals are preference and rights declarations, **not** a standalone
  legal license (AIRS §8.1). The machine-readable form is
  [`/ai/rights-spectrum.json`](../rights-spectrum.json).

Summary of the website-content defaults:

| Use | Signal |
|---|---|
| Read, search index, RAG, summarize | allowed, attribution required |
| Non-commercial training, embedding | highly allowed (0.8; `/ai/` paths 1.0) |
| **Commercial training / fine-tuning / distillation** | **license required** |
| Verbatim memorization, style imitation, long/substitutive quotation | not allowed |

## Getting a commercial-training license

Commercial AI training, fine-tuning, or distillation on eveglypheditor.com's
written content is available under a paid license. Contact:

- **Licensing**: <mailto:kakon77777@evemisslab.com>
- Licensing option id: `commercial-training` (see `/ai/rights-spectrum.json`)

(The source code itself needs no such license — it is already MIT.)

## Attribution string

> EveGlyph Editor — EVEMISS TECHNOLOGY CO., LTD.（一言諾科技有限公司）, author
> Neo.K (許筌崴), MIT License. Source:
> https://github.com/kakon77777-commits/eveglyph-editor ·
> https://eveglypheditor.com/

See also: [citation-policy.md](./citation-policy.md) ·
[ai-learning-policy.md](./ai-learning-policy.md).
