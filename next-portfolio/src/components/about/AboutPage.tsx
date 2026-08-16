"use client";

import { ProjectBackground } from "@/components/projects/ProjectBackground";
import styles from "./AboutPage.module.css";

const PRACTICE_GROUPS = [
  {
    num: "01",
    title: "Design",
    tools: ["Figma · Unity 3D · Blender", "Adobe Suite"],
  },
  {
    num: "02",
    title: "Build",
    tools: ["HTML / CSS · JavaScript", "Git · Netlify"],
  },
  {
    num: "03",
    title: "Method",
    tools: [
      "User research · Usability testing",
      "Iterative design · Design systems",
    ],
  },
] as const;

export function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Shared ambient paper-shader background tuned to neutral/ember brand palette */}
      <ProjectBackground
        accent="#d35c34"
        bgHex="#0d0c0b"
        motif="profiling-grid"
        intensity="standard"
      />

      <div className={styles.mainContent}>
        {/* Section 1: About Statement & Narrative */}
        <section
          id="about"
          className={styles.aboutSection}
          aria-label="About"
        >
          <div className={styles.eyebrow}>About</div>
          <h1 className={styles.leadStatement}>
            Designing interactive systems around how people actually behave.
          </h1>

          <div className={styles.aboutGrid}>
            <div className={styles.narrativeCol}>
              <p className={styles.narrativeBody}>
                My work examines what happens when interactive systems meet
                real human behaviour: how interface architectures shape user
                autonomy, how health tools provide clarity and reassurance
                rather than alarm, and how physical and digital objects
                communicate identity. I work across UX research, coded
                prototypes, 3D environments, and critical media analysis,
                focusing not just on system specifications, but on how
                interaction design influences decision-making, trust, and
                agency.
              </p>
              <p className={styles.narrativeBody}>
                Across the seven projects documented here, that inquiry moves
                through different media: from a self-written decision interface
                that profiles the person using it (BETTR) and a 25-screen
                clinical companion app designed for calm (CardioPal), to a
                single-input guitar control scheme in Unity (FrankenTeen) and an
                autoethnographic scrollytelling study (Above the Noise). The goal
                across all of them is to make the interaction itself carry the
                argument, not just the words around it.
              </p>
              <p className={styles.narrativeBody}>
                Whether working solo in code and Blender or collaborating on a
                multi-disciplinary game team, I keep the documentation honest:
                each case study details what was designed, what was self-built,
                where existing tools were adapted, and where teammates&apos;
                contributions begin and end.
              </p>
            </div>

            {/* Structured Focal Stack: Education & Prior Practice */}
            <div className={styles.focalCol}>
              <div className={styles.focalStack}>
                {/* Card 1: MSc Credential */}
                <div className={styles.focalCard}>
                  <div className={styles.focalRingWrapper} aria-hidden="true">
                    <svg
                      viewBox="0 0 160 160"
                      className={styles.focalRingSvg}
                      fill="none"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.22"
                        strokeDasharray="3 5"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        className={styles.ringArc}
                      />
                      <line
                        x1="80"
                        y1="2"
                        x2="80"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeOpacity="0.65"
                      />
                      <line
                        x1="80"
                        y1="146"
                        x2="80"
                        y2="158"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeOpacity="0.65"
                      />
                      <line
                        x1="2"
                        y1="80"
                        x2="14"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeOpacity="0.65"
                      />
                      <line
                        x1="146"
                        y1="80"
                        x2="158"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeOpacity="0.65"
                      />
                      <circle cx="80" cy="8" r="2.5" fill="currentColor" />
                    </svg>
                  </div>

                  <div className={styles.focalMetaHeader}>
                    Education · Postgraduate
                  </div>
                  <h2 className={styles.focalDegree}>
                    MSc Design and Digital Media
                  </h2>
                  <p className={styles.focalInstitution}>
                    University of Edinburgh
                  </p>

                  <div className={styles.focalFooter}>
                    <span className={styles.focalLocation}>Edinburgh, UK</span>
                    <span className={styles.focalYearTag}>2025–Present</span>
                  </div>
                </div>

                {/* Card 2: Enterprise Systems Experience */}
                <div className={styles.focalCard}>
                  <div className={styles.focalMetaHeader}>
                    Experience · Enterprise Systems
                  </div>
                  <h2 className={styles.focalDegree}>Configuration Analyst</h2>
                  <p className={styles.focalInstitution}>Oracle Cerner</p>

                  <div className={styles.focalDetails}>
                    <p className={styles.focalBullet}>
                      Configured healthcare IT systems for 1,000+ hospital
                      clients across scheduling, registration, and patient
                      accounting (began as System Intern, Jan – Jun 2022).
                    </p>
                    <p className={styles.focalBullet}>
                      Led CURES Regulatory implementation across 20+ US
                      hospital clients, covering full build and testing to
                      government standards.
                    </p>
                    <p className={styles.focalAward}>
                      Recipient: Consulting Excellence and Consulting Navigators
                      awards.
                    </p>
                  </div>

                  <div className={styles.focalFooter}>
                    <span className={styles.focalLocation}>Bengaluru, India</span>
                    <span className={styles.focalYearTag}>2022–2025</span>
                  </div>
                </div>

                {/* Card 3: Undergraduate Engineering Degree */}
                <div className={styles.focalCard}>
                  <div className={styles.focalMetaHeader}>
                    Education · Engineering
                  </div>
                  <h2 className={styles.focalDegree}>
                    BTech Computer Science Engineering
                  </h2>
                  <p className={styles.focalInstitution}>Jain University</p>

                  <div className={styles.focalFooter}>
                    <span className={styles.focalLocation}>Bengaluru, India</span>
                    <span className={styles.focalYearTag}>2018–2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Practice (Structured Numbered Tool Chapters) */}
        <section
          id="practice"
          className={styles.practiceSection}
          aria-label="Practice"
        >
          <header className={styles.practiceHeader}>
            <div className={styles.eyebrow}>Practice</div>
            <h2 className={styles.practiceStatement}>
              Tools and methods across design, build, and research.
            </h2>
          </header>

          <div className={styles.practiceGrid}>
            {PRACTICE_GROUPS.map((group) => (
              <article key={group.num} className={styles.practiceChapter}>
                <div className={styles.chapterHead}>
                  <span className={styles.chapterNum}>{group.num}</span>
                  <h3 className={styles.chapterTitle}>{group.title}</h3>
                </div>
                <ul className={styles.toolList}>
                  {group.tools.map((line, idx) => (
                    <li key={idx} className={styles.toolLine}>
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
