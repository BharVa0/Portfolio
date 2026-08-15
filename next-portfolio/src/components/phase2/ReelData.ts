export interface ReelProject {
  id: string;
  number: string;
  title: string;
  discipline: string;
  meta: string;
  premise: string;
  link: string;
  accentHex: string;
  bgHex: string;
  motifType: "profiling-grid" | "ekg-pulse" | "harmonic-wave" | "spatial-ray" | "glyph-matrix" | "horizon-grid";
  layoutStyle: "heroic-left" | "asymmetric-right" | "wide-center" | "split-editorial" | "staggered-left" | "grand-finale";
}

export const REEL_PROJECTS: readonly ReelProject[] = [
  {
    id: "bettr",
    number: "01",
    title: "BETTR.",
    discipline: "Speculative design · Live build",
    meta: "HTML / CSS / JS · Live build · Solo",
    premise: "A speculative AI decision interface that quietly profiles the person using it, then shows them exactly how, and what that costs.",
    link: "/projects/bettr",
    accentHex: "#ff6a78",
    bgHex: "#260a10",
    motifType: "profiling-grid",
    layoutStyle: "heroic-left",
  },
  {
    id: "cardiopal",
    number: "02",
    title: "CardioPal",
    discipline: "UX design · Health tech",
    meta: "Figma · UX design · 25+ screens",
    premise: "A companion app for a handheld EKG device, designed across 25+ screens to reassure a person tracking their own heart health, not alarm them.",
    link: "/projects/cardiopal",
    accentHex: "#82b5a5",
    bgHex: "#0e1715",
    motifType: "ekg-pulse",
    layoutStyle: "asymmetric-right",
  },
  {
    id: "frankenteen",
    number: "03",
    title: "FrankenTeen",
    discipline: "Game design · Interactive systems",
    meta: "Unity · Blender · Team of 3",
    premise: "A control scheme as identity: one guitar input carries exploration, dialogue, and confrontation in a three-act game.",
    link: "/projects/frankenteen",
    accentHex: "#f4a261",
    bgHex: "#1c1611",
    motifType: "harmonic-wave",
    layoutStyle: "split-editorial",
  },
  {
    id: "echoes",
    number: "04",
    title: "Echoes of Home",
    discipline: "Environmental storytelling · 3D world",
    meta: "Unity · Blender · Solo",
    premise: "A memory room that uses environment, lighting, and one small symbolic act, rather than dialogue, to carry an entire emotional arc.",
    link: "/projects/echoes",
    accentHex: "#e9c46a",
    bgHex: "#181410",
    motifType: "spatial-ray",
    layoutStyle: "staggered-left",
  },
  {
    id: "smartphone-mold",
    number: "05",
    title: "Breaking the Smartphone Mold",
    discipline: "Design research · Cultural analysis",
    meta: "Industry interview · Media & culture",
    premise: "Why every flagship phone looks the same, argued through an original interview with a marketer at CMF by Nothing.",
    link: "/projects/smartphone-mold",
    accentHex: "#e63946",
    bgHex: "#141414",
    motifType: "glyph-matrix",
    layoutStyle: "wide-center",
  },
  {
    id: "playing-freedom",
    number: "06",
    title: "Playing Freedom",
    discipline: "Critical analysis · Game studies",
    meta: "Video documentary · Critical essay",
    premise: "How a commercial game turns the history of slavery into something playable through Adéwalé in Black Flag: Freedom Cry, and what that translation costs.",
    link: "/projects/playing-freedom",
    accentHex: "#457b9d",
    bgHex: "#0d1b2a",
    motifType: "horizon-grid",
    layoutStyle: "grand-finale",
  },
] as const;
