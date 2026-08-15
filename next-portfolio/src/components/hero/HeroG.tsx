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
    { id: "b1", text: "Interactive Systems", label: "SYSTEM" },
    { id: "b2", text: "Playable Worlds", label: "PLAY" },
    { id: "b3", text: "Research-led Experiences", label: "RESEARCH" },
    { id: "b4", text: "Built Around Human Behaviour", label: "BEHAVIOUR" },
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

/* Bootstrap script: sets the hero's initial animation-state classes on
 * <html> and, on a first visit with motion allowed, inserts the loader
 * overlay — all before React hydrates anything. This is deliberately a
 * plain inline <script>, not next/script's beforeInteractive strategy:
 * that strategy is real, but the installed Next.js docs
 * (node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md)
 * confirm it must live in the root layout, which would spread Hero-G-only
 * logic into the shared shell every route pays for. A raw <script>
 * placed exactly where the hero renders runs at the same point in the
 * document, needs no framework hook, and stays fully scoped here — the
 * same reasoning next-themes uses for its own "avoid a flash" script.
 *
 * <html> gets suppressHydrationWarning (see layout.tsx) because this
 * script edits its classList before React's first hydration pass sees
 * it; without that flag React would log a harmless but noisy mismatch
 * warning for a className change it didn't make itself.
 *
 * Classnames are read from the CSS module at build time and interpolated
 * as literal strings, so the loader overlay this script creates stays
 * scoped to HeroG.module.css even though it's never JSX. There is no
 * user input anywhere in this string — it is fully authored, static text
 * — so dangerouslySetInnerHTML here carries none of the risk the name
 * warns about. */
const bootstrapScript = `(function () {
  var html = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem("${LOADER_SESSION_KEY}") === "1"; } catch (e) {}

  if (!reduced) html.classList.add("hg-can-animate");

  if (!reduced && !seen) {
    html.classList.add("hg-pending");
    var overlay = document.createElement("div");
    overlay.className = "${styles.loader}";
    overlay.id = "hg-loader";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML =
      '<p class="${styles.loaderName}">Bharat Vyas</p>' +
      '<p class="${styles.loaderCount}" id="hg-loader-count">00</p>';
    document.body.appendChild(overlay);
  } else {
    html.classList.add("hg-ready");
  }
})();`;

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
 * same tick), so a Server/Client split at that level would mean either
 * duplicating this markup between a static and an interactive version,
 * or threading eight-plus DOM refs through prop drilling for no benefit
 * — exactly the "awkward DOM ownership" case the brief allows a single
 * Client Component for. Keeping HeroG itself a Server Component still
 * means the copy below ships as plain HTML with zero extra client JS,
 * and only the interactive subtree pays the client-bundle cost.
 */
export function HeroG() {
  return (
    <section id="hero-g" className={styles.hero} aria-label="Introduction">
      <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      <HeroGInteractive content={content} loaderSessionKey={LOADER_SESSION_KEY} />
    </section>
  );
}
