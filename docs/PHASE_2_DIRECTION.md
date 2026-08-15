# Phase 2 direction: Kinetic Project Reel

## Status and boundary

The approved Phase 2 prototype lives only at `/phase-2-preview` in the Next.js port. The production homepage remains unchanged until the reel is separately reviewed and approved. This checkpoint contains Hero G, BETTR, CardioPal, and a temporary end marker only.

## Experience contract

- Hero G remains compositionally unchanged. The reel begins at Hero G's natural scroll handoff, with no blank interstitial and no second loader.
- Desktop project chapters use ordinary scrolling through 150svh sections with a 100svh CSS-sticky stage. Lenis smooths wheel input; GSAP ScrollTrigger maps enter, hold, and exit states to the sticky interval. There is no snap, forced navigation, or scroll lock.
- The timing model is 0–25% entrance, 25–65% hold, and 65–100% exit/handoff.
- BETTR is an oxblood/pink interface stage built around approved dashboard evidence. It does not embed the shipped BETTR build.
- CardioPal is a dark sage stage built around a paper testing record and approved results. It has no screenshot, Figma embed, or remote design dependency.
- Project titles use a preview-scoped, word-level adaptation of React Bits Split Text. Hero G is excluded from this treatment.

## Factual and visual rules

All project copy, ownership, media, and test results must come from the approved project data or case studies. Do not invent outcomes, dates, participants, or capabilities. Each project retains its own accent and evidence composition rather than sharing a generic card layout.

## Responsive, accessibility, and motion

- At widths below 1024px, chapters return to normal document flow and use only short entrance reveals.
- At 390px, content must not overflow horizontally; evidence, copy, and the 44px-minimum case-study action remain visible.
- Titles keep an intact accessible heading name while visual words are hidden from assistive technology.
- With `prefers-reduced-motion: reduce`, Lenis, ScrollTrigger scrubbing, sticky staging, and split-title transforms are absent; both project chapters render as static content.

## Performance and lifecycle

The route owns exactly one Lenis instance and one scoped GSAP context. Every ticker callback, Lenis listener, media-query context, tween, and ScrollTrigger must be removed when the route unmounts. Refreshes are limited to initial layout and font readiness. Project imagery uses `next/image`; autoplay media, WebGL, runtime React Bits packages, and duplicate animation engines are prohibited.

## Approval gate

The prototype is not the production homepage. Integration requires a separate visual and interaction approval after desktop, tablet, mobile, reverse-scroll, direct-load, reduced-motion, cleanup, and production-route regression checks.
