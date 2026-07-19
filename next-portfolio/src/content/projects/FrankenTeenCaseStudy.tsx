import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaFigure } from "@/components/projects/MediaFigure";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectSection } from "@/components/projects/ProjectSection";
import "./FrankenTeenCaseStudy.css";

const KALTURA_PROCESS_URL =
  'https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_j1w7k3an&config[provider]={"widgetId":"1_rganw230"}';

const legacyFullscreenAttributes = {
  webkitallowfullscreen: "",
  mozallowfullscreen: "",
};

function nativeWidth(width: number): CSSProperties {
  return { "--native-w": `${width}px` } as CSSProperties;
}

export function FrankenTeenCaseStudy() {
  return (
    <ProjectPageShell accent="frankenteen">
      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/">← Index</Link>
          <span className="proj-frame-count mono">03 / 06 · FrankenTeen</span>
          <Link href="/projects/echoes">Next: Echoes of Home →</Link>
        </div>
      </header>

      <section className="proj-hero">
        <div className="cols" data-layout="asymmetric">
          <div className="c1-7">
            <p className="proj-eyebrow">
              Game design · Team of three · Unity, Blender
            </p>
            <h1 className="proj-title">FrankenTeen</h1>
            <p className="proj-thesis">
              FrankenTeen retells Frankenstein as teenage rebellion. Adam
              leaves boarding school to confront the man who made him, and a
              guitar is the only input the game ever asks for: exploration,
              dialogue, music, confrontation.
            </p>
            <p className="proj-ownership">
              FrankenTeen was made by a team of three. I designed and built Act
              3 end to end, the mansion approach and the attic confrontation,
              working in Blender and Unity to handle the environment, triggers,
              dialogue, and interaction that carry the ending.
            </p>
          </div>
          <div className="c8-13 self-center">
            <figure className="hero-visual">
              <Image
                src="/assets/frankenteen/mansion-gate-crop.jpg"
                width={1070}
                height={657}
                loading="eager"
                alt="The mansion at dusk, seen through its front gate, in Act 3"
              />
              <figcaption>Act 3, the mansion, the space I built</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ProjectSection number="01" title="The shared concept">
        <div className="cols" data-layout="asymmetric">
          <div className="c1-6 self-center">
            <MediaFigure
              src="/assets/frankenteen/bedroom-clean-crop.jpg"
              width={660}
              height={435}
              alt="Isometric render of Adam's bedroom: warm rug, band posters, guitar and amp by the bed, the game's opening space"
              caption="Adam's bedroom, the game's opening space"
              crop="native"
              nativeWidth={660}
            />
            <div style={{ marginTop: 16 }}>
              <MediaFigure
                src="/assets/frankenteen/guitar-prop-crop.jpg"
                width={330}
                height={127}
                alt="Clean Blender render of the guitar prop"
                caption="The guitar prop, modelled in Blender"
                crop="native"
                nativeWidth={330}
              />
            </div>
          </div>
          <div className="c7-13">
            <p className="proj-lede">
              We reinterpreted Frankenstein as a coming-of-age story instead
              of a horror one. The Creature becomes Adam, and the guitar he
              carries everywhere is both his identity and the game&apos;s only
              mechanic.
            </p>
            <p className="proj-body">
              The world blends gothic architecture, tall arches, heavy stone,
              with Adam&apos;s punk identity disrupting it through posture,
              attitude, and that guitar. We kept the visuals low poly and let
              mood come from lighting and shadow instead of surface detail. The
              core interaction is a single input that context-switches between
              talking to NPCs, playing music, and, in confrontational moments,
              an expressive combat action. One button carrying that much weight
              meant the guitar had to read as identity and tool at once, never
              just a prop.
            </p>
            <p
              className="proj-body proj-body-muted"
              style={{ marginTop: "var(--space-3)" }}
            >
              Most of the code is self-written. A couple of methods were
              borrowed and modified from an earlier project, and I used AI
              assistance to fix a persistent collider bug during Act 3
              development.
            </p>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection number="02" title="Designing Act 3 and its pacing">
        <div className="cols" data-layout="asymmetric">
          <div className="c1-5">
            <p className="proj-lede">
              Level design follows emotional pacing, not environmental scale.
              Each act had to intensify, and Act 3 needed to land as the highest
              point, not just the last location on the map.
            </p>
            <p className="proj-body">
              I built the mansion approach and attic against that same curve:
              wide, open grounds outside give the player room to breathe after
              two acts of confinement, then the attic takes that room away
              again for the confrontation. Layouts stay readable from the fixed
              isometric camera through sightlines and object placement rather
              than signage, the same discipline the whole team used, just
              carried further here.
            </p>
          </div>
          <div className="c6-13 self-center">
            <MediaFigure
              src="/assets/frankenteen/pacing-chart-crop.jpg"
              width={810}
              height={625}
              alt="Design-document chart plotting emotional intensity across School, Town, and House, rising sharply into House"
              caption="Emotional pacing, from the design document. School is Act 1, Town is Act 2, House is Act 3."
              crop="native"
              nativeWidth={810}
            />
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
            <span>Building the mansion approach</span>
          </>
        }
        featureTitle
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-9">
            <p className="proj-lede">
              By Act 3, Adam has spent two acts being restricted. I wanted the
              approach to feel like that pressure finally breaking open, before
              I take the room away again in the attic.
            </p>
          </div>
        </div>
        <div className="proj-feature-surface">
          <div className="feature-media pair">
            <figure style={nativeWidth(1022)}>
              <Image
                src="/assets/frankenteen/mansion-approach-crop.jpg"
                width={1022}
                height={627}
                alt="The mansion grounds in the Unity editor, fountain and gate visible, with a spatial trigger volume marked"
              />
              <figcaption>
                The wireframe marks a trigger volume around the fountain, one
                of the spatial cues that slows the player down before the door.
              </figcaption>
            </figure>
            <figure style={nativeWidth(444)}>
              <Image
                src="/assets/frankenteen/mansion-progression-crop.jpg"
                width={444}
                height={894}
                alt="Three-stage build progression of the mansion exterior: texturing, lighting, and colliders"
              />
              <figcaption>
                Texturing, then lighting, then colliders. Lighting is what
                turned a grey building into a place worth walking toward.
              </figcaption>
            </figure>
          </div>
          <p
            className="proj-annotation"
            style={{ marginTop: "var(--space-evidence)" }}
          >
            I built the mansion from the team&apos;s modular kit, wall
            sections, roof pieces, door frames, so I could iterate on its
            silhouette without remodelling every time the layout changed. The
            gate, fountain, and tree-lined path are pacing beats, not
            decoration: trigger volumes keep movement controlled right up to
            the door, the same logic as the level design, scaled to a full act.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection
        number="04"
        title={
          <>
            <span className="chapter-mark" aria-hidden="true">
              III
            </span>
            <span>Designing the attic confrontation</span>
          </>
        }
        featureTitle
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-9">
            <p className="proj-lede">
              The mansion&apos;s exterior is open. The attic does the opposite
              on purpose: once Adam is through the gate, the space narrows again
              for the confrontation with Victor.
            </p>
          </div>
        </div>
        <div className="proj-feature-surface">
          <div className="feature-media pair">
            <figure style={nativeWidth(973)}>
              <Image
                src="/assets/frankenteen/attic-approach-crop.jpg"
                width={973}
                height={641}
                alt="A courtyard archway and gate near the mansion, with a figure standing beside a lamp post"
              />
              <figcaption>
                The last stretch before the confrontation, an archway and a
                gated courtyard that narrows the path to one route in.
              </figcaption>
            </figure>
            <figure style={nativeWidth(520)}>
              <Image
                src="/assets/frankenteen/attic-lab-crop.jpg"
                width={520}
                height={354}
                alt="A dim, improvised laboratory space inside the mansion, lit by a glowing green containment tube and a candle"
              />
              <figcaption>
                Development capture, Unity: the confrontation room mid-build,
                not a finished render.
              </figcaption>
            </figure>
          </div>
          <p
            className="proj-annotation"
            style={{ marginTop: "var(--space-evidence)" }}
          >
            The confrontation happens somewhere improvised and abandoned, not
            grand, which is the spatial argument for why this is the climax and
            not just the last room in the game. Dialogue triggers, progression
            gates, and the breakable-object interactions that carry into this
            room were mine to set up. Lighting stays sparse on purpose, so the
            guitar&apos;s confrontation input reads as the brightest thing in
            the scene when it fires.
          </p>
        </div>
      </ProjectSection>

      <ProjectSection
        number="05"
        title="Blender, environment, and implementation"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-8">
            <p className="proj-lede">
              Everything in Act 3 traces back to two decisions: build modular,
              and let one system handle every interaction.
            </p>
            <p className="proj-body">
              I built the mansion from the team&apos;s kit of reusable wall,
              roof, and door pieces rather than one bespoke model. Slower to set
              up, but it meant I could change the layout without remodelling.
              Interaction runs the same way: trigger zones and tagged
              identifiers instead of hard-coded logic per object, so a central
              script listens for the guitar input and fires the right event
              depending on what&apos;s nearby. That&apos;s what let one button
              cover talking, playing music, and combat without a pile of
              special cases, and it&apos;s the same system behind the demo level
              we built to test the mechanic before wiring it into the full Act
              3 sequence.
            </p>
          </div>
          <div className="c9-13 self-center">
            <MediaFigure
              src="/assets/frankenteen/blender-wall-module-crop.jpg"
              width={340}
              height={262}
              alt="A single gothic wall module with arched windows, modelled in Blender"
              caption="One wall module, built to repeat"
              crop="native"
              nativeWidth={340}
            />
          </div>
        </div>
        <div
          className="proj-artifact-frame"
          style={{ marginTop: "var(--space-internal)" }}
        >
          <div className="proj-artifact-bar">
            <span>process footage · Act 3, greybox to playable</span>
          </div>
          <div className="video-wrap">
            <iframe
              src={KALTURA_PROCESS_URL}
              allowFullScreen
              {...legacyFullscreenAttributes}
              allow="autoplay *; fullscreen *; encrypted-media *"
              title="FrankenTeen process recording"
              loading="lazy"
              data-cursor="Play"
            />
          </div>
        </div>
        <p className="proj-artifact-caption">
          Recorded from the Unity editor during Act 3 development: the trigger
          and dialogue system above, plus the mansion approach and attic
          confrontation, running as one playable sequence.
        </p>
      </ProjectSection>

      <ProjectSection
        number="06"
        title="Testing, limitations, and what I'd change"
      >
        <p className="proj-body">
          We built a short demo level around the guitar mechanic and watched
          people play it without much explanation, on purpose: anything the
          level itself couldn&apos;t teach was a design gap, not a briefing gap.
        </p>
        <div className="proj-finding-list" data-layout="standard">
          <div className="proj-finding-row">
            <span className="proj-finding-tag tone-fine">Works fine</span>
            <span className="proj-finding-text">
              Players understood that outline colour tells them which song to
              play. The art direction and the guitar mechanic were both well
              received, and the easter egg hidden down the wrong-direction
              corridor landed as intended.
            </span>
          </div>
          <div className="proj-finding-row">
            <span className="proj-finding-tag tone-urgent">Urgent</span>
            <span className="proj-finding-text">
              A glitch meant the yellow interaction outline didn&apos;t show up
              on the gate, which stalled several players completely. Key
              bindings weren&apos;t intuitive, and NPCs weren&apos;t visually
              distinct enough as speakable.
            </span>
          </div>
          <div className="proj-finding-row">
            <span className="proj-finding-tag tone-nice">Nice to have</span>
            <span className="proj-finding-text">
              A UI indicator for key bindings, an on-screen reminder to press F
              for NPCs, and a clearer prompt for advancing dialogue, since some
              testers missed it entirely.
            </span>
          </div>
          <div className="proj-finding-row">
            <span className="proj-finding-tag tone-fine">Worth noting</span>
            <span className="proj-finding-text">
              Several testers tried re-entering Adam&apos;s room and playing
              songs at non-interactable objects just to check. Both are signs
              the mechanic was legible enough that people wanted to push on its
              edges.
            </span>
          </div>
        </div>
        <p
          className="proj-body"
          style={{ marginTop: "var(--space-evidence)" }}
        >
          The UI direction shifted toward 90s zine culture after early
          feedback, fully designed but never wired into the shipped build given
          our time. That&apos;s a real limitation, not something I&apos;m
          glossing over. The more personal Act 3 got, the more responsibility I
          felt to get it right: fix the gate glitch, make key bindings clearer,
          get NPCs reading as speakable at a glance. The systems are in the
          right shape. What&apos;s left is making them feel as intentional as
          the concept already is.
        </p>
        <div className="proj-refs">
          Shelley, M. (1818) Frankenstein; or, The Modern Prometheus. Project
          Gutenberg. Available at gutenberg.org/ebooks/84.
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/">
          ← Back to index
        </Link>
        <Link className="proj-nav-next" href="/projects/echoes">
          <span className="proj-next-label">Next project</span>
          Echoes of Home →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
