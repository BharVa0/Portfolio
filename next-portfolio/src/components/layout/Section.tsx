import type { ReactNode } from "react";

export type SectionRhythm = "major" | "compact";

type SectionProps = {
  children: ReactNode;
  id?: string;
  rhythm?: SectionRhythm;
};

/* "major" uses the shared homepage section rhythm (--space-section,
 * the bare `section { padding }` rule in css/portfolio.css); "compact"
 * is a tighter internal rhythm for smaller, nested blocks. Gutter
 * (--page-margin) applies at both — this component carries no
 * decorative styling of its own, only spacing. */
export function Section({ children, id, rhythm = "major" }: SectionProps) {
  return (
    <section id={id} className={`site-section site-section--${rhythm}`}>
      {children}
    </section>
  );
}
