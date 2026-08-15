# Portfolio Phase 2 Control

**Controlled path:** `docs/PORTFOLIO_PHASE_2_CONTROL.md`
**Owner and final approver:** Bharat
**Initial control date:** 20 July 2026
**Activation condition:** This document becomes authoritative only after Bharat explicitly approves its contents and it is created at the controlled path above.

---

## 1. Purpose and authority

This document is the operational source of truth for the Portfolio Phase 2 homepage redesign.

It controls:

* design direction;
* production protection;
* prototype boundaries;
* implementation scope;
* component and dependency use;
* accessibility and responsive requirements;
* Git workflow;
* visual-approval requirements.

Every Phase 2 audit, implementation plan, Antigravity prompt, correction pass, and review must read and follow the following sources in this order:

1. **Portfolio Project Instructions**
2. **`docs/PORTFOLIO_PHASE_2_CONTROL.md`**
3. **The current Git working tree**

Earlier Portfolio chats, previous audits, discarded concepts, historical design documents, and earlier implementation plans are context only.

Where an earlier source conflicts with this document, this document wins.

Repository-local instructions such as `AGENTS.md` apply only where they remain consistent with the Portfolio Project Instructions and this control document.

Only Bharat may approve:

* a change to a `LOCKED` rule;
* an expansion of the prototype edit boundary;
* a modification to the production homepage;
* the first Phase 2 prototype commit;
* a change of coding environment or coding agent.

When the control document and current source diverge, Antigravity must stop, identify the discrepancy, and report it. It must not silently reinterpret either source.

### Status labels

This document uses the following labels:

* **LOCKED** — explicitly approved by Bharat and not open to agent reinterpretation.
* **CONFIRMED** — verified through read-only inspection of the current working tree.
* **PROVISIONAL** — a safe current implementation choice that may change after review.
* **UNKNOWN** — not established and must not be invented.
* **REQUIRES APPROVAL** — Antigravity must not decide or implement this independently.

---

## 2. Repository safety baseline

### 2.1 Confirmed repository state

| Item                            | Status      | Controlled value                           |
| ------------------------------- | ----------- | ------------------------------------------ |
| Repository root                 | `CONFIRMED` | `Z:/GitRepo/Portfolio`                     |
| Active coding environment       | `LOCKED`    | Antigravity                                |
| Current branch                  | `LOCKED`    | `phase-2-redesign`                         |
| Current `HEAD`                  | `CONFIRMED` | `9cbbbf2a3aff6f6d67e825cd7e456d44877a968d` |
| Phase 1 checkpoint              | `LOCKED`    | `9cbbbf2a3aff6f6d67e825cd7e456d44877a968d` |
| Protected tag                   | `LOCKED`    | `nextjs-migration-checkpoint`              |
| Protected tag target            | `CONFIRMED` | `9cbbbf2a3aff6f6d67e825cd7e456d44877a968d` |
| Staged files at audit           | `CONFIRMED` | `0`                                        |
| Modified tracked files at audit | `CONFIRMED` | `2`                                        |
| Untracked files at audit        | `CONFIRMED` | `59`                                       |

The Phase 1 checkpoint and protected tag represent the completed Next.js migration before Phase 2 redesign work.

The current branch remains at that checkpoint commit. Phase 2 work currently exists only as uncommitted working-tree changes.

These are separate states:

* the checkpoint is immutable;
* the current working tree contains the experimental Phase 2 prototype;
* uncommitted work must not be discarded, reset, cleaned, or overwritten.

### 2.2 Protected Git history

The following are prohibited:

* moving, deleting, recreating, or force-updating `nextjs-migration-checkpoint`;
* rewriting the Phase 1 checkpoint;
* resetting or restoring away the current prototype;
* cleaning untracked files;
* rebasing or force-pushing the protected baseline;
* staging or committing the Phase 2 prototype before Bharat’s visual approval.

### 2.3 Existing shared dependency changes

The current working tree already contains modifications to:

* `next-portfolio/package.json`
* `next-portfolio/package-lock.json`

The audit confirms that these changes add:

* `gsap`
* `@gsap/react`
* `lenis`

These files are workspace-wide shared files even though the new dependencies are currently imported only by the preview.

