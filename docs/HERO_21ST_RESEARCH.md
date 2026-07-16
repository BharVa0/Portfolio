# Hero Mechanics Research — 21st.dev catalogue pass

**Status:** Research only, nothing built · **Date:** 2026-07-16 · **Branch:** `redesign-v2`

This document is a catalogue-search pass through 21st.dev, done to source individual *interaction mechanics* — not components to install — that could inform a possible future image-free hero direction. No component was installed, no production code was written, and no page in the repository was touched.

## Relationship to the current locked hero

[PORTFOLIO_DIRECTION_V2.md §11](PORTFOLIO_DIRECTION_V2.md) and [CLAUDE.md](../CLAUDE.md) currently lock the hero to Concept A (real FrankenTeen project imagery, asymmetric split) plus Concept B's edge-pinned metadata frame, and explicitly say **"do not create new hero alternatives."** The brief for this research pass asked for an *image-free* direction, which is a different axis than what's locked. Nothing here amends, weakens, or supersedes that lock — the three concepts below are exploratory documentation only. Adopting any of them would require an explicit new decision in the direction doc, made deliberately, not a side effect of this research existing. Treat this file the same way as `PORTFOLIO_REFERENCES_V2.md`: calibration material, not a contract.

---

## Reference catalogue, grouped by mechanic

### 1. Kinetic typography

**Cursor Driven Particles Typography** (`harshjadhavconnect`)
- What it does: renders text as canvas particles that disperse on cursor proximity and spring back into formation.
- Worth learning: the spring-return physics reads as "the system noticing you and recovering" — a legible metaphor for behavioral-interface work.
- Must not copy: the particle-dissolve treatment itself is a common creative-dev trope; using it wholesale would read as generic-AI rather than authored.
- Dependencies: React + `<canvas>`, custom physics loop.
- Vanilla feasibility: rebuildable in plain JS/canvas, but it's a real per-frame simulation — not a CSS trick.
- Risks: canvas text isn't real DOM text (accessibility regression unless a visually-hidden real heading is layered underneath); continuous RAF loop has a battery/perf cost that must be gated hard behind `prefers-reduced-motion` and probably `(pointer: fine)`.

**Interactive Particle Typography** (`minhxthanh`)
- Same family as above (particles attracted to text-shaped targets). Adds touch support.
- Worth learning: touch fallback exists, which the direction doc's cursor spec currently doesn't need to solve (desktop-only), but is useful if this ever became a mobile-visible effect.
- Must not copy: literally reads as a demo of the word "21ST.DEV" — the specific look is a known catalogue item, easily recognized if lifted directly.
- Vanilla feasibility: yes, canvas + vanilla JS.
- Risks: same as above — canvas-only text is invisible to a screen reader and to Ctrl+F.

### 2. Pointer-reactive text fields

**Text Hover Effect** (GSAP, SVG)
- What it does: an SVG text element reveals a colour gradient that follows the cursor/touch point across the letterforms — the fill is masked to the pointer position rather than static.
- Worth learning: this is close to what the direction doc already wants from `ember-bright` — accent as "punctuation only." A gradient that only shows ember where the cursor has been would keep ember concentrated and interaction-earned rather than a static block.
- Must not copy: GSAP's specific easing/gradient stops; the demo's rainbow-leaning palette (ours would be a one-color ember reveal on paper/muted base, nothing multi-hue).
- Dependencies: GSAP (a JS animation library, not a framework) + inline SVG text.
- Vanilla feasibility: yes — SVG `<text>` with a `<mask>` whose position is driven by `pointermove`, no GSAP required; CSS custom properties + a radial-gradient mask achieve the same effect without a library.
- Risks: SVG text needs the same real-text fallback discipline (use actual `<text>`, not paths, so it stays selectable/accessible); must be disabled under reduced motion and hidden from `(pointer: coarse)` devices since there's no cursor to react to.

