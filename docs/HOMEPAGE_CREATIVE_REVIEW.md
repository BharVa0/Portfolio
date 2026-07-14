# Homepage Creative Review — "Human Systems" (v2)

**Reviewed:** 2026-07-14 · **Source:** `index.html` + `css/portfolio.css`, served locally at `http://localhost:4180/?version=human-systems`
**Method:** Full read of `CLAUDE.md`, `docs/PORTFOLIO_AUDIT_V2.md`, `docs/PORTFOLIO_REFERENCES_V2.md`, `docs/PORTFOLIO_DIRECTION_V2.md`, `docs/PORTFOLIO_PRODUCTION_LOG.md`, then a live inspection of the rendered page at 1440×900, 1024×700 and 390×844, plus direct inspection of the source image files behind each project row. No files were modified.

**Pre-check confirmed the correct build:** the page shows the large serif "Bharat Vyas" hero, the locked positioning statement, and the edge-pinned metadata frame — not the retired SYS/interface skin or the Gallery/Index toggle. The phrase "Every interface asks something of the person using it" does appear, but as the Introduction section's statement further down the page, not the hero — this is the current, intended copy, not a stale build. Review proceeds on that basis.

## Overall take

Five-second impact lands: name, positioning statement and one real project image are legible together within the first viewport, and the register reads as warm/editorial rather than dashboard. The biggest thing working against "authored, not AI-generated" isn't the design system — it's two source images that were never cleaned up before being wired into the homepage (findings 1–2 below), one of which still carries a literal on-screen debug readout. Fixing those two images would do more for the "authored" test than any layout change.

## Findings

### Critical

