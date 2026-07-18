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
  bettr: {
    slug: "bettr",
    title: "BETTR.",
    shortDescription:
      "A speculative AI decision interface that profiles the person using it, then shows them exactly what that costs.",
    type: "Speculative design · Live build",
    role: "Sole designer & developer",
    tools: ["HTML", "CSS", "JavaScript"],
    accent: "bettr",
    route: "/projects/bettr",
    ogImage: "/assets/bettr/dashboard-wide-crop.jpg",
  },
};

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS[slug as ProjectSlug];
}
