"use client";

import { useState } from "react";
import Link from "next/link";
import { MediaFigure, MediaDuo } from "@/components/projects/MediaFigure";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectOpening } from "@/components/projects/ProjectOpening";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { PrototypeEmbed } from "@/components/projects/PrototypeEmbed";
import { ProjectBackground } from "@/components/projects/ProjectBackground";
import { ProjectScrollProgress } from "@/components/projects/ProjectScrollProgress";
import "./AboveTheNoiseCaseStudy.css";

const LIVE_SITE_URL = "https://above-the-noise-nu.vercel.app/";

export function AboveTheNoiseCaseStudy() {
  const [gatePassed, setGatePassed] = useState(false);

  return (
    <ProjectPageShell accent="above-the-noise">
      {/* Hard Content Warning Gate */}
      {!gatePassed && (
        <div
          className="content-gate-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          aria-describedby="gate-desc"
        >
          <div className="content-gate-modal">
            <p className="content-gate-eyebrow">Content Notice · Sensitive Themes</p>
            <h2 id="gate-title" className="content-gate-title">
              Content Notice &amp; Reader Guidance
            </h2>
            <div id="gate-desc" className="content-gate-body">
              <p style={{ marginBottom: "12px" }}>
                This case study documents an autoethnographic scrollytelling project examining gaming, escapism, and refuge.
              </p>
              <p style={{ marginBottom: "12px" }}>
                The research and interactive artefact discuss personal adversity and reference empirical findings on adolescent mental health and self-harm statistics (Felitti et al., 1998; Chapman et al., 2004).
              </p>
              <p style={{ margin: 0, opacity: 0.85, fontSize: "0.92em" }}>
                If you prefer not to view content addressing these topics, you can safely return to the Work Index below.
              </p>
            </div>
            <div className="content-gate-actions">
              <button
                type="button"
                onClick={() => setGatePassed(true)}
                className="gate-btn-proceed"
              >
                I Understand · Proceed to Case Study
              </button>
              <Link href="/work" className="gate-btn-return">
                ← Return to Work Index
              </Link>
            </div>
          </div>
        </div>
      )}

      <ProjectBackground accent="#3ddc84" motif="terminal-prompt" />
      <ProjectScrollProgress label="01 / 07 · Above the Noise" />

      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/work">← All Work</Link>
          <span className="proj-frame-count mono">
            01 / 07 · Above the Noise
          </span>
          <Link href="/projects/bettr">Next: BETTR →</Link>
        </div>
      </header>

      <ProjectOpening
        variant="balanced"
        eyebrow="Scrollytelling · Autoethnography & Design Research · Solo"
        title="Above the Noise"
        thesis="A personal story about how a mass-produced object became personally significant, leading into a data-driven inquiry on gaming, identity, and refuge."
        meta={[
          { label: "Role", value: "Sole author & designer" },
          { label: "Method", value: "Autoethnography & RtD" },
          { label: "Deliverable", value: "12-scene scrollytelling artefact" },
          { label: "Context", value: "Final Thesis Project, 2026" },
        ]}
        ownership="Solo thesis project. Designed, authored, modelled, and developed end to end as practice-based design research."
      />

      <section className="atn-live-section" aria-label="Above the Noise interactive live build">
        <PrototypeEmbed
          src={LIVE_SITE_URL}
          title="Above the Noise live interactive scrollytelling build"
          barLabel="above the noise, live scrollytelling"
          openHref={LIVE_SITE_URL}
          openLabel="Open live site ↗"
          openCursorHint="Open"
          allowFullScreen
        />
        <p className="proj-artifact-caption">
          The live interactive scrollytelling artefact is the primary deliverable for this project. Scroll within the frame to explore the 12-scene progression, or open the deployment full screen.
        </p>
      </section>

      <ProjectSection
        number="01"
        title="Research Through Design and the 12-scene structure"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-6 self-center">
            <MediaFigure
              src="/assets/above-the-noise/opening-title-crop.png"
              width={1440}
              height={900}
              loading="eager"
              alt="Above the Noise opening scrollytelling title screen with phosphor terminal typography and ambient atmosphere"
              caption="Opening title screen. 'Everyone who’s ever owned one has a different story. This is mine.'"
              crop="native"
              nativeWidth={1440}
            />
            <div style={{ marginTop: "var(--space-2)" }}>
              <MediaDuo
                left={{
                  src: "/assets/above-the-noise/house-scene-crop.png",
                  width: 1440,
                  height: 900,
                  alt: "Scene 1: The domestic exterior environment, dusk lighting",
                  caption: "Scene 1: The domestic environment.",
                }}
                right={{
                  src: "/assets/above-the-noise/room-scene-crop.png",
                  width: 1440,
                  height: 900,
                  alt: "Scene 2: The room interior with personal objects and machine glow",
                  caption: "Scene 2: The room and machine space.",
                }}
              />
            </div>
          </div>
          <div className="c7-13">
            <p className="proj-lede">
              The project methodology combines autoethnography (Ellis, Adams and
              Bochner, 2011) with practice-based design research (Frayling, 1993&apos;s
              &quot;research through design&quot; — where the act of designing and
              building serves as inquiry itself, rather than an illustration of prior
              conclusions).
            </p>
            <p className="proj-body">
              The interactive artefact is structured as a continuous scroll of twelve
              scenes. The experience moves progressively from an initial domestic
              environment through the growing prominence and intimacy of a recurring
              machine, arriving at a scene that deliberately breaks tone to compare the
              personal account against external data, before reaching its resolution.
            </p>
            <p
              className="proj-body proj-body-muted"
              style={{ marginTop: "var(--space-3)" }}
            >
              The structural approach builds on precedents such as <em>A Memoir Blue</em>
              (a Master&apos;s thesis project using two visual registers for childhood
              memory versus present reflection) and Wu&apos;s <em>Immersive 3D Story</em>
              (a scroll-navigated cinematic biography using comparable WebGL spatial tools).
            </p>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="02"
        title="The materiality of three machines"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-5">
            <p className="proj-lede">
              The central thesis of the project argues that &quot;the importance of
              the object to a child is not determined at the first meeting but is
              instead built up through use.&quot;
            </p>
            <p className="proj-body">
              The narrative involves three materially different machines across the
              timespan covered. The visual language tracks this transformation,
              shifting from tangible physical hardware into a BIOS boot sequence
              and desktop navigation environment before expanding into an abstracted
              digital space.
            </p>
            <div className="terminal-box">
              <div className="terminal-header">
                <span>BIOS v1.0.4 · System Check</span>
                <span>Scene 04</span>
              </div>
              <div>LOADING C:\DESKTOP\PLAY.EXE...</div>
              <div style={{ opacity: 0.75 }}>SYSTEM.SYS / README.TXT / DIAG.EXE / PLAY.EXE</div>
            </div>
          </div>
          <div className="c6-13 self-center">
            <MediaDuo
              left={{
                src: "/assets/above-the-noise/bios-boot-crop.png",
                width: 1440,
                height: 900,
                alt: "Scene 4: BIOS boot sequence and hardware memory initialization",
                caption: "Scene 4: BIOS boot sequence.",
              }}
              right={{
                src: "/assets/above-the-noise/desktop-menu-crop.png",
                width: 1440,
                height: 900,
                alt: "Scene 5: Retro desktop menu system with navigation items",
                caption: "Scene 5: Desktop navigation menu.",
              }}
            />
            <div style={{ marginTop: "var(--space-2)" }}>
              <MediaFigure
                src="/assets/above-the-noise/digital-world-crop.png"
                width={1440}
                height={900}
                alt="Scene 6: Abstracted digital world, exploring virtual immersion and refuge"
                caption="Scene 6: Transition into the digital environment."
                treatment="supporting"
              />
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="03"
        title={
          <>
            <span className="chapter-mark" aria-hidden="true">
              III
            </span>
            <span>The tone break: Personal account to empirical data</span>
          </>
        }
        featureTitle
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-9">
            <p className="proj-lede">
              The narrative deliberately ruptures tone in the later scenes, moving from
              a subjective autoethnographic recollection into a data-driven inquiry on
              gaming, identity, and psychological refuge.
            </p>
          </div>
        </div>
        <div className="proj-feature-surface">
          <div className="cols" data-layout="asymmetric">
            <div className="c1-13">
              <MediaDuo
                left={{
                  src: "/assets/above-the-noise/data-statistic-crop.png",
                  width: 1440,
                  height: 900,
                  alt: "Scene 8: Statistical data presentation comparing personal experience to empirical findings",
                  caption: "Scene 8: Statistical inquiry and empirical grounding.",
                }}
                right={{
                  src: "/assets/above-the-noise/data-confirmation-crop.png",
                  width: 1440,
                  height: 900,
                  alt: "Scene 9: Data confirmation and synthesis of research findings",
                  caption: "Scene 9: Synthesizing personal refuge against broader evidence.",
                }}
              />
            </div>
          </div>
          <div
            className="cols"
            data-layout="asymmetric"
            style={{ marginTop: "var(--space-evidence)" }}
          >
            <div className="c1-9">
              <p className="proj-body" style={{ margin: 0 }}>
                This section contextualizes the personal narrative against established
                literature on adverse childhood experiences, identity formation, and digital
                spaces as coping mechanisms (Felitti et al., 1998; Chapman et al., 2004;
                Erikson, 1968; Patrick &amp; Noor, 2024; Zhou et al., 2023; Commodari et al., 2024).
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="04"
        title="Evaluation and outside viewer feedback"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-6 self-center">
            <MediaFigure
              src="/assets/above-the-noise/closing-outro-crop.png"
              width={1440}
              height={900}
              alt="Scene 12: Closing outro with reflective narrative pull-quote"
              caption="Scene 12: Closing reflection."
              treatment="spotlight"
            />
          </div>
          <div className="c7-13">
            <p className="proj-lede">
              The project was evaluated against Zimmerman, Forlizzi and Evenson&apos;s
              (2007) four lenses for interaction-design research contribution: process,
              invention, relevance, and extensibility, with process serving as the primary
              claim (demonstrating that the making was documented rigorously enough for the
              reasoning to be verified).
            </p>
            <p className="proj-body">
              A small round of outside viewer feedback was conducted specifically to test
              whether the private account communicates as intended to audiences without
              the researcher&apos;s personal context.
            </p>
            <div className="proj-reflection">
              <p className="proj-body" style={{ margin: 0, fontStyle: "italic" }}>
                &quot;This started as a project about escapism and technology. Somewhere
                along the way, it became a project about my own family, too.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="proj-refs">
          Chapman, D.P. et al. (2004) Adverse childhood experiences and the risk of depressive disorders in adulthood.
          <br />
          Commodari, E. et al. (2024) Video gaming, emotional regulation, and psychological well-being.
          <br />
          Ellis, C., Adams, T.E. and Bochner, A.P. (2011) Autoethnography: An overview. <em>Historical Social Research</em>, 36(4), pp. 273–290.
          <br />
          Erikson, E.H. (1968) <em>Identity: Youth and Crisis</em>. New York: W.W. Norton &amp; Company.
          <br />
          Felitti, V.J. et al. (1998) Relationship of childhood abuse and household dysfunction to many of the leading causes of death in adults: The Adverse Childhood Experiences (ACE) Study. <em>American Journal of Preventive Medicine</em>, 14(4), pp. 245–258.
          <br />
          Frayling, C. (1993) Research in art and design. <em>Royal College of Art Research Papers</em>, 1(1), pp. 1–5.
          <br />
          Patrick, R. and Noor, H. (2024) Digital spaces as psychological refuge: Media consumption and identity formation.
          <br />
          Zhou, Y. et al. (2023) Longitudinal analysis of digital media engagement and adolescent coping mechanisms.
          <br />
          Zimmerman, J., Forlizzi, J. and Evenson, S. (2007) Research through design as a method for interaction design research in HCI. <em>Proceedings of the SIGCHI Conference on Human Factors in Computing Systems</em>, pp. 493–502.
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/work">
          ← Back to all work
        </Link>
        <Link className="proj-nav-next" href="/projects/bettr">
          <span className="proj-next-label">Next project</span>
          BETTR →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
