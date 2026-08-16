import Link from "next/link";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectOpening } from "@/components/projects/ProjectOpening";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { MediaFigure } from "@/components/projects/MediaFigure";
import { ProjectAnnotation } from "@/components/projects/ProjectAnnotation";
import { VideoBlock } from "@/components/projects/VideoBlock";
import { BettrLiveEmbed } from "@/components/projects/BettrLiveEmbed";
import { ProjectBackground } from "@/components/projects/ProjectBackground";
import { ProjectScrollProgress } from "@/components/projects/ProjectScrollProgress";
import "./BettrCaseStudy.css";

/*
 * BETTR's page-specific composition — a faithful port of the approved
 * static projects/bettr.html, chapter for chapter. Structure comes from
 * the shared components in components/projects/; colour, fonts, and
 * bespoke widgets (palette band, type specimen, corner brackets) come
 * from ./BettrCaseStudy.css, scoped to .project-bettr.
 *
 * The breadcrumb frame and footer prev/next nav aren't their own reusable
 * component this lesson (not one of the 8 the brief calls for, and their
 * content — "Next: CardioPal" — is different per project anyway) so they
 * render here directly with the shared .proj-frame/.proj-footer-nav
 * classes, inside ProjectPageShell so they still pick up the
 * .project-bettr scoping BettrCaseStudy.css relies on.
 */