**1. FrankenTeen project-row image is an uncropped six-panel screenshot grid, including a visible dev-debug overlay**
- **Section:** Selected work → row 03, FrankenTeen (`assets/frankenteen/ui-thumb-crop.jpg`, `index.html:129`)
- **Problem:** The file is a 2×3 contact sheet of raw game screens (title menu, in-game isometric view, two duplicate "crumpled paper" frames, a repeat isometric view, and the pause menu) — not a single cinematic crop. One panel additionally shows a live coordinate readout, "X: 1336.99 px / Y: 520.54 px", overlaid on the scene — a debugging/inspector artifact left in a shipped asset.
- **Why it matters:** This is the exact anti-pattern the direction doc rules out twice over — "full editor-window screenshots with chrome where a cinematic crop would serve" (§14) and "no decorative elements... standing in for real" work. A stray coordinate HUD is a stronger "this wasn't checked before shipping" signal than any styling choice could be, and it sits in a feature row, at large scale, one of only two full-bleed image moments on the whole homepage.
- **Recommendation:** Replace with a single wide cinematic crop of the FrankenTeen world (the isometric room, tonally treated like the hero's bedroom crop) — audit §6 already calls for exactly this ("recrop... FrankenTeen's world-map detail"). Do not composite multiple screens into one file for this slot.

**2. Echoes of Home project-row image is a raw Unity Scene-view capture with full editor chrome**
- **Section:** Selected work → row 04, Echoes of Home (`assets/echoes/runner-thumb-crop.jpg`, `index.html:148`)
- **Problem:** Toolbar icons, gizmo crosshair lines, the scene-view grid, and the bottom layer-icon strip are all visible in the shipped image — this is an editor screenshot, not a recrop of the rendered scene.
- **Why it matters:** Combined with finding 1, this makes two of four image-bearing rows carry literal software chrome — turning an isolated slip into a visible pattern, which is precisely the audit's original complaint about the old site ("most other images are editor screenshots, not cinematic compositions," audit §2) resurfacing in the new build.
- **Recommendation:** Re-export a clean Play-mode capture (or crop tightly enough to exclude all editor UI) of the memory-runner scene, toned to match the site's warm palette the way the hero image is.

**3. Hero image still carries the annotation-ring/gizmo-line artifact**
- **Section:** Hero, `assets/frankenteen/frankenteen-hero-crop.jpg`
- **Problem:** The pink annotation ring and dotted gizmo lines from the Unity editor are visible over the bed/desk area of the crop, confirmed on the live page at both 1024px and 390px.
- **Why it matters:** This is already logged as an open blocker in the production log, but it's worth restating here because it's the single largest, highest-priority image on the entire site and the first thing any visitor sees — every other finding in this review is secondary to shipping this fix.
- **Recommendation:** No new instruction needed beyond what's already tracked — re-capture or re-export the clean crop before homepage approval, as the direction doc already requires.

### Important

**4. Two of six project rows ship with no image at all, breaking the index's visual rhythm**
- **Section:** Selected work → row 02 (CardioPal) and row 06 (Playing Freedom)
- **Problem:** Both rows are pure text with a left accent border; at wide viewports this leaves a large empty black area beside the copy where an image sits on every other row.
- **Why it matters:** The direction doc's alternation model (full-bleed feature / compact-with-media) assumes every row has visual weight of some kind; two conspicuously bare rows in a sequence of six read as unfinished rather than as a deliberate typographic choice, even though the production log frames it as an intentional stand-in for missing assets (audit §6 still lists this as unresolved, not "resolved").
- **Recommendation:** Either source the CardioPal Figma export and Playing Freedom poster frame called for in audit §6 before calling the homepage approved, or, if that's still pending, give the two text-led rows a stronger typographic treatment (e.g., a large pull-quote number or a short supporting line) so their emptiness reads as designed rather than incomplete.

**5. Introduction and About sections repeat the same framing almost verbatim**
- **Section:** Introduction ("Six projects, one continuing question...") and About ("...different mediums for the same underlying question...")
- **Problem:** Both sections independently tell the reader "six projects, one question, different mediums" within a few hundred pixels of scroll, using near-identical sentence shapes.
- **Why it matters:** The direction doc's content principle is "editorial tightening... shortening and removal of repetition" — the redesign's stated purpose was partly to make the page read as authored and edited, and a page that repeats its own thesis twice in five sections undercuts that.
- **Recommendation:** Cut the repeated framing from one of the two sections — let Introduction state the thesis, and let About add new information only (degree context, credit-transparency practice) without re-explaining "six projects, one question."

**6. Smartphone Mold's image is a glossy marketing render, tonally at odds with the rest of the page**
- **Section:** Selected work → row 05, Breaking the Smartphone Mold (`assets/smartphone/nothing-transparent.jpeg`)
- **Problem:** A vivid red-gradient studio product shot of the Nothing Phone sits between four warm/dark, editorially-toned project images.
- **Why it matters:** It's legitimate as reference material for a research piece about industrial design discourse (not a fabricated claim), but visually it's the one image that looks like stock/ad creative rather than something from the site's own visual world — it briefly breaks the "one continuing question, one visual register" feeling the homepage otherwise builds.
- **Recommendation:** Either apply the same warm tonal overlay/crop treatment used elsewhere to bring it into the site's palette, or crop tighter to de-emphasize the saturated red background.

**7. BETTR's feature-row image is a plain app screenshot, not a cinematic crop**
- **Section:** Selected work → row 01, BETTR (`assets/bettr/dashboard-thumb-crop.jpg`)
- **Problem:** Of the two full-bleed feature rows, only FrankenTeen's hero-style crop gets art direction (tonal overlay, bleed treatment); BETTR's image is a clean but literal two-panel UI screenshot.
- **Why it matters:** BETTR is one of only two rows given the most prominent visual treatment on the homepage; audit §6 specifically calls for "wide crops of the BETTR dashboard" rather than a flat screenshot, and the disparity between the two feature rows makes FrankenTeen look art-directed and BETTR look unfinished by comparison.
- **Recommendation:** Recrop to a wider, tighter slice of the dashboard (per audit §6) and consider the same warm-toned treatment used on the hero image so both feature rows read as the same level of craft.

### Optional

**8. `--ember-bright` is used for small mono captions, outside its documented role**
- **Section:** Practice section column headers ("DESIGN" / "BUILD" / "METHOD"), `css/portfolio.css:426-432`
- **Problem:** The direction doc reserves `ember-bright` for "large display type, rules, and backgrounds" — here it colors 0.78rem all-caps mono labels.
- **Why it matters:** Minor; contrast against `ink` is almost certainly fine, but it's a small deviation from "restraint as craft" (§2.3), where the accent's appearance is supposed to consistently signal one thing.
- **Recommendation:** Swap to `muted` or plain `ember` for these labels, keeping `ember-bright` for display-scale moments only.

**9. Hero image caption echoes the edge-metadata device very early on the page**
- **Section:** Hero, `figcaption.mono` under the FrankenTeen image
- **Problem:** "FrankenTeen — world layout study, Unity" is set in the same small mono/muted voice as the top frame's "Bharat Vyas · Portfolio" / "Edinburgh, UK · 2026" metadata, directly beneath it in the same viewport.
- **Why it matters:** Very minor rhythm note — two mono-metadata moments stacked in the first screen slightly dilutes the "restrained, occasional" feeling the mono system is meant to have (§4).
- **Recommendation:** Not a blocker; consider only if further hero polish is in scope — e.g., a slightly smaller or more visually distinct caption treatment than the top frame.
