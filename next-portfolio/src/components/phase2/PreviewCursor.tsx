"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PreviewCursor.module.css";

export function PreviewCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // 1. Only mount when pointer is fine mouse
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    // 2. Disable under reduced motion (fallback to native OS cursor)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setMounted(true);

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor], [data-cursor-color]"
      );
      const hovering = !!interactive;
      setIsHovered(hovering);
      isHoveredRef.current = hovering;

      const customColorEl = target.closest<HTMLElement>("[data-cursor-color], [data-cursor-accent]");
      if (customColorEl) {
        const color = customColorEl.dataset.cursorColor || customColorEl.dataset.cursorAccent;
        setCustomAccent(color || null);
      } else {
        const rowAccentEl = target.closest<HTMLElement>("[style*='--row-accent']");
        if (rowAccentEl) {
          const computedAccent = getComputedStyle(rowAccentEl).getPropertyValue("--row-accent").trim();
          setCustomAccent(computedAccent || null);
        } else {
          setCustomAccent(null);
        }
      }
    };

    const handlePointerLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    let rafId: number;
    const animate = () => {
      // Lerp ring position for slight trailing easing
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = isHoveredRef.current ? 1.4 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={styles.cursorWrapper}
      style={customAccent ? ({ "--cursor-accent": customAccent } as React.CSSProperties) : undefined}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className={`${styles.dot} ${visible ? styles.visible : ""}`}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${visible ? styles.visible : ""} ${isHovered ? styles.hovered : ""}`}
      />
    </div>
  );
}
