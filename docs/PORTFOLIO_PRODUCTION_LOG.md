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

### 2026-07-19 - Phase 1 Next.js migration QA completed

**Stage:** A11y/perf pass
**Scope:** Final audit and narrowly scoped parity corrections in `next-portfolio/src/app/{layout.tsx,page.tsx,icon.svg,favicon.ico}`, `next-portfolio/src/data/projects.ts`, `next-portfolio/src/content/projects/{BettrCaseStudy.tsx,PlayingFreedomCaseStudy.css,SmartphoneMoldCaseStudy.css}`, one approved FrankenTeen Open Graph asset under `next-portfolio/public/assets/`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log.

**Did:**
- Closed Phase 1 with the homepage and all six project routes present, directly loadable, refresh-safe, registry-driven where applicable, and isolated from the real 404 route.
- Confirmed whitespace-normalized readable-copy parity, project order, links, asset use, media/embed configuration, route metadata, landmarks, and approved interaction behavior against the static source. BETTR's decorative pointer-only `PLAY` overlay was excluded from readable-copy comparison.
- Confirmed all 49 migrated public assets are byte-identical to their approved sources; all 49 direct asset requests and 29 local image optimizer requests returned HTTP 200. No scratch crop is referenced.
- Corrected seven Minor parity defects: the homepage social metadata/favicon and 404 metadata isolation; separate exact BETTR standard/Open Graph descriptions; the homepage `#content` skip target; legacy-project heading line-height leakage; Smartphone Mold footer alignment; Playing Freedom iframe baseline; and ten BETTR quotation marks.
- Preserved the Server Component architecture and the four bounded Client Component islands: Hero G interaction, work-index interaction, BETTR live embed, and Echoes click-to-load video. No dependency, package file, approved static source, Hero G code, BETTR live-embed behavior, configuration, protected untracked item, or Phase 2 design was changed.

**Decisions:**
- Phase 1 is complete at this checkpoint. The next stage is a separately scoped Phase 2 redesign and polish pass.
- Routes without an approved social image continue to omit one; no metadata image or content was invented for parity.

**Verified:**
- Static/Next comparisons at 1280, 1440, and 1920 pixels cover all seven routes, page/section geometry, project identities, Hero G, homepage handoff, embeds, legacy compositions, and horizontal overflow.
- Direct load, hard refresh, valid and invalid routes, hash navigation, Hero completion, fine-pointer lens/cursor behavior, remount cleanup, Echoes lazy video creation, project navigation, console/hydration output, duplicate IDs, image alternatives, iframe titles, landmarks, heading order, and focus/reduced-motion source guards were checked.
- `git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass; the production build statically generates the homepage and all six project routes.

**Open:**
- The browser harness could not live-emulate OS reduced motion or native Tab/Enter input. Deep cross-origin player internals, launching the OS mail client, and external social destinations beyond their verified URLs/attributes remain outside the verified boundary.
- Phase 2 redesign and polish has not started.

**Commit:** `Complete Next.js migration QA` (this closure's commit; annotated tag `nextjs-migration-checkpoint` resolves to its exact hash)

### 2026-07-19 - Phase 1 homepage, contact, footer, and navigation completed (Lesson 11)

**Stage:** Homepage migration
**Scope:** `next-portfolio/src/app/{layout.tsx,page.tsx,globals.css,projects/[slug]/page.tsx}`, `next-portfolio/src/components/{home/HomepageClosing.*,site/{SiteFooter.*,SiteHeader.tsx,SiteNavigation.tsx,SkipLink.tsx}}`, `next-portfolio/src/data/navigation.ts`, `next-portfolio/public/assets/resume/Bharat-Vyas-Resume.pdf`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No approved static source, completed Hero G/work-index/project component, registry, package/dependency file, Claude/Codex configuration, preview, scratch file, or protected untracked item was touched.

**Did:**
- Ported the exact approved `index.html` boundary from `section#practice` through `section#about`, `section#contact`, and the body-level `.site-footer`, preserving all copy, IDs, labels, links, and desktop styling.
- Completed the approved homepage frame with `#work`, `#practice`, `#about`, and `#contact`; scoped it to the homepage and kept every project route on its own approved Index/next-project navigation.
- Added Server Components for the closing homepage sections and footer. Reused the existing work-index interaction island for guarded reveals and contextual cursor behavior; no new Client Component or dependency was added.
- Preserved the email, LinkedIn, resume, GitHub, footer location/year/email, external-link attributes, new-tab announcements, and literal 2026 year. Copied the approved resume into the public asset tree.
- Corrected the pre-existing shared-shell integration defect that duplicated the homepage frame on project routes, and restored each project skip target/main wrapper to `#content` without changing case-study output.

**Decisions:**
- The root layout owns only document-wide metadata/fonts/styles; homepage and project routes own their source-specific navigation and main landmarks.
- Plain hash anchors retain the approved homepage behavior. No sticky navigation, current-page state, mobile menu, back-to-top control, form, availability message, or Phase 2 polish was introduced.

**Verified:**
- The resume source/public copy are both 80,857 bytes with SHA-256 `A92BD72CF939F0A4C67402766F0B4E648CE21CE0E4D63B137A70ED2785181A92`; its route returns HTTP 200.
- Static/Next comparisons at 1280, 1440, and 1920 confirm matching header, Practice, About, Contact, and footer geometry/content and no horizontal overflow. Direct load, hard refresh, full Hero-to-footer scroll, all section anchors, contact destinations, external popups, focus styling, contextual cursor label, console/hydration output, asset delivery, and duplicate IDs were checked.
- Hero G still completes its loader with four labelled bands, asymmetric name anchor, lens, cursor behavior, and natural handoff. The introduction and six-row work index retain exact copy/order, media geometry, reveals, destinations, focus treatment, View/Play labels, and zero overflow.
- All six project routes directly load and refresh with their approved navigation, metadata, styles, home/next links, clean console, and no overflow. `/projects/not-a-project` remains a real HTTP 404 without the homepage frame.
- Navigation and contact use semantic native anchors in logical document order; skip targets, visible 2px focus outlines with 4px offset, external-link explanations, heading order, decorative hiding, and absence of duplicate IDs/focus traps were verified.
- `git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass. The production build emits the homepage and all six project routes.

**Open:**
- The browser harness could not live-emulate `prefers-reduced-motion` or dispatch Tab/Enter as native input. Guarded code, semantic order, href activation paths, and visible focus states were verified, but those two live automation claims are excluded. The OS mail client was not launched, and cross-origin embed internals retain the Lessons 4-9 limits.
- The final migration-wide QA and documentation pass is the next separate task. Phase 2 redesign/polish has not started.

**Commit:** `Migrate contact and navigation to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 - Homepage work index ported to Next.js (Lesson 10)

**Stage:** Homepage migration
**Scope:** `next-portfolio/src/{app/{page.tsx,globals.css},data/workIndex.ts,components/home/{WorkIndex.tsx,WorkIndexInteractions.tsx,WorkIndex.module.css}}`, four approved responsive files under `next-portfolio/public/assets/`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No approved static source, Hero G file, project implementation or registry, package/dependency file, Claude/Codex configuration, preview, scratch file, or protected untracked item was touched.

**Did:**
- Replaced the temporary post-Hero placeholder with the approved static `About the work` introduction and six-row `Selected work` index, stopping before `#practice` exactly as scoped.
- Preserved the approved order and linked every row to its implemented Next.js route: BETTR, CardioPal, FrankenTeen, Echoes of Home, Breaking the Smartphone Mold, and Playing Freedom.
- Added typed homepage-specific work-index data and a Server Component for semantic content and links. Added one small Client Component only for the approved intersection reveal and fine-pointer contextual cursor.
- Ported the exact 12-column layout, project accents, native media caps, Smartphone Mold crop, hover/focus states, responsive stacking, and reduced-motion guards into a homepage-scoped CSS module.
- Copied the four missing responsive source files for BETTR, FrankenTeen, and Smartphone Mold. Reused and verified the two original-size public files already present.

**Decisions:**
- Homepage editorial data stays separate from route metadata because the static index has its own descriptions, ordering, media choices, and cursor labels.
- Plain `img` preserves the approved `srcset` and byte-exact browser source selection; generated optimization derivatives are intentionally not introduced here.
- Contact, practice/about content, footer contact, global-navigation restructuring, mobile redesign, and Phase 2 remain outside this migration.

**Verified:**
- SHA-256 hashes match for all four copied files and both reused originals. All six homepage media URLs and the homepage plus six project routes return HTTP 200; an invalid project route returns HTTP 404.
- Static/Next comparisons at 1280, 1440, and 1920 confirm matching content, row geometry, column placement, image caps/crop, typography, colour, and zero horizontal overflow.
- The introduction and rows reveal from the same guarded initial state; Hero G's Selected work link reaches the index; all row destinations work; keyboard focus has the shared 2px ember outline with 4px offset; View/Play contextual cursor labels appear on the scoped work surface.
- Hero G still completes its loader and retains four labelled bands, the asymmetric name anchor, inspection-lens markup, and natural-scroll handoff. All six completed project routes retain their direct loading, titles, accents, media, and next-project sequence.
- Fresh homepage, BETTR, and FrankenTeen loads have no console errors, warnings, or hydration failures. A FrankenTeen image-aspect warning seen once in an accumulated development log did not reproduce in a clean direct load and no project file was changed.
- `git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass. The production build emits the static homepage and all six SSG project routes.

**Open:**
- Live `prefers-reduced-motion` emulation was unavailable in the browser harness; its guarded implementation was inspected, but OS-level media-query behavior is not claimed from automation.
- Cross-origin embed internals retain the documented Lessons 4-9 verification limits.
- Contact and navigation work is next. Footer-contact integration, broader mobile redesign, and Phase 2 polish remain unstarted.

**Commit:** `Migrate homepage work index to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — Session 2 project migration QA complete

**Stage:** Project migration verification
**Scope:** `docs/NEXTJS_MIGRATION_GUIDE.md` and this log only. Combined QA covered the Next.js homepage and all six generated project routes. No implementation, approved static source, Hero G source, package/dependency file, configuration, preview, scratch file, or protected untracked item changed.

**Did:**
- Completed Session 2 after the Echoes of Home (`f2df6d76f4ad51b076d3114df9e2556576070116`), Breaking the Smartphone Mold (`3188ed190d5c941e8002cd2cdb3cbd2b1333ccf8`), and Playing Freedom (`77ca9b61f952466b8acbefab47675b0c4dd9fe65`) project commits.
- Rechecked the homepage, Hero G shell, BETTR, CardioPal, FrankenTeen, Echoes, Breaking the Smartphone Mold, Playing Freedom, project-navigation sequence, route metadata, approved media, local assets, focus treatment, and invalid-slug behavior as one system.
- Confirmed all approved projects are now present in the typed metadata/content registries and generated through the existing dynamic SSG route. Homepage work-index and contact/navigation work were not started.

**Decisions:**
- No combined-QA implementation change was warranted. The approved static sources remain the comparison baseline and project identities remain intentionally distinct.
- Deep behavior inside cross-origin Kaltura and Figma documents remains outside what parent-page automation can prove; only visible loading, exact sources, titles, permissions, focusability, and framing are claimed.

**Verified:**
- `npm.cmd run lint`: clean. `npm.cmd run build`: successful, with ten generated pages and all six approved project slugs listed under `/projects/[slug]`.
- At 1280, 1440, and 1920, the homepage and all project routes directly load with clean console/hydration output, zero horizontal overflow, no clipped headings, no detected image distortion, and approved embed geometry. Repeated direct navigation at all three widths also exercises fresh same-URL route loading.
- Every local project asset reference returns HTTP 200. The BETTR live build and two Kaltura videos, CardioPal Figma canvas, FrankenTeen Kaltura recording, Echoes click-to-load recording, and Playing Freedom documentary retain their approved URLs and framing. Kaltura documentary surfaces remain 16:9.
- Route titles and descriptions remain distinct; OG images appear only on BETTR and FrankenTeen. Project next links remain BETTR → CardioPal → FrankenTeen → Echoes → Smartphone Mold → Playing Freedom → index. `/projects/not-a-project` returns HTTP 404.
- Hero G reaches `hg-ready` after its loader, with four labelled thesis bands, the Bharat Vyas anchor, and inspection lens present. BETTR remains pink/oxblood, CardioPal sage/paper, FrankenTeen mustard/violet, Echoes blue-grey/slate, and the two research dossiers dark/red.
- Focus indicators remain visible; Echoes' poster recheck showed the shared 2px outline with 4px offset and then loaded the exact 1308×736 iframe. Earlier per-project focus checks remain recorded in Lessons 4–9.
- Diff checks confirm no package, lockfile, dependency, approved static source, Hero G implementation, earlier project implementation, Claude/Codex configuration, or protected untracked file changed after the Session 2 starting commit.
- No new combined-QA defect was found. Session 2's corrected migration defects are the three Echoes fixes documented in Lesson 7 and Smartphone Mold's direct-JPEG delivery fix documented in Lesson 8.

**Open:**
- Deep cross-origin playback and Figma editing behavior cannot be inspected from the parent route and are not claimed.
- Homepage work-index implementation is the next migration task. Contact/navigation work and Phase 2 redesign remain unstarted.

**Commit:** `Complete Session 2 migration QA` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — Playing Freedom ported to Next.js (Lesson 9)

**Stage:** Project migration
**Scope:** `next-portfolio/src/{types/project.ts,data/projects.ts,content/projects/{registry.ts,PlayingFreedomCaseStudy.tsx,PlayingFreedomCaseStudy.css}}`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No asset, approved static file, Hero G file, earlier project implementation, shared project component, package/dependency file, configuration, preview, scratch file, or protected untracked item was touched.

**Did:**
- Confirmed `projects/playing-freedom.html` as the authoritative sixth approved project and preserved `playing-freedom` as `/projects/playing-freedom` through the existing typed metadata/content registries and dynamic SSG route.
- Ported the status bar, opening, tags, documentary framing and caption, four numbered sections, sourcing note, scholarship and references, reflection, and footer navigation verbatim and in order.
- Added only project-scoped styling for the approved Space Mono/Inter research-dossier identity, `#0C1118` surface, `#E14B3C` accent, 980px reading frame, 16:9 media surface, note, reference, and reflection treatments.
- Preserved the exact Kaltura URL, `entry_id=1_jf3kb1k3`, widget configuration, title, fullscreen attributes, and permission string. No local asset was copied because the approved source references none.

**Decisions:**
- `PlayingFreedomCaseStudy` is a Server Component because an iframe does not itself require browser-side React state. No Client Component, shared variant, or dependency was introduced.
- The documentary remains the primary deliverable in its approved position; no poster, fallback image, autoplay behavior, or replacement media was invented.
- No Open Graph image is emitted because the approved static source defines none.

**Verified:**
- `git diff --check` and `npm.cmd run lint`: clean. `npm.cmd run build`: successful and all six approved project routes are statically generated.
- Static-vs-Next visible content comparison after whitespace normalization: exact 4,232-character match, including all four sections, reference text, media caption, and navigation.
- The Kaltura iframe source and permissions are exact and its 16:9 frame is visible. At 1440, both static and Next media surfaces measure approximately 915×515 pixels; only the established shared site-header offset differs.
- Responsive checks at 1280, 1440, and 1920 show a centered project frame and no horizontal overflow. The approved dark/red tokens and Space Mono title remain project-specific.
- Direct loading and fresh same-URL navigation work. Metadata matches the approved title/thesis with no OG image. Keyboard focus shows the shared 2px outline with 4px offset, the console is clean, and `/projects/not-a-project` returns HTTP 404.
- The Kaltura document is cross-origin, so its source, permissions, visibility, and framing are verified but deep playback is not claimed.

**Open:**
- Combined Session 2 regression QA and its final documentation commit remain pending.
- Homepage work-index development remains the next separate implementation task; it was not started.

**Commit:** `Migrate Playing Freedom to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — Breaking the Smartphone Mold ported to Next.js (Lesson 8)

**Stage:** Project migration
**Scope:** `next-portfolio/src/{types/project.ts,data/projects.ts,content/projects/{registry.ts,SmartphoneMoldCaseStudy.tsx,SmartphoneMoldCaseStudy.css}}`, four approved files under `next-portfolio/public/assets/smartphone/`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No approved static file, Hero G file, earlier project-specific implementation, package/dependency file, configuration, imported skill, cache, preview, scratch asset, or protected untracked file was touched.

**Did:**
- Confirmed `projects/smartphone-mold.html` as the authoritative fifth approved project and preserved `smartphone-mold` as `/projects/smartphone-mold` through the existing typed metadata/content registries and dynamic SSG route.
- Ported the status bar, opening, tags, hero figure and caption, five numbered sections, three-part institutional-isomorphism framework, paired evidence treatments, interview quote, commercial-pressure test, reflection, complete references, and footer navigation verbatim and in order.
- Added only project-scoped styling for the approved Space Mono/Inter research-dossier identity, `#0C1118` surface, `#E14B3C` accent, 980px frame, 260px evidence crops, cards, tags, quote, reflection, and desktop/mobile safety rules.
- Copied only `convergence-figure1.jpeg`, `nothing-transparent.jpeg`, `cmf-product.jpeg`, and `glyph-leak.jpeg`. The unreferenced `nothing-transparent-480.jpg` remains uncopied and untouched.

**Decisions:**
- `SmartphoneMoldCaseStudy` is a Server Component because the static page contains no stateful or browser-only behavior. No Client Component, shared component change, or dependency was introduced.
- The four project-local `next/image` elements use `unoptimized`, preserving direct delivery of the original JPEG URLs, formats, intrinsic dimensions, and quality. This does not alter image behavior on any earlier project.
- No Open Graph image is emitted because the approved static source defines none.

**Verified:**
- `git diff --check` and `npm.cmd run lint`: clean. `npm.cmd run build`: successful; the route table includes Breaking the Smartphone Mold alongside BETTR, CardioPal, FrankenTeen, and Echoes.
- Static-vs-Next visible content comparison after whitespace normalization: exact 5,692-character match across all five sections, framework labels, quotes, references, and navigation.
- All four copied JPEGs match their static originals by SHA-256, load at their original intrinsic dimensions, and return HTTP 200. The approved natural hero ratio and 260px `object-fit: cover` evidence treatment remain unchanged.
- At 1280, 1440, and 1920, the project-local 980px frame, 916px hero, 457px evidence cards, section count, colors, and title typography match the static source with no horizontal overflow. The established shared site header explains the only expected vertical offset.
- Direct route loading and a fresh same-URL navigation work. Metadata uses the approved title/thesis and has no OG image. Both project-navigation links have the exact approved destinations; Playing Freedom remains the next unimplemented route until Lesson 9.
- Browser console and hydration output are clean. The keyboard-focused index link shows the shared visible 2px outline with 4px offset. `/projects/not-a-project` returns HTTP 404. No iframe, video, audio, or cross-origin media exists on this page.
- Corrected one migration-only defect: generated image optimization could change format/compression. Project-local `unoptimized` flags restore direct JPEG delivery without changing shared behavior.

**Open:**
- Playing Freedom is the sixth and final approved lighter project and the next sequential Session 2 migration. It was not started in this lesson.
- Combined Session 2 QA remains pending until Playing Freedom is committed.

**Commit:** `Migrate Breaking the Smartphone Mold to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — Echoes of Home ported to Next.js (Lesson 7)

**Stage:** Project migration
**Scope:** `next-portfolio/src/{types/project.ts,data/projects.ts,content/projects/{registry.ts,EchoesCaseStudy.tsx,EchoesCaseStudy.css,EchoesVideoPoster.tsx}}`, four approved files under `next-portfolio/public/assets/echoes/`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No approved static file, Hero G file, earlier project-specific implementation, dependency/package manifest, Claude/Codex configuration, imported skill, cache, preview, scratch crop, or other protected untracked file was touched.

**Did:**
- Confirmed `projects/echoes.html` as the authoritative static source and `echoes` as the existing public slug, then added `/projects/echoes` to the typed metadata/content registries and existing dynamic SSG route.
- Ported the approved project frame, typography-led opening, five numbered chapters, full-width quiet interlude, six-step experience-flow corridor, runner composition, implementation/testing/limitations record, quote pair, reflection, and both navigation bars verbatim and in source order.
- Added scoped Echoes styling for the approved blue-grey (`#87A2B8`), slate (`#171B20`), and rare lamp amber (`#C99A5B`) identity, including the same native image caps, type ramp, section rhythm, full-bleed media surface, and responsive safety rules.
- Copied only `laptop-interaction-crop.jpg`, `room-scene-crop.jpg`, `runner-scene-crop.jpg`, and `track-blender-crop.jpg`, the four tracked assets directly referenced by the approved page. The unrelated untracked `runner-text-crop.jpg` remains untouched.
- Preserved the approved click-to-load Kaltura facade with a small `EchoesVideoPoster` Client Component and `noscript` fallback. The rest of `EchoesCaseStudy` remains a Server Component.

**Decisions:**
- The poster interaction is Echoes' only Client Component because replacing a button with an iframe after activation genuinely requires browser-side state. Images, content, links, and layout remain server-rendered.
- Echoes emits no `og:image`; the approved static source defines none. Its standard and Open Graph descriptions remain distinct and verbatim.
- The Kaltura host's placeholder/editor/facecam thumbnail stays hidden until the visitor asks to watch. No new poster asset, replacement media, autoplay, or presentation redesign was introduced.

