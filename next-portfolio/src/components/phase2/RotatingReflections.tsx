"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { PROJECT_REFLECTIONS, type ProjectReflection } from "@/data/reflections";
import styles from "./RotatingReflections.module.css";

const GLYPHS = "0123456789_#@*&%/\\~+-=";

interface RotatingReflectionsProps {
  className?: string;
  intervalMs?: number;
}

export function RotatingReflections({
  className = "",
  intervalMs = 6500,
}: RotatingReflectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(PROJECT_REFLECTIONS[0].quote);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const currentItem = PROJECT_REFLECTIONS[currentIndex];

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROJECT_REFLECTIONS.length);
  }, []);

  // Scramble / decrypt animation on quote change
  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplayText(currentItem.quote);
      return;
    }

    const targetText = currentItem.quote;
    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const charsRevealed = Math.floor(progress * targetText.length);

      let result = "";
      for (let i = 0; i < targetText.length; i++) {
        if (i < charsRevealed) {
          result += targetText[i];
        } else if (targetText[i] === " " || targetText[i] === "\n") {
          result += targetText[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex, currentItem]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      advance();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [advance, intervalMs, isPaused]);

  return (
    <div
      className={`${styles.reflectionsWrapper} ${className}`.trim()}
      style={{ "--ref-accent": currentItem.accentColor } as React.CSSProperties}
      onClick={advance}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Rotating project reflections log"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          advance();
        }
      }}
    >
      <div className={styles.reflectionsHeader}>
        <div className={styles.eyebrowGroup}>
          <span className={styles.indicatorDot} aria-hidden="true" />
          <span>OBSERVATION // REFLECTION</span>
          <span>·</span>
          <span className={styles.projectBadge}>{currentItem.projectTitle}</span>
        </div>

        <div className={styles.indicators} aria-hidden="true">
          {PROJECT_REFLECTIONS.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.stepDot} ${idx === currentIndex ? styles.stepDotActive : ""}`}
            />
          ))}
        </div>
      </div>

      <blockquote className={styles.quoteText} aria-live="polite">
        <span className={styles.quotePrefix}>“</span>
        <span>{displayText}”</span>
      </blockquote>

      <div className={styles.sourceFooter}>
        <span className={styles.sourceChapter}>Source: {currentItem.sourceChapter}</span>
        <span className={styles.interactionHint}>Click / Space to advance</span>
      </div>
    </div>
  );
}
