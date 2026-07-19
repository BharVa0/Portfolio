import Link from "next/link";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import "./PlayingFreedomCaseStudy.css";

const PLAYING_FREEDOM_VIDEO_URL =
  'https://cdnapisec.kaltura.com/p/2010292/embedPlaykitJs/uiconf_id/55171522?iframeembed=true&entry_id=1_jf3kb1k3&config[provider]={"widgetId":"1_f9mvnxk5"}';

const legacyFullscreenAttributes = {
  webkitallowfullscreen: "",
  mozallowfullscreen: "",
};

export function PlayingFreedomCaseStudy() {
  return (
    <ProjectPageShell accent="playing-freedom">
      <div className="freedom-wrap">
        <header className="freedom-statusbar">
          <Link href="/">← index</Link>
          <span>06 / 06 · Playing Freedom</span>
        </header>

        <section className="freedom-hero">
          <p className="freedom-eyebrow">critical analysis, game studies</p>
          <h1 className="freedom-title">Playing Freedom</h1>
          <p className="freedom-thesis">
            A video documentary on how Assassin&apos;s Creed IV: Black Flag,
            Freedom Cry turns the history of slavery into something playable,
            told through Adéwalé, a formerly enslaved man, and asking what that
            translation actually costs.
          </p>
          <div className="freedom-tags">
            <span className="freedom-tag">Critical analysis</span>
            <span className="freedom-tag">Game studies</span>
            <span className="freedom-tag">Video documentary</span>
            <span className="freedom-tag">Global Design Culture</span>
          </div>
        </section>

        <section className="freedom-video-hero">
          <div className="freedom-video-bar">
            <span>video documentary</span>
            <span>full piece</span>
          </div>
          <div className="freedom-video-wrap">
            <iframe
              src={PLAYING_FREEDOM_VIDEO_URL}
              allowFullScreen
              {...legacyFullscreenAttributes}
              allow="autoplay *; fullscreen *; encrypted-media *"
              title="Playing Freedom video documentary"
            />
          </div>
        </section>
        <p className="freedom-video-caption">
          The documentary is the deliverable for this project. Everything
          below is context for what you&apos;re watching, not a substitute for
          it.
        </p>

        <FreedomSection number="01" title="What this is examining">
          <p className="freedom-body">
            Freedom Cry shifts Assassin&apos;s Creed&apos;s usual perspective
            onto Adéwalé, a formerly enslaved man, and structures its world to
            communicate labour, control, violence, and resistance through
            environment as much as narration. This documentary looks at how
            that environmental and narrative design represents slavery
            specifically, and what happens to historical trauma when it gets
            reshaped into a playable, commercially distributed format. The
            same historical setting can carry a completely different meaning
            depending on the design choices made around it, and that&apos;s the
            actual subject here: not whether the game is good, but what its
            design does to the history it&apos;s depicting.
          </p>
          <p className="freedom-body freedom-body-muted">
            The analysis draws on maps, official artwork, in-game screenshots,
            and original gameplay recordings, cross-referenced against
            academic writing on video games and colonialism, environmental
            storytelling, and cultural heritage representation in games.
          </p>
        </FreedomSection>

        <FreedomSection number="02" title="Why this format">
          <p className="freedom-body">
            A written essay can describe environmental storytelling. It
            can&apos;t actually show you the thing it&apos;s describing happening
            in real time, the way the game&apos;s pacing, camera, and spatial
            design work together to communicate something the dialogue never
            says outright. A video documentary lets the analysis sit directly
            next to the footage it&apos;s analysing, which matters specifically
            for a project about how a game&apos;s environment does its
            communicating.
          </p>
          <div className="freedom-note-box">
            <strong>On sourcing.</strong> In-game footage combines cited
            YouTube walkthrough material with original recordings I captured
            myself. This documentary was produced for educational purposes and
            was not presented, screened, or distributed publicly beyond the
            course submission.
          </div>
        </FreedomSection>

        <FreedomSection number="03" title="The scholarship underneath it">
          <p className="freedom-body">
            This sits inside a growing body of work on what happens when
            colonial history and chattel slavery get adapted into mainstream,
            commercially driven game design. Williams writes on the experience
            of representing Black history through play. Harrer frames
            mainstream game design as a kind of neocolonial practice in its
            own right, regardless of authorial intent. Mukherjee&apos;s work on
            coded colonialism asks who actually gets agency in these narratives
            versus who remains a backdrop for someone else&apos;s story. Balela
            and Mundy, alongside more applied writing on environmental
            storytelling, gave me the design vocabulary to actually name what
            Freedom Cry&apos;s spaces are doing, beyond just describing them as
            &quot;atmospheric.&quot;
          </p>
          <div className="freedom-refs">
            Williams, A. (2020) Torture, play, and the Black experience.{" "}
            <em>Game Journal</em>, no. 9.
            <br />
            Tilly, G. (2025) Video games and slavery. ETC Press.
            <br />
            Balela, M.S. and Mundy, D. (2014) Analysing cultural heritage and
            its representation in video games. Proceedings of DiGRA 2014.
            <br />
            Harrer, S. (2018) Casual empire: video games as neocolonial praxis.{" "}
            <em>Open Library of Humanities</em>, 4(1).
            <br />
            Mukherjee, S. (2020) &quot;Truly an age of empires?&quot; Coded
            colonialism and subaltern histories in videogames. DiGRA Italia
            2020.
            <br />
            GameDesignSkills (2026) Environmental storytelling in video games.
          </div>
        </FreedomSection>

        <FreedomSection number="04" title="Where I'd take this further">
          <div className="freedom-reflection">
            <p className="freedom-body">
              The hardest part of this project wasn&apos;t finding sources, it
              was staying disciplined about the difference between describing
              a design choice and judging the game&apos;s intent behind it. A
              commercial studio&apos;s reasons for a design decision and the
              actual cultural effect of that decision aren&apos;t always the
              same conversation, and I tried to keep those separate rather
              than collapsing them into a single verdict. If I extended this,
              I&apos;d want to put Freedom Cry next to another game handling
              comparably difficult history, to see whether the patterns I
              found here are specific to this one title or true of how the
              medium handles historical trauma more broadly.
            </p>
          </div>
        </FreedomSection>

        <footer className="freedom-footer-nav">
          <Link className="freedom-nav-back" href="/">
            ← back to index
          </Link>
          <Link className="freedom-nav-next" href="/">
            <span>Back to start</span>
            All projects →
          </Link>
        </footer>
      </div>
    </ProjectPageShell>
  );
}

function FreedomSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="freedom-section">
      <header className="freedom-section-head">
        <span>{number}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}