**Verified:**
- `git diff --check`: clean. `npm.cmd run lint`: clean. `npm.cmd run build`: successful; TypeScript passed and BETTR, CardioPal, FrankenTeen, and Echoes are listed as SSG output.
- Static-vs-Next visible content comparison after whitespace normalization: exact 4,218-character match across the project frame, opening, five chapters, interlude, flow labels, testing quotes, poster copy, reflection, and footer navigation.
- All four copied JPEGs match their approved originals by SHA-256 and return HTTP 200. Browser inspection after scrolling confirmed all four decoded successfully; displayed dimensions remain at or below the approved 471×356 and 280×204 caps without distortion.
- Direct `/projects/echoes` loading and hard refresh are clean. Metadata matches the approved title/descriptions and has no OG image. FrankenTeen's top navigation reaches Echoes; Echoes' top/footer next links both target `/projects/smartphone-mold`.
- Browser/static geometry checks at 1280, 1440, and 1920 confirmed five ordered chapters, the interlude, native-capped images, 16:9 media surface, associated captions, correct palette, clean console/hydration output, and `scrollWidth === clientWidth`.
- The initial poster is focusable and shows the shared 2px focus outline. Activation removes it and visibly loads one 1308×736 Kaltura iframe at 1440 with exact `entry_id=1_6anm1jue`, widget configuration, title, permission string, and fullscreen flag. The cross-origin document is inaccessible to parent inspection, so deep playback is not claimed.
- Focused regressions at 1440: homepage/Hero G, BETTR, CardioPal, and FrankenTeen retain their titles, approved tokens, expected embeds, clean consoles, and zero overflow. BETTR/FrankenTeen retain their OG images; CardioPal still has none. `/projects/not-a-project` returns HTTP 404. Package and lockfile diff is empty.
- Corrected three migration-only defects found during parity checks: restored one JSX space after “lamp light,” restored the room chapter's approved blue-grey heading accent through the existing ReactNode title slot, and changed only the above-the-fold opening image from lazy to eager loading to remove Next.js's LCP warning without changing its media treatment.

**Open:**
- Deep interaction/playback inside the cross-origin Kaltura player remains externally constrained; poster activation, visible player loading, URL, permissions, focusability, and framing are verified.
- Breaking the Smartphone Mold is the next sequential Session 2 migration and was not started.

**Commit:** `Migrate Echoes of Home project to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — FrankenTeen ported; Session 1 project QA complete (Lesson 6)

**Stage:** Project migration
**Scope:** `next-portfolio/src/{types/project.ts,data/projects.ts,content/projects/{registry.ts,FrankenTeenCaseStudy.tsx,FrankenTeenCaseStudy.css}}`, nine approved files under `next-portfolio/public/assets/frankenteen/`, `docs/NEXTJS_MIGRATION_GUIDE.md`, and this log. No approved static portfolio file, Hero G file, BETTR-specific implementation, dependency/package manifest, Claude/Codex configuration, imported skill, cache, preview, or pre-existing untracked file was touched.

**Did:**
- Added `frankenteen` to the typed metadata and content registries, so `/projects/frankenteen` is statically generated by the existing dynamic route beside BETTR and CardioPal.
- Ported the approved opening and all six numbered chapters verbatim and in order, including the two Act III feature chapters, chapter watermarks, paired evidence layouts, testing findings, references, Kaltura process recording, captions, and prev/next navigation.
- Added scoped FrankenTeen styles for the approved mustard/violet/dark identity, native-capped media pairs, feature-chapter rhythm, findings list, and desktop/mobile safety rules. No global project output was redesigned.
- Copied only the nine JPEGs directly referenced by `projects/frankenteen.html`: `mansion-gate-crop.jpg`, `bedroom-clean-crop.jpg`, `guitar-prop-crop.jpg`, `pacing-chart-crop.jpg`, `mansion-approach-crop.jpg`, `mansion-progression-crop.jpg`, `attic-approach-crop.jpg`, `attic-lab-crop.jpg`, and `blender-wall-module-crop.jpg`.
- Generalized only the shared heading prop types from `string` to `ReactNode`, allowing the existing `ProjectSection` / `SectionHeading` path to preserve FrankenTeen's nested Roman-numeral mark. Existing string headings remain compatible.

**Decisions:**
- FrankenTeen remains a Server Component. Its images, links, and iframe need no hooks, browser state, listeners, or browser APIs; no FrankenTeen Client Component or dependency was introduced.
- The Kaltura embed remains the approved plain 16:9 iframe. Its exact source, permissions, lazy loading, title, and standard/legacy fullscreen attributes are retained; no facade, autoplay, replacement media, or presentation modernization was added.
- The approved static source is authoritative. Untracked FrankenTeen crops not referenced by that page were preserved and excluded.

**Verified:**
- `npm.cmd run lint`: clean. `npm.cmd run build`: successful; TypeScript passed and the route table lists `/projects/bettr`, `/projects/cardiopal`, and `/projects/frankenteen` as SSG output.
- Static-vs-Next visible content comparison after whitespace normalization: exact 6,662-character match across the opening, six sections, references, and footer navigation. All nine media items and captions remain in source order.
- All nine copied JPEGs match their static originals by SHA-256 and return HTTP 200 from the Next.js public route. Image width/height contracts and native caps preserve the approved proportions.
- FrankenTeen metadata matches the approved title, standard description, Open Graph description, and mansion-gate image. Direct loading and refresh work; CardioPal's project-frame link navigates to FrankenTeen; the next link remains `/projects/echoes` for the next unimplemented route.
- FrankenTeen has no horizontal overflow at 1280, 1440, or 1920 pixels. The six chapters, two feature chapters, paired-media widths, 16:9 iframe, captions, and mustard/violet/dark styling remain intact; console output is clean at the checked widths.
- The Kaltura player visibly renders its Unity-editor poster and play control. The iframe has the exact approved URL, title, permission string, fullscreen attributes, and keyboard-focus target. Its cross-origin document is intentionally inaccessible; one click on the visible play control produced no observable automated state change, so deep playback is not claimed.
- Combined Session 1 QA: homepage/Hero G, BETTR, and CardioPal were directly loaded at 1280/1440/1920, refreshed at 1440, and remained console-clean and overflow-free. Hero G's approved thesis content and shell remain present. BETTR retains `#EB5160`, its oxblood feature surface, and approved OG image. CardioPal retains `#5B7A73`, the paper panel, and no OG image. Project metadata does not leak between routes. `/projects/not-a-project` returns the real HTTP 404.
- Final dependency/package diff: none. No confirmed migration regression required a QA correction.

**Open:**
- Deep Kaltura playback/control state remains externally constrained by the cross-origin player and browser automation; visible loading, URL, permissions, focusability, and framing are verified.
- Echoes of Home is the next sequential migration task and was not started.

**Commit:** `Migrate FrankenTeen project to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-19 — CardioPal ported to the dynamic Next.js project route (Lesson 5)

**Stage:** Project migration
**Scope:** `next-portfolio/src/{types/project.ts,data/projects.ts,styles/projects.css,components/projects/PrototypeEmbed.tsx,content/projects/{registry.ts,CardioPalCaseStudy.tsx,CardioPalCaseStudy.css},app/projects/[slug]/page.tsx}`, `docs/NEXTJS_MIGRATION_GUIDE.md`, this log. No static portfolio file, Hero G file, BETTR-specific component/style, dependency, package manifest, Claude/Codex configuration, or pre-existing untracked item touched. No asset copied because the approved CardioPal page intentionally has no project imagery.

**Did:**
- Added `cardiopal` to the typed project slug/data/content registries, so `/projects/cardiopal` is statically generated by the existing dynamic route alongside BETTR.
- Ported the approved static `projects/cardiopal.html` verbatim and in the same order: opening thesis/metadata/ownership, live Figma prototype, five numbered chapters, feature rows, usability metrics, task findings, participant quotes, limitation statement, testing-driven changes, reflection, and prev/next navigation.
- Ported CardioPal's scoped sage identity and paper usability panel from the approved static CSS, including the same desktop type ramp, grid placement, section rhythm, Figma embed height, feature rows, vitals cards, task list, quote cards, and breakpoint safety rules. The shared dark shell remains unchanged.
- Completed the interrupted `PrototypeEmbed` API: `allowFullScreen` now emits the iframe permission and `toneLight` now emits the approved `.tone-light` class; the shared stylesheet supplies its white loading surface. BETTR passes neither prop, so its output is unchanged.
- Kept `ProjectMeta.ogImage` optional because CardioPal deliberately has no image. Route metadata now omits `openGraph.images` when none exists instead of emitting an array containing `undefined`; BETTR still emits its existing OG image. Added optional `ogDescription` so CardioPal's distinct approved Open Graph summary is preserved without changing its standard meta description.

**Decisions:**
- CardioPal remains a Server Component. A third-party iframe does not require hooks or browser APIs, so no CardioPal Client Component was introduced.
- The Figma prototype remains CardioPal's only interface evidence. No screenshot, crop, placeholder, or unrelated asset was copied into the Next.js app.
- Shared changes are limited to backward-compatible iframe presentation/permission support and safe optional metadata handling; no shared project composition was redesigned.

**Verified:**
- `npm.cmd run lint`: clean, zero warnings.
- `npm.cmd run build`: succeeded after rerunning with network access for the existing `next/font/google` downloads; TypeScript passed and the route table lists `/projects/bettr` and `/projects/cardiopal` as SSG output.
- Direct `/projects/cardiopal` load: correct title, one `h1`, five ordered `h2` chapters, exact approved visible content, exact Figma URLs, `allowfullscreen`, `.tone-light`, and no `og:image` tag.
- Static-vs-Next content comparison after whitespace normalization: exact match across the opening, all sections, and footer navigation. At 1440 and 1920 the internal CardioPal hero/artifact/iframe/paper-panel dimensions match the approved static page; the Next.js route has only the established shared site-header offset above the project frame.
- No horizontal overflow at 1280, 1440, or 1920. Console clean at the checked widths. Sage accent resolves to `#5B7A73`, dark shell to `#0D0C0B`, and paper panel to `#F2EEE9`.
- Figma embed visibly loaded the real CardioPal canvas and its zoom/fullscreen controls at 1280. Its cross-origin document is intentionally inaccessible to parent-page inspection; browser-automation clicks produced no observable state change, so deep Figma interaction is not claimed as verified.
- Keyboard focus: skip link, full-prototype link, and iframe are focusable; the focused skip link moves to `top: 16px` and shows the approved 2px outline.
- BETTR regression: correct title/OG image, live-build iframe path, plain `.proj-embed` class, watched motif, zero overflow, and clean console. Clicking BETTR's project-frame CardioPal link navigates successfully. `/projects/not-a-project` still renders the real 404.

**Open:**
- Deep interaction inside the cross-origin Figma embed remains externally constrained in this browser environment; the rendered canvas, native controls, URL, permission, and framing are verified.
- FrankenTeen is the next sequential migration task and was not started in this lesson.

**Commit:** `Migrate CardioPal project to Next.js` (hash in Git history; this entry ships in that commit)

### 2026-07-18 — Four read-only migration subagents added

