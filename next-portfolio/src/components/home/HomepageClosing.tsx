import interactionStyles from "./WorkIndex.module.css";
import styles from "./HomepageClosing.module.css";

export function HomepageClosing() {
  return (
    <>
      <section
        id="practice"
        className={`${styles.section} ${styles.practice} ${interactionStyles.reveal}`}
        aria-label="Practice"
        data-work-index-scope
        data-reveal
      >
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Practice</p>
          <p className={styles.statement}>
            Tools and methods across the work above.
          </p>
          <div className={styles.practiceGrid}>
            <div className={styles.practiceColumn}>
              <h3>Design</h3>
              <p>
                Figma · Unity 3D · Blender
                <br />
                Adobe Suite
              </p>
            </div>
            <div className={styles.practiceColumn}>
              <h3>Build</h3>
              <p>
                HTML / CSS · JavaScript
                <br />
                Git · Netlify
              </p>
            </div>
            <div className={styles.practiceColumn}>
              <h3>Method</h3>
              <p>
                User research · Usability testing
                <br />
                Iterative design · Design systems
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className={`${styles.section} ${styles.about} ${interactionStyles.reveal}`}
        aria-label="About"
        data-work-index-scope
        data-reveal
      >
        <div className={styles.inner}>
          <p className={styles.eyebrow}>About</p>
          <div className={styles.aboutGrid}>
            <p className={styles.statement}>
              MSc Design and Digital Media, University of Edinburgh.
            </p>
            <div className={styles.aboutBody}>
              <p>
                The six projects here range from a self-written speculative
                interface to a three-person game team to a solo research
                interview. Each page names what was self-built, what was
                adapted, and where a teammate&apos;s contribution starts and mine
                ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`${styles.section} ${styles.contact} ${interactionStyles.reveal}`}
        aria-label="Contact"
        data-work-index-scope
        data-reveal
      >
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Contact</p>
          <p className={styles.statement}>
            If something here was worth a closer look,
            <br />
            I&apos;d like to hear about it.
          </p>
          <div className={styles.contactRow}>
            <a
              className={styles.contactCta}
              href="mailto:bharatvyask@gmail.com"
              data-cursor="Email"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
            <div className={styles.contactLinks}>
              <a
                href="https://www.linkedin.com/in/bharat-vyas-k-bb9680217/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="/assets/resume/Bharat-Vyas-Resume.pdf"
                target="_blank"
                rel="noopener"
              >
                Resume, PDF
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="https://github.com/BharVa0"
                target="_blank"
                rel="noopener"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
