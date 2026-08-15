# Portfolio Phase 2: Project Case-Study Pages Read-Only Audit

**Document Path:** `docs/PHASE_2_PROJECT_PAGES_AUDIT.md`  
**Date:** 14 August 2026  
**Branch:** `phase-2-redesign`  
**Authoritative Context:** `docs/PORTFOLIO_PHASE_2_CONTROL.md`, `docs/PHASE_2_DESIGN_SYSTEM.md`  
**Contact Sheet Reference:** `docs/review-screenshots/phase2-project-pages/contact-sheet-all-projects.png`

---

## 1. Executive Summary & Project Content Status

An exhaustive, read-only audit of all six live case-study routes (`/projects/[slug]`) was performed on the `phase-2-redesign` branch. 

**Crucial Finding:** **Every single one of the six project pages contains real, complete, production-ready editorial content and evidence.** There are zero stub pages, zero placeholder wireframes, and zero unpopulated routes. All pages compile cleanly to static HTML via `next build` (13/13 routes).

| # | Slug | Project Title | Editorial Substance / Content Status | Page Type & Primary Evidence Slot |
|---|---|---|---|---|
| 01 | `bettr` | **BETTR.** | **Real, Complete Content** (7 full chapters) | Speculative design; live interactive iframe embed (`/assets/bettr-live/index.html`) |
| 02 | `cardiopal` | **CardioPal** | **Real, Complete Content** (5 full chapters) | UX health tech; live clickable Figma prototype embed (25+ screens, light theme) |
| 03 | `frankenteen` | **FrankenTeen** | **Real, Complete Content** (6 full chapters) | 3D Game design (Act 3); hero landscape visual, 6 development captures, Kaltura process video |
| 04 | `echoes` | **Echoes of Home** | **Real, Complete Content** (5 full chapters) | 3D Environmental storytelling; room capture visual, 4 scene shots, Kaltura playthrough video |
| 05 | `smartphone-mold` | **Breaking the Smartphone Mold** | **Real, Complete Content** (5 full chapters) | Design research & cultural analysis; 4 market/product comparison images, industry interview |
| 06 | `playing-freedom` | **Playing Freedom** | **Real, Complete Content** (4 full chapters) | Critical game studies; full-width embedded video documentary deliverable |

---

## 2. Exhaustive Image Inventory per Project

This section inventories every image asset used across all case-study pages, detailing component implementation, dimensions, aspect ratio, and layout alignment.

### 2.1 `bettr` (`/projects/bettr` — `BettrCaseStudy.tsx`)
*Uses 6 raster images + 1 live interactive HTML iframe embed + 2 Kaltura video iframes.*

| Asset Source | Component Implementation | Dimensions (W × H) | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| `/assets/bettr-live/index.html` | `BettrLiveEmbed` / `PrototypeEmbed` | Responsive iframe | 16:10 | Hero evidence slot in `c5-13` (asymmetric split with `c1-5` meta). |
| `/assets/bettr/stage1-crop.jpg` | `MediaFigure` (via `next/image`) | 1630 × 970 | 1.68:1 | Section 02 grid column `c1-7`, paired with stage note (`→ you profile yourself`). |
| `/assets/bettr/stage2-crop.jpg` | `MediaFigure` (via `next/image`) | 1630 × 970 | 1.68:1 | Section 02 grid column `c7-13`, paired with stage note (`→ no path preserves control`). |
| `/assets/bettr/dashboard-thumb-crop.jpg` | `MediaFigure` (via `next/image`) | 1525 × 966 | 1.58:1 | Section 02 grid column `c1-8` (dominant landing point), paired with autonomy residual note. |
| `/assets/bettr/stage4-crop.jpg` | `MediaFigure` (via `next/image`) | 1630 × 965 | 1.69:1 | Section 02 grid column `c8-13`, paired with final reframing note. |
| `/assets/bettr/landing-crop.jpg` | `MediaFigure` (via `next/image`) | 1918 × 1005 | 1.91:1 | Section 03 grid column `c5-13`, sitting alongside `c1-5` text. |
| `/assets/bettr/vscode-structure.jpeg` | `MediaFigure` (`crop="coverTopLeft"`) | 1919 × 1079 (crops to 3:2) | 1.78:1 raw (1.50:1 crop) | Section 03 grid column `c1-6`, paired with `c6-13` process evidence quote. |

