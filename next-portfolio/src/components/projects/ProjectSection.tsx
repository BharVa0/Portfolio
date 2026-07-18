import type { ProjectSectionProps } from "@/types/project";
import { SectionHeading } from "./SectionHeading";

/*
 * A numbered project chapter. `rhythm` controls the padding-top a
 * project's own module can key off of ("feature" adds the
 * `.is-feature-chapter` hook for a larger lead-in before a feature
 * chapter, "tight" adds `.tight-top` for a deliberately shortened gap,
 * "standard" is the default rhythm). Column layout and content live
 * entirely in `children` — this component only owns the numbered
 * heading and the section's outer rhythm.
 */
export function ProjectSection({
  id,
  number,
  title,
  featureTitle,
  rhythm = "standard",
  children,
}: ProjectSectionProps) {
  const rhythmClass =
    rhythm === "feature" ? " is-feature-chapter" : rhythm === "tight" ? " tight-top" : "";

  return (
    <section id={id} className={`proj-section${rhythmClass} reveal`}>
      <SectionHeading number={number} title={title} feature={featureTitle} />
      {children}
    </section>
  );
}
