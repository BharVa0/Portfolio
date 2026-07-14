# Portfolio Audit — Redesign for "Human Systems"

**Date:** 2026-07-14 · **Branch:** `redesign-v2` · **Status:** Approved

**Stack:** 7 static HTML pages, zero dependencies, all CSS inlined per page (~95KB HTML total). Assets are light (largest image 332KB). Embeds: self-hosted BETTR build (relative iframe), one Figma embed, four Kaltura university-hosted video iframes. No `.nojekyll`, no CNAME. `redesign-v2` branch off `main`.

---

## 1. Strengths worth preserving

- **Content architecture is genuinely strong.** Every project page follows thesis → artifact-first embed → numbered sections → evidence → reflection. The writing is specific, honest about scope ("designed but not fully wired into the shipped build"), and shows real testing data. This should survive the redesign untouched.
- **Ownership clarity is excellent.** FrankenTeen's credit grid names teammates and isolates the Act 3 contribution; BETTR and Echoes state what code was self-written vs. adapted. Keep this pattern verbatim.
- **Artifact-first pages.** BETTR's live build and CardioPal's clickable prototype sit above the writing. Recruiters interact before they read.
- **The numbered-section + mono-metadata system** already delivers "restrained technical metadata" — it needs re-skinning, not rethinking.
- **Prev/next project chain** and consistent breadcrumbs work well.
- **Alt text** exists on nearly all images, and iframe titles are set.

## 2. Primary weaknesses

- **The current skin is exactly what the brief rejects.** Scan-line animation, `SYS // PORTFOLIO.IDX`, status dots, glowing edges, cool navy (`#0C1118`) — a cyberpunk dashboard. The mono-font hero headline reads as "developer terminal," not "design editorial."
- **Every page duplicates the full design system.** The `:root` token block and ~40 component rules are copy-pasted 7 times with drift between pages. A palette change means editing 7 files.
- **Identical rounded cards** on the homepage — an explicit anti-pattern. All six projects get the same 16:9 card regardless of medium.
- **No project-specific identity.** One accent red (`#E14B3C`) everywhere, despite BETTR having its own documented palette and FrankenTeen having a zine identity begging to be used.
- **Two projects have no imagery at all** — CardioPal and Playing Freedom homepage cards are icon placeholders; most other images are editor screenshots, not cinematic compositions.
- **Dead placeholder links:** LinkedIn and GitHub point to bare homepage URLs; Resume is `href="#"`. Worse than omitting them on a recruiter-facing site.
- **The Gallery/Index toggle duplicates all six project entries in markup** for marginal value, and the toggle buttons carry no ARIA state.
- **No meta descriptions, Open Graph tags, or favicon** — shared links preview as nothing.

## 3. Architecture recommendation

**Essential: keep the static stack; do not migrate to Astro.**

Astro's material advantages (shared layouts, content collections, image pipeline) matter at 30+ pages or data-driven content. This site has 7 pages, hand-written editorial content, and one deployment-sensitive relative-path embed (`../assets/bettr-live/`) that a `public/`-folder migration could silently break. The duplication problem is solved by extracting **one shared stylesheet** (design tokens + components) with a per-project body class carrying accent overrides — 90% of Astro's benefit with zero build step, zero CI, and zero GitHub Pages risk. Revisit Astro only past ~15 projects or if a blog is added.

Also **Essential:** add `.nojekyll` (insurance against Jekyll processing), and never rename folders inside `assets/bettr-live/` — GitHub Pages is case-sensitive and the `@font-face` paths (`Fonts/Jersey_25/…`) depend on exact casing.

## 4. Homepage recommendation

- **Essential:** Replace the scan-line hero with a large contemporary serif statement (Fraunces, Newsreader, or GT Alpina-class) on near-black, warm-white text, burnt orange as punctuation only. Kill the status-bar conceit; a simple name / nav / location line in mono is enough.
- **Essential:** Replace the six identical cards with a differentiated editorial index: alternate full-bleed feature rows (BETTR, FrankenTeen) with compact entries, varied image crops and scales, per-project accent on hover. Each entry must show role, medium, year, and one ownership line without interaction — that is the recruiter scan path.
- **Valuable:** Drop the Gallery/Index toggle entirely; one well-designed list serves both audiences and halves the markup.
- **Valuable:** Fix or remove the LinkedIn/GitHub/Resume placeholders before anything visual ships.
- **Optional:** A short "currently" line (seeking roles from [date], Edinburgh/remote) near the contact CTA.

## 5. Project-page recommendation

