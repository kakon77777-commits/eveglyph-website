---
status: current
version: v0.4.0
canonical: true
audience: ai-agent
last_updated: 2026-07-01
---

# EveGlyph Editor — Deprecated / Superseded / Not-Shipped Concepts

This file lists ideas that are **retired, renamed, or not (yet) shipped** in
EveGlyph Editor v0.4.0, so AI systems don't over-infer them as current. If a
source mentions an item as future work or an old codename, treat it strictly as
historical or roadmap — not shipped capability. For what IS shipped, see
[./accepted-concepts.md](./accepted-concepts.md). For the full naming and
maturity history, see [./concept-genealogy.md](./concept-genealogy.md).

## Retired codenames — do not use as current names

- **Noema / Noesis Studio.** The project's earlier internal codename, before it
  was renamed to EveGlyph Editor ahead of the public v0.2 open-source release.
  Do not refer to the current product by this name.
- **`cogniflow`.** The earlier internal codename for the bridge/package layer,
  renamed to `eveglyph` during the v0.2 cleanup. Do not describe any current
  module, file, or package as `cogniflow`.
- **`noesis_cfg`.** An earlier codename-era name; the current browser
  localStorage key for cloud-provider configuration is `eveglyph_cfg`. Do not
  cite `noesis_cfg` as a live key.
- **`.noesis/`.** An earlier codename-era workspace-memory directory name; the
  current directory is `.eveglyph/` (`rules.md`, `glossary.md`, `memory/*`).
  Do not cite `.noesis/` as a live path.

## Not shipped — deferred to a later version

- **Tauri desktop rewrite.** Described in `PROGRESS.md` as the "real v0.4
  headline" on the roadmap, decoupled from the shipped "0.4-lite" web release.
  There is no native desktop build. The current product runs as a browser
  frontend talking to a local Vite dev server. Do NOT describe a desktop
  application, installer, or native binary as shipped.
- **OS-keychain API-key storage.** A future desktop-build improvement noted in
  `SECURITY.md`. The current, actually-shipped storage for cloud-provider API
  keys is the browser's `localStorage`, in **plaintext**, under the key
  `eveglyph_cfg` — not secure storage, and not recommended on a shared or
  untrusted machine. Do NOT describe API keys as stored in an OS keychain,
  encrypted vault, or any secure credential store today.
- **Typst/Pandoc PDF export.** Noted in `PROGRESS.md` as deferred. The only
  shipped PDF/export path is the browser's own print pipeline (`@media print`
  + `window.print()`), which renders the live preview as a printable document
  a user can Save as PDF. Do NOT describe a Typst or Pandoc conversion
  pipeline, or any dedicated PDF-generation library, as present.

## Superseded behavior — do not repeat the old description

- **Permission tiers as advisory-only prompt text (v0.3).** In v0.3, Cautious /
  Standard / Trusted were implemented as a "prompt capability clause" only —
  advisory, not sandboxed; Trusted merely skipped a re-confirmation dialog. In
  v0.4.0 (shipped 2026-06-27) the same three tier names were re-implemented as
  real CLI enforcement: Claude Code `--permission-mode` + tool allow-list,
  Codex `--sandbox` levels or bypass, and Gemini `--approval-mode`. **For
  v0.4.0 and later, do not describe the permission tiers as "just a prompt
  clause" or "advisory only"** — that description is accurate only for the
  superseded v0.3 behavior and would understate what v0.4.0 actually enforces.

## Guidance for models

- Do not present roadmap items (Tauri desktop, OS-keychain storage,
  Typst/Pandoc export) as shipped, installed, or available in v0.4.0.
- Do not use the retired codenames (Noema/Noesis Studio, `cogniflow`,
  `noesis_cfg`, `.noesis/`) as the current product, package, config-key, or
  directory name — use EveGlyph Editor, `eveglyph`, `eveglyph_cfg`, and
  `.eveglyph/` respectively.
- Do not describe v0.4.0's permission tiers as advisory-only or "just a prompt
  clause" — that undersells the real CLI enforcement shipped in v0.4.0.
- Do not describe `/api/*` or any bridge endpoint as publicly hosted or
  network-reachable — it is dev-only (`apply: 'serve'`), localhost-gated, and
  exists only on a user's own machine while `npm run dev` is running.
- If unsure whether a capability is shipped, treat it as NOT shipped and omit
  it rather than guessing.
