"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { WORK_INDEX_PROJECTS } from "@/data/phase2WorkIndex";
import { DecryptedText } from "./DecryptedText";
import styles from "./WorkIndexPage.module.css";

/* Permanently visible, amplified animated SVG motif details before the action arrow */
function RowMotif({ motifType, accentHex }: { motifType: string; accentHex: string }) {
  switch (motifType) {
    case "profiling-grid":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifProfilingGrid}`} aria-hidden="true">
          <line x1="0" y1="12" x2="80" y2="12" stroke={accentHex} strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="40" cy="12" r="8" fill="none" stroke={accentHex} strokeWidth="1.4" className={styles.radarCircle} />
          <line x1="40" y1="0" x2="40" y2="24" stroke={accentHex} strokeWidth="1.2" strokeDasharray="3 2" className={styles.radarRay} />
        </svg>
      );
    case "ekg-pulse":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifEkgPulse}`} aria-hidden="true">
          <path
            d="M 0 12 L 24 12 L 28 4 L 33 20 L 39 2 L 45 18 L 50 10 L 54 12 L 80 12"
            fill="none"
            stroke={accentHex}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.ekgPath}
          />
        </svg>
      );
    case "harmonic-wave":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifHarmonicWave}`} aria-hidden="true">
          <path d="M 0 12 Q 20 2, 40 12 T 80 12" fill="none" stroke={accentHex} strokeWidth="1.6" className={styles.harmonicWaveTop} />
          <path d="M 0 12 Q 20 22, 40 12 T 80 12" fill="none" stroke={accentHex} strokeWidth="1.6" strokeOpacity="0.6" className={styles.harmonicWaveBottom} />
        </svg>
      );
    case "spatial-ray":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifSpatialRay}`} aria-hidden="true">
          <polygon points="40,2 64,10 40,18 16,10" fill="none" stroke={accentHex} strokeWidth="1.4" className={styles.spatialPlane} />
          <line x1="40" y1="18" x2="40" y2="24" stroke={accentHex} strokeWidth="1.4" className={styles.spatialLine} />
        </svg>
      );
    case "glyph-matrix":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifGlyphMatrix}`} aria-hidden="true">
          <rect x="10" y="3" width="60" height="18" rx="4" fill="none" stroke={accentHex} strokeWidth="1.4" strokeDasharray="5 3" className={styles.glyphFrame} />
          <circle cx="40" cy="12" r="4.5" fill="none" stroke={accentHex} strokeWidth="1.2" className={styles.glyphCenter} />
        </svg>
      );
    case "horizon-grid":
      return (
        <svg viewBox="0 0 80 24" className={`${styles.motifSvg} ${styles.motifHorizonGrid}`} aria-hidden="true">
          <line x1="0" y1="12" x2="80" y2="12" stroke={accentHex} strokeWidth="1.6" strokeOpacity="0.4" />
          <path d="M 0 12 Q 40 2 80 12" fill="none" stroke={accentHex} strokeWidth="1.4" strokeOpacity="0.7" className={styles.horizonWaveTop} />
          <path d="M 0 12 Q 40 22 80 12" fill="none" stroke={accentHex} strokeWidth="1.4" strokeOpacity="0.7" className={styles.horizonWaveBottom} />
        </svg>
      );
    default:
      return null;
  }
}

export function WorkIndexPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent} id="main-content">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Selected Work / 2026</p>
          <h1 className={styles.title}>Work Index</h1>
          <p className={styles.description}>
            Six projects exploring decision profiling, health reassurance, guitar-driven identity, memory space, industrial design research, and critical documentary.
          </p>
        </header>

        <section className={styles.listSection} aria-label="Project Index">
          <div className={styles.listHeader}>
            <span className={styles.colNumber}>No.</span>
            <span className={styles.colTitle}>Project</span>
            <span className={styles.colDiscipline}>Discipline</span>
            <span className={styles.colLink}>Action</span>
          </div>

          <ol className={styles.projectList}>
            {WORK_INDEX_PROJECTS.map((project) => {
              const isRowActive = activeId === project.id;

              return (
                <li key={project.id} className={styles.projectRowItem}>
                  {/* Shared layoutId Sliding Highlight Panel */}
                  <AnimatePresence initial={false}>
                    {isRowActive && (
                      <motion.div
                        layoutId="workIndexHighlight"
                        className={styles.rowHighlight}
                        style={{ "--row-accent": project.accentHex } as React.CSSProperties}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 400, damping: 32 }
                        }
                      />
                    )}
                  </AnimatePresence>
                  <Link
                    href={project.link}
                    className={styles.projectRowLink}
                    data-cursor-color={project.accentHex}
                    style={{ "--row-accent": project.accentHex } as React.CSSProperties}
                    onMouseEnter={() => setActiveId(project.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(project.id)}
                    onBlur={() => setActiveId(null)}
                  >
                    {/* Staggered Row Number Reveal: delay=0ms, speed=70ms */}
                    <span className={styles.rowNumber}>
                      <DecryptedText
                        text={project.number}
                        isTriggered={isRowActive}
                        delay={0}
                        speed={70}
                      />
                    </span>

                    {/* Staggered Project Title Reveal: delay=100ms, speed=65ms */}
                    <h2 className={styles.rowTitle}>
                      <DecryptedText
                        text={project.title}
                        isTriggered={isRowActive}
                        delay={100}
                        speed={65}
                      />
                    </h2>

                    {/* Staggered Discipline Label Reveal: delay=200ms, speed=45ms */}
                    <span className={styles.rowDiscipline}>
                      <DecryptedText
                        text={project.discipline}
                        isTriggered={isRowActive}
                        delay={200}
                        speed={45}
                      />
                    </span>

                    {/* Permanent Animated Motif Icon + Action Arrow */}
                    <span className={styles.rowMotifWrapper}>
                      <RowMotif motifType={project.motifType} accentHex={project.accentHex} />
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}
