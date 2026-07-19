/* eslint-disable @next/next/no-img-element -- Exact static src/srcSet files are the approved responsive image behavior for this parity port. */
import Link from "next/link";
import { WORK_INDEX_ENTRIES, type WorkIndexEntry } from "@/data/workIndex";
import { WorkIndexInteractions } from "./WorkIndexInteractions";
import styles from "./WorkIndex.module.css";

const workIndexBootstrap = String.raw`
(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("wi-can-animate");
  }
})();`;

export function WorkIndex() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: workIndexBootstrap }} />
      <section
        className={`${styles.intro} ${styles.reveal}`}
        aria-label="About the work"
        data-work-index-scope
        data-reveal
      >
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Introduction</p>
          <div className={styles.introGrid}>
            <p className={styles.statement}>
              Every interface asks something of the person using it.
            </p>
            <p className={styles.introBody}>
              Six projects, one continuing question: what happens when a
              system has to account for how people actually behave, not how
              they&apos;re supposed to. The work below moves across UX research,
              game design, and coded interaction — a decision interface that
              profiles the person using it, a control scheme built around a
              single guitar input, a memory room that carries an emotional arc
              through environment alone. Each one is evidence of that question,
              worked through in a different medium.
            </p>
          </div>
        </div>
      </section>

      <section
        id="work"
        className={styles.work}
        aria-label="Selected work"
        data-work-index-scope
      >
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Selected work, 06 entries</p>
          <div className={styles.workList}>
            {WORK_INDEX_ENTRIES.map((entry) => (
              <WorkIndexRow key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>
      <WorkIndexInteractions />
    </>
  );
}

function WorkIndexRow({ entry }: { entry: WorkIndexEntry }) {
  const isFeature = entry.layout.startsWith("feature");
  const isOffset = entry.layout === "compact-text-offset";
  const hasMedia = entry.layout === "compact-media";
  const isTextLed = entry.layout.includes("text");

  const rowClasses = [
    styles.projectRow,
    styles.reveal,
    isFeature ? styles.feature : styles.compact,
    entry.layout === "feature-media-left" ? styles.mediaLeft : "",
    isOffset ? styles.offsetRight : "",
    hasMedia ? styles.hasMedia : "",
    isTextLed ? styles.textLed : "",
    entry.slug === "bettr" ? styles.bettrAccent : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={rowClasses}
      href={`/projects/${entry.slug}`}
      data-cursor={entry.cursorLabel}
      data-reveal
    >
      {isFeature && entry.media ? <WorkIndexMedia entry={entry} /> : null}

      {!isFeature ? (
        <span className={styles.projectNum}>{entry.number}</span>
      ) : null}

      <span className={styles.projectInfo}>
        {isFeature ? (
          <span className={styles.projectNum}>{entry.number}</span>
        ) : null}
        <h3 className={styles.projectTitle}>{entry.title}</h3>
        <p className={styles.projectDesc}>{entry.description}</p>
        <span className={styles.projectMeta}>{entry.meta}</span>
      </span>

      {!isFeature && entry.media ? <WorkIndexMedia entry={entry} /> : null}
    </Link>
  );
}

function WorkIndexMedia({ entry }: { entry: WorkIndexEntry }) {
  if (!entry.media) return null;

  const treatmentClass = {
    frame: styles.toneFrame,
    native: styles.nativeCap,
    warm: styles.toneWarm,
  }[entry.media.treatment];

  return (
    <span className={`${styles.projectMedia} ${treatmentClass}`}>
      <img
        src={entry.media.src}
        srcSet={entry.media.srcSet}
        sizes={entry.media.sizes}
        width={entry.media.width}
        height={entry.media.height}
        loading="lazy"
        alt={entry.media.alt}
      />
    </span>
  );
}
