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
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
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

  function onMouseMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
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
})();
