import type { ProjectOpeningProps } from "@/types/project";

/**
 * The project's opening spread: eyebrow, title, thesis, metadata facts,
 * ownership statement, and a content slot (`children`) for the evidence.
 *
 * Supported variants:
 * - "split": `.c1-5` text column / `.c5-13` evidence slot (designed for BETTR's live iframe embed)
 * - "balanced": `.c1-7` text column / `.c8-13` evidence slot (designed for editorial projects
 *   with longer titles like "FrankenTeen", providing comfortable text width without title clipping)
 */
export function ProjectOpening({
  eyebrow,
  title,
  thesis,
  meta,
  ownership,
  children,
  variant = "split",
}: ProjectOpeningProps) {
  const textCol = variant === "balanced" ? "c1-7" : "c1-5";
  const mediaCol = variant === "balanced" ? "c8-13 self-center" : "c5-13";

  return (
    <section className="proj-hero">
      <div className="cols" data-layout="asymmetric">
        <div className={textCol}>
          <p className="proj-eyebrow">{eyebrow}</p>
          <h1 className="proj-title">{title}</h1>
          <p className="proj-thesis">{thesis}</p>
          {meta && meta.length > 0 && (
            <div className="proj-meta-grid">
              {meta.map((item) => (
                <div className="proj-meta-item" key={item.label}>
                  <span className="proj-meta-label">{item.label}</span>
                  {item.value}
                </div>
              ))}
            </div>
          )}
          <p className="proj-ownership">{ownership}</p>
        </div>
        {children ? <div className={mediaCol}>{children}</div> : null}
      </div>
    </section>
  );
}
