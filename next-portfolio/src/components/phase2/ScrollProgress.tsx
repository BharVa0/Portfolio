"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.css";

interface ScrollProgressProps {
  label?: string;
}

export function ScrollProgress({ label = "01 / 06 · BETTR." }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = Math.min(Math.max(window.scrollY, 0), totalScroll);
      const percentage = Math.round((currentScroll / totalScroll) * 100);
      setProgress(percentage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={styles.progressContainer}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressBarTrack}>
        <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.progressReadout}>
        <span className={styles.progressLabel}>{label}</span>
        <span className={styles.progressPercent}>{progress}%</span>
      </div>
    </aside>
  );
}
