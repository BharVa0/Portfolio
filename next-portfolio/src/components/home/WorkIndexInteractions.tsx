"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./WorkIndex.module.css";

export function WorkIndexInteractions() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function syncCursor() {
      const enabled = finePointer.matches && !reducedMotion.matches;
      setCursorEnabled(enabled);
      document.documentElement.classList.toggle("wi-cursor-ready", enabled);
    }

    syncCursor();
    reducedMotion.addEventListener("change", syncCursor);
    finePointer.addEventListener("change", syncCursor);

    return () => {
      reducedMotion.removeEventListener("change", syncCursor);
      finePointer.removeEventListener("change", syncCursor);
      document.documentElement.classList.remove("wi-cursor-ready");
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      document.documentElement.classList.remove("wi-can-animate");
      return;
    }

    document.documentElement.classList.add("wi-can-animate");
    const revealElements = document.querySelectorAll<HTMLElement>(
      "[data-work-index-scope][data-reveal], [data-work-index-scope] [data-reveal]",
    );

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add(styles.inView));
      return () => document.documentElement.classList.remove("wi-can-animate");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.inView);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("wi-can-animate");
    };
  }, []);

  useEffect(() => {
    const scopes = document.querySelectorAll<HTMLElement>("[data-work-index-scope]");

    function handlePointerEnter() {
      setPointerInside(true);
    }

    function handlePointerLeave() {
      setPointerInside(false);
      setCursorLabel("");
    }

    function handlePointerMove(event: PointerEvent) {
      if (!cursorEnabled) return;

      targetRef.current = { x: event.clientX, y: event.clientY };
      const target = event.target instanceof Element ? event.target : null;
      const row = target?.closest<HTMLAnchorElement>("a[data-cursor]");
      setCursorLabel(row?.dataset.cursor ?? "");
    }

    scopes.forEach((scope) => {
      scope.addEventListener("pointerenter", handlePointerEnter);
      scope.addEventListener("pointerleave", handlePointerLeave);
      scope.addEventListener("pointermove", handlePointerMove);
    });

    return () => {
      scopes.forEach((scope) => {
        scope.removeEventListener("pointerenter", handlePointerEnter);
        scope.removeEventListener("pointerleave", handlePointerLeave);
        scope.removeEventListener("pointermove", handlePointerMove);
      });
    };
  }, [cursorEnabled]);

  useEffect(() => {
    if (!cursorEnabled) return;

    let frameId = 0;
    function tick() {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.25;
      current.y += (target.y - current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      }
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [cursorEnabled]);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursorDot} ${pointerInside ? styles.cursorVisible : ""} ${cursorLabel ? styles.cursorRing : ""}`}
      aria-hidden="true"
    >
      <span className={styles.cursorLabel}>{cursorLabel}</span>
    </div>
  );
}
