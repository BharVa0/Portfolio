import type { SectionHeadingProps } from "@/types/project";

/** Aligns a section's mono number, its heading, and (via `feature`) the larger feature-chapter title treatment. */
export function SectionHeading({ number, title, feature }: SectionHeadingProps) {
  return (
    <div className="proj-section-head">
      <span className="proj-num mono">{number}</span>
      <h2 className={`proj-section-title${feature ? " is-feature" : ""}`}>
        {title}
      </h2>
    </div>
  );
}
