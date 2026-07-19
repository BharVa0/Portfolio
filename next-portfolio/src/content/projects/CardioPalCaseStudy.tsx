import Link from "next/link";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectOpening } from "@/components/projects/ProjectOpening";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { PrototypeEmbed } from "@/components/projects/PrototypeEmbed";
import "./CardioPalCaseStudy.css";

const FIGMA_PROTOTYPE_URL =
  "https://www.figma.com/proto/BjVUce0cTU8HuXGL900ufX/CardioPal?page-id=0%3A1&node-id=14-10145&viewport=2695%2C1172%2C0.2&t=vrsM4pz1jfVVSFYj-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=14%3A10145&show-proto-sidebar=1";

const FIGMA_EMBED_URL =
  "https://embed.figma.com/design/BjVUce0cTU8HuXGL900ufX/CardioPal?node-id=0-1&embed-host=share";

export function CardioPalCaseStudy() {
  return (
    <ProjectPageShell accent="cardiopal">
      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/">← Index</Link>
          <span className="proj-frame-count mono">02 / 06 · CardioPal</span>
          <Link href="/projects/frankenteen">Next: FrankenTeen →</Link>
        </div>
      </header>

      <ProjectOpening
        eyebrow="UX design · Health tech"
        title="CardioPal"
        thesis="A companion app for a handheld EKG device, designed across 25-plus screens. The job of this interface isn't to look impressive — it's to make someone tracking their own heart health feel calm, not alarmed, at every step."
        meta={[
          { label: "Role", value: "Sole UX designer" },
          { label: "Tools", value: "Figma" },
          { label: "Method", value: "Usability testing, 2 participants" },
          { label: "Screens", value: "25+, full clickable prototype" },
        ]}
        ownership="Solo project — every screen, flow and testing round designed and run independently."
      >
        <PrototypeEmbed
          src={FIGMA_EMBED_URL}
          title="CardioPal Figma prototype"
          barLabel="cardiopal, figma prototype"
          openHref={FIGMA_PROTOTYPE_URL}
          openLabel="Open full prototype ↗"
          openCursorHint="Open"
          allowFullScreen
          toneLight
        />
        <p className="proj-artifact-caption">
          This is the actual clickable prototype, all 25-plus screens — the
          closest thing this project has to a real screenshot. Try the
          onboarding flow, then add a caregiver to see where testers actually
          got stuck.
        </p>
      </ProjectOpening>

      <ProjectSection id="s1" number="01" title="Context and the design challenge">
        <div className="cols" data-layout="split">
          <p className="proj-body c1-6">
            CardioPal supports people recording and reviewing EKG data through
            a connected handheld device. Because it sits in a health context,
            the interface has to feel clear, comfortable and trustworthy for
            users of very different ages and technical comfort levels — not
            just usable in the abstract. By Submission 1 this was a handful of
            early wireframes and some sketches hinting at a direction; the idea
            was clear in my head, the design hadn&apos;t caught up to it yet.
          </p>
          <p className="proj-body c7-13">
            The biggest shift since then was learning to think in user journeys
            instead of isolated screens. Onboarding is the clearest example: I
            initially didn&apos;t think it was necessary, until I considered
            someone using a handheld EKG device for the first time and realised
            the first screens they see have to reassure them before anything
            else. Clarity, in a health context, is itself a form of comfort.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection
        id="s2"
        number="02"
        title="What CardioPal does"
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <p className="proj-lede c1-9">
            Every one of the 25-plus screens sits under a small set of jobs the
            app has to do. None of them are about looking impressive — each
            exists because a real task or a testing result made it necessary.
          </p>
        </div>
        <div className="proj-feature-surface">
          <div className="cols" data-layout="wide">
            <div className="c1-13">
              <p className="proj-annotation-label">Feature set</p>
              <div className="feature-list">
                <div className="feature-row">
                  <span className="feature-name">Recording &amp; review</span>
                  <p className="feature-desc">
                    Capture a reading from the connected handheld device and
                    review it without wading through raw waveform data.
                  </p>
                </div>
                <div className="feature-row">
                  <span className="feature-name">Trends</span>
                  <p className="feature-desc">
                    See how a reading sits against earlier ones, so a single
                    number isn&apos;t read in isolation.
                  </p>
                </div>
                <div className="feature-row">
                  <span className="feature-name">
                    Caregiver sharing &amp; reports
                  </span>
                  <p className="feature-desc">
                    Add a caregiver and send them a report directly, so a
                    reading isn&apos;t a number only you see alone.
                  </p>
                </div>
                <div className="feature-row">
                  <span className="feature-name">Recommended actions</span>
                  <p className="feature-desc">
                    Flags patterns worth a second look, including possible
                    arrhythmia indicators. It&apos;s a prompt to check with a
                    clinician — never a diagnosis, and not medically validated
                    functionality.
                  </p>
                </div>
                <div className="feature-row">
                  <span className="feature-name">Offline access</span>
                  <p className="feature-desc">
                    Recordings and history stay available even without a live
                    connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection id="s3" number="03" title="Usability testing">
        <p className="proj-lede">
          Two participants, aged 25 and 45, both with intermediate experience
          using health and wellness apps but no prior exposure to CardioPal
          specifically.
        </p>
        <p className="proj-body">
          Sessions ran remotely, 15 to 20 minutes each, with each participant
          completing a fixed set of tasks: log in, view the how-to guide, add a
          caregiver, send a report, interact with recommended actions, toggle
          auto-sharing, and edit account details.
        </p>
        <div className="proj-paper-panel">
          <div className="vitals-grid">
            <div className="vitals-card">
              <div className="vitals-num">71%</div>
              <div className="vitals-label">
                Task completion without assistance
              </div>
            </div>
            <div className="vitals-card">
              <div className="vitals-num">≤10s</div>
              <div className="vitals-label">Login, fastest task recorded</div>
            </div>
            <div className="vitals-card">
              <div className="vitals-num">2</div>
              <div className="vitals-label">Participants, ages 25 and 45</div>
            </div>
            <div className="vitals-card">
              <div className="vitals-num">8/10</div>
              <div className="vitals-label">Top ease-of-use rating given</div>
            </div>
          </div>
          <div className="cols" data-layout="split">
            <div className="task-list c1-8" style={{ marginTop: 0 }}>
              <div className="task-row">
                <div className="task-name">Log in</div>
                <div className="task-desc">
                  Completed instantly by both participants. No confusion.
                </div>
              </div>
              <div className="task-row">
                <div className="task-name">View how-to guide</div>
                <div className="task-desc">
                  The most successful feature in the whole test. Both
                  participants said it made them feel prepared before touching
                  the actual hardware.
                </div>
              </div>
              <div className="task-row">
                <div className="task-name">Add a caregiver</div>
                <div className="task-desc">
                  Slowest task, 30 to 40 seconds. Participants were unsure what
                  the &quot;Designation&quot; field meant or whether it was
                  required.
                </div>
              </div>
              <div className="task-row">
                <div className="task-name">Send a report</div>
                <div className="task-desc">
                  One participant struggled with the order of actions — no
                  step-by-step guidance was visible during the flow.
                </div>
              </div>
              <div className="task-row">
                <div className="task-name">Edit account details</div>
                <div className="task-desc">
                  One participant looked for a pencil icon or clearer edit
                  affordance that wasn&apos;t there.
                </div>
              </div>
            </div>
            <div className="quote-grid c9-13" style={{ marginTop: 0 }}>
              <div className="quote-card">
                &quot;Is this the field I need to fill in to add them?&quot;
              </div>
              <div className="quote-card">
                &quot;I&apos;m not sure if I already sent it or not.&quot;
              </div>
            </div>
          </div>
        </div>
        <p className="proj-annotation-label">What this doesn&apos;t tell us</p>
        <p className="proj-annotation">
          Two remote sessions is an exploratory sample, not a statistically
          significant one. These numbers describe what happened in two
          specific sessions — where two people hesitated, and what they said
          out loud — not a validated success rate for a wider population.
          That&apos;s a real limitation, not a caveat to skim past.
        </p>
      </ProjectSection>

      <ProjectSection id="s4" number="04" title="What changed because of it">
        <p className="proj-body">
          Growing the prototype from a handful of screens to more than
          twenty-five forced real decisions about navigation, layout and
          consistency that a smaller prototype could comfortably avoid. Four
          changes came directly out of testing and that growth:
        </p>
        <div className="feature-list">
          <div className="feature-row">
            <span className="feature-name">Onboarding</span>
            <p className="feature-desc">
              A complete onboarding flow was added, plus a clear how-to section
              for EKG recording — the first screens someone sees now reassure
              them before anything else.
            </p>
          </div>
          <div className="feature-row">
            <span className="feature-name">Navigation</span>
            <p className="feature-desc">
              A structured bottom navigation bar became the anchor for the
              whole app, replacing what had been a more linear stack of
              screens.
            </p>
          </div>
          <div className="feature-row">
            <span className="feature-name">Modals</span>
            <p className="feature-desc">
              Smaller tasks — editing details, adding a caregiver, previewing
              insights, sending a report — moved into modal pop-ups instead of
              full pages, so the interface stopped feeling like an endless
              stack.
            </p>
          </div>
          <div className="feature-row">
            <span className="feature-name">Consistency</span>
            <p className="feature-desc">
              Copy was tightened throughout, spacing and components made
              consistent, and quick insight previews were added so checking a
              number doesn&apos;t require a separate screen.
            </p>
          </div>
        </div>
        <p
          className="proj-body proj-body-muted"
          style={{ marginTop: "var(--space-evidence)" }}
        >
          That scale is also where the calmer, more grounded visual tone
          actually started to hold together as a system, rather than a
          collection of nice individual screens.
        </p>
      </ProjectSection>

      <ProjectSection id="s5" number="05" title="What I'd still improve">
        <div className="proj-reflection">
          <p className="proj-body" style={{ margin: 0 }}>
            The caregiver and report flows still need clearer step-by-step
            guidance so users aren&apos;t left guessing at field meanings or
            action order. The edit affordance needs a proper icon rather than
            relying on users to discover it. I&apos;d also like the trends
            section to surface key insights directly rather than relying purely
            on charts, and to push harder on accessibility — contrast, touch
            target sizing, and screen reader friendliness — none of which got
            dedicated attention in this pass. In Submission 1, I was making
            screens because that was the task in front of me. By this version,
            I was designing with intention, thinking about where someone might
            hesitate before they ever told me. That shift matters more than any
            individual screen in here.
          </p>
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/">
          ← Back to index
        </Link>
        <Link className="proj-nav-next" href="/projects/frankenteen">
          <span className="proj-next-label">Next project</span>
          FrankenTeen →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
