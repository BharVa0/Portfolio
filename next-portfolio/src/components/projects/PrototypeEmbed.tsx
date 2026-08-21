"use client";

import type { PrototypeEmbedProps } from "@/types/project";

/*
 * Shared iframe shell for a live build or prototype: a bar (label + open
 * link) above a full-width embed. This component makes no assumption
 * about whether the embed supports a custom cursor — that behaviour, if
 * any, is entirely owned by whatever renders into `overlay` (see
 * BettrLiveEmbed, the one Client Component that uses this prop).
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
  allowFullScreen,
  toneLight,
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
      {/* Relative wrapper so `overlay` can be positioned absolutely, and
          detects boundary crossing to prevent custom cursor freezing over iframe */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cursor-iframe-enter"));
          }
        }}
        onMouseLeave={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cursor-iframe-leave"));
          }
        }}
      >
        <iframe
          ref={iframeRef}
          className={`proj-embed${toneLight ? " tone-light" : ""}`}
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen={allowFullScreen}
          onLoad={onIframeLoad}
        />
        {overlay}
      </div>
    </div>
  );
}
