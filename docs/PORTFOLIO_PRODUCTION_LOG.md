# Portfolio Production Log — "Human Systems" (v2)

Compact, reusable record of what shipped, when, and against which decision. Append one entry per work session or milestone — do not narrate day-to-day process. See [PORTFOLIO_DIRECTION_V2.md](PORTFOLIO_DIRECTION_V2.md) for the design contract and [PORTFOLIO_AUDIT_V2.md](PORTFOLIO_AUDIT_V2.md) for the originating audit.

---

## Entry template

```
### YYYY-MM-DD — <short title>

**Stage:** <Foundation | Pilot page | Homepage | Remaining pages | Asset pass | A11y/perf pass | Other>
**Scope:** <files touched, or "docs only">
**Did:**
- <what shipped, one line per item>

**Decisions:**
- <any new decision made this session, or "none">

**Verified:**
- <what was checked and how — e.g. "BETTR iframe + Kaltura players confirmed on deployed Pages URL", "contrast checked at AA for ember-deep on paper">

**Open:**
- <unresolved items carried forward, or "none">

**Commit:** <hash>
```

---

## Log

### 2026-07-14 — Homepage implementation: shared stylesheet, locked hero, editorial index, loader, cursor

**Stage:** Homepage
**Scope:** `index.html` (full rewrite), new `css/portfolio.css`, new `js/portfolio.js`, new `assets/favicon.svg`, new `assets/resume/Bharat-Vyas-Resume.pdf`, new `assets/frankenteen/frankenteen-hero-crop.jpg` (copied from the approved `/v2-preview/hero-a/` prototype). Project pages (`projects/*.html`) untouched — still on the old skin, per CLAUDE.md ("shared CSS architecture only after the prototype is approved" applies to full site-wide rollout; this session is homepage-only).
**Did:**
- Extracted a shared token/typography/component stylesheet (`css/portfolio.css`) — homepage-scoped for now, not yet applied to the six project pages.
- Built the locked hero (direction doc §11 final spec) directly on the real homepage: Concept A composition + Concept B's edge-pinned metadata frame, which doubles as the persistent site nav/chrome (Work / Practice / About / Contact anchors added to satisfy the "global navigation" requirement without introducing a second header above the hero).
- Implemented the 0–100 opening loader as a JS-inserted overlay: real-readiness tracking (font + hero image decode), clamped 0.8–1.4s, `sessionStorage`-gated skip on repeat visits, fully absent under `prefers-reduced-motion`, zero DOM footprint with JS disabled.
- Implemented the desktop-only contextual cursor: gated on `(hover: hover) and (pointer: fine)`, disabled under reduced motion, additive verb labels ("View" / "Play" / "Email") over project rows and the hero CTA, native cursor restored via `@media (hover: none), (pointer: coarse)`.
- Replaced the Gallery/Index toggle and six identical cards with one editorial project sequence: full-bleed feature rows for BETTR and FrankenTeen, compact rows (with or without a smaller image) for the other four, alternating per direction doc §6. CardioPal and Playing Freedom — confirmed to have zero real image assets in the repo — ship as intentional typography-led entries (left border accent replaces a media slot) rather than icon placeholders.
- Added Introduction, Practice, About, Contact and Footer sections, built from the site's own existing, already-approved copy (old hero eyebrow/sub, old capabilities grid, old closing CTA) tightened editorially, not rewritten from scratch — no new claims introduced.
- Wired real Contact links: `mailto:bharatvyask@gmail.com` (unchanged), LinkedIn (`linkedin.com/in/bharat-vyas-k-bb9680217`), GitHub (`github.com/BharVa0`, matches the repo's own git remote), and a real resume PDF now committed to the repo at `assets/resume/`. No dead placeholders ship.
- Added meta description, Open Graph tags (title/description/image), Twitter card, and an inline SVG favicon (`assets/favicon.svg` — ink field, serif "B", ember rule; no external asset pipeline).
- Added a skip-to-content link, visible focus states site-wide, `prefers-reduced-motion` guards around all animation (hero stagger, scroll reveals, loader, cursor), and reveal-on-scroll entrances for every section below the hero via `IntersectionObserver` (transform/opacity only).

**Decisions:**
- Nav is folded into the hero's own edge-pinned metadata frame rather than adding a second chrome layer above it, per the direction doc's "doubles as the site's persistent chrome starting point" — this was the natural reading of an ambiguous requirement (global nav item vs. locked hero spec) and is recorded here since it wasn't explicit in either doc.
- Per-project accent hex values (§9) remain unresolved except BETTR's documented `#EB5160` family, which is used for its feature-row hover state; all other project rows share the common `ember-bright` hover accent rather than five newly-invented hex values. Full per-project theming is deferred to when those pages themselves are re-skinned.
- Project years are omitted from the index entries (user decision) — no project page states a year anywhere in the source content, and fabricating one would violate the no-invented-claims rule. Title, medium, role and one-line ownership statement ship instead.
- FrankenTeen hero image ships with the known annotation-ring/gizmo-line artifact still visible — explicitly sanctioned as provisional by the direction doc. **Blocker unchanged, still open below.**

**Verified:**
- Local static server (`python -m http.server`, via `.claude/launch.json`) at `http://localhost:4173`.
- All 6 project links, all 3 external contact links' hrefs, and the resume PDF confirmed reachable (`fetch` HEAD checks, all 200; external links checked by href inspection since same-origin fetch doesn't apply).
- No horizontal overflow (`scrollWidth === clientWidth`) at 375 / 768 / 1280 / 1600px.
- Reveal-on-scroll bug caught and fixed: the original script ran as a blocking tag before the DOM it queried (`.reveal`, `[data-cursor]`, hero image) existed, so `querySelectorAll` returned nothing and every section below the hero stayed permanently at `opacity:0`. Fixed by splitting into a tiny inline early script (sets `pending`/`can-animate`/`has-custom-cursor` classes and inserts the loader overlay before first paint) and the main `js/portfolio.js` logic moved to the end of `<body>`, after real content exists.
- Reduced motion verified via headless Chrome with `--force-prefers-reduced-motion` (same technique as the earlier hero-concept sprint): `<html>` carries only the `ready` class (no `pending`, `can-animate`, or `has-custom-cursor`); hero renders complete with no loader flash.
- Keyboard navigation checked by tabbing from page load: skip-link receives focus first with a visible outline, then the nav links, then the hero CTA, in source order.
- Console checked clean (no errors) at every tested viewport and motion state.
- Touch/coarse-pointer fallback verified by code path (`(hover: hover) and (pointer: fine)` gate plus a `@media (hover: none), (pointer: coarse)` CSS backstop that force-hides `.cursor-dot`) — **not** verified on a real touch device or full CDP touch emulation, since the available browser tooling here only varies viewport size, not input capability.

