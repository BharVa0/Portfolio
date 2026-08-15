"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./ProjectBackground.module.css";

// Dynamic import for WebGL shader to avoid SSR execution
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  { ssr: false }
);

export type ProjectMotifType =
  | "harmonic-wave"
  | "profiling-grid"
  | "ekg-pulse"
  | "spatial-ray"
  | "glyph-matrix"
  | "horizon-grid";

export interface ProjectBackgroundProps {
  accent?: string;
  bgHex?: string;
  motif?: ProjectMotifType;
  intensity?: "subtle" | "standard";
}

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16) || 0,
      parseInt(clean[1] + clean[1], 16) || 0,
      parseInt(clean[2] + clean[2], 16) || 0,
    ];
  }
  return [
    parseInt(clean.slice(0, 2), 16) || 0,
    parseInt(clean.slice(2, 4), 16) || 0,
    parseInt(clean.slice(4, 6), 16) || 0,
  ];
}

function mixHex(fgHex: string, bgHex: string, weight: number): string {
  const [r1, g1, b1] = parseHex(fgHex);
  const [r2, g2, b2] = parseHex(bgHex);
  const r = Math.round(r1 * weight + r2 * (1 - weight));
  const g = Math.round(g1 * weight + g2 * (1 - weight));
  const b = Math.round(b1 * weight + b2 * (1 - weight));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Editorial shader-based grain gradient background:
 * - Powered by @paper-design/shaders-react (GrainGradient)
 * - Tactile, atmospheric paper texture with rich perceptible depth
 * - Gentle ambient drift (speed=0.18)
 * - Fully respects prefers-reduced-motion: reduce by setting speed={0} (freezes to static frame and stops rAF)
 */
export function ProjectBackground({
  accent = "#c68a2e",
  bgHex = "#0e0d0b",
  motif = "harmonic-wave",
  intensity = "standard",
}: ProjectBackgroundProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Map motif type to grain shape and accent-derived palette
  const shaderConfig = useMemo(() => {
    const isStandard = intensity === "standard";

    // Shape mapping per project character
    const shapeMap: Record<ProjectMotifType, "wave" | "corners" | "blob" | "ripple" | "truchet" | "dots"> = {
      "harmonic-wave": "wave",
      "profiling-grid": "corners",
      "ekg-pulse": "ripple",
      "spatial-ray": "corners",
      "glyph-matrix": "blob",
      "horizon-grid": "wave",
    };

    const shape = shapeMap[motif] || "wave";

    // Clean hex colors computed with perceptible contrast against dark background
    const safeAccent = accent.startsWith("#") ? accent : "#c68a2e";
    const safeBg = bgHex.startsWith("#") ? bgHex : "#0e0d0b";

    const colors = [
      mixHex(safeAccent, safeBg, isStandard ? 0.42 : 0.28), // warm highlight bloom
      mixHex(safeAccent, safeBg, isStandard ? 0.24 : 0.16), // mid tone
      mixHex(safeAccent, safeBg, isStandard ? 0.58 : 0.38), // rich accent crest
      mixHex(safeAccent, safeBg, isStandard ? 0.14 : 0.08), // dark ambient body
    ];

    return {
      shape,
      colors,
      colorBack: safeBg,
      softness: isStandard ? 0.62 : 0.75,
      noise: isStandard ? 0.38 : 0.28,
      intensity: isStandard ? 0.45 : 0.30,
      speed: isReducedMotion ? 0 : 0.18,
    };
  }, [motif, accent, bgHex, intensity, isReducedMotion]);

  return (
    <div
      className={styles.persistentBg}
      style={
        {
          "--active-bg": bgHex,
          "--active-accent": accent,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {isMounted && (
        <div className={styles.shaderCanvasWrapper}>
          <GrainGradient
            style={{ width: "100%", height: "100%" }}
            colorBack={shaderConfig.colorBack}
            colors={shaderConfig.colors}
            shape={shaderConfig.shape}
            softness={shaderConfig.softness}
            noise={shaderConfig.noise}
            intensity={shaderConfig.intensity}
            speed={shaderConfig.speed}
            scale={1.25}
          />
        </div>
      )}
      <div className={styles.editorialScrim} />
    </div>
  );
}
