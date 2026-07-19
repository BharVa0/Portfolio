"use client";

import { useState } from "react";

interface EchoesVideoPosterProps {
  src: string;
  title: string;
}

const legacyFullscreenAttributes = {
  webkitallowfullscreen: "",
  mozallowfullscreen: "",
};

/**
 * The approved Echoes page deliberately holds the Kaltura player behind a
 * quiet poster so its editor-chrome/facecam thumbnail is not the first frame.
 * Loading the iframe is the page's one stateful interaction, so this is the
 * only Echoes Client Component.
 */
export function EchoesVideoPoster({ src, title }: EchoesVideoPosterProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="video-wrap">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          allowFullScreen
          allow="autoplay *; fullscreen *; encrypted-media *"
        />
      ) : (
        <>
          <button
            type="button"
            className="video-poster"
            data-cursor="Play"
            aria-label="Play the full playthrough recording"
            onClick={() => setLoaded(true)}
          >
            <span className="video-poster-play" aria-hidden="true">
              ►
            </span>
            <span className="video-poster-title">Watch the recording</span>
          </button>
          <noscript>
            <iframe
              src={src}
              title={title}
              allowFullScreen
              allow="autoplay *; fullscreen *; encrypted-media *"
              {...legacyFullscreenAttributes}
            />
          </noscript>
        </>
      )}
    </div>
  );
}
