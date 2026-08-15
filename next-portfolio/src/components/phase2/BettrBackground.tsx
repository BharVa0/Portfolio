"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./BettrBackground.module.css";

export function BettrBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Respect reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetOffset.current = {
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      };
    };

    const updateParallax = () => {
      setOffset((prev) => ({
        x: prev.x + (targetOffset.current.x - prev.x) * 0.08,
        y: prev.y + (targetOffset.current.y - prev.y) * 0.08,
      }));
      requestRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    requestRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const accentHex = "#ff6a78";
  const bgHex = "#260a10";

  return (
    <div
      className={styles.persistentBg}
      style={
        {
          "--active-bg": bgHex,
          "--active-accent": accentHex,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className={styles.bgAtmosphere} />

      <svg
        className={styles.bgMotifSvg}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `translate3d(${offset.x * 16}px, ${offset.y * 16}px, 0)`,
        }}
      >
        <defs>
          <radialGradient id="bettrMotifGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accentHex} stopOpacity="0" />
          </radialGradient>

          <pattern id="bettrRadarGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={accentHex} strokeWidth="0.75" strokeOpacity="0.18" />
            <circle cx="0" cy="0" r="2" fill={accentHex} fillOpacity="0.4" />
          </pattern>
        </defs>

        {/* Cursor-reactive ambient glow */}
        <circle cx="1080" cy="360" r="500" fill="url(#bettrMotifGlow)" />

        {/* Profiling Grid SVG (Reused from ReelBackground.tsx) */}
        <g className={styles.motifGroupActive}>
          <rect width="1440" height="900" fill="url(#bettrRadarGrid)" />
          <circle cx="1080" cy="360" r="240" fill="none" stroke={accentHex} strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />
          <circle cx="1080" cy="360" r="140" fill="none" stroke={accentHex} strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="1080" cy="360" r="12" fill={accentHex} fillOpacity="0.3" />
          <line x1="840" y1="360" x2="1320" y2="360" stroke={accentHex} strokeWidth="1" strokeOpacity="0.25" />
          <line x1="1080" y1="120" x2="1080" y2="600" stroke={accentHex} strokeWidth="1" strokeOpacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