**Cursor Follow** (`educlopez`)
- What it does: a floating label follows the cursor and swaps its text per the hovered element ("View", "Play", etc.).
- Worth learning: this is structurally almost identical to what `js/portfolio.js` already does for the site's contextual cursor (`data-cursor` attribute → verb label). Confirms the existing implementation is already at this ceiling — nothing new to adopt here for the *cursor* itself.
- Must not copy: n/a, already superseded by the site's own implementation.
- Vanilla feasibility: already vanilla in this repo.
- Risks: none new.

### 3. Typographic masks and reveals

**SVG Mask Effect** (`aceternity` / `manuarora700`)
- What it does: moving the cursor reveals hidden content beneath a masked layer — a circular "torch" of visibility tied to pointer position.
- Worth learning: could be repurposed as a *text-layer* reveal rather than an image reveal — e.g. a muted base rendering of the positioning statement with an ember-toned or higher-contrast variant only visible where the cursor has passed. Reads as "look closer" rather than decoration.
- Must not copy: the demo's specific radial mask size/easing and its use as an image-reveal gimmick (direction doc explicitly wants image only as supporting evidence, not a reveal toy).
- Dependencies: Framer Motion.
- Vanilla feasibility: yes — `mask-image: radial-gradient(...)` positioned via CSS custom properties updated on `pointermove`, no animation library needed.
- Risks: motion must be capped (`transform`/mask-position only, no layout properties); needs a `prefers-reduced-motion` fallback that just shows the revealed state permanently rather than hiding the content.

**Text Scroll Read** (`youcefbnm`)
- What it does: a scroll-driven gradient clip-mask reveals words progressively as the section scrolls through view.
- Worth learning: this is a legible, restrained way to stage the positioning statement's three authored line-breaks (§11) as a *reading* beat rather than a single fade — each line resolves as it's read, reinforcing "authored line breaks."
- Must not copy: the specific gradient-mask easing curve; the source demo animates arbitrary paragraph-length copy, which is longer than the hero ever should be (§11 caps the statement at 2–3 lines).
- Dependencies: unspecified in the listing, but scroll-mask effects are `scroll-timeline`/`IntersectionObserver` territory — no framework required.
- Vanilla feasibility: yes, via `IntersectionObserver` driving a CSS custom property or (in supporting browsers) native CSS `animation-timeline: view()`.
- Risks: this is a *scroll*-triggered effect; the hero is above the fold at first paint, so it would only apply to the entrance, not a scroll gesture — needs re-scoping if used at all (see Concept 3 below for where scroll-linkage actually fits).

**Masked Slide Reveal** (`kapish_dima`)
- What it does: words slide up out of an invisible horizontal mask, staggered per word.
- Worth learning: a cleaner, more restrained alternative to the fade/rise the hero already uses (`hs-rise` keyframe) — a masked slide reads as "the words were always there, now visible" rather than "arriving," which suits an editorial register better than a fade.
- Must not copy: exact stagger timing/easing.
- Vanilla feasibility: yes — `overflow: hidden` wrapper + `translateY` on the inner span, pure CSS keyframes.
- Risks: none beyond the standard reduced-motion guard; this is one of the lowest-risk, most reusable mechanics in the whole list.

### 4. Cursor-follow labels

Covered under §2 above (Cursor Follow, Text Hover Effect). No additional distinct entries — the catalogue's cursor-follow work clusters entirely around either (a) a floating verb label, which this site has already built, or (b) a gradient/mask reveal, which is closer to a mask mechanic than a "label" mechanic.

### 5. First-load counter transitions

**Animated Number** (`ibelick`, Motion Primitives)
- What it does: a minimal, dependency-light number-animation primitive — interpolates a numeric value with a spring, no decoration.
- Worth learning: its restraint is the point. The current loader (`js/portfolio.js`) already implements a real-readiness-driven 0–100 counter (§11) — this reference mostly *validates* that approach rather than adding to it. If the loader is ever revisited, this confirms "plain tabular-nums count, no flourish" is the right ceiling, not a floor to build up from.
- Must not copy: n/a — already aligned, nothing to import.
- Vanilla feasibility: the existing loader is already vanilla and simpler than this reference (no spring physics, just `requestAnimationFrame` + elapsed-time math tied to real asset readiness).
- Risks: none — flagged only for completeness since the brief asked for this mechanic explicitly.

