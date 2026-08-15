# Visual Calibration Audit — Human Systems v2

Scope: `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, `projects/frankenteen.html`, `css/portfolio.css`.

Method: static preview server, full-page captures assembled from same-origin viewport-accurate segments (so `vh`-based sizing renders correctly) at **1440×900** and **1920×1080**. No files modified. Third-party embeds (Figma, Kaltura, the BETTR live build) were network-restricted in this sandbox — findings about embed *chrome* (frame, sizing, caption) are in scope; embed *content availability* is flagged separately as inconclusive, not scored as a defect.

---

## A. Shared-system problems

### A1. Text-only/compact work rows leave large dead rectangles at wide viewports
- **Element:** `.project-row.compact` entries with no `.project-media` — CardioPal (`#02`), Echoes of Home (`#04`) — and the `has-media` row (Breaking the Smartphone Mold, `#05`) where text and media sit far apart.
- **Problem:** `.project-row.compact .project-info` occupies grid columns 2/9 (or 6/13 when `.offset-right`), leaving the remaining ~4–7 of 12 columns completely empty. At 1920px this is roughly 550–650px of unbroken black space beside a two-line description — it reads as a layout gap, not the "spatially varied" composition the CSS comment (`portfolio.css:504`) intends.
- **Viewport:** Both; markedly worse at 1920 (e.g. CardioPal row: text ends ~x=860, nothing until the row border).
- **Recommendation:** Either give every compact row a small media element (thumbnail, stat, or pull-quote) to anchor the empty half, or cap `.project-info`'s effective measure with a `max-width` in ch/em so the empty space reads as intentional margin rather than a stretched, half-filled column. A third option: constrain `.work-list` itself to a narrower measure (see token spec, "standard width") so compact rows don't need to fill 12 columns of a 1920–2200px grid.
- **Priority:** Critical.

### A2. Practice section is the sparsest block on the homepage
- **Element:** `.practice-grid` (`portfolio.css:552`), `max-width: 1600px`, three columns of two short lines each.
- **Problem:** Content fills roughly a third of the section's available width even inside its own 1600px cap, and the cap itself leaves an unused right-hand gutter at ≥1920px (1920 − page-margins ≈ 1766px content area vs. 1600px grid). Directly between two much fuller sections (Intro's asymmetric two-column read, About's matching layout), Practice reads as unfinished.
- **Viewport:** Both; the gutter beyond the 1600px cap only appears ≥1920.
- **Recommendation:** Either drop the `max-width: 1600px` clamp and let the three columns spread across the same measure as Intro/About (`asymmetric`/full 12-col grid), or add a fourth element (a short line of framing copy, or increase line count per column) so the section's density matches its neighbors.
- **Priority:** Important.

### A3. Section-heading scale diverges between homepage and project pages
- **Element:** `.section-statement` (`clamp(1.7rem, 3.4vw, 2.6rem)`, `portfolio.css:377`) vs. `.proj-section-title` (`clamp(1.4rem, 2.4vw, 2.1rem)`, `portfolio.css:996`).
- **Problem:** Both fill the same structural role — "this is a new section" — but the project-page version tops out 19% smaller than the homepage version. Moving from index.html into any case study, section headers quietly shrink.
- **Viewport:** Both (most visible at 1920, where the homepage version reaches its full 2.6rem cap and the project version reaches only 2.1rem).
- **Recommendation:** Unify to one clamp shared by both roles, e.g. `clamp(1.6rem, 2.8vw, 2.4rem)`.
- **Priority:** Important.

### A4. Section vertical rhythm diverges between homepage and project pages
- **Element:** `section { padding: clamp(72px, 9vh, 128px) ... }` (`portfolio.css:364`) vs. `.proj-section { padding: clamp(72px, 11vh, 150px) ... }` (`portfolio.css:976`).
- **Problem:** Project-page sections get a taller vertical rhythm (up to 150px/11vh) than homepage sections (up to 128px/9vh) — a ~17% difference in breathing room for what is nominally the same "section" unit across the site.
- **Viewport:** Both (the gap widens with viewport height, so more visible at 1920×1080 than 1440×900).
- **Recommendation:** Align both to one clamp (e.g. `clamp(72px, 10vh, 140px)`) unless the taller project-page rhythm is deliberate to slow pacing inside a case study — if so, note it explicitly rather than let it read as an accident.
- **Priority:** Optional.

