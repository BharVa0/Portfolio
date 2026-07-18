import Link from "next/link";
import { HeroG } from "@/components/hero/HeroG";
import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

/*
 * Lesson 3 homepage: Hero G, faithfully ported from the approved static
 * integration, plus one restrained placeholder section below it. The
 * placeholder exists only to prove the hero's scroll handoff lands
 * somewhere real and that #work (linked from SiteNavigation) is a
 * reachable anchor — the actual Selected Work index, built from real
 * project data, is a later lesson.
 */
export default function Home() {
  return (
    <>
      <HeroG />

      <Section id="work" rhythm="major">
        <PageContainer variant="reading">
          <p className="work-placeholder-eyebrow">Selected work</p>
          <h2 className="work-placeholder-heading">
            Project index migration follows in a later lesson.
          </h2>
          <p className="work-placeholder-body">
            This section is a placeholder for Hero G&apos;s scroll handoff and
            the &ldquo;Selected work&rdquo; route to land on — not the real
            index. The six projects move over, as reusable case-study
            components with real content, once that lesson starts.
          </p>
          <p className="work-placeholder-body">
            <Link href="/projects/bettr">
              View migrated BETTR case study →
            </Link>
          </p>
        </PageContainer>
      </Section>
    </>
  );
}
