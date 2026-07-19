import type { ComponentType } from "react";
import type { ProjectSlug } from "@/types/project";
import { BettrCaseStudy } from "./BettrCaseStudy";
import { CardioPalCaseStudy } from "./CardioPalCaseStudy";
import { FrankenTeenCaseStudy } from "./FrankenTeenCaseStudy";

/*
 * Maps a project slug to the React component that renders its case
 * study — deliberately separate from src/data/projects.ts. That file is
 * plain metadata (safe to loop over, e.g. for a future project index);
 * this one is executable UI. A slug that has metadata but no entry here
 * would be a project the registry knows *about* but can't yet *render* —
 * not a case this lesson needs, since PROJECT_SLUGS only lists "bettr",
 * but the distinction is why these are two files, not one.
 */
export const PROJECT_CONTENT: Record<ProjectSlug, ComponentType> = {
  bettr: BettrCaseStudy,
  cardiopal: CardioPalCaseStudy,
  frankenteen: FrankenTeenCaseStudy,
};
