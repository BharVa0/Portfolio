# Portfolio Phase 2: Repository Cleanup & Standalone Deployment Audit

**Document Path:** `docs/PHASE_2_REPO_CLEANUP_AUDIT.md`  
**Date:** August 15, 2026  
**Auditor:** Senior Next.js / React Architecture Auditor  
**Branch:** `phase-2-redesign`  
**Status:** `VERIFIED STANDALONE & SELF-CONTAINED`

---

## 1. Executive Summary & Verdict

The Next.js application located in `/next-portfolio` is **100% self-contained and autonomous**. It has zero runtime, build-time, or configuration dependencies on any file or directory outside `next-portfolio/`.

### Key Findings:
1. **Zero External References**: No import path, path alias, configuration file, or asset loader in `next-portfolio/` points outside the `next-portfolio/` folder.
2. **Asset Independence**: `next-portfolio/public/assets/` contains complete, byte-identical copies of all production images, fonts, resume PDFs, and the BETTR live build iframe. Next.js serves all `/assets/...` URLs strictly from `next-portfolio/public/assets/`. The root-level `/assets/` directory is a legacy artifact from the static site.
3. **Tooling Independence**: `next-portfolio/` maintains its own dedicated `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, and local `node_modules/`. There is no root-level `package.json` or monorepo workspace configuration.
4. **Vercel Readiness**: The project is immediately ready for deployment on Vercel by configuring Vercel's **Root Directory** setting to `next-portfolio`.
5. **Build Isolation Verified**: Executing `npm run build` directly inside `next-portfolio/` compiles 100% of routes (13/13 static SSG pages) cleanly with zero errors.

---

## 2. External Reference Audit (`next-portfolio/`)

A comprehensive search across all files in `next-portfolio/` (including `src/`, `public/`, configuration files, and scripts) was conducted to identify any paths attempting to escape the directory boundary.

### A. TypeScript Path Aliases (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
- **Finding**: Resolves strictly to `next-portfolio/src/*`. Zero references to parent directories.

### B. Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```
- **Finding**: Contains zero rewrites, redirects, asset prefixes, or webpack aliases escaping `next-portfolio/`.

### C. Relative Import Search (`../`)
- A scan for parent directory relative imports (`../`) returned only two matches in `src/app/globals.css`:
  - Line 2: `@import "../styles/tokens.css";` (Resolves internally to `next-portfolio/src/styles/tokens.css`)
  - Line 3: `@import "../styles/projects.css";` (Resolves internally to `next-portfolio/src/styles/projects.css`)
- In `src/styles/tokens.css` Line 2, a markdown code comment notes historical calibration against `portfolio.css`. This is purely non-executable text.
- **Finding**: Zero relative imports leave `next-portfolio/`.

---

## 3. Asset Resolution: Root `/assets/` vs `next-portfolio/public/assets/`

A specific audit was performed to resolve whether images referenced in `EchoesCaseStudy.tsx` (`/assets/echoes/*.jpg`), `FrankenTeenCaseStudy.tsx` (`/assets/frankenteen/*.jpg`), and sibling project case studies require the root `/assets/` directory at runtime.

### A. Next.js Static Asset Routing Mechanics
In Next.js, any public asset URL beginning with `/assets/...` (e.g. `<Image src="/assets/echoes/room-scene-crop.jpg" />`) is resolved by the Next.js static server exclusively against the local `next-portfolio/public/` directory (mapped to `next-portfolio/public/assets/...`). Next.js has no awareness of, and cannot access, files in parent directories.

### B. Asset Inventory Comparison
A file-by-file byte comparison confirmed that `next-portfolio/public/assets/` contains complete, byte-for-byte identical copies of all active assets:

| Category / Directory | Files in `public/assets/` | Exists in Root `assets/` | Byte-for-Byte Identical |
|---|---|---|---|
| **BETTR Case Study & Live Build** (`/assets/bettr/`, `/assets/bettr-live/`) | 27 files (images, JS, CSS, fonts) | Yes (27 files) | **Identical (100%)** |
| **CardioPal** (Zero raster images by design) | N/A | N/A | N/A |
| **Echoes of Home** (`/assets/echoes/`) | 4 crop images | Yes (4 crop images) | **Identical (100%)** |
| **FrankenTeen** (`/assets/frankenteen/`) | 12 crop images | Yes (12 crop images) | **Identical (100%)** |
| **Smartphone Mold** (`/assets/smartphone/`) | 5 images | Yes (5 images) | **Identical (100%)** |
| **Resume & Documents** (`/assets/resume/`) | 1 PDF (`Bharat-Vyas-Resume.pdf`) | Yes | **Identical (100%)** |

### C. Extra Files in Root `/assets/`
The root `/assets/` directory contains 26 additional files (totaling ~3.2 MB) that are **not** present in `next-portfolio/public/assets/`:
- Raw, uncropped `.jpeg` originals (e.g., `landing.jpeg`, `stage1-sorting.jpeg`, `room-scene.jpeg`, `runner-scene.jpeg`, `world-map.jpg`, `level-design-greybox.jpg`).
- Legacy thumbnail experiments from the static site.
- **Verdict**: None of these extra root files are imported or required by `next-portfolio`. They are historical assets from the earlier static HTML implementation.

---

## 4. Package & Build Tooling Independence

- **No Root `package.json`**: The root directory contains no `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-workspace.yaml`, or `turbo.json`.
- **Standalone `next-portfolio` Dependencies**:
  - `next-portfolio/package.json` manages all production dependencies: `next@16.2.10`, `react@19.2.4`, `react-dom@19.2.4`, `motion@13.1.0`, `gsap@3.15.0`, `@gsap/react@2.1.2`, `lenis@1.3.25`, `@paper-design/shaders-react@0.0.80`.
  - `next-portfolio/package-lock.json` pins exact dependency trees.
  - `next-portfolio/node_modules/` is fully self-contained.

---

## 5. Deployment & CI/CD Status of Legacy Static Site

An audit was performed across the repository to determine whether the legacy static site (`index.html`, `projects/*.html`) is actively deployed via repository-level CI/CD:

1. **GitHub Pages (Legacy Shipped Target)**:
   - Git remote is configured to `https://github.com/BharVa0/Portfolio.git`.
   - In `AGENTS.md` and `PORTFOLIO_AUDIT_V2.md`, notes document that the original static site was served via GitHub Pages from `main`.
2. **Absence of Root Deployment Configs**:
   - Zero `vercel.json` or `netlify.toml` exist in the repository.
   - Zero `.github/workflows/` automated build actions exist in the repository.
   - Zero `CNAME` file exists in the repository.
3. **Vercel Deployment Path**:
   - When deploying the portfolio to Vercel, setting **Root Directory: `next-portfolio`** in the Vercel project settings will allow Vercel to install, build, and deploy the Next.js App Router application cleanly without processing any root-level static files.

---

## 6. Top-Level Directory & File Inventory

Below is the complete inventory of every item residing at the repository root (`Z:\GitRepo\Portfolio\`), with categorization and cleanup rationale:

```
Z:\GitRepo\Portfolio\
├── .agents/                                # Category B: Dev tooling / Agent skill instructions
├── .claude/                                # Category B: Dev tooling / Local agent cache
├── .git/                                   # Category C: Critical VCS directory (KEEP)
├── AGENTS.md                               # Category B: Repository instruction manual
├── CLAUDE.md                               # Category B: Repository instruction manual
├── assets/                                 # Category A: Legacy static assets (SAFE TO REMOVE)
├── css/                                    # Category A: Legacy static stylesheets (SAFE TO REMOVE)
├── docs/                                   # Category B: Project documentation & design system (KEEP/REVIEW)
├── index.html                              # Category A: Legacy static homepage (SAFE TO REMOVE)
├── js/                                     # Category A: Legacy static scripts (SAFE TO REMOVE)
├── next-portfolio/                         # Category C: Active Next.js application (DEPLOYMENT TARGET)
├── projects/                               # Category A: Legacy static project HTML pages (SAFE TO REMOVE)
├── scripts/                                # Category A: Image cropping utility scripts (SAFE TO REMOVE)
└── v2-preview/                             # Category A: Prototype sandboxes (SAFE TO REMOVE)
```

### Categorized Breakdown

#### Category A: Confirmed Unrelated to `next-portfolio` (Safe to remove once static site is retired)
These items belonged to the v1/v2 static HTML implementation or Phase 2 prototype sandboxes. `next-portfolio` has completely superseded all of them:
1. **`assets/`**: Static site asset folder. All active production assets are duplicated in `next-portfolio/public/assets/`.
2. **`projects/`**: 6 static HTML case studies (`bettr.html`, `cardiopal.html`, `frankenteen.html`, `echoes.html`, `smartphone-mold.html`, `playing-freedom.html`). All ported to `next-portfolio/src/content/projects/`.
3. **`index.html`**: Static homepage. Ported to `next-portfolio/src/app/page.tsx`.
4. **`css/`**: Static stylesheets (`portfolio.css`, `frankenteen.css`, `hero-g.css`). Ported to `next-portfolio/src/styles/` and modular CSS.
5. **`js/`**: Static JS scripts (`portfolio.js`, `hero-g.js`). Ported to React components and hooks in Next.js.
6. **`v2-preview/`**: Sandbox prototypes (`hero-a`, `hero-d`, `hero-e`, `hero-g`, `bettr-editorial-layout`). Prototype exploration is complete.
7. **`scripts/`**: `crop-project-images.ps1`. One-off image cropping script.

#### Category B: Needs Human Decision Before Removal
These files are not required by Next.js to build or deploy, but contain essential developer context, licensing compliance, design tokens, and agent guidance:
1. **`docs/`**:
   - Contains `PHASE_2_DESIGN_SYSTEM.md`, `PHASE_2_COMPONENT_LEDGER.md` (Apache 2.0 license compliance records), `PHASE_2_PROJECT_PAGES_AUDIT.md`, `NEXTJS_MIGRATION_GUIDE.md`, and screenshot verification records.
   - *Recommendation*: **Retain `docs/`** in the repository root for design system reference and component licensing records, or move into a dedicated documentation archive.
2. **`AGENTS.md` & `CLAUDE.md`**:
   - AgentPair instructions and architecture guidelines.
   - *Recommendation*: Retain or consolidate with `next-portfolio/AGENTS.md`.
3. **`.agents/` & `.claude/`**:
   - Local AI coding agent skills (`frontend-design`, `ui-ux-pro-max`).
   - *Recommendation*: Retain for ongoing local development sessions.

#### Category C: Confirmed Still Required by `next-portfolio`
1. **`next-portfolio/`**: The active Next.js 16 codebase.
2. **`.git/`**: Git history and tracking.

---

## 7. Isolated Build Verification

To confirm full autonomy, a fresh build was executed from within `next-portfolio/` with zero references to parent directory tools:

```bash
cd next-portfolio
npm run build
```

### Build Log Output:
```
> next-portfolio@0.1.0 build
> next build

▲ Next.js 16.2.10 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 6.7s
  Running TypeScript ...
  Finished TypeScript in 18.8s ...
  Collecting page data using 9 workers ...
  Generating static pages using 9 workers (0/13) ...
  Generating static pages using 9 workers (3/13) 
  Generating static pages using 9 workers (6/13) 
  Generating static pages using 9 workers (9/13) 
✓ Generating static pages using 9 workers (13/13) in 1521ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.svg
├ ○ /phase-2-preview
├ ○ /phase-2-preview/work
├ ○ /phase-2-preview/work-flowing
└ ● /projects/[slug]
  ├ /projects/bettr
  ├ /projects/cardiopal
  ├ /projects/frankenteen
  └ [+3 more paths]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)

Exit Code: 0
```

---

## 8. Summary Conclusion

`next-portfolio/` is **fully self-contained, autonomous, and ready for deployment to Vercel**. When Bharat is ready to retire the legacy static site, removing the Category A directories (`assets/`, `css/`, `js/`, `projects/`, `v2-preview/`, `scripts/`, `index.html`) will have **zero impact** on the Next.js application.
