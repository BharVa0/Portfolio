# Portfolio Phase 2 Design System Specification

**Target Route:** `/phase-2-preview`  
**Controlled Baseline:** `docs/PORTFOLIO_PHASE_2_CONTROL.md`  
**Audit Date:** 13 August 2026  
**Status:** Audit of implemented tokens and component APIs as of commit `9cbbbf2a3aff6f6d67e825cd7e456d44877a968d` on branch `phase-2-redesign`.

---

## 1. Color Tokens

### 1.1 Per-Project Color & Motif States (6 Projects)

Source of truth: [ReelData.ts](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ReelData.ts) (lines 15–94) and [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css) (lines 146–151).

#### 01 — BETTR.
- **Background (`bgHex`)**: `#260a10` (source: `ReelData.ts` line 25)
- **Accent (`accentHex`)**: `#ff6a78` (source: `ReelData.ts` line 24)
- **Motif Type**: `"profiling-grid"` (source: `ReelData.ts` line 26)
- **CSS Title Class (`.title_bettr`)**: `color: #ff6a78;` (source: `ProjectReel.module.css` line 146)

#### 02 — CardioPal
- **Background (`bgHex`)**: `#0e1715` (source: `ReelData.ts` line 38)
- **Accent (`accentHex`)**: `#82b5a5` (source: `ReelData.ts` line 37)
- **Motif Type**: `"ekg-pulse"` (source: `ReelData.ts` line 39)
- **CSS Title Class (`.title_cardiopal`)**: `color: #82b5a5;` (source: `ProjectReel.module.css` line 147)

#### 03 — FrankenTeen
- **Background (`bgHex`)**: `#1c1611` (source: `ReelData.ts` line 51)
- **Accent (`accentHex`)**: `#f4a261` (source: `ReelData.ts` line 50)
- **Motif Type**: `"harmonic-wave"` (source: `ReelData.ts` line 52)
- **CSS Title Class (`.title_frankenteen`)**: `color: #f4a261;` (source: `ProjectReel.module.css` line 148)

#### 04 — Echoes of Home
- **Background (`bgHex`)**: `#181410` (source: `ReelData.ts` line 64)
- **Accent (`accentHex`)**: `#e9c46a` (source: `ReelData.ts` line 63)
- **Motif Type**: `"spatial-ray"` (source: `ReelData.ts` line 65)
- **CSS Title Class (`.title_echoes`)**: `color: #e9c46a;` (source: `ProjectReel.module.css` line 149)

#### 05 — Breaking the Smartphone Mold
- **Background (`bgHex`)**: `#141414` (source: `ReelData.ts` line 77)
- **Accent (`accentHex`)**: `#e63946` (source: `ReelData.ts` line 76)
- **Motif Type**: `"glyph-matrix"` (source: `ReelData.ts` line 78)
- **CSS Title Class (`.title_smartphone-mold`)**: `color: #e63946;` (source: `ProjectReel.module.css` line 150)

#### 06 — Playing Freedom
- **Background (`bgHex`)**: `#0d1b2a` (source: `ReelData.ts` line 90)
- **Accent (`accentHex`)**: `#457b9d` (source: `ReelData.ts` line 89)
- **Motif Type**: `"horizon-grid"` (source: `ReelData.ts` line 91)
- **CSS Title Class (`.title_playing-freedom`)**: `color: #457b9d;` (source: `ProjectReel.module.css` line 151)

---

### 1.2 Shared & Neutral Color Tokens

Source of truth: [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css) and [tokens.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/styles/tokens.css).

