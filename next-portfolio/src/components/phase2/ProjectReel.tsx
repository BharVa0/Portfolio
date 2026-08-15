"use client";

import { useState } from "react";
import Link from "next/link";
import { ReelBackground } from "./ReelBackground";
import { REEL_PROJECTS } from "./ReelData";
import { ReelMotion } from "./ReelMotion";
import { SplitStageTitle } from "./SplitStageTitle";
import styles from "./ProjectReel.module.css";

export function ProjectReel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ReelMotion onStageChange={setActiveIndex}>
      <div className={styles.reel} aria-label="Selected work project reel">
        {/* Single persistent background owner for the full reel */}
        <ReelBackground activeIndex={activeIndex} />

        {/* Dynamic Typography-led 6-Project Sequence */}
        {REEL_PROJECTS.map((project, index) => (
          <section
            key={project.id}
            className={`${styles.stageSection} ${styles[project.layoutStyle]}`}
            id={index === 0 ? "work" : undefined}
            data-reel-stage
            aria-labelledby={`stage-title-${project.id}`}
          >
            <div className={styles.stage}>
              <header className={styles.stageChrome} data-reel-chrome>
                <p className={styles.selectedMarker}>
                  <span>Selected Work</span>
                  <span>Kinetic Reel / 2026</span>
                </p>
                <p className={styles.stageNumber}>{project.number} / 06</p>
              </header>

              <div className={styles.stageBody}>
                <div className={styles.identityBlock} data-mobile-reveal>
                  <p className={styles.eyebrow} data-reel-chrome>
                    {project.discipline}
                  </p>

                  <SplitStageTitle
                    text={project.title}
                    id={`stage-title-${project.id}`}
                    className={`${styles.stageTitle} ${styles[`title_${project.id}`]}`}
                  />

                  <p className={styles.metaBadge} data-reel-meta>
                    {project.meta}
                  </p>

                  <p className={styles.premise} data-reel-copy>
                    {project.premise}
                  </p>

                  <div className={styles.actionWrapper} data-reel-copy>
                    <Link className={styles.projectLink} href={project.link}>
                      Read the case study
                      <span className={styles.linkArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Intentional End-of-Reel Section */}
        <section className={styles.endSection} aria-label="End of project reel">
          <div className={styles.endContent}>
            <p className={styles.endMarker}>Completion · 06 / 06</p>
            <h2 className={styles.endTitle}>Human Systems Portfolio</h2>
            <p className={styles.endBody}>
              Six projects exploring decision profiling, health reassurance, guitar-driven identity, memory space, industrial design research, and critical documentary.
            </p>
            <div className={styles.endNav}>
              <a className={styles.endNavButton} href="#hero-g">
                Back to top ↑
              </a>
            </div>
          </div>
        </section>
      </div>
    </ReelMotion>
  );
}