**Open:**
- **Blocker carried:** FrankenTeen hero re-capture without the annotation ring/gizmo lines before final approval (unchanged from prior entries).
- Per-project accent hex values (FrankenTeen, CardioPal, Echoes, Smartphone Mold/Playing Freedom) still undecided — deferred to the remaining-pages stage.
- CardioPal and Playing Freedom still have no real image assets anywhere in the repo; homepage ships them as typography-led entries per the direction doc's explicit allowance, but this is not the same as "resolved" per audit §6.
- Optional homepage "currently" line (direction doc §6) not added — no factual value to put in it was available this session.
- The six project pages themselves are untouched — still on the pre-redesign skin. `css/portfolio.css` is homepage-scoped only; rolling it out site-wide is the next stage.
- Touch-device verification of the cursor fallback and loader on an actual mobile browser is still outstanding.

**Commit:** `Implement Human Systems homepage` (hash in git history — this entry ships in that commit)

### 2026-07-14 — Final creative brief: hero foundation locked, reference system recorded

**Stage:** Foundation
**Scope:** docs only (`PORTFOLIO_REFERENCES_V2.md` new, `PORTFOLIO_DIRECTION_V2.md`, `CLAUDE.md`, this log). No public page, `/v2-preview/`, or `assets/bettr-live/**` touched.
**Did:**
- Evaluated hero concepts A/B/C (code review + 1440px reduced-motion screenshots) against memorability, positioning clarity, authorship, typography, composition, relationship to real work, generic-AI risk, and homepage suitability.
- **Locked Concept A as the hero foundation**, absorbing exactly two moves from B (edge-pinned mono metadata frame, larger name scale); C retired. Rationale: A is the only concept where "the work is real" lands in five seconds via a legible human-scaled image; B's evidence signal is too abstract; C's 488px source fails at desktop scale.
- Wrote the locked "Final hero specification" into the direction doc §11: composition, type hierarchy, colour distribution, image strategy, metadata placement, selected-work route, 0–100 loader (0.8–1.4s, real-readiness counter, skip on repeat visit, absent under reduced motion, JS-overlay only), desktop-only contextual cursor (pointer-fine gating, additive verb, disabled under reduced motion), desktop/mobile principles, and removed elements.
- Created `PORTFOLIO_REFERENCES_V2.md`: four reference roles (Pauline Stein — atmosphere/register; George Paul — case-study structure/per-project worlds; Russell Numo — hero minimalism/loader/cursor; Vivid Motion — interaction-polish ceiling), each with explicit use-for / do-not-copy lists; direction doc always wins.
- Amended §10 motion principles: loader and cursor are the two sanctioned additions; transform/opacity-only animation rule added.
- CLAUDE.md: added reference-map pointer and two stable rules (hero locked / loader+cursor motion boundary).