- **Surface / Canvas Fallback**: `#100f0e` (source: `ProjectReel.module.css` lines 9, 28)
- **End Section Surface**: `#0d0c0b` (source: `ProjectReel.module.css` line 273)
- **Paper / Primary Text**: `var(--paper, #f4efe6)` (source: `ProjectReel.module.css` line 10; `tokens.css` line 12: `--paper: #f2eee9`)
- **Ink / Deep Background**: `--ink: #0d0c0b` (source: `tokens.css` line 9)
- **Eyebrow Text**: `rgba(244, 239, 230, 0.72)` (source: `ProjectReel.module.css` line 122)
- **Meta Badge Text**: `rgba(244, 239, 230, 0.85)` (source: `ProjectReel.module.css` line 163)
- **Meta Badge Surface**: `rgba(16, 15, 14, 0.4)` (source: `ProjectReel.module.css` line 164)
- **Meta Badge Border**: `rgba(244, 239, 230, 0.22)` (source: `ProjectReel.module.css` line 157)
- **Premise Text**: `rgba(244, 239, 230, 0.92)` (source: `ProjectReel.module.css` line 173)
- **Action Link Surface**: `rgba(16, 15, 14, 0.35)` (source: `ProjectReel.module.css` line 194)
- **Action Link Hover Text**: `#ffffff` (source: `ProjectReel.module.css` line 199)
- **Chrome Divider**: `rgba(244, 239, 230, 0.25)` (source: `ProjectReel.module.css` line 76)
- **End Section Divider**: `rgba(244, 239, 230, 0.2)` (source: `ProjectReel.module.css` line 274)
- **End Body Text**: `rgba(244, 239, 230, 0.8)` (source: `ProjectReel.module.css` line 302)
- **End Nav Button Border**: `rgba(244, 239, 230, 0.3)` (source: `ProjectReel.module.css` line 311)
- **End Nav Button Hover Surface**: `rgba(244, 239, 230, 0.12)` (source: `ProjectReel.module.css` line 323)
- **End Nav Button Hover Border**: `rgba(244, 239, 230, 0.6)` (source: `ProjectReel.module.css` line 324)
- **SVG Ambient Radial Glow**: `stopOpacity="0.22"` at 0%, `stopOpacity="0"` at 100% (source: `ReelBackground.tsx` lines 36–37)

---

## 2. Typography

Source of truth: [tokens.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/styles/tokens.css) (lines 26–28) and [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css).

### 2.1 Font Families
- **Display Font (`--font-display`)**: `"Fraunces", ui-serif, Georgia, serif` (source: `tokens.css` line 26; consumed in `ProjectReel.module.css` line 127)
- **Body Font (`--font-body`)**: `"Inter", system-ui, -apple-system, sans-serif` (source: `tokens.css` line 27; consumed in `globals.css` line 38)
- **Mono Font (`--font-mono`)**: `"Space Mono", ui-monospace, monospace` (source: `tokens.css` line 28; consumed in `ProjectReel.module.css` lines 78, 117, 159, 188, 282, 312)

### 2.2 Typographic Ramp in Phase 2 Reel
- **Header Chrome / Metadata (`.stageChrome`, `.selectedMarker`)**:
  - Size: `clamp(0.66rem, 0.7vw, 0.78rem)` (desktop; line 79), `0.6rem` (mobile <=599px; line 370)
  - Line-height: `1.35` (line 80)
  - Letter-spacing: `0.08em` (line 81)
  - Transform: `uppercase` (line 82)
- **Discipline Eyebrow (`.eyebrow`)**:
  - Size: `clamp(0.66rem, 0.68vw, 0.78rem)` (line 118)
  - Line-height: `1.4` (line 119)
  - Letter-spacing: `0.09em` (line 120)
  - Transform: `uppercase` (line 121)
- **Stage Display Title (`.stageTitle`)**:
  - Size: `clamp(4.2rem, 9.5vw, 11rem)` (desktop; line 131), `clamp(3.4rem, 14vw, 7.5rem)` (tablet <=1023px; line 361), `clamp(2.8rem, 16vw, 4.8rem)` (mobile <=599px; line 380)
  - Weight: `520` (line 128)
  - Line-height: `0.84` (line 129)
  - Letter-spacing: `-0.075em` (desktop; line 130), `-0.06em` (mobile <=599px; line 381)
- **Meta Badge (`.metaBadge`)**:
  - Size: `clamp(0.64rem, 0.65vw, 0.74rem)` (line 160)
  - Letter-spacing: `0.06em` (line 161)
  - Transform: `uppercase` (line 162)
- **Premise Copy (`.premise`)**:
  - Size: `clamp(1.05rem, 1.25vw, 1.45rem)` (desktop; line 171), `1rem` (mobile <=599px; line 385)
  - Line-height: `1.45` (line 172)
  - Max-width: `38rem` (line 169)
- **Project Action Link (`.projectLink`)**:
  - Size: `0.76rem` (line 189)
  - Letter-spacing: `0.06em` (line 190)
  - Transform: `uppercase` (line 192)
  - Min-height: `48px` (line 182)
- **End Marker (`.endMarker`)**:
  - Size: `0.72rem` (line 283), letter-spacing: `0.08em` (line 284), uppercase
