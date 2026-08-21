/* Shared content shape for Hero G, kept in its own file so HeroG.tsx
 * (Server Component, owns the content) and HeroGInteractive.tsx (Client
 * Component, owns the DOM those bands animate) can both import the type
 * without importing from one another. */

export type ThesisBandId = "b1" | "b2" | "b3" | "b4";

export type BandSegment = {
  text: string;
  label: string;
};

export type ThesisBand = {
  id: ThesisBandId;
  /** Visible band text, e.g. "Playable Worlds". */
  text: string;
  /** Fallback or per-band label, e.g. "PLAY". */
  label: string;
  /** Granular word/phrase segments for dynamic lens tracking. */
  segments?: readonly BandSegment[];
};

export type HeroMeta = {
  degree: string;
  institution: string;
  location: string;
};

export type HeroGContent = {
  bands: readonly ThesisBand[];
  name: string;
  statementLines: readonly string[];
  meta: HeroMeta;
};