export function BettrCaseStudy() {
  return (
    <ProjectPageShell accent="bettr">
      <ProjectBackground accent="#ff4d8d" motif="profiling-grid" />
      <ProjectScrollProgress label="02 / 07 · BETTR." />

      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/work">← All Work</Link>
          <span className="proj-frame-count mono">02 / 07 · BETTR.</span>
          <Link href="/projects/cardiopal">Next: CardioPal →</Link>
        </div>
      </header>

      <ProjectOpening
        eyebrow="Speculative design · Live build"
        title={
          <>
            BETTR<span className="dot">.</span>
          </>
        }
        thesis="An AI decision interface that looks like it wants to help. What it actually does is track your choices, build a profile from them, and gradually take over — slowly enough that most people don't notice until it already has."
        meta={[
          { label: "Role", value: "Sole designer & developer" },
          { label: "Tools", value: "HTML · CSS · JavaScript" },
          { label: "Context", value: "DPOP, MSc Design & Digital Media" },
          { label: "Status", value: "Live, coded build" },
        ]}
        ownership="Solo project. Self-written end to end — a couple of swap/handler methods adapted from earlier work, AI-assisted for one collider bug and for tightening the written report."
      >
        <BettrLiveEmbed
          src="/assets/bettr-live/index.html"
          title="BETTR live interactive build"
          barLabel="bettr, decision interface"
          openHref="/assets/bettr-live/index.html"
        />
        <p className="proj-artifact-caption">
          This is the actual build, running live, not a recording. Click Enter
          and go through it once before reading further — the argument is
          made through the interaction, not around it.
        </p>
      </ProjectOpening>

      <ProjectSection id="s1" number="01" title="What this is actually doing">
        <div className="cols" data-layout="asymmetric">
          <div className="c1-8">
            <p className="proj-body">
              BETTR simulates an AI decision tool: calm, clean, efficient —
              the kind of interface that looks like it wants to help. What it
              actually does is track every choice you make, build a profile
              from those choices, and gradually take over decisions on your
              behalf. The shift happens slowly enough that most people don&apos;t
              notice until it has already happened. That&apos;s the point.
            </p>
            <p className="proj-body">
              The project started as a Figma prototype with the right visual
              identity and narrative arc, but no real memory of what a user
              had done: every path was linear, and nothing carried through.
              The coded version removes that buffer. What you classify as
              &quot;inefficient&quot; in the sorting game becomes a labelled
              friction point on your own dashboard later. The system isn&apos;t
              pretending to profile you. It actually is.
            </p>
          </div>
          <blockquote className="proj-quote c9-13">
            &quot;The critique is not delivered as an argument. It is
            delivered as an experience.&quot;
          </blockquote>
        </div>
      </ProjectSection>

      <ProjectSection id="s2" number="02" title="Four stages of erosion">
        <p className="proj-body" style={{ marginBottom: "var(--space-evidence)" }}>
          The experience is structured as four escalating stages, each one
          quietly taking more authority than the last.
        </p>
        <div className="cols rows-loose">
          <MediaFigure
            className="c1-7"
            src="/assets/bettr/stage1-crop.jpg"
            width={1630}
            height={970}
            loading="eager"
            alt="Stage 1 sorting game, classifying human qualities as efficient or inefficient"
            caption="Stage 1 — the sorting game"
            note={{
              heading: "Stage 1",
              body: "You classify hesitation, doubt, asking for clarification, as efficient or inefficient. Your answers feed stage 3 directly.",
              outcome: "→ you profile yourself",
            }}
          />
          <MediaFigure
            className="c7-13"
            src="/assets/bettr/stage2-crop.jpg"
            width={1630}
            height={970}
            alt="Stage 2 decision session with hesitation timer counting down"
            caption="Stage 2 — decision session, hesitation timer depleting"
            note={{
              heading: "Stage 2",
              body: 'A live timer tracks hesitation. The language quietly shifts from "you" to "the user" to "subject."',
              outcome: "→ no path preserves control",
            }}
          />
          <MediaFigure
            className="c1-8"
            src="/assets/bettr/dashboard-thumb-crop.jpg"
            width={1525}
            height={966}
            alt="Stage 3 subject profile dashboard showing autonomy residual at 12 percent, the point where both earlier stages converge"
            caption="Stage 3 — subject profile, Autonomy Residual at 12%. The dashboard is the argument's landing point, so it gets the most room."
            note={{
              body: "Both stages converge. Autonomy Residual: 12%. Your own earlier words are read back as system analysis.",
              outcome: "→ authority state: centralised",
            }}
          />
          <MediaFigure
            className="c8-13"
            src="/assets/bettr/stage4-crop.jpg"
            width={1630}
            height={965}
            alt="Stage 4 final scene, split screen relabeling system classifications as human qualities"
            caption="Stage 4 — the final scene, classifications dissolve into human language"
            note={{
              body: "A split screen dissolves the system's language. Only the human reframing remains.",
              outcome: '→ "optimisation is not neutral"',
            }}
          />
        </div>
      </ProjectSection>

      <ProjectSection id="s3" number="03" title="Building it">
        <div className="cols rows-loose">
          <div className="c1-5">
            <p className="proj-body">
              Built in VS Code using the Live Server extension for real-time
              preview, with Chrome DevTools running throughout to test the
              timer logic and the conditional branching that carries a
              user&apos;s input between stages.
            </p>
          </div>
          <MediaFigure
            className="c5-13"
            src="/assets/bettr/landing-crop.jpg"
            width={1918}
            height={1005}
            alt="BETTR landing screen in browser, live server running on localhost"
            caption="Landing screen, Live Server running on localhost:5500"
          />

          <MediaFigure
            className="c1-6"
            crop="coverTopLeft"
            src="/assets/bettr/vscode-structure.jpeg"
            width={1919}
            height={1079}
            alt="VS Code project structure showing HTML, CSS, and JS files across stages"
            caption="VS Code, project structure across the four stage folders"
          />
          <div className="c6-13">
            <span className="process-tag">Process evidence</span>
            <p className="proj-body proj-body-muted">
              The moment that told me it was actually working wasn&apos;t a design
              review. It was watching friends and classmates go quiet when
              they hit the dashboard and saw their own words quoted back as
              system analysis. That reaction is the argument landing.
            </p>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        id="s4"
        number="04"
        title="Designing for hidden influence"
        featureTitle
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <p className="proj-lede c1-9">
            The interface had to do two things at once: look trustworthy
            enough that people would engage with it honestly, while encoding
            the conditions of its own critique in that same visual language.
            Susser, Roessler and Nissenbaum describe online manipulation as
            hidden influence — pressure that works because it doesn&apos;t feel
            like pressure. That became the entire design brief in one
            sentence.
          </p>
        </div>

        <div className="proj-feature-surface">
          <div className="cols" data-layout="wide">
            <div className="c1-13">
              <ProjectAnnotation
                label="Colour system: Evolution from submission 1"
                media={
                  <div className="palette-band">
                    <div className="swatch-lg" style={{ background: "#050506", color: "#fff" }}>
                      <span className="swname">Background</span>
                      <span className="swhex">#050506</span>
                      <span className="swrole">Base canvas, near-black</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#121212", color: "#fff" }}>
                      <span className="swname">Panel</span>
                      <span className="swhex">#121212</span>
                      <span className="swrole">Card &amp; panel grouping</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#EB5160", color: "#1A0506" }}>
                      <span className="swname">Accent</span>
                      <span className="swhex">#EB5160</span>
                      <span className="swrole">Brand mark, later reads as system alert</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#B7999C", color: "#1A0506" }}>
                      <span className="swname">Accent soft</span>
                      <span className="swhex">#B7999C</span>
                      <span className="swrole">Muted variant, secondary states</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#EAB308", color: "#1A1203" }}>
                      <span className="swname">Warning / timer</span>
                      <span className="swhex">#EAB308</span>
                      <span className="swrole">Hesitation countdown</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#22C55E", color: "#04150A" }}>
                      <span className="swname">Compliant</span>
                      <span className="swhex">#22C55E</span>
                      <span className="swrole">Efficient classification</span>
                    </div>
                    <div className="swatch-lg" style={{ background: "#EF4444", color: "#1A0505" }}>
                      <span className="swname">Critical</span>
                      <span className="swhex">#EF4444</span>
                      <span className="swrole">Inefficient / flagged classification</span>
                    </div>
                  </div>
                }
              >
                The accent red starts as a brand colour and migrates slowly
                into alerts and critical system states. By the time the
                dashboard arrives, the colour you first connected to the
                brand is marking your reduced autonomy. Nobody pointed this
                out while using it. They just felt something was off.
              </ProjectAnnotation>
            </div>
          </div>

          <div className="cols" data-layout="wide">
            <div className="c1-13">
              <ProjectAnnotation
                label="Type system: Jersey 25 & Rajdhani"
                media={
                  <>
                    <div className="type-specimen-feature">
                      <div className="specimen-line">HESITATION DETECTED</div>
                    </div>
                    <div className="type-rows-feature">
                      <div className="type-row">
                        <span
                          style={{
                            fontFamily: "'Rajdhani',sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(20px, 1.4vw, 26px)",
                          }}
                        >
                          Stage 1: The Sorting Game
                        </span>
                        <span className="type-label mono">Rajdhani 600, headings</span>
                      </div>
                      <div className="type-row">
                        <span
                          style={{
                            fontFamily: "'Rajdhani',sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(18px, 1.15vw, 22px)",
                            color: "var(--proj-text-soft)",
                          }}
                        >
                          Body copy reads cleanly on dark surfaces while
                          keeping the utilitarian tone of the project.
                        </span>
                        <span className="type-label mono">Rajdhani 500, body</span>
                      </div>
                    </div>
                  </>
                }
              >
                Moving from a single-weight display face to a full Rajdhani
                hierarchy let the interface carry more meaning through text
                alone — labels, questions, and system outputs each get their
                own register, which matters when the language itself is part
                of the argument.
              </ProjectAnnotation>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection id="s5" number="05" title="Scholarly grounding">
        <div className="cols" data-layout="asymmetric">
          <p className="proj-body c1-8">
            Yeung&apos;s concept of the hypernudge — data-driven systems that
            shape behaviour through environments so tailored that resistance
            barely registers as a possibility — is the idea BETTR makes
            literal. Tufekci&apos;s argument that algorithmic harm rarely comes
            from bad intent, but from systems doing exactly what they were
            built to do, shaped the system&apos;s tone: it isn&apos;t malicious, it&apos;s
            efficient. Diakopoulos&apos;s work on accountability informed why
            BETTR keeps its classification criteria hidden until the final
            scene: when you can&apos;t see the criteria, you can&apos;t push back.
          </p>
          <div className="proj-refs c8-13">
            Burrell, J. (2016) How the machine thinks: understanding opacity
            in machine learning algorithms. <em>Big Data &amp; Society</em>,
            3(1).
            <br />
            Diakopoulos, N. (2016) Accountability in algorithmic decision
            making. <em>Communications of the ACM</em>, 59(2), pp.56–62.
            <br />
            Ruckenstein, M. and Granroth, J. (2020) Algorithms, advertising
            and the intimacy of surveillance.{" "}
            <em>Journal of Cultural Economy</em>, 13(1), pp.12–25.
            <br />
            Susser, D., Roessler, B. and Nissenbaum, H. (2019) Online
            manipulation: hidden influences in a digital world.{" "}
            <em>Georgetown Law Technology Review</em>, 4(1).
            <br />
            Tufekci, Z. (2015) Algorithmic harms beyond Facebook and Google.{" "}
            <em>Colorado Technology Law Journal</em>, 13, pp.203–218.
            <br />
            Yeung, K. (2017) Hypernudge: big data as a mode of regulation by
            design. <em>Information, Communication &amp; Society</em>,
            20(1), pp.118–136.
          </div>
        </div>
      </ProjectSection>

      <ProjectSection id="s6" number="06" title="Walkthroughs" rhythm="tight">
        <div className="cols" data-layout="asymmetric">
          <VideoBlock
            className="c1-7"
            src="https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_1lvy7on6&config[provider]={&quot;widgetId&quot;:&quot;1_i3whubu9&quot;}"
            title="DPOP Project Walkthrough"
            label="Process walkthrough"
          />
          <VideoBlock
            className="c7-13"
            src="https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_4mtplrua&config[provider]={&quot;widgetId&quot;:&quot;1_or960bd7&quot;}"
            title="DPOP WebExp Walkthrough"
            label="Final showcase"
          />
        </div>
      </ProjectSection>

      <ProjectSection id="s7" number="07" title="What I'd still change">
        <div className="cols" data-layout="asymmetric">
          <p className="proj-body c1-8">
            Every path in the current build converges on the same outcome. A
            more developed version would have real forks, where resistance
            feels like a genuine option but is structurally made harder —
            real systems aren&apos;t inevitable, they&apos;re just built to feel that
            way.
          </p>
          <div className="proj-reflection c1-9">
            <p className="proj-body" style={{ margin: 0 }}>
              The feedback after the first submission was that the message
              needed to land more clearly — the prototype gave people too
              much distance, letting them appreciate it without feeling
              implicated. This version fixes that by making the branching
              logic do real conceptual work. The language shift from
              &quot;you&quot; to &quot;the user&quot; to
              &quot;subject&quot; is slow enough that people I showed it to
              missed it completely in the moment, and only caught it when I
              walked them back through it afterward. That&apos;s not an accident.
              That&apos;s the mechanism working. The most useful thing I learned
              building this is that the gap between a design that represents
              something and one that actually enacts it is where the real
              work is. That&apos;s the gap I want to keep working in.
            </p>
          </div>
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/work">
          ← Back to all work
        </Link>
        <Link className="proj-nav-next" href="/projects/cardiopal">
          <span className="proj-next-label">Next project</span>
          CardioPal →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
