# Phase 2 About & Contact Content & Typography Audit

**Audit Date:** 15 August 2026  
**Status:** Strictly Read-Only Baseline Audit for the Standalone `/about` and `/contact` Page Redesign  
**Branch:** `main`  
**Controlled Baseline:** `docs/PORTFOLIO_PHASE_2_CONTROL.md` and `docs/PHASE_2_DESIGN_SYSTEM.md`  

---

## 1. Verbatim Current Copy Inventory

All text below is extracted verbatim from [`next-portfolio/src/components/home/HomepageClosing.tsx`](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/home/HomepageClosing.tsx) and its styling definitions in [`next-portfolio/src/components/home/HomepageClosing.module.css`](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/home/HomepageClosing.module.css). No paraphrasing, summarizing, or content alteration has been applied.

```tsx
// Source: next-portfolio/src/components/home/HomepageClosing.tsx
```

### 1.1 Practice Section (`#practice`)

* **Section ID:** `practice`
* **ARIA Label:** `Practice`
* **Eyebrow:** `Practice`
* **Lead Statement:** `Tools and methods across the work above.`
* **Columns:**
  * **Column 1 (Design):**
    * Heading: `Design`
    * Content: `Figma · Unity 3D · Blender`  
      `Adobe Suite`
  * **Column 2 (Build):**
    * Heading: `Build`
    * Content: `HTML / CSS · JavaScript`  
      `Git · Netlify`
  * **Column 3 (Method):**
    * Heading: `Method`
    * Content: `User research · Usability testing`  
      `Iterative design · Design systems`

---

### 1.2 About Section (`#about`)

* **Section ID:** `about`
* **ARIA Label:** `About`
* **Eyebrow:** `About`
* **Lead Statement:** `MSc Design and Digital Media, University of Edinburgh.`
* **Body Paragraph:**  
  `The six projects here range from a self-written speculative interface to a three-person game team to a solo research interview. Each page names what was self-built, what was adapted, and where a teammate's contribution starts and mine ends.`

---

### 1.3 Contact Section (`#contact`)

* **Section ID:** `contact`
* **ARIA Label:** `Contact`
* **Eyebrow:** `Contact`
* **Lead Statement:**  
  `If something here was worth a closer look,`  
  `I'd like to hear about it.`
* **Primary CTA:**
  * Label: `Get in touch →` (`Get in touch <span aria-hidden="true">→</span>`)
  * Target Href: `mailto:bharatvyask@gmail.com`
  * Data Attribute: `data-cursor="Email"`
* **Secondary Links (External / Document):**
  1. **LinkedIn:**
     * Label: `LinkedIn`
     * Target Href: `https://www.linkedin.com/in/bharat-vyas-k-bb9680217/`
     * Attributes: `target="_blank"`, `rel="noopener"`, Screen-reader text: `(opens in a new tab)`
  2. **Resume, PDF:**
     * Label: `Resume, PDF`
     * Target Href: `/assets/resume/Bharat-Vyas-Resume.pdf`
     * Attributes: `target="_blank"`, `rel="noopener"`, Screen-reader text: `(opens in a new tab)`
  3. **GitHub:**
     * Label: `GitHub`
     * Target Href: `https://github.com/BharVa0`
     * Attributes: `target="_blank"`, `rel="noopener"`, Screen-reader text: `(opens in a new tab)`

---

## 2. Current Typography & Token Architecture

### 2.1 Font Families & Loading Mechanism