### 2.2 `cardiopal` (`/projects/cardiopal` — `CardioPalCaseStudy.tsx`)
*Deliberately contains **0 raster images**. As documented in `src/data/projects.ts`, CardioPal's evidence is conveyed exclusively through an interactive Figma prototype embed and typographic data displays.*

| Asset Source | Component Implementation | Dimensions | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| `embed.figma.com/...` | `PrototypeEmbed` (`toneLight allowFullScreen`) | Responsive iframe | 16:10 | Hero opening evidence slot in `c5-13` with full prototype link. |
| Vitals Metric Cards | Typographic grid (`.vitals-grid`) | 4 cards | CSS Grid | Section 03 within `.proj-paper-panel` (71% completion, ≤10s login, 2 participants, 8/10 ease). |
| Usability Task List | Typographic list (`.task-list`) | 5 tasks | `c1-8` | Section 03 split layout next to `c9-13` quote cards. |

### 2.3 `frankenteen` (`/projects/frankenteen` — `FrankenTeenCaseStudy.tsx`)
*Uses 7 raster images + 1 Kaltura video iframe.*

| Asset Source | Component Implementation | Dimensions (W × H) | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| `/assets/frankenteen/mansion-gate-crop.jpg` | Plain `Image` inside raw `<figure className="hero-visual">` | 1070 × 657 | 1.63:1 | Hero split column `c8-13` (beside `c1-7` thesis text). |
| `/assets/frankenteen/bedroom-clean-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={660}`) | 660 × 435 | 1.52:1 | Section 01 column `c1-6` (stacked above guitar prop). |
| `/assets/frankenteen/guitar-prop-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={330}`) | 330 × 127 | 2.60:1 | Section 01 column `c1-6` (stacked below bedroom with inline `marginTop: 16`). |
| `/assets/frankenteen/pacing-chart-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={810}`) | 810 × 625 | 1.30:1 | Section 02 column `c6-13` (beside `c1-5` text). |
| `/assets/frankenteen/mansion-approach-crop.jpg` | Plain `Image` inside `<figure style={nativeWidth(1022)}>` | 1022 × 627 | 1.63:1 | Section 03 left item inside `.feature-media.pair`. |
| `/assets/frankenteen/mansion-progression-crop.jpg` | Plain `Image` inside `<figure style={nativeWidth(444)}>` | 444 × 894 | 1:2.01 (tall portrait) | Section 03 right item inside `.feature-media.pair` (mismatched aspect ratio). |
| `/assets/frankenteen/attic-approach-crop.jpg` | Plain `Image` inside `<figure style={nativeWidth(973)}>` | 973 × 641 | 1.52:1 | Section 04 left item inside `.feature-media.pair`. |
| `/assets/frankenteen/attic-lab-crop.jpg` | Plain `Image` inside `<figure style={nativeWidth(520)}>` | 520 × 354 | 1.47:1 | Section 04 right item inside `.feature-media.pair`. |
| `/assets/frankenteen/blender-wall-module-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={340}`) | 340 × 262 | 1.30:1 | Section 05 column `c9-13` (beside `c1-8` implementation text). |

### 2.4 `echoes` (`/projects/echoes` — `EchoesCaseStudy.tsx`)
*Uses 4 raster images + 1 Kaltura video iframe with custom animated poster component.*

| Asset Source | Component Implementation | Dimensions (W × H) | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| `/assets/echoes/laptop-interaction-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={471} className="tone-dim proj-dominant-shot"`) | 471 × 356 | 1.32:1 | Hero split column `c6-13` (beside `c1-5` text). |
| `/assets/echoes/room-scene-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={471} className="tone-dim proj-dominant-shot"`) | 471 × 356 | 1.32:1 | Section 01 column `c6-13` (beside `c1-5` text). |
| `/assets/echoes/runner-scene-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={471} className="tone-dim proj-dominant-shot runner-dominant"`) | 471 × 356 | 1.32:1 | Section 03 lead banner spanning full width `c1-13`. |
| `/assets/echoes/track-blender-crop.jpg` | `MediaFigure` (`crop="native" nativeWidth={280} className="tone-dim"`) | 280 × 204 | 1.37:1 | Section 03 column `c9-13` (beside `c1-8` text). |

