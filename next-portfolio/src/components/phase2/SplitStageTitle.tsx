"use client";

import type { ElementType } from "react";

type SplitStageTitleProps = {
  text: string;
  id?: string;
  className?: string;
  as?: "h2" | "h3";
};

/**
 * A deliberately small, word-only adaptation of React Bits' free Split Text.
 * The visible fragments are hidden from assistive technology while the parent
 * heading keeps one intact accessible name. Animation is owned by ReelMotion,
 * so both project titles share a single GSAP context and trigger lifecycle.
 */
export function SplitStageTitle({
  text,
  id,
  className = "",
  as = "h2",
}: SplitStageTitleProps) {
  const Tag = as as ElementType;
  const words = text.trim().split(/\s+/);

  return (
    <Tag id={id} className={className} aria-label={text} data-split-title>
      <span aria-hidden="true" data-split-copy>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-split-word>
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