Source of truth: [`next-portfolio/src/styles/fonts.ts`](file:///z:/GitRepo/Portfolio/next-portfolio/src/styles/fonts.ts), [`next-portfolio/src/styles/tokens.css`](file:///z:/GitRepo/Portfolio/next-portfolio/src/styles/tokens.css), and [`next-portfolio/src/app/layout.tsx`](file:///z:/GitRepo/Portfolio/next-portfolio/src/app/layout.tsx).

Fonts are loaded using Next.js's optimized `next/font/google` pipeline (zero layout shift, pre-downloaded at build time, self-hosted by Next.js):

| Role / Variable | Font Family | Configuration & Weights | Assigned Purpose in Design System |
|---|---|---|---|
| **Display (`--font-display`)** | **Fraunces** | `subsets: ["latin"]`, `style: ["normal", "italic"]`, `weight: "variable"`, `axes: ["opsz"]`, `display: "swap"` | Expressive variable serif used for hero titles, section statements (`--fs-statement`), and stage headlines. |
| **Body (`--font-body`)** | **Inter** | `subsets: ["latin"]`, `display: "swap"` | Clean grotesque sans-serif for global body copy, descriptions, navigation, and reading paragraphs. |
| **Mono (`--font-mono`)** | **Space Mono** | `subsets: ["latin"]`, `weight: "400"`, `display: "swap"` | Fixed-pitch monospace for section eyebrows (`--fs-eyebrow`), metadata tags, status bars, and UI timestamps. |

### 2.2 Token Assignments in Homepage Closing Sections

* **Section Eyebrows (`.eyebrow`):** `font-family: var(--font-mono)`, `font-size: var(--fs-eyebrow)` (`0.78rem`), `color: var(--muted)` (`#91877f`), `letter-spacing: 0.06em`, `text-transform: uppercase`.
* **Lead Statements (`.statement`):** `font-family: var(--font-display)`, `font-size: var(--fs-statement)` (`clamp(1.7rem, 3.4vw, 2.6rem)`), `font-weight: 360`, `line-height: 1.25`.
* **Practice Headers (`.practiceColumn h3`):** `font-family: var(--font-mono)`, `font-size: var(--fs-eyebrow)` (`0.78rem`), `color: var(--ember)` (`#b84624`), `text-transform: uppercase`.
* **Practice Body (`.practiceColumn p`):** `font-family: var(--font-body)`, `font-size: 1rem`, `color: var(--paper-soft)` (`#ddd6cf`), `line-height: 1.8`.
* **About Narrative Body (`.aboutBody p`):** `font-family: var(--font-body)`, `font-size: var(--fs-support)` (`1.05rem`), `color: var(--paper-soft)` (`#ddd6cf`), `line-height: 1.75`.
* **Contact Primary Action (`.contactCta`):** `font-family: var(--font-body)`, `font-size: 1.15rem`, `font-weight: 500`, `color: var(--paper)` (`#f2eee9`), `border-bottom: 2px solid var(--ember)` (`#b84624`).
* **Contact Secondary Links (`.contactLinks a`):** `font-family: var(--font-mono)`, `font-size: 0.85rem`, `color: var(--muted)` (`#91877f`), hover: `var(--ember-bright)` (`#d35c34`).

---

## 3. Live Homepage Scope Boundary (What is NOT Being Touched)

The following components and sections form the active homepage (`/`) and must remain completely untouched during the `/about` and `/contact` redesign:

1. **Global Shell (`src/app/layout.tsx`):**
   * `<SkipLink href="#content" />`: Accessible keyboard focus link.
   * `<MotionCursor />`: Kinetic pointer follower with contextual label expansion.
   * `<SiteNavbar />`: Fixed floating navigation header (Wordmark logo, `Work`, `About`, `Contact`).
2. **Hero G Kinetic Thesis Field (`src/components/hero/HeroG.tsx`):**
   * 4 kinetic typographic bands:
     * Band 1: `Interactive Systems` (`SYSTEM`)
     * Band 2: `Playable Worlds` (`PLAY`)
     * Band 3: `Research-led Experiences` (`RESEARCH`)
     * Band 4: `Built Around Human Behaviour` (`BEHAVIOUR`)
   * Asymmetric knockout name anchor (`Bharat Vyas`).
   * Pointer-follow inspection lens with ember text reveal.
   * "Selected work →" CTA linking to `/work`.
   * Academic metadata badge (`MSc Design and Digital Media · University of Edinburgh · Edinburgh, UK · 2026`).
   * Initial visit 00–100 loader session overlay.
3. **Site Footer (`src/components/site/SiteFooter.tsx`):**
   * Global copyright and location: `Edinburgh, Scotland` · `Bharat Vyas Kodamana, 2026` · `mailto:bharatvyask@gmail.com`.

---

## 4. Navigation Links Scheduled for Route Migration

When About (incorporating Practice) and Contact transition from homepage anchors to dedicated routes (`/about` and `/contact`), the following locations in the codebase will require href updates:

| Location | File | Current Href | Future Target Href |
|---|---|---|---|
| **Global SiteNavbar (About)** | [`next-portfolio/src/components/phase2/SiteNavbar.tsx`](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/SiteNavbar.tsx#L116) | `/#about` | `/about` |
| **Global SiteNavbar (Contact)** | [`next-portfolio/src/components/phase2/SiteNavbar.tsx`](file:///z:/GitRepo/Portfolio/next-portfolio/src/components/phase2/SiteNavbar.tsx#L119) | `/#contact` | `/contact` |
| **Navigation Dataset (About)** | [`next-portfolio/src/data/navigation.ts`](file:///z:/GitRepo/Portfolio/next-portfolio/src/data/navigation.ts#L12) | `#about` | `/about` |
| **Navigation Dataset (Contact)** | [`next-portfolio/src/data/navigation.ts`](file:///z:/GitRepo/Portfolio/next-portfolio/src/data/navigation.ts#L13) | `#contact` | `/contact` |
| **Navigation Dataset (Practice)** | [`next-portfolio/src/data/navigation.ts`](file:///z:/GitRepo/Portfolio/next-portfolio/src/data/navigation.ts#L11) | `#practice` | *(Folded into `/about`)* |
