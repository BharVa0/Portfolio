"use client";

import { FlowingMenu } from "./FlowingMenu";
import styles from "./WorkFlowingPage.module.css";

export function WorkFlowingPage() {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent} id="main-content">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Parallel View / Flowing Comparison</p>
          <h1 className={styles.title}>Work Index — Flowing</h1>
          <p className={styles.description}>
            A kinetic, edge-aware FlowingMenu comparison view of the six portfolio projects using bespoke SVG motif swatches and brand accent tokens.
          </p>
        </header>

        <FlowingMenu />
      </main>
    </div>
  );
}