**Decisions:**
- Hero foundation: Concept A + B's metadata frame (hybrid justified as foundation-plus-absorption, not element collage).
- Loader counter must track real asset readiness (font + hero image), clamped 0.8–1.4s, session-skipped, absent under reduced motion.
- Custom cursor is desktop-only, additive, and disabled under reduced motion.

**Verified:**
- All three concepts re-screenshotted at 1440×900 via headless Chrome with `--force-prefers-reduced-motion` (final states, no mid-animation captures); evaluation based on rendered output plus source review.
- Spec cross-checked against a11y/motion checklist: transform/opacity-only, no blocking animation, exit-faster-than-enter, reduced-motion removal of loader and cursor, LCP image not lazy-loaded.

**Open:**
- **Blocker carried:** FrankenTeen hero re-capture without annotation ring/gizmo lines before homepage approval.
- Carried: per-project accent hex values; CardioPal/Playing Freedom imagery.

**Commit:** `Finalise Human Systems creative brief` (hash in git history — this entry ships in that commit)

### 2026-07-14 — Hero concept sprint (three isolated directions)

**Stage:** Other (isolated `/v2-preview/` prototyping, per Approved amendment #1)
**Scope:** `v2-preview/hero-{a,b,c}/index.html`, three derived image crops, `v2-preview/crop-hero-images.ps1` (documented crop tooling). No public page, shared styling, or `assets/bettr-live/**` touched.
**Did:**
- Built three structurally distinct hero covers, each self-contained (inlined CSS, no JS, direction-doc palette/type roles, single "Selected work" link):
  - **A — Warm editorial image** (`/v2-preview/hero-a/`): asymmetric 7/5 split; oversized Fraunces name low-left; FrankenTeen bedroom crop (warm rug) bleeding off the top-right edge with warm tonal overlay and mono caption. *Idea:* real, human-scaled project evidence beside the claim. *Strength:* warmth + authenticity. *Risk:* design-doc annotation ring remains visible in the crop. *Asset:* `assets/frankenteen/world-map.jpg` → `frankenteen-room-crop.jpg`.
  - **B — Typographic tension** (`/v2-preview/hero-b/`): two-line offset name at maximum scale, tiny mono metadata pinned to frame edges, one concentrated ember field on the right edge holding a narrow BETTR motif fragment. *Idea:* title-page authority through negative space. *Strength:* legibility and restraint. *Risk:* leans abstract — weakest "the work is real" signal. *Asset:* `assets/bettr/dashboard-thumb-crop.jpg` → `bettr-motif-strip.jpg`.
  - **C — Project atmosphere** (`/v2-preview/hero-c/`): dominant Echoes room viewport treated as a blurred/toned editorial photograph; solid-ink text panel overlaps its lower edge; mono caption chip. *Idea:* one atmospheric image carries the portfolio's character. *Strength:* most distinctive first impression. *Risk:* 488px source depends on the tonal treatment at large sizes; in-scene editor artefacts remain. *Asset:* `assets/echoes/room-scene.jpeg` → `echoes-room-crop.jpg`.
- All crops derived from real repository images via `crop-hero-images.ps1` (records exact crop rectangles); sources untouched.
- Shared behaviours: semantic h1 → statement hierarchy, keyboard-focusable primary link with visible focus style, all essential information as text, one ≤0.6s staggered CSS entrance under a `prefers-reduced-motion` guard, content fully visible without JavaScript.

**Decisions:**
- No winner chosen — the three routes exist for side-by-side review, per the sprint brief.
- Derived hero crops live inside their concept folder, not in global `assets/`, keeping the sprint isolated.

**Verified:**
- Headless Chrome: `scrollWidth == clientWidth` (no horizontal overflow) for all three pages at 375/768/1280/1600px.
- Screenshots reviewed at all four widths per concept: no illegible overlaps or broken line-wraps; name, statement, metadata and the "Selected work" link sit inside the first viewport at every width; mobile stacks text before imagery.
- Note: bare `--window-size=375` headless screenshots are unreliable (Chrome clamps window width to ~500px); measurements and mobile screenshots were taken through a 375px iframe harness instead.
- Contrast: paper-on-ink body text and muted mono metadata on ink pass AA; ember is confined to rules, underlines, one accent phrase at display size, and the concept-B field (no body text sits on ember).

**Open:**
- Winner selection + any hybridisation of the three directions.
- Concept A/C source captures contain editor annotations (ring marker, gizmo lines, pink marker) — cleaner captures or re-exports would strengthen either direction if chosen.
- Same items carried from prior entries (per-project accent hex values, CardioPal/Playing Freedom imagery).

**Commit:** `Explore Human Systems hero directions` (hash in git history — this entry ships in that commit)

### 2026-07-14 — Direction document defined

**Stage:** Foundation
**Scope:** docs only (`PORTFOLIO_DIRECTION_V2.md`, `PORTFOLIO_PRODUCTION_LOG.md`, `CLAUDE.md`)
**Did:**
- Wrote the full design contract: concept, principles, palette, typography roles, grid/spacing, homepage/project-page structure, image treatment, per-project accents, motion, responsive rules, accessibility requirements, anti-patterns, evidence/ownership/embed preservation rules, and the Hero System section.
- Recorded approved architecture decisions in CLAUDE.md.

**Decisions:**
- None beyond what's recorded in the direction doc and CLAUDE.md — no HTML/CSS/JS was touched this session.

**Verified:**
- N/A — documentation only, no runtime surface to check.

**Open:**
- Final hero composition not yet selected — to be resolved via isolated visual prototypes (`/v2-preview/`) per Approved amendment #1.
- Per-project accent hex values beyond BETTR's existing `#EB5160` family not yet finalized (FrankenTeen, CardioPal, Echoes, Smartphone Mold/Playing Freedom).
- CardioPal and Playing Freedom imagery not yet sourced.

**Commit:** _pending_

### 2026-07-14 — Content editing rule clarified

**Stage:** Foundation
**Scope:** docs only (`CLAUDE.md`, `PORTFOLIO_DIRECTION_V2.md`)
**Did:**
- Replaced the "preserve verbatim / no cutting" wording with an explicit rule: preserve all factual substance, evidence, ownership statements, research findings, testing results and honest limitations; editorial tightening, reordering, shortening and removal of repetition are allowed, but no claim may be fabricated, exaggerated or materially changed.

**Decisions:**
- Content-preservation rule clarified as above; no other decisions changed.

**Verified:**
- N/A — documentation only, no runtime surface to check. Confirmed no HTML/CSS/JS files were touched.

**Open:**
- Same as prior entry (hero composition, per-project accent hex values, CardioPal/Playing Freedom imagery).

**Commit:** _pending_
