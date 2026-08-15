import type { CSSProperties } from "react";
import Image from "next/image";
import type { MediaFigureProps, MediaDuoProps } from "@/types/project";

/**
 * An evidence screenshot with a mono caption and an optional attached
 * note. Supports three named media treatments:
 * - "spotlight": one dominant, full-column-width image for a chapter's primary visual
 * - "duo": paired side-by-side images with shared aspect ratio
 * - "supporting": deliberately sized smaller image with consistent captioning
 *
 * `crop` controls the display mechanisms:
 * - "default" (natural ratio)
 * - "coverTopLeft" (a 3:2 window anchored to the frame's legible corner)
 * - "native" (caps display width to `nativeWidth`)
 */
export function MediaFigure({
  src,
  alt,
  width,
  height,
  caption,
  note,
  crop = "default",
  treatment = "spotlight",
  aspectRatio,
  nativeWidth,
  loading = "lazy",
  className,
}: MediaFigureProps) {
  const cropClass =
    crop === "coverTopLeft" ? " crop-tl" : crop === "native" ? " native" : "";
  const treatmentClass = ` treatment-${treatment}`;

  const style: CSSProperties = {
    ...(crop === "native" && nativeWidth ? { "--native-w": `${nativeWidth}px` } : {}),
    ...(treatment === "supporting" && nativeWidth ? { "--native-w": `${nativeWidth}px` } : {}),
    ...(aspectRatio ? { "--figure-aspect": aspectRatio } : {}),
  } as CSSProperties;

  const hasAspect = Boolean(aspectRatio);

  return (
    <figure
      className={`proj-shot${cropClass}${treatmentClass}${className ? ` ${className}` : ""}`}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      <div className={`proj-shot-media${hasAspect ? " has-aspect" : ""}`}>
        <Image src={src} width={width} height={height} alt={alt} loading={loading} />
      </div>
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

/**
 * Paired duo: exactly two images side by side, both cropped to a shared
 * aspect ratio before pairing to guarantee matched baseline and vertical alignment.
 */
export function MediaDuo({
  left,
  right,
  aspectRatio = "16/10",
  className,
}: MediaDuoProps) {
  return (
    <div className={`media-duo${className ? ` ${className}` : ""}`}>
      <MediaFigure {...left} treatment="duo" aspectRatio={left.aspectRatio || aspectRatio} />
      <MediaFigure {...right} treatment="duo" aspectRatio={right.aspectRatio || aspectRatio} />
    </div>
  );
}