**Control rule:** preserve the existing dependency diff, but do not make further package or lockfile changes without explicit approval.

Do not remove, upgrade, downgrade, replace, or add packages during the correction pass.

---

## 3. Current implementation map

### 3.1 Production homepage

The repository contains both a static production implementation and the migrated Next.js implementation.

#### Static production files

* `index.html`
* `css/portfolio.css`
* `js/portfolio.js`

#### Next.js production homepage

* `next-portfolio/src/app/page.tsx`

Direct production components identified by the audit:

* `next-portfolio/src/components/hero/HeroG.tsx`
* `next-portfolio/src/components/hero/HeroGInteractive.tsx`
* `next-portfolio/src/components/home/WorkIndex.tsx`
* `next-portfolio/src/components/home/HomepageClosing.tsx`
* `next-portfolio/src/components/site/SiteHeader.tsx`
* `next-portfolio/src/components/site/SiteFooter.tsx`

Shared files that may affect production:

* `next-portfolio/src/app/layout.tsx`
* `next-portfolio/src/app/globals.css`
* `next-portfolio/src/data/projects.ts`
* `next-portfolio/src/data/workIndex.ts`
* `next-portfolio/package.json`
* `next-portfolio/package-lock.json`

### 3.2 Active Phase 2 prototype

**LOCKED route:** `/phase-2-preview`

Current route file:

* `next-portfolio/src/app/phase-2-preview/page.tsx`

Current preview components:

* `next-portfolio/src/components/phase2/ProjectReel.tsx`
* `next-portfolio/src/components/phase2/ProjectReel.module.css`
* `next-portfolio/src/components/phase2/ReelMotion.tsx`
* `next-portfolio/src/components/phase2/SplitStageTitle.tsx`

Current preview composition:

* shared `HeroG`;
* `ProjectReel`;
* `ReelMotion`;
* individual project stages;
* end marker.

### 3.3 Confirmed current architecture

| Responsibility            | Current owner                                                             |
| ------------------------- | ------------------------------------------------------------------------- |
| Preview route             | `phase-2-preview/page.tsx`                                                |
| Hero                      | shared `HeroG.tsx` and `HeroGInteractive.tsx`                             |
| Project-stage markup      | `ProjectReel.tsx`                                                         |
| Project-stage styling     | `ProjectReel.module.css`                                                  |
| Scroll and GSAP lifecycle | `ReelMotion.tsx`                                                          |
| Split-title rendering     | `SplitStageTitle.tsx`                                                     |
| Project content           | currently hardcoded in `ProjectReel.tsx`                                  |
| Persistent background     | not implemented                                                           |
| Active project            | inferred from scroll position rather than a clearly exposed central state |
| Responsive fallback       | CSS and GSAP media-query handling                                         |
| Reduced motion            | partial GSAP and CSS handling                                             |

### 3.4 Current prototype violations

The current prototype is not yet compliant with the approved direction.

Confirmed violations include:

* a BETTR dashboard screenshot;
* an evidence-style BETTR media figure;
* a CardioPal paper/test-sheet panel;
* only two of the expected project stages being implemented;
* separate per-stage backgrounds instead of one persistent background;
* no proper project-specific motif-state system;
* hardcoded project content and sequence labels;
* incomplete end-of-reel handling.

### 3.5 Historical and out-of-scope files

The following are not the active Phase 2 implementation surface:

* `v2-preview/bettr-editorial-layout/index.html`
* `docs/PHASE_2_DIRECTION.md`
* `docs/VISUAL_CALIBRATION_AUDIT.md`
* `docs/PORTFOLIO_DIRECTION_V2.md`
* earlier Portfolio chats and audits.

`docs/PHASE_2_DIRECTION.md` contains historical direction that conflicts with the locked image-free homepage rule. It is context only and must not override this document.

---

## 4. Production homepage protection

### 4.1 Locked production rule

**LOCKED:** The production homepage must remain unchanged while `/phase-2-preview` is being developed and corrected.

Prototype work must not:

* replace the production route;
* redirect `/` to the preview;
* alter the rendered production homepage;
* alter Hero G’s source;
* change shared global styling;
* change production project-page behaviour;
* modify production deployment configuration;
* introduce preview effects globally;
* import preview components into production routes.

### 4.2 Protected production boundary

