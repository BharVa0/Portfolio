import type { ProjectMeta, ProjectSlug } from "@/types/project";

/*
 * Stable project metadata — plain data, no JSX. This is deliberately
 * separate from src/content/projects/registry.ts, which maps a slug to
 * the React component that actually renders that project's case study.
 * Metadata is safe to loop over (a future project index can map PROJECTS
 * into cards); a component is executable UI, not a value, and has no
 * business living in a data object.
 */
export const PROJECTS: Record<ProjectSlug, ProjectMeta> = {
  "above-the-noise": {
    slug: "above-the-noise",
    title: "Above the Noise",
    shortDescription:
      "A personal story about how a mass-produced object became personally significant, leading into a data-driven inquiry on gaming, identity, and refuge.",
    ogDescription:
      "A scrollytelling exploration of escapism, technology, and identity, combining autoethnography with practice-based design research.",
    type: "Scrollytelling · Design research",
    role: "Sole author & designer",
    tools: ["React", "Three.js", "Blender", "GSAP"],
    accent: "above-the-noise",
    route: "/projects/above-the-noise",
    ogImage: "/assets/above-the-noise/opening-title-crop.png",
  },
  bettr: {
    slug: "bettr",
    title: "BETTR.",
    shortDescription:
      "BETTR — a speculative AI decision interface that profiles the person using it, then shows them exactly what that costs. Solo-built, live HTML/CSS/JS.",
    ogDescription:
      "A speculative AI decision interface that profiles the person using it, then shows them exactly what that costs.",
    type: "Speculative design · Live build",
    role: "Sole designer & developer",
    tools: ["HTML", "CSS", "JavaScript"],
    accent: "bettr",
    route: "/projects/bettr",
    ogImage: "/assets/bettr/dashboard-wide-crop.jpg",
  },
  cardiopal: {
    slug: "cardiopal",
    title: "CardioPal",
    shortDescription:
      "CardioPal — a companion app for a handheld EKG device, designed across 25+ screens to reassure a person tracking their own heart health, not alarm them.",
    type: "UX design · Health tech",
    role: "Sole UX designer",
    tools: ["Figma"],
    accent: "cardiopal",
    route: "/projects/cardiopal",
    ogDescription:
      "A companion app for a handheld EKG device, designed to reassure, not just inform, across 25+ screens.",
  },
  frankenteen: {
    slug: "frankenteen",
    title: "FrankenTeen",
    shortDescription:
      "FrankenTeen: a top-down retelling of Frankenstein as teenage rebellion, built by a team of three. This case study covers Act 3, the mansion approach, the attic confrontation, and the systems I built to carry it.",
    type: "Game design · Team of three",
    role: "Act 3 design and implementation",
    tools: ["Unity", "Blender"],
    accent: "frankenteen",
    route: "/projects/frankenteen",
    ogDescription:
      "Designing and building Act 3 of a three-act guitar-driven adventure game: the mansion approach, the attic confrontation, and the Unity systems behind them.",
    ogImage: "/assets/frankenteen/mansion-gate-crop.jpg",
  },
  echoes: {
    slug: "echoes",
    title: "Echoes of Home",
    shortDescription:
      "Echoes of Home: a solo Unity environmental-storytelling project built from the homes I've actually lived in. No dialogue carries the weight. The lighting, the objects, and one small symbolic act do.",
    type: "Environmental storytelling · Solo",
    role: "Solo project",
    tools: ["Unity", "Blender"],
    accent: "echoes",
    route: "/projects/echoes",
    ogDescription:
      "A low-poly memory room, built solo. The lighting, the objects, and one small symbolic act carry the story.",
  },
  "smartphone-mold": {
    slug: "smartphone-mold",
    title: "Breaking the Smartphone Mold",
    shortDescription:
      "Strip the logos off ten flagship phones and most people couldn't tell you which is which. This is a case study on why that happened, using Nothing and CMF by Nothing as the test case, grounded in an actual interview with someone who works there.",
    type: "Design research · Cultural analysis",
    role: "Researcher and interviewer",
    tools: ["Design research", "Industry interview", "Media & culture"],
    accent: "smartphone-mold",
    route: "/projects/smartphone-mold",
  },
  "playing-freedom": {
    slug: "playing-freedom",
    title: "Playing Freedom",
    shortDescription:
      "A video documentary on how Assassin's Creed IV: Black Flag, Freedom Cry turns the history of slavery into something playable, told through Adéwalé, a formerly enslaved man, and asking what that translation actually costs.",
    type: "Critical analysis · Game studies",
    role: "Video documentary",
    tools: ["Critical analysis", "Game studies", "Video documentary"],
    accent: "playing-freedom",
    route: "/projects/playing-freedom",
  },
};

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS[slug as ProjectSlug];
}
