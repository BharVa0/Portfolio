# CLAUDE.md

Portfolio site: 7 static HTML pages, zero dependencies, CSS inlined per page. No build step, no framework.

## Redesign in progress: "Human Systems" (v2)

- Design contract: [docs/PORTFOLIO_DIRECTION_V2.md](docs/PORTFOLIO_DIRECTION_V2.md)
- Production log: [docs/PORTFOLIO_PRODUCTION_LOG.md](docs/PORTFOLIO_PRODUCTION_LOG.md)
- Originating audit: [docs/PORTFOLIO_AUDIT_V2.md](docs/PORTFOLIO_AUDIT_V2.md)
- Reference map: [docs/PORTFOLIO_REFERENCES_V2.md](docs/PORTFOLIO_REFERENCES_V2.md) — external references are calibration only; the direction doc always wins.

## Approved architecture decisions

- Remain static HTML/CSS/JS — no Astro migration (revisit only past ~15 projects or if a blog is added).
- Prototype the new visual direction in an isolated `/v2-preview/` before refactoring global CSS or touching public pages.
- Do not extract a shared stylesheet across the 7 pages until the prototype is approved.
- Keep existing routes/URLs unchanged.
- Never modify `assets/bettr-live/**` — it's a shipped build; GitHub Pages is case-sensitive and its `@font-face` paths depend on exact casing.
- Never change the BETTR iframe's relative path (`../assets/bettr-live/index.html`).
- One editorial project sequence on the homepage instead of the Gallery/Index toggle duplication.
- Preserve all factual substance, evidence, ownership statements, research findings, testing results and honest limitations. Editorial tightening, reordering, shortening and removal of repetition are allowed, but no claim may be fabricated, exaggerated or materially changed.
- Create the shared CSS architecture only after the prototype is approved.
- **Superseded 2026-07-16:** ~~Hero foundation is locked: Concept A (`v2-preview/hero-a/`) plus Concept B's edge-pinned metadata frame; full spec in the direction doc §11 "Final hero specification". Do not create new hero alternatives.~~ See below and direction doc §11 "Hero direction — reopened 2026-07-16".
- **Superseded 2026-07-16 (rejected):** ~~Hero direction: two prototypes approved for isolated development in `/v2-preview/`: **Concept D "Field Notes"** (restrained control) and **Concept E "Instrument Panel"** (expressive signature).~~ **Concept D and Concept E are visually rejected** — both retained the earlier small, lower-left editorial composition, left most of the viewport unused, and treated interaction as a minor text gimmick rather than a strong kinetic typographic hero. They must not be integrated into any public page. Their commits (`Prototype image-free homepage hero directions`) remain in history as prototype evidence only, not as a foundation to refine. See direction doc §11 "Hero direction — prototypes D/E rejected, 2026-07-16" for the current, authoritative decision.
- **Superseded 2026-07-17:** ~~Hero direction (current, 2026-07-16): the homepage hero must still be image-free and typography-led — no project screenshot, portrait, or stock image may appear in it. The existing warm-black/paper-white/ember visual system carries forward unchanged. The next prototype is one focused direction, **"Hero G — Kinetic Thesis Field"**, built to use the full viewport and to make interaction/motion the hero's primary structural idea rather than a minor accent. It stays isolated under `/v2-preview/` until approved — no public homepage change is authorised yet. `docs/HERO_21ST_RESEARCH.md` (21st.dev) remains an interaction-reference source only: mechanics may inform original vanilla implementations, but components must never be copied wholesale, and no React/Tailwind dependency may enter the production portfolio.~~ Hero G is now approved — see below.
- **Hero direction — approved, 2026-07-17.** **Hero G, "Kinetic Thesis Field"** (`v2-preview/hero-g-kinetic-thesis/index.html`) is the approved homepage hero direction, full spec in direction doc §11 "Hero direction — Hero G approved, 2026-07-17". Heroes A (`v2-preview/hero-a/`), D (`v2-preview/hero-d-field-notes/`) and E (`v2-preview/hero-e-instrument-panel/`) remain retired prototype history — not a foundation to build on. The hero is image-free and typography-led: no project screenshot, portrait, or stock image. The existing warm-black/paper-white/ember visual system carries forward unchanged. Locked composition: the four oversized kinetic thesis bands (overshooting both viewport edges), the asymmetric "Bharat Vyas" knockout (~38% horizontal centre — intentional, must not be automatically recentred), the rectangular pointer-follow inspection lens with its clipped-ember text reveal, the SYSTEM/PLAY/RESEARCH/BEHAVIOUR contextual labels, the first-visit 0–100 loader, the masked-track entrance, and the natural-scroll handoff. `docs/HERO_21ST_RESEARCH.md` (21st.dev) informed masking and pointer-follow mechanics only — no component was copied or installed, and no React/Tailwind dependency entered the production portfolio. **No public homepage integration has happened yet** — `index.html`, `css/portfolio.css`, and `js/portfolio.js` are untouched by this decision. Future integration work may tune implementation details (compatibility, accessibility, performance) without materially changing the approved composition.
- The opening loader and contextual cursor are the only motion beyond entrances/hover; both are absent under `prefers-reduced-motion` and specified in direction doc §11.
