# Portfolio Direction — "Human Systems" (v2)

**Status:** Approved · **Branch:** `redesign-v2` · **Source:** [PORTFOLIO_AUDIT_V2.md](PORTFOLIO_AUDIT_V2.md)
**Hero status:** reopened 2026-07-16 — the Concept A (FrankenTeen-image) hero is retired; the hero direction is now image-free and typography-led. See §11 "Hero direction — reopened 2026-07-16".

This document is the design contract for the redesign. It defines what "Human Systems" looks like, not how the CSS is engineered — that comes later, per the architecture decisions in [CLAUDE.md](../CLAUDE.md).

---

## 1. Creative concept: Human Systems

The portfolio reads as an **editorial record of systems designed around human behavior** — not a developer terminal, not a SaaS product page. Every project is evidence that a person studied how people actually behave and built something in response. The visual language borrows from **print editorial and field documentation** (typographic authority, warm paper tones, restrained mono annotations) rather than software-dashboard chrome (scan lines, status dots, glow, cool navy).

The reader should feel they are handling a **well-made object** — a monograph or a lab notebook — not operating a UI.

## 2. Design principles

1. **Editorial, not dashboard.** No scan lines, glow, status dots, or terminal framing. Typography carries authority; chrome stays quiet.
2. **Warm, not cool.** The palette is ember/paper/charcoal — never navy, cyan, or neon.
3. **Restraint as craft.** Mono type and the ember accent are used sparingly and consistently, so their appearance always signals "metadata" or "emphasis" — never decoration.
4. **Content-first.** The existing thesis → artifact → numbered sections → evidence → reflection structure is the spine of every page and is not renegotiable by visual design.
5. **One system, per-project accents.** A single shared visual grammar (type, grid, spacing, motion) flexes per project through accent color and image treatment only — never through structural or typographic reinvention per page.
6. **Evidence over decoration.** Real screenshots, real embeds, real credit lines. No stock imagery, no placeholder icons standing in for unbuilt assets.

## 3. Global palette

```css
--ink: #0D0C0B;         /* primary dark surface */
--ink-soft: #151311;    /* secondary dark surface, cards on dark */
--charcoal: #1D1A18;    /* tertiary dark surface, borders on dark */
--ember: #B84624;       /* primary accent */
--ember-deep: #7B2D17;  /* accent shadow / pressed / border on dark */
--ember-bright: #D35C34;/* accent highlight / hover, large-scale only */
--paper: #F2EEE9;       /* primary light surface, dark-surface text */
--paper-soft: #DDD6CF;  /* secondary light surface, cards on paper */
--muted: #91877F;       /* tertiary text, captions, disabled states */
```

Usage rules:
- Dark pages (default): `ink`/`ink-soft`/`charcoal` surfaces, `paper` text, `ember` family for accents only.
- Light ("paper") sections: `paper`/`paper-soft` surfaces, `ink` text, `ember-deep` for accents (better contrast on light).
- `ember-bright` is reserved for large display type, rules, and backgrounds — **never** body-size text on `paper` (fails WCAG AA; see §10).
- `muted` is for captions and metadata only, never for primary body copy.
- Per-project accent tokens (§8) substitute for `ember`/`ember-deep`/`ember-bright` on that project's page only; `ink`/`paper`/`muted` stay constant across all pages.

## 4. Typography roles

| Role | Typeface | Used for |
|---|---|---|
| Display | Contemporary editorial serif (Fraunces, Newsreader, or GT Alpina–class) | Hero statement, page titles, section-opening statements |
| Body / interface | Inter | Paragraph copy, nav, buttons, labels, credit grids |
| Metadata / numbering | Space Mono | Section numbers, dates, role/medium/tool tags, timestamps, breadcrumbs |

Rules:
- Never use the serif for UI chrome (nav, buttons) — it is reserved for editorial statements.
- Never use Space Mono for body paragraphs — it is a metadata signal, not a reading face, and overuse (e.g. the old `SYS // PORTFOLIO.IDX` conceit) is the exact terminal aesthetic being rejected.
- Inter carries everything that isn't a display statement or metadata.