- **End Title (`.endTitle`)**:
  - Size: `clamp(2.4rem, 5vw, 4.2rem)` (line 291), weight: `500` (line 292), line-height: `1.05` (line 293), letter-spacing: `-0.04em` (line 294)
- **End Body (`.endBody`)**:
  - Size: `clamp(1rem, 1.2vw, 1.25rem)` (line 300), line-height: `1.5` (line 301), max-width: `46rem` (line 278)
- **End Nav Button (`.endNavButton`)**:
  - Size: `0.74rem` (line 313), letter-spacing: `0.06em` (line 314), uppercase, min-height: `44px` (line 309)

---

## 3. Spacing and Layout Grid

Source of truth: [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css).

### 3.1 Gutters and Margins
- **Desktop Reel Gutter**: `--reel-gutter: clamp(20px, 4vw, 72px)` (source: line 7)
- **Mobile Reel Gutter (<=599px)**: `--reel-gutter: 18px` (source: line 367)

### 3.2 Stage Section Heights
- **Desktop Stage Section (`.stageSection`)**: `min-height: 150svh;` (source: line 53)
- **Desktop Sticky Stage (`.stage`)**: `position: sticky; top: 0; height: 100svh; min-height: 680px; padding: clamp(24px, 3.5vh, 40px) var(--reel-gutter);` (source: lines 58–63)
- **Mobile/Tablet Stage (<=1023px)**:
  - `.stageSection`: `min-height: auto;` (source: line 332)
  - `.stage`: `position: relative; height: auto; min-height: 100svh; padding: 28px var(--reel-gutter) clamp(56px, 8vw, 96px);` (source: lines 336–340)
- **End Section (`.endSection`)**: `min-height: 60svh; padding: clamp(60px, 10vw, 140px) var(--reel-gutter);` (source: lines 269, 272)

### 3.3 Spatial Layout Rhythms Across Stages
- **`heroic-left` (BETTR.)**: `.identityBlock` `max-width: 68vw; margin-left: 0;` (lines 217–220)
- **`asymmetric-right` (CardioPal)**: `.identityBlock` `max-width: 60vw; margin-left: auto; text-align: right;` (lines 222–226)
- **`split-editorial` (FrankenTeen)**: `.identityBlock` `max-width: 72vw; margin-left: 5vw;` (lines 234–237)
- **`staggered-left` (Echoes of Home)**: `.identityBlock` `max-width: 64vw; margin-left: 2vw;` (lines 239–242)
- **`wide-center` (Breaking the Smartphone Mold)**: `.identityBlock` `max-width: 80vw; margin: 0 auto; text-align: center;` (lines 244–248)
- **`grand-finale` (Playing Freedom)**: `.identityBlock` `max-width: 76vw; margin-left: 4vw;` (lines 258–261)
- **Mobile Overrides (<=1023px)**: All `.identityBlock` reset to `max-width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; text-align: left !important;` (lines 343–348)

---

## 4. Motion

Source of truth: [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css) and [ReelMotion.tsx](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ReelMotion.tsx).

### 4.1 CSS Transitions
- **Atmosphere Background Transition**: `transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1);` (source: `ProjectReel.module.css` line 29)
- **SVG Motif Group Transition**: `transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);` (source: `ProjectReel.module.css` line 41)
- **Stage Number Transition**: `transition: color 0.5s ease;` (source: `ProjectReel.module.css` line 93)
- **Project Link Hover Transition**: `transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease, transform 180ms ease;` (source: `ProjectReel.module.css` line 195)
- **Link Arrow Hover Transition**: `transition: transform 180ms ease;` (source: `ProjectReel.module.css` line 207)
- **End Nav Button Hover Transition**: `transition: background 160ms ease, border-color 160ms ease;` (source: `ProjectReel.module.css` line 319)

### 4.2 Lenis Smooth Scroll Configuration (Desktop >=1024px)
Source: [ReelMotion.tsx](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ReelMotion.tsx) lines 31–43.
- `autoRaf: false`
- `lerp: 0.085`
- `smoothWheel: true`
- `syncTouch: false`
- `wheelMultiplier: 0.9`
- GSAP Ticker Integration: `const advanceLenis = (time: number) => lenis.raf(time * 1000); gsap.ticker.add(advanceLenis);`

### 4.3 GSAP ScrollTrigger Configurations
Source: [ReelMotion.tsx](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ReelMotion.tsx).