### A5. `.native-cap` images leave a consistent dead margin inside their grid column at wide viewports
- **Element:** `.project-media.native-cap` / `.proj-shot.native` (`portfolio.css:476`, `1031`) — used across FrankenTeen (room, dorm, both UI-pass images, mansion) and the homepage FrankenTeen thumbnail.
- **Problem:** These images are pinned to a fixed `--native-w` (560–780px) to avoid upscaling low-res sources, but they sit inside grid columns that grow with the fluid 12-column system. At 1920px a `c7-13` column runs ~850–950px wide, so a 655px-capped image leaves 200–300px of unclaimed space to its right — consistent, repeated, and most visible in FrankenTeen's "Level design" and "Designing in response to feedback" sections.
- **Viewport:** Mostly 1920; present but smaller at 1440.
- **Recommendation:** This is a real source-resolution constraint, not a bug to "fix" by upscaling — but consider narrowing the column span for native-capped media (e.g. `c8-13` → `c9-13`) at the widest breakpoint, or pairing the image with a caption/pull-quote that fills the leftover width, rather than leaving raw negative space.
- **Priority:** Important.

### A6. Row-number (`.project-num`) position is inconsistent across the same list
- **Element:** `.project-num` — inline above the title for `.feature` rows, in a dedicated left grid column (1/2) for `.compact` rows, shifted to column 5/6 for `.compact.offset-right`.
- **Problem:** Three different horizontal positions for the same element within one continuous numbered list (01–06). Likely intentional per the "spatially varied" system, but it means the eye can't anchor on a single numbering column while scanning the list.
- **Viewport:** Both.
- **Recommendation:** If this is deliberate editorial variation, consider it settled; if not, anchor all numbers to the same left column regardless of row type.
- **Priority:** Optional.

---

## B. Homepage-specific problems

