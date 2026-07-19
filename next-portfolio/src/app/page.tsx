import { HeroG } from "@/components/hero/HeroG";
import { HomepageClosing } from "@/components/home/HomepageClosing";
import { WorkIndex } from "@/components/home/WorkIndex";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";

/*
 * Complete Phase 1 homepage, preserving the approved static sequence and
 * keeping homepage-only frame/footer markup off the project routes.
 */
export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main-content">
        <HeroG />
        <WorkIndex />
        <HomepageClosing />
      </main>
      <SiteFooter />
    </>
  );
}