The following files and paths must not be edited during the preview correction pass:

* `index.html`
* `css/portfolio.css`
* `js/portfolio.js`
* `next-portfolio/src/app/page.tsx`
* `next-portfolio/src/app/layout.tsx`
* `next-portfolio/src/app/globals.css`
* `next-portfolio/src/components/hero/**`
* `next-portfolio/src/components/home/**`
* `next-portfolio/src/components/site/**`
* `next-portfolio/src/app/projects/**`
* `next-portfolio/src/data/projects.ts`
* `next-portfolio/src/data/workIndex.ts`
* `assets/**`

The following shared files are frozen at their existing working-tree state:

* `next-portfolio/package.json`
* `next-portfolio/package-lock.json`

Any required modification outside the approved preview boundary is `REQUIRES APPROVAL`.

### 4.3 Shared-file rule

A file is not safe merely because the production homepage does not currently import the relevant new code.

Any edit to a shared file requires an explicit impact assessment.

Antigravity must not modify a shared file and later justify it by claiming that the visible production route appeared unaffected.

### 4.4 Production verification

After each preview implementation pass, Antigravity must report:

* whether any protected file changed;
* the exact `git status`;
* the exact changed-file list;
* whether the production route gained any preview import;
* whether any global style or layout file changed;
* whether package files changed beyond their existing diff.

Source and diff isolation are mandatory. Visual inspection should also be used where available, but visual inspection does not replace Git verification.

---

## 5. Approved homepage direction

### 5.1 Core direction

**LOCKED:** The Phase 2 homepage is an image-free, typography-led **Kinetic Project Reel**.

It must read as one continuous portfolio experience.

It must not read as:

* a card grid;
* a thumbnail index;
* a collection of evidence panels;
* six unrelated landing pages;
* a stack of media showcases;
* a set of disconnected animation demonstrations;
* a conventional project gallery.

### 5.2 Project-stage content

Each project stage must expose only verified information needed to understand and enter the case study:

* project number;
* project title;
* discipline or category;
* year, where verified;
* one concise premise;
* one clear case-study link.

Project order, destinations, and factual metadata must come from existing verified portfolio content.

Antigravity must not invent:

* project categories;
* dates;
* project claims;
* descriptions;
* destinations;
* case-study outcomes.

The current prototype signals a six-project sequence, but the exact final order and metadata must be verified from current repository data before implementation.

### 5.3 Image-free rule

The homepage must not include:

* project screenshots;
* project thumbnails;
* interface captures;
* posters;
* evidence cards;
* image cards;
* media panels;
* video stills;
* video previews;
* image trails;
* hover-revealed media;
* masked project imagery;
* image textures;
* project-media backgrounds;
* embedded case-study previews;
* decorative crops from project assets.

This prohibition applies regardless of whether media is placed in:

* React markup;
* CSS backgrounds;
* pseudo-elements;
* SVG masks;
* canvas;
* WebGL;
* cursor effects;
* hover effects;
* scroll transitions.

The homepage may link to case studies that contain media. It may not preview that media on the homepage.

### 5.4 Continuous reel rule

The reel must have:

* a clear beginning after Hero G;
* a continuous progression through the selected projects;
* intentional handoffs between stages;
* a deliberate ending or transition into the next homepage section;
* ordinary, usable case-study navigation throughout.

The reel must remain understandable without animation.

---

## 6. Persistent visual system

### 6.1 Single background owner

**LOCKED:** The project reel must use one persistent animated background system.

The background must:

* remain mounted across the reel;
* receive or derive the active project state;
* transition continuously between project states;
* avoid separate remounting for every project;
* remain visually subordinate to text;
* preserve legibility;
* degrade safely;
* provide a complete reduced-motion state.

There must not be one unrelated background implementation per project.

### 6.2 Project-specific states

Each project must have a distinct state composed from:

* colour;
* abstract motif;
* typographic relationship;
* motion behaviour;
* spatial composition.

The project states must remain part of one shared portfolio system.

They must not become six separate visual identities with unrelated rules.

### 6.3 Motif policy

Motifs must be abstract interpretations of verified project concepts.

Permitted material may include:

* lines;
* grids;
* traces;
* signals;
* fields;
* points;
* paths;
* interference;
* geometric relationships;
* controlled typographic fragments;
* restrained procedural patterns.