### B1. Hero leaves a large unbalanced void at 1920×1080
- **Element:** `.hero` (`portfolio.css:220`), `.hero-text` (bottom-anchored via `justify-content: flex-end`), `.hero-frame` (`height: min(70vh, 760px)`).
- **Problem:** At 1440×900 the bottom-anchored text and the 70vh-capped image roughly balance the available height. At 1920×1080, `70vh` (756px, capped at 760px) leaves ~240px of empty space below the image before the section ends, and the text column (intrinsically ~460px wide regardless of the 7fr track) leaves a much larger empty rectangle in the lower-left quadrant. The composition that reads as confidently minimal at 1440 reads as sparse at 1920.
- **Viewport:** 1920 primarily.
- **Recommendation:** The hero foundation is locked per the direction doc (§11) — this is flagged for awareness, not a request to redesign it. If addressed, prefer a token-level tweak (e.g. raising the image height cap for ≥1800px viewports, or letting `.hero-statement`'s `max-width: 22em` grow slightly at very wide viewports) over a new composition.
- **Priority:** Important.

### B2. Adjacent title sizes jump sharply between feature and compact rows
- **Element:** `.project-row.feature .project-title` (`clamp(2rem, 3.6vw, 3.6rem)`) directly above/below `.project-row.compact .project-title` (`clamp(1.5rem, 2.2vw, 2.2rem)`).
- **Problem:** BETTR/FrankenTeen (feature) and CardioPal/Echoes (compact) sit in the same continuous list; the ~60% size difference between adjacent titles is more visible at 1920 where both hit their max clamp values.
- **Viewport:** Both, more pronounced at 1920.
- **Recommendation:** This is likely intentional (feature rows are meant to lead), but confirm the ratio is still comfortable at the largest viewport — consider narrowing the gap slightly (e.g. compact max to 2.5rem) if it reads as two unrelated type scales rather than one hierarchy.
- **Priority:** Optional.

---

## C. BETTR-specific problems

### C1. Four-stage media-grid images don't share a bottom edge
- **Element:** `.proj-shot` images in section 02 (`c1-7` / `c7-13`), both sourced at the same 1630×970 aspect ratio but placed in unequal-width columns.
- **Problem:** Because height follows width (`height: auto`) and the columns are different widths, Stage 1 and Stage 2's images render at different heights side by side — top edges align (`align-items: start` on `media-grid`), bottom edges don't.
- **Viewport:** Both.
- **Recommendation:** Minor — acceptable for an "evidence" grid, but if a tidier edge is wanted, match column spans (e.g. both `c1-6`/`c7-12`) or accept the stagger as intentional editorial texture.
- **Priority:** Optional.

### C2. Live-build embed and video walkthroughs could not be fully verified
- **Element:** `.proj-embed` (BETTR live iframe), `.video-grid` (Kaltura walkthroughs).
- **Problem:** The BETTR live build rendered correctly (title screen visible); the two Kaltura video embeds did not load in this network-restricted sandbox. The layout boxes (aspect-ratio 16:9, `video-grid` two-column split) size correctly regardless, so this reads as an environment limitation, not a CSS defect — but it should be spot-checked on the deployed site.
- **Viewport:** Both.
- **Recommendation:** Verify video embeds load on the live domain; no CSS change indicated.
- **Priority:** Optional (verification only).

---

## D. CardioPal-specific problems

### D1. Figma prototype embed returned a blocked/error response
- **Element:** `.proj-embed.tone-light` (Figma embed, `embed.figma.com/...`).
- **Problem:** In this sandbox the embed returned a white "403 ERROR / CloudFront" response, which sits jarringly inside the page's dark theme (though `.tone-light`'s white background was already anticipated for the real Figma canvas). Could not confirm whether this also occurs on the deployed site — Figma embeds sometimes reject requests from unrecognized referrer domains.
- **Viewport:** Both.
- **Recommendation:** Verify this embed loads correctly on the live production domain (not just localhost/preview). If it does fail in production too, that's a functional bug outside this audit's visual-composition scope but worth flagging urgently.
- **Priority:** Important (verification), not a scored CSS defect.

### D2. Page is the leanest of the three, but reads intentionally rather than empty
- **Element:** Overall page length (~4000–4300px, shortest of the three case studies).
- **Problem:** None — noted only for cross-page pacing awareness. The `proj-paper-panel` (usability data) adds enough visual weight that the page doesn't feel thin despite being roughly half BETTR's length.
- **Viewport:** Both.
- **Recommendation:** None needed.
- **Priority:** N/A (observation only).

---

## E. FrankenTeen-specific problems

### E1. Concentration of native-capped images produces the most dead-margin instances on the site
- **Element:** Room thumbnail, Act 1.1 dorm, both UI-pass images, Act 3 mansion — five separate `.proj-shot.native` instances.
- **Problem:** Same mechanism as A5, but FrankenTeen has more native-capped images than BETTR or CardioPal combined, so the effect compounds — several consecutive sections each show a moderately-sized image floating in a too-wide column at 1920.
- **Viewport:** 1920 primarily.
- **Recommendation:** Same as A5 — narrow the column span for these specific blocks at the widest breakpoint, or accept as a known trade-off of preserving un-upscaled source resolution (per the code comment at `portfolio.css:1020`).
- **Priority:** Important.

### E2. Two-image UI-pass row has an uneven pair (560px vs. 660px native caps in adjacent 6-column halves)
- **Element:** "Designing in response to feedback" section, `ui-notebook-crop` (`c1-7`, capped 560px) and `ui-paused-crop` (`c7-13`, capped 660px).
- **Problem:** The left image (560px cap) leaves more unused column width than the right (660px cap), so the pair doesn't read as a matched set despite being presented side by side as "before/after" states of the same menu.
- **Viewport:** Both, worse at 1920.
- **Recommendation:** If these are meant to read as a matched pair, align their native caps or their column spans so leftover space is symmetric.
- **Priority:** Optional.

