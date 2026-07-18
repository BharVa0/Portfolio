import type { ProjectPageShellProps } from "@/types/project";

/*
 * Semantic project-page wrapper — no visual card container, just the
 * `.project-page` base class (shared surface/text/accent tokens, defined
 * in src/styles/projects.css) plus a `.project-{accent}` class a project's
 * own CSS Module can hook into to override those tokens with its own
 * colours (e.g. BettrCaseStudy.module.css targets `.project-bettr`).
 */
export function ProjectPageShell({ accent, children }: ProjectPageShellProps) {
  return (
    <article className={`project-page project-${accent}`}>{children}</article>
  );
}