**Count Animation** (`bundui`) / **Animated Counter** (×2)
- Same family — spring/tween-driven numeric counters for stats/metrics UI (dashboard-style "counting up to a KPI").
- Must not copy: this genre is built for SaaS metrics tiles, exactly the "SaaS landing-page hero" register the brief asks to avoid. Not a fit for the loader or hero at all.

### 6. Scroll-linked text transformations

**Parallax Scrolling Text Effect** (`uniquesonu`)
- What it does: maps scroll *position and velocity* to text skew and horizontal offset — the text tilts more the faster you scroll, settling upright when scrolling stops.
- Worth learning: velocity-linked (not just position-linked) transform is the interesting part — it makes the text feel like it's responding to *how* you're moving, not just *where* you are. That's a genuine behavioral-system metaphor, on-thesis for "designing around how people actually behave."
- Must not copy: the specific skew amount and the `h-[1000vh]` scroll-runway approach — far too long a scroll distance for a hero-to-index handoff, and skew on a name/statement risks legibility and violates the direction doc's "no layout-shifting motion" spirit if not kept to `transform` only (it is, technically, but skew is aggressive for editorial type).
- Dependencies: Framer Motion (`useScroll`, `useVelocity`, `useTransform`, `useSpring`).
- Vanilla feasibility: yes, in principle — `scrollY` delta over `requestAnimationFrame` gives you velocity without a library — but it's meaningfully more JS than the current entrance/reveal system.
- Risks: skew-on-scroll is exactly the kind of "ambient/looping" motion the direction doc's §10 anti-patterns target if it runs longer than a brief handoff gesture; would need a hard distance cap (e.g. only active across the hero→index seam, not the whole page) and a reduced-motion off-switch.

**Scroll and Swap Text** (Motion / danielpetho pattern)
- What it does: duplicate text, stack vertically, use `scrollYProgress` to vertically offset the duplicate so letters "swap" as you scroll past.
- Worth learning: same duplicate-and-offset trick as the site's own hover-based Letter Swap family, just re-driven by scroll instead of hover — a coherent way to reuse one visual idea across two triggers (hover on project rows, scroll on the hero-to-index handoff) without inventing a second visual language.
- Must not copy: the letter-by-letter granularity in the source demo is built for short single words; the hero's positioning statement is a full sentence, so this would need to operate per-line, not per-letter, to stay legible.
- Vanilla feasibility: yes — `IntersectionObserver`/scroll-position math driving a `transform: translateY`, no library needed.
- Risks: same distance-scoping concern as above.

### 7. Restrained grain, shader or depth effects

**Grain Gradient** (`paper-design`)
- What it does: multi-colour gradients with animated grain/noise distortion, several abstract forms.
- Worth learning: a *very* subtle, low-opacity, non-animated (or barely-animated) grain layer over the `ink` field could add the "well-made object" tactility the direction doc's atmosphere reference (Pauline Stein) asks for, without introducing imagery.
- Must not copy: this reference's multi-colour, actively-animated forms — the direction doc's palette is warm/restrained, and continuous animated grain reads as ambient motion, which §10 prohibits outright ("no ambient/looping motion of any kind").
- Dependencies: unspecified, likely canvas/WebGL for the animated variants; static grain doesn't need any of that.
- Vanilla feasibility: yes, and preferable — a single tiled SVG `feTurbulence` filter or a pre-baked noise PNG at low opacity gives 90% of the tactility at near-zero runtime cost and zero motion-policy risk.
- Risks: animated grain specifically conflicts with §10; only a **static** grain treatment is compatible with the current motion contract.

