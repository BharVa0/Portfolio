"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { REEL_PROJECTS, type ReelProject } from "./ReelData";
import styles from "./FlowingMenu.module.css";

function ProjectMotifBadge({ motifType, accentHex }: { motifType: string; accentHex: string }) {
  switch (motifType) {
    case "profiling-grid":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <line x1="0" y1="10" x2="60" y2="10" stroke={accentHex} strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="30" cy="10" r="7" fill="none" stroke={accentHex} strokeWidth="1.5" />
          <line x1="30" y1="0" x2="30" y2="20" stroke={accentHex} strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );
    case "ekg-pulse":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <path
            d="M 0 10 L 18 10 L 22 3 L 26 17 L 31 1 L 36 15 L 40 8 L 44 10 L 60 10"
            fill="none"
            stroke={accentHex}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "harmonic-wave":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <path d="M 0 10 Q 15 1, 30 10 T 60 10" fill="none" stroke={accentHex} strokeWidth="1.8" />
          <path d="M 0 10 Q 15 19, 30 10 T 60 10" fill="none" stroke={accentHex} strokeWidth="1.2" strokeOpacity="0.5" />
        </svg>
      );
    case "spatial-ray":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <polygon points="30,2 48,8 30,14 12,8" fill="none" stroke={accentHex} strokeWidth="1.5" />
          <line x1="30" y1="14" x2="30" y2="20" stroke={accentHex} strokeWidth="1.2" />
        </svg>
      );
    case "glyph-matrix":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <rect x="8" y="2" width="44" height="16" rx="3" fill="none" stroke={accentHex} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="30" cy="10" r="3.5" fill="none" stroke={accentHex} strokeWidth="1.2" />
        </svg>
      );
    case "horizon-grid":
      return (
        <svg viewBox="0 0 60 20" className={styles.marqueeMotifSvg} aria-hidden="true">
          <line x1="0" y1="10" x2="60" y2="10" stroke={accentHex} strokeWidth="1.8" />
          <path d="M 0 10 Q 30 1 60 10" fill="none" stroke={accentHex} strokeWidth="1.2" strokeOpacity="0.6" />
          <path d="M 0 10 Q 30 19 60 10" fill="none" stroke={accentHex} strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

function FlowingMenuItem({ project, index }: { project: ReelProject; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tickerTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    // Check reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Set up infinite marquee ticker
    tickerTween.current = gsap.to(inner, {
      xPercent: -50,
      duration: 14,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    return () => {
      tickerTween.current?.kill();
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item = itemRef.current;
    const overlay = overlayRef.current;
    if (!item || !overlay) return;

    const rect = item.getBoundingClientRect();
    const edge = e.clientY - rect.top < rect.height / 2 ? "top" : "bottom";
    const startY = edge === "top" ? -101 : 101;

    gsap.killTweensOf(overlay);
    gsap.set(overlay, { yPercent: startY });
    gsap.to(overlay, {
      yPercent: 0,
      duration: 0.38,
      ease: "power3.out",
    });

    tickerTween.current?.play();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item = itemRef.current;
    const overlay = overlayRef.current;
    if (!item || !overlay) return;

    const rect = item.getBoundingClientRect();
    const edge = e.clientY - rect.top < rect.height / 2 ? "top" : "bottom";
    const exitY = edge === "top" ? -101 : 101;

    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      yPercent: exitY,
      duration: 0.32,
      ease: "power3.in",
      onComplete: () => {
        tickerTween.current?.pause();
      },
    });
  };

  const handleFocus = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.killTweensOf(overlay);
    gsap.set(overlay, { yPercent: -101 });
    gsap.to(overlay, {
      yPercent: 0,
      duration: 0.38,
      ease: "power3.out",
    });

    tickerTween.current?.play();
  };

  const handleBlur = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      yPercent: -101,
      duration: 0.32,
      ease: "power3.in",
      onComplete: () => {
        tickerTween.current?.pause();
      },
    });
  };

  const inlineStyles = {
    "--row-accent": project.accentHex,
    "--row-bg": project.bgHex,
  } as React.CSSProperties;

  return (
    <div
      ref={itemRef}
      className={styles.menuItem}
      style={inlineStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={project.link}
        className={styles.menuLink}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-cursor-color={project.accentHex}
        aria-label={`${project.number} ${project.title} - ${project.discipline}`}
      >
        <div className={styles.itemDefault}>
          <div className={styles.itemLeft}>
            <span className={styles.rowNumber}>{project.number}</span>
            <h2 className={styles.rowTitle}>{project.title}</h2>
          </div>

          <div className={styles.itemRight}>
            <span className={styles.rowDiscipline}>{project.discipline}</span>
            <div className={styles.staticSwatch} aria-hidden="true">
              <ProjectMotifBadge motifType={project.motifType} accentHex={project.accentHex} />
            </div>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </Link>

      {/* Edge-Aware Sliding Marquee Overlay (Bespoke Image-Free Marquee) */}
      <div ref={overlayRef} className={styles.marqueeOverlay} aria-hidden="true">
        <div ref={innerRef} className={styles.marqueeInner}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={styles.marqueeContent}>
              <span className={styles.rowNumber}>{project.number}</span>
              <span className={styles.marqueeTitle}>{project.title}</span>
              <span className={styles.marqueeDiscipline}>{project.discipline}</span>
              <div className={styles.marqueeSwatch}>
                <ProjectMotifBadge motifType={project.motifType} accentHex={project.accentHex} />
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FlowingMenu() {
  return (
    <section className={styles.menuContainer} aria-label="Flowing Project Index">
      {REEL_PROJECTS.map((project, index) => (
        <FlowingMenuItem key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
