import type { ProjectOpeningProps } from "@/types/project";

/*
 * The project's opening spread: eyebrow, title, thesis, metadata facts,
 * ownership statement, and a content slot (`children`) for the
 * evidence — BETTR's live embed, a future project's hero image. Only one
 * composition variant exists today ("split": text column + evidence
 * column, BETTR's `.c1-5` / `.c5-13` split) — the variant prop exists so a
 * future project needing a different opening shape doesn't have to fork
 * this component to get one.
 */
export function ProjectOpening({
  eyebrow,
  title,
  thesis,
  meta,
  ownership,
  children,
}: ProjectOpeningProps) {
  return (
    <section className="proj-hero">
      <div className="cols" data-layout="asymmetric">
        <div className="c1-5">
          <p className="proj-eyebrow">{eyebrow}</p>
          <h1 className="proj-title">{title}</h1>
          <p className="proj-thesis">{thesis}</p>
          <div className="proj-meta-grid">
            {meta.map((item) => (
              <div className="proj-meta-item" key={item.label}>
                <span className="proj-meta-label">{item.label}</span>
                {item.value}
              </div>
            ))}
          </div>
          <p className="proj-ownership">{ownership}</p>
        </div>
        <div className="c5-13">{children}</div>
      </div>
    </section>
  );
}
