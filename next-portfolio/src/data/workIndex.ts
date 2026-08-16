import type { ProjectSlug } from "@/types/project";

export type WorkIndexLayout =
  | "feature"
  | "feature-media-left"
  | "compact-text"
  | "compact-text-offset"
  | "compact-media";

export interface WorkIndexMedia {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  treatment: "frame" | "native" | "warm";
}

export interface WorkIndexEntry {
  slug: ProjectSlug;
  number: string;
  title: string;
  description: string;
  meta: string;
  cursorLabel: "View" | "Play";
  layout: WorkIndexLayout;
  media?: WorkIndexMedia;
}

/*
 * Homepage-specific editorial copy from the approved static index. It is
 * intentionally separate from PROJECTS: route metadata and index copy serve
 * different contexts and several approved strings differ verbatim.
 */
export const WORK_INDEX_ENTRIES: readonly WorkIndexEntry[] = [
  {
    slug: "above-the-noise",
    number: "01",
    title: "Above the Noise",
    description:
      "A personal story about how a mass-produced object became personally significant, leading into a data-driven inquiry on gaming, identity, and refuge.",
    meta: "Scrollytelling · Autoethnography & Design Research · Solo",
    cursorLabel: "View",
    layout: "feature",
    media: {
      src: "/assets/above-the-noise/opening-title-crop.png",
      srcSet:
        "/assets/above-the-noise/opening-title-crop.png 1440w",
      sizes: "(max-width: 899px) 92vw, 58vw",
      width: 1440,
      height: 900,
      alt: "Above the Noise opening scrollytelling title screen with phosphor terminal typography.",
      treatment: "frame",
    },
  },
  {
    slug: "bettr",
    number: "02",
    title: "BETTR",
    description:
      "A speculative AI decision interface that quietly profiles the person using it, then shows them exactly how, and what that costs.",
    meta: "HTML / CSS / JS · Live build · Solo, self-written",
    cursorLabel: "View",
    layout: "feature",
    media: {
      src: "/assets/bettr/dashboard-wide-crop.jpg",
      srcSet:
        "/assets/bettr/dashboard-wide-crop-480.jpg 480w, /assets/bettr/dashboard-wide-crop.jpg 1525w",
      sizes: "(max-width: 899px) 92vw, 58vw",
      width: 1525,
      height: 615,
      alt: "BETTR profile dashboard showing an autonomy metric quietly declining as the interface tracks the user's choices.",
      treatment: "frame",
    },
  },
  {
    slug: "cardiopal",
    number: "03",
    title: "CardioPal",
    description:
      "A health-tracking app interface designed to reassure, not just inform, across 25+ screens.",
    meta: "Figma · UX design · Solo",
    cursorLabel: "View",
    layout: "compact-text",
  },
  {
    slug: "frankenteen",
    number: "04",
    title: "FrankenTeen",
    description:
      "A control scheme as identity: one guitar input carries exploration, dialogue, and confrontation.",
    meta: "Unity · Team of 3, owned Act 3",
    cursorLabel: "View",
    layout: "feature-media-left",
    media: {
      src: "/assets/frankenteen/room-thumb-crop.jpg",
      srcSet:
        "/assets/frankenteen/room-thumb-crop-480.jpg 480w, /assets/frankenteen/room-thumb-crop.jpg 600w",
      sizes: "(max-width: 1023px) 92vw, 600px",
      width: 600,
      height: 320,
      alt: "Isometric view of Adam's bedroom in FrankenTeen, the teenage bedroom level built around the game's single guitar-input control scheme.",
      treatment: "native",
    },
  },
  {
    slug: "echoes",
    number: "05",
    title: "Echoes of Home",
    description:
      "A memory room that uses environment, not dialogue, to carry an entire emotional arc.",
    meta: "Unity · Blender · Solo",
    cursorLabel: "View",
    layout: "compact-text-offset",
  },
  {
    slug: "smartphone-mold",
    number: "06",
    title: "Breaking the Smartphone Mold",
    description:
      "Why every phone looks the same, argued through an interview with a CMF by Nothing marketer.",
    meta: "Design research · Solo, original interview",
    cursorLabel: "View",
    layout: "compact-media",
    media: {
      src: "/assets/smartphone/nothing-transparent.jpeg",
      srcSet:
        "/assets/smartphone/nothing-transparent-480.jpg 480w, /assets/smartphone/nothing-transparent.jpeg 1235w",
      sizes: "(max-width: 1023px) 92vw, 25vw",
      width: 1235,
      height: 926,
      alt: "Nothing Phone transparent back panel, industrial design reference.",
      treatment: "warm",
    },
  },
  {
    slug: "playing-freedom",
    number: "07",
    title: "Playing Freedom",
    description:
      "How a commercial game turns the history of slavery into something playable, and what that costs.",
    meta: "Documentary · Game studies · Solo",
    cursorLabel: "Play",
    layout: "compact-text-offset",
  },
] as const;