Motifs must not reproduce or simulate screenshots, interfaces, posters, environments, characters, or case-study imagery.

### 6.4 Implementation mechanism

The exact rendering mechanism is `PROVISIONAL`.

It may use the existing audited frontend stack where appropriate, including:

* CSS;
* SVG;
* DOM;
* GSAP.

A Canvas or WebGL system must not be added merely for novelty.

No new rendering library or package may be introduced without approval.

The chosen implementation must result in:

* one background owner;
* one clear active-state interface;
* predictable cleanup;
* responsive behaviour;
* reduced-motion behaviour;
* no unnecessary continuous processing.

---

## 7. Hero G contract

### 7.1 Preserved hero

**LOCKED:** Hero G remains substantially preserved.

The current preview imports the shared production implementation:

* `next-portfolio/src/components/hero/HeroG.tsx`
* `next-portfolio/src/components/hero/HeroGInteractive.tsx`

The audit confirms that the preview currently uses Hero G without modifying its implementation.

### 7.2 Correction-pass boundary

The preview correction pass must not edit Hero G source files.

Permitted integration work is limited to preview-owned files and may address:

* the transition from Hero G into the reel;
* spacing between hero and reel;
* preview-local layout continuity;
* focus destination and skip-link behaviour;
* responsive handoff;
* background handoff.

The following require Bharat’s approval:

* replacing Hero G;
* changing its defining composition;
* changing its core interaction;
* changing its language;
* changing production hero files;
* creating a materially different preview-only Hero G fork.

---

## 8. Preview sandbox contract

### 8.1 Active experimental surface

**LOCKED:** `/phase-2-preview` is the only active homepage redesign surface.

It must remain:

* isolated from production;
* directly reviewable;
* uncommitted until visual approval;
* free from abandoned duplicate systems;
* free from unrelated repository cleanup.

### 8.2 Approved correction allowlist

The correction pass may edit:

* `next-portfolio/src/app/phase-2-preview/page.tsx`
* `next-portfolio/src/components/phase2/ProjectReel.tsx`
* `next-portfolio/src/components/phase2/ProjectReel.module.css`
* `next-portfolio/src/components/phase2/ReelMotion.tsx`
* `next-portfolio/src/components/phase2/SplitStageTitle.tsx`
* new preview-only files created under:

  * `next-portfolio/src/components/phase2/`

A preview-scoped data or configuration file may be created under:

* `next-portfolio/src/components/phase2/`

This is the safe default for project reel presentation data while the shared production registry remains protected.

### 8.3 Conditional documentation edit

`docs/PHASE_2_COMPONENT_LEDGER.md` may be edited only when:

* a third-party component is added;
* an existing adapted component is materially changed;
* licence, source, dependency, or modification documentation must be corrected.

It must not be edited merely to describe general visual changes.

### 8.4 Out-of-scope files

The correction pass must not edit:

* `docs/PHASE_2_DIRECTION.md`
* `docs/VISUAL_CALIBRATION_AUDIT.md`
* `v2-preview/bettr-editorial-layout/index.html`
* unrelated untracked assets;
* agent skill folders;
* Python cache files;
* production or case-study files.

These files must not be deleted or cleaned as part of Phase 2 correction.

### 8.5 Boundary expansion

When a necessary change appears to require a file outside the allowlist, Antigravity must:

1. stop that part of the implementation;
2. identify the exact file;
3. explain why it is required;
4. describe production and Git risk;
5. request approval.

It must not expand the boundary independently.

---

## 9. Component and dependency policy

### 9.1 General component policy

Free and open-source components are encouraged when they solve a concrete, identified problem better than the current implementation.

Each component must be evaluated individually.

A component is not justified merely because it:

* looks impressive;
* appears in a design-library showcase;
* includes complex animation;
* reduces the amount of code Antigravity must write;
* matches an unrelated website aesthetic.

Components must not import a visual identity that conflicts with the portfolio direction.

### 9.2 Required component record

For each external or adapted component, document:

* component or library name;
* creator or publisher;
* exact source;
* version or retrieval date;
* licence;
* dependencies;
* concrete problem solved;
* accessibility behaviour;
* responsive behaviour;
* reduced-motion behaviour;
* modifications made;
* files using it;
* portfolio usage.

