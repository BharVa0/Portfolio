# Portfolio References — "Human Systems" (v2)

**Status:** Approved · **Date:** 2026-07-14 · **Branch:** `redesign-v2`

This document records the four external references that inform the redesign and the exact role each one plays. It is a **reference map, not a design contract** — [PORTFOLIO_DIRECTION_V2.md](PORTFOLIO_DIRECTION_V2.md) always wins where the two could be read differently. References are for calibration ("is this treatment at the right level of craft?"), never for copying. The final identity is grounded in Bharat's actual work — behavioural interfaces, playable environments, memory and storytelling, research documents, cinematic criticism — and must never be describable as merely "Pauline-inspired" (or Numo-inspired, etc.).

---

## 1. Pauline Stein — Presentation Design Portfolio

<https://www.behance.net/gallery/220774913/Presentation-Design-Portfolio?tracking_source=search_projects|student+portfolio&l=14&bid=226507>

**Role:** atmosphere and register calibration.

**Use for:**
- Warm black, burnt orange and warm-white atmosphere — confirms the `ink`/`ember`/`paper` palette can carry a whole site without feeling monotone.
- Editorial serif typography — the level of typographic authority the hero and section openers should reach.
- Cinematic image treatment — toned, cropped, intentional imagery rather than raw screenshots.
- Asymmetry and restraint — compositions that are off-centre but calm; nothing decorative fills empty space.

**Do not copy:**
- The exact hero composition.
- Any wording.
- Section layouts.

## 2. George Paul — Industrial Design Portfolio

<https://www.behance.net/gallery/248536927/Industrial-Design-Portfolio?tracking_source=search_projects|student+portfolio&l=13>

**Role:** case-study structure and per-project identity calibration.

**Use for:**
- Allowing each project to have its own visual world — validates the direction doc's "one system, per-project accents" principle (§9): shared grammar, project-owned colour.
- Large project imagery — projects lead with their strongest visual at generous scale.
- Designed process documentation — research, iterations and testing presented as designed artifacts, not appendix dumps (maps to the existing numbered-section/evidence structure).
- Strong case-study pacing — clear beats: hook, context, process, outcome, reflection.

**Do not copy:**
- Specific product-design styling.
- The yellow DITTR identity.
- Exact layouts.

## 3. Russell Numo

<https://www.russellnumo.nl/>

**Role:** hero minimalism, entrance and cursor behaviour calibration.

**Use for:**
- Highly minimal hero — how few elements a hero can hold and still position its author.
- Oversized typographic identity — the confidence of the name scale (informs the locked hero's name treatment).
- Controlled 0–100 opening transition — a loader that reads as a deliberate title beat, not a spinner (informs the loader spec in direction doc §11).
- Cursor-follow project preview — contextual cursor as functional feedback over project links (informs the cursor spec in §11).
- Edge-aligned metadata — small mono facts pinned to the frame edges (adopted from Concept B into the locked hero).

**Do not copy:**
- The exact name arrangement.
- Rotating job titles.
- Fake loading delays — our loader is tied to real asset readiness and is skipped on repeat visits.
- The generic black-and-white creative-developer identity — ours is warm ink/ember/paper with real project imagery.

## 4. Vivid Motion

<https://www.awwwards.com/sites/vivid-motion-1>

**Role:** interaction-polish ceiling.

**Use for:**
- Energetic but controlled colour — accent colour deployed in concentrated, deliberate moments.
- Contextual cursor animation — the cursor changes meaning with what it is over, without becoming a toy.
- Interaction polish — hover/focus states that feel finished (timing, easing, restraint).
- Concentrated high-impact motion — spend the motion budget in one or two orchestrated moments rather than everywhere.

**Do not copy:**
- Heavy glitch effects.
- Constant cursor trails.
- Excessive WebGL.
- Any motion that competes with the portfolio content — the direction doc's motion principles (§10) cap what this site does.

---

## How the references combine

| Axis | Governing reference | Bounded by |
|---|---|---|
| Palette, register, image tone | Pauline Stein | Direction doc §3, §8 |
| Case-study structure, per-project worlds | George Paul | Direction doc §7, §9 |
| Hero minimalism, loader, cursor, edge metadata | Russell Numo | Direction doc §11 |
| Interaction/motion polish ceiling | Vivid Motion | Direction doc §10 |

No reference supplies content, wording, or a layout to trace. Where a reference and the direction doc disagree, the direction doc wins.
