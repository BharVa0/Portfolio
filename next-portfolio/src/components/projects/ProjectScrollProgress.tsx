"use client";

import { useState, useEffect } from "react";
import styles from "./ProjectScrollProgress.module.css";

export interface ProjectScrollProgressProps {
  label?: string;
}

export function ProjectScrollProgress({ label = "04 / 07 · FrankenTeen" }: ProjectScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setProgress(0);
        setIsActive(false);
        return;
      }
      const currentScroll = Math.min(Math.max(window.scrollY, 0), totalScroll);
      const percentage = Math.round((currentScroll / totalScroll) * 100);
      setProgress(percentage);
      setIsActive(currentScroll > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`${styles.progressContainer}${isActive ? ` ${styles.active}` : ""}`}
      role="progressbar"
      aria-label="Reading scroll progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.progressBarTrack}>
        <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.progressReadout}>
        <span>{label}</span>
        <span className={styles.progressPercent}>{progress}%</span>
      </div>
    </aside>
  );
}
