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

### 2026-07-14 — Restore fluid layouts and original project media

**Stage:** Remaining pages (foundational layout correction, not a new visual direction)
**Scope:** `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, `projects/frankenteen.html`, `css/portfolio.css` (layout-system rewrite), `js/portfolio.js` (BETTR cursor bridge), `.claude/launch.json` (new `static-preview-fluid`, port 4184), deleted `assets/frankenteen/ui-thumb-crop.jpg`. No `assets/bettr-live/**`, routes, embeds, factual claims, or the three untouched project pages.
**Did:**
- **Fluid desktop layout system:** replaced the single narrow rail (`--col-max: 840px` capping `.proj-hero`/`.proj-section`/`.proj-footer-nav`, `.section-inner` at 1400px, hero at 1720px) with: outer gutters `--page-margin: clamp(24px, 4vw, 96px)`, a 2200px safety cap only (`--page-max`), a 12-column fluid grid (`.cols` + `.cA-B` placement classes, active ≥1024px, stacking below), fluid column gap `clamp(20px, 2.4vw, 56px)` and media seam `clamp(2px, 0.35vw, 8px)`. Explicit per-block layout modes via `data-layout` (`reading | standard | wide | full-bleed | split | asymmetric | media-grid | process-evidence`) so the reading column (`--reading-w: 46em`) only ever constrains long paragraphs — never heroes, embeds, evidence, metrics, credits or nav. No universal page wrapper remains.
- **Project heroes:** all three case-study heroes recomposed onto the grid — eyebrow/title/thesis left (cols 1–7), facts + ownership right (cols 9–12, bottom-aligned); title scale raised to `clamp(2.8rem, 7.4vw, 7rem)`. Embeds are now major wide artifacts: `.proj-embed` height `clamp(560px, 74vh, 940px)`, full grid width (BETTR live build ~2000px wide at 2560).
- **Homepage:** hero grid uncapped (was max-width 1720px with no centering — dead margin at ≥1920) and image column now bleeds to the right viewport edge; intro and About recomposed as statement-left / body-right asymmetric splits; feature rows moved to explicit 12-col compositions (`.media-left` variant replaces fragile `nth-of-type` flipping); compact rows gain an `.offset-right` variant (Echoes, Playing Freedom) for spatial variety; FrankenTeen row media capped at its native 600px via `.native-cap`; smartphone row media sits in cols 10–13.
- **BETTR media restoration:** stage-3 evidence upgraded from the flat `dashboard-wide-crop.jpg` (1525×615) to the taller, more complete `dashboard-thumb-crop.jpg` (1525×966) as the largest frame (9 cols) — the dashboard is the argument's landing point; stages 1+2 (1630×970 each) side by side at 6 cols; stage 4 at 7 cols offset right; all natural aspect ratio, no fixed heights. "Building it": text (cols 1–5) beside the landing screen (cols 6–13); the VS Code window demoted to a labelled process-evidence block at secondary size (cols 6–12). Palette and type sample now sit as a split. `dashboard-wide-crop.jpg` retained (homepage row + OG image).
- **BETTR PLAY cursor bridge:** the live build is same-origin, so `js/portfolio.js` now bridges it (opt-in `data-cursor-bridge` on the iframe): `pointermove` inside the iframe document is translated to parent-viewport coordinates (`iframe.getBoundingClientRect() + clientX/Y`) and drives the existing cursor dot with a PLAY ring; the iframe's native cursor is hidden only after listeners attach (injected `<style>`, removed if the custom cursor is torn down); parent `mousemove` hands control back so the dot never freezes at the boundary; try/catch falls back to the native cursor; rebinds on every iframe `load` (the build navigates internally). Figma and Kaltura keep the suspend/hide behaviour — cross-origin documents are not scriptable.
- **CardioPal:** same shell and grid as the other pages — hero facts/ownership in the right column with the wide Figma embed directly below as one composition; "The brief I gave myself" set as a two-column split; inside the paper exhibit, tasks (cols 1–8) sit beside the tester quotes (cols 9–13, now stacked). No imagery fabricated; embed src untouched.
- **FrankenTeen media hierarchy:** the clean isometric bedroom render (`room-thumb-crop.jpg`, 600px native) now appears in section 01 beside "The idea" — outcome imagery before any planning material; greybox render beside the level-design text at native 655px; notebook/PAUSED UI crops side by side at native caps (560/660px); the two annotated top-down maps moved into an explicitly chipped "Planning / process evidence" + "Act 3 — my act" two-up at secondary scale (cols 1–7 / 8–13), with body copy now naming them design-doc planning material; findings list on `data-layout="standard"`. No higher-resolution clean sources exist — all FrankenTeen sub-panels cap at ~650px inside the 2667×1500 design-doc slides (checked again this session); original slides retained as sources. Deleted `ui-thumb-crop.jpg` (generated contact-sheet crop, no page references it).

**Decisions:**
- Layout modes are per-block (`data-layout` + `.cols` placement classes), never page-wide, so future pages cannot silently inherit a narrow article rail.
- `dashboard-thumb-crop.jpg` (taller, fuller UI) is BETTR's largest evidence frame; the flat wide crop remains the homepage editorial band.
- FrankenTeen keeps its 600–780px crops presented at native scale rather than sourcing new imagery — an explicit "smaller sharp over larger blurry" call; re-capture blockers unchanged.

**Verified:**
- Fresh server on port 4184 (`static-preview-fluid`). Browser-pane screenshots were non-functional this session (renderer paused: `requestAnimationFrame` never fired, screenshots timed out even on a plain directory listing — tooling condition, not a page bug), so screenshots were captured via headless Chrome (`--headless=new --force-prefers-reduced-motion`) and visually inspected: homepage at 1280×900 / 1440×900 / 1600×1000 / 1920×1080 / 2560×1440, the three project pages at 1440×900 and 1920×1080, plus full-page captures of all four pages via a temporary same-origin 1600px iframe harness (keeps vh units correct; deleted before commit).
- Inspected against the checklist: full-width confidence at every size, readable text, no distortion, no upscaling (DOM-measured at 2560: every capped shot renders at or below native width — 599/654/559/569/999/779 vs 600/655/560/660/1400/780), no phone-like central column, FrankenTeen outcome imagery precedes and outweighs planning maps, BETTR mixed grid legible, CardioPal reads as part of the portfolio (dark shell, paper as exhibit only).
- No horizontal overflow (`scrollWidth === clientWidth`) at 1024 / 1440 / 2560 on all four pages; console clean everywhere.
- All internal links, project pages, resume PDF, and every displayed image respond 200 (fetch HEAD from within the pages).
- PLAY bridge verified live on BETTR: `data-bridge-active` set after load, injected style resolves `cursor: none` inside the build, dispatched `pointermove` in the iframe document → dot gains ring + "Play" label and is not suspended; parent `mousemove` → ring drops (no boundary freeze). Dot animation itself couldn't be watched (paused-renderer tooling condition above); coordinate translation and state transitions verified by DOM inspection.
- The three untouched pages confirmed not to reference `css/portfolio.css` — the layout rewrite cannot affect them.

**Open:**
- FrankenTeen clean Unity re-captures (hero + higher-res outcome stills) — blocker carried, unchanged.
- Figma embed showed a CloudFront 403 in one headless capture burst (six parallel loads) — rate limiting during capture, not a page change; embed src untouched and loads normally in the pane. Worth a spot-check on the deployed URL.
- Touch-device verification of cursor/loader behaviour — carried.
- Echoes of Home, Smartphone Mold, Playing Freedom remain on the pre-redesign skin — carried.

**Commit:** `Restore fluid layouts and original project media` (hash below)

### 2026-07-14 — Correct project media and visual consistency

**Stage:** Remaining pages (correction pass on batch one)
**Scope:** `projects/bettr.html`, `projects/cardiopal.html`, `projects/frankenteen.html`, `css/portfolio.css`, `js/portfolio.js`, `.claude/launch.json` (new `static-preview-corrections` entry, port 4183). No homepage, `assets/bettr-live/**`, or the three untouched project pages.
**Did:**
- **Cursor freeze over embeds (Problem 1):** iframes/videos are a separate document — the parent never receives `mousemove` once the pointer crosses in, so the custom cursor dot was left frozen on top of the embed instead of tracking it. Added `mouseenter`/`mouseleave` guards on every `iframe, video` element (`js/portfolio.js`) that add/remove a new `.cursor-dot.embed-hidden` class (`css/portfolio.css`); no cross-document tracking attempted. Bound unconditionally at script init so it also covers a pointer that becomes fine/hover-capable mid-session. Verified by direct event dispatch (the remote browser tool's synthetic hover doesn't cross real iframe boundaries, so `mouseenter`/`mouseleave` were dispatched directly on BETTR's live iframe and FrankenTeen's Kaltura iframe) — dot hides on enter, resumes on leave, both times. BETTR's "Open full screen" link confirmed still the top hit-tested element at its own coordinates; corner-bracket motif confirmed still `pointer-events:none`.
- **Media quality audit (Problem 2):** measured natural pixel dimensions of every image on the three pages against rendered width. Found and fixed three real upscales: `frankenteen-hero-crop.jpg` (690px native, asked to fill a 1200px desktop slot) sat under a giant uncropped red gizmo/crosshair overlay and a magenta annotation circle spanning the entire rug — not just soft at scale but visibly annotated editor material presented as a clean cinematic still, contradicting its own caption. Removed it from `frankenteen.html` entirely (direction doc §14 anti-pattern: "no top-down maps or editor views as polished outcome imagery"; §2 rule: prefer removing over showing misleading imagery); the page now opens with its process-footage video as the lead artifact, matching the general artifact-first pattern (BETTR is the only formal full-width-image exception per §8). `act1-dorm-crop.jpg` (655px native) and `act3-mansion-crop.jpg` (780px native) were rendering up to the 840px column width; capped both to their native width via a new `.proj-evidence.single.native-scale` utility (centered, `--native-w` set inline per image) instead of stretching them. BETTR's `dashboard-wide-crop.jpg` (2.48:1, much flatter than the other three stage screenshots) was pairing with `stage4-crop.jpg` in a 2×2 grid and leaving a visible dead-space gap under the shorter image; split stage 3 and stage 4 into their own full-width single rows so each keeps its own aspect ratio without an uneven grid row. `town-overview-crop.jpg`/`act3-mansion-crop.jpg`'s trigger/NPC/interactable annotations were re-confirmed as legitimately labelled process evidence (explicit captions + body text describing them as design-doc markers), not the "polished outcome imagery" anti-pattern — left as is. No narrow/portrait BETTR source is displayed on the page — nothing to fix there.
- **CardioPal shell consistency (Problem 3):** the previous session's `.project-cardiopal` override flipped the entire page (surface, text, borders) to warm paper/sage, reading as a separate light microsite. Reverted `.project-cardiopal` to only the two accent tokens (`--proj-accent`/`--proj-accent-deep`), matching BETTR's and FrankenTeen's existing pattern — the hero, hero hero copy, hint sections, artifact chrome, and reflection all now render in the standard dark Human Systems shell. Added a new `.proj-paper-panel` component (locally overrides `--proj-surface-2`/`--proj-line`/`--proj-text`/`--proj-text-soft` for its own subtree only) and wrapped just the usability-testing evidence (vitals grid, task list, quote grid) in it — the warm paper/sage identity now reads as a controlled "exhibit" surface inside an otherwise-dark page, not a full-page reset. Caught and fixed a real contrast bug this created: `.task-name` sets `color: var(--proj-text)` directly, which without a local override would have resolved to the page's dark-mode text color (pale cream) on the new paper background; added `--proj-text: var(--ink)` to `.proj-paper-panel`. BETTR and FrankenTeen re-checked against the same rule — both already used the minimal 2-token accent-only override; no change needed.
- **Reveal-on-scroll regression found and fixed:** restructuring BETTR's evidence grid (single grid → grid + two single rows) made `.proj-section` 02 tall enough (~4890px) that the existing `IntersectionObserver` — using `threshold: 0.15`, a ratio of the *target's own* area — could no longer reach 15% visible on common viewports, so the whole section stayed at `opacity:0` (invisible) indefinitely once scrolled past. This is a latent bug in a ratio-based threshold applied to sections taller than the viewport, exposed (not created) by the taller layout. Fixed in `js/portfolio.js` by changing to `threshold: 0` (fires on first intersecting pixel; `rootMargin` still gates how early/late), which only loosens the trigger condition — verified homepage sections (shorter, already-working) are unaffected and the previously-blank BETTR section now reaches `in-view`/`opacity:1` correctly.
- Added `static-preview-corrections` (port 4183) to `.claude/launch.json` for this session's QA, alongside the existing preview configs.

**Decisions:**
- FrankenTeen's project-page opening image is dropped rather than re-cropped again — no chrome-free, non-editor, adequately-resolved FrankenTeen source exists in the repo (`world-map.jpg`'s clean region is capped at ~690×540 by the annotation arrow, and that specific region is the one already covered by a full-frame gizmo overlay). The video walkthrough becomes the page's real lead artifact instead. This is an explicit content-quality call, not a contract violation — it returns FrankenTeen to the direction doc's *default* artifact-first structure rather than the image-first exception §8 otherwise recommends. The homepage hero (which uses the same underlying crop) is unrelated and untouched.
- CardioPal's paper/sage identity is now scoped via a reusable `.proj-paper-panel` pattern rather than a page-level override, so any future project page needing a "printed insert" surface (a data exhibit, a document scan, etc.) inside the dark shell can reuse it instead of re-deriving a light-mode variant of the whole component set.

**Verified:**
- Fresh server on port 4183 (`static-preview-corrections`), loaded at `http://localhost:4183/projects/{bettr,cardiopal,frankenteen}.html` and `http://localhost:4183/index.html` (homepage spot-checked read-only, confirmed unaffected by the shared JS/CSS changes).
- No horizontal overflow (`scrollWidth === clientWidth`) confirmed by direct DOM measurement at 375px and 1440px on all three pages.
- Console clean (no errors) on all three pages at both viewports, and on the homepage.
- Cursor-suspend logic verified by direct `mouseenter`/`mouseleave` dispatch on BETTR's live iframe and FrankenTeen's Kaltura iframe (the remote browser tool's synthetic hover doesn't trigger real iframe-boundary crossing events, a tooling limitation, not a defect) — `embed-hidden` toggles correctly both directions.
- Image native-vs-rendered widths confirmed by DOM measurement: `act1-dorm-crop.jpg` renders at exactly 655px (its native width) at 1440px viewport; `act3-mansion-crop.jpg`, `town-overview-crop.jpg` render below their native width at all tested viewports (no upscale).
- CardioPal token fix verified via computed style: body background resolves to `--ink`, `.proj-paper-panel` background resolves to `--paper`, `.task-name` resolves to `--ink` (readable on paper), `.vitals-num` resolves to the sage accent-deep — all correct.
- Reveal-on-scroll: confirmed via DOM class/opacity inspection that the previously-stuck BETTR section reaches `in-view`/`opacity:1` after the `threshold: 0` fix; homepage sections still reveal correctly (unaffected).
- Keyboard: skip-link still receives focus first on Tab (BETTR, spot-checked; unchanged from prior verified behaviour on the other pages).
- BETTR's "Open full screen" link confirmed as the top hit-tested element at its own coordinates (not obstructed by the cursor dot or corner-bracket motif); corner brackets confirmed `pointer-events: none`.

**Open:**
- FrankenTeen still needs a clean Unity re-capture for a proper project-page opening image (this session removed the flawed placeholder rather than shipping it; the homepage hero re-capture blocker is unchanged and separate).
- Touch-device verification of the cursor/embed-suspend behaviour on a real mobile browser — still outstanding, same as prior entries.
- Echoes of Home, Smartphone Mold, and Playing Freedom remain on the pre-redesign skin — unchanged from prior entries.

**Commit:** `Correct project media and visual consistency` (hash below)

### 2026-07-14 — Remaining pages, batch one: BETTR, CardioPal, FrankenTeen

**Stage:** Remaining pages
**Scope:** `projects/bettr.html`, `projects/cardiopal.html`, `projects/frankenteen.html` (full rewrites); `css/portfolio.css` extended with a project-page component system and per-project accent tokens; new `scripts/crop-project-images.ps1`; new cropped assets in `assets/bettr/` and `assets/frankenteen/`. `assets/bettr-live/**`, the BETTR iframe path, `echoes.html`, `smartphone-mold.html`, `playing-freedom.html`, and `index.html` untouched.
**Did:**
- Extended `css/portfolio.css` (previously homepage-only) with a shared project-page system: `.proj-frame`, `.proj-hero`, `.proj-artifact`, numbered `.proj-section`, `.proj-evidence`, a generic `.proj-card-grid`/`.proj-tag`/`.proj-finding-row` system, `.proj-reflection`, `.proj-footer-nav`. Per-project accent + surface tokens (`--proj-accent`, `--proj-surface`, etc.) are set by a body class (`.project-bettr` / `.project-cardiopal` / `.project-frankenteen`, ~6–8 variables each) and consumed generically by the shared components, per the direction doc's "one system, per-project accents" rule.
- **BETTR:** kept its documented `#EB5160` family; live build stays the hero artifact, opening the page (no cinematic image before it, per direction doc §8). Added one signature motif: a static corner-bracket frame around the live-embed container, a restrained nod to the project's surveillance theme with no scan-line/glow/blinking-dot anti-patterns. Cropped `stage1/2/4` and `landing` screenshots to exclude browser chrome and the DevTools panel (`scripts/crop-project-images.ps1`); reused the already-approved `dashboard-wide-crop.jpg` for the stage-3 evidence slot instead of re-cropping the chrome-heavy original. `vscode-structure.jpeg` kept as-is — legitimate build-process evidence for the "Building it" section, not incidental chrome.
- **CardioPal:** warm-paper (`--paper`/`--paper-soft`) surface with a new muted sage accent (`--cardiopal-accent: #5B7A73`), distinct from BETTR's energy and still warm-neutral (no cool navy/cyan). No cover image exists in the repo (confirmed again this session — `assets/` has no `cardiopal/` folder), so the hero is typography-led per the direction doc's explicit allowance; the Figma prototype embed is unchanged and remains the primary artifact. Signature move: usability metrics render as "vitals" cards using the display serif for the numeral itself, reading as a printed chart rather than a dashboard readout. No screens, testing rounds, or metrics invented — all figures (71%, 2 participants, 8/10, etc.) carried over verbatim.
- **FrankenTeen:** charcoal base with a new mustard accent (`--frankenteen-accent: #C68A2E`) and a "dirty cream" surface (`--frankenteen-cream: #E7E0CC`) used only for the credit grid and a pacing pull-quote — sampled from the game's own real second-pass UI (notebook paper, marker scrawl) rather than an invented motif. Replaced three full annotated design-doc slide exports (`ui-development.jpg`, `world-map.jpg`, `level-design-greybox.jpg` — each carrying visible coordinate-readout overlays, gizmo lines, or a raw Unity Editor screenshot panel) with five tight crops of their clean sub-panels: a chrome-free notebook main-menu, the in-character "PAUSED" scrawl screen, the Act 1.1 dorm greybox render, and two scene-viewport crops (town overview, Act 3 mansion) that keep the legend-explained trigger/NPC/interactable annotations (informative, not incidental chrome) while excluding the Unity Editor panel that surrounded them in the source slide. Page now opens with a cinematic image (the same approved `frankenteen-hero-crop.jpg` used on the homepage) before the process-footage video embed, per direction doc §8. Bharat's Act 3 credit card gets an accent-outlined border, visually distinct from the two teammate cards.
- All three pages: added a skip-link, meta description + OG tags, favicon link, a lightweight top `proj-frame-bar` (index / counter / next), and the existing homepage `reveal`-on-scroll + desktop contextual-cursor behaviour via a small inline script (sets `can-animate`/`has-custom-cursor`, no loader — the 0–100 loader stays a homepage/hero-only feature per direction doc §11) plus the existing `js/portfolio.js`.
- Editorial tightening only: minor sentence-joining and repetition removal (e.g. BETTR's "The shift happens slowly..." merged into the hero thesis instead of repeating in section 01); no factual claim, credit, metric, or testing result changed.

**Decisions:**
- Reused `dashboard-wide-crop.jpg` for BETTR's stage-3 evidence slot rather than producing a fourth near-duplicate crop of the same dashboard — same subject, already at cinematic-crop quality.
- FrankenTeen's Act 3 mansion crop and the town overview keep their design-doc trigger/NPC/interactable ring annotations rather than cropping them out — treated as informative evidence (legend-explained in the direction doc's own audit language), not the "editor chrome" the anti-pattern (§14) targets. The Unity Editor screenshot panel that appeared elsewhere in the same source slide was excluded.
- Added a top `proj-frame-bar` forward link ("Next: X →") alongside the existing back-to-index link, additive to the original statusbar pattern, not a replacement of the footer prev/next chain.

**Verified:**
- Fresh server on port 4182 (`static-preview-projects` added to `.claude/launch.json`), loaded at `http://localhost:4182/projects/{bettr,cardiopal,frankenteen}.html`.
- No horizontal overflow (`scrollWidth === clientWidth`) at 375 / 768 / 1280 / 1600px on all three pages, checked via JS measurement (Browser-pane `resize_window` screenshots at exact custom widths intermittently mis-render in this environment immediately post-resize — a rendering artifact of the tool, not the page; confirmed by DOM measurement matching expected values every time. Screenshots at default/native size and at 375px after a settle scroll rendered correctly and were used for visual QA).
- Console clean (no errors) on all three pages at every tested viewport.
- All internal links, all cropped images, the BETTR live iframe, the CardioPal Figma embed source, and the favicon resolved 200 via `fetch` HEAD checks from within each page.
- BETTR corner-bracket signature motif: confirmed `pointer-events: none` and that the "Open full screen" link's click target resolves to the anchor itself, not the decorative corner, after a same-session bug was caught and fixed (a selector typo had left the top-right corner span without `pointer-events: none`).
- BETTR live iframe, CardioPal Figma embed, and FrankenTeen Kaltura video all confirmed rendering their real content (not blank/broken) in the Browser pane.
- Reduced motion: verified by code path (inline per-page script only adds `can-animate`/`has-custom-cursor` when `prefers-reduced-motion` does not match; `.reveal` entrance CSS is gated on `html.can-animate`, so sections render at full opacity immediately with the class absent) — not re-verified via forced-media-query screenshot this session (no loader exists on these pages to complicate the check, unlike the homepage).
- Prev/next chain: BETTR → CardioPal → FrankenTeen → Echoes of Home confirmed intact in both the top frame bar and footer nav; `echoes.html` (untouched) still links back to `../index.html` per its pre-existing pattern.

**Open:**
- Echoes of Home, Smartphone Mold, and Playing Freedom remain on the pre-redesign skin — next remaining-pages batch.
- FrankenTeen hero re-capture (annotation ring/gizmo lines) — blocker carried from prior entries, unchanged; this session reused the same provisional asset already sanctioned for the homepage.
- Touch-device verification of the cursor fallback on a real mobile browser — still outstanding, unchanged from prior entries.

**Commit:** `Redesign BETTR case study` (6205c29), `Redesign CardioPal case study` (a24007b), `Redesign FrankenTeen case study` (0dd7c4c)

### 2026-07-14 — Homepage refinement: skill-assisted review findings

**Stage:** Homepage
**Scope:** `index.html`, `css/portfolio.css`, `js/portfolio.js`; new assets `assets/frankenteen/room-thumb-crop.jpg` (+ `-480.jpg`), `assets/bettr/dashboard-wide-crop.jpg` (+ `-480.jpg`), `assets/smartphone/nothing-transparent-480.jpg`, `assets/frankenteen/frankenteen-hero-crop-480.jpg`. No project pages, `assets/bettr-live/**`, or hero composition touched.
**Did:**
- **FrankenTeen project row (Critical #1):** replaced the six-panel contact-sheet image (`ui-thumb-crop.jpg`, carried a visible dev coordinate-readout overlay) with a single clean isometric room crop sourced from `assets/frankenteen/ui-development.jpg` — a genuinely chrome-free render found alongside the annotated `world-map.jpg` slide, no debug HUD, no gizmo lines.
- **Echoes of Home project row (Critical #2):** every Echoes source image in the repo (`runner-scene.jpeg`, `room-scene.jpeg`) is a full Unity Scene-view or Blender-viewport screenshot — toolbar, inspector panel, and a large crosshair gizmo spanning the whole frame. Cropping tighter still left chrome visible in every attempt (recorded below). Converted the row to a text-led entry (same treatment as CardioPal/Playing Freedom) rather than ship an editor screenshot — the direction doc's own anti-pattern (§14) is worse than the "no image" allowance it already sanctions (§6).
- **BETTR project row (Important #7):** recropped `dashboard-thumb-crop.jpg` to a wider, shorter cinematic slice (excludes the top nav bar and an overflowing task card) and added a neutral vignette (`.tone-frame`) — no color shift, since §9 keeps BETTR's `#EB5160` identity un-reinvented.
- **Smartphone Mold (Important #6):** added a `.tone-warm` treatment (desaturate + hue-rotate toward ember + multiply overlay) to bring the vivid studio-red product shot into the site's palette without touching the source file (still used unmodified on its own project page).
- **Hero image (Critical #3):** left as-is, still provisional — confirmed via a wide preview crop that the red gizmo circle spans nearly the entire room, so no crop can exclude it. Blocker unchanged; needs a clean Unity re-capture, not a repo-image substitution.
- **Repetition (Important #5):** cut the restated "six projects, one question" framing from the About section; Introduction keeps it, About now only adds new information (project range, credit-transparency practice).
- **External links (UX QA P1 #1):** added visually-hidden "(opens in a new tab)" text to LinkedIn/Resume/GitHub.
- **Responsive images (UX QA P1 #2):** added `srcset`/`sizes` with 480w derivatives for the hero image and the three remaining media-bearing project rows.
- **Touch targets (database-assisted P1):** `.frame-nav a`, `.contact-links a`, `.site-footer a` get 13px padding + matching negative margin (hit-slop) — tap height now ~44–46px, visual position unchanged.
- **Hero caption legibility (UX QA P2 #5 / database #2):** `.hero-image figcaption` raised from 0.72rem to 0.78rem, clearing the 12px/16px mono legibility floor.
- **`ember-bright` misuse (Creative Optional #8 / UX QA P2 #6):** `.practice-col h3` swapped to plain `ember` — `ember-bright` stays reserved for large-scale moments only.
- **Cursor robustness (UX QA P2 #3, #4):** cursor input-mode now re-evaluated via `matchMedia(...).addEventListener('change', ...)` instead of a parse-time-only check (hybrid touch+mouse devices no longer get stuck). `cursor: none` is now gated on a new `.cursor-ready` class that JS adds only once `.cursor-dot` actually exists, removing the brief window where the native cursor could disappear before the replacement attaches.

**Rejected (deliberately, not automatically applied):**
- Creative review #4 (CardioPal/Playing Freedom imagery) — still no real asset in the repo; out of scope for a review-response pass, unchanged open item.
- Creative review #9 (hero caption echoes top metadata frame) — Optional, no functional problem, left as designed.
- UX QA P3 items #7, #8 — explicitly no new finding / not applicable this pass, per the review itself.

**Verified:**
- Fresh server on port 4181 (previous 4180 instance superseded), loaded at `http://localhost:4181/index.html?v=refine1&version=human-systems`.
- Confirmed correct build pre-edit: large serif "Bharat Vyas" hero, positioning statement, FrankenTeen hero image, editorial work sequence all present — no stale/cyberpunk build encountered.
- All 6 project links + resume PDF: `fetch HEAD` → 200.
- No horizontal overflow (`scrollWidth === clientWidth`) at 375 / 768 / 1280 / 1600px (Browser-pane `resize_window`, not bare headless `--window-size`, per known Chrome width-clamping issue).
- Keyboard: skip-link receives focus first on Tab, visible `ember-bright` outline confirmed in earlier session and unchanged this pass.
- Reduced motion: headless Chrome with `--force-prefers-reduced-motion` → `<html class="ready">` only (no `pending`/`can-animate`/`has-custom-cursor`/`cursor-ready`), hero renders complete, no loader.
- First-visit loader: `sessionStorage` cleared → loader runs and clears to `ready` with no leftover `#hs-loader` node.
- Repeat-visit: `hs-loader-seen` set → loader skipped entirely, `ready`/`cursor-ready` applied immediately.
- Touch-target heights measured live: nav 44.7px, contact 46.4px, footer 44.7px (all ≥44px), at both 1280 and 375px viewports.
- Console clean at every tested viewport and motion state.
- Touch/coarse-pointer input-capability emulation still not available in this environment (viewport-only, as before) — cursor fallback remains verified by code path, not live touch emulation.

**Open:**
- **Blocker carried:** FrankenTeen hero re-capture without the annotation ring/gizmo lines — confirmed again this session that no crop of the existing source avoids it.
- **New:** Echoes of Home has no chrome-free image anywhere in the repo — needs a Play-mode (not Scene-view) Unity capture or a Blender render before it can carry a media row again.
- Per-project accent hex values, CardioPal/Playing Freedom imagery, six project pages still on the old skin — unchanged from prior entries.
- Touch-device verification of cursor fallback and loader on a real mobile browser — still outstanding.

**Commit:** `Refine homepage through skill-assisted review` (hash in git history — this entry ships in that commit)

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