## 5. Grid and spacing

- Content max-width: an editorial column (~720–840px for reading text; project index and hero may run full-bleed within an outer page margin).
- Base spacing unit: 8px scale (8/16/24/32/48/64/96) — consistent across all pages so per-project accents don't fragment rhythm.
- Section numbering (existing mono system) stays left-aligned to the content column, not floated into a sidebar gutter, to preserve the current scan path.
- Full-bleed imagery is permitted to break the column but must return to the column grid for the text that follows it.

## 6. Homepage structure

1. **Hero** — see §11 Hero System.
2. **Editorial project index** — replaces the six identical rounded cards and the Gallery/Index toggle (Approved amendment #4). Alternating full-bleed feature rows (BETTR, FrankenTeen) and compact entries, varied crops/scales, per-project accent on hover. Each entry shows role, medium, year, and one ownership line without interaction.
3. **Contact / CTA** — working LinkedIn, GitHub, Resume links (dead placeholders are an explicit blocker per the audit).
4. Optional: a short "currently" line near the contact CTA.

No duplicated markup for a second view mode. One sequence serves both the scanning recruiter and the reading recruiter.

## 7. Project-page structure

Re-skin, don't restructure — the existing page anatomy stays:

1. Breadcrumb / prev-next chain (mono).
2. Thesis statement (serif).
3. Artifact-first embed (live build, prototype, or video) — stays above the writing except where §8 notes a cinematic image opens the page instead.
4. Numbered sections (mono numerals + serif/Inter body).
5. Evidence (screenshots, testing data, credit grid).
6. Reflection.

## 8. Image treatment

- Cinematic wide crops, not full editor-window screenshots with chrome — recrop BETTR dashboard, Echoes room, FrankenTeen world-map detail per audit §6.
- Every image: explicit `width`/`height` attributes (prevent layout shift) and `loading="lazy"` below the fold.
- CardioPal and Playing Freedom require real project imagery before homepage approval (Approved amendment #6) — device-framed Figma exports and a documentary poster frame respectively. No icon placeholders in the shipped version.
- Each project page opens with a full-width cinematic image before its embed, **except BETTR**, where the live build is the hero and stays first.

## 9. Project-specific visual identities

One shared grammar, per-project accent via a body class (≈6 CSS variables each), applied only after the shared prototype is approved (§13):

| Project | Accent direction |
|---|---|
| BETTR | Keeps its documented `#EB5160` family — an existing, shipped identity, not reinvented. |
| FrankenTeen | Zine-adjacent treatment — leans into its existing credit-grid/collage character. |
| CardioPal | Calmer, clinical-adjacent accent — distinct from BETTR's energy. |
| Echoes | Warm/nostalgic accent, consistent with its subject matter. |
| Smartphone Mold, Playing Freedom | Warm-white ("paper") sections — editorial contrast for research-heavy, writing-led pages, using `ember-deep` as accent. |

Accents change color only — typography, grid, spacing, and motion stay uniform across every project page.

## 10. Motion principles

- Motion is confined to entrances (fade/rise on scroll-into-view) and hover/focus feedback — never ambient/looping (no scan lines, no pulsing status dots).
- All animation is wrapped in a `prefers-reduced-motion` guard; reduced-motion users get instant state changes, no exceptions.
- Any toggle/interactive control that survives the redesign carries correct ARIA state (the old Gallery/Index toggle did not).
- Two sanctioned additions beyond the above, both fully specified in §11 and both absent under reduced motion: the first-visit opening loader (a single title beat tied to real asset readiness, not ambient motion) and the desktop-only contextual cursor (functional feedback over links/media, not decoration).
- Animation uses `transform`/`opacity` only — never width/height/top/left (no layout-shifting motion).

## 11. Hero System

The hero is the portfolio's **editorial cover** — a title page and thesis statement for the whole body of work — not a product-landing banner selling a single CTA. It sets the reading register (warm, authored, restrained) before the reader sees a single project.

### 5-second communication goal
In five seconds, a recruiter should register: **who this is, what discipline they work in, and that the work is real** (not a template). Name + positioning statement + one glimpse of real project imagery must land before any scrolling.

### Message hierarchy
1. Name (largest, serif display).
2. Positioning statement — one sentence naming the "Human Systems" thesis in plain language (not the phrase itself as jargon, but its meaning: designing for real human behavior).
3. Metadata line (mono) — role, location, availability/"currently" status.
4. Primary route into selected work (see below) — visually present but not competing with the name for weight.

### Name, positioning statement and metadata roles
- **Name:** serif display, largest element on the page, sets the editorial register immediately.
- **Positioning statement:** Inter or serif (not mono) at a secondary display size — one sentence, not a paragraph. Reads like a monograph subtitle, not a tagline.
- **Metadata roles:** Space Mono, small size — role/location/availability only. This is where the old status-bar conceit's *function* survives, stripped of its terminal styling (no brackets-as-decoration, no blinking, no `//` separators).

### Recommended viewport height
Target **80–100vh on desktop**, not a forced full 100vh lock — the hero should feel generous but must not trap the reader above a hard fold that hides the project index. On mobile, allow natural content height (no forced full-viewport hero) so the positioning statement and route into work stay above an awkward scroll gap.

### Typography scale and line-breaking principles
- Name: largest scale in the entire site's type ramp.
- Positioning statement: deliberate, authored line breaks (not browser-wrapped) — break at clause boundaries so each line is a complete phrase, editorial-caption style.
- No more than 2–3 lines for the positioning statement at any viewport; if it wraps further on mobile, shorten the statement rather than letting it degrade.

### Image strategy using real project imagery — SUPERSEDED 2026-07-16
> **Superseded.** This subsection described the now-retired Concept A hero, which required real project imagery. The current direction is image-free (see "Hero direction — reopened 2026-07-16" below) — no project screenshot, portrait, or stock image may appear in the hero. Kept below for historical reference only; the production log carries the full decision history.

- The hero must include **real project imagery** — a cinematic crop from an actual project (BETTR or FrankenTeen, the two strongest visual identities) — not abstract texture, stock photography, or a generated pattern.
- Image is a supporting element, not a full-bleed background that competes with the name for contrast — treat it as a single strong photographic anchor (e.g., a partial-bleed panel or offset frame), not wallpaper behind text.
- Any text overlaid on the image must maintain WCAG AA contrast — prefer placing text on a solid `ink`/`paper` field beside or below the image rather than atop it.

### Color distribution
- Base: `ink` surface, `paper` text — dark, warm-black, not navy.
- `ember` family: punctuation only — a rule, an underline, one accent word, or a border on interactive elements. Never a background fill behind body-size text.
- **Superseded 2026-07-16:** ~~The image itself supplies the only large area of non-ink color; do not add a colored background block competing with it.~~ No longer applicable — the hero is image-free, so there is no image panel to reference. The `ink` field stays the only large-area color; any grain, texture, or motion treatment added under the image-free direction must stay within the existing `ink`/`ember`/`paper` palette and the restraint rule above.

### Relationship between image and typography — SUPERSEDED 2026-07-16
> **Superseded.** Not applicable to the image-free direction — there is no image to relate to the typography. Kept below for historical reference only.

- Typography and image occupy **distinct zones** — they do not overlap except for minimal, high-contrast accents (e.g., a mono metadata tag on a solid chip over the image edge). This keeps the name legible at a glance and keeps the image legible as evidence, not backdrop.
- The image should feel like it's illustrating the positioning statement's claim (human behavior, real systems) — proximity implies causality even without a caption.

### Desktop and mobile composition rules — SUPERSEDED 2026-07-16
> **Superseded.** Described the retired image-bearing split composition. The image-free direction replaces this with whatever single-column or typographic composition each prototype (Concept D "Field Notes", Concept E "Instrument Panel") defines — see `docs/HERO_21ST_RESEARCH.md` and the prototypes themselves under `/v2-preview/`. Kept below for historical reference only.

- **Desktop:** name/statement/metadata block and image panel sit side-by-side or in a clear asymmetric split (e.g., 60/40 or 55/45) — never centered-hero-over-full-bleed-photo.
- **Mobile:** stack vertically, text block first (name → statement → metadata → route-into-work), image second or interleaved as a supporting element below the fold of the text — mobile recruiters read the name and statement before any image loads.
- Route into selected work (see below) is reachable without scrolling past the image on both breakpoints.

### Entrance-motion budget
- One entrance pass only: a single staggered fade/rise across name → statement → metadata → image (≤ ~600ms total, ≤ 4 staggered elements). No looping, no scan effects, no cursor-blink.
- Budget is intentionally small — the hero should feel *composed*, already-arrived, not performing an intro sequence.

### Reduced-motion behaviour
- Under `prefers-reduced-motion: reduce`, all hero elements render in their final state immediately — no fade, no stagger, no transform. This is a hard requirement, not a graceful-degradation nice-to-have (audit §7).

### Primary route into selected work
- A single, clearly primary link/button (not a generic "scroll down" affordance) naming the destination in editorial voice (e.g., "Selected work" rather than a bare arrow) that leads into the project index (§6).
- This is the hero's only interactive CTA — it does not compete with secondary nav (contact, resume), which stays in the persistent site chrome, not the hero.

### Explicit hero anti-patterns
- **New, 2026-07-16:** No project screenshot, portrait, or stock image of any kind in the hero — the direction is now image-free (see "Hero direction — reopened 2026-07-16" below). This supersedes the imagery-specific bullets below, which described the retired Concept A hero and are kept for historical reference.
- No scan-line animation, glow, status dots, or terminal-window framing.
- No looping/ambient motion of any kind.
- ~~No stock photography or abstract generative texture standing in for real project imagery.~~ *(superseded 2026-07-16 — moot under the image-free direction; no imagery of any kind appears)*
- ~~No full-bleed photographic background with text stacked on top competing for contrast.~~ *(superseded 2026-07-16 — moot under the image-free direction)*
- No centered "product landing page" composition (logo-mark + big centered headline + centered CTA button) — this is a monograph cover, not a SaaS hero.
- No mono-font headline treatment for the name or positioning statement — mono is metadata-only (§4).
- No forced 100vh hero that hides the start of the project index on common laptop viewports.

### Hero direction — reopened 2026-07-16 (Concept A retired)

**Status: current, authoritative.** This supersedes "Final hero specification — locked 2026-07-14" below, which is retained underneath for historical reference only.

**Decision:**
- The FrankenTeen-image Concept A hero (and its Concept B metadata-frame hybrid) is **retired**. It is no longer the locked foundation.
- The final homepage hero **must be image-free and typography-led**. No project screenshot, portrait, or stock image of any kind may appear in the hero.
- The existing warm-black (`ink`), paper-white (`paper`) and ember (`ember`/`ember-deep`/`ember-bright`) visual system (§3) remains unchanged — the image-free direction is a compositional change, not a palette change.
- The hero should be **minimal when static and expressive through motion or interaction** — restraint at rest, with an earned interaction or motion moment carrying the personality, within the existing motion budget (§10).
- **21st.dev is an interaction-reference source only.** Mechanics researched there (`docs/HERO_21ST_RESEARCH.md`) may inform original vanilla implementations. Components must never be copied wholesale, and no React/Tailwind dependency may be introduced into the production portfolio — it remains static HTML/CSS/JS per CLAUDE.md's architecture decisions.
- **Concept D, "Field Notes,"** is the restrained control prototype.
- **Concept E, "Instrument Panel,"** is the expressive signature prototype.
- **Concept F, "Playtest Log,"** is reclassified: no longer a competing full hero direction, but an optional scroll-linked transition mechanic that either prototype (or the eventual shipped hero) may selectively adopt for the hero → Selected Work handoff.
- Both Concept D and Concept E must remain isolated under `/v2-preview/` until one is approved — consistent with the existing "prototype in isolation before touching public pages" rule (CLAUDE.md).
- **No public homepage change is authorised yet.** `index.html`, `css/portfolio.css`, and `js/portfolio.js` stay on the current (Concept A) hero until this decision produces an approved, built replacement.

All other §11 content not specifically about the image — message hierarchy, positioning-statement roles, metadata roles, recommended viewport height, typography scale/line-breaking, entrance-motion budget, reduced-motion behaviour, primary route into selected work, and the general (non-imagery) anti-patterns — remains in force and applies equally to whichever image-free concept is ultimately approved.

### Hero direction — prototypes D/E rejected, 2026-07-16

**Status: current, authoritative.** This supersedes the "Concept D, Field Notes" / "Concept E, Instrument Panel" prototyping decision recorded immediately above, which is retained above for historical reference only.

**Decision:**
- **Concept D ("Field Notes") and Concept E ("Instrument Panel") are visually rejected.** They must not be integrated into any public page, and neither is to be refined further — they are not a foundation to build on.
- **Why:** both prototypes retained the earlier hero's small, lower-left editorial composition instead of genuinely rethinking it for an image-free brief; both left most of the viewport unused rather than committing to full-viewport typographic dominance; and both treated interaction (Concept D's line-cascade, Concept E's cursor-torch phrase reveal) as a minor text-level gimmick rather than the strong kinetic typographic hero the image-free direction calls for.
- Their commits (`Prototype image-free homepage hero directions`, `v2-preview/hero-d-field-notes/`, `v2-preview/hero-e-instrument-panel/`) remain in git history as prototype evidence only — a record of what was tried and rejected, not code to iterate on. The directories are not deleted, but no future session should treat them as a starting point.
- The homepage hero remains image-free and typography-led (unchanged from the reopened direction above): no project screenshot, portrait, or stock image; the existing warm-black/paper-white/ember visual system carries forward unchanged.
- **The next prototype is one focused direction: "Hero G — Kinetic Thesis Field."** Rather than another pair of small-scale alternatives, this is a single direction built to use the full viewport and to make interaction/motion the hero's primary structural idea — the name and positioning statement should read as a kinetic typographic event, not a quiet corner composition with a minor pointer effect layered on top. Concept G stays isolated under `/v2-preview/` until it is itself reviewed and approved.
- **No public homepage change is authorised yet.** `index.html`, `css/portfolio.css`, and `js/portfolio.js` stay on the current (Concept A) hero until Concept G — or whatever direction eventually succeeds it — produces an approved, built replacement.

### Final hero specification — SUPERSEDED 2026-07-16 (historical: Concept A + B hybrid)

> **Superseded 2026-07-16.** Concept A is retired; see "Hero direction — reopened 2026-07-16" above for the current, authoritative decision. This section is preserved below for historical reference — do not build against it.

**Selected foundation: Concept A ("warm editorial image", `v2-preview/hero-a/`)**, absorbing exactly two moves from Concept B: the edge-pinned mono metadata frame and a larger name scale. Concept C is retired. Rationale: A is the only concept where "the work is real" lands within five seconds through a legible, human-scaled image — the FrankenTeen bedroom literally pictures a system designed around human behaviour. B's authority is typographic but its only evidence is an illegible abstract strip; C's 488px source (gizmo lines, pink marker) fails at desktop scale and its blurred-photo-plus-panel pattern is the most template-like of the three. This is a foundation-plus-absorption, not an element collage: everything else in B and C is dropped.

External calibration for this spec is recorded in [PORTFOLIO_REFERENCES_V2.md](PORTFOLIO_REFERENCES_V2.md); that document never overrides this one.

**Composition**
- Asymmetric 7/5 split (text left, image right) on desktop, ~92vh, never a hard 100vh lock.
- Name block sits low-left, baseline-anchored toward the fold; the image bleeds off the top and right viewport edges (no contained "card" framing), with a thin `ember-deep` border on its inner edges and a right-aligned mono caption beneath.
- Replaced from Concept A: the floating "Portfolio · 2026" eyebrow + short rule is replaced by Concept B's full-width edge-pinned metadata frame (see Metadata placement).

**Typography hierarchy**
1. Name — Fraunces, light-to-regular optical weight, scaled up from Concept A toward Concept B's presence (target `clamp(3.6rem, 10vw, 10rem)`), single line, tight leading.
2. Positioning statement — Fraunces at secondary display size, three authored line breaks, exactly: *"I design interactive systems, playable worlds and research-led experiences."* One italic `ember-bright` accent phrase ("interactive systems") maximum.
3. Metadata — Space Mono small caps-free, `muted`.

**Colour distribution**
- `ink` base, `paper` text. Ember appears only as: the statement's single accent phrase, the CTA underline, and the image-frame border. Concept B's large ember field is **not** carried over — the photograph supplies the only large non-ink area.

**Image strategy**
- Real project imagery only. Launch asset: the FrankenTeen bedroom crop (warm rug, top-down) with the existing warm tonal overlay recipe. **Blocker before homepage approval:** re-capture the scene without the annotation ring and gizmo lines (clean Unity capture or re-export); the current crop is a placeholder standard, not the shipped standard.
- Explicit `width`/`height`, no lazy-loading (it is the LCP element), `fetchpriority="high"`.

**Metadata placement**
- Top frame (from Concept B): "Bharat Vyas · Portfolio" left, "Edinburgh, UK · 2026" right, hairline `charcoal` rule beneath — this doubles as the site's persistent chrome starting point.
- Degree/location block (Space Mono, `muted`) sits beside the CTA in the lower text block, never overlapping the image.

**Route into selected work**
- One CTA only: "Selected work →", Inter medium, `ember` underline, leading to the editorial project index (§6). Keyboard-focusable with a visible `ember-bright` outline. No scroll hints, no secondary hero CTAs.

**Opening loader (0–100)**
- First visit only: a full-viewport `ink` field with a single Space Mono counter (00–100) plus the name in small mono — a title beat, not a spinner.
- The counter tracks **real readiness** (display font loaded + hero image decoded), clamped to 0.8s minimum / 1.4s maximum. If assets are ready sooner, the count completes quickly toward the floor; at 1.4s the hero enters regardless (image fades in when decoded). It never pretends to load work that is already ready.
- Exit: the field lifts/fades (≤400ms, ease-in, exit faster than entrance) and hands off directly into the hero's existing ≤600ms stagger — one continuous 0→100→hero gesture, not two separate intros.
- Repeat visits (per-session flag, e.g. `sessionStorage`): the loader is skipped entirely.
- `prefers-reduced-motion`: no loader at all — hero renders complete immediately.
- Implementation: the loader is a JS-inserted overlay. With JS disabled it never exists; the hero is fully readable without it.

**Contextual cursor**
- Desktop only: initialised only under `(hover: hover) and (pointer: fine)`; never on touch devices.
- A small `ember` dot (~8px) following the pointer with a short transform-only lag; over project-index entries and media embeds it grows to a ring with a contextual verb ("View", "Play"). The verb is additive — the underlying link always keeps its own visible text label; the cursor never replaces essential labels or hides focus states.
- Native clickability is preserved: the custom cursor is `pointer-events: none`, all elements keep correct `cursor` semantics as fallback, and keyboard users are unaffected.
- `prefers-reduced-motion`: the custom cursor is disabled entirely (native cursor only). No trails, no glitch, no cursor motion competing with content (see references doc, Vivid Motion "do not copy").

**Desktop and mobile principles**
- Desktop: composition as above; hero + start of the project index visible on a 1366×768 laptop without the index being fully hidden.
- Mobile: single column, natural height, text first (frame metadata → name → statement → CTA + metadata → image with caption). No forced-viewport hero, no custom cursor, loader follows the same rules (skip logic and reduced-motion apply identically).

**Removed from the existing concepts**
- Concept A: eyebrow + short rule cluster (replaced by the metadata frame); annotation-ring crop (re-capture required).
- Concept B: ember side field, abstract BETTR motif strip, two-line offset name, terminal-adjacent period-dot flourish.
- Concept C: retired in full (atmosphere image, overlap panel, caption chip).

## 12. Responsive rules

- Test breakpoints: 360 / 768 / 1024 / 1440 (per audit §8 step 6).
- Grid and spacing scale down via the same 8px unit — no separate mobile spacing system.
- Full-bleed feature rows on the homepage index collapse to single-column compact entries below 768px.
- Mono metadata lines wrap to a second line rather than truncating; never clip role/medium/year information.

## 13. Accessibility requirements

- WCAG AA contrast verified for every text/surface pairing in actual use — ember accents in particular, which fail AA at body size on `paper` (audit §7). Restrict `ember`/`ember-bright` to large display sizes, rules, and backgrounds on **dark** surfaces; use `ember-deep` for light-surface accents.
- `prefers-reduced-motion` guard around all animation, site-wide, not just the hero.
- Any surviving interactive toggle carries correct ARIA state.
- Alt text on all images (existing strength — maintain, don't regress).
- Iframe titles set on all embeds (existing strength — maintain).
- Skip-to-content link added site-wide.
- Meta descriptions, OG image, and favicon added (currently missing entirely).

## 14. Explicit visual anti-patterns

Site-wide, not just the hero:

- Scan-line animation, glow effects, status dots, terminal-window chrome.
- Cool navy/cyan color anywhere (`#0C1118`-class colors are retired, not adjusted).
- Mono-font display headlines (mono is metadata/numbering only, per §4).
- Identical rounded cards for all projects regardless of medium (the explicit anti-pattern the audit calls out).
- Two duplicated views of the same content (Gallery/Index toggle) — replaced per §6.
- Stock photography or generic icon placeholders standing in for real, missing project imagery.
- Dead links (`href="#"`, bare homepage URLs for LinkedIn/GitHub) shipping to production.
- Full editor-window screenshots with chrome where a cinematic crop would serve.
- Ambient/looping motion anywhere on the site.

## 15. Rules for preserving evidence, ownership and embeds

- **Preserve all factual substance, evidence, ownership statements, research findings, testing results and honest limitations.** Editorial tightening, reordering, shortening and removal of repetition are allowed, but no claim may be fabricated, exaggerated or materially changed. This applies to the thesis statements, testing data, honest scope statements ("designed but not fully wired into the shipped build"), FrankenTeen's credit grid (teammates named, Act 3 contribution isolated), and BETTR/Echoes' self-written-vs-adapted statements alike (Approved amendment #3).
- **`assets/bettr-live/**` is never modified.** No renaming, re-casing, or restructuring — GitHub Pages is case-sensitive and the BETTR build's `@font-face` paths depend on exact casing (Approved amendment #5).
- **The BETTR iframe's relative path** (`../assets/bettr-live/index.html`) is never changed — no directory moves for pages that would break it.
- **The Figma embed and four Kaltura iframes** keep their existing `src` and `title` attributes; only add `loading="lazy"` and (optional) click-to-load poster facades — do not swap providers or re-host without an explicit separate decision (see audit §10 on the Kaltura university-account risk, which is a future risk to plan for, not something this redesign resolves).
- **Prev/next project chain and breadcrumbs** stay structurally intact — re-skinned, not removed or reordered.
