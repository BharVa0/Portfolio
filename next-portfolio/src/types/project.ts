import type { ReactNode, Ref } from "react";

/*
 * The list of project slugs that actually have a Next.js route. This is a
 * `const` tuple, not a plain string[], specifically so `ProjectSlug` below
 * can be derived from its literal values instead of widening to `string`.
 *
 * Adding a slug here (once that project's route is built) is the only
 * change generateStaticParams needs — see app/projects/[slug]/page.tsx.
 */
export const PROJECT_SLUGS = [
  "bettr",
  "cardiopal",
  "frankenteen",
  "echoes",
  "smartphone-mold",
  "playing-freedom",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/*
 * Broader than ProjectSlug on purpose: accent identifiers exist for every
 * project the static site already ships an identity for (css/portfolio.css
 * defines --cardiopal-accent, --frankenteen-accent, --echoes-accent too),
 * even though not every accent has a Next.js route yet. A component that
 * accepts an accent shouldn't need a new route to exist first.
 */
export type ProjectAccent =
  | "bettr"
  | "cardiopal"
  | "frankenteen"
  | "echoes"
  | "smartphone-mold"
  | "playing-freedom";

/** Stable, serializable project facts — never a React component. */
export interface ProjectMeta {
  slug: ProjectSlug;
  title: string;
  shortDescription: string;
  year?: string;
  type: string;
  role: string;
  tools: string[];
  accent: ProjectAccent;
  route: string;
  /** Optional route-specific Open Graph summary when the approved source uses copy distinct from the standard meta description. */
  ogDescription?: string;
  /** Optional: CardioPal has no image assets at all (a deliberate constraint, not a gap — see its own case study), so this can't be required for every project. */
  ogImage?: string;
}

export interface ProjectPageShellProps {
  accent: ProjectAccent;
  children: ReactNode;
}

export interface ProjectOpeningMetaItem {
  label: string;
  value: ReactNode;
}

export interface ProjectOpeningProps {
  eyebrow: string;
  title: ReactNode;
  thesis: string;
  meta?: ProjectOpeningMetaItem[];
  ownership: string;
  /** Evidence/content slot — BETTR's live embed, a future project's hero image, etc. */
  children: ReactNode;
  /** Column split between the text block and the evidence slot: "split" (c1-5/c5-13) or "balanced" (c1-7/c8-13). */
  variant?: "split" | "balanced";
}

/** Section-level rhythm: standard spacing, a feature chapter's larger lead-in, or a tightened gap before it. */
export type ProjectSectionRhythm = "standard" | "feature" | "tight";

export interface ProjectSectionProps {
  id?: string;
  number: string;
  title: ReactNode;
  /** Applies the larger `.is-feature` title treatment for a feature chapter. */
  featureTitle?: boolean;
  rhythm?: ProjectSectionRhythm;
  children: ReactNode;
}

export interface SectionHeadingProps {
  number: string;
  title: ReactNode;
  feature?: boolean;
}

/**
 * Controlled crop behaviour, matching the two real mechanisms already
 * shipped in css/portfolio.css: `default` (natural aspect ratio, full
 * width), `coverTopLeft` (crops to a 3:2 window anchored top-left, for
 * figures where the full frame isn't legible at display size — e.g. an
 * IDE window), and `native` (caps display width to the image's own native
 * size via `nativeWidth`, so a low-resolution source is never upscaled).
 */
export type MediaFigureCrop = "default" | "coverTopLeft" | "native";

/**
 * Three named media treatments for editorial case studies:
 * - spotlight: one dominant, full-column-width image for a chapter's primary visual
 * - duo: paired side-by-side images with shared aspect ratio
 * - supporting: deliberately sized smaller image with consistent captioning
 */
export type MediaFigureTreatment = "spotlight" | "duo" | "supporting";

export interface MediaFigureNote {
  heading?: string;
  body: ReactNode;
  outcome?: string;
}

export interface MediaFigureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  note?: MediaFigureNote;
  crop?: MediaFigureCrop;
  treatment?: MediaFigureTreatment;
  /** Enforced aspect ratio (e.g. "16/10", "3/2", "4/3", "16/9") */
  aspectRatio?: string;
  /** Required when crop is "native" or treatment is "supporting" — sets the display width cap in pixels. */
  nativeWidth?: number;
  loading?: "lazy" | "eager";
  /** Column-span utility class supplied by the caller (e.g. "c1-7"). */
  className?: string;
}

export interface MediaDuoProps {
  left: MediaFigureProps;
  right: MediaFigureProps;
  /** Shared aspect ratio enforced for both images in the duo (default: "16/10") */
  aspectRatio?: string;
  className?: string;
}

export interface ProjectAnnotationProps {
  label: string;
  /** Evidence between the label and the annotation paragraph — BETTR's palette band, its type specimen. */
  media?: ReactNode;
  children: ReactNode;
}

export interface VideoBlockProps {
  src: string;
  title: string;
  label: string;
  className?: string;
}

export interface PrototypeEmbedProps {
  src: string;
  title: string;
  barLabel: ReactNode;
  openHref: string;
  openLabel?: string;
  /** BETTR's corner-bracket "observation" motif. */
  watched?: boolean;
  /** data-cursor hint on the open link — a data attribute only, no behaviour here. */
  openCursorHint?: string;
  iframeRef?: Ref<HTMLIFrameElement>;
  onIframeLoad?: () => void;
  /** Bridge-owned overlay (e.g. BettrLiveEmbed's PLAY label), rendered over the iframe. */
  overlay?: ReactNode;
  /** Sets the `allowfullscreen` attribute — required by some third-party embeds (e.g. Figma's). */
  allowFullScreen?: boolean;
  /** Applies the `.tone-light` variant for an embed with a white/light background, matching the static site's own iframe tone class. */
  toneLight?: boolean;
  className?: string;
}
