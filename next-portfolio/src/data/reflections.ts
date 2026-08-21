export interface ProjectReflection {
  id: string;
  projectSlug: string;
  projectTitle: string;
  quote: string;
  sourceChapter: string;
  accentColor: string;
}

export const PROJECT_REFLECTIONS: ProjectReflection[] = [
  {
    id: "bettr-reflection",
    projectSlug: "bettr",
    projectTitle: "BETTR.",
    quote: "The gap between a design that represents something and one that actually enacts it is where the real work is.",
    sourceChapter: "Reflections & learnings (04)",
    accentColor: "var(--ember, #ff6a78)",
  },
  {
    id: "cardiopal-reflection",
    projectSlug: "cardiopal",
    projectTitle: "CardioPal",
    quote: "I was designing with intention, thinking about where someone might hesitate before they ever told me.",
    sourceChapter: "What I'd still improve (05)",
    accentColor: "#82b5a5",
  },
  {
    id: "frankenteen-reflection",
    projectSlug: "frankenteen",
    projectTitle: "FrankenTeen",
    quote: "Anything the level itself couldn't teach was a design gap, not a briefing gap.",
    sourceChapter: "Testing, limitations, and what I'd change (06)",
    accentColor: "#f4a261",
  },
  {
    id: "echoes-reflection",
    projectSlug: "echoes",
    projectTitle: "Echoes of Home",
    quote: "I came out of it more confident with Unity, and with shaping something interactive around a personal story rather than a mechanical one.",
    sourceChapter: "What I'd still change (05)",
    accentColor: "#e9c46a",
  },
];
