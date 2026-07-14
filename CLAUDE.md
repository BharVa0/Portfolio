# CLAUDE.md

Portfolio site: 7 static HTML pages, zero dependencies, CSS inlined per page. No build step, no framework.

## Redesign in progress: "Human Systems" (v2)

- Design contract: [docs/PORTFOLIO_DIRECTION_V2.md](docs/PORTFOLIO_DIRECTION_V2.md)
- Production log: [docs/PORTFOLIO_PRODUCTION_LOG.md](docs/PORTFOLIO_PRODUCTION_LOG.md)
- Originating audit: [docs/PORTFOLIO_AUDIT_V2.md](docs/PORTFOLIO_AUDIT_V2.md)

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