### 9.3 Current dependencies

The existing preview currently uses:

* `gsap`
* `@gsap/react`
* `lenis`

Their presence in the current working tree is `CONFIRMED`.

Their continued use is `PROVISIONAL` and depends on:

* clean preview-only ownership;
* accessibility;
* responsive behaviour;
* reduced-motion support;
* native navigation remaining usable;
* licence compatibility before commit.

No additional package changes are approved.

### 9.4 SplitStageTitle status

`SplitStageTitle.tsx` is recorded as adapted from React Bits Split Text.

The existing ledger records an MIT licence combined with a Commons Clause condition.

This component must not be described as unconditionally approved open-source code until the exact terms and intended portfolio use have been verified.

Its final licence compatibility is:

**`REQUIRES APPROVAL` before the first Phase 2 commit.**

Until then:

* preserve the existing implementation where useful;
* do not expand copied code from the source;
* keep the component ledger accurate;
* be prepared to replace it with a simple original implementation if the terms are unsuitable.

### 9.5 No speculative dependencies

Do not:

* add packages for effects that can be achieved with the existing stack;
* install an entire component library for one small interaction;
* leave unused dependencies;
* retain copied components that no longer serve the approved direction.

---

## 10. Accessibility, responsiveness and input

### 10.1 Semantic interaction

The preview must use:

* semantic headings;
* semantic links;
* semantic buttons where actions are not navigation;
* visible keyboard focus;
* a functioning skip link;
* ordinary case-study destinations.

Case-study links must not be implemented as:

* click handlers on non-interactive containers;
* cursor-only hotspots;
* delayed animation-only navigation;
* drag-only navigation;
* hover-only labels.

### 10.2 Input requirements

Essential information and navigation must remain available through:

* keyboard;
* mouse;
* trackpad;
* touch;
* coarse pointers;
* native scrolling.

No project title, premise, category, or link may depend on:

* hover;
* cursor position;
* fine pointer precision;
* motion completion;
* custom cursor presence.

### 10.3 Reduced motion

A complete `prefers-reduced-motion` path is required.

Reduced motion must:

* retain all project content;
* retain project differentiation;
* retain navigation;
* avoid scrubbed character or word animation;
* avoid unnecessary smooth scrolling;
* avoid continuous procedural movement;
* replace animated state transitions with immediate or minimal transitions.

Disabling only CSS transitions is not sufficient when JavaScript-driven animation remains active.

### 10.4 Responsive review widths

The preview must be inspected at:

* `390px`
* `768px`
* `1440px`
* `1920px`

At each width:

* no horizontal overflow;
* project titles remain readable;
* project links remain visible;
* touch targets remain usable;
* no meaning depends on hover;
* project sections remain intentionally composed;
* the persistent background remains useful;
* type does not clip accidentally;
* spacing does not create unfinished dead zones.

### 10.5 Colour and contrast

Colour may support active-project distinction but must not be the only indicator.

Text contrast must remain sufficient across every background state.

Decorative background elements must remain outside the accessibility tree.

---

## 11. Motion and performance

### 11.1 Current motion ownership

The audit confirms that `ReelMotion.tsx` currently owns:

* GSAP setup;
* ScrollTrigger timelines;
* the Lenis instance;
* GSAP ticker synchronisation;
* responsive GSAP media queries;
* cleanup.

This lifecycle structure is worth preserving where it remains compatible with the corrected direction.

### 11.2 Ownership rule

The corrected implementation must have:

* one scroll-animation owner;
* one active-project state owner;
* one persistent-background owner;
* one documented interface between scroll state and background state.

Do not create:

* duplicate Lenis instances;
* duplicate GSAP ticker subscriptions;
* multiple competing active-stage observers;
* separate animation loops for each project;
* uncleaned event listeners;
* multiple background canvases.

### 11.3 Native scroll control

The reel must not aggressively scroll-jack.

Users must retain normal control through:

* wheel scrolling;
* trackpad scrolling;
* keyboard page scrolling;
* arrow-key scrolling;
* touch scrolling;
* browser scrollbar movement.

Lenis may remain only when it does not interfere with those behaviours.

Its continued use is `PROVISIONAL`, not mandatory.

### 11.4 Deterministic state

