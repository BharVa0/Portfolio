"use client";

import { useEffect, useRef } from "react";
import type { HeroGContent } from "./HeroG.types";
import styles from "./HeroG.module.css";

type HeroGInteractiveProps = {
  content: HeroGContent;
  loaderSessionKey: string;
};

/* Per-band character, copied verbatim from js/portfolio.js: alternating
 * pointer direction, varied amplitude, varied scroll-handoff direction
 * and rate. Index order matches content.bands (b1..b4). Module-level
 * consts, not component state — they never change. */
const DIR_X = [-1, 1, -1, 1] as const;
const BASE_O = [1, 1, 0.92, 1] as const; // keep b3's authored resting opacity
const AMP_X = [1, 0.5, 0.75, 1.14] as const;
const DIR_Y = [1, -1, 1, -1] as const;
const AMP_Y = [0.55, 1, 0.7, 1.2] as const;
const SCROLL_X = [-0.16, 0.12, -0.08, 0.14] as const; // × viewport width

const WORD1_CHARS = 9; // "Playable " — for band-2/anchor alignment

const MIN_LOADER_MS = 800;
const MAX_LOADER_MS = 1400;

function heroSmoothstep(t: number) {
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
}

/* Mutable, per-frame engine state. Grouped into one ref (rather than a
 * dozen separate useRef calls) because every field is read and written
 * together, every frame, by the same rAF loop — they're one unit of
 * state, not independent pieces. None of it is React state: nothing
 * here needs to trigger a re-render, and updating it 60 times a second
 * through setState would do exactly that on every pointer move. */
type EngineState = {
  px: number[]; py: number[]; // current pointer-driven band offsets
  tx: number[]; ty: number[]; // target offsets, lerped toward each frame
  ax: number; ay: number; tax: number; tay: number; // anchor counter-drift
  lx: number; ly: number; tlx: number; tly: number; // lens position
  scrollEase: number;
  vw: number; vh: number; baseAmp: number; scrollCap: number;
  lensW: number; lensH: number;
  pointerSeen: boolean;
  engineOn: boolean;
  running: boolean;
};

function createEngineState(): EngineState {
  return {
    px: [0, 0, 0, 0], py: [0, 0, 0, 0],
    tx: [0, 0, 0, 0], ty: [0, 0, 0, 0],
    ax: 0, ay: 0, tax: 0, tay: 0,
    lx: -300, ly: -300, tlx: -300, tly: -300,
    scrollEase: 0,
    vw: 0, vh: 0, baseAmp: 46, scrollCap: 800,
    lensW: 96, lensH: 62,
    pointerSeen: false,
    engineOn: false,
    running: false,
  };
}

/*
 * Client Component: renders and drives the actual interactive subtree —
 * the four bands, their ember "inspection" twins, the name anchor, and
 * the pointer-follow lens. See HeroG.tsx for why this whole subtree is
 * one Client Component rather than split further.
 *
 * Every DOM node the animation loop touches is a ref, not state — per
 * the migration guide's rule, position/opacity/clip-path updates happen
 * by writing directly to element.style through these refs, bypassing
 * React's render cycle entirely, because nothing here needs a re-render
 * on every pointer or scroll frame.
 */