- **Essential:** Re-skin, don't restructure. Serif display titles, warm-black surfaces, mono confined to captions/metadata/section numbers. Keep the numbered sections, embeds, credit grids, and reflections exactly where they are.
- **Essential:** Per-project accent tokens via a body class — BETTR keeps its `#EB5160` family, FrankenTeen gets a zine-adjacent treatment, CardioPal something calmer, Echoes warm/nostalgic. Delivers "project-specific identities" for the cost of ~6 CSS variables each.
- **Valuable:** Open each page with a full-width cinematic image before the embed (except BETTR, where the live build *is* the hero and should stay).
- **Valuable:** Warm-white ("paper") sections for the research-heavy pages (Smartphone Mold, Playing Freedom) — editorial contrast against the dark pages, differentiating writing-led from build-led work.
- **Optional:** A compact "facts" sidebar (role, team, tools, duration) at the top of each page.

## 6. Asset improvements required

- **Essential:** CardioPal needs real imagery — export 3–5 device-framed screens from Figma for the homepage card and page hero. Playing Freedom needs a poster frame from the documentary.
- **Valuable:** Recrop existing screenshots cinematically (wide crops of the BETTR dashboard, the Echoes room, FrankenTeen's world map detail) rather than full editor windows with chrome.
- **Valuable:** Add explicit `width`/`height` attributes to all images (prevents layout shift) and `loading="lazy"` below the fold.
- **Optional:** WebP conversion — current file sizes are already fine.

## 7. Accessibility and performance risks

- **Essential:** Burnt orange on warm-white fails WCAG AA for body-size text at most usable shades — restrict it to large display sizes, rules, and backgrounds on light surfaces; verify every muted-grey token against both dark and light backgrounds.
- **Essential:** Add a `prefers-reduced-motion` guard around all animation, and ARIA state on any toggle that survives.
- **Valuable:** Add `loading="lazy"` to the four Kaltura iframes (each pulls a full player runtime; the BETTR iframe already has it). Consider click-to-load poster facades for the videos.
- **Valuable:** Meta descriptions, OG image, favicon, and a skip-to-content link.
- **Optional:** Self-host the two web fonts to remove the Google Fonts round-trip.

## 8. Staged implementation plan

1. **Foundation (Essential):** Extract shared stylesheet with the new token system; add `.nojekyll`, favicon, meta/OG tags; fix dead links. No visual change yet — pure de-duplication, verified page-by-page.
2. **Pilot page (Essential):** Apply the Human Systems skin to one page (BETTR — most component variety, riskiest embed). Verify the iframe, fonts, and Kaltura players on the deployed Pages URL, not just locally.
3. **Homepage (Essential):** New hero and editorial index.
4. **Remaining five pages (Essential):** Roll the template out, adding per-project accents.
5. **Asset pass (Valuable):** CardioPal/Playing Freedom imagery, cinematic recrops, image dimensions.
6. **A11y/perf pass (Valuable):** Reduced motion, contrast audit, lazy Kaltura, responsive QA at 360/768/1024/1440.

## 9. Files/systems requiring modification

All seven HTML files (every page carries its own CSS); new shared stylesheet + `.nojekyll` + favicon/OG image; `assets/` gains new imagery for CardioPal and Playing Freedom. **Do not touch** `assets/bettr-live/**` — it is a shipped artifact, not portfolio chrome.

## 10. Risks that could break embeds or deployment

- **BETTR iframe path** (`../assets/bettr-live/index.html`): breaks if pages move directories or folders are renamed/re-cased. Keep the current URL structure.
- **Kaltura videos are tied to the university account** — they may become unavailable after graduation or off-network. **Valuable:** keep local MP4 masters and plan a fallback host (Vimeo) before access is lost.
- **Figma embed depends on file share permissions** staying "anyone with link."
- **Case sensitivity:** GitHub Pages serves case-sensitively; Windows development won't catch casing mistakes locally — test on the deployed URL after each stage.
- **CSS extraction risk:** the pages have drifted slightly (BETTR has extra components); diff each page's rendered output during de-duplication rather than assuming identical styles.

**Bottom line:** the content and page structure are already strong — this is a re-skin plus de-duplication, not a rebuild. Keep the stack, extract the CSS, replace the terminal aesthetic with warm editorial art direction, and spend the reclaimed effort on the two projects that currently have no imagery at all.

---

## Approved amendments

1. Prove the new visual direction in an isolated `/v2-preview/` before refactoring or applying it to public pages.
2. Do not extract the entire old CSS system before the prototype is approved.
3. Preserve the substance and honesty of the project writing, but allow later editing for hierarchy, brevity and recruiter scanning.
4. Replace the Gallery/Index toggle with one editorial, scan-friendly project sequence. A compact project index may appear separately without duplicating full content.
5. Do not modify `assets/bettr-live/**`.
6. CardioPal and Playing Freedom imagery are required before final homepage approval.
