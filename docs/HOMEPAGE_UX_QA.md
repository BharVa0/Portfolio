# Homepage UX/QA Audit — "Human Systems" (v2)

**Reviewed:** 2026-07-14 · **Source of truth:** `docs/PORTFOLIO_DIRECTION_V2.md` · **Method:** source review of `index.html`, `css/portfolio.css`, `js/portfolio.js`, plus live checks at `http://localhost:4180/?version=human-systems` (390/375/768/1280/1600px, keyboard tab-through, contrast math on token pairs). No files modified.

## What's already solid

No horizontal overflow at 375/768/1280/1600px (`scrollWidth === clientWidth` at all four). Skip-link, nav, hero CTA and project rows are keyboard-reachable in logical order with a visible `ember-bright` focus ring. The loader and cursor are correctly no-JS-safe (neither the `pending` nor `ready` class is ever set without JS, so hero elements render at full opacity by default — no FOUC). `prefers-reduced-motion` is checked once in the early inline script and gates the loader, the hero stagger, and the cursor consistently; the CSS also force-overrides the hero keyframes under the media query as a backstop. `--muted` (#91877F) on `--ink` computes to ≈5.6:1 and `--ember-bright` on `--ink` to ≈5.0:1 — both clear WCAG AA at the small mono sizes they're used at. No P0s found.

## Findings

### P1 — Serious

**1. External contact links give no warning before opening a new tab**
LinkedIn, Resume (PDF), and GitHub (`index.html:218-220`) all carry `target="_blank"` with no visible text, icon, or `aria-label`/sr-only string indicating a new tab. Screen-reader users in particular lose context with no warning. Add a visually-hidden "(opens in a new tab)" suffix or an icon with equivalent accessible text.

**2. Project images ship at full resolution with no responsive variants**
`ui-thumb-crop.jpg` (264KB, native 1494×1275) and `dashboard-thumb-crop.jpg` (156KB, native 1525×966) are rendered in a 140–220px compact-row box on mobile and in a fractional feature-row column on desktop, but the same single file is downloaded at every breakpoint — there's no `srcset`/`sizes`. The project's own audit flagged asset lightness as an existing strength ("largest image 332KB"); shipping full-desktop-resolution files to a 375px viewport erodes that. Add `srcset` with a mobile-sized derivative (e.g. 480px-wide versions) for the four project images that carry media.

### P2 — Worthwhile

**3. Cursor input-mode detection never re-evaluates after load**
`js/portfolio.js:98` checks `(hover: hover) and (pointer: fine)` once, at parse time, to decide whether to attach the custom cursor. On a hybrid touch+mouse laptop (or a device where the media query result changes — e.g. a tablet with a mouse plugged in mid-session), the cursor state can mismatch the actual input method for the rest of the page's life. Low impact, but worth a `matchMedia().addEventListener('change', …)` guard if hybrid devices are a real segment of the audience.

**4. Brief no-cursor window before the custom cursor attaches**
The early inline script sets `has-custom-cursor` on `<html>` — which triggers `cursor: none` globally via CSS — before `js/portfolio.js` (loaded at the end of `<body>`) has created the actual `.cursor-dot` element. On a slow connection or low-end device, a hover-capable user can briefly see no cursor at all between first paint and script execution. Consider deferring the `cursor:none` rule to a class the JS itself adds only once the dot element exists, rather than the earlier inline-script class.

**5. Smallest mono captions sit near the readability floor**
`.hero-image figcaption` is set at `0.72rem` (~11.5px, `css/portfolio.css:197`) — legible in testing but at the low end for text read at a normal viewing distance, especially in `muted` grey. Section eyebrows and project metadata use `0.76–0.8rem`, which reads more comfortably. Raising the caption to match (≥0.76rem) would cost nothing visually and reduce strain.

**6. `--ember-bright` used on small mono labels outside its documented role**
`.practice-col h3` (css/portfolio.css:426-432) colors "DESIGN"/"BUILD"/"METHOD" — 0.78rem captions — in `ember-bright`, which the direction doc reserves for "large display type... never body-size text." Contrast is fine (~5:1), so this is a spec-consistency note, not an accessibility break; flagging so it doesn't quietly become the pattern for future small-text accents.

### P3 — Optional

**7. No iframes on the homepage itself**
The Figma and Kaltura embeds referenced in the direction doc's iframe-performance guidance live on the six project pages, not `index.html` — nothing to check here today. Worth re-auditing if any project preview is ever embedded on the homepage directly.

**8. CTA underline color has limited contrast headroom**
The hero and contact CTA underlines use `--ember` (~3.7:1 against `--ink`, css/portfolio.css:158/469) — just above the 3:1 non-text-contrast minimum for UI boundaries. Passing today; flagging only so it's re-checked if `--ink` is ever darkened further in a later pass.

## Not applicable / out of scope for this pass

Touch-device fallback for the cursor (`display:none` under `(hover:none), (pointer:coarse)`) and the loader's session-skip logic were verified by source inspection only — this environment's browser tooling can vary viewport size but not real input capability or `prefers-reduced-motion` at runtime, so both should get a final pass on an actual touch device before sign-off, consistent with the production log's own open item.

## Database-assisted supplement

Ran targeted `ui-ux-pro-max` `search.py` queries against `--domain ux`, `--domain typography`, and `--domain landing` (no `--persist`, no design-system generation) and cross-checked the results against the live homepage and the findings already in this document.

**1. Nav, contact, and footer text links fall well under the 44×44px touch-target minimum**
- **Search:** `--domain ux "touch device fallback hover gesture"` → *Touch Target Size* (Category: Touch, Severity: High): "Minimum 44x44px touch targets... Don't: Tiny clickable areas."
- **Current homepage issue:** Measured live at 390px viewport — `.frame-nav a` (Work/Practice/About/Contact) renders at 33×19px, `.contact-links a` (LinkedIn/Resume/GitHub) at 67×20px, and `.site-footer a` (email) at 160×19px. All three are plain inline mono/sans text links with no vertical padding, so their tap height is roughly half the database's flagged minimum on the one input mode (touch) where precision matters most.
- **Recommendation:** Add vertical padding (e.g. `padding: 12px 0` or an invisible `::before` hit-slop) to `.frame-nav a`, `.contact-links a`, and `.site-footer a` so each reaches ≥44px tap height without changing their visual size — this is additive to the existing UX QA's findings, which didn't check tap-target geometry for these specific links.
- **Priority:** P1 (this is a new, measured finding, not previously in `HOMEPAGE_UX_QA.md`).

**2. Hero image caption's small-type problem has a firmer, database-backed floor**
- **Search:** `--domain typography "monospace metadata caption small text legibility"` → *Terminal CLI Monospace* pairing notes: "Strict sizes: 12pt / 14pt / 16pt only — no in-between" for mono-family legibility.
- **Current homepage issue:** `HOMEPAGE_UX_QA.md` finding 5 already flagged `.hero-image figcaption` at `0.72rem`; live measurement confirms it renders at exactly **11.52px** — below even the database's smallest sanctioned mono step (12pt/16px). This strengthens (does not repeat) the existing finding: it wasn't just "smaller than the site's other captions," it's below the legibility floor the typography domain itself recommends for mono type.
- **Recommendation:** Same fix as previously suggested — raise to `0.76–0.8rem` (≈12–13px) to clear the 12pt floor, rather than leaving it as the one caption below the recommended minimum step.
- **Priority:** P2 (upgrades existing P2 #5 from "reads inconsistently" to "measurably below the domain's own minimum type step").

**3. Hero and project-index structure already matches the database's own portfolio pattern — no new finding**
- **Search:** `--domain landing "portfolio hero clarity personal site"` and `"project scanning case study list index"` → *Portfolio Grid* pattern: `Hero (Name/Role) → Project Grid → About/Philosophy → Contact`, "Visuals first... Fast loading essential."
- **Comparison:** The current homepage's section order (Hero → Introduction → Selected work → Practice → About → Contact) already matches this pattern's spine, and per-row info-without-interaction already satisfies "visuals first" for scanning. The database's own filter-by-category suggestion is explicitly overridden by the direction doc's rejection of the Gallery/Index toggle, so it is correctly not applied here.
- **Recommendation:** None — recording explicitly that the database did not surface anything beyond what the direction doc already specifies and the existing audit already covers.

**4. Custom-cursor and reduced-motion guidance: no new finding**
- **Search:** `--domain ux "custom cursor contextual hover pointer"`, `"prefers-reduced-motion reduced motion animation"`.
- **Comparison:** Results returned generic hover-vs-tap and reduced-motion checks (respect the media query, animate 1–2 elements max, transform/opacity only) — all of which the current implementation and `HOMEPAGE_UX_QA.md` already satisfy or have already flagged (cursor re-evaluation timing, brief no-cursor window). The database has no domain-specific entry for contextual/verb-changing cursors beyond generic hover guidance, so it adds nothing beyond what source inspection already found.
- **Recommendation:** None — no new finding from this search.

**5. First-visit loader guidance: no new finding**
- **Search:** `--domain ux "first-visit loader progressive loading skeleton"`.
- **Comparison:** Results are generic (skeleton screens for >300ms operations, font-display swap, disable-button-during-load) and describe a different problem class (indeterminate async waits) than this site's fixed-window, real-readiness-gated 0–100 loader, which is already spec'd in the direction doc and already verified in the production log. Nothing here contradicts or adds to the existing implementation.
- **Recommendation:** None — recording explicitly that the database's loader guidance doesn't apply to this loader's design (a title-beat tied to real asset readiness, not a generic async spinner).