export function HeroGInteractive({ content, loaderSessionKey }: HeroGInteractiveProps) {
  const { bands, name, statementLines, ctaLabel, ctaHref, meta } = content;

  const bandRefs = useRef<(HTMLParagraphElement | null)[]>([null, null, null, null]);
  const twinRefs = useRef<(HTMLParagraphElement | null)[]>([null, null, null, null]);
  const fieldXRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const anchorInRef = useRef<HTMLDivElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const lensLabelRef = useRef<HTMLSpanElement | null>(null);

  const engineRef = useRef<EngineState>(createEngineState());
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const heroElMaybe = document.getElementById("hero-g");
    if (!heroElMaybe) return;
    // Rebound to a non-null const: TypeScript won't carry the null-check
    // above across the nested heroFrame() declaration below, since that
    // function is called later (via rAF), not in the same synchronous
    // pass — this local has a definite HTMLElement type everywhere it's
    // captured by a closure.
    const heroEl: HTMLElement = heroElMaybe;

    /* === Band 2 / anchor alignment ===
     * Geometric layout, not motion: "Playable Worlds" plus mandatory
     * edge overshoot is wider than any viewport, so this derives band
     * 2's offset so its word gap sits behind the name anchor — "Play"
     * reads clean on the left, "Worlds" emerges complete on the right.
     * Runs regardless of reduced motion (it's positioning, not an
     * animation), and again once the display font finishes loading,
     * since font metrics change the measured text width. */
    function alignBand2() {
      const b2 = bandRefs.current[1];
      const t2 = twinRefs.current[1];
      const anchorEl = anchorRef.current;
      if (!b2 || !t2 || !anchorEl || !b2.firstChild) return;

      if (window.innerWidth < 1024) {
        b2.style.marginLeft = "";
        t2.style.marginLeft = "";
        anchorEl.style.setProperty("--anchor-shift", "0px");
        return;
      }

      b2.style.marginLeft = "0px";
      anchorEl.style.setProperty("--anchor-shift", "0px");

      const range = document.createRange();
      const textLen = b2.firstChild.textContent?.length ?? 0;
      range.setStart(b2.firstChild, 0);
      range.setEnd(b2.firstChild, Math.min(WORD1_CHARS, textLen));
      const w1 = range.getBoundingClientRect().width;
      const bandW = b2.getBoundingClientRect().width;
      const iw = window.innerWidth;

      const amp2 = Math.min(70, Math.max(30, iw * 0.032)) * 0.5;
      const margin = Math.round(amp2 + 16);
      let maxL = -margin;
      let minL = iw + margin - bandW;
      if (minL > maxL) {
        const mid = (minL + maxL) / 2;
        minL = mid;
        maxL = mid;
      }

      let l = anchorEl.getBoundingClientRect().right + 10 - w1;
      if (l > maxL) {
        const shift = Math.min(l - maxL, iw * 0.08);
        anchorEl.style.setProperty("--anchor-shift", `${-shift}px`);
        l = maxL;
      } else if (l < minL) {
        l = minL;
      }
      b2.style.marginLeft = `${l.toFixed(1)}px`;
      t2.style.marginLeft = `${l.toFixed(1)}px`;
    }

    alignBand2();
    window.addEventListener("resize", alignBand2);
    let fontsCancelled = false;
    document.fonts?.ready
      .then(() => {
        if (!fontsCancelled) alignBand2();
      })
      .catch(() => {});

    /* === Opening loader continuation ===
     * The bootstrap script (HeroG.tsx) already decided whether to show
     * the loader and inserted its markup before hydration; this effect
     * only picks up the tick from there, exactly mirroring
     * js/portfolio.js's loader section. sessionStorage and
     * requestAnimationFrame are both browser-only APIs — this is the
     * reason this whole loader continuation has to live in a Client
     * Component's effect rather than in the Server Component that could
     * otherwise have owned this content. */
    let loaderRafId: number | null = null;
    let loaderTimeoutId: number | undefined;
    const overlay = document.getElementById("hg-loader");

    if (overlay && html.classList.contains("hg-pending")) {
      const countEl = document.getElementById("hg-loader-count");
      const t0 = performance.now();
      let fontsReady = false;
      document.fonts?.ready.then(() => { fontsReady = true; }).catch(() => {});

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        overlay.classList.add(styles.loaderExit);
        html.classList.remove("hg-pending");
        html.classList.add("hg-ready");
        try {
          sessionStorage.setItem(loaderSessionKey, "1");
        } catch {
          /* sessionStorage unavailable (private mode, disabled storage) —
             the loader still exits and the hero still becomes ready. */
        }
        window.setTimeout(() => {
          overlay.parentNode?.removeChild(overlay);
        }, 420);
      };

      /* rAF is throttled in hidden tabs, so a tab opened in the
         background could otherwise never reach a tick that calls
         finish(); this fail-safe fires regardless of tab visibility. */
      loaderTimeoutId = window.setTimeout(finish, MAX_LOADER_MS + 250);

      const tick = () => {
        const elapsed = performance.now() - t0;
        let pct: number;
        if (elapsed >= MAX_LOADER_MS) {
          pct = 100;
        } else if (fontsReady) {
          pct = elapsed >= MIN_LOADER_MS ? 100 : Math.round((elapsed / MIN_LOADER_MS) * 100);
        } else {
          pct = Math.min(96, Math.round((elapsed / MAX_LOADER_MS) * 100));
        }
        if (countEl) countEl.textContent = String(pct).padStart(2, "0");
        if (pct >= 100) {
          finish();
        } else {
          loaderRafId = requestAnimationFrame(tick);
        }
      };
      loaderRafId = requestAnimationFrame(tick);
    }

    /* Reduced motion (or no-JS, which never reaches here at all): the
       bootstrap script never added "hg-can-animate", so the interactive
       engine below never starts — the hero stays the complete static
       composition CSS already renders. Only the geometric alignment and
       loader-continuation above still apply. */
    if (!html.classList.contains("hg-can-animate")) {
      return () => {
        window.removeEventListener("resize", alignBand2);
        fontsCancelled = true;
        if (loaderRafId !== null) cancelAnimationFrame(loaderRafId);
        if (loaderTimeoutId !== undefined) clearTimeout(loaderTimeoutId);
      };
    }

    /* === Pointer/scroll/lens engine ===
     * One requestAnimationFrame loop drives pointer counter-displacement,
     * the scroll handoff, and the inspection lens together, since all
     * three move the same band elements in the same frame. It sleeps
     * whenever every lerp has settled (heroFrame stops re-scheduling
     * itself) and wakes again on the next pointer/scroll event — never a
     * perpetual loop. */
    const engine = engineRef.current;
    const finePointerMql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wideViewMql = window.matchMedia("(min-width: 1024px)");

    function lensAllowed() {
      return finePointerMql.matches && wideViewMql.matches;
    }

    function syncLens() {
      if (lensAllowed()) {
        html.classList.add("hg-lens-on");
      } else {
        html.classList.remove("hg-lens-on");
        lensRef.current?.classList.remove(styles.lensLive);
        engine.pointerSeen = false;
      }
    }

    function heroMeasure() {
      engine.vw = window.innerWidth;
      engine.vh = window.innerHeight;
      engine.baseAmp = Math.min(70, Math.max(30, engine.vw * 0.032));
      engine.scrollCap = Math.max(1, engine.vh * 0.9);
      engine.lensW = Math.round(Math.min(110, Math.max(72, engine.vw * 0.058)));
      engine.lensH = Math.round(engine.lensW * 0.64);
      if (lensRef.current) {
        lensRef.current.style.width = `${engine.lensW}px`;
        lensRef.current.style.height = `${engine.lensH}px`;
      }
    }

    function heroWake() {
      if (!engine.engineOn || engine.running) return;
      engine.running = true;
      rafIdRef.current = requestAnimationFrame(heroFrame);
    }

    function onHeroPointerMove(ev: MouseEvent) {
      if (!lensAllowed()) return;
      const nx = (ev.clientX / engine.vw - 0.5) * 2;
      const ny = (ev.clientY / engine.vh - 0.5) * 2;
      for (let i = 0; i < 4; i++) {
        engine.tx[i] = nx * engine.baseAmp * AMP_X[i] * DIR_X[i];
        engine.ty[i] = ny * 11 * AMP_Y[i] * DIR_Y[i];
      }
      engine.tax = nx * -10;
      engine.tay = ny * -6;
      engine.tlx = ev.clientX;
      engine.tly = ev.clientY;
      if (!engine.pointerSeen) {
        engine.pointerSeen = true;
        engine.lx = ev.clientX; // no fly-in from the corner
        engine.ly = ev.clientY;
        lensRef.current?.classList.add(styles.lensLive);
      }
      heroWake();
    }

    function onHeroPointerLeave() {
      for (let i = 0; i < 4; i++) {
        engine.tx[i] = 0;
        engine.ty[i] = 0;
      }
      engine.tax = 0;
      engine.tay = 0;
      lensRef.current?.classList.remove(styles.lensLive);
      if (fieldXRef.current) fieldXRef.current.style.visibility = "hidden";
      engine.pointerSeen = false;
      heroWake();
    }

    function heroFrame() {
      let moving = false;
      const k = 0.075;

      for (let i = 0; i < 4; i++) {
        let d = engine.tx[i] - engine.px[i];
        engine.px[i] += d * k;
        if (Math.abs(d) > 0.08) moving = true;
        d = engine.ty[i] - engine.py[i];
        engine.py[i] += d * k;
        if (Math.abs(d) > 0.08) moving = true;
      }
      let d = engine.tax - engine.ax;
      engine.ax += d * k;
      if (Math.abs(d) > 0.08) moving = true;
      d = engine.tay - engine.ay;
      engine.ay += d * k;
      if (Math.abs(d) > 0.08) moving = true;
      d = engine.tlx - engine.lx;
      engine.lx += d * 0.16;
      if (Math.abs(d) > 0.2) moving = true;
      d = engine.tly - engine.ly;
      engine.ly += d * 0.16;
      if (Math.abs(d) > 0.2) moving = true;

      const p = Math.min(1, Math.max(0, window.scrollY / engine.scrollCap));
      const eased = heroSmoothstep(p);
      d = eased - engine.scrollEase;
      engine.scrollEase += d * 0.2;
      if (Math.abs(d) > 0.002) moving = true;

      /* Bands: pointer displacement + scroll-handoff separation, both twins. */
      for (let i = 0; i < 4; i++) {
        const x = engine.px[i] + engine.vw * SCROLL_X[i] * engine.scrollEase;
        const transform = `translate3d(${x.toFixed(2)}px, ${engine.py[i].toFixed(2)}px, 0)`;
        const opacity = String(BASE_O[i] * Math.max(0, 1 - engine.scrollEase * 0.9));
        const baseBand = bandRefs.current[i];
        const twinBand = twinRefs.current[i];
        if (baseBand) {
          baseBand.style.transform = transform;
          baseBand.style.opacity = opacity;
        }
        if (twinBand) twinBand.style.transform = transform;
      }

      /* Anchor: counter-drift, then resolves out; CTA bridges longest.
         Inline styles are cleared at rest so the ink-backed knockout is
         never a composited layer while idle. */
      const anchorIn = anchorInRef.current;
      const ctaRow = ctaRowRef.current;
      const metaEl = metaRef.current;
      const aFade = heroSmoothstep((p - 0.25) / 0.5);
      const anchorIdle = Math.abs(engine.ax) < 0.15 && Math.abs(engine.ay) < 0.15 && engine.scrollEase < 0.002;
      if (anchorIn && ctaRow && metaEl) {
        if (anchorIdle) {
          anchorIn.style.transform = "";
          anchorIn.style.opacity = "";
          ctaRow.style.transform = "";
          ctaRow.style.opacity = "";
          metaEl.style.opacity = "";
        } else {
          anchorIn.style.opacity = String(1 - aFade);
          anchorIn.style.transform = `translate3d(${engine.ax.toFixed(2)}px, ${(engine.ay - 30 * aFade).toFixed(2)}px, 0)`;
          const cFade = heroSmoothstep((p - 0.6) / 0.4);
          ctaRow.style.opacity = String(1 - cFade);
          ctaRow.style.transform = `translate3d(${engine.ax.toFixed(2)}px, ${(engine.ay + 8 * engine.scrollEase).toFixed(2)}px, 0)`;
          metaEl.style.opacity = String(Math.max(0, 1 - engine.scrollEase * 1.2));
        }
      }

      /* Lens: rectangular inspection window over the ember layer. Hidden
         once the pointer leaves the hero so the section below keeps a
         single, native cursor. */
      if (html.classList.contains("hg-lens-on") && engine.pointerSeen) {
        const lens = lensRef.current;
        const fieldX = fieldXRef.current;
        const lensLabelEl = lensLabelRef.current;
        if (lens && fieldX) {
          const left = engine.lx - engine.lensW / 2;
          const top = engine.ly - engine.lensH / 2;
          lens.style.transform = `translate3d(${left.toFixed(2)}px, ${top.toFixed(2)}px, 0)`;
          const hr = heroEl.getBoundingClientRect();
          const lensInHero = engine.tly <= hr.bottom;
          lens.classList.toggle(styles.lensLive, lensInHero);
          fieldX.style.visibility = lensInHero ? "visible" : "hidden";
          const ct = Math.max(0, top - hr.top);
          const cl = Math.max(0, left - hr.left);
          const cr = Math.max(0, hr.width - (left - hr.left + engine.lensW));
          const cb = Math.max(0, hr.height - (top - hr.top + engine.lensH));
          fieldX.style.clipPath = `inset(${ct.toFixed(1)}px ${cr.toFixed(1)}px ${cb.toFixed(1)}px ${cl.toFixed(1)}px)`;

          let label = "";
          const cxp = engine.lx;
          const cyp = engine.ly;
          const ar = anchorIn?.getBoundingClientRect();
          const overAnchor =
            !!ar && aFade < 0.9 && cxp >= ar.left && cxp <= ar.right && cyp >= ar.top && cyp <= ar.bottom;
          if (!overAnchor) {
            for (let i = 0; i < 4; i++) {
              const baseBand = bandRefs.current[i];
              if (!baseBand) continue;
              const br = baseBand.getBoundingClientRect();
              if (cyp >= br.top && cyp <= br.bottom && cxp >= br.left && cxp <= br.right) {
                label = bands[i]?.label ?? "";
                break;
              }
            }
          }
          if (lensLabelEl) lensLabelEl.textContent = label;
        }
      }

      if (moving) {
        rafIdRef.current = requestAnimationFrame(heroFrame);
      } else {
        engine.running = false;
        rafIdRef.current = null;
      }
    }

    function onEngineResize() {
      heroMeasure();
      syncLens();
      heroWake();
    }
    function onMediaChange() {
      syncLens();
      heroWake();
    }

    function heroStart() {
      engine.engineOn = true;
      heroMeasure();
      syncLens();
      document.addEventListener("mousemove", onHeroPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onHeroPointerLeave);
      window.addEventListener("scroll", heroWake, { passive: true });
      window.addEventListener("resize", onEngineResize);
      finePointerMql.addEventListener("change", onMediaChange);
      wideViewMql.addEventListener("change", onMediaChange);
      heroWake();
    }

    /* Hold the engine until the entrance settles so JS transforms never
       fight the one-shot CSS reveal animations. */
    let armTimeoutId: number | undefined;
    function armHeroEngine() {
      const delay = html.classList.contains("hg-ready") ? 950 : 250;
      if (html.classList.contains("hg-ready")) {
        armTimeoutId = window.setTimeout(heroStart, delay);
      } else {
        armTimeoutId = window.setTimeout(armHeroEngine, delay);
      }
    }
    armHeroEngine();

    return () => {
      window.removeEventListener("resize", alignBand2);
      fontsCancelled = true;
      if (loaderRafId !== null) cancelAnimationFrame(loaderRafId);
      if (loaderTimeoutId !== undefined) clearTimeout(loaderTimeoutId);
      if (armTimeoutId !== undefined) clearTimeout(armTimeoutId);
      document.removeEventListener("mousemove", onHeroPointerMove);
      document.documentElement.removeEventListener("mouseleave", onHeroPointerLeave);
      window.removeEventListener("scroll", heroWake);
      window.removeEventListener("resize", onEngineResize);
      finePointerMql.removeEventListener("change", onMediaChange);
      wideViewMql.removeEventListener("change", onMediaChange);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      engine.engineOn = false;
      engine.running = false;
    };
  }, [bands, loaderSessionKey]);

  return (
    <>
      <div className={styles.heroGrain} aria-hidden="true" />

      <div className={styles.field} aria-hidden="true">
        {bands.map((band, i) => (
          <p
            key={band.id}
            ref={(el) => {
              bandRefs.current[i] = el;
            }}
            className={`${styles.band} ${styles[band.id]}`}
            data-label={band.label}
          >
            {band.text}
          </p>
        ))}
      </div>
      <div className={`${styles.field} ${styles.fieldX}`} aria-hidden="true" ref={fieldXRef}>
        {bands.map((band, i) => (
          <p
            key={band.id}
            ref={(el) => {
              twinRefs.current[i] = el;
            }}
            className={`${styles.band} ${styles[band.id]}`}
          >
            {band.text}
          </p>
        ))}
      </div>

      <div className={styles.anchor} ref={anchorRef}>
        <div className={styles.anchorIn} ref={anchorInRef}>
          <h1 className={styles.anchorName}>{name}</h1>
          <p className="sr-only">
            Interactive systems. Playable worlds. Research-led experiences. Built
            around human behaviour.
          </p>
          <p className={styles.anchorStatement}>
            {statementLines.map((line) => (
              <span key={line} className={styles.stmtLine}>
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className={styles.anchorCtaRow} ref={ctaRowRef}>
          <a className={styles.heroCta} href={ctaHref} data-cursor="View">
            {ctaLabel} <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <p className={styles.heroMeta} ref={metaRef}>
        <strong>{meta.degree}</strong>
        <br />
        {meta.institution}
        <br />
        {meta.location}
      </p>

      <div className={styles.lens} ref={lensRef} aria-hidden="true">
        <span className={styles.lensLabel} ref={lensLabelRef} />
      </div>
    </>
  );
}
