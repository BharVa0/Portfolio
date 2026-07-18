import type { ProjectAnnotationProps } from "@/types/project";

/** A mono label, optional evidence (`media`), and a supporting paragraph — used beneath design-system evidence (colour systems, type specimens). */
export function ProjectAnnotation({ label, media, children }: ProjectAnnotationProps) {
  return (
    <>
      <p className="proj-annotation-label">{label}</p>
      {media}
      <p className="proj-annotation">{children}</p>
    </>
  );
}
