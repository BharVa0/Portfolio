import type { CSSProperties } from "react";
import Image from "next/image";
import type { MediaFigureProps } from "@/types/project";

/**
 * An evidence screenshot with a mono caption and an optional attached
 * note. `crop` controls the three real display mechanisms already shipped
 * in the static site: "default" (natural ratio), "coverTopLeft" (a 3:2
 * window anchored to the frame's legible corner), and "native" (caps
 * width to `nativeWidth` so a low-resolution source is never upscaled).
 *
 * Uses next/image rather than a plain <img>: every figure here is a
 * static screenshot with known native dimensions, no animation and no
 * iframe-adjacent cursor/pointer behaviour to preserve — exactly the case
 * next/image is for (automatic optimisation, no distortion since width/
 * height are the image's real native size).
 */
export function MediaFigure({
  src,
  alt,
  width,
  height,
  caption,
  note,
  crop = "default",
  nativeWidth,
  loading = "lazy",
  className,
}: MediaFigureProps) {
  const cropClass =
    crop === "coverTopLeft" ? " crop-tl" : crop === "native" ? " native" : "";
  const style: CSSProperties | undefined =
    crop === "native" && nativeWidth
      ? ({ "--native-w": `${nativeWidth}px` } as CSSProperties)
      : undefined;

  return (
    <figure className={`proj-shot${cropClass}${className ? ` ${className}` : ""}`} style={style}>
      <Image src={src} width={width} height={height} alt={alt} loading={loading} />
      {caption && <div className="proj-shot-caption">{caption}</div>}
      {note && (
        <div className="proj-shot-note">
          {note.heading && <span className="proj-shot-note-head">{note.heading}</span>}
          <p>{note.body}</p>
          {note.outcome && <span className="outcome">{note.outcome}</span>}
        </div>
      )}
    </figure>
  );
}