Active-project state must remain correct when:

* scrolling forward;
* scrolling backward;
* loading at a non-zero scroll position;
* refreshing mid-page;
* resizing the viewport;
* rotating a touch device;
* switching between reduced-motion settings;
* navigating with keyboard scrolling.

### 11.5 Performance rules

The implementation must:

* avoid recreating heavy objects per frame;
* avoid unnecessary work while idle;
* pause or simplify decorative motion where appropriate;
* clean up all animation and listener ownership on unmount;
* avoid layout thrashing;
* avoid animation that prevents reading;
* degrade safely if an effect is unsupported.

A successful build does not prove acceptable performance or visual quality.

---

## 12. Git and approval workflow

### 12.1 Before editing

Antigravity must verify:

* repository root;
* current branch;
* current `HEAD`;
* protected tag target;
* staged state;
* working-tree state;
* control-document contents;
* correction allowlist;
* protected denylist.

### 12.2 During editing

Antigravity must:

* stay on `phase-2-redesign`;
* preserve all existing uncommitted work;
* edit only approved files;
* avoid unrelated cleanup;
* avoid package changes;
* avoid production changes;
* avoid formatting unrelated files;
* avoid changing historical documents.

### 12.3 After each pass

Antigravity must report:

* exact files changed;
* exact files created;
* exact files deleted, which should normally be none;
* tests and inspections performed;
* remaining defects;
* production-isolation result;
* Git status;
* staged status;
* protected-tag status.

### 12.4 Commit gate

**LOCKED:** No Phase 2 prototype file may be staged or committed before Bharat visually approves the preview.

Technical checks do not equal visual approval.

After visual approval:

* the commit boundary will be reviewed;
* licence documentation will be verified;
* unrelated untracked work will remain excluded;
* Bharat will approve the commit wording and scope.

---

## 13. Current compliance and correction backlog

| Requirement                            | Current status | Evidence                                                        | Required correction                                                | Severity      |
| -------------------------------------- | -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| Correct branch and checkpoint          | `PASS`         | Branch and `HEAD` match the locked baseline                     | None                                                               | —             |
| Protected tag intact                   | `PASS`         | Tag resolves to Phase 1 checkpoint                              | Preserve                                                           | —             |
| Nothing staged                         | `PASS`         | Staged diff empty                                               | Keep unstaged                                                      | —             |
| Production homepage unchanged          | `PASS`         | No production-route diff                                        | Maintain protection                                                | Critical gate |
| Active preview route exists            | `PASS`         | `/phase-2-preview` route present                                | Continue only there                                                | —             |
| Hero G substantially preserved         | `PASS`         | Shared Hero G imported without source edits                     | Do not modify Hero G                                               | Critical gate |
| Homepage is image-free                 | `FAIL`         | BETTR dashboard screenshot is rendered                          | Remove all project media and media containers                      | Critical      |
| No evidence-card or media-panel layout | `FAIL`         | BETTR evidence figure and CardioPal test sheet                  | Replace with typographic reel composition                          | Critical      |
| Complete project reel                  | `FAIL`         | Prototype ends at `02 / 06`                                     | Implement complete verified sequence                               | Major         |
| One persistent background              | `FAIL`         | Separate per-stage CSS backgrounds                              | Create one persistent owner                                        | Major         |
| Project-specific motif states          | `FAIL`         | No motif-state system                                           | Add abstract states within shared system                           | Major         |
| Typography-led composition             | `PARTIAL`      | Split titles and large type exist                               | Make type the primary visual material across all stages            | Major         |
| Continuous stage choreography          | `PARTIAL`      | Sticky sections and scroll timelines exist                      | Create intentional transitions and ending                          | Major         |
| Verified project data                  | `FAIL`         | Content and numbering hardcoded                                 | Use a preview-scoped verified data structure                       | Major         |
| Responsive fallback                    | `PARTIAL`      | Compact flow exists below 1024px                                | Validate all required widths                                       | Major         |
| Reduced-motion support                 | `PARTIAL`      | GSAP gating and CSS rules exist                                 | Verify JavaScript, Lenis, and background behaviour comprehensively | Major         |
| Keyboard and semantic links            | `PARTIAL`      | Skip link, headings, and links exist                            | Verify focus and all stage links                                   | Major         |
| Touch/coarse-pointer behaviour         | `PARTIAL`      | Native compact flow and `syncTouch: false`                      | Explicitly validate coarse pointers and touch                      | Major         |
| End-of-reel handoff                    | `FAIL`         | Current marker links back to `/`                                | Create intentional preview-local ending                            | Minor         |
| Data-driven numbering                  | `FAIL`         | Sequence labels hardcoded                                       | Generate from verified stage data                                  | Minor         |
| Third-party documentation              | `PARTIAL`      | Ledger exists                                                   | Verify all licence terms before commit                             | Major         |
| Shared dependency isolation            | `PARTIAL`      | Package files modified, production does not import dependencies | Freeze package diff and verify preview-only usage                  | Major         |