### 2.5 `smartphone-mold` (`/projects/smartphone-mold` — `SmartphoneMoldCaseStudy.tsx`)
*Uses 4 raster images. Does not use `MediaFigure`.*

| Asset Source | Component Implementation | Dimensions (W × H) | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| `/assets/smartphone/convergence-figure1.jpeg` | Plain `Image` inside `<div className="smartphone-hero-image">` (`unoptimized priority`) | 670 × 882 | 1:1.32 (portrait) | Hero container centered below title/tags. |
| `/assets/smartphone/nothing-transparent.jpeg` | Plain `Image` inside `<div className="smartphone-shot">` (`unoptimized`) | 1235 × 926 | 1.33:1 (4:3) | Section 03 left item in 2-column `.smartphone-shot-grid`. |
| `/assets/smartphone/cmf-product.jpeg` | Plain `Image` inside `<div className="smartphone-shot">` (`unoptimized`) | 1164 × 655 | 1.78:1 (16:9) | Section 03 right item in 2-column `.smartphone-shot-grid`. |
| `/assets/smartphone/glyph-leak.jpeg` | Plain `Image` inside `<div className="smartphone-shot">` (`unoptimized`) | 1346 × 576 | 2.34:1 (wide banner) | Section 04 left item in 2-column grid next to quote card. |

### 2.6 `playing-freedom` (`/projects/playing-freedom` — `PlayingFreedomCaseStudy.tsx`)
*Contains **0 raster images**. The entire core deliverable is an embedded Kaltura video documentary.*

| Asset Source | Component Implementation | Dimensions | Aspect Ratio | Placement & Grid Relationship |
|---|---|---|---|---|
| Kaltura Video Documentary | Full-width responsive iframe inside `<section className="freedom-video-hero">` | 16:9 responsive | 16:9 | Hero position directly beneath title and tag strip. |

---

## 3. Shared & Reusable Layout Component Surface

The existing design system in `src/components/projects/` provides 9 foundational building blocks:

```
src/components/projects/
├── ProjectPageShell.tsx       # Root semantic wrapper establishing project accent tokens
├── ProjectOpening.tsx         # Standardized asymmetric opening spread (c1-5 / c5-13)
├── ProjectSection.tsx         # Numbered chapter container with scroll reveal hooks
├── SectionHeading.tsx         # Numbered chapter heading component (mono number + title)
├── MediaFigure.tsx            # Evidence figure with native/crop options and note badges
├── ProjectAnnotation.tsx      # Deep-dive design feature block with media slot
├── VideoBlock.tsx             # 16:9 responsive video player with mono status strip
├── PrototypeEmbed.tsx         # Live prototype iframe shell with status bar & open links
└── BettrLiveEmbed.tsx         # Interactive live iframe bridge for BETTR
```

### Detailed Component API Surface

1. **`ProjectPageShell`** (`src/components/projects/ProjectPageShell.tsx`):
   - **Props:** `accent: ProjectAccent`, `children: ReactNode`
   - **Responsibility:** Wraps the entire page in `<article className="project-page project-{accent}">`, establishing CSS custom properties (`--proj-accent`, `--proj-text`, `--proj-surface`).

2. **`ProjectOpening`** (`src/components/projects/ProjectOpening.tsx`):
   - **Props:** `eyebrow: string`, `title: ReactNode`, `thesis: string`, `meta: {label: string, value: ReactNode}[]`, `ownership: string`, `children: ReactNode`, `variant?: "split"`
   - **Responsibility:** Standardizes the hero opening spread with asymmetric columns (`.c1-5` for title, thesis, facts, and ownership; `.c5-13` for the primary evidence slot).

3. **`ProjectSection`** (`src/components/projects/ProjectSection.tsx`):
   - **Props:** `id?: string`, `number: string`, `title: ReactNode`, `featureTitle?: boolean`, `rhythm?: "standard" | "feature" | "tight"`, `children: ReactNode`
   - **Responsibility:** Manages numbered chapter headings, vertical rhythm spacing (`.is-feature-chapter`, `.tight-top`), and scroll-reveal classes.

