(function () {
  "use strict";

  /* This runs at the end of <body>, after the early inline script in
     index.html has already set html.pending/ready/can-animate/
     has-custom-cursor and (if applicable) inserted the #hs-loader
     overlay. That split exists so those flags land before the hero
     paints, while everything here that queries real content (hero
     field, .reveal sections, [data-cursor] links) runs once that
     content actually exists in the DOM. */

  var html = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* === Opening loader (0-100) === */
  var LOADER_FLAG = "hs-loader-seen";
  var MIN_MS = 800;
  var MAX_MS = 1400;
  var overlay = document.getElementById("hs-loader");

  function fontsReady() {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve();
    return document.fonts.ready.catch(function () {});
  }

  if (overlay && html.classList.contains("pending")) {
    var countEl = overlay.querySelector("#loader-count");
    var t0 = performance.now();
    var ready = false;

    fontsReady().then(function () {
      ready = true;
    });

    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      overlay.classList.add("exit");
      html.classList.remove("pending");
      html.classList.add("ready");
      try { sessionStorage.setItem(LOADER_FLAG, "1"); } catch (e) {}
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 420);
    };
    /* rAF is throttled in hidden tabs, so a tab opened in the background
       could otherwise never reach the tick that calls finish(); this
       fail-safe fires regardless of rAF/tab visibility. */
    setTimeout(finish, MAX_MS + 250);

    var tick = function () {
      var elapsed = performance.now() - t0;
      var pct;
      if (elapsed >= MAX_MS) {
        pct = 100;
      } else if (ready) {
        pct = elapsed >= MIN_MS ? 100 : Math.round((elapsed / MIN_MS) * 100);
      } else {
        pct = Math.min(96, Math.round((elapsed / MAX_MS) * 100));
      }
      countEl.textContent = String(pct).length < 2 ? "0" + pct : String(pct);
      if (pct >= 100) {
        finish();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  /* === Reveal-on-scroll entrances === */
  if (html.classList.contains("can-animate")) {
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      /* threshold is a ratio of the *target's own* area, not the
         viewport's — for a .proj-section taller than the viewport
         (evidence grids, card grids, etc. all count toward its height)
         a ratio like 0.15 can demand more visible pixels than a short
         viewport ever shows, so the section never reveals. threshold:0
         fires on first intersecting pixel instead; rootMargin still
         holds it off until content is meaningfully on screen. */
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }
  }

  /* === Desktop-only contextual cursor ===
     Re-evaluated on change (not just at parse time) so a hybrid device —
     a touchscreen laptop with a mouse plugged in mid-session — doesn't
     get stuck with a stale cursor state. cursor:none is applied via the
     .cursor-ready class only once .cursor-dot actually exists, so there's
     no gap where the native cursor is hidden but nothing has replaced it. */
  var cursorMql = window.matchMedia("(hover: hover) and (pointer: fine)");
  var dot = null, labelEl = null, cursorRunning = false, hoverBound = false;
  var targetX = -100, targetY = -100, curX = -100, curY = -100;
  var bridgeHover = false; /* pointer currently inside a bridged iframe */
  var bridgedStyles = [];  /* <style> tags injected into bridged iframes */

  function onMouseMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (bridgeHover) {
      /* Pointer is back over the parent document — hand control back
         from the iframe bridge and drop its PLAY ring. */
      bridgeHover = false;
      if (dot) {
        dot.classList.remove("ring");
        if (labelEl) labelEl.textContent = "";
      }
    }
  }

  function cursorTick() {
    if (!cursorRunning) return;
    curX += (targetX - curX) * 0.25;
    curY += (targetY - curY) * 0.25;
    dot.style.transform = "translate(" + curX + "px, " + curY + "px) translate(-50%, -50%)";
    requestAnimationFrame(cursorTick);
  }

  function onHoverEnter(el) {
    return function () {
      dot.classList.add("ring");
      labelEl.textContent = el.getAttribute("data-cursor") || "";
    };
  }
  function onHoverLeave() {
    dot.classList.remove("ring");
    labelEl.textContent = "";
  }

  function createCursor() {
    if (dot || reducedMotion) return;
    dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.innerHTML = '<span class="cursor-label mono"></span>';
    document.body.appendChild(dot);
    labelEl = dot.querySelector(".cursor-label");
    html.classList.add("cursor-ready");

    window.addEventListener("mousemove", onMouseMove);
    cursorRunning = true;
    requestAnimationFrame(cursorTick);
    /* Wire (or re-wire) same-origin embed bridges now that a dot exists */
    document.querySelectorAll("iframe[data-cursor-bridge]").forEach(function (frame) {
      bindBridge(frame);
    });

    if (!hoverBound) {
      hoverBound = true;
      document.querySelectorAll("[data-cursor]").forEach(function (el) {
        el.addEventListener("mouseenter", onHoverEnter(el));
        el.addEventListener("mouseleave", onHoverLeave);
      });
    }
  }

  function destroyCursor() {
    if (!dot) return;
    cursorRunning = false;
    window.removeEventListener("mousemove", onMouseMove);
    html.classList.remove("cursor-ready");
    dot.parentNode.removeChild(dot);
    dot = null;
    labelEl = null;
    releaseBridges(); /* restore native cursor inside bridged iframes */
  }

  function syncCursor(matches) {
    if (matches && !reducedMotion) {
      html.classList.add("has-custom-cursor");
      createCursor();
    } else {
      html.classList.remove("has-custom-cursor");
      destroyCursor();
    }
  }

  if (html.classList.contains("has-custom-cursor")) createCursor();
  if (cursorMql.addEventListener) {
    cursorMql.addEventListener("change", function (e) { syncCursor(e.matches); });
  }

  /* === Suspend the cursor over iframes/videos/embeds ===
     Iframes (and native video controls) are their own document/UI —
     the parent stops receiving mousemove the instant the pointer
     crosses in, so without this the dot is left frozen on top of the
     embed instead of tracking it. No cross-document tracking is
     attempted: the dot just hides on entry and resumes tracking once
     the pointer is back over the parent document. Bound unconditionally
     (not only while a cursor currently exists) so it also applies the
     moment a fine pointer becomes eligible mid-session. */
  function suspendCursor(e) {
    /* A bridged same-origin iframe drives the dot itself — never hide it. */
    if (e.currentTarget && e.currentTarget.hasAttribute("data-bridge-active")) return;
    if (dot) dot.classList.add("embed-hidden");
  }
  function resumeCursor() {
    if (dot) dot.classList.remove("embed-hidden");
  }
  document.querySelectorAll("iframe, video").forEach(function (el) {
    el.addEventListener("mouseenter", suspendCursor);
    el.addEventListener("mouseleave", resumeCursor);
  });

  /* === Same-origin cursor bridge (BETTR live build only) ===
     Cross-origin embeds (Figma, Kaltura) can never expose their
     documents, so they keep the suspend/resume behaviour above. The
     BETTR build is served from this site's own origin, so its document
     is scriptable: pointermove inside the iframe is translated into
     parent-viewport coordinates and drives the same cursor dot with a
     PLAY ring. The iframe's own pointer is hidden only AFTER listeners
     are attached; any failure leaves the native cursor untouched.
     Opt-in via data-cursor-bridge on the iframe. Rebinds on every load
     because the build navigates between its own internal pages. */

  function releaseBridges() {
    bridgedStyles.forEach(function (entry) {
      try {
        if (entry.style.parentNode) entry.style.parentNode.removeChild(entry.style);
        entry.frame.removeAttribute("data-bridge-active");
      } catch (err) { /* frame gone or navigated — nothing to restore */ }
    });
    bridgedStyles = [];
  }

  function bindBridge(frame) {
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.documentElement) return;

      if (!doc.__hsBridgeBound) {
        doc.__hsBridgeBound = true;
        var verb = frame.getAttribute("data-cursor") || "Play";
        doc.addEventListener("pointermove", function (e) {
          if (!dot) return;
          var r = frame.getBoundingClientRect();
          targetX = r.left + e.clientX;
          targetY = r.top + e.clientY;
          bridgeHover = true;
          dot.classList.remove("embed-hidden");
          dot.classList.add("ring");
          if (labelEl) labelEl.textContent = verb;
        }, { passive: true });
      }

      /* Hide the iframe's native pointer only now that the bridge is
         live. Removed again if the custom cursor is ever torn down;
         re-injected here if the cursor comes back mid-session. */
      if (!doc.__hsBridgeStyle || !doc.__hsBridgeStyle.parentNode) {
        var style = doc.createElement("style");
        style.textContent = "html, body, a, button, input, [role='button'] { cursor: none !important; }";
        (doc.head || doc.documentElement).appendChild(style);
        doc.__hsBridgeStyle = style;
        bridgedStyles.push({ frame: frame, style: style });
      }
      frame.setAttribute("data-bridge-active", "1");
    } catch (err) {
      /* Same-origin access failed — native cursor fallback, and the
         generic suspend/resume handlers still apply. */
    }
  }

  document.querySelectorAll("iframe[data-cursor-bridge]").forEach(function (frame) {
    frame.addEventListener("load", function () {
      frame.removeAttribute("data-bridge-active");
      if (dot) bindBridge(frame);
    });
    if (dot) bindBridge(frame); /* already loaded before we ran */
  });

  /* === Homepage hero — Hero G, "Kinetic Thesis Field" ===
     Guarded: this file is shared by every page, but only the homepage
     carries the hero markup. One rAF loop drives pointer counter-
     displacement, the scroll handoff and the inspection lens; it sleeps
     whenever every lerp has settled and wakes on input — no perpetual
     animation. Adapted from the approved v2-preview/hero-g-kinetic-
     thesis/ prototype; behaviour is unchanged from that build except
     where noted (lens-on suspends the site-wide cursor dot above,
     instead of running its own separate cursor). */
  (function () {
    var heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    var heroCanAnimate = html.classList.contains("can-animate");

    /* Band 2 word-gap alignment: "PLAYABLE WORLDS" plus mandatory edge
       overshoot is wider than any viewport, so this derives band 2's
       offset each layout so the word gap sits behind the name anchor —
       "PLAY" reads clean on the left, "WORLDS" emerges complete on the
       right. Geometric layout, not motion, so it runs under reduced
       motion too; no-JS keeps the CSS approximation. */
    var alignBand2 = (function () {
      var b2 = document.querySelector(".field:not(.field-x) .b2");
      var t2 = document.querySelector(".field-x .b2");
      var anchorAlignEl = document.querySelector(".anchor");
      var WORD1_CHARS = 9; /* "Playable " */
      return function () {
        if (window.innerWidth < 1024) {
          b2.style.marginLeft = ""; t2.style.marginLeft = "";
          anchorAlignEl.style.setProperty("--anchor-shift", "0px");
          return;
        }
        b2.style.marginLeft = "0px";
        anchorAlignEl.style.setProperty("--anchor-shift", "0px");
        var range = document.createRange();
        range.setStart(b2.firstChild, 0);
        range.setEnd(b2.firstChild, WORD1_CHARS);
        var w1 = range.getBoundingClientRect().width;
        var bandW = b2.getBoundingClientRect().width;
        var iw = window.innerWidth;
        /* min crop each side must survive band 2's max pointer travel */
        var amp2 = Math.min(70, Math.max(30, iw * 0.032)) * 0.5;
        var margin = Math.round(amp2 + 16);
        var maxL = -margin;
        var minL = iw + margin - bandW;
        if (minL > maxL) { minL = maxL = (minL + maxL) / 2; }
        var L = (anchorAlignEl.getBoundingClientRect().right + 10) - w1;
        if (L > maxL) {
          var shift = Math.min(L - maxL, iw * 0.08);
          anchorAlignEl.style.setProperty("--anchor-shift", (-shift) + "px");
          L = maxL;
        } else if (L < minL) {
          L = minL;
        }
        b2.style.marginLeft = L.toFixed(1) + "px";
        t2.style.marginLeft = L.toFixed(1) + "px";
      };
    })();
    alignBand2();
    window.addEventListener("resize", alignBand2);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignBand2).catch(function () {});
    }

    if (!heroCanAnimate) return; /* reduced motion: complete static composition */

    var hero = heroSection;
    var baseBands = Array.prototype.slice.call(document.querySelectorAll(".field:not(.field-x) .band"));
    var twinBands = Array.prototype.slice.call(document.querySelectorAll(".field-x .band"));
    var fieldX = document.querySelector(".field-x");
    var anchorIn = document.querySelector(".anchor-in");
    var ctaRow = document.querySelector(".anchor-cta-row");
    var metaEl = document.querySelector(".hero-meta");
    var lens = document.getElementById("lens");
    var lensLabel = document.getElementById("lens-label");

    /* Per-band character: alternating pointer direction, varied amplitude,
       varied scroll-handoff direction and rate. */
    var DIR_X = [-1, 1, -1, 1];
    var BASE_O = [1, 1, 0.92, 1]; /* keep b3's authored resting opacity */
    var AMP_X = [1, 0.5, 0.75, 1.14];
    var DIR_Y = [1, -1, 1, -1];
    var AMP_Y = [0.55, 1, 0.7, 1.2];
    var SCROLL_X = [-0.16, 0.12, -0.08, 0.14]; /* × viewport width */

    var vw = window.innerWidth, vh = window.innerHeight;
    var baseAmp = 46, scrollCap = 800;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    var wideView = window.matchMedia("(min-width: 1024px)");

    var px = [0, 0, 0, 0], py = [0, 0, 0, 0];        /* current pointer offsets */
    var tx = [0, 0, 0, 0], ty = [0, 0, 0, 0];        /* target pointer offsets */
    var ax = 0, ay = 0, tax = 0, tay = 0;            /* anchor counter-drift */
    var lx = -300, ly = -300, tlx = -300, tly = -300; /* lens position */
    var lensW = 96, lensH = 62;
    var scrollEase = 0;
    var pointerSeen = false;
    var engineOn = false;   /* held off until the entrance settles */
    var running = false;

    function heroSmoothstep(t) { return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t); }

    function heroMeasure() {
      vw = window.innerWidth; vh = window.innerHeight;
      baseAmp = Math.min(70, Math.max(30, vw * 0.032));
      scrollCap = Math.max(1, vh * 0.9);
      lensW = Math.round(Math.min(110, Math.max(72, vw * 0.058)));
      lensH = Math.round(lensW * 0.64);
      lens.style.width = lensW + "px";
      lens.style.height = lensH + "px";
    }

    function lensAllowed() { return finePointer.matches && wideView.matches; }
    function syncLens() {
      if (lensAllowed()) { html.classList.add("lens-on"); }
      else {
        html.classList.remove("lens-on");
        lens.classList.remove("lens-live");
        pointerSeen = false;
        if (dot) dot.classList.remove("embed-hidden");
      }
    }

    function onHeroPointerMove(e) {
      if (!lensAllowed()) return;
      var nx = (e.clientX / vw - 0.5) * 2;
      var ny = (e.clientY / vh - 0.5) * 2;
      for (var i = 0; i < 4; i++) {
        tx[i] = nx * baseAmp * AMP_X[i] * DIR_X[i];
        ty[i] = ny * 11 * AMP_Y[i] * DIR_Y[i];
      }
      tax = nx * -10; tay = ny * -6;
      tlx = e.clientX; tly = e.clientY;
      if (!pointerSeen) {
        pointerSeen = true;
        lx = e.clientX; ly = e.clientY; /* no fly-in from the corner */
        lens.classList.add("lens-live");
      }
      heroWake();
    }
    function onHeroPointerLeave() {
      for (var i = 0; i < 4; i++) { tx[i] = 0; ty[i] = 0; }
      tax = 0; tay = 0;
      lens.classList.remove("lens-live");
      fieldX.style.visibility = "hidden";
      pointerSeen = false;
      if (dot) dot.classList.remove("embed-hidden");
      heroWake();
    }

    function heroFrame() {
      var moving = false;
      var k = 0.075, i, d;

      for (i = 0; i < 4; i++) {
        d = tx[i] - px[i]; px[i] += d * k; if (Math.abs(d) > 0.08) moving = true;
        d = ty[i] - py[i]; py[i] += d * k; if (Math.abs(d) > 0.08) moving = true;
      }
      d = tax - ax; ax += d * k; if (Math.abs(d) > 0.08) moving = true;
      d = tay - ay; ay += d * k; if (Math.abs(d) > 0.08) moving = true;
      d = tlx - lx; lx += d * 0.16; if (Math.abs(d) > 0.2) moving = true;
      d = tly - ly; ly += d * 0.16; if (Math.abs(d) > 0.2) moving = true;

      var p = Math.min(1, Math.max(0, window.scrollY / scrollCap));
      var e = heroSmoothstep(p);
      d = e - scrollEase; scrollEase += d * 0.2; if (Math.abs(d) > 0.002) moving = true;

      /* Bands: pointer displacement + handoff separation, both twins. */
      for (i = 0; i < 4; i++) {
        var x = px[i] + vw * SCROLL_X[i] * scrollEase;
        var t = "translate3d(" + x.toFixed(2) + "px, " + py[i].toFixed(2) + "px, 0)";
        var o = String(BASE_O[i] * Math.max(0, 1 - scrollEase * 0.9));
        baseBands[i].style.transform = t;
        baseBands[i].style.opacity = o;
        twinBands[i].style.transform = t;
      }

      /* Anchor: counter-drift, then resolves out; CTA bridges longest.
         Inline styles are cleared at rest so the ink-backed knockout is
         never a composited layer while idle (layer promotion can tint
         its background a shade lighter — caught in QA). */
      var aFade = heroSmoothstep((p - 0.25) / 0.5);
      var anchorIdle = Math.abs(ax) < 0.15 && Math.abs(ay) < 0.15 && scrollEase < 0.002;
      if (anchorIdle) {
        anchorIn.style.transform = ""; anchorIn.style.opacity = "";
        ctaRow.style.transform = ""; ctaRow.style.opacity = "";
        metaEl.style.opacity = "";
      } else {
        anchorIn.style.opacity = String(1 - aFade);
        anchorIn.style.transform = "translate3d(" + ax.toFixed(2) + "px, " + (ay - 30 * aFade).toFixed(2) + "px, 0)";
        var cFade = heroSmoothstep((p - 0.6) / 0.4);
        ctaRow.style.opacity = String(1 - cFade);
        ctaRow.style.transform = "translate3d(" + ax.toFixed(2) + "px, " + (ay + 8 * scrollEase).toFixed(2) + "px, 0)";
        metaEl.style.opacity = String(Math.max(0, 1 - scrollEase * 1.2));
      }

      /* Lens: rectangular inspection window over the ember layer. This
         lensInHero check is also the single source of truth for the
         site-wide cursor dot's suspension — it's hidden exactly when
         the lens is live, and resumed exactly when the lens is not, so
         the two pointer systems never render at once. Hidden once the
         pointer leaves the hero so the work section keeps a single,
         native cursor. */
      if (html.classList.contains("lens-on") && pointerSeen) {
        var left = lx - lensW / 2, top = ly - lensH / 2;
        lens.style.transform = "translate3d(" + left.toFixed(2) + "px, " + top.toFixed(2) + "px, 0)";
        var hr = hero.getBoundingClientRect();
        var lensInHero = tly <= hr.bottom;
        lens.classList.toggle("lens-live", lensInHero);
        fieldX.style.visibility = lensInHero ? "visible" : "hidden";
        if (dot) dot.classList.toggle("embed-hidden", lensInHero);
        var ct = Math.max(0, top - hr.top);
        var cl = Math.max(0, left - hr.left);
        var cr = Math.max(0, hr.width - (left - hr.left + lensW));
        var cb = Math.max(0, hr.height - (top - hr.top + lensH));
        fieldX.style.clipPath = "inset(" + ct.toFixed(1) + "px " + cr.toFixed(1) + "px " + cb.toFixed(1) + "px " + cl.toFixed(1) + "px)";

        var label = "";
        var cxp = lx, cyp = ly;
        var ar = anchorIn.getBoundingClientRect();
        var overAnchor = aFade < 0.9 && cxp >= ar.left && cxp <= ar.right && cyp >= ar.top && cyp <= ar.bottom;
        if (!overAnchor) {
          for (i = 0; i < 4; i++) {
            var br = baseBands[i].getBoundingClientRect();
            if (cyp >= br.top && cyp <= br.bottom && cxp >= br.left && cxp <= br.right) {
              label = baseBands[i].getAttribute("data-label") || "";
              break;
            }
          }
        }
        lensLabel.textContent = label;
      }

      if (moving) { requestAnimationFrame(heroFrame); } else { running = false; }
    }

    function heroWake() {
      if (!engineOn || running) return;
      running = true;
      requestAnimationFrame(heroFrame);
    }

    function heroStart() {
      engineOn = true;
      heroMeasure();
      syncLens();
      document.addEventListener("mousemove", onHeroPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onHeroPointerLeave);
      window.addEventListener("scroll", heroWake, { passive: true });
      window.addEventListener("resize", function () { heroMeasure(); syncLens(); heroWake(); });
      if (finePointer.addEventListener) {
        finePointer.addEventListener("change", function () { syncLens(); heroWake(); });
        wideView.addEventListener("change", function () { syncLens(); heroWake(); });
      }
      heroWake();
    }

    /* Hold the engine until the entrance settles so JS transforms never
       fight the one-shot CSS reveal animations. */
    function armHeroEngine() {
      var delay = html.classList.contains("ready") ? 950 : 250;
      if (html.classList.contains("ready")) { setTimeout(heroStart, delay); }
      else { setTimeout(armHeroEngine, delay); }
    }
    armHeroEngine();
  })();
})();