### 13.1 Confirmed strengths to preserve

* Hero G is currently integrated without source modification.
* Preview routing is isolated from production.
* `ReelMotion.tsx` has scoped lifecycle and cleanup.
* `SplitStageTitle.tsx` retains one accessible heading label.
* The current responsive implementation already falls back to natural document flow below desktop.
* The working tree remains unstaged and the protected checkpoint remains intact.

### 13.2 Unknowns requiring inspection

The following must be resolved from current repository content during the correction pass:

* exact six-project order;
* verified category and year metadata;
* exact project premises suitable for homepage use;
* whether every existing case-study destination is current;
* whether all project presentation states can be sourced without editing shared data.

The following remains an implementation choice rather than a locked design decision:

* whether the persistent visual system uses DOM, CSS, SVG, or a restrained combination.

No new package may be added to resolve that choice.

---

## 14. Visual approval gate

The prototype is ready for Bharat’s visual review only when all of the following are true:

* the production homepage remains unchanged;
* Hero G remains substantially preserved;
* the homepage contains no project media;
* the reel includes the complete verified project sequence;
* the experience reads as one continuous reel;
* one persistent background system spans the project sequence;
* every project has a distinct colour and motif state;
* typography remains the primary visual material;
* project titles, metadata, premises, and links remain legible;
* case-study links are obvious;
* case-study links work with keyboard, pointer, and touch;
* the sequence does not collapse into a generic card grid;
* there are no unfinished dead viewport areas;
* project-state changes work in both scroll directions;
* the responsive composition works at all required review widths;
* reduced-motion mode retains the complete experience;
* there are no unexplained dependency or licence risks;
* no Critical or Major defect remains;
* nothing has been staged or committed.

Passing a build, lint, or type check does not constitute visual approval.

Bharat’s explicit visual approval is required before the first Phase 2 prototype commit.

---

## 15. Control-document maintenance

This document must be updated when Bharat approves:

* a new locked design decision;
* an edit-boundary expansion;
* a production integration step;
* a component or dependency policy change;
* a change to the Git workflow;
* the first Phase 2 commit;
* a change to the active coding environment.

Material changes must record:

* date;
* changed section;
* reason;
* approval source.

Locked rules must never be silently weakened, rephrased into ambiguity, or overridden by historical context.

When source and control diverge:

1. stop;
2. report the discrepancy;
3. identify the affected files and rule;
4. wait for Bharat’s decision.

The latest approved version of this file in the current working tree controls all future Antigravity prompts for Portfolio Phase 2.

---

## 16. Initial decision record

| Date         | Decision                                                                                                         | Status   |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | -------- |
| 20 July 2026 | Antigravity remains the active coding environment                                                                | `LOCKED` |
| 20 July 2026 | Phase 2 work remains on `phase-2-redesign`                                                                       | `LOCKED` |
| 20 July 2026 | Phase 1 checkpoint and protected tag remain immutable                                                            | `LOCKED` |
| 20 July 2026 | Production homepage remains unchanged during prototype work                                                      | `LOCKED` |
| 20 July 2026 | `/phase-2-preview` remains the active uncommitted prototype                                                      | `LOCKED` |
| 20 July 2026 | Homepage direction is an image-free, typography-led Kinetic Project Reel                                         | `LOCKED` |
| 20 July 2026 | Project media is prohibited on the homepage                                                                      | `LOCKED` |
| 20 July 2026 | Visual richness comes from one persistent background, project states, typography, motion, and micro-interactions | `LOCKED` |
| 20 July 2026 | Hero G remains substantially preserved                                                                           | `LOCKED` |
| 20 July 2026 | External components require individual justification and documentation                                           | `LOCKED` |
| 20 July 2026 | No staging or commit before visual approval                                                                      | `LOCKED` |
| 20 July 2026 | Coding-agent changes require Bharat’s request                                                                    | `LOCKED` |