4. **`SectionHeading`** (`src/components/projects/SectionHeading.tsx`):
   - **Props:** `number: string`, `title: ReactNode`, `feature?: boolean`
   - **Responsibility:** Renders the mono section index badge (`.proj-sec-num`) and `<h2>` header.

5. **`MediaFigure`** (`src/components/projects/MediaFigure.tsx`):
   - **Props:** `src: string`, `alt: string`, `width: number`, `height: number`, `caption?: ReactNode`, `note?: {heading?: string, body: ReactNode, outcome?: string}`, `crop?: "default" | "coverTopLeft" | "native"`, `nativeWidth?: number`, `loading?: "lazy" | "eager"`, `className?: string`
   - **Responsibility:** Renders responsive screenshots using `next/image`, applying controlled cropping (`coverTopLeft` 3:2 or `native` pixel caps) and structured evidence note pills.

6. **`ProjectAnnotation`** (`src/components/projects/ProjectAnnotation.tsx`):
   - **Props:** `label: string`, `media?: ReactNode`, `children: ReactNode`
   - **Responsibility:** Container for technical system callouts (e.g. palette bands, type specimens).

7. **`VideoBlock`** (`src/components/projects/VideoBlock.tsx`):
   - **Props:** `src: string`, `title: string`, `label: string`, `className?: string`
   - **Responsibility:** 16:9 iframe embed with an associated mono label bar.

8. **`PrototypeEmbed`** (`src/components/projects/PrototypeEmbed.tsx`):
   - **Props:** `src`, `title`, `barLabel`, `openHref`, `openLabel?`, `watched?`, `openCursorHint?`, `iframeRef?`, `onIframeLoad?`, `overlay?`, `allowFullScreen?`, `toneLight?`, `className?`
   - **Responsibility:** Chrome frame for interactive embeds (Figma, live web builds) with top metadata bar, full-screen action link, and light/dark tone variants.

---

## 4. Concrete Image Sizing & Layout Inconsistencies

A detailed comparison across all six pages reveals five major categories of visual and structural inconsistencies:

### A. Ad-Hoc Bypassing of `MediaFigure`
- **In `FrankenTeenCaseStudy.tsx`:** 5 out of 7 images completely bypass `MediaFigure` in favor of raw `<figure>` tags with inline CSS variables (`style={nativeWidth(1022)}`). This creates divergent caption styling, inconsistent margin collapse, and unstandardized DOM wrappers.
- **In `SmartphoneMoldCaseStudy.tsx`:** 100% of images bypass `MediaFigure`, rendering plain `next/image` elements inside custom `.smartphone-hero-image` and `.smartphone-shot` containers with `unoptimized` flags.

### B. Aspect Ratio Mismatches in Side-by-Side Pairs
- **FrankenTeen Section 03 (`.feature-media.pair`):** A landscape scene screenshot (`1022 × 627`, 1.63:1) is paired side-by-side with a tall 3-stage build progression strip (`444 × 894`, 1:2.01). Because the right image is more than twice as tall as the left, the bottom alignment is jarringly broken.
- **FrankenTeen Section 04 (`.feature-media.pair`):** A large courtyard render (`973 × 641`, 1.52:1) is paired with a smaller lab capture (`520 × 354`, 1.47:1).
- **Smartphone Mold Section 03 (`.smartphone-shot-grid`):** A 4:3 image (`nothing-transparent.jpeg`, 1235 × 926) is paired horizontally with a 16:9 image (`cmf-product.jpeg`, 1164 × 655), causing the card containers to have uneven bottom baselines.

### C. Overly Aggressive Native Width Caps vs. Full-Bleed Scaling
- **In `EchoesCaseStudy.tsx`:** Every image uses `crop="native"` with strict width caps (`471px` and `280px`) and `.tone-dim`. In a 1440px viewport, this causes images to render as small, dim thumbnail boxes floating inside wide 13-column grid tracks (`c6-13` and `c1-13`), failing to convey the atmospheric presence intended for environmental storytelling.
- **In `BETTR`:** Images scale fluidly to fill their grid column allocations (`c1-7`, `c7-13`, `c1-8`), creating a much more confident and immersive editorial rhythm.

