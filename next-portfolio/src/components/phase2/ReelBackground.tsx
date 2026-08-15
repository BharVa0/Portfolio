"use client";

import { REEL_PROJECTS } from "./ReelData";
import styles from "./ProjectReel.module.css";

interface ReelBackgroundProps {
  activeIndex: number;
}

export function ReelBackground({ activeIndex }: ReelBackgroundProps) {
  const currentProject = REEL_PROJECTS[activeIndex] || REEL_PROJECTS[0];

  return (
    <div
      className={styles.persistentBg}
      style={
        {
          "--active-bg": currentProject.bgHex,
          "--active-accent": currentProject.accentHex,
        } as React.CSSProperties
      }
      aria-hidden="true"
      data-active-motif={currentProject.motifType}
    >
      {/* Primary atmosphere layer */}
      <div className={styles.bgAtmosphere} />

      {/* Persistent SVG abstract motif layer */}
      <svg
        className={styles.bgMotifSvg}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="motifGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={currentProject.accentHex} stopOpacity="0.22" />
            <stop offset="100%" stopColor={currentProject.accentHex} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="720" cy="450" r="500" fill="url(#motifGlow)" />

        {/* Motif 01: Profiling Grid (BETTR) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "profiling-grid" ? styles.motifActive : ""
          }`}
        >
          <pattern id="bettrGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={currentProject.accentHex} strokeWidth="0.75" strokeOpacity="0.18" />
            <circle cx="0" cy="0" r="2" fill={currentProject.accentHex} fillOpacity="0.4" />
          </pattern>
          <rect width="1440" height="900" fill="url(#bettrGrid)" />
          <circle cx="1080" cy="360" r="240" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />
          <circle cx="1080" cy="360" r="140" fill="none" stroke={currentProject.accentHex} strokeWidth="1.5" strokeOpacity="0.45" />
          <line x1="840" y1="360" x2="1320" y2="360" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.25" />
          <line x1="1080" y1="120" x2="1080" y2="600" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.25" />
        </g>

        {/* Motif 02: EKG Pulse (CardioPal) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "ekg-pulse" ? styles.motifActive : ""
          }`}
        >
          <pattern id="cardioGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={currentProject.accentHex} strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
          <rect width="1440" height="900" fill="url(#cardioGrid)" />
          <path
            d="M 100 450 L 500 450 L 540 400 L 570 520 L 610 340 L 650 490 L 680 430 L 720 450 L 1340 450"
            fill="none"
            stroke={currentProject.accentHex}
            strokeWidth="2.5"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="100" y1="300" x2="1340" y2="300" stroke={currentProject.accentHex} strokeWidth="0.75" strokeDasharray="6 6" strokeOpacity="0.2" />
          <line x1="100" y1="600" x2="1340" y2="600" stroke={currentProject.accentHex} strokeWidth="0.75" strokeDasharray="6 6" strokeOpacity="0.2" />
        </g>

        {/* Motif 03: Harmonic Wave (FrankenTeen) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "harmonic-wave" ? styles.motifActive : ""
          }`}
        >
          <path d="M 200 200 Q 500 600 800 200 T 1400 200" fill="none" stroke={currentProject.accentHex} strokeWidth="1.5" strokeOpacity="0.35" />
          <path d="M 200 350 Q 600 100 900 450 T 1400 350" fill="none" stroke={currentProject.accentHex} strokeWidth="2" strokeOpacity="0.4" />
          <path d="M 200 500 Q 400 750 800 400 T 1400 500" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.25" />
          <line x1="300" y1="100" x2="300" y2="800" stroke={currentProject.accentHex} strokeWidth="1" strokeDasharray="2 12" strokeOpacity="0.3" />
          <line x1="700" y1="100" x2="700" y2="800" stroke={currentProject.accentHex} strokeWidth="1" strokeDasharray="2 12" strokeOpacity="0.3" />
          <line x1="1100" y1="100" x2="1100" y2="800" stroke={currentProject.accentHex} strokeWidth="1" strokeDasharray="2 12" strokeOpacity="0.3" />
        </g>

        {/* Motif 04: Spatial Ray (Echoes of Home) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "spatial-ray" ? styles.motifActive : ""
          }`}
        >
          {/* Isometric room wireframe bounds */}
          <polygon points="720,200 1120,400 720,600 320,400" fill="none" stroke={currentProject.accentHex} strokeWidth="1.5" strokeOpacity="0.35" />
          <line x1="720" y1="600" x2="720" y2="850" stroke={currentProject.accentHex} strokeWidth="1.5" strokeOpacity="0.35" />
          <line x1="320" y1="400" x2="320" y2="650" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.2" />
          <line x1="1120" y1="400" x2="1120" y2="650" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.2" />
          {/* Light ray vector */}
          <polygon points="720,200 980,550 620,780 400,320" fill={currentProject.accentHex} fillOpacity="0.06" />
        </g>

        {/* Motif 05: Glyph Matrix (Breaking the Smartphone Mold) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "glyph-matrix" ? styles.motifActive : ""
          }`}
        >
          <rect x="360" y="180" width="720" height="540" rx="36" fill="none" stroke={currentProject.accentHex} strokeWidth="1.5" strokeDasharray="12 12" strokeOpacity="0.35" />
          <rect x="420" y="240" width="600" height="420" rx="20" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="720" cy="450" r="160" fill="none" stroke={currentProject.accentHex} strokeWidth="1.5" strokeOpacity="0.3" />
          <line x1="720" y1="180" x2="720" y2="720" stroke={currentProject.accentHex} strokeWidth="0.75" strokeOpacity="0.2" />
          <line x1="360" y1="450" x2="1080" y2="450" stroke={currentProject.accentHex} strokeWidth="0.75" strokeOpacity="0.2" />
        </g>

        {/* Motif 06: Horizon Grid (Playing Freedom) */}
        <g
          className={`${styles.motifGroup} ${
            currentProject.motifType === "horizon-grid" ? styles.motifActive : ""
          }`}
        >
          <line x1="100" y1="450" x2="1340" y2="450" stroke={currentProject.accentHex} strokeWidth="2" strokeOpacity="0.4" />
          <path d="M 100 450 Q 720 250 1340 450" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.25" />
          <path d="M 100 450 Q 720 150 1340 450" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.18" />
          <path d="M 100 450 Q 720 650 1340 450" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.25" />
          <path d="M 100 450 Q 720 750 1340 450" fill="none" stroke={currentProject.accentHex} strokeWidth="1" strokeOpacity="0.18" />
          <line x1="720" y1="100" x2="720" y2="800" stroke={currentProject.accentHex} strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.3" />
        </g>
      </svg>
    </div>
  );
}
