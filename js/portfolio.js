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

  /* === Desktop-only contextual cursor === */
  if (html.classList.contains("has-custom-cursor")) {
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.innerHTML = '<span class="cursor-label mono"></span>';
    document.body.appendChild(dot);
    var labelEl = dot.querySelector(".cursor-label");

    var targetX = -100, targetY = -100, curX = -100, curY = -100;
    window.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    var raf = function () {
      curX += (targetX - curX) * 0.25;
      curY += (targetY - curY) * 0.25;
      dot.style.transform = "translate(" + curX + "px, " + curY + "px) translate(-50%, -50%)";
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    var hoverTargets = document.querySelectorAll("[data-cursor]");
    hoverTargets.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        dot.classList.add("ring");
        labelEl.textContent = el.getAttribute("data-cursor") || "";
      });
      el.addEventListener("mouseleave", function () {
        dot.classList.remove("ring");
        labelEl.textContent = "";
      });
    });
  }
})();