**Stage:** Foundation
**Scope:** new `.claude/agents/{static-source-auditor,nextjs-docs-researcher,content-integrity-reviewer,visual-qa-reviewer}.md`, `docs/NEXTJS_MIGRATION_GUIDE.md` (new "Workflow note" section), this log. No static or Next.js implementation file touched, no dependency changed. CardioPal migration (Lesson 5) not started.
**Did:**
- Created four project-level Claude Code subagents under `.claude/agents/`, checked in so the whole repo (and any future session) can use them, not just this machine:
  - `static-source-auditor` — read-only inventory of one approved static page (content, media/dimensions, fonts/colors/motifs, interactions, global-vs-project CSS, must-preserve items, weak/missing assets) before it's ported.
  - `nextjs-docs-researcher` — verifies framework APIs against `next-portfolio/node_modules/next/dist/docs/` (this Next.js version's own installed docs, per `next-portfolio/AGENTS.md`) before falling back to live web research.
  - `content-integrity-reviewer` — compares a migrated project page's content against the approved static source and the site's writing rules (`CLAUDE.md`'s 2026-07-17 writing/content rules, direction doc §16) for factual accuracy and ownership framing.
  - `visual-qa-reviewer` — post-implementation QA of a Next.js route: static-source comparison, console/network check, `npm run lint`/`npm run build`, responsive/reduced-motion checks, blocker-first report.
- Each is read-only by tool restriction, not just instruction: `static-source-auditor`, `nextjs-docs-researcher`, and `content-integrity-reviewer` have `tools: Read, Grep, Glob` (`nextjs-docs-researcher` additionally has `WebFetch`/`WebSearch` as a documented fallback), and all three explicitly deny `Write, Edit, NotebookEdit, Bash`. `visual-qa-reviewer` additionally has `Bash` and the Browser-pane inspection tools (needed to actually run lint/build and load the route), still denies `Write, Edit, NotebookEdit`, and its system prompt states Bash may only run inspection/build/lint commands, never a file-mutating or Git-staging one.
- All four set `model: sonnet`, `permissionMode: default` (standard prompting on any tool call that isn't already excluded — deliberately not `bypassPermissions`), and an explicit `maxTurns` (20-40 depending on scope).
- Verified against the currently-installed Claude Code docs (`code.claude.com/docs/en/sub-agents`, fetched live this session) rather than assumed: confirmed the supported frontmatter field set (`name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `color`, etc.), that `tools`/`disallowedTools` (not `permissionMode`) is the documented mechanism for enforcing read-only behavior in a custom subagent (the same mechanism the built-in Explore/Plan agents use), and that every tool name used (`Read`, `Write`, `Edit`, `NotebookEdit`, `Grep`, `Glob`, `Bash`, `WebFetch`, `WebSearch`, and the specific `mcp__Claude_Browser__*` tool names) is a real tool name in this environment.
- Confirmed image dimensions don't require Bash/ImageMagick to inspect: the static site already declares real native `width`/`height` attributes directly on `<img>` tags (e.g. `projects/bettr.html`'s `width="1630" height="970"`), so `static-source-auditor` can extract them with Grep alone — this is why it has no Bash access at all.
- Added a "Workflow note" section to `docs/NEXTJS_MIGRATION_GUIDE.md` explaining what a subagent is, why a separate context matters, what each of the four does, what the main agent still owns, when to use one versus not, and that a fresh session is required before first use.

**Decisions:**
- `permissionMode: default` (explicit) on all four rather than `plan` or `bypassPermissions` — `plan` mode is designed for the interactive plan-mode workflow and its interaction with Bash/browser tool availability isn't guaranteed to still allow `visual-qa-reviewer`'s required lint/build/browser checks; tool-list restriction is the mechanism the official docs themselves point to for a read-only custom subagent, so that carries the actual enforcement weight, and `permissionMode: default` keeps normal prompting as a backstop rather than silently allowing anything.
- `visual-qa-reviewer` is the one agent with Bash and browser tools, because its named responsibilities (run lint/build, check console output) are impossible without them — the read-only guarantee for this one agent rests on `disallowedTools` plus an explicit system-prompt rule against file-mutating or Git-staging commands, not on tool omission, since Bash itself can't be scoped to "read-only shell commands" without a `PreToolUse` hook, which wasn't part of this task's scope.
- All four agents were validated for parseable frontmatter (a small Node script parsed each file's YAML frontmatter block) and confirmed to have unique `name` values before committing.

**Verified:**
- `git status`/`git diff --stat` before committing confirmed no static portfolio file, no `next-portfolio/src/**` file, and no `package.json`/`package-lock.json` changed — only the four new agent files and the two docs.
- Confirmed the seven pre-existing untracked items from before this session (scratchpad assets, `docs/VISUAL_CALIBRATION_AUDIT.md`, `v2-preview/bettr-editorial-layout/`, the skill's `__pycache__/`) remain untouched and untracked.
- Confirmed current branch is `nextjs-port`.

**Open:**
- These four subagents cannot be delegated to within the session that created them — `.claude/agents/` did not exist before this session started, so the file-watcher won't pick it up until a restart. First real use is intended for the Lesson 5 CardioPal migration, in a new session.
- Lesson 5 ("Porting CardioPal, testing component reuse, and learning external embeds, fallbacks and project-specific variants") not started, per explicit instruction.
- All prior open items unaffected and carried forward unchanged.

**Commit:** pending (written just before the commit)

### 2026-07-18 — BETTR ported as the first dynamic project route (Lesson 4)

**Stage:** Pilot page
**Scope:** new `next-portfolio/src/{types/project.ts,data/projects.ts,styles/projects.css,components/projects/**,content/projects/**,app/projects/[slug]/page.tsx}`, modified `next-portfolio/src/{app/{layout.tsx,globals.css,page.tsx},styles/tokens.css,eslint.config.mjs}`, new `next-portfolio/public/assets/{bettr,bettr-live}/**` (copied, not moved), `docs/NEXTJS_MIGRATION_GUIDE.md`, this log. No other project ported, no Selected Work index, no contact chapter, no new dependency. Static portfolio files untouched.
**Did:**
- Audited the approved static `projects/bettr.html` + its production CSS/JS as source of truth (not the earlier `v2-preview/bettr-editorial-layout/` prototype): full chapter order, factual metadata, all visible text, 7 required images with native dimensions, 2 Kaltura video sources, the same-origin live iframe, BETTR's own Jersey 25/Rajdhani fonts, the accent/motif system, and the shared editorial component classes already in use.
- Built a typed project registry (`data/projects.ts`, `ProjectMeta` keyed by a `PROJECT_SLUGS` const-tuple `ProjectSlug` union) separate from a content registry (`content/projects/registry.ts`, slug → React component) — deliberately two files, since metadata is a serializable value and a case-study composition is executable UI, not data.
- Created the dynamic route `app/projects/[slug]/page.tsx`: `generateStaticParams` from `PROJECT_SLUGS` (bettr only), `generateMetadata` (async, `params` awaited per the installed Next.js 16 API), `notFound()` for any slug missing either metadata or a registered component. `npm run build` confirms `/projects/bettr` is statically generated (`●` SSG in the build's route table).
- Built the 8 reusable components the brief named (`ProjectPageShell`, `ProjectOpening`, `ProjectSection`, `SectionHeading`, `MediaFigure`, `ProjectAnnotation`, `VideoBlock`, `PrototypeEmbed`), all Server Components, all visually neutral — BETTR's own colour, fonts and bespoke widgets stay out of them. Extended `ProjectAnnotation` with an optional `media` slot (label → media → paragraph) once the static markup showed that's the real shape of the type-system/colour-system evidence blocks, not label-then-paragraph alone.
- Ported the shared "project case-study" component system (`.cols`/`.cA-B` grid, `[data-layout]`, `.proj-*` classes) from `css/portfolio.css` into a new global stylesheet, `styles/projects.css`, using the exact same class names as the static site (not CSS-Modules hashing) so a project's own stylesheet can override them by ancestor selector without hashing friction, and so CLAUDE.md's "only these cA-B classes exist" note stays true unchanged. Extended `tokens.css` with the missing shared `--ed-fs-*` editorial type ramp and `--grid-gap`/`--seam`.
- Built `BettrLiveEmbed.tsx`, the lesson's one new Client Component: ported the same-origin PLAY cursor bridge's actual mechanics (same-origin detection, translating iframe-local pointer coordinates, injecting a `cursor:none` style into the iframe document, dropping the reveal the instant the parent receives pointer movement, full listener/style cleanup on unmount or reload) into a small self-contained overlay — deliberately not wired to the site-wide custom-cursor dot, which doesn't exist in this Next.js app yet (a later lesson's job). Documented as a proven-behaviour port, not a reinvention.
- Wrote `content/projects/BettrCaseStudy.tsx` + a plain scoped stylesheet `BettrCaseStudy.css` (App Router allows importing global CSS from any component, not only the root layout, so no `:global()` CSS-Modules ceremony was needed) — every chapter, all visible copy, the 7-swatch palette band, the Jersey 25/Rajdhani type specimen, and the corner-bracket "watched" motif, byte-for-byte matched against the static page.
- BETTR's own fonts (Jersey 25, Rajdhani 500/600): a scoped `@font-face` in `BettrCaseStudy.css` pointing at the copied `/assets/bettr-live/Fonts/**` files — the same files the live embed itself needs, not a second copy — rather than `next/font/local`, matching the static site's own approach and keeping the fonts out of the global Fraunces/Inter/Space Mono setup.
- Copied (never moved) exactly the 7 images `projects/bettr.html` references into `public/assets/bettr/`, and the complete `assets/bettr-live/**` tree (fonts, stage folders, licence files, exact casing) into `public/assets/bettr-live/`; `diff -rq` against the source confirmed byte-identical.
- Switched `MediaFigure` to `next/image` (not a plain `<img>`) — every figure here is a static screenshot with known native dimensions, no animation, no iframe-adjacent cursor behaviour to preserve, so next/image's optimisation is a genuine benefit, not a case for the plain-`<img>` exception.
- Added `metadataBase` to the root layout — required once a route-level `generateMetadata` (BETTR's `og:image`) needed a relative-path image URL; without it Next.js errors the build. Set to this repo's actual GitHub Pages URL (`bharva0.github.io/Portfolio`), not a placeholder.
- Added the temporary `next/link` route-validation link ("View migrated BETTR case study →") beneath the Lesson 3 homepage placeholder.
- Excluded `public/**` from ESLint (it was linting the copied, protected `bettr-live` build's own third-party JS) and fixed BETTR-page-specific lint errors (`<a>` → `next/link` for internal routes, unescaped apostrophes → `&apos;`) without suppressing anything.

**Decisions:**
- Two separate registries (data vs. content) rather than one combined object, matching the brief's explicit ask to teach the data/component distinction, not a simplification I made unprompted.
- The breadcrumb frame and footer prev/next nav are not their own reusable component this lesson — they weren't among the 8 named, and their content ("Next: CardioPal") differs per project anyway — so they render as plain markup inside `BettrCaseStudy.tsx`, using the shared `.proj-frame`/`.proj-footer-nav` classes, nested inside `ProjectPageShell` so they still inherit `.project-bettr` scoping.
- `MediaFigure`'s `crop` prop ships all three real static mechanisms (`default`, `coverTopLeft`, `native`) even though BETTR's own content only exercises the first two — these aren't hypothetical, they're already-shipped static mechanisms (`.crop-tl`, `.native`/`--native-w`) a future project page will need, so porting the third alongside costs nothing extra now.
- `.reveal` is applied to each `ProjectSection` (matching static markup) but is currently inert: the static site's scroll-reveal CSS only activates under `html.can-animate`, and nothing in this Next.js app adds that class yet (Hero G's own `hg-can-animate` is a separate, unrelated class). Content renders fully visible either way — this will start working automatically once a later lesson ports the site-wide reveal system, not a bug today.

**Verified:**
- `npm run lint`: clean, zero warnings (after excluding `public/**` and switching to `next/image`). `npm run build`: succeeded; TypeScript passed; build output lists `/projects/bettr` as a statically generated (SSG) route.
- Confirmed via a scratch `.ts` file + `npx tsc --noEmit` (written, checked, deleted, per the Lesson 2 precedent) that all four described TypeScript guards actually fire: an unsupported `ProjectSlug` value, a `ProjectMeta` missing its required `title`, an invalid `ProjectSectionRhythm` string, and a `MediaFigureProps` missing `width`/`height` all produce real compiler errors.
- `/projects/bettr` loads directly, matches the static page's title/thesis/metadata/copy (checked via `get_page_text`), and shows zero console errors or hydration warnings in a fresh browser tab (an earlier, reused tab's console history included a stray Hero G script-tag notice, isolated and confirmed unrelated to the BETTR route once checked in a clean tab).
- Navigation verified: homepage → BETTR via the temporary link, BETTR → homepage and → CardioPal via `next/link` (CardioPal itself 404s as expected, unimplemented), browser back and forward, and a direct hard reload on `/projects/bettr` — all correct. An unknown slug (`/projects/unknown-project`) renders Next's real 404 page.
- No horizontal overflow at 1280×800, 1440×900, 1920×1080, or 3440×1440 (checked via live `scrollWidth`/`clientWidth`, not a screenshot — see Open). Skip link confirmed first-focusable, targets `#main-content`. One `<main>` landmark, correct heading hierarchy (one `h1`, seven ordered `h2`s), all 3 iframes carry meaningful `title` attributes, 6 `<figure>` elements for the 6 in-page images.
- PLAY bridge verified directly: a synthetic `PointerEvent` dispatched inside the same-origin iframe's document confirmed `contentDocument` access succeeds, the native-cursor-hiding `<style>` is injected into that document, the overlay's opacity transitions from 0 toward 1 with the correctly translated local coordinates: and a synthetic parent `mousemove` immediately drops the overlay back to 0 — matching the bridge's documented drop-on-parent-motion behaviour.
- Confirmed via `diff -rq` that the copied `public/assets/bettr-live/` tree is byte-identical to the source, and via `git status`/`git diff --stat` that no static portfolio file, `package.json`, or `package-lock.json` changed.

**Open:**
- A headless-Chrome screenshot check at 375px width returned a stale, cached render (the Chrome invocation silently redirected to an already-running browser session, ignoring every flag — confirmed by three identical output file sizes across different wait times) that appeared to show clipped text; a live `scrollWidth`/`clientWidth` check and a fresh-tab zoomed screenshot in the same session both confirmed no actual overflow. Documented as a tooling artifact for future sessions (memory updated), not a real layout bug, but a genuine independent headless-Chrome screenshot at 375px is still worth re-confirming once that tooling issue is worked around.
- Multi-frame visual side-by-side screenshots against the static page at 1440/1920/3440 were not captured pixel-for-pixel (this session's Browser pane renders screenshots at a fixed small size regardless of requested viewport, a previously-documented limitation) — parity was instead verified structurally (identical ported CSS, matching DOM structure/text, zero overflow at each width) rather than by pixel diff.
- Lesson 5 ("Porting CardioPal, testing component reuse, and learning external embeds, fallbacks and project-specific variants") not started, per explicit instruction.
- All prior open items (touch-device lens/pointer verification, multi-frame pointer convergence) unaffected and carried forward unchanged.

**Commit:** `23a3260`

### 2026-07-18 — Hero G ported to Next.js (Lesson 3)

**Stage:** Foundation
**Scope:** `CLAUDE.md`, `docs/PORTFOLIO_DIRECTION_V2.md` (stale-documentation correction), new `next-portfolio/src/components/hero/{HeroG.tsx,HeroGInteractive.tsx,HeroG.module.css,HeroG.types.ts}`, `next-portfolio/src/app/{layout.tsx,globals.css,page.tsx}` (modified), `docs/NEXTJS_MIGRATION_GUIDE.md` (new Lesson 3 chapter), this log. No project page, no Selected Work index, no new dependency. Static portfolio files (`index.html`, `css/portfolio.css`, `js/portfolio.js`, `projects/**`, `assets/**`, `v2-preview/**`) untouched.
**Did:**
- **Resolved the stale-documentation flag carried from the Lesson 2 entry below:** `CLAUDE.md` and the direction doc's §11 previously stated "no public homepage integration has happened yet" for Hero G, which was already wrong at the time — static commit `e37af20` had integrated it. Both docs now record: Hero G is live on the static homepage (commit `e37af20`), that static integration (not `v2-preview/hero-g-kinetic-thesis/`) is the production source of truth, and the Next.js port works from it.
- Audited the exact static Hero G implementation across `index.html`, `css/portfolio.css` (~lines 249–524), and `js/portfolio.js` (the guarded Hero G IIFE) before writing any Next.js code.
- Built the component boundary: `HeroG.tsx` (Server Component) owns real content (band text, name, statement, CTA, metadata) as plain data and the semantic `<section id="hero-g">`; `HeroGInteractive.tsx` (Client Component, the only `"use client"` file this lesson) owns and animates the entire interactive subtree (bands, ember twin field, anchor, lens) as one unit — split further would have meant duplicating markup between a static and interactive version for a single shared rAF loop.
- Ported, materially unchanged: all four thesis bands with their authored offsets and edge overshoot, the asymmetric ~38%-centre "Bharat Vyas" knockout (confirmed not recentred), the positioning statement, the Selected Work CTA, degree/location metadata, the ultra-wide aspect tier, pointer counter-displacement, the rectangular inspection lens with its clipped-ember reveal, the four contextual labels, scroll-linked band separation, the masked clip-wipe entrance, and the first-visit 0–100 loader.
- Loader/hydration: a plain inline `<script>` (not `next/script`'s `beforeInteractive`, which the installed Next.js 16 docs confirm must live in the root layout) sets `hg-can-animate`/`hg-pending`/`hg-ready` on `<html>` and inserts the loader overlay before hydration, exactly mirroring the static site's own early-script split; `HeroGInteractive`'s effect continues the tick. Session key namespaced (`hs-next-loader-seen`) separately from the static site's `hs-loader-seen`. `layout.tsx`'s `<html>` carries `suppressHydrationWarning` for this one, expected, class-list mutation.
- Header overlay (Lesson 3J): `.site-frame:has(+ main #hero-g)` in `globals.css` makes the shared header absolute-position itself over Hero G only when `#hero-g` exists in `<main>` — CSS-only, no pathname check, `SiteHeader` stays a Server Component. Falls back gracefully (header in normal flow) on browsers without `:has()` support, and reverts to normal flow below 1024px like the static site.
- Replaced the Lesson 2 demo homepage in `page.tsx` with Hero G plus one restrained placeholder `<section id="work">` ("Selected work — Project index migration follows in a later lesson"), sized only to prove the scroll handoff and the `#work` anchor land somewhere real.
- Cleanup: the single `useEffect` (dependency `[bands]`) returns one cleanup function undoing every listener, rAF handle, and timeout it started — verified via repeated Fast Refresh cycles in dev leaving exactly one `#hero-g`, one lens, and four bands (no duplicates).

**Decisions:**
- Zero `useState` calls in `HeroGInteractive` — the loader overlay isn't JSX (inserted procedurally by the bootstrap script), the entrance is CSS-class-driven, and the lens label is written via `textContent` through a ref, so nothing here ever needed a conditional render branch. Documented as a deliberate conclusion of the "refs for per-frame updates" rule, not an oversight.
- Grouped the pointer engine's mutable state (pointer offsets, lens position, scroll easing, running/settled guards) into one `useRef`-held plain object rather than a dozen separate refs, since every field is read/written together by the same rAF loop.
- IntersectionObserver and the site-wide contextual cursor were not ported this lesson — both are static-site systems that extend beyond the hero (`.reveal` site-wide, cursor decorates project rows too) and are out of scope until a lesson that covers the whole site, not just Hero G. The lens still hides the native pointer over the hero on its own, independent of that unbuilt cursor system.

**Verified:**
- Geometry matched the static site to sub-pixel precision (band widths, unshifted anchor position, and the JS-computed `--anchor-shift`, `-19.036865234375px` on both) once measured at a settled moment — an initial ~90px discrepancy was traced to a testing artifact (repeated manual resizes catching each site's `alignBand2` mid-settle at different times), not a real difference; forcing a synchronous resize on both converged them identically.
- No horizontal overflow at 1280×800, 1440×900, 1600×1000, 1920×1080, 2560×1080, 2560×1440, 3440×1440, or 375×812, on both sites; the ultra-wide tier engaged identically at 3440×1440.
- Header overlay confirmed `position: absolute` at desktop widths, `position: static` below 1024px, on both sites.
- Loader confirmed to show on a fresh session and skip on repeat visit (same tab, reloaded); confirmed absent from the DOM under `--force-prefers-reduced-motion` on both sites, alongside the `hg-can-animate`/`can-animate` class also being absent on both.
- No-JS content confirmed via a direct fetch of the raw served HTML (no browser JS involved): "Bharat Vyas" and "Interactive Systems" present as real text.
- Skip link confirmed first-focusable, targets `#main-content`; `#work` confirmed to exist with the CTA's `href="#work"` pointing at it.
- `npm run lint`: clean. `npm run build`: succeeded, TypeScript passed, `/` and `/_not-found` both statically prerendered.
- One TypeScript build error hit and fixed: `heroEl`'s null-check didn't narrow into the `heroFrame` function declared later in the same effect (called asynchronously via rAF); fixed by rebinding to an explicitly-typed non-null `const`.
- Console and network confirmed clean at every tested viewport; `git diff --stat` confirmed zero changes to any static portfolio file.
- Multi-frame pointer-lerp convergence could not be observed live in this session's Browser pane (a documented `requestAnimationFrame` stall specific to that pane, unrelated to tab focus) — a dispatched synthetic pointer event did produce an immediate, correctly-directioned band transform and lens-live toggle on the first frame before the stall; full live convergence is a tooling gap in this environment, not a discrepancy observed in the shipped code.

**Open:**
- Multi-frame pointer engine convergence (beyond the first frame) unverified live, per the tooling limitation above — the ported logic is a line-for-line match of the verified static implementation.
- Touch-device verification of the lens/pointer fallback on a real touch screen — still outstanding (carried from prior static-site entries, applies equally here).
- Lesson 4 ("Project data, dynamic routes, reusable case-study components and porting BETTR as the first project route") not started, per explicit instruction.
- All prior static-redesign open items unaffected and carried forward unchanged.

**Commit:** pending (written just before the Lesson 3 commit)

### 2026-07-18 — Next.js shared site shell (Lesson 2)

**Stage:** Foundation
**Scope:** `next-portfolio/src/**` (new components/data/styles + rewritten `app/layout.tsx`, `app/page.tsx`, `app/globals.css`), `docs/NEXTJS_MIGRATION_GUIDE.md`, this log. No Hero G, no project page, no new dependency. Static portfolio files untouched.
**Did:**
- Audited `css/portfolio.css` and separated genuinely global rules (surfaces, ember family, fonts, type scale, gutter, content widths, section spacing, borders, focus ring) from Hero G/BETTR/CardioPal/FrankenTeen/Echoes-specific rules. Found the static site's own `[data-layout="reading"|"standard"|"wide"]` modes already match the brief's requested `PageContainer` variants exactly (46em / 88% / 100%) — carried over unchanged rather than inventing new widths.
- Flagged (not fixed, out of scope): `css/portfolio.css` shows Hero G is already wired into the live `index.html`, contradicting `CLAUDE.md`'s current note that no homepage integration has happened — a documentation staleness issue for Bharat to reconcile separately.
- Created `src/components/layout/{PageContainer,Section}.tsx`, `src/components/site/{SiteHeader,SiteNavigation,SkipLink}.tsx`, `src/data/navigation.ts`, `src/styles/{tokens.css,fonts.ts}` — the structure sketched in the brief, plus `styles/fonts.ts` (a font loader is a TS module call, not CSS).
- `tokens.css`: exact color/spacing/type-scale values ported from the static site's `:root` block; no new palette. One honest gap documented: the static site's only `prefers-reduced-motion` rule is entirely Hero G-scoped, so the new `--motion-duration-*`/`--motion-ease` tokens are placeholders for Lesson 3, not ported values.
- Fonts: `next/font/google` for Fraunces (variable, both italic/normal, `opsz` axis — the static site relies on in-between weights like 380/560 that only exist on the true variable instance), Inter (variable), Space Mono (static weight 400 only, matching the static site's actual usage). BETTR's Jersey 25/Rajdhani deliberately excluded.
- Refactored `layout.tsx` (still a Server Component, no `"use client"`): font variables, factual metadata from `index.html`'s existing `<title>`/description/OG tags, `SkipLink`, `SiteHeader`, `<main id="main-content">`.
- Replaced the generated starter `page.tsx` with a temporary, clearly-labelled shell-validation page: real name/tagline copy, three demo sections (Shared shell / Design tokens / Component architecture) exercising all three `PageContainer` variants and both `Section` rhythms, a token-driven color-swatch demo. No Hero G, images, fake projects, animations, or decorative effects.
- Added TypeScript unions (`PageContainerVariant`, `SectionRhythm`) and a typed `NavigationEntry`; verified the union actually rejects bad input by writing a throwaway `variant="huge"` test file, running `tsc --noEmit` (`error TS2322: Type '"huge"' is not assignable...`), then deleting the test file.

**Decisions:**
- `PageContainer` and `Section` are two separate components (gutter + rhythm vs. width + centering are different concerns) rather than one combined wrapper.
- Fraunces loaded as `weight: "variable"` after the first attempt (`weight: "300 700"`, a range string) was rejected by this Next.js version's font loader — see Verified/error note below.
- No footer, no contact section, no loader, no cursor — explicitly deferred, per the brief.

**Verified:**
- Dev server (port 4202): one real error surfaced and fixed (below); after the fix, zero console/terminal errors on reload.
- Headless Chrome screenshots at 1280/1920px, plus a 375px capture via the established iframe-harness pattern: header/nav readable and wrap gracefully at 375px, no horizontal overflow at any width, the three `PageContainer` variants visibly different widths at every breakpoint.
- Skip link: keyboard `Tab` confirmed as first focusable element, becomes visible on focus (`top` moves from `-48px` to `16px`), targets `#main-content`, which exists on the page's actual `<main>`.
- `npm run lint`: clean. `npm run build`: succeeded, TypeScript passed, `/` and `/_not-found` both statically prerendered.
- `grep` across `next-portfolio/src` for `"use client"`: zero matches — every Lesson 2 component confirmed a Server Component.
- **Real error hit and fixed:** `weight: "300 700"` for the Fraunces font loader failed outright (`Unknown weight 300 700 for font Fraunces. Available weights: 100, 200, 300, 400, 500, 600, 700, 800, 900, variable`) — this Next.js version doesn't accept a range string, only discrete weights or the literal `"variable"`. Fixed by switching to `weight: "variable"`.
- Confirmed via `git status` that only the intended `next-portfolio/src/**` files changed; static portfolio files, the checkpoint tag, and all seven pre-existing untracked items remain untouched.

**Open:**
- ~~Lesson 3 ("Porting Hero G and learning Client Components, hooks, browser APIs and interactive cleanup") not started, per explicit instruction.~~ Done — see the 2026-07-18 "Hero G ported to Next.js (Lesson 3)" entry above.
- ~~The `CLAUDE.md` staleness flag above (Hero G already live in `index.html` despite the doc saying otherwise) is unresolved and not part of this session's scope.~~ Resolved in the Lesson 3 entry above.
- All prior static-redesign open items unaffected and carried forward unchanged.

**Commit:** pending (written just before the Lesson 2 commit)

### 2026-07-18 — Next.js migration foundation: branch + scaffold (Lesson 1)

**Stage:** Foundation
**Scope:** New `nextjs-port` branch (created from the `static-redesign-checkpoint` tag, not from `redesign-v2`); new `next-portfolio/` Next.js app; `.claude/launch.json` (added a `next-portfolio` dev-server config); new `docs/NEXTJS_MIGRATION_GUIDE.md`. No static portfolio file (`index.html`, `css/portfolio.css`, `js/portfolio.js`, `projects/**`, `assets/**`, `v2-preview/**`) touched.
**Did:**
- Confirmed toolchain: Node.js v24.18.0 (LTS), npm 11.16.0, Git 2.53.0.windows.2 — all within the accepted range (Node 22 or 24 LTS).
- Created `nextjs-port` directly from the `static-redesign-checkpoint` annotated tag (commit `c45040d`), not from any uncommitted state; confirmed zero diff against the tag immediately after switching.
- Scaffolded `next-portfolio/` via `create-next-app@latest` (non-interactive): TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, Turbopack, npm, `@/*` import alias, React Compiler disabled, nested git init disabled.
- Installed versions: next 16.2.10, react 19.2.4, react-dom 19.2.4, typescript 5.9.3, tailwindcss 4.3.3, eslint 9.39.5.
- Added a `next-portfolio` entry to `.claude/launch.json` (`npm --prefix next-portfolio run dev -- --port 4202`) so the dev server can be driven through the Browser pane's `preview_start` instead of a raw shell process.
- Verified the scaffold end-to-end: dev server up on port 4202 with no console/terminal errors, one temporary text edit to `page.tsx` confirmed hot-reload (HMR) then reverted, `npm run lint` clean, `npm run build` succeeded (both `/` and `/_not-found` prerendered as static).
- Confirmed the pre-existing static site (python server on port 4200) kept responding (`200`) throughout, untouched by any of this work.
- Wrote `docs/NEXTJS_MIGRATION_GUIDE.md`, a beginner-oriented explainer of every tool/concept introduced (Node, npm, package.json/lock/node_modules, React, JSX/TSX, Next.js App Router, TypeScript, Tailwind, ESLint, Turbopack, dev vs. build vs. start, the generated folder structure), tied back to this portfolio specifically rather than generic framework docs.

**Decisions:**
- `next-portfolio/` is scaffolding only — no portfolio content, layout, or design has been ported or reimplemented yet. Lesson 2 (components/layouts/tokens/shared shell) has not started.
- The generated `next-portfolio/CLAUDE.md` (`@AGENTS.md`) and `next-portfolio/AGENTS.md` (a Next.js-16-specific note to check `node_modules/next/dist/docs/` before writing unfamiliar APIs, since this Next.js version postdates a lot of training data) were inspected and left in place as-is — they're scoped to `next-portfolio/` only and don't conflict with or override the root `CLAUDE.md`'s portfolio rules, which continue to govern the static site and this repo's redesign work.
- No dependency beyond the official `create-next-app` scaffold was installed (no React Bits, Motion, GSAP, or 21st.dev components).

**Verified:**
- `git diff static-redesign-checkpoint --stat` empty immediately after branch creation.
- No nested `.git` directory inside `next-portfolio/` (`--disable-git` respected).
- `git check-ignore -v` confirms the root repo respects `next-portfolio/.gitignore` for `node_modules` and `.next`.
- Dev server (port 4202): page renders, zero console errors, zero terminal compile errors, HMR test round-tripped cleanly.
- `npm run lint`: zero warnings/errors. `npm run build`: compiled successfully, both routes statically prerendered.
- Static site (port 4200) still serves `200` after all of the above.
- All seven pre-existing untracked items (`__pycache__/`, four asset crops, `VISUAL_CALIBRATION_AUDIT.md`, `v2-preview/bettr-editorial-layout/`) still present, untouched, unstaged.

**Open:**
- Lesson 2 ("React components, Next.js layouts, design tokens and the first shared site shell") not started, per explicit instruction not to begin it this session.
- All open items from the static redesign (FrankenTeen/Echoes pending Bharat's visual approval, BETTR/CardioPal §16 writing pass, Kaltura extraction, touch-device verification, Hero G homepage integration) are unaffected and carried forward unchanged — this session touched none of that work.

**Commit:** pending (this entry written just before the Lesson 1 commit)

### 2026-07-18 — Final static optimisation pass: FrankenTeen & Echoes (fifth session)

**Stage:** Remaining pages (final static-design pass before the Next.js migration, per an explicit brief scoped to composition/image-selection/spacing fixes only — no restructuring, no new chapters, no new claims)
**Scope:** `projects/echoes.html`, `css/portfolio.css`, this log. `projects/frankenteen.html` was reviewed in full (every chapter, 1280–3440px and 375px) but needed no changes — it already met the brief at every checked breakpoint. No `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, remaining project pages, `assets/bettr-live/**`, or `/v2-preview/` touched. No new image assets created, no dependency added. Not committed.
**Did:**
- **Full chapter-by-chapter visual QA of both pages**, using headless Chrome screenshots (the Browser pane's own renderer was intermittently stalled this session; screenshots were taken via `chrome --headless=new` against the existing port-4200 server, functional checks — click behaviour, console, overflow — via the Browser pane's JS tools, which stayed responsive throughout) at 1280 / 1440 / 1920 / 2560 / 3440px and a 375px mobile stack (900px harness window with a 375px iframe, per this project's established headless-Chrome measurement pattern). FrankenTeen: opening, all six numbered chapters, and the footer reviewed individually; confirmed the `.chapter-mark` Roman numeral genuinely reads as a quiet woven texture behind "Building"/"Designing" rather than a competing shape (zoomed pixel check), confirmed the mansion/attic evidence pairs hold their dominant/secondary hierarchy at every width, confirmed no title overlap, no horizontal overflow, and clean mobile stacking. No changes made to this page this session.
- **Echoes' runner chapter: swapped the dominant image.** `runner-text-crop.jpg` (a Unity Scene view almost entirely occupied by a floating story-prompt dialogue box, showing no track, no lanes, no obstacles) was replaced with `runner-scene-crop.jpg` (471×356, same extraction batch, already on disk from an earlier session but unused on either page) as `proj-dominant-shot`, which actually shows the track, lanes, and the player character mid-run under a storm-lit sky. The previous image directly contradicted its own paragraph, which describes obstacles, lanes, and the track it never pictured. Alt text and caption rewritten to describe what the new image actually shows ("Development capture, Unity Scene view. The track and lanes, mid-run.").
- **Echoes' relocated playthrough video given a real poster.** The Kaltura embed's own default thumbnail (visible before any interaction) showed a facecam bubble and the literal placeholder copy "Story Board text here" / "Press any key to continue..." — precisely the editor-chrome-and-facecam problem this project's redesign has been correcting everywhere else, just surfaced here by the video host rather than by a screenshot choice. Frame-extraction to replace it was already documented as attempted and abandoned across five prior attempts in earlier sessions (cross-origin iframe interaction limits); rather than a sixth attempt, built a click-to-load poster facade: a `<button class="video-poster">` (quiet dark surface, an accent-ringed play glyph, one italic line, "Watch the recording") replaces the iframe until clicked, at which point JS constructs the real iframe with its existing, unmodified `src`/`title` and removes the button. A `<noscript>` fallback keeps the video present with JS disabled. This is the "optional click-to-load poster facade" pattern the direction doc §15 already sanctions for the Kaltura embeds, applied for the first time. FrankenTeen's video keeps its native Kaltura thumbnail unchanged — it already shows real, informative Unity editor content (the `Act3_Attic` hierarchy, no facecam, no placeholder text), so no facade was needed there.
- **First poster draft rejected before shipping:** an initial version centred `runner-text-crop.jpg` (freed up by the runner-chapter swap above) at native 471px width inside the video-wrap's full 16:9 box. At the page's actual content width that box renders roughly 1300×730px, so the 471px image sat small and adrift in a mostly empty dark field, the exact "small image floating in an oversized section" pattern this session's brief explicitly lists as a defect to remove, and would have been a straightforward upscale-or-float trade-off either way. Replaced with the image-free typographic version described above before it was ever left in place; `runner-text-crop.jpg` stays unused on disk, consistent with this project's existing pattern of leaving superseded extracted crops unused rather than deleting them.
- **New shared CSS component**, added to the existing `.video-wrap` block rather than project-scoped: `.video-poster` / `.video-poster-play` / `.video-poster-title`. Generic and unscoped like `.feature-media` before it, so any future project page's video could reach for the same facade, though only Echoes uses it today.

**Decisions:**
- Did not attempt a sixth round of Kaltura frame-extraction automation; the click-to-load poster facade solves the actual visible problem (a bad default thumbnail) without depending on iframe pointer interaction that has failed consistently across this project's prior sessions.
- Left the poster image-free (typographic) rather than shipping the first, image-based draft — chosen over spending further time trying to make a 471px-native asset look intentional inside a 730px-tall box, and it reads as more consistent with the site's own "typography carries the personality" principle than a compromise image would have.
- FrankenTeen received no code changes this session; its existing state already satisfied the brief at every checked breakpoint, and the brief explicitly warns against redesigning sections that don't need it.

**Verified:**
- Headless Chrome screenshots reviewed chapter-by-chapter for both pages at 1280/1440/1920/2560/3440px, plus a 375px mobile stack for both openings and one feature chapter each.
- Browser-pane JS check on the live port-4200 server: clicking `.video-poster` creates an iframe with the correct, unmodified `src` and `title` and removes the poster button; confirmed via `document.querySelector` before/after, not just visually.
- `document.documentElement.scrollWidth === clientWidth` (no horizontal overflow) reconfirmed at 1440px on Echoes, FrankenTeen, BETTR, and CardioPal after the CSS change, run individually per page.
- Console clean on Echoes after the video-poster and runner-image changes (`read_console_messages`, no entries).
- No broken images on Echoes (`naturalWidth` checked for every `<img>` on the page).
- Grepped the repo for `video-poster` to confirm no pre-existing class name collision before adding the new CSS block.

**Open:**
- **Still not committed — both pages await Bharat's final visual approval**, per this and every prior session's explicit instruction. This session's two changes (runner image, video poster) are additive on top of the fourth session's already-awaiting-approval state, not a reset of it.
- All prior open items carried forward unchanged, notably: Kaltura frame-extraction remains technically unresolved for both videos (Echoes' is now mitigated by the poster facade rather than solved by extraction; FrankenTeen never needed it); BETTR/CardioPal writing still pending its own §16 review pass; touch-device verification outstanding site-wide; Hero G homepage integration awaiting its own approval.

**Commit:** pending visual approval

### 2026-07-18 — Current state snapshot: FrankenTeen & Echoes, pending final approval

**Stage:** Other (end-of-session documentation checkpoint, no code or design changes in this entry — verifies the four sessions below are fully and accurately reflected in `CLAUDE.md` and this doc set before the session ends)

**Branch and git status:** `redesign-v2`. Working tree has uncommitted changes carried across this and the three prior sessions on the same branch; nothing from any of these FrankenTeen/Echoes sessions has been committed yet.
```
 M .claude/launch.json          (from an earlier, unrelated session — not touched by the FrankenTeen/Echoes work)
 M CLAUDE.md
 M css/portfolio.css
 M docs/PORTFOLIO_DIRECTION_V2.md
 M docs/PORTFOLIO_PRODUCTION_LOG.md
 M projects/echoes.html
 M projects/frankenteen.html
?? assets/echoes/{laptop-interaction,room-scene,runner-scene,runner-text,track-blender}-crop.jpg
?? assets/frankenteen/{attic-approach,attic-lab,bedroom-clean,blender-modules-strip,blender-wall-module,demo-dialogue,demo-gate,guitar-prop,mansion-approach,mansion-gate,mansion-progression,pacing-chart}-crop.jpg
?? .claude/skills/ui-ux-pro-max/scripts/__pycache__/   (pre-existing, unrelated, left untouched per every session's explicit instruction)
?? docs/VISUAL_CALIBRATION_AUDIT.md                     (pre-existing, unrelated, left untouched)
?? v2-preview/bettr-editorial-layout/                   (pre-existing, unrelated, left untouched)
```
Of the untracked `assets/frankenteen/` crops, four are no longer referenced by the current page (`runner-scene-crop.jpg` under `assets/echoes/`, plus `blender-modules-strip-crop.jpg`, `demo-dialogue-crop.jpg`, `demo-gate-crop.jpg` under `assets/frankenteen/`) — extracted during the second session, superseded by tighter editing in the third and fourth, left on disk unused rather than deleted (no session's brief asked for cleanup).

**Source design documents used:**
- `DD_Submission2.pdf` (27 pages, Bharat's Downloads folder) — the final FrankenTeen design document; both its text and 157 embedded images (extracted via `pypdf`) are the primary source for every FrankenTeen fact and image used from the second session onward. Confirms team of three (Hamish Reid, Edward Newell, Bharat), the guitar mechanic, the School/Town/House pacing chart, and (via the process video's own Unity hierarchy panel, visible in its poster frame) the scene name `Act3_Attic` inside scene file `Act 3 Indoor`, the evidentiary basis for calling Act 3's confrontation room "the attic" with confidence rather than as a guess.
- `DD_SUB_1.pdf` (14 pages, same folder) — an earlier FrankenTeen submission, read for context; superseded by `DD_Submission2.pdf` for everything actually used on the page.
- `Submission2_DesignDocument_Numbered_BharatVyas.docx` (Bharat's Downloads folder) — the Echoes of Home design document, read via its `word/document.xml` for the raycast-interaction detail, the audio-manager/scene-transition technical account (including the real cause of the room-runner handoff bug), and the testing findings used in Echoes' implementation chapter.
- No new source documents were opened in the third or fourth sessions; both were editing/composition/polish passes over material already extracted in session two.

**Extracted image assets actually used on each page, in page order (all pre-existing as of this snapshot, none created in this session):**
- *FrankenTeen:* `mansion-gate-crop.jpg` (opening — colour-graded in session four, same file/dimensions) → `bedroom-clean-crop.jpg` + `guitar-prop-crop.jpg` (§01) → `pacing-chart-crop.jpg` (§02) → `mansion-approach-crop.jpg` + `mansion-progression-crop.jpg` (§03, paired) → `attic-approach-crop.jpg` + `attic-lab-crop.jpg` (§04, paired, lab image presented smaller since session four) → `blender-wall-module-crop.jpg` (§05) → the Kaltura process-footage video (§05, `entry_id=1_j1w7k3an`).
- *Echoes:* `laptop-interaction-crop.jpg` (opening, since session four) → `room-scene-crop.jpg` (§01) → `runner-text-crop.jpg` + `track-blender-crop.jpg` (§03, paired, since session four's rebuild) → the Kaltura full-playthrough video (§04, `entry_id=1_6anm1jue`, relocated from the opening in session four).

**Current page structure:**
- *FrankenTeen* (7 chapters — opening + 6 numbered; do not re-expand past this count without a fresh explicit brief): Opening (typography-led, one restrained visual, no meta-grid) → 01 The shared concept → 02 Designing Act 3 and its pacing → 03 Building the mansion approach (feature chapter, paired evidence) → 04 Designing the attic confrontation (feature chapter, paired evidence, lab image visually secondary) → 05 Blender, environment, and implementation (includes the process video) → 06 Testing, limitations, and what I'd change.
- *Echoes of Home* (6 chapters — opening + 5 numbered, plus the quiet interlude between 01 and 02; do not re-expand past this count without a fresh explicit brief): Opening (typography-led, one dominant development-capture image, no video) → 01 The room as a memory space (`.accent-heading`) → *quiet interlude* → 02 Experience flow (6-node corridor) → 03 The runner sequence (one dominant image + small inset) → 04 Implementation, testing, and limitations (includes the relocated full-playthrough video, inside `.proj-feature-surface`, plus the Problem/Decision/What-testing-found/What's-still-limited grid and the quote pair) → 05 What I'd still change.

**Decisions that must not be reversed without a fresh explicit brief:**
- No teammate names, contribution scores, or role-rating grids anywhere on either page (site-wide rule, direction doc §16) — FrankenTeen's team is named only as "team of three" in one sentence; Echoes has no team to name (solo).
- Neither page's video may be the primary/opening hero visual — both moved to a labelled evidence position mid-page (FrankenTeen §05, Echoes §04).
- FrankenTeen's opening carries no `proj-meta-grid` box; role/tools/team are one flowing ownership paragraph.
- FrankenTeen's `.chapter-mark` Roman numeral is low-opacity (0.065) and positioned via `.proj-section-title > .chapter-mark`, woven behind the heading text only, on the two Act 3 chapters only — never a separate/floating/detached element.
- FrankenTeen's attic interior image (`attic-lab-crop.jpg`) stays visually smaller than the exterior approach image and captioned explicitly as a development capture, not a finished render.
- Echoes' primary accent is the cool blue-grey `--echoes-accent` (`#87A2B8`); `--echoes-lamp` (amber) is a rare secondary tied only to lamp-light language and the interlude, never restored as primary, no further accent colours added.
- Echoes' "main room doesn't visibly change on return" limitation stays explicitly stated (currently in §04's structured record), never quietly dropped.
- Both pages: no unsupported claims, no em dashes/double hyphens in reader-facing copy, first-person voice for Bharat's own decisions, distinct composition and accent from BETTR/CardioPal/each other.

**Rejected layouts that must not return:**
- FrankenTeen's original nine-chapter version (pre-session-three consolidation); the "ACT III · MINE" floating chip label; the detached, oversized, off-panel Roman numeral that sat beside rather than behind the heading; the scored/named credit-grid card layout (`Designer Alpha — 95/100` etc.).
- Echoes' original eight-chapter version with a standalone "The alternate room, and what doesn't change" chapter (now folded into the flow list + §04's limitation record); the raw Kaltura video as opening hero; the rejected runner layout (two small images upper-left, large empty right half, text below); amber as Echoes' primary accent; the seven-beat flow list with "Intro" as its own node.
- The undefined `c2-12` grid-column class (never defined in `css/portfolio.css`) — caused a real bug in session four, now fixed to `c1-13`; do not reintroduce an undefined column class on either page.

**Completed QA (all four sessions, most recently re-verified end of session four):** console clean and no horizontal overflow (`scrollWidth === clientWidth`) on both pages at 1280 / 1440 / 1920 / 2560 / 375px; full dimension audit (every `<img>` attribute and every `--native-w` inline value checked against the real source file via `PIL`) shows zero upscale risk on either page; BETTR and CardioPal reloaded after every CSS change and confirmed unaffected (console clean, no overflow, `.proj-title` unchanged at 120.48px at 1440px); full-page section-by-section screenshot review completed for both pages after every session's edits.

**Remaining visual-review items (nothing below is a code defect — all are review/decision items for Bharat):**
- **Both pages await Bharat's final visual sign-off. Neither has been committed.** This is the single blocking item.
- Video-frame extraction from the Kaltura embed is technically unresolved: the player did not respond to automated pointer interaction in this tool environment (five attempts, session four). Both pages currently use honestly-labelled static development captures instead, per the brief's own documented fallback. If a real in-experience video frame is still wanted for either hero, it needs either a locally-hosted copy of the source recording or a manually captured frame supplied from outside this tool.
- All prior open items from earlier in the "Human Systems" redesign carry forward unchanged and are unrelated to this work: BETTR/CardioPal writing not yet reviewed under §16; touch-device verification outstanding site-wide; the FrankenTeen *homepage hero* re-capture blocker (separate from the project page, `index.html` untouched); CardioPal/Playing Freedom imagery gaps; Smartphone Mold and Playing Freedom still on the pre-redesign skin; Hero G homepage integration awaiting its own separate approval.

**Exact next step:** Bharat reviews both pages live (`static-preview-game-pages`, port 4200 per `.claude/launch.json` — start it and open `/projects/frankenteen.html` and `/projects/echoes.html`). If approved as-is, commit `projects/frankenteen.html`, `projects/echoes.html`, `css/portfolio.css`, and this doc set together with a commit message referencing this snapshot entry. If changes are requested, treat this entry plus the four dated entries immediately below it as the complete current-state brief for the next session, rather than re-deriving context from scratch.

**Commit:** pending visual approval (applies to all four sessions below, none committed)

### 2026-07-18 — FrankenTeen final polish; Echoes of Home opening/runner rebuild

**Stage:** Remaining pages (fourth pass on these two pages: FrankenTeen scoped to targeted polish only, no restructuring; Echoes scoped to a focused rebuild of its opening and runner chapter, which were the two specifically rejected pieces)
**Scope:** `projects/frankenteen.html`, `projects/echoes.html`, `css/portfolio.css`, this log, plus one existing derived asset edited in place (`assets/frankenteen/mansion-gate-crop.jpg`, re-graded, same filename and dimensions, no new file). No `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, remaining project pages, `assets/bettr-live/**`, `/v2-preview/`, or `.claude/launch.json` touched. No external dependency added.
**Did:**
- **Attempted real video-frame extraction first, as the brief's stated first preference for both Echoes' opening and runner chapter.** Tried to play/seek the embedded Kaltura video via the Browser pane (multiple click attempts on the play control, at different coordinates, with a refocus-then-click retry) to capture an in-experience frame without the facecam or placeholder text. The player never responded to the automation's pointer events, a cross-origin iframe interaction limit, not a page defect. Documented as an unresolved technical constraint below and fell back to the brief's own second-preference path: the strongest already-existing room/runner captures, honestly labelled as development evidence, not fabricated or generated.
- **FrankenTeen opening image improved without upscaling or fabrication.** Re-examined `mansion-gate-crop.jpg` (the "slightly soft and washed out" image named in the brief) and applied a modest, real photo-editing pass, contrast +12%, saturation +15%, brightness +3%, sharpness +25%, via `PIL.ImageEnhance`, no resampling, no resolution change, same 1070×657 file. A tighter recrop was tested first (trimming the top-left corner to remove faint camera-frustum gizmo lines) but rejected because it cut off the mansion's silhouette, the more important compositional element; the enhancement-only version was kept.
- **FrankenTeen ownership text cut from ~60 words to 40**, dropping both teammates' names and their individual work descriptions entirely, keeping only "team of three" plus every fact the brief's checklist named for Bharat: designed and built Act 3, the mansion approach and the attic confrontation, Blender and Unity, environment/trigger/dialogue/interaction implementation.
- **FrankenTeen spacing tightened.** Hero-to-section-01 gap reduced from ~173px to ~122px at 1440px width (a 29% reduction, within the requested 20-30% band): `.proj-hero` bottom padding `clamp(48,5vw,80)` → `clamp(32,3.5vw,56)`, and `.proj-section:first-of-type` top padding `clamp(80,7vw,124)` → `clamp(56,5vw,88)`. The pacing-to-mansion transition (governed by the mansion chapter's own feature-chapter padding, since sections don't carry bottom padding) reduced from `clamp(120,10vw,175)` to `clamp(95,8vw,140)`, roughly a 20% cut, applied to both Act 3 feature chapters for consistency.
- **The Roman numeral fixed and restrained.** Found and fixed a real specificity bug left over from the previous session: a later, higher-specificity rule (`.proj-section-title > *`) was silently overriding the numeral's own `position: absolute`, so it had actually been rendering as an inline element sitting beside the heading rather than woven behind it, working by visual coincidence rather than by design. Rewrote the selector as `.proj-section-title > .chapter-mark` (specificity now wins cleanly, no more collision), reduced opacity from 0.11 to 0.065, reduced font-size from 2.6em to 2.05em, and tightened its left offset so it sits directly behind the heading's own first characters rather than extending past them.
- **Attic evidence hierarchy rebalanced.** The interior lab image's presented width dropped from 817px to 520px against the exterior approach image's unchanged 973px (previously a fairly close 973-vs-817 pairing), and its caption rewritten to state plainly, "Development capture, Unity: the confrontation room mid-build, not a finished render," rather than the previous, more scene-setting caption that read as though it were describing a finished shot.
- **Echoes' opening no longer uses the raw video.** The video (Unity editor chrome, the "Story Board text here" placeholder card, and a facecam bubble, the exact three problems the brief named) moved out of the hero entirely. The opening now leads with `laptop-interaction-crop.jpg`, an already-existing, already-cropped development capture (chrome removed, only a trigger-volume gizmo remains, the same honesty standard already applied to every other Echoes image on the site) at native 471px width, captioned honestly as a development capture rather than presented as a finished render. Eyebrow and ownership line both now name Blender explicitly alongside Unity, per the brief's requirement.
- **Room chapter (01) recomposed and cut to ~85 words** (from ~140), keeping `room-scene-crop.jpg` as its own dominant visual (distinct from the opening's image, so the same picture doesn't appear twice in a row) so the two chapters read as two different angles of the same real space rather than a repeat. The `lamp-word` amber accent, dropped by accident during the previous session's text trim, was restored (now reading "lamp light" rather than the previous "late-afternoon light," matching the caption on the newly-added opening image).
- **The runner chapter completely rebuilt**, replacing the rejected two-small-images-plus-two-paragraphs layout with one dominant image (`runner-text-crop.jpg`, centred at its full 471px native width) followed by one 85-word paragraph and a small Blender-track inset (280px) beside it, covering why the runner contrasts with the room, procedural obstacle spawning, the coin milestone, and why the track was modelled in Blender, in one pass rather than two.
- **A real layout bug caught and fixed before any screenshot was reviewed**: the runner chapter's first draft placed the dominant image in a `class="c2-12"` column, a grid-column span that was never actually defined in `css/portfolio.css` (the site's defined spans jump from `c1-10` to `c1-13`, skipping `c2-12` entirely). With no matching rule, the div fell back to a single implicit grid cell, so the image rendered at roughly 75px wide with its caption wrapped into a near-vertical sliver. Caught on the first full-page review screenshot, not by code inspection alone; fixed by switching to the defined `c1-13` span with the figure self-centred inside it.
- **The full playthrough video relocated**, not removed, into the new "Implementation, testing, and limitations" chapter, wrapped in `.proj-feature-surface` (Echoes' own deep-slate accent panel, defined in tokens since the very first accent-correction session but never actually used on the page until now) and relabelled "full playthrough · development recording" with a caption stating plainly it's "recorded from Unity during development," not presented as a polished trailer.
- **Blue-grey identity strengthened in four concrete, deliberate places**, per the brief's explicit list: the quiet interlude gained top/bottom hairline rules in the accent colour (`color-mix(... 40%, transparent)`), making it read as a framed transition rather than text floating in empty space; the flow-list's connecting line switched from the generic border colour to the accent at reduced opacity; the `pdrl-item` structural borders switched from the default line colour to an accent/line blend; and the room chapter's heading picked up the accent colour directly via a new `.accent-heading` class, the one deliberate large-scale use of the identity colour on the page, used once.
- **Text trimmed further against the session's tighter targets** (most chapters at or under ~110-130 words of flowing prose, excluding structured list/grid content): the room chapter, the runner chapter's explanatory paragraph, and the implementation chapter's intro were all rewritten shorter; no factual claim, evidence, or limitation was dropped in the process.
- **A second real dimension bug caught during the runner rewrite**: an early draft declared `--native-w:640px` for `runner-text-crop.jpg` (actual native width 471px), a ~36% upscale reintroduced while rebuilding the section from scratch. Caught by re-running the same PIL dimension-audit script used in the two prior sessions before any screenshot was taken, fixed to the real 471×347.

**Decisions:**
- Did not pursue further attempts at video-frame extraction after five failed interaction attempts across different coordinates and refocus strategies; judged further attempts unlikely to succeed given the consistent zero-response pattern, and the brief's own explicit fallback path (strongest existing capture) was available and compliant.
- Reused `room-scene-crop.jpg` in the room chapter (already established there) rather than moving it to the opening, and used a different existing crop (`laptop-interaction-crop.jpg`) for the opening instead, so the two chapters that both need a "room" image show two different real captures rather than the same picture twice in immediate succession.
- Kept the two Act 3 feature chapters' padding reduction identical to each other (both `is-feature-chapter`) rather than only touching the specific pacing-to-mansion transition named in the brief, since an uneven rhythm between the two sibling chapters would have read as inconsistent.

**Verified:**
- Fresh checks on the existing port-4200 server. FrankenTeen and Echoes both console-clean and free of horizontal overflow (`scrollWidth === clientWidth`) at 1280 / 1440 / 1920 / 2560 / 375px.
- Dimension audit (`PIL`, every `<img>` attribute and every `--native-w` inline value checked against the real file) re-run after all edits on both pages: zero upscale risk anywhere.
- FrankenTeen: full-page headless captures reviewed for the opening (image visibly richer/less washed out, ownership text short and Bharat-focused, gap to section 01 visibly tighter), the pacing-to-mansion transition (numeral now sits tightly behind the heading text at low contrast, transition reads as deliberate rather than empty), and the attic chapter (approach image clearly dominant, lab image clearly secondary with an explicit "not a finished render" caption).
- Echoes: full-page headless captures reviewed for the rebuilt opening (video gone, real atmospheric development capture in its place), the room chapter (two distinct real images, no repeat), the corrected runner chapter (one dominant 471px image, small inset, one paragraph), and the relocated video (now inside the implementation chapter's slate feature-surface, honestly captioned).
- BETTR and CardioPal reloaded: console clean, no overflow, `.proj-title` unchanged at 120.48px at 1440px.
- `git status --porcelain` confirmed only the four in-scope files (plus the one in-place asset edit) changed this session.

**Open:**
- **Not committed — awaiting Bharat's final visual approval of both pages**, per this session's explicit instruction.
- **Video-frame extraction from the Kaltura embed remains technically unresolved.** The player did not respond to automated pointer interaction in this environment across five attempts; if a real, in-experience frame (rather than the current development-capture fallback) is wanted for the opening or runner hero at some point, it would need either a locally-hosted copy of the source recording or manual frame capture outside this tool's current interaction model.
- All prior open items carried forward unchanged.

**Commit:** pending visual approval

### 2026-07-18 — FrankenTeen and Echoes of Home: editorial and composition pass

**Stage:** Remaining pages (third pass on the same two pages: this one is pure editing and composition, no new source material, no new facts)
**Scope:** `projects/frankenteen.html` (full rewrite), `projects/echoes.html` (full rewrite), `css/portfolio.css` (generalised `.feature-media` from `.project-frankenteen`-scoped to shared/unscoped so Echoes' runner chapter could reuse it; widened `.tone-dim img` to match unscoped figures too; no new tokens), this log. No `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, remaining project pages, `assets/bettr-live/**`, `/v2-preview/`, or `.claude/launch.json` touched this session. No new image assets created; several already-extracted crops from the prior session (`runner-scene-crop.jpg`, `blender-modules-strip-crop.jpg`, `demo-dialogue-crop.jpg`, `demo-gate-crop.jpg`, `laptop-interaction-crop.jpg`) are no longer referenced by either page but remain on disk, unused, per the "no new assets" constraint (nothing to delete, nothing added). Not committed.
**Did:**
- **FrankenTeen consolidated from nine chapters to seven**, matching the brief's target structure exactly: opening, the shared concept, designing Act 3 and its pacing, building the mansion approach, designing the attic confrontation, Blender/environment/implementation, testing and reflection. "One mechanic" folded into "the shared concept"; "Blender/environment/atmosphere" and "triggers/dialogue/interaction" merged into one chapter; "iteration/testing/fixes" and "reflection" merged into one closing chapter.
- **Opening rebuilt again**: the `proj-meta-grid` box (Role/Tools/Team/Status as four separate cells) is gone, replaced by one flowing ownership paragraph that carries team context, Bharat's role, and both tools (Unity, Blender named in the eyebrow too) without reading as a metadata table. This also makes the opening visually distinct from BETTR/CardioPal's own grid-based opening, which the brief's composition rule implicitly asked for (every project distinct, not just in colour).
- **Every chapter now has a different composition** rather than a repeated text-left/image-right split: the opening is text-left/image-right; "the shared concept" flips to image-left/text-right with a dominant room render and a small Blender-prop inset stacked beneath it; the pacing chapter is text-left/large-chart-right with the chart at its full 810px native width (previously capped at 640px); the two Act 3 feature chapters keep their paired full-panel evidence (an intentional parallel between the two, not a repeated generic layout, since they're sibling chapters about the same act); the Blender/implementation chapter is a wide text block with a small inset image, then the full-width video as the dominant artifact; the closing chapter is text and a structured finding-list only, no image.
- **Text volume cut substantially.** Every paragraph was re-edited against the brief's ~70–120-word main-explanation target: dropped the target-audience tangent from the pacing chapter, merged the "iteration" and "reflection" chapters into one, cut the collider-bug and scene-transition-bug mentions down from a full paragraph to one folded sentence, and rewrote the mansion/attic annotations from two separate paragraphs each into one. Total page height dropped from roughly 13,500px to about 9,470px at 1440px width, a 30% reduction, with the same core facts (team ownership, Act 3 scope, the pacing argument, both feature chapters, the Blender/trigger implementation, testing findings, honest UI-pivot limitation) all still present.
- **Image count reduced from twelve to nine.** Dropped `blender-modules-strip-crop.jpg`, `demo-dialogue-crop.jpg`, and `demo-gate-crop.jpg` from display entirely rather than giving every extracted asset its own slot; the trigger/dialogue system is now demonstrated by the video (which shows it in motion) plus one Blender inset, not four separate static images.
- **Echoes consolidated from eight chapters to six**: opening, the room as a memory space, experience flow, the runner sequence, implementation/testing/limitations, reflection. The old standalone "alternate room, and what doesn't change" chapter is gone; the laptop task is now one line in the experience-flow list, and the "no visible change on return" limitation moved into the new implementation chapter's structured record, per the brief's explicit instruction not to give it independent weight.
- **The runner chapter was completely rebuilt**, replacing the rejected four-block layout (paragraph / small image / small image / paragraph) with the shared `.feature-media` component: one dominant image (the story-prompt-and-HUD capture) beside one smaller technical inset (the Blender track), then a single consolidated paragraph covering what the runner does, why it's a deliberate pacing contrast, and what was built, with the story-slide transition folded into the runner-flow chapter's list rather than a second paragraph here.
- **New four-part structure for the implementation chapter** ("The problem" / "The decision" / "What testing found" / "What's still limited"), reusing the existing `.proj-annotation-label`/`.proj-annotation` components rather than a new widget, combining the transition bug, testing findings, and the return-room limitation into one scannable record instead of three separate write-ups.
- **Scene-flow simplified from seven beats to six**, dropping the standalone "Intro" node and merging "Coin milestone" into the "Runner" description, matching the brief's suggested Room → interaction → story transition → runner → alternate room → ending map.
- Page height dropped from roughly 9,650px to about 6,470px at 1440px width, a 33% reduction.
- **Two real dimension bugs caught and fixed during this pass**, both before any QA screenshot: the room chapter's image was declared correctly but placed in a `c1-4`/`c5-13` column split so narrow for text and so wide for a native-capped image that the text wrapped awkwardly and the image sat in a mostly-empty column; fixed by rebalancing to `c1-6`/`c7-13`. Separately, `runner-text-crop.jpg` (471px native) was declared as `width="640"` in the new runner composition, a genuine ~36% upscale reintroduced while rewriting the section from scratch; caught by re-running the same dimension-audit script from the prior session before screenshotting, fixed to its real 471×347.

**Decisions:**
- Generalised `.feature-media` (built FrankenTeen-only last session) into a shared, unscoped component rather than writing a near-duplicate for Echoes' runner chapter, since both needed the identical "dominant image plus native-capped technical inset, shrink together, never upscale" behaviour.
- Kept the two Act 3 feature chapters (mansion, attic) visually parallel to each other rather than forcing artificial variety between them; they're deliberately sibling chapters about the same act, and the brief's "avoid repeating the same split in every chapter" is read as applying across the page's chapters generally, not to two chapters that are intentionally paired.
- Dropped three FrankenTeen images from display rather than trying to preserve a slot for everything extracted last session; "fewer, stronger images" outranks "use everything that was found."

**Verified:**
- Fresh checks on the existing port-4200 server (already running from the prior session; `preview_start` with a direct URL was used to reattach the Browser pane to it after a mid-session tool-classifier outage, rather than editing `.claude/launch.json`, which is out of scope this round).
- FrankenTeen: console clean and no horizontal overflow (`scrollWidth === clientWidth`) at 1280 / 1440 / 1920 / 2560 / 375px. All 9 images resolved 200. Full-page headless capture reviewed chapter by chapter: opening, shared concept, pacing, mansion approach, attic confrontation, Blender/implementation (including the video, whose own poster frame still shows the `Act3_Attic` scene name from last session's finding), testing/reflection.
- Echoes: console clean and no horizontal overflow at the same five widths. All 3 images resolved 200. `--proj-accent` reconfirmed resolving to the blue-grey (`rgb(135, 162, 184)`). Full-page headless capture reviewed chapter by chapter, including a second capture after the room-chapter column-ratio fix.
- Dimension audit (`PIL`, checked every `<img>` `width`/`height` attribute against the real file) re-run after all edits: zero upscale risk on either page.
- BETTR and CardioPal reloaded after the CSS generalisation: console clean, no overflow, `.proj-title` still 120.48px at 1440px; grepped both files for `feature-media`/`tone-dim` usage to confirm no incidental class collision with the newly-unscoped rules.
- `git status --porcelain` confirmed only the four in-scope files changed this session (plus already-existing uncommitted changes from the prior two sessions, untouched here); no new files created.

**Open:**
- **Not committed — awaiting Bharat's visual approval of both pages**, per this session's explicit instruction.
- All prior open items carried forward unchanged.

**Commit:** pending visual approval

### 2026-07-17 — FrankenTeen and Echoes of Home: corrective rewrite

**Stage:** Remaining pages (corrective pass on the same-day redesign below, plus a new site-wide content-standards addition)
**Scope:** `CLAUDE.md`, `docs/PORTFOLIO_DIRECTION_V2.md` (new §16, "Writing and content standards"), `projects/frankenteen.html` (full rewrite), `projects/echoes.html` (full rewrite), `css/portfolio.css` (`.project-frankenteen`/`.project-echoes` blocks reworked, Echoes accent tokens changed), 11 new derived image crops in `assets/frankenteen/` sourced from the actual FrankenTeen design document (not previously read), this log. No `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, `assets/bettr-live/**`, Hero G, or any `/v2-preview/` prototype touched. Not committed.
**Did:**
- **New content-standards section added, site-wide.** `docs/PORTFOLIO_DIRECTION_V2.md` §16: project pages must give a recruiter with no prior context enough to understand the premise, Bharat's role, the decisions, and the outcome; thin sections get expanded with real evidence, not filler; writing is human, direct, first-person for Bharat's own decisions, and free of em dashes and AI-sounding fragment constructions; teammate scores, ratings, and contribution percentages are retired site-wide; collaborative projects acknowledge the team briefly and stay focused on Bharat; every project keeps a distinct accent and composition; fewer, stronger images beat many weak ones. `CLAUDE.md` cross-references it. Applied to FrankenTeen and Echoes this session; BETTR and CardioPal's writing is explicitly still pending its own pass.
- **Found the real FrankenTeen design document.** The previous session's FrankenTeen redesign worked only from three already-cropped slide exports already in the repo (`assets/frankenteen/*.jpg`). This session located and read the actual source: `DD_Submission2.pdf` (27 pages, in the user's Downloads folder, the final design document behind those same slide exports) via `pypdf` text extraction, plus `DD_SUB_1.pdf` (the earlier 14-page submission). Full text of both extracted and read. This surfaced real Act 3 planning language the page never used (level design driven by "emotional pacing," the guitar's role as "identity and tool," the UI pivot's actual reasoning) and confirmed facts already on the page (team of three, Shelley citation, the collider bug fixed with AI assistance).
- **Extracted 157 embedded images from `DD_Submission2.pdf`** (`pypdf`'s `page.images`, JPEG2000 source) and visually reviewed the substantive ones, concentrating on the pages the brief specifically asked about: mansion/attic planning, Blender work, greyboxing, triggers, and testing. This surfaced material never seen before in this project: two clean, chrome-free mansion exterior renders at dusk; a three-stage texturing-lighting-colliders build progression for the mansion; a much higher-resolution, completely clean render of Adam's bedroom (replacing the old 600×320 crop); an interior lab-like space lit by a glowing containment tube, matched against the process video's own Unity hierarchy panel, which shows a GameObject literally named `Act3_Attic` in a scene file called `Act 3 Indoor`, confirming this is the actual attic confrontation space rather than a guess; raw untextured Blender modules (a gothic wall section, a strip of building pieces) documenting modular construction; a clean Blender render of the guitar prop; and two real demo-level gameplay captures (an NPC teaching the "play rock music" mechanic through dialogue, a gate trigger) with a stray console-error line cropped out of each. Converted and lightly cropped 11 of these into `assets/frankenteen/` (`mansion-gate-crop.jpg`, `mansion-approach-crop.jpg`, `mansion-progression-crop.jpg`, `bedroom-clean-crop.jpg`, `attic-lab-crop.jpg`, `attic-approach-crop.jpg`, `blender-wall-module-crop.jpg`, `blender-modules-strip-crop.jpg`, `guitar-prop-crop.jpg`, `demo-dialogue-crop.jpg`, `demo-gate-crop.jpg`), all at native resolution, no upscaling.
- **FrankenTeen — opening rebuilt.** The video is no longer the hero; it moved to a new "Triggers, dialogue, and interaction" chapter as clearly-labelled implementation evidence. The opening is now typography-led: title, premise, a one-sentence team-acknowledgment ("Hamish Reid built Act 1... Edward Newell built Act 2... This case study is about Act 3"), the suggested role statement (level design and implementation, Act 3, the mansion approach, the attic confrontation, environment construction, Unity implementation), a tools/status meta grid with no scores, and one restrained visual (the clean mansion-gate render) in a narrower side column that never overlaps the title.
- **FrankenTeen — rejected elements removed.** The role/score grid (`Designer Alpha, 95/100` etc.) is gone entirely, replaced by the plain team sentence above; no contribution percentages appear anywhere on the page. The floating "ACT III · MINE" chip and the detached oversized stroke-outline "III" sitting in empty space are both gone. A new `.chapter-mark` component (`css/portfolio.css`) places a small italic Roman numeral directly inside the chapter heading's own box at ~11% opacity, a woven watermark, not a floating shape, used on the two Act 3 chapters only. The Act 1 dorm screenshot was removed from the pacing chapter, which now shows only the (now much larger) pacing chart.
- **FrankenTeen — restructured around Act 3.** New nine-section order: 01 the shared concept, 02 one mechanic (now with the guitar prop render), 03 planning pacing (chart only, larger), **04 building the mansion approach** (new feature chapter: a full-size mansion exterior render paired with the texturing/lighting/colliders progression, plus a "what I decided and why" annotation), **05 designing the attic confrontation** (new feature chapter: the courtyard approach paired with the interior lab render, explaining the spatial contrast between open grounds and a cramped confrontation room), 06 Blender/environment/atmosphere (new chapter: the wall-module and building-strip renders, discussing modular construction and lighting), 07 triggers/dialogue/interaction (new chapter: the two demo-level captures, plus the process video as implementation evidence), 08 iteration/testing/fixes (testing table expanded with findings pulled from the real document text, UI pivot folded in as one paragraph since it was never shipped), 09 reflection. Sections 04-07, all Act-3-specific, now make up the visual and textual majority of the page.
- **FrankenTeen — writing rewritten** throughout in first person for Bharat's own decisions, expanded with the goal/constraint/decision/change/learning structure the brief asked for on the two Act 3 chapters specifically, and checked for em dashes (none remain outside HTML source comments, which aren't reader-facing).
- **Echoes of Home — accent corrected.** `--echoes-accent` changed from the amber used in the rejected first pass to a muted cool blue-grey (`#87A2B8`, `--echoes-accent-deep: #56707F`), clearly distinct from FrankenTeen's mustard/violet, CardioPal's sage, and BETTR's red. `--echoes-slate` (`#171B20`) is now a fixed deep desaturated navy used directly as the feature-surface colour rather than a `color-mix()` tint. The old amber is kept as `--echoes-lamp`, a deliberately rare second accent used in exactly two places: the interlude's "by design" phrase and one inline "late-afternoon glow" mention in the room-composition text, both literally about lamp light or a specific remembered moment, never general emphasis.
- **Echoes of Home — composition corrected.** Every development-capture image is now a single dominant visual per chapter (`.proj-dominant-shot`) instead of two small screenshots paired side by side; one weaker, redundant capture (`runner-scene-crop.jpg`) was dropped from the page entirely rather than kept to fill space, leaving four real images plus the video, each doing a distinct job.
- **Echoes of Home — new section, richer writing throughout.** Added a new section 04, "The alternate room, and what doesn't change," answering the brief's specific question about what changes when the player returns, honestly: the main room doesn't visually change, and the page says so directly as a named limitation rather than glossing over it. Section 02 now explains why the runner is part of the same experience (a deliberate pacing contrast with the room) rather than just listing it as a beat. Section 06 ("Unity implementation and the hardest bug") is expanded with real technical detail pulled from the actual Echoes design document (`Submission2_DesignDocument_Numbered_BharatVyas.docx`, found and read this session via `python-docx`-style XML extraction): raycast-based interaction detection, the world/screen-space canvas split, the central audio manager's scene-based fading, customised per-scene skyboxes, and the real root cause of the room-runner transition bug (two audio listeners briefly active at once, ambiguous scene-activation order). Section 07 now names a concrete testing finding ("fonts looked generic and reduced emotional expression") absent from the previous draft and closes with an explicit "what's still limited" paragraph (no touch support, unfinished ending polish, the unresolved main-room limitation). Checked for em dashes; none remain in reader-facing copy.

**Decisions:**
- The Act 3 confrontation room is described as "the attic" with confidence, not hedged, because the process video's own Unity hierarchy panel (visible in its poster frame) shows the scene file `Act 3 Indoor` containing a GameObject named `Act3_Attic`, real project evidence rather than an inference from the story description alone.
- The "Blender, environment, and atmosphere" chapter frames the modular mansion pieces as work Bharat built, per this session's explicit brief and role-statement wording, even though the design document's own asset-development note ("all of the assets have been built by us") describes it as team-wide; the images used are sourced from the same design-document pages immediately following the Act 3 mansion material, not from Act 1 or Act 2 content.
- Echoes' teammate who helped debug the transition bug is referred to as "a teammate," not by name, even though the source document names them, matching this site's existing pattern of not publishing named credits for people outside a project's own formally credited team.
- Dropped `runner-scene-crop.jpg` from the Echoes page rather than keeping it as a third development capture; it was the most visually redundant of the four crops and the brief explicitly asked for fewer, stronger images over complete coverage.

**Verified:**
- Fresh checks on the existing port 4200 server (`static-preview-game-pages`), `http://localhost:4200/projects/{frankenteen,echoes}.html`.
- FrankenTeen: live DOM measurement confirmed the opening title and the restrained side visual never overlap; no horizontal overflow (`scrollWidth === clientWidth`) at 375 / 1440 / 1920px; console clean at all three. Full-page headless capture (`--force-prefers-reduced-motion`) reviewed section by section: opening, shared concept, mechanic, pacing, mansion approach, attic confrontation, Blender/environment, triggers/dialogue (including the video), testing, reflection. The chapter-mark numeral reads as a soft low-contrast texture behind each Act 3 heading, never as a floating shape; both feature-surface panels are filled edge to edge by real paired evidence, no empty right side. All 11 new images plus the retained pacing chart resolved 200 via `fetch` HEAD.
- Echoes: same overflow/console checks clean at 375 / 1440 / 1920px. Computed-style check confirmed `--proj-accent` resolves to the new blue-grey (`rgb(135, 162, 184)`) on section numbers, rules, and the scene-flow corridor's numbered markers; `--echoes-lamp` confirmed isolated to exactly the two intended spots.
- Homepage, BETTR, and CardioPal spot-checked after the CSS changes: console clean, no overflow, BETTR/CardioPal `.proj-title` still computes to 120.48px at 1440px, confirming the reworked `.project-frankenteen`/`.project-echoes` blocks and the Echoes token rename don't leak.
- Tooling note: the Browser pane's live renderer stalled mid-session (screenshots returned stale frames, `computer` scroll actions timed out, matching a previously-documented condition) while JS execution and DOM queries kept working; visual QA for the affected stretch was done via one-shot headless Chrome captures cropped to each section using DOM-measured Y-coordinates, the same workaround used in earlier sessions with this same issue. Separately, the safety classifier backing most tool calls (Bash, Browser navigation) went through an extended outage mid-session; read-only tools (Read, Grep) kept working throughout, so QA continued via careful manual re-inspection of both files and every image asset until the outage cleared.
- **Four additional real issues caught during that extended manual re-read, all fixed before this entry:** (1) an unsupported claim, "It runs about two minutes end to end," invented on Echoes' video caption with no source, removed; (2) a factual mixup where "skyboxes were customised per act" (a real detail, but from Echoes' own design document) had been misattributed to FrankenTeen's Blender/environment chapter, corrected to a claim actually grounded in the FrankenTeen source; (3) `runner-text.jpeg`, used uncropped on Echoes on the assumption it was already chrome-free, turned out on a closer second look to show full Unity hierarchy and inspector panels; re-cropped to `runner-text-crop.jpg` (chrome removed) and the caption corrected; (4) several `width`/`height` attributes and `--native-w` values across both pages didn't match their actual source file dimensions, in one case (`room-scene-crop.jpg` on Echoes) enough to cause a real ~10% upscale, and the `.feature-media` pair component on FrankenTeen had no native-width cap at all, meaning `mansion-progression-crop.jpg` (444px native) could have been stretched to over 500px on ordinary desktop widths and further on wide viewports. Fixed by auditing every declared dimension against the real file (a small Python/PIL script, checked into no file, run ad hoc) and rebuilding `.feature-media` as a flexbox that targets each figure's native width via `flex-basis`, shrinks both figures together proportionally when they don't both fit, and never grows past native size, re-verified visually after the fix (both feature-chapter pairs now sit side by side, appropriately sized, no dead space, no upscale) at 375/1440/1920px.

**Open:**
- **Not committed — awaiting Bharat's visual approval of both pages**, per this session's explicit instruction.
- BETTR and CardioPal have not yet been reviewed against the new §16 content standards; that is separate, future work.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery gap; Smartphone Mold and Playing Freedom remaining on pre-redesign skin; FrankenTeen *homepage hero* re-capture blocker, unrelated to this project-page work; touch-device verification; Hero G homepage integration awaiting its own separate approval).
- The Echoes main-room "no visible change on return" limitation is now explicitly documented on the page itself rather than silently left as a gap; it remains unresolved in the actual build.

**Commit:** pending visual approval

### 2026-07-17 — FrankenTeen and Echoes of Home editorial redesign

**Stage:** Remaining pages (third and fourth pages onto the BETTR-benchmark editorial system; first "game project" batch — designed together, deliberately not sharing an art direction)
**Scope:** `projects/frankenteen.html` (full rewrite), `projects/echoes.html` (full rewrite, migrated off its old bespoke pre-redesign skin onto the shared component system), `css/portfolio.css` (new `.project-frankenteen`/`.project-echoes` extension blocks reusing the shared `--ed-fs-*`/`--space-major/internal/evidence` tokens and `.proj-lede`/`.proj-annotation*`/`.proj-feature-surface`/`.cols` components already extracted for BETTR/CardioPal; one new generic unscoped utility, `.proj-shot.tone-dim`, for honestly-labelled raw editor-capture evidence; two new accent-token pairs, `--frankenteen-violet*` and `--echoes-accent*`/`--echoes-slate*`), five new derived image crops (`assets/frankenteen/pacing-chart-crop.jpg`; `assets/echoes/room-scene-crop.jpg`, `laptop-interaction-crop.jpg`, `runner-scene-crop.jpg`, `track-blender-crop.jpg`), `.claude/launch.json` (new `static-preview-game-pages`, port 4200), this log. No `index.html`, `projects/bettr.html`, `projects/cardiopal.html`, `assets/bettr-live/**`, Hero G, or any `/v2-preview/` prototype touched; the three pre-existing untracked items (`__pycache__/`, `docs/VISUAL_CALIBRATION_AUDIT.md`, `v2-preview/bettr-editorial-layout/`) left untouched and unstaged; `js/portfolio.js` untouched (no new page-specific behaviour needed — both pages reuse the existing reveal/cursor inline-script pattern verbatim).
**Did:**
- **Asset audit first, both projects.** Measured every FrankenTeen/Echoes source image's native pixel dimensions and re-viewed each visually. FrankenTeen's existing crops (room/dorm/notebook/paused/town/mansion, 560–1400px native) were confirmed still chrome-free and correctly captioned from the prior session — reused as-is. Re-opened the three original 2667×1500 design-doc slides (`level-design-greybox.jpg`, `ui-development.jpg`, `world-map.jpg`) and found one genuinely new, unused piece of real evidence: a hand-plotted "School → Town → House" emotional-pacing line chart on the greybox slide, previously only described in prose (the old `.pacing-note` text callout). Cropped it out as `pacing-chart-crop.jpg` (810×625) — real design-doc material, not a generated diagram, and a direct visual argument for why Act 3 gets the strongest chapter. Echoes' six source images were confirmed to be *entirely* full Unity Scene-view or Blender-viewport captures (menu bars, hierarchy/inspector panels, gizmo crosshairs, trigger-volume gizmos) — no clean chrome-free render exists anywhere in the repo, consistent with the 2026-07-14 homepage-refinement finding that forced Echoes into a text-led homepage row. Elected not to repeat that avoidance on the project page itself (unlike the homepage, a case-study page can't skip imagery entirely and stay credible), and instead cropped four of the six down to their 3D viewport only (`room-scene-crop.jpg`, `laptop-interaction-crop.jpg`, `runner-scene-crop.jpg` at 471×356; `track-blender-crop.jpg` at 605×440) — removing UI-panel chrome (real cropping) while leaving in-viewport gizmo markers intact (informative content, not chrome) and captioning every one of them explicitly as a "development capture" rather than implying finished-game imagery. `runner-text.jpeg` (864×531) needed no crop — it already reads as real in-experience overlay/HUD content, not an editor panel — and is used as the section's primary, largest evidence shot precisely because it's the least chrome-heavy asset in either project.
- **FrankenTeen — identity:** kept the already-approved mustard `--frankenteen-accent` (matches the brief's "warm stage-light tone" option and the existing credit-grid/notebook motif) and added one secondary accent, `--frankenteen-violet`, used only for the act-tag chip and the Act III signature numeral — the "bruised violet" option from the brief, spent narrowly rather than repainting the whole page. No new typeface: the direction doc locks typography uniform across every project page (§9), so "theatrical" character comes entirely from scale, italic, stroke-outline and rotation on the existing Fraunces/Inter/Space Mono roles, not a new display face.
- **FrankenTeen — restructure:** merged the old separate hero + artifact sections into one BETTR/CardioPal-style opening spread (text col 1–5, the Act 3 process video col 5–13, using the shared `.proj-artifact-frame`/`.video-wrap` components instead of a bespoke inline embed div). Reorganised the old flat 01–08 sequence around Act 3 as the deliberate centre of gravity: 01 idea → 02 mechanic → 03 level design/pacing (now carrying the new pacing-chart evidence) → **04 "The mansion, and the attic" — a dedicated `is-feature-chapter` for Act 3**, tagged `ACT III · MINE`, using `.proj-feature-surface` + `.proj-lede` (the same feature-chapter mechanism BETTR/CardioPal already established) and a new signature element, `.act-mark`: an oversized stroke-outline Fraunces "III" bleeding off the panel's edge behind the copy, the one poster-scale theatrical gesture on the page, spent exactly once, on the chapter that's actually Bharat's own act → 05 the UI/tone pivot (unchanged content) → 06 world structure merged with the credit grid (previously two separate sections; combined since both are about team structure/ownership, and Act 3's own image had already moved into 04) → 07 testing → 08 reflection. The old, separately-numbered "mansion approach" and "attic confrontation" beats the brief suggested are deliberately combined into one chapter (04) rather than stretched across two, since only one static Act 3 image exists in the repo — the chapter's copy still names both beats explicitly and points back to the video (which shows both in motion) rather than padding a second section with no supporting evidence.
- **Echoes of Home — identity:** fully migrated off its old bespoke `:root`-scoped pre-redesign skin (cool navy-adjacent `#0C1118` background, its own orange accent, its own type scale) onto the shared Human Systems system and component set for the first time. New tokens: `--echoes-accent`/`--echoes-accent-deep` (warm lamp-amber/umber) and `--echoes-slate` (muted blue-grey), the latter feeding `--proj-feature-surface` via `color-mix()` exactly like CardioPal's sage tint — same reusable mechanism, project-owned colour only, per the direction doc's "one system, per-project accents" rule (§9).
- **Echoes of Home — restructure:** same opening-spread merge as FrankenTeen (text col 1–5, the full-playthrough Kaltura video col 5–13 as the primary artifact, replacing the old separately-stacked hero + video-hero blocks). New section order: 01 memory/premise → **02 scene flow**, rebuilt as a bespoke "corridor" component (`.flow-list`/`.flow-row`, page-local per the stylesheet's inline-widget convention) — a threaded vertical line connecting seven numbered beats, chosen because this is one of the few places on the whole site where a numbered sequence is actually earned (it's the literal, real order a player moves through, not decoration) → **a one-off quiet interlude** (`.echoes-pause`, generic but currently only consumed here) — a single italic pull-line ("It's short *by design.* The pacing is the point.") set alone on the ink field with generous padding, the page's own signature move, echoing the project's stated pacing philosophy through restraint rather than another image → 03 room composition/atmosphere (paired dev-capture screenshots, honestly labelled) → 04 the runner (`runner-text.jpeg` as lead evidence, the dev-capture pair beneath, folding in the implementation paragraph and the room→runner handoff bug/fix) → 05 testing (unchanged content, migrated onto the shared `.quote-grid` pattern) → 06 reflection. No new sections invented beyond what the existing content already supported; the runner/implementation material was deliberately merged into one chapter (04) rather than split into two thin ones, since all of it comes from a single "Building it" source paragraph.
- Added the generic, unscoped `.proj-shot.tone-dim` utility (light desaturate/darken filter) for Echoes' raw Scene-view captures — kept unscoped rather than Echoes-only since any future project page with the same "no clean render exists" constraint can reuse it.
- Added `static-preview-game-pages` (port 4200) to `.claude/launch.json`.

**Decisions:**
- FrankenTeen keeps its existing mustard accent rather than introducing a new hex from the brief's suggestion list — it was already approved and already load-bearing on the credit-grid/notebook motif; the brief's other two options (dirty electric green, warm stage-light) were treated as calibration for the existing colour, not a mandate to replace it. The bruised-violet option was added as a narrow second accent instead, reserved for the Act III moment only.
- The Act III `.act-mark` numeral is spent exactly once, not repeated per act or per section — "spend the boldness in one place" — so Acts 1 and 2 (both teammate-owned) stay in plain, unaccented evidence treatment throughout, reinforcing rather than diluting Bharat's Act 3 ownership claim.
- Echoes' Unity/Blender captures are shown, cropped to viewport-only and explicitly labelled "development capture," rather than omitted the way the homepage row was — a case-study page has to show *something*, and honestly-labelled process evidence (permitted explicitly by the brief) reads better than an evidence-free chapter; the full-playthrough video remains the page's actual clean-outcome evidence.
- `runner-text.jpeg` was promoted to the largest, lead evidence shot in section 04 specifically because it's the one Echoes asset that isn't dominated by editor chrome — real in-experience overlay text and HUD, gizmo lines only faintly visible in the background.

**Verified:**
- Fresh server on port 4200 (`static-preview-game-pages`), `http://localhost:4200/projects/{frankenteen,echoes}.html`.
- Live-page DOM measurement on both pages: opening-spread title/artifact-frame bounding boxes confirmed no overlap (title right edge 471px, artifact left edge 505.6px at 1440px, identical to BETTR/CardioPal's own verified numbers). No horizontal overflow (`scrollWidth === clientWidth`) at 375 / 1440 / 1920px on both pages. Console clean on both at all three widths.
- All FrankenTeen images (7 `<img>` sources) and all Echoes images (5 `<img>` sources) resolved 200 via `fetch` HEAD from within each page; both Kaltura embeds (FrankenTeen process footage, Echoes full playthrough) confirmed loading their real poster/player, not blank frames.
- FrankenTeen reviewed section-by-section at 1440×900: opening spread, §01 idea, §03 pacing chart (new evidence renders cleanly, chart fully legible), §04 Act III feature chapter (act-tag + act-mark numeral + mansion evidence + annotation all present, numeral reads as a restrained background texture, not a legibility problem), §06 world structure + credit grid (mine card's accent border visible), reflection — composition and hierarchy read as intentional and match the BETTR/CardioPal benchmark scale.
- Echoes reviewed section-by-section at 1440×900: opening spread (video embed live), §02 scene-flow corridor (numbered thread reads clearly), the quiet interlude (italic pull-line with the amber accent phrase), §03 room/atmosphere (paired dev captures, honest captions, `tone-dim` filter visible but subtle), §04 runner (runner-text.jpeg lead shot + dev-capture pair), reflection.
- 375px mobile reviewed on both pages: FrankenTeen's pacing-chart paragraph edited to remove a "beside this" spatial reference that only held true at desktop width (now "the chart here"); the Act III act-tag/act-mark chapter confirmed legible and non-overflowing at mobile scale (numeral font-size steps down via a dedicated mobile-safety rule). Echoes' `.flow-row` corridor component (built with `flex-wrap`, no dedicated breakpoint) confirmed wrapping gracefully to name-above-description at 375px with zero extra CSS.
- Homepage, BETTR, and CardioPal re-loaded after the CSS changes: all three console-clean, no overflow at 1440px, and BETTR/CardioPal's own `.proj-title` computed font-size re-measured at exactly 120.48px (the documented 1440px benchmark) — confirms the new `.project-frankenteen`/`.project-echoes` blocks and the new `.proj-shot.tone-dim` utility don't leak into other pages.
- `git status --porcelain` confirmed the three pre-existing untracked items (`__pycache__/`, `docs/VISUAL_CALIBRATION_AUDIT.md`, `v2-preview/bettr-editorial-layout/`) remain untouched and unstaged, and that only the declared in-scope files changed.

**Open:**
- **Not committed — awaiting Bharat's visual approval of both pages**, per this session's explicit instruction.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery gap; Smartphone Mold and Playing Freedom remaining on pre-redesign skin; FrankenTeen *homepage hero* re-capture blocker — unrelated to this project-page work, since the project page itself no longer uses the annotated hero crop; touch-device verification; Hero G homepage integration awaiting its own separate approval).
- Echoes of Home's total absence of chrome-free source imagery is now a known, accepted constraint of this page (like CardioPal's missing screenshots) rather than an open blocker — handled via honest "development capture" labelling rather than treated as unfinished pending future re-captures.

**Commit:** pending visual approval

### 2026-07-17 — CardioPal editorial redesign

**Stage:** Remaining pages (second page onto the BETTR-benchmark editorial system)
**Scope:** `projects/cardiopal.html` (full rewrite), `css/portfolio.css` (new `.project-cardiopal`-scoped block only — reuses the shared `--ed-fs-*`/`--space-major/internal/evidence` tokens and `.proj-lede`/`.proj-annotation*`/`.proj-feature-surface`/`.cols` components already extracted for BETTR, adds no new shared/unscoped rules), `.claude/launch.json` (new `static-preview-cardiopal-editorial`, port 4198), this log. No `index.html`, `projects/bettr.html`, `projects/frankenteen.html`, `assets/bettr-live/**`, Hero G, or any `/v2-preview/` prototype touched; `js/portfolio.js` untouched (no page-specific behaviour needed).
**Did:**
- **Asset audit first:** confirmed the repository has zero interface screenshots for CardioPal (no `assets/cardiopal/` directory at all, unlike BETTR/FrankenTeen) — only the existing Figma prototype embed. Designed the whole page around that constraint rather than fabricating screens: the Figma embed is promoted to the page's primary visual introduction, and evidence elsewhere is typography-led (per the brief's explicit allowance), not simulated screenshots.
- **Opening spread merged with the artifact** (BETTR's pattern, not copied verbatim): text col 1–5 (eyebrow, title, thesis, meta grid, ownership) beside the Figma prototype col 5–13 in one `.cols[data-layout="asymmetric"]` composition, replacing the old separate stacked hero + artifact sections. Title now uses the shared `--ed-fs-title` ramp (same 100–168px clamp verified on BETTR) instead of the old `clamp(2.8rem,7.4vw,7rem)` default — the single biggest fix for the "typography feels too small" complaint.
- **New section 02, "What CardioPal does":** a typography-led feature chapter (lede + a term/description row list inside `.proj-feature-surface`, subtly tinted via `color-mix(cardiopal-accent 10%, ink 90%)` — restrained, not BETTR's dramatic oxblood, per the direction doc's "calmer, clinical-adjacent" accent brief). Five features — recording & review, trends, caregiver sharing & reports, recommended actions, offline access — all grounded in content already on the page (the usability-testing task list already named caregiver/report/recommended-actions/auto-sharing; trends was already named in the reflection section) plus two facts supplied directly in this session's brief (offline access, arrhythmia-adjacent recommended actions) that aren't independently visible elsewhere in the repo. The AI/health-sensitive line is deliberately hedged: "a prompt to check with a clinician — never a diagnosis, and not medically validated functionality."
- **Usability testing promoted to its own strongest evidence chapter** (section 03, previously merged with a different section number): added an explicit lede naming the two participants before the method paragraph, and a closing "What this doesn't tell us" note (reusing the shared `.proj-annotation-label`/`.proj-annotation` components from BETTR) stating plainly that two remote sessions is exploratory, not statistically significant — directly answers the brief's "do not show 71% as a triumphant success metric without context." Vitals grid / task list / quote grid kept exactly as before inside `.proj-paper-panel`, just rescaled (vitals numeral, task rows, quote cards all bumped one step in the page's own inline `<style>` block, which stays page-local per the CSS file's existing convention for bespoke one-off widgets).
- **Section 04, "What changed because of it":** the four structural decisions (onboarding, navigation, modals, consistency) that were previously one dense paragraph are now reused as term/description rows via the same `.feature-list`/`.feature-row` component from section 02 — no new CSS needed, and it turns a paragraph a recruiter would skim into a scannable list without changing a single claim.
- Section 05 ("What I'd still improve") kept verbatim — already a strong, honest reflection.
- Added `.project-cardiopal`-scoped CSS mirroring the `.project-bettr` block's structure exactly (type-scale hookup to the shared `--ed-fs-*` tokens, section rhythm via `--space-major/internal/evidence`, a mobile-safety `@media (max-width:1023px)` block) so CardioPal reaches the same typographic scale as BETTR without duplicating any shared token or component.
- Added `static-preview-cardiopal-editorial` (port 4198) to `.claude/launch.json`.

**Decisions:**
- No fabricated screenshots, phone mockups, or reconstructed UI diagrams anywhere — the Figma embed (which renders live, actual screen thumbnails) is the only interface evidence, presented at large scale as the opening spread's co-lead element instead of being minimised. This follows the brief's asset-limitations section directly.
- "Offline access" and the arrhythmia-adjacent phrasing in "Recommended actions" are included because the task brief supplied them as first-person facts about the project (not present verbatim elsewhere in the repo, unlike the other three features which are independently derivable from the existing task-list/reflection text) — worded with explicit clinical hedging per the brief's own instruction to use careful AI/health language.
- Reused `.feature-list`/`.feature-row` for both section 02 and section 04 rather than introducing a second near-identical list component — one component, two uses, less CSS.
- Kept the vitals/task/quote widget CSS page-local (not moved into `css/portfolio.css`) since nothing else on the site reuses it, matching the stylesheet's own stated convention that "bespoke one-off widgets stay inline per page."

**Verified:**
- Fresh server on port 4198 (`static-preview-cardiopal-editorial`), `http://localhost:4198/projects/cardiopal.html`.
- Live-page DOM measurement: title/artifact-frame bounding boxes confirmed no overlap (title right edge 471px, artifact left edge 505.6px at 1440px). No horizontal overflow (`scrollWidth === clientWidth`) at 768 / 1440 / 1920px. Console clean at all three.
- Figma embed loads live (actual prototype screen thumbnails visible in the Browser pane, not a broken/blank frame) at both 1440 and 1920; "Open full prototype ↗" link present and correctly targets the unchanged existing Figma URL; ordinary cursor confirmed (the iframe has no `data-cursor-bridge` attribute, so it uses the site's existing generic suspend/resume-on-iframe-hover behaviour, not BETTR's same-origin bridge — no freeze risk).
- Screenshots reviewed section-by-section at 1440×900: opening spread, section 01 (context), section 02 (feature chapter, including the tinted `.proj-feature-surface` background), section 03 (usability testing exhibit + limitation note), section 04 (what-changed list), section 05 (reflection) and the footer nav — composition, spacing and hierarchy read as intentional and match the BETTR benchmark's scale.
- 768×1024 checked: hero stacks text-first then the Figma embed below, fully readable, no overflow — confirms the shared `.cols` stacking fallback (already used by BETTR) needed no CardioPal-specific mobile CSS beyond the type-scale safety block.
- Homepage and BETTR re-loaded after the CSS change: both console-clean, BETTR's opening spread, red accent and live-build embed visually unchanged — confirms the new `.project-cardiopal`-scoped rules don't leak.
- `feature-list`/`feature-row`/`feature-name`/`feature-desc` class names confirmed unique to `projects/cardiopal.html` and `css/portfolio.css` (grepped across all `.html` files) — no collision with any other page's markup.

**Open:**
- **Not committed — awaiting Bharat's visual approval**, per this session's explicit instruction.
- All prior open items carried forward unchanged (Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; FrankenTeen hero re-capture blocker; touch-device verification; Hero G homepage integration awaiting its own separate approval).
- CardioPal's own asset gap (no interface screenshots) is now a known, accepted constraint of this page rather than an open blocker — the page was deliberately designed to work without them, per this session's brief, rather than treated as unfinished pending future screenshots.

**Commit:** pending visual approval

### 2026-07-17 — Hero G integrated into the public homepage

**Stage:** Homepage
**Scope:** `index.html` (hero markup replaced, font import extended to the italic Fraunces axis), `css/portfolio.css` (old Concept A hero CSS removed, Hero G component CSS added), `js/portfolio.js` (loader simplified, kinetic-field engine merged in as a guarded module), `.claude/launch.json` (new `static-preview-hero-integration`, port 4196), this log. No project page, the approved BETTR case study, `assets/bettr-live/**`, the isolated `v2-preview/hero-g-kinetic-thesis/` prototype, or any project content/links touched.
**Did:**
- Replaced the retired Concept A image hero in `index.html` with the approved Hero G markup verbatim (four bands + duplicate ember field, the "Bharat Vyas" ink-knockout anchor at ~38% horizontal centre, the bottom-right metadata knockout, the fixed rectangular lens) — same structure as `v2-preview/hero-g-kinetic-thesis/index.html`, integrated directly beneath the site's existing persistent nav frame and directly above the real `intro`/`#work` sections (all six project entries and links untouched). Extended the homepage's Google Fonts import to the Fraunces italic axis (`ital,opsz,wght`) the kinetic field's band 2 and the anchor statement rely on.
- **Persistent nav now overlays the hero on the homepage only** (`.site-frame.on-hero`, `position:absolute` ≥1024px, back to normal flow below it) instead of consuming flow height above it — necessary because the field's band sizes are authored in `vh` units (viewport-relative, not container-relative); a flow-height-reduced hero would have clipped the bottom band against `.field`'s `overflow:hidden`. This is the one structural difference from the isolated prototype (which had no real nav to reconcile with); the kinetic field itself renders at the exact full-viewport proportions it was QA'd against. Scoped via a class, not a change to the shared `.site-frame` rule, so project pages are unaffected.
- Removed the old Concept A hero's now-dead CSS (`.hero-text`, `.hero-statement`, `.hero-image`, `.hero-frame`, `.hero-meta-row`, `.hero-degree`, the `hs-rise`/`r1`–`r4` entrance keyframes) and added Hero G's component CSS reusing the site's existing tokens (`--ink`/`--paper`/`--ember*`/`--font-*`/`--page-margin`) rather than redeclaring them. `.hero-cta` is now defined once, in the hero block, since nothing else on the homepage used it after the old hero's removal. The prototype's full-viewport `.grain` overlay was scoped to `.hero` only (`position:absolute` inside the hero, not `position:fixed` site-wide) — grain wasn't on the locked-elements list, and confining it avoids an untested texture change across the rest of the homepage.
- Merged Hero G's second inline `<script>` (band-2 alignment + the pointer/lens/scroll rAF engine) into `js/portfolio.js` as a guarded nested module (`if (!document.querySelector(".hero")) return;`), since that file is shared by every page including the three that don't carry hero markup. Removed Hero G's own separate loader/`pending`/`ready` gating entirely — the homepage's existing early inline script and `js/portfolio.js` loader already do the identical job (same `pending`/`ready`/`can-animate` contract Hero G's CSS expects), so there is exactly one loader implementation, one `sessionStorage` flag (`hs-loader-seen`), and one `pending`→`ready` handoff site-wide. Simplified the loader's readiness check from `Promise.all([fontsReady(), decodeHeroImage()])` to `fontsReady()` alone, since the hero no longer has an image to decode. Ported Hero G's hidden-tab fail-safe (`setTimeout(finish, MAX_MS + 250)`, with a `finished` guard so it can't double-fire against the rAF-driven `tick()`) into the shared loader, since it's now gating the primary homepage hero rather than an isolated prototype.
- **Cursor reconciliation:** the hero's own inspection lens and the site-wide contextual cursor dot (`js/portfolio.js`'s `createCursor`) are two different pointer systems that must never render at once. Rather than adding a separate `mouseenter`/`mouseleave` pair on `.hero` (which can't see scroll position and would have desynced from the lens's own visibility logic), the merged engine reuses the exact `lensInHero` check its `heroFrame()` tick already computes each frame (pointer above the hero's live bottom edge) and toggles the shared `dot`'s `.embed-hidden` class from there — the same class/mechanism already used to suspend the dot over iframes/video. Also cleared on `onHeroPointerLeave` and inside `syncLens()`'s not-allowed branch, so the dot can never get stuck hidden. No new resize/scroll/pointer listeners were added beyond what Hero G's own engine already required (`alignBand2`'s resize listener runs unconditionally for layout; the engine's own resize/scroll/mousemove listeners are added once, only after the entrance settles and only when motion is allowed).
- Added `static-preview-hero-integration` (port 4196) to `.claude/launch.json` for this session's QA.

**Decisions:**
- Overlay the persistent nav on the hero (homepage-scoped) rather than shrinking the hero's flow height or rescaling the field's `vh`-based type — preserves the locked band overshoot/proportions exactly as approved instead of risking clipped or re-tuned type during integration.
- Keep the prototype's own tested <1024px fallback composition materially as-is (band sizes, centred anchor, inline statement) per the task's "do not redesign mobile" scope; the only mobile-breakpoint addition is returning the persistent nav to normal flow, since the isolated prototype never had a real multi-link nav to reconcile with.
- Scope `.grain` to the hero rather than porting it site-wide as `position:fixed` — not on the locked-elements list, and confining it is a smaller, easily-reversible footprint than an untested whole-page texture change.
- Drop Hero G's own `decodeHeroImage`-equivalent readiness dependency; the shared loader only needs `fontsReady()` now that the hero is image-free.

**Verified:**
- Fresh server on port 4196 (`static-preview-hero-integration`), `http://localhost:4196/index.html`.
- Live-page DOM inspection (Browser pane, motion enabled): hero renders with correct band geometry (`.b1` 153px font-size, full-width band spanning off both edges, zero unexpected transform at rest), anchor and metadata present with correct text, `html` classlist reaches `can-animate has-custom-cursor ready cursor-ready` after the loader exits, loader overlay removed from the DOM post-exit. First-visit loader captured mid-count ("26") confirming the shared loader now gates the kinetic hero.
- Lens/cursor reconciliation verified live: hovering band 1 sets `lens-on`/`lens-live` true, `#lens-label` reads `"SYSTEM"` (matches the band's `data-label`), `.field-x` becomes visible (ember reveal active), and the site-wide `.cursor-dot` simultaneously gains `embed-hidden` — confirming the two pointer systems never render at once. Scrolled to the `#work` section (`scrollY: 2000`) and re-checked: `.cursor-dot` no longer hidden, lens no longer live — the dot resumes tracking normally over Selected Work, matching pre-integration behaviour outside the hero.
- No console errors; no horizontal overflow (`scrollWidth === clientWidth`) at 1440; all `css/portfolio.css`, `js/portfolio.js`, the grain data-URI, and every homepage image/asset requested resolved 200; all six `.project-row` hrefs confirmed present and correct (bettr, cardiopal, frankenteen, echoes, smartphone-mold, playing-freedom).
- Headless-Chrome captures (`--force-prefers-reduced-motion`, deterministic final-state renders) at 1440×900, 1920×1080, 3440×1440 compared directly against matching captures of the untouched `v2-preview/hero-g-kinetic-thesis/` prototype at the same three widths: band geometry, letter-spacing, knockout position, and the ultra-wide tier's extra tracking are visually identical between public and prototype at every width checked; the only difference is the now-overlaid persistent nav bar, which the isolated prototype never had. 768×1024 checked for graceful mobile readability: nav in normal flow and legible, bands scaled down and still overshooting, statement wraps as inline prose, metadata bottom-left — no lens/pointer systems active (gated below 1024px as designed).
- Motion-timed (non-reduced-motion) headless captures were unreliable for the entrance animation specifically (`--virtual-time-budget` races the CSS clip-path keyframes, producing a false-blank frame) — this is a known headless-tooling artifact, not a page defect; the entrance was instead confirmed via the Browser pane's live DOM/computed-style inspection above and the reduced-motion captures (which render the identical final composition with no animation to race).
- Remaining required breakpoints (1280×800, 1600×1000, 2560×1080, 2560×1440) captured and reviewed: band overshoot, knockout legibility and the ultra-wide tracking step all hold consistently across the full matrix; no overflow at any size.
- **No-JS fallback:** raw HTML source confirmed `<html lang="en">` carries zero classes — `pending`/`ready`/`can-animate`/`lens-on` are added only by the early inline script and `js/portfolio.js`, so without JS none of the clip-path entrance, lens, or ember-reveal CSS ever activates and the loader (a `document.createElement` overlay) never exists; the static base composition (all four bands, the anchor, and a real `<a href="#work">` CTA) is real markup, not JS-injected, so it renders immediately. (A `--disable-javascript` headless capture attempted to verify this directly but returned a loader-bearing frame — a known Chromium headless-flag quirk where `--disable-javascript` doesn't reliably suppress inline `<script>` execution in `--headless=new`, not a page defect; source inspection is the reliable check here.)
- **Keyboard navigation:** Tab order confirmed skip-link → nav (Work/Practice/About/Contact) → hero `Selected work →`, all real anchors, no custom tabindex/ARIA widget; focused CTA carries a visible `1.6px` solid `ember-bright` (`rgb(211,92,52)`) outline via the shared `:focus-visible` rule.
- **Repeat-visit loader skip:** after a first visit completes (`sessionStorage` flag `hs-loader-seen` set to `"1"`), a fresh navigation shows `ready` applied and no `#hs-loader` node immediately on load — loader correctly skipped.
- Final console-error check on the live tab: none.

**Open:**
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; FrankenTeen hero re-capture blocker; touch-device verification).
- **Not yet committed — awaiting visual approval**, per the integration brief's explicit "do not commit until the public implementation visually matches the prototype" instruction.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; FrankenTeen hero re-capture blocker; touch-device verification).

**Commit:** pending visual approval

### 2026-07-17 — Hero G "Kinetic Thesis Field" approved as the homepage hero direction

**Stage:** Other (decision record — no code change in this entry)
**Scope:** documentation only — `CLAUDE.md`, `docs/PORTFOLIO_DIRECTION_V2.md` §11, this log. `v2-preview/hero-g-kinetic-thesis/index.html` unchanged from the prior polish pass; public `index.html`, `css/portfolio.css`, `js/portfolio.js` untouched (verified via `git diff --name-only`, which reported only `.claude/launch.json` and this log as modified tracked files — the hero-g prototype is untracked/new, and root `index.html` shows zero diff against HEAD).
**Decision:**
- **Hero G is the approved homepage hero direction.** Both its overall direction (approved earlier) and its interaction system (approved after the polish pass) are now confirmed.
- **Heroes A, D and E remain retired prototype history** — not a foundation to build on; their commits stand as prototype evidence only.
- The hero is image-free and typography-led; the warm-black/paper-white/ember system carries forward unchanged.
- **Locked, materially unchanged going forward:** the four kinetic thesis bands, the asymmetric "Bharat Vyas" knockout (~38% horizontal centre — intentional, approved explicitly, must not be automatically recentred), the rectangular inspection lens with its clipped-ember text reveal, the SYSTEM/PLAY/RESEARCH/BEHAVIOUR contextual labels, the first-visit 0–100 loader, the masked-track entrance, and the natural-scroll handoff.
- 21st.dev informed masking and pointer-follow mechanics only; no component was copied or installed; no React/Tailwind dependency entered the production portfolio.
- **No public homepage integration has happened yet.**
- Future work may tune implementation details during integration (compatibility, accessibility, performance) only when needed, without materially changing the approved composition.

**Verified:** `git diff --name-only` → `.claude/launch.json`, `docs/PORTFOLIO_PRODUCTION_LOG.md` (this file, prior entries); `git status --porcelain -- index.html` and `git diff HEAD --stat -- index.html` both empty — public root `index.html` confirmed untouched.
**Open:** integration pass (building the approved composition into the public homepage) is separate future work, not started.
**Commit:** "Approve Hero G kinetic thesis direction"

### 2026-07-17 — Hero G polish pass (approved direction, pre-integration refinements)

**Stage:** Other (isolated `/v2-preview/` polish on the visually approved Hero G; all locked elements — bands, pointer field, lens, ember clip, labels, loader, entrance, handoff, palette, knockout, image-free rule — materially unchanged)
**Scope:** `v2-preview/hero-g-kinetic-thesis/index.html` only. Loader, scroll timing and inspection behaviour untouched (no regression found).
**Did:**
1. **"PLAYABLE WORLDS" readability.** Geometric constraint made explicit first: at the locked band scale, the phrase plus mandatory edge-overshoot is wider than any viewport, so full visibility of both words is impossible with a central knockout — the fix authors *where* the overlap lands. The knockout is now vh-sized like the bands (name `10.5vh`, statement `2.35vh`, paddings in vh) so knockout-to-band proportion is aspect-stable, its base offset moved to `-63%`, and a new `alignBand2()` derives band 2's offset each layout so the PLAYABLE|WORLDS word gap straddles the knockout — "PLAY" reads clean on the left, "WORLDS" emerges complete on the right (word-nick measured 0px at all seven QA sizes). Edge-overshoot always outranks alignment; residual shortfall nudges the knockout left via `--anchor-shift` (≤8vw). Runs under reduced motion too (static layout, not motion); no-JS keeps a CSS approximation (`margin-left: -4.5vh`).
2. **Ultra-wide tier.** New `@media (min-aspect-ratio: 22/10)`: vertical space is exhausted at 21:9, so extra width comes from authored letter-spacing (0.13–0.14em — the field stretches with the screen) plus a modest final vh step, not a global type increase. Verified at 2560×1080 and 3440×1440: all bands overshoot both edges, ~70% type coverage holds, knockout not stranded, metadata edge-pinned.
3. **Travel-proof overshoot.** All band offsets/tracking retuned (b1 `-8vh`/0.04em, b3 `-7vh`/0.05em, b4 `-13vh`, b2 0.045em) and amplitudes trimmed (band 2 ×0.5, band 3 ×0.75) so every band still overshoots both edges **at maximum pointer displacement** — previously a transient 5–15px edge sliver was possible at 1280–1440. Verified with travel-aware measurement at all seven sizes; zero horizontal overflow everywhere.
4. **Knockout compositing spot-check (GPU path).** Captured rest / pointer-displaced / lens-behind-knockout / scroll-displaced states without `--disable-gpu` and pixel-sampled the knockout: exactly `#0D0C0B` in all four states, identical to the background reference — no red/grey tint. The earlier tint was the removed blend-mode + software-raster combination; the cause-level fixes (plain alpha grain, idle style-clearing) hold on the real compositing path.

**Verified:** rest captures at 1440×900 / 1920×1080 / 2560×1080 / 3440×1440; lens over each band at 1440 (ember solidify + contextual label confirmed; bands 3–4 QA pointers clipped leading whitespace but their solidify was separately proven); reduced-motion static composition identical to rest including alignment; runtime error trap empty in motion and reduced-motion states; links/native cursor behaviour unchanged.
**Open:**
- **Awaiting final visual approval — not integrated, not committed.**
- At 1280–1600 the left fragment reads "PLA(Y)" (full "PLAY" from 1920 up) — the geometric ceiling with the knockout width floor; revisit only if it bothers review.
- All prior open items carried forward.

**Commit:** pending final approval

### 2026-07-16 — Hero G "Kinetic Thesis Field" prototype built

**Stage:** Other (isolated `/v2-preview/` prototyping, per the D/E rejection entry below)
**Scope:** new `v2-preview/hero-g-kinetic-thesis/index.html` (fully self-contained — inline CSS/JS, no dependency on `css/portfolio.css` or `js/portfolio.js`), `.claude/launch.json` (new `static-preview-hero-g`, port 4194). No public page, `css/portfolio.css`, `js/portfolio.js`, `assets/bettr-live/**`, or the D/E prototype files touched.
**Did:**
- Built the single focused image-free hero direction named in the rejection entry: a full-viewport kinetic typographic field. Four oversized uppercase Fraunces bands (INTERACTIVE SYSTEMS · PLAYABLE WORLDS · RESEARCH-LED EXPERIENCES · BUILT AROUND HUMAN BEHAVIOUR) each overshoot both viewport edges (verified numerically at all five QA widths), each sized from its own character count via `min(vw, vh)` with a `(min-aspect-ratio: 185/100)` tier for 16:9-and-wider screens. Deliberate variation without chaos: bands 1/3 solid paper (weights 560/340), bands 2/4 stroke-outline (band 2 italic, band 4 muted) — outline treatment doubles as the lens's "solidify" payload.
- "Bharat Vyas" + the unbroken two-clause positioning statement + "Selected work →" sit centre-offset on an ink knockout straddling bands 2–3 (explicitly not lower-left); degree metadata bottom-right on its own knockout. `sr-only` copy carries the four practice areas for AT since the fields are `aria-hidden`.
- Pointer field: one rAF lerp engine (sleeps when settled — no perpetual loop) drives per-band counter-displacement (alternating directions, amplitudes ×[1, 0.62, 0.9, 1.14] on a 30–70px viewport-scaled base), a small opposite drift on the anchor, and eases back on pointer leave.
- Cursor inspection window (the signature): a rectangular lens (~72–110px wide, 1px ember border) follows the pointer with slower easing; a duplicated ember field layer is clipped to the lens rect via `clip-path: inset()`, so text inside the rectangle reads solid ember-bright (outlines solidify) with a compact mono label (SYSTEM / PLAY / RESEARCH / BEHAVIOUR) from the active band. Gated to fine pointer + ≥1024px + no reduced motion; hidden below the hero; native cursor visible until the lens is live; links keep labels/pointer.
- Entrance: the locked 0–100 loader (prototype-scoped key `hs-loader-seen-hero-g`, `?nointro=1` review bypass, plus a `MAX_MS` `setTimeout` fail-safe so hidden-tab rAF throttling can never strand it), then alternating horizontal clip-wipe reveals per band (~730ms), anchor rise at 420ms, metadata at 560ms — ~850ms total, no per-letter animation.
- Scroll handoff: natural scrolling only — bands separate toward opposite edges at rates ×[-0.16, +0.12, -0.08, +0.14]·vw over ~0.9 viewport of scroll, statement resolves out first, "Selected work →" fades last as the bridge into the work stub.
- 21st.dev mechanics adapted, never copied (documented in the file header): Masked Slide Reveal → horizontal clip-wipes; Cursor Follow → lerp easing; SVG Mask Effect → rectangular clipped ember text layer (not a torch, not an image); Animated Number → validation that the plain loader count stays as-is.
- **Bugs caught and fixed during QA:** (1) the ember duplicate field initially rendered unclipped on load — every band solid ember — because its visibility wasn't tied to the lens's live state; (2) the grain overlay's `mix-blend-mode: overlay` tinted transform-promoted knockout backgrounds a visibly lighter box — replaced with plain alpha compositing, and the engine now clears inline transforms at rest so the knockout is never layer-promoted while idle; (3) band 3's authored 0.92 opacity was being overwritten by the engine; (4) bands 1–2 fell short of the right edge at 16:9 (fixed by the aspect-ratio tier); (5) hidden-tab loader stall (fail-safe above).

**Decisions:**
- The lens reveals the same words in ember (recolour + solidify + classification label), not an alternate phrase — the brief allowed either, and the word-swap variant was already tainted by Concept E's rejection.
- Pointer displacement and the lens share one gate (fine pointer + ≥1024px + motion allowed); the scroll handoff runs wherever motion is allowed, since scrolling is input-agnostic.

**Verified:**
- Fresh server on port 4194 (`static-preview-hero-g`), `http://localhost:4194/v2-preview/hero-g-kinetic-thesis/index.html`.
- Headless-Chrome captures inspected at 1280×800, 1440×900, 1600×1000, 1920×1080, 2560×1440 — motion state (`?nointro=1`, virtual-time) and forced reduced-motion both: field fills the viewport at every size, no accidental voids, name immediately legible.
- Band geometry measured via a scratchpad QA copy (`--dump-dom`, captured through Git Bash — PowerShell 5.1 returned empty stdout for it): every band overshoots both edges at all five widths; horizontal overflow 0 everywhere.
- Lens verified visually via synthetic `mousemove` in headless: ember reveal inside the rectangle over solid (band 1 "A" + SYSTEM label) and outline (band 4, solidified ember) bands.
- Scroll handoff verified numerically in the Browser pane: at 45% scroll, band transforms -56/+42/-28/+49px with fading opacity, statement at 0.5, CTA still 1.0; back at rest all inline styles clear (knockout un-promoted). Document scrolling never intercepted.
- Loader: first visit runs 0–100 and exits (flag set, overlay removed) even in a hidden tab; repeat visit skips. Reduced-motion captures show the complete static composition, no loader. Script-stripped copy (no-JS) renders the full hero immediately.
- Console clean; skip-link focusable ("Skip to Selected work").
- Not verified: real-display (non-headless) check of the knockout shade during pointer interaction, and mobile/touch on a real device — both carried below.

**Open:**
- **Awaiting visual approval — not integrated, not committed.** No public page change authorised.
- Ultra-wide (~21:9) viewports would need one more aspect-ratio tier before any integration; outside this sprint's QA matrix.
- Spot-check the anchor knockout on a real GPU display during pointer movement (headless software rasteriser showed a faint tint on promoted layers at one size; likely tooling-only).
- All prior open items carried forward unchanged.

**Commit:** pending visual approval

### 2026-07-16 — Hero prototypes D and E rejected; next direction named "Hero G — Kinetic Thesis Field"

**Stage:** Foundation
**Scope:** docs only (`CLAUDE.md`, `PORTFOLIO_DIRECTION_V2.md`, this log). No public page touched. `v2-preview/hero-d-field-notes/` and `v2-preview/hero-e-instrument-panel/` are untouched — left in place as historical prototype evidence, not modified or deleted.
**Did:**
- Recorded the visual rejection of both hero prototypes built in the previous session (Concept D "Field Notes" and Concept E "Instrument Panel"). Reason: both retained the earlier hero's small, lower-left editorial composition rather than rethinking it for the image-free brief; both left most of the viewport unused; both treated interaction as a minor text-level gimmick (Concept D's line-cascade, Concept E's cursor-torch phrase reveal) rather than delivering a strong kinetic typographic hero.
- Marked both concepts as rejected-not-to-be-refined in `PORTFOLIO_DIRECTION_V2.md` §11 (new subsection, "Hero direction — prototypes D/E rejected, 2026-07-16") and in `CLAUDE.md`'s architecture decisions, both superseding the prior D/E approval in place (struck through, not deleted) per the doc's existing convention for recording reversed decisions.
- Named the next prototyping direction: **"Hero G — Kinetic Thesis Field"** — one focused direction (not another pair of alternatives), required to use the full viewport and to make interaction/motion the hero's primary structural idea rather than a minor accent layered on a quiet composition.
- Confirmed the commits for Concept D and Concept E (`Prototype image-free homepage hero directions`) remain in git history unaltered, as prototype evidence only — not reverted, not treated as a base to iterate from.

**Decisions:**
- Concept D and Concept E are closed as a direction; no further refinement session should start from either file.
- Hero G is scoped as a single prototype, not a pair — the D/E side-by-side comparison approach didn't surface a viable direction, so the next pass concentrates effort on one stronger attempt instead of splitting it again.
- No public homepage change is authorised yet; `index.html`, `css/portfolio.css`, `js/portfolio.js` remain untouched, still on the Concept A hero.

**Verified:**
- N/A — documentation only, no runtime surface to check. Confirmed no HTML/CSS/JS file was touched (`git status` shows only `CLAUDE.md`, `PORTFOLIO_DIRECTION_V2.md`, and this log modified).

**Open:**
- Build "Hero G — Kinetic Thesis Field" as an isolated prototype under `/v2-preview/`.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; FrankenTeen hero re-capture blocker; touch-device verification).

**Commit:** `Reject initial image-free hero prototypes` (hash below)

### 2026-07-16 — Hero prototypes built: Concept D "Field Notes" and Concept E "Instrument Panel"

**Stage:** Other (isolated `/v2-preview/` prototyping, per the 2026-07-16 hero-direction reopening above)
**Scope:** new `v2-preview/hero-d-field-notes/index.html`, new `v2-preview/hero-e-instrument-panel/index.html` (both fully self-contained — inline CSS/JS, no dependency on `css/portfolio.css` or `js/portfolio.js`), `.claude/launch.json` (new `static-preview-hero-de`, port 4192). No public page, `css/portfolio.css`, `js/portfolio.js`, `assets/bettr-live/**`, or the approved BETTR case study touched.
**Did:**
- **Concept D, "Field Notes":** single-column, image-free cover. The positioning statement's three lines cascade in a diagonal "staircase" (each line offset further right and down than the last) rather than a centred title/subtitle block, so the composition reads as marginalia in a field notebook rather than a landing-page hero. Edge-pinned mono metadata frame at the top (name/portfolio left, location/year right) carried over from the locked spec's chrome. CTA and degree metadata are edge-pinned at the bottom. A static, motionless SVG `feTurbulence` grain sits behind the whole `ink` field (zero asset weight, zero motion). Entrance is a masked line-reveal (mechanic #1 from `docs/HERO_21ST_RESEARCH.md`): name, then the three statement lines in a fast internal cascade, then metadata, then CTA — four macro beats totalling ~720ms, under the ~900ms budget the brief set for this concept. On scroll, the staircase continues its own diagonal drift and fades (capped to ~0.85 viewport height, `transform`/`opacity` only, ordinary scrolling never intercepted) rather than a plain cross-fade, handing off into a comparison work-stub section.
- **Concept E, "Instrument Panel":** same single-column stack, left-aligned (no staircase — this concept spends its interaction budget elsewhere). Three phrases in the statement ("interactive systems," "playable worlds," "research-led experiences") each carry a hidden ember-toned alternate reading ("systems that respond," "worlds learned through action," "questions made experience"), stacked exactly on top of the visible phrase via a CSS grid (`grid-area: 1/1`), so revealing the alternate never reflows the sentence regardless of the two phrases' different lengths. A soft cursor-as-torch (JS distance check against each phrase's bounding rect, ~90px radius, one phrase lit at a time) crossfades the nearest phrase from its visible reading to its hidden one as the pointer passes near it — a small, honest echo of BETTR's own thesis (an interface that reveals something about the person using it as they interact with it), applied to the hero's own text instead of borrowing BETTR's literal visual identity. Gated on `(hover:hover) and (pointer:fine)`, disabled under reduced motion, and only activates once the entrance has finished (~900ms) so the reveal never competes with the arrival. Scroll-linked handoff subtly separates the base/alternate phrase layers by a few px as the reader scrolls toward the work stub, capped the same way as Concept D.
- **Shared loader:** both prototypes carry the exact locked 0–100 loader (`docs/PORTFOLIO_DIRECTION_V2.md` §11) — first-visit only via a prototype-scoped `sessionStorage` flag (`hs-loader-seen-hero-d` / `-hero-e`, distinct per concept and from the production homepage's own flag, so visiting one page never silently skips another's loader), 0.8–1.4s clamped to real font readiness, absent entirely under `prefers-reduced-motion`, zero DOM footprint with JS disabled. Visually identical between the two files (same markup/CSS, only the loader-name label differs — "Concept D" / "Concept E" — so a reviewer can tell which prototype is loading without it biasing the comparison).
- **Reduced motion:** both concepts render the complete static composition immediately, no stagger, no slide. Concept E's specific fallback: since the pointer-torch never runs, the three hidden readings surface instead as a small static mono annotation list beneath the statement (`interactive systems — systems that respond`, etc.) — one complete, nothing-to-discover composition, per the brief's explicit "small visible annotations" option. This same fallback also covers coarse-pointer devices generally (not just forced reduced motion), since the torch is unusable there either.
- **Bug caught and fixed this session:** the first reduced-motion pass on Concept E rendered illegibly — the per-phrase fallback tried to break `.phrase-alt` out of the grid stack into an inline-block sub-line directly under each phrase, and the resulting mixed inline/block flow scrambled the sentence (words floating out of order, a stray comma orphaned on its own line). Caught via a `--force-prefers-reduced-motion` headless screenshot at 1440×900 before this entry was written. Fixed by decoupling the fallback entirely: `.phrase-alt` is simply `display:none` when the torch is unavailable, and the three alternate readings move to one separate static list below the statement instead of trying to interleave per-phrase. Re-verified clean at 1280/1440/2560px.
- Added `static-preview-hero-de` (port 4192) to `.claude/launch.json`.

**Decisions:**
- Concept D's per-line statement cascade (3 sub-beats within the "statement" step) is treated as one macro entrance element per the direction doc §11 budget ("≤4 staggered elements"), not three — the per-line cascade is Concept D's own explicitly-briefed defining feature (`docs/HERO_21ST_RESEARCH.md`'s Concept D writeup), so it's read as internal editorial rhythm within a single beat rather than a violation of the top-level cap. Concept E does not take this liberty — its statement reveals as one plain masked block, per its own brief ("no entrance choreography beyond the name/statement/metadata/CTA stagger already specified").
- Loader `sessionStorage` keys are prototype-scoped (not reusing the production `hs-loader-seen` key) so the three loader instances (homepage, Concept D, Concept E) never cross-skip each other during side-by-side review.
- The "Selected work" route on both prototypes leads to an in-page comparison stub (`#work`, three real project names, explicitly labelled "not final content") rather than linking out to the real homepage — this keeps the scroll-linked hero→work handoff (the thing actually being evaluated) testable in isolation on each prototype.
- Concept D's third statement line ("research-led experiences.") carries an italic `ember-bright` accent as the cascade's resolving beat — a deliberate placement choice for this prototype (the production hero instead accents "interactive systems"), permitted under §3 since it's large display type, not body-size text on paper.

**Verified:**
- Fresh server on port 4192 (`static-preview-hero-de`), both prototypes loaded at `http://localhost:4192/v2-preview/hero-{d-field-notes,e-instrument-panel}/index.html`.
- No horizontal overflow (`scrollWidth === clientWidth`) confirmed by DOM measurement at 768 / 1280 / 1440 / 1920px on both pages (Browser-pane renderer was paused this session — screenshots timed out, rAF never fired — so visual QA moved to headless Chrome per the known workaround; DOM measurement and console checks stayed in the Browser pane, which kept working).
- Headless Chrome (`--force-prefers-reduced-motion`, stable one-shot captures) reviewed at all five required widths (1280×800, 1440×900, 1600×1000, 1920×1080, 2560×1440) for both concepts: no overflow, no illegible overlap, staircase (D) and stacked (E) compositions both read clearly and stay within the desktop-first design at every size, generous negative space at 2560 reads as intentional asymmetry rather than a broken layout.
- Concept D's staircase collapses to left-aligned (`margin-left: 0` on all three lines) below 1024px, confirmed via computed style at 768px.
- Concept E's torch-reveal mechanism verified two ways: (1) the CSS selector (`html.torch-on .phrase.is-lit .phrase-base/-alt`) confirmed matching via `Element.matches()` in-page; (2) a throwaway debug harness (scratchpad only, not part of either deliverable) forced `.is-lit` on one phrase and was screenshotted via headless Chrome in real (non-reduced) motion — confirmed the alternate reading ("worlds learned through action") renders in place of the base phrase in ember-bright italic with no reflow of the surrounding sentence.
- Concept E's `hero-foot` (CTA + degree metadata) confirmed on-screen at both 1280×800 and 1440×900 with `torch-on` active and the pointer hint line visible (`getBoundingClientRect().bottom` well inside `window.innerHeight` at both sizes) — a debug-harness screenshot briefly suggested the CTA might clip at 1440×900, traced to a one-shot headless capture racing the loader's exit transition on that specific throwaway file, not a real layout defect; live DOM measurement on the actual prototype file confirmed no clipping.
- Both loaders confirmed skipping correctly on repeat visit (`sessionStorage` flag set → `ready`/`cursor-ready` applied immediately, no `#hs-loader` node) and confirmed present on first visit (flag cleared → `pending` + loader markup inserted).
- Console clean (no errors) on both pages after a fresh load.
- Keyboard: all interactive elements on both pages are real `<a href>` elements (skip-link, hero CTA, three work-stub rows) — no custom `tabindex`/ARIA-widget pattern that could break native tab order; visible `ember-bright` focus outline confirmed via the shared `:focus-visible` rule.
- `Selected work` reachable on both prototypes via `#work` to the in-page comparison stub.

**Open:**
- No winner chosen — both concepts remain isolated under `/v2-preview/` for side-by-side review, per the brief.
- Touch-device verification of Concept E's coarse-pointer fallback (static annotation list) — carried forward, same open item as the production cursor's touch-device verification.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; FrankenTeen hero re-capture blocker — unrelated to this image-free hero work, since neither prototype uses any project imagery).

**Commit:** `Prototype image-free homepage hero directions` (hash below)

### 2026-07-16 — Hero direction reopened: Concept A retired, image-free direction approved

**Stage:** Foundation
**Scope:** docs only (`CLAUDE.md`, `PORTFOLIO_DIRECTION_V2.md`, this log). No public page, `/v2-preview/`, or `assets/bettr-live/**` touched — the two new hero prototypes referenced below are not yet built.
**Did:**
- Retired the FrankenTeen-image Concept A hero (locked 2026-07-14, integrated into the public homepage 2026-07-14) as the locked foundation. It is superseded, not deleted — the full original "Final hero specification" is preserved, clearly marked superseded, in `PORTFOLIO_DIRECTION_V2.md` §11 for historical reference.
- Recorded the new hero direction in `PORTFOLIO_DIRECTION_V2.md` §11 ("Hero direction — reopened 2026-07-16"): the hero must be image-free and typography-led — no project screenshot, portrait, or stock image may appear in it; the existing warm-black/paper-white/ember palette (§3) and motion budget (§10) carry forward unchanged; the hero stays minimal when static and expressive through motion or interaction.
- Marked every §11 subsection that assumed the retired image-bearing composition ("Image strategy using real project imagery," "Relationship between image and typography," "Desktop and mobile composition rules," part of "Color distribution," two anti-pattern bullets, and the "Final hero specification" block itself) as superseded in place rather than deleting them — each carries an explicit superseded note and is kept for historical reference.
- Approved two isolated prototypes for the image-free direction: **Concept D, "Field Notes"** (restrained control) and **Concept E, "Instrument Panel"** (expressive signature) — both sourced from the options catalogued in `docs/HERO_21ST_RESEARCH.md`. **Concept F, "Playtest Log"** is reclassified from a competing hero direction to an optional scroll-linked transition mechanic either prototype (or the eventual shipped hero) may selectively adopt for the hero → Selected Work handoff.
- Reaffirmed in `CLAUDE.md` that 21st.dev is an interaction-reference source only: researched mechanics may inform original vanilla implementations, but components must never be copied wholesale, and no React/Tailwind dependency may enter the production portfolio.
- Updated `CLAUDE.md`'s "Approved architecture decisions": the old "hero foundation is locked... do not create new hero alternatives" rule is marked superseded in place (struck through, not deleted) and replaced with the current hero-direction rule, including the explicit "no public homepage change is authorised yet" constraint and the requirement that both new prototypes stay isolated under `/v2-preview/` until one is approved.

**Decisions:**
- Concept A (and its Concept B metadata-frame hybrid) is retired as the hero foundation; the site's actual homepage (`index.html`) is unchanged and still renders the Concept A hero until a replacement is built and approved — this session is a direction change, not an implementation.
- Concept D and Concept E are both approved for prototyping; no winner has been chosen. Concept F is downgraded from a hero candidate to an optional transition mechanic.
- The warm-black/paper-white/ember palette and the site's existing motion policy (§10) are explicitly *not* reopened by this decision — only the hero's use of imagery and composition is in scope.

**Verified:**
- N/A — documentation only, no runtime surface to check. Confirmed no HTML/CSS/JS file was touched (`git status` shows only `CLAUDE.md`, `PORTFOLIO_DIRECTION_V2.md`, and this log modified).

**Open:**
- Build Concept D ("Field Notes") and Concept E ("Instrument Panel") as isolated prototypes under `/v2-preview/`, per `docs/HERO_21ST_RESEARCH.md`.
- Decide whether Concept F's scroll-linked transition mechanic is adopted by either prototype.
- Choose a winner (or a hybrid, following the same foundation-plus-absorption precedent used for the original Concept A + B decision) before any public homepage change.
- All prior open items carried forward unchanged (CardioPal/Playing Freedom imagery; Echoes/Smartphone Mold/Playing Freedom remaining on pre-redesign skin; touch-device verification).

**Commit:** `Unlock image-free homepage hero direction` (hash below)

### 2026-07-16 — Integrate approved BETTR editorial case study

**Stage:** Pilot page (prototype → production integration)
**Scope:** `projects/bettr.html` (full rewrite), `css/portfolio.css` (new shared editorial tokens/components + `.project-bettr` scoped rules), `docs/PORTFOLIO_PRODUCTION_LOG.md`, `.claude/launch.json` (new `static-preview-bettr-integration`, port 4190). No other project page, `index.html`, `js/portfolio.js` (cursor bridge already generic — no change needed), `assets/bettr-live/**`, routes/embed URLs, or factual content touched. Reference: the approved `v2-preview/bettr-editorial-layout/index.html` prototype, left unmodified except for this session's side-by-side comparison captures.
**Did:**
- **Composition:** merged the previously-separate hero + artifact sections into one opening spread (text col 1–5, live build col 5–13, matching the prototype's "one spread" opening) inside the existing `.proj-hero`/`.cols` grid primitives — no new grid system introduced. Rebuilt Four Stages as a single `.cols.rows-loose` grid (6/6 then 7/5, `.proj-shot-note` attached directly beneath each figure's caption) replacing the old redundant summary-card grid the public page previously duplicated alongside the images. Building It's second row reordered to match the prototype exactly (VS Code crop left at 5 cols, process-tag + text right). Designing for Hidden Influence is now a real feature chapter: a lede paragraph, then a full-bleed oxblood `.proj-feature-surface` carrying the palette band (`.palette-band`/`.swatch-lg`, 7 large swatches) and a real-font type specimen (`.specimen-line` in Jersey 25, `.type-rows-feature` in Rajdhani). Scholarly Grounding and Walkthroughs recomposed onto the same `c1-8`/`c8-13` and `c1-7`/`c7-13` column pairs as the prototype.
- **Shared CSS extracted (unscoped, reusable by any project page):** fluid section-rhythm tokens `--space-major`/`--space-internal`/`--space-evidence`; the full editorial type ramp `--ed-fs-*` (title/thesis/h2/h2-feature/lede/body/support/cardhead/caption/meta/refs/label); `.cols.rows-loose` (row-gap opens to `--space-internal`, `align-items:start` so figures at different aspect ratios never stretch to match a row-mate); `.proj-shot-note`(+`-head`, `.outcome`) for the figure/caption/annotation attachment pattern; `.proj-shot.crop-tl`; `.proj-lede`; `.proj-annotation-label`/`.proj-annotation`; `.proj-feature-surface` (full-bleed mechanism via the same negative-margin technique as the existing `[data-layout="full-bleed"]`, colour supplied per-project via `--proj-feature-surface`/`--proj-feature-line` custom-property fallbacks); `.video-block`/`.video-wrap`/`.video-label`.
- **BETTR-specific (scoped under `.project-bettr` only):** the three `@font-face` declarations for BETTR's own shipped Jersey 25 / Rajdhani files (read-only reference into `assets/bettr-live/Fonts/**`); the corner-bracket `.watched` motif (moved out of the page's old inline `<style>` block into the shared stylesheet, still scoped); `.palette-band`/`.swatch-lg` sizing and `.type-specimen-feature`/`.specimen-line`/`.type-rows-feature` sizing; every size override applying the new `--ed-fs-*`/`--space-*` tokens to existing shared classes (`.proj-title`, `.proj-thesis`, `.proj-section-title` (+ `.is-feature` modifier), `.proj-num`, `.proj-body`, `.proj-body-muted`, `.proj-quote`, `.proj-refs`, `.proj-meta-grid`, `.proj-ownership`, meta/caption group, `.process-tag`); section-rhythm modifiers `.tight-top` / `.is-feature-chapter` / `:first-of-type`; a `@media (max-width:1023px)` block bringing the desktop-only approved numbers back down to safe mobile sizes (the prototype only targeted 1440/1920).
- Deleted the page's old inline `<style>` block entirely (palette chips, small type sample, 2-col video grid, corner-bracket rules) — everything now lives in the shared stylesheet, scoped where BETTR-specific.
- `js/portfolio.js` required no changes: the cursor bridge already binds generically via `[data-cursor-bridge]`/`data-cursor` attributes, which the merged opening section still carries on the same iframe/link elements.

**Decisions:**
- The prototype's own `--gutter`/`--gap` tokens were not ported 1:1 — BETTR uses the site's existing `--page-margin`/`--grid-gap` (the "desktop page frame" and "12-column grid" the task asked to reuse, not reinvent), which are close in value and already proven not to overflow across the other two project pages.
- `.proj-embed`'s BETTR-specific height override (`clamp(560px,68vh,800px)`, matching the prototype exactly) is wrapped in `@media (min-width:1024px)` so it can't out-specificity the shared stylesheet's own `@media (max-width:760px)` mobile embed-height rule — caught during this session's review before it shipped.

**Verified:**
- Fresh server on port 4190 (`static-preview-bettr-integration`), `http://localhost:4190/projects/bettr.html`.
- Typography measured via computed `getComputedStyle` against the approved prototype's own numbers at 1440 and 1920 — exact match at both: title 120.48/152.64px, thesis 32.72/38.96px, h2 58/70px, h2-feature 79.6/98.8px, body 20.9/22.3px, support 18.0/19.0px, caption+meta 15.5/16.5px, refs 16.1/17.1px, swatch/type labels 16.5px (≥15–16px floor met). Stage 3/4 measured at 1002px/703px (7/5 ratio, 1.43 vs. target 1.4); VS Code evidence measured at 703px, matching stage 4's width (secondary scale confirmed).
- No horizontal overflow (`scrollWidth === clientWidth`) at 375 / 1440 / 1920px; console clean at all three.
- Full-page headless-Chrome captures (`--force-prefers-reduced-motion`, matched heights so no scroll-compositor issue) of the public page and the prototype at 1440×full and 1920×full, compared region by region (opening/embed, sections 01–02, Building It, feature chapter, Scholarly Grounding/Walkthroughs, footer nav) — composition, spacing and hierarchy read as the same design.
- Live cursor bridge re-verified on the merged opening section: `data-bridge-active` set on load; a dispatched `pointermove` inside the BETTR iframe document produces the PLAY ring + label with `embed-hidden` cleared; a parent `mousemove` afterward drops the ring (no boundary freeze). "Open full screen" link confirmed as the top hit-tested element at its own coordinates; corner brackets confirmed `pointer-events:none`. Skip-link confirmed focusable.
- All six page images plus the BETTR live-build iframe and both internal nav links resolved 200 via `fetch` HEAD from within the page. `document.fonts` confirms Jersey 25 and both Rajdhani weights loaded (not falling back to monospace/sans).
- CardioPal, FrankenTeen and the homepage re-checked after the CSS changes: console clean, no overflow, and each page's own typography/`.process-tag` sizing measured unchanged from its pre-session values — confirming the new shared tokens/classes and the `.project-bettr` scoping don't leak.

**Open:**
- Touch-device verification of the cursor/embed-suspend behaviour — carried from prior entries, unchanged.
- Echoes of Home, Smartphone Mold, and Playing Freedom remain on the pre-redesign skin — unchanged from prior entries.
- The new shared editorial classes (`--ed-fs-*`, `.proj-feature-surface`, `.proj-shot-note`, `.video-block`, etc.) are only consumed by BETTR today; CardioPal/FrankenTeen have not opted in and were intentionally left untouched per scope.

**Commit:** `Integrate approved BETTR editorial case study` (hash below)

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