---

## Calibrated token specification (proposed)

These are proposed values to reconcile the shared-system findings above — not yet implemented.

| Token | Current | Proposed | Rationale |
|---|---|---|---|
| **Display** (hero h1 / proj-title) | `clamp(3.6rem,10vw,10rem)` / `clamp(2.8rem,7.4vw,7rem)` | Keep homepage as-is; raise proj-title to `clamp(3rem, 7.6vw, 7.5rem)` | Keeps homepage as the clear apex; narrows (not erases) the cross-page display gap. |
| **Section-heading** | `.section-statement` `clamp(1.7rem,3.4vw,2.6rem)` vs. `.proj-section-title` `clamp(1.4rem,2.4vw,2.1rem)` | Unify: `clamp(1.6rem, 2.8vw, 2.4rem)` for both | Resolves A3 — one heading scale for one structural role. |
| **Body** | `1rem–1.05rem` (intro/about/proj-body), line-height 1.7–1.8 | Keep | Already consistent and reads well at both widths. |
| **Caption / mono** | `0.72rem–0.8rem` | Keep | Consistent, legible, appropriately quiet. |
| **Line-heights** | Display 0.94–0.98 · section-heading 1.25 · body 1.6–1.8 · caption 1.5–1.7 | Keep | No issues observed. |
| **Horizontal gutters** | `clamp(24px, 4vw, 96px)` | Keep | Consistent edge across every page; not implicated in any finding. |
| **Column gap** | `clamp(20px, 2.4vw, 56px)` | Keep | Fine at both widths. |
| **Section spacing** | Homepage `clamp(72px,9vh,128px)` vs. project `clamp(72px,11vh,150px)` | Unify: `clamp(72px, 10vh, 140px)` | Resolves A4. |
| **Reading width** | `46em` (`--reading-w`) | Keep | Correctly caps every long-form paragraph regardless of column width; not implicated in any finding. |
| **Standard width** | `max-width: 88%` (`[data-layout="standard"]`) | Change to `min(88%, 1400px)` | At the 2200px page-max, 88% (1936px) is too wide for a "standard" (non-wide, non-reading) block; a hard cap keeps it a distinct third option. |
| **Wide-media width** | Full grid area up to 2200px cap | Keep | Appropriate for artifact frames, embeds, and hero imagery. |
| **Alignment rule (new)** | — | Any block occupying ≥5 of 12 columns at ≥1920px must be either ≥50% visually filled (media, data, or supporting copy) or have its column span reduced — no bare text sitting in a track sized for media. | Directly targets A1, A2, A5/E1 — the site's actual empty-space problems all trace back to one rule being unstated. |

---

## Five most important shared-system problems (summary)
1. Compact/text-only work rows leave 40–60% of their row as dead space at wide viewports (A1) — Critical.
2. Practice section fills roughly a third of its own width; sits noticeably sparser than its neighbors (A2) — Important.
3. Section-heading type scale differs between homepage and project pages for the same structural role (A3) — Important.
4. `.native-cap` images leave a repeated ~200–300px dead margin inside fluid grid columns at 1920 (A5) — Important.
5. Section vertical rhythm differs between homepage (9vh/128px) and project pages (11vh/150px) (A4) — Optional but easy to fix alongside #3.

## Page-specific critical problems
- **Homepage:** CardioPal and Echoes-of-Home rows produce the site's largest unintentional-looking empty rectangles (B, tied to A1).
- **BETTR:** None at Critical — page holds up well at both widths; only minor edge-matching and unverifiable third-party embeds.
- **CardioPal:** Figma embed failed to load in this sandbox (D1) — needs production verification before ruling out as a real issue.
- **FrankenTeen:** Heaviest concentration of native-capped images leaves the most dead-margin instances of any page at 1920 (E1).

Full detail, priorities, and the proposed token spec are in this document at [docs/VISUAL_CALIBRATION_AUDIT.md](docs/VISUAL_CALIBRATION_AUDIT.md).
