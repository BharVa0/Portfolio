(function () {
  "use strict";

  /* This runs at the end of <body>, after the early inline script in
     index.html has already set html.pending/ready/can-animate/
     has-custom-cursor and (if applicable) inserted the #hs-loader
     overlay. That split exists so those flags land before the hero
     paints, while everything here that queries real content (hero
     image, .reveal sections, [data-cursor] links) runs once that
     content actually exists in the DOM. */

  var html = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* === Opening loader (0-100) === */
  var LOADER_FLAG = "hs-loader-seen";
  var MIN_MS = 800;
  var MAX_MS = 1400;
  var overlay = document.getElementById("hs-loader");

  function decodeHeroImage() {
    var img = document.querySelector(".hero-frame img");
    if (!img) return Promise.resolve();
    if (img.complete && img.naturalWidth) return Promise.resolve();
    if (img.decode) return img.decode().catch(function () {});
    return new Promise(function (resolve) {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }

  function fontsReady() {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve();
    return document.fonts.ready.catch(function () {});
  }

  if (overlay && html.classList.contains("pending")) {
    var countEl = overlay.querySelector("#loader-count");
    var t0 = performance.now();
    var ready = false;

    Promise.all([fontsReady(), decodeHeroImage()]).then(function () {
      ready = true;
    });

    var finish = function () {
      overlay.classList.add("exit");
      html.classList.remove("pending");
      html.classList.add("ready");
      try { sessionStorage.setItem(LOADER_FLAG, "1"); } catch (e) {}
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 420);
    };

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
})();