#### Desktop Query `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` (line 29)
- **Scrub**: `0.55` (line 63)
- **Start / End**: `start: "top top"`, `end: "bottom bottom"` (lines 61–62)
- **Defaults**: `{ ease: "power3.out" }` (line 58)
- **Timeline Enter Keyframes**:
  - `chrome`: `{ autoAlpha: 0, yPercent: 60 }` -> `{ autoAlpha: 1, yPercent: 0, duration: 0.18, stagger: 0.015 }` at `0` (lines 69–74)
  - `words`: `{ autoAlpha: 0, yPercent: 110, rotate: 1.2 }` -> `{ autoAlpha: 1, yPercent: 0, rotate: 0, duration: 0.25, stagger: 0.02 }` at `0.01` (lines 75–86)
  - `meta`: `{ autoAlpha: 0, y: 28 }` -> `{ autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.02 }` at `0.025` (lines 87–92)
  - `copy`: `{ autoAlpha: 0, y: 36 }` -> `{ autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.025 }` at `0.04` (lines 93–98)
- **Timeline Exit Keyframes**:
  - `[chrome, words, meta, copy]`: -> `{ autoAlpha: 0, yPercent: -40, duration: 0.32, stagger: 0.006, ease: "power2.inOut" }` at `0.68` (lines 99–107)
- **Active Stage Toggle Callback**: `onToggle: (self) => { if (self.isActive && onStageChange) onStageChange(index); }` (lines 65–67)

#### Compact Query `(max-width: 1023px) and (prefers-reduced-motion: no-preference)` (line 148)
- **Active Stage Observer**: `start: "top 60%"`, `end: "bottom 40%"`, `onToggle: (self) => { if (self.isActive && onStageChange) onStageChange(index); }` (lines 156–162)
- **Mobile Reveal Reveal**: `start: "top 88%"`, `once: true`, `{ autoAlpha: 0, y: 24, duration: 0.65, ease: "power3.out" }` (lines 170–178)

### 4.4 Reduced Motion Path (`prefers-reduced-motion: reduce`)
Source: [ProjectReel.module.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/ProjectReel.module.css) lines 397–424 and `ReelMotion.tsx` line 29.
- `.stageSection`: `min-height: auto;`
- `.stage`: `position: relative; height: auto; min-height: auto; padding-bottom: 60px;`
- `.bgAtmosphere, .motifGroup, .projectLink, .stageNumber`: `transition: none !important;`
- `.motifGroup`: `opacity: 0.4;`
- `.stageTitle [data-split-word]`: `will-change: auto;`
- GSAP and Lenis animation blocks are completely bypassed by media queries.

### 4.5 Animation Ownership & Library Division of Responsibility

A deliberate decision has been made to adopt `motion` (the npm package `motion`, formerly Framer Motion) as an intentionally scoped second animation dependency alongside GSAP + Lenis.

*Superseding Note:* This decision explicitly supersedes the earlier "default-avoid-motion" stance recorded in the initial design-system audit. That original stance was correct at the time to prevent opportunistic, duplicate dependency proliferation. The adoption of `motion` is a considered, deliberate addition of a second scoped library for React component lifecycle and layout transitions, not an opportunistic addition or contradiction.

#### 1. GSAP + Lenis Responsibility (Scroll & Choreography)
- **Scope**: Scroll-linked animation, ScrollTrigger timelines, persistent background/motif state choreography, scrubbed timeline sequences, and smooth wheel physics (Lenis).
- **Rule**: All scroll-linked effects, ScrollTrigger scrubbed timelines, and persistent background transitions remain strictly owned by GSAP + Lenis. `motion` must **not** be used for scroll-triggered or persistent background work.

#### 2. `motion` Package Responsibility (Component Lifecycle & Layout)
- **Scope**: React-lifecycle micro-interactions (mount/exit transitions via `AnimatePresence`), state-driven hover/focus spring physics, and shared element layout morphing (`layoutId`) between components or routes.
- **Rule**: `motion` is strictly scoped to React component-local UI interactions, mount/exit states, and shared layout morphing. It must **not** compete with or duplicate GSAP's scroll orchestration.

---

## 5. Component Prop & API Surface

