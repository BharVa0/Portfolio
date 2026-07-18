import type { VideoBlockProps } from "@/types/project";

/**
 * A single walkthrough video with a mono label strip. No autoplay with
 * sound (the source iframe never sets one); responsive 16:9 aspect ratio
 * matches the approved static treatment.
 */
export function VideoBlock({ src, title, label, className }: VideoBlockProps) {
  return (
    <div className={`video-block${className ? ` ${className}` : ""}`}>
      <div className="video-wrap">
        <iframe
          src={src}
          title={title}
          allowFullScreen
          allow="autoplay *; fullscreen *; encrypted-media *"
          loading="lazy"
        />
      </div>
      <div className="video-label">{label}</div>
    </div>
  );
}
