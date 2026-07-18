"use client";

import { useEffect, useRef } from "react";
import { PrototypeEmbed } from "./PrototypeEmbed";

interface BettrLiveEmbedProps {
  src: string;
  title: string;
  barLabel: string;
  openHref: string;
}

/*
 * The same-origin PLAY cursor bridge, ported from js/portfolio.js's
 * bindBridge/releaseBridges. One deliberate difference from the static
 * site: there, the bridge hands control to a site-wide custom-cursor dot
 * (js/portfolio.js's `dot`/`labelEl`) that doesn't exist in this Next.js
 * app yet — that infrastructure is a future lesson, not built here. This
 * component ports the bridge's actual mechanics (same-origin detection,
 * translating iframe-local pointer coordinates, hiding the iframe's
 * native cursor, showing a "PLAY" reveal, dropping it the instant the
 * parent receives pointer movement, full cleanup) into a small,
 * self-contained overlay instead of wiring into cursor infrastructure
 * that isn't there — the proven behaviour, not a reinvention of it.
 *
 * Kept as the smallest practical Client Component: only the bridge (a
 * ref + one effect) needs the browser APIs below. PrototypeEmbed, the
 * frame chrome around it, and the rest of the BETTR page stay Server
 * Components.
 */
export function BettrLiveEmbed({ src, title, barLabel, openHref }: BettrLiveEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = iframeRef.current;
    const overlay = overlayRef.current;
    if (!frame || !overlay) return;

    let boundDoc: Document | null = null;
    let injectedStyle: HTMLStyleElement | null = null;
    let onPointerMove: ((e: PointerEvent) => void) | null = null;

    function showOverlay(x: number, y: number) {
      if (!overlay) return;
      overlay.style.opacity = "1";
      overlay.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }

    function hideOverlay() {
      if (!overlay) return;
      overlay.style.opacity = "0";
    }

    function unbind() {
      if (boundDoc && onPointerMove) {
        boundDoc.removeEventListener("pointermove", onPointerMove);
      }
      if (injectedStyle?.parentNode) {
        injectedStyle.parentNode.removeChild(injectedStyle);
      }
      boundDoc = null;
      injectedStyle = null;
      onPointerMove = null;
      hideOverlay();
    }

    function bind() {
      if (!frame) return;
      let doc: Document | null = null;
      try {
        doc = frame.contentDocument;
      } catch {
        doc = null;
      }
      // Cross-origin (or not yet ready) — native cursor fallback, no bridge.
      if (!doc || !doc.documentElement) return;

      onPointerMove = (e: PointerEvent) => {
        // Coordinates are already relative to the iframe's own viewport,
        // which is exactly the local space PrototypeEmbed's relative
        // wrapper positions this overlay in.
        showOverlay(e.clientX, e.clientY);
      };
      doc.addEventListener("pointermove", onPointerMove, { passive: true });

      injectedStyle = doc.createElement("style");
      injectedStyle.textContent =
        "html, body, a, button, input, [role='button'] { cursor: none !important; }";
      (doc.head || doc.documentElement).appendChild(injectedStyle);
      boundDoc = doc;
    }

    function handleLoad() {
      unbind();
      bind();
    }

    function handleParentPointerMove() {
      // A pointermove reaching the parent document only fires once the
      // pointer has actually left the iframe (iframes are their own
      // document — motion inside never bubbles out) — drop the overlay.
      hideOverlay();
    }

    frame.addEventListener("load", handleLoad);
    window.addEventListener("mousemove", handleParentPointerMove);
    bind(); // iframe may already be loaded before this effect runs

    return () => {
      frame.removeEventListener("load", handleLoad);
      window.removeEventListener("mousemove", handleParentPointerMove);
      unbind();
    };
  }, []);

  return (
    <PrototypeEmbed
      src={src}
      title={title}
      barLabel={barLabel}
      openHref={openHref}
      openCursorHint="Open"
      watched
      iframeRef={iframeRef}
      overlay={
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.15s ease",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--paper)",
            background: "var(--proj-accent)",
            padding: "6px 14px",
            borderRadius: "999px",
          }}
        >
          Play
        </div>
      }
    />
  );
}