### 5.1 `ReelData.ts` Data Registry
- **File**: `next-portfolio/src/components/phase2/ReelData.ts`
- **Exports**:
  - `export interface ReelProject`:
    ```ts
    export interface ReelProject {
      id: string;
      number: string;
      title: string;
      discipline: string;
      meta: string;
      premise: string;
      link: string;
      accentHex: string;
      bgHex: string;
      motifType: "profiling-grid" | "ekg-pulse" | "harmonic-wave" | "spatial-ray" | "glyph-matrix" | "horizon-grid";
      layoutStyle: "heroic-left" | "asymmetric-right" | "wide-center" | "split-editorial" | "staggered-left" | "grand-finale";
    }
    ```
  - `export const REEL_PROJECTS: readonly ReelProject[]`

### 5.2 `ReelBackground` Component
- **File**: `next-portfolio/src/components/phase2/ReelBackground.tsx`
- **Directive**: `"use client"`
- **Props**:
  ```ts
  interface ReelBackgroundProps {
    activeIndex: number;
  }
  ```
- **Description**: Single persistent background owner mounted behind the reel sequence. Accepts zero-indexed `activeIndex`, looks up `REEL_PROJECTS[activeIndex]`, passes custom CSS properties `--active-bg` and `--active-accent` to container, sets `data-active-motif`, and toggles SVG motif group `.motifActive` visibility.

### 5.3 `ProjectReel` Component
- **File**: `next-portfolio/src/components/phase2/ProjectReel.tsx`
- **Directive**: `"use client"`
- **Props**: None (`export function ProjectReel()`)
- **Internal State**: `const [activeIndex, setActiveIndex] = useState(0);`
- **Description**: Primary layout container for `/phase-2-preview`. Mounts `<ReelMotion onStageChange={setActiveIndex}>`, embeds `<ReelBackground activeIndex={activeIndex} />`, loops over `REEL_PROJECTS` rendering typography-led stages with `SplitStageTitle`, and renders the completion `<section className={styles.endSection}>`.

### 5.4 `ReelMotion` Component
- **File**: `next-portfolio/src/components/phase2/ReelMotion.tsx`
- **Directive**: `"use client"`
- **Props**:
  ```ts
  type ReelMotionProps = {
    children: ReactNode;
    onStageChange?: (index: number) => void;
  };
  ```
- **Description**: Animation lifecycle wrapper. Registers GSAP `ScrollTrigger` and `@gsap/react` `useGSAP`, initializes and updates single `Lenis` instance, constructs scrubbed GSAP timelines per stage on desktop, triggers `onStageChange(index)` callbacks when stages enter focus, and handles complete cleanup on unmount.

### 5.5 `SplitStageTitle` Component
- **File**: `next-portfolio/src/components/phase2/SplitStageTitle.tsx`
- **Directive**: `"use client"`
- **Props**:
  ```ts
  type SplitStageTitleProps = {
    text: string;
    id?: string;
    className?: string;
    as?: "h2" | "h3";
  };
  ```
- **Description**: Accessible word-split heading component adapted from React Bits Split Text. Renders semantic heading element with `aria-label={text}` and `data-split-title`, containing screen-reader hidden spans (`aria-hidden="true"`) for per-word animation without sacrificing accessible tree hierarchy.

---

## 6. Unresolved Items

1. **`SplitStageTitle` React Bits / Commons Clause Licensing Status**:
   - **Status**: `UNRESOLVED — REQUIRES APPROVAL before commit` per `docs/PORTFOLIO_PHASE_2_CONTROL.md` §9.4 and `docs/PHASE_2_COMPONENT_LEDGER.md`.
   - **Details**: Adapted from React Bits free Split Text (`https://github.com/DavidHDev/react-bits`). The source carries an MIT License combined with a Commons Clause License Condition v1.0. While portfolio usage is application code rather than component redistribution, official approval from Bharat is explicitly flagged in the control document as required prior to any git commit.
2. **Motion Token Global Alignment**:
   - **Status**: `UNRESOLVED — needs exact value reconciliation`
   - **Details**: [tokens.css](file:///z:/GitRepo/Portfolio/next-portfolio/src/styles/tokens.css) defines generic placeholder tokens (`--motion-duration-fast: 150ms`, `--motion-duration-base: 300ms`, `--motion-ease: ease`), whereas the active Phase 2 implementation in `ProjectReel.module.css` and `ReelMotion.tsx` uses custom timing (`0.8s cubic-bezier(0.16, 1, 0.3, 1)`, `0.5s ease`, `180ms ease`, `160ms ease`, `scrub: 0.55`). Formal reconciliation into global CSS custom properties has not been performed.
