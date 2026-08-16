import { HeroGInteractive } from "./HeroGInteractive";
import type { HeroGContent } from "./HeroG.types";
import styles from "./HeroG.module.css";

/* Real hero content — copy is unchanged from the approved static
 * integration (index.html's .hero section). This lives in the Server
 * Component because it's the part of Hero G that is genuinely just
 * content: it never changes at runtime, needs no browser API, and
 * should cost nothing in client JS. */
const content: HeroGContent = {
  bands: [
    {
      id: "b1",
      text: "Interactive Systems",
      label: "SYSTEM",
      segments: [
        { text: "Interactive", label: "INTERACTIVE" },
        { text: "Systems", label: "SYSTEMS" },
      ],
    },
    {
      id: "b2",
      text: "Playable Worlds",
      label: "PLAY",
      segments: [
        { text: "Playable", label: "PLAYABLE" },
        { text: "Worlds", label: "WORLDS" },
      ],
    },
    {
      id: "b3",
      text: "Research-led Experiences",
      label: "RESEARCH",
      segments: [
        { text: "Research-led", label: "RESEARCH-LED" },
        { text: "Experiences", label: "EXPERIENCES" },
      ],
    },
    {
      id: "b4",
      text: "Built Around Human Behaviour",
      label: "BEHAVIOUR",
      segments: [
        { text: "Built Around", label: "BUILT AROUND" },
        { text: "Human Behaviour", label: "HUMAN BEHAVIOUR" },
      ],
    },
  ],
  name: "Bharat Vyas",
  statementLines: [
    "I design interactive systems,",
    "playable worlds and research-led experiences.",
  ],
  ctaLabel: "Selected work",
  ctaHref: "/work",
  meta: {
    degree: "MSc Design and Digital Media",
    institution: "University of Edinburgh",
    location: "Edinburgh, UK · 2026",
  },
};

/* Namespaced separately from the static site's own "hs-loader-seen" key
 * so the two builds, even opened in tabs on the same origin during local
 * development, never read or clear each other's session flag. */
const LOADER_SESSION_KEY = "hs-next-loader-seen";

/*
 * Server Component: owns Hero G's real content and its semantic outer
 * <section>, and passes that content as serializable props into
 * HeroGInteractive.
 *
 * Everything inside the section beyond this point — the four bands, the
 * ember inspection twin, the name anchor, the lens — is one Client
 * Component rather than split further. One requestAnimationFrame loop
 * reads and writes all of their positions together every frame (pointer
 * displacement, scroll handoff and the lens rectangle all move in the
 * same tick).
 */
export function HeroG() {
  return (
    <section id="hero-g" className={styles.hero} aria-label="Introduction">
      <HeroGInteractive content={content} loaderSessionKey={LOADER_SESSION_KEY} />
    </section>
  );
}