---

## 17. Pre-Main-Merge Checklist (Required Component Removals)

**Status:** `OPEN / UNRESOLVED — MANDATORY BEFORE MERGE TO main`  
**Approver:** Bharat Vyas  
**Date Added:** 15 August 2026  

The following three React Bits components received retroactive approval (15 August 2026) for their historical presence in the `phase-2-redesign` branch working tree and commit history. However, **none of the three are adopted for production**, and all three must be deleted along with their host pages and orphaned references before `phase-2-redesign` is merged into `main`:

### 1. `PreviewDock` (`Dock`)
* **Reason for Removal:** Superseded by `PreviewNavbar` on the `/phase-2-preview` layout; currently unmounted and unused.
* **Exact Files to Delete:**
  * `next-portfolio/src/components/phase2/PreviewDock.tsx`
  * `next-portfolio/src/components/phase2/PreviewDock.module.css`

### 2. `FlowingMenu`
* **Reason for Removal:** Abandoned comparison experiment; superseded by the approved typographic `WorkIndexPage` on `/phase-2-preview/work`.
* **Exact Files to Delete:**
  * `next-portfolio/src/components/phase2/FlowingMenu.tsx`
  * `next-portfolio/src/components/phase2/FlowingMenu.module.css`
  * `next-portfolio/src/components/phase2/WorkFlowingPage.tsx`
  * `next-portfolio/src/components/phase2/WorkFlowingPage.module.css`
  * `next-portfolio/src/app/phase-2-preview/work-flowing/page.tsx`
  * `next-portfolio/src/app/phase-2-preview/work-flowing/` (directory)

### 3. `SplitStageTitle`
* **Reason for Removal:** Only imported by `ProjectReel.tsx`, which is itself an unmounted component not rendered on any live or preview route.
* **Exact Files to Delete:**
  * `next-portfolio/src/components/phase2/SplitStageTitle.tsx`

### 4. `ProjectReel` & Reel Prototype Subsystem
* **Reason for Removal:** Obsolete homepage prototype subsystem from early in Phase 2, before the homepage was restructured into `HeroG` + `PreviewNavbar` + `WorkIndexPage`. Completely unmounted and unreferenced across all 13 active routes. (Note: Unlike items 1–3, this has no licensing/approval concerns; it is plain obsolete internal code).
* **Exact Files to Delete:**
  * `next-portfolio/src/components/phase2/ProjectReel.tsx`
  * `next-portfolio/src/components/phase2/ProjectReel.module.css`
  * `next-portfolio/src/components/phase2/ReelBackground.tsx`
  * `next-portfolio/src/components/phase2/ReelMotion.tsx`
* **Data Migration Note (`ReelData.ts`):**
  * `next-portfolio/src/components/phase2/ReelData.ts` is currently imported by `ProjectReel`, `FlowingMenu`, and `WorkIndexPage`. When `ProjectReel` and `FlowingMenu` are deleted, `ReelData.ts` should be renamed/migrated (e.g., to `WorkIndexData.ts` or integrated into `src/data/`) so that the approved `WorkIndexPage` remains fully functional without legacy "Reel" naming.
* **Auxiliary Prototype Remnants (Clean up in same pass):**
  * `next-portfolio/src/components/phase2/BettrBackground.tsx` & `BettrBackground.module.css` (superseded by `src/components/projects/ProjectBackground.tsx`)
  * `next-portfolio/src/components/phase2/ScrollProgress.tsx` & `ScrollProgress.module.css` (superseded by `src/components/projects/ProjectScrollProgress.tsx`)
  * `next-portfolio/src/components/phase2/PreviewCursor.tsx` & `PreviewCursor.module.css` (superseded by `src/components/phase2/MotionCursor.tsx`)

Any future task preparing the `phase-2-redesign` -> `main` merge must treat this checklist as an active blocker until all files above are removed and clean compilation is re-verified.


