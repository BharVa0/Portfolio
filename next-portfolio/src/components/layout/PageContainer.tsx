import type { ReactNode } from "react";

export type PageContainerVariant = "reading" | "standard" | "wide";

type PageContainerProps = {
  children: ReactNode;
  variant?: PageContainerVariant;
};

/* Width constraints match the static site's own explicit layout modes
 * (css/portfolio.css [data-layout="reading"|"standard"|"wide"]) — not
 * new values. "reading" is for long-form paragraphs only. */
export function PageContainer({
  children,
  variant = "standard",
}: PageContainerProps) {
  return (
    <div className={`page-container page-container--${variant}`}>
      {children}
    </div>
  );
}
