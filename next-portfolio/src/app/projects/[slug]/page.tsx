import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_SLUGS } from "@/types/project";
import { PROJECTS, getProjectMeta } from "@/data/projects";
import { PROJECT_CONTENT } from "@/content/projects/registry";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/*
 * Tells Next.js which slugs exist ahead of time, so `npm run build`
 * pre-renders /projects/bettr to a static HTML file instead of waiting
 * for a real visitor to request it. Only slugs listed in PROJECT_SLUGS
 * (currently just "bettr") get a route — every other project stays
 * unimplemented rather than shipping an empty page.
 */
export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectMeta(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Bharat Vyas Kodamana`,
    description: project.shortDescription,
    openGraph: {
      type: "article",
      title: `${project.title} | Bharat Vyas Kodamana`,
      description: project.shortDescription,
      images: [project.ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug as keyof typeof PROJECTS];
  const Content = PROJECT_CONTENT[slug as keyof typeof PROJECT_CONTENT];

  // Covers both an unknown slug (no metadata) and a known-but-unimplemented
  // one (metadata exists in a future lesson, content doesn't yet) — either
  // way, the visitor gets Next.js's real 404, not a blank or broken page.
  if (!project || !Content) {
    notFound();
  }

  return <Content />;
}