### D. Hero Spread Structure Fragmentation
- `BETTR` and `CardioPal` use the standardized `ProjectOpening` component (`.proj-hero`, `.c1-5` / `.c5-13`).
- `FrankenTeen` and `Echoes of Home` write raw `<section className="proj-hero">` with custom column splits (`.c1-7` / `.c8-13` in FrankenTeen, `.c1-5` / `.c6-13` in Echoes).
- `Smartphone Mold` and `Playing Freedom` use bespoke `.smartphone-hero` and `.freedom-hero` structures with custom lowercase header bars (`.smartphone-statusbar`, `.freedom-statusbar`) lacking standard pagination links (`Next: ... →`).

### E. Chapter Container Component Duplication
- While `BETTR`, `CardioPal`, `FrankenTeen`, and `Echoes` use the shared `ProjectSection` component, `Smartphone Mold` implements an ad-hoc `SmartphoneSection` helper, and `Playing Freedom` implements an ad-hoc `FreedomSection` helper.

---

## 5. Status & Capability Audit: `BettrBackground.tsx` & `ScrollProgress.tsx`

Both components remain intact and preserved in `next-portfolio/src/components/phase2/` from the earlier pilot:

### 5.1 `BettrBackground.tsx` (`src/components/phase2/BettrBackground.tsx`)
- **Current State:** Present in codebase, fully implemented, currently **unused / detached** from any page.
- **Implementation & Capabilities:**
  - Client component (`"use client"`) with built-in `prefers-reduced-motion` detection.
  - Generates a subtle, mouse-reactive parallax background (`pointermove` with `requestAnimationFrame` lerp damping at factor `0.08`).
  - Renders a large ambient radial glow (`#ff6a78`) and an SVG coordinate grid / radar pulse geometry matching the BETTR identity.
  - Can be easily generalized into a multi-project `ProjectBackground` taking dynamic accent colors and SVG motif archetypes.

### 5.2 `ScrollProgress.tsx` (`src/components/phase2/ScrollProgress.tsx`)
- **Current State:** Present in codebase, fully implemented, currently **unused / detached** from any page.
- **Implementation & Capabilities:**
  - Client component (`"use client"`) with passive window scroll listener.
  - Calculates document scroll percentage (`(scrollY / (scrollHeight - innerHeight)) * 100`).
  - Displays a clean top progress bar track + reading badge (`01 / 06 · BETTR.  42%`) with full ARIA accessibility (`role="progressbar"`, `aria-valuenow`).
  - Ready for immediate integration into case-study page shells or layouts.

---

## 6. Screenshot Repository Artifacts

All full-page desktop screenshots (1440px width, complete scroll height) and the composite contact sheet montage have been saved directly inside the repository at:

📁 **`docs/review-screenshots/phase2-project-pages/`**

| Filename | File Size | Description |
|---|---|---|
| `contact-sheet-all-projects.png` | 10.14 MB | **Labeled composite contact sheet** (3×2 grid montage of all 6 case studies) |
| `01-bettr-full.png` | 1.60 MB | BETTR full-page desktop screenshot (9589px height) |
| `02-cardiopal-full.png` | 0.81 MB | CardioPal full-page desktop screenshot (6782px height) |
| `03-frankenteen-full.png` | 3.10 MB | FrankenTeen full-page desktop screenshot (9251px height) |
| `04-echoes-full.png` | 1.17 MB | Echoes of Home full-page desktop screenshot (6929px height) |
| `05-smartphone-mold-full.png` | 1.14 MB | Breaking the Smartphone Mold full-page desktop screenshot (5307px height) |
| `06-playing-freedom-full.png` | 0.59 MB | Playing Freedom full-page desktop screenshot (3406px height) |

---

## 7. Conclusions & Strategic Next Steps

1. **Content Integrity:** Zero content reconstruction is needed. All 6 case studies possess rich, nuanced, and complete text and evidence.
2. **Component Harmonization Opportunity:** Refactoring `FrankenTeen`, `Echoes`, `Smartphone Mold`, and `Playing Freedom` to fully leverage `ProjectOpening`, `ProjectSection`, and `MediaFigure` will eliminate layout drift while retaining 100% of each project's unique personality and accent identity.
3. **Asset Sizing Normalization:** Pairing rules for `.feature-media.pair` should enforce matched aspect ratios or dynamic height alignment to eliminate jagged vertical baselines.
