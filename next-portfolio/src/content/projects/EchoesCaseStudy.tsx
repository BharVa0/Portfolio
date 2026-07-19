import Link from "next/link";
import { MediaFigure } from "@/components/projects/MediaFigure";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { EchoesVideoPoster } from "./EchoesVideoPoster";
import "./EchoesCaseStudy.css";

const KALTURA_PLAYTHROUGH_URL =
  'https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_6anm1jue&config[provider]={"widgetId":"1_a4enzzr2"}';

export function EchoesCaseStudy() {
  return (
    <ProjectPageShell accent="echoes">
      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/">← Index</Link>
          <span className="proj-frame-count mono">
            04 / 06 · Echoes of Home
          </span>
          <Link href="/projects/smartphone-mold">
            Next: Breaking the Smartphone Mold →
          </Link>
        </div>
      </header>

      <section className="proj-hero">
        <div className="cols" data-layout="asymmetric">
          <div className="c1-5">
            <p className="proj-eyebrow">
              Environmental storytelling · Solo · Unity, Blender
            </p>
            <h1 className="proj-title">Echoes of Home</h1>
            <p className="proj-thesis">
              A low-poly memory room built from the homes I&apos;ve actually
              lived in. No dialogue carries the weight here. The lighting, the
              objects, and one small symbolic act do.
            </p>
            <p className="proj-ownership">
              Solo project, Unity and Blender. I designed, built, and modelled
              every scene myself, including the runner track.
            </p>
          </div>
          <div className="c6-13 self-center">
            <MediaFigure
              src="/assets/echoes/laptop-interaction-crop.jpg"
              width={471}
              height={356}
              alt="Unity Scene view of the room, warm light against cool furniture, a trigger volume marked in magenta"
              caption="Development capture, Unity Scene view. Warmth and shadow overlapping, the way memory does."
              crop="native"
              nativeWidth={471}
              loading="eager"
              className="tone-dim proj-dominant-shot"
            />
          </div>
        </div>
      </section>

      <ProjectSection
        number="01"
        title={
          <span className="accent-heading">The room as a memory space</span>
        }
        rhythm="feature"
      >
        <div className="cols" data-layout="asymmetric">
          <div className="c1-5">
            <p className="proj-lede">
              The room comes first because it&apos;s where the memories
              actually live.
            </p>
            <p className="proj-body">
              I&apos;m asking the player to notice objects, not plot: the
              posters, the furniture, the way{" "}
              <span className="lamp-word">lamp light</span>{" "}
              falls across the
              rug. None of it is explained. Movement runs on a Character
              Controller, a raycast detects what&apos;s interactable, and
              trigger zones fire events without a special case for every prop.
              The lighting is baked, adjusted until it read as a specific time
              of day rather than a generic interior.
            </p>
          </div>
          <div className="c6-13 self-center">
            <MediaFigure
              src="/assets/echoes/room-scene-crop.jpg"
              width={471}
              height={356}
              alt="Unity Scene view of the room, gizmos on, showing the phone's trigger volume as a magenta capsule"
              caption="Development capture. The magenta shape is the phone's trigger volume, the object the player is meant to notice and reach for."
              crop="native"
              nativeWidth={471}
              className="tone-dim proj-dominant-shot"
            />
          </div>
        </div>
      </ProjectSection>

      <div className="echoes-pause reveal">
        <p>
          It&apos;s short <em>by design.</em> The pacing is the point.
        </p>
      </div>

      <ProjectSection number="02" title="Experience flow">
        <p className="proj-body">
          The phone is a literal gateway between the room and the runner, a
          deliberate contrast between stillness and speed. This is the actual
          order a player moves through, not a list rearranged for effect.
        </p>
        <div className="flow-list">
          <div className="flow-row">
            <span className="flow-num">1</span>
            <div className="flow-copy">
              <span className="flow-name">Room</span>
              <p className="flow-desc">
                The player explores freely, looking for the phone.
              </p>
            </div>
          </div>
          <div className="flow-row">
            <span className="flow-num">2</span>
            <div className="flow-copy">
              <span className="flow-name">Interaction</span>
              <p className="flow-desc">
                Touching the phone is the gateway to the runner.
              </p>
            </div>
          </div>
          <div className="flow-row">
            <span className="flow-num">3</span>
            <div className="flow-copy">
              <span className="flow-name">Story transition</span>
              <p className="flow-desc">
                A slide gives the player a breath before the next beat.
              </p>
            </div>
          </div>
          <div className="flow-row">
            <span className="flow-num">4</span>
            <div className="flow-copy">
              <span className="flow-name">Runner</span>
              <p className="flow-desc">
                Collect coins, avoid obstacles, on a custom-modelled track.
              </p>
            </div>
          </div>
          <div className="flow-row">
            <span className="flow-num">5</span>
            <div className="flow-copy">
              <span className="flow-name">Alternate room</span>
              <p className="flow-desc">
                A quieter space: one symbolic task, putting a laptop back where
                it belongs.
              </p>
            </div>
          </div>
          <div className="flow-row">
            <span className="flow-num">6</span>
            <div className="flow-copy">
              <span className="flow-name">Ending</span>
              <p className="flow-desc">
                Closes the arc and returns the player to the main room.
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="03"
        title="The runner sequence"
        rhythm="feature"
      >
        <div className="cols" data-layout="wide">
          <div className="c1-13">
            <MediaFigure
              src="/assets/echoes/runner-scene-crop.jpg"
              width={471}
              height={356}
              alt="Unity Scene view of the runner track, lanes stretching ahead under a storm-lit sky, the player character mid-run"
              caption="Development capture, Unity Scene view. The track and lanes, mid-run."
              crop="native"
              nativeWidth={471}
              className="tone-dim proj-dominant-shot runner-dominant"
            />
          </div>
        </div>
        <div
          className="cols"
          data-layout="asymmetric"
          style={{ marginTop: "var(--space-internal)" }}
        >
          <div className="c1-8">
            <p className="proj-body">
              The runner is a deliberate contrast: fast where the room is
              slow, energy against stillness. Obstacles spawn procedurally with
              weighted probability so the track never repeats, and a coin
              manager tracks progress toward a twenty-coin milestone across a
              few lanes. I modelled the track myself in Blender rather than
              using a stock asset, which let me set its length and the spacing
              between obstacles directly against the pacing I wanted, not the
              other way around.
            </p>
          </div>
          <div className="c9-13 self-center">
            <MediaFigure
              src="/assets/echoes/track-blender-crop.jpg"
              width={280}
              height={204}
              alt="Blender viewport showing the custom-modelled runner track"
              caption="The track, modelled from scratch"
              crop="native"
              nativeWidth={280}
              className="tone-dim"
            />
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="04"
        title="Implementation, testing, and limitations"
      >
        <p className="proj-body">
          A single manager runs menus and story slides; a separate audio
          manager handles ambient loops and scene-based fading. Testing was
          informal, three short sessions, think-aloud, moving from the intro
          through to the alternate room.
        </p>

        <div className="proj-feature-surface">
          <div className="proj-artifact-frame">
            <div className="proj-artifact-bar">
              <span>full playthrough · development recording</span>
            </div>
            <EchoesVideoPoster
              src={KALTURA_PLAYTHROUGH_URL}
              title="Echoes of Home screen recording"
            />
          </div>
          <p className="proj-artifact-caption">
            The complete sequence, recorded from Unity during development,
            room through to ending.
          </p>
        </div>

        <div className="pdrl">
          <div className="pdrl-item">
            <p className="proj-annotation-label">The problem</p>
            <p className="proj-annotation">
              The room-to-runner handoff broke repeatedly. Scene transitions
              run asynchronously, and Unity was briefly running two audio
              listeners at once during the switch.
            </p>
          </div>
          <div className="pdrl-item">
            <p className="proj-annotation-label">The decision</p>
            <p className="proj-annotation">
              A short delay lets audio fade out before the next layer fades in.
              I only found the real cause after a teammate looked at it with
              fresh eyes.
            </p>
          </div>
          <div className="pdrl-item">
            <p className="proj-annotation-label">What testing found</p>
            <p className="proj-annotation">
              Players missed the phone hotspot at first, story prompts were
              sometimes unclear, and more than one tester said the fonts looked
              generic against the tone I wanted.
            </p>
          </div>
          <div className="pdrl-item">
            <p className="proj-annotation-label">What&apos;s still limited</p>
            <p className="proj-annotation">
              No touch support, the ending needs more polish, and the main room
              doesn&apos;t visibly change when the player returns. That last
              one is mechanical, not just emotional, and it&apos;s the first
              thing I&apos;d fix.
            </p>
          </div>
        </div>
        <div className="quote-grid">
          <div className="quote-card">
            &quot;Is this the phone I am supposed to click?&quot;
          </div>
          <div className="quote-card">
            &quot;What exactly do I do with the laptop?&quot;
          </div>
        </div>
      </ProjectSection>

      <ProjectSection number="05" title="What I'd still change">
        <div className="proj-reflection">
          <p className="proj-body" style={{ margin: 0 }}>
            This project taught me more about patience than any single
            technical lesson did. Balancing emotion against gameplay pacing
            took longer than I expected, and the more personal the underlying
            story became, the more pressure I felt to represent it properly.
            I&apos;d add more memory objects, support touch controls, and give
            the room some real trace of what the player just did. I came out of
            it more confident with Unity, and with shaping something
            interactive around a personal story rather than a mechanical one.
          </p>
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/">
          ← Back to index
        </Link>
        <Link className="proj-nav-next" href="/projects/smartphone-mold">
          <span className="proj-next-label">Next project</span>
          Breaking the Smartphone Mold →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
