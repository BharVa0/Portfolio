import type { PrototypeEmbedProps } from "@/types/project";

/*
 * Shared iframe shell for a live build or prototype: a bar (label + open
 * link) above a full-width embed. This component makes no assumption
 * about whether the embed supports a custom cursor — that behaviour, if
 * any, is entirely owned by whatever renders into `overlay` (see
 * BettrLiveEmbed, the one Client Component that uses this prop). Plain
 * presentational JSX with no hooks of its own, so it can be rendered from
 * either a Server Component (a future non-interactive prototype embed) or
 * imported into a Client Component (BettrLiveEmbed) without either side
 * needing a directive.
 */
export function PrototypeEmbed({
  src,
  title,
  barLabel,
  openHref,
  openLabel = "Open full screen ↗",
  watched,
  openCursorHint,
  iframeRef,
  onIframeLoad,
  overlay,
  className,
}: PrototypeEmbedProps) {
  return (
    <div
      className={`proj-artifact-frame${watched ? " watched" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {watched && (
        <>
          <span className="corner-tr" aria-hidden="true" />
          <span className="corner-bl" aria-hidden="true" />
        </>
      )}
      <div className="proj-artifact-bar">
        <span>{barLabel}</span>
        <a
          className="proj-open-link"
          href={openHref}
          target="_blank"
          rel="noopener"
          data-cursor={openCursorHint}
        >
          {openLabel}
        </a>
      </div>
      {/* Relative wrapper so `overlay` (the PLAY bridge label) can be
          positioned absolutely in coordinates local to the iframe's own
          box, independent of the bar above it. */}
      <div style={{ position: "relative" }}>
        <iframe
          ref={iframeRef}
          className="proj-embed"
          src={src}
          title={title}
          loading="lazy"
          onLoad={onIframeLoad}
        />
        {overlay}
      </div>
    </div>
  );
}