**Paper Texture** (`paper-design`)
- What it does: static noise-layered texture built for realistic paper/cardboard surfaces.
- Worth learning: directly on-theme — the site's own surface token is *called* `--paper`. A restrained static paper-grain texture behind `paper`/`paper-soft` surfaces (not `ink`) would reinforce the "printed object, not a screen" read the direction doc is going for, and it's static by construction, so it doesn't touch the motion budget at all.
- Must not copy: nothing structural to avoid — this is closer to a technique (layered noise via SVG filter) than a distinctive visual signature, so recreating the technique isn't "copying" a look.
- Vanilla feasibility: yes, trivially — SVG filter or a small tiled background image.
- Risks: none functionally; watch file weight if using a baked PNG rather than a generated filter (prefer the filter — zero asset weight).

**Shader Background** (WebGL plasma) / **"Shader R" / "Shadow Blending"** (21st.dev Shader Builder outputs)
- What they do: full-screen animated WebGL gradient/plasma/mesh-drift backgrounds.
- Worth learning: little — these are exactly the "generic gradient background" anti-pattern the brief explicitly asks to avoid, and the continuous animation loop conflicts with §10 regardless of palette.
- Must not copy: the entire category. Flagged only because the brief asked for shader/depth research explicitly — the finding is that this genre doesn't fit the brief, not a mechanic to adapt.
- Risks if ever reconsidered: WebGL context cost on load, GPU battery draw, and it would need to be entirely inert under reduced motion (a static single frame at best) — a lot of engineering cost for an effect the direction doc's own anti-pattern list already rules out.

### 8. Transitions from a hero into project content

