"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import styles from "./MotionCursor.module.css";

export function MotionCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Motion Primitives spring configuration for smooth, responsive cursor physics
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Pointer fine mouse check
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    // 2. Reduced motion check (fallback to native OS cursor)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setMounted(true);

    const handlePointerMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor], [data-cursor-color]"
      );
      setIsHovered(!!interactive);

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

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div
      className={styles.cursorWrapper}
      style={customAccent ? ({ "--cursor-accent": customAccent } as React.CSSProperties) : undefined}
      aria-hidden="true"
    >
      {/* Immediate center dot */}
      <motion.div
        className={`${styles.dot} ${visible ? styles.visible : ""}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Motion Primitives spring trailing ring */}
      <motion.div
        className={`${styles.ring} ${visible ? styles.visible : ""} ${isHovered ? styles.hovered : ""}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </div>
  );
}