**Scroll Image Tunnel**
- What it does: a pinned photo stage where a scroll-linked image "develops" from an oversaturated, high-contrast state into its true colours as the user settles on it — a darkroom-print metaphor.
- Worth learning: the *metaphor* (an image resolving into its true state, like a print developing) is genuinely on-theme for a portfolio that talks about "evidence" and "field documentation" — but the mechanic as built is image-driven and pinned, which conflicts with an image-free hero brief. Worth keeping as a metaphor for a future *image-bearing* transition (e.g. the existing locked hero's FrankenTeen panel), not for this sprint's image-free constraint.
- Must not copy: the pinned-scroll-hijack structure — the direction doc's hero explicitly must not trap the reader above a hard fold (§11), and scroll-pinning does exactly that.
- Vanilla feasibility: yes technically (`position: sticky` + scroll-progress-driven filter/saturate), but scroll-pinning a hero is against the direction doc regardless of feasibility.
- Risks: scroll-jacking is a well-documented UX and accessibility hazard (breaks scroll-wheel expectations, fights assistive scroll, can trap keyboard/trackpad users) — not recommended even for a future image-bearing variant without a very deliberate escape hatch.

**Masked Slide Reveal** and **Scroll Reveal / Reveal** (generic fade+blur-in wrappers)
- What they do: standard "un-blur and fade in on scroll-into-view" wrappers, optionally staggered.
- Worth learning: this is structurally what the site's own `.reveal`/`IntersectionObserver` system in `js/portfolio.js` already does. No new idea here — confirms the existing entrance system is already at the appropriate ceiling for a hero→index handoff (a clean cut/threshold-based reveal, not a hijacked scroll).
- Must not copy: n/a, already implemented equivalently.

**Hero Section (various, generic templates)**
- The broad "Hero Section" search mostly returned generic SaaS composition templates (orbiting circles, glowing gradients, badge-and-headline stacks) — explicitly the register the brief asks to avoid. No usable mechanic isolated from this bucket; noted only to record that the search was run and the results were correctly screened out.

---

## Strongest five mechanics

1. **Masked Slide Reveal** — words sliding up out of a hidden mask, staggered per line. Lowest risk, most reusable, reads more editorial ("the words were always there") than the current fade/rise.
2. **Text Hover / SVG Mask Effect, repurposed as a text-layer reveal** — cursor as a "torch" over a muted/accent double-rendering of the positioning statement, instead of an image reveal. Keeps ember "punctuation only" (§3) while adding earned interaction.
3. **Static Paper Texture (SVG `feTurbulence`)** — zero-motion, zero-asset-weight grain on `paper`/`paper-soft` surfaces. Directly reinforces the "printed object" register without touching the motion budget at all.
4. **Scroll-and-swap text, re-scoped per-line and distance-capped** — reuses the site's existing letter-swap visual language (already used on hover elsewhere) as the literal mechanism for a hero→index handoff, instead of inventing a second visual idiom.
5. **Animated Number, as validation** — confirms the existing real-readiness loader is already at the right ceiling of restraint; the finding is "don't add," which is itself useful.

---

## Three original hero concepts (image-free)

None of these are proposals to replace the locked hero — they're what an *image-free* hero sprint would produce if that were ever separately approved. All three share the direction doc's palette, type roles (§4), 8px spacing scale, and motion policy (§10): entrances only, `transform`/`opacity` (or `mask-position`) only, hard `prefers-reduced-motion` guards, no ambient/looping motion.

### Concept D — "Field Notes"

- **Static composition:** name (Fraunces, largest scale) stacked above the positioning statement, both left-aligned in a single column — no split, no second zone, because there's no image to balance against. Edge-pinned mono metadata frame (top: name/portfolio, right: location/year) carried over unchanged from the locked spec, since that's chrome, not the image-dependent half of the composition. A static, low-opacity paper-grain texture (mechanic #3) sits behind the whole `ink` field.
- **Typography behaviour:** the positioning statement's three authored lines each slide up out of a masked wrapper (mechanic #1) in sequence, so the statement is "read into place" line by line rather than fading in as one block.
- **Pointer interaction:** none beyond the site's existing contextual cursor on the CTA — this concept spends its whole budget on the entrance and the paper texture, deliberately quiet under pointer movement (a hero that's "minimal when static, expressive through interaction" doesn't require *every* concept to add a new pointer gimmick).
- **Entrance/loading behaviour:** same real-readiness 0–100 loader as the current locked spec (font-ready gate), unchanged — this concept only replaces the image-dependent half of the hero, not the loader contract.
- **Transition into Selected Work:** a plain "Selected work →" link, identical in spirit to the current CTA; no scroll-linked handoff effect, kept deliberately simple since this concept's whole identity is restraint.
- **Reduced-motion behaviour:** all lines render fully visible immediately, no stagger, no slide; grain texture is static regardless of motion preference (it was never animated, so nothing to disable).
- **Why it represents Bharat's practice:** the register is a monograph or field-note page — exactly the "print editorial and field documentation" language of §1 — with the grain doing quietly what the FrankenTeen crop currently does loudly (signals "real, physical object," just without a photograph).
- **Mechanics that informed it, not copied:** Masked Slide Reveal (line-reveal), Paper Texture (static grain) — both used exactly as researched, restrained to their lowest-risk form.

### Concept E — "Instrument Panel"

- **Static composition:** same single-column text stack as Concept D, but the positioning statement is rendered twice, stacked exactly on top of itself: a `muted`-coloured base layer and a hidden `ember`-toned second layer.
- **Typography behaviour:** static text otherwise — no entrance choreography beyond the name/statement/metadata/CTA stagger already specified in §11.
- **Pointer interaction:** the ember-toned layer is revealed only inside a small radial mask that follows the cursor (mechanic #2) — moving the pointer across the statement "develops" the accent-coloured version of whatever text the cursor is currently over, then it fades back to muted once the cursor moves on. This is the one genuinely new interaction among the three concepts, and it's the closest thing to a signature move.
- **Entrance/loading behaviour:** identical real-readiness loader, unchanged.
- **Transition into Selected Work:** identical plain CTA link, unchanged.
- **Reduced-motion behaviour:** the mask is disabled outright — the ember layer either shows fully (if that reads better for the accent-word convention already in §11: "one italic ember-bright accent phrase") or not at all, falling back to the existing single-layer static statement. No mask-position motion runs under reduced motion.
- **Why it represents Bharat's practice:** BETTR's whole thesis is an interface that reveals something about the person using it as they interact with it (the profile dashboard "quietly profiling" the user, per the homepage's own project description). A cursor that reveals a hidden layer of the *hero's own text* is a small, honest echo of that same idea — interaction revealing a system's true state — without borrowing BETTR's literal visual identity (`#EB5160` stays scoped to BETTR's own page per §9; this concept uses the site's general `ember`).
- **Mechanics that informed it, not copied:** SVG Mask Effect / Text Hover Effect, repurposed from an image-reveal or rainbow-gradient trick into a single-colour text-layer reveal — the source demos' actual visual (image beneath a mask; multi-hue gradient) is explicitly not carried over.

### Concept F — "Playtest Log"

- **Static composition:** same text stack as Concept D. No image, no second zone. The one addition is a thin mono progress rule beneath the metadata frame — reading almost like a save-file or session-log timestamp, in keeping with the site's existing "evidence, not decoration" numbering conventions (§2).
- **Typography behaviour:** static at rest, identical to §11's baseline. All the behaviour lives in the transition (below), not the static state.
- **Pointer interaction:** none — this concept's interaction budget is spent on scroll velocity, not pointer position, so it's fully coherent on touch devices too (a genuine advantage over Concept E, which is desktop-only by nature).
- **Entrance/loading behaviour:** identical real-readiness loader, unchanged.
- **Transition into Selected Work:** the one structurally new idea. As the reader scrolls from the hero into the project index (a short, capped distance — roughly one viewport height, never the whole page), the name and statement swap into their line-by-line reveal state in reverse (mechanic #4, re-scoped to whole lines instead of letters) and very slightly resist the scroll — a few pixels of velocity-linked lag rather than skew (a restrained, non-legibility-risking reading of mechanic #6's velocity idea) — so the handoff feels like the page is registering the gesture, not just cross-fading. The effect is hard-capped to that one seam; nothing scroll-linked happens again anywhere else on the page.
- **Reduced-motion behaviour:** the handoff becomes an ordinary threshold-based `.reveal` cut (exactly the site's existing `IntersectionObserver` system) — no velocity tracking, no lag, no line-swap, content just appears once scrolled to.
- **Why it represents Bharat's practice:** "a system has to account for how people actually behave, not how they're supposed to" (the homepage's own Introduction copy) is literally about behavior-responsive systems. A transition that responds to *how fast* someone is scrolling — impatient flick vs. slow read — is a small, honest demonstration of that thesis inside the site's own chrome, not just stated in the copy above it.
- **Mechanics that informed it, not copied:** Scroll and Swap Text (re-scoped per-line) and the velocity-mapping idea from Parallax Scrolling Text Effect — explicitly *not* the skew transform or the `h-[1000vh]` scroll runway from that source, both flagged above as incompatible with the direction doc.

---

## Recommended concept to prototype first

**Concept D ("Field Notes").** It carries the lowest technical and motion-policy risk (mechanics #1 and #3 are both static or CSS-only, no new JS interaction surface), it's the most direct fit for the brief's "minimal when static" requirement, and it gives the cleanest before/after comparison against the currently-locked image-bearing hero since it changes exactly one variable (image presence) rather than also introducing a new pointer or scroll mechanic. Concepts E and F are both stronger *signature* candidates if an image-free direction is approved for real, but D is the right first build to validate the underlying premise — that the hero can carry "the work is real" without a photograph — before spending build time on E's cursor-reveal or F's scroll-velocity handoff.

## Documentation file created

`docs/HERO_21ST_RESEARCH.md` (this file). No other file in the repository was modified.
