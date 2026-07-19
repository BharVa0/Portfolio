import type { Metadata } from "next";
import { HeroG } from "@/components/hero/HeroG";
import { HomepageClosing } from "@/components/home/HomepageClosing";
import { WorkIndex } from "@/components/home/WorkIndex";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";

export const metadata: Metadata = {
  title: "Bharat Vyas Kodamana — Design Portfolio",
  description:
    "Bharat Vyas Kodamana — MSc Design and Digital Media portfolio. Interactive systems, playable worlds and research-led experiences designed around real human behaviour.",
  openGraph: {
    type: "website",
    title: "Bharat Vyas Kodamana — Design Portfolio",
    description:
      "Interactive systems, playable worlds and research-led experiences designed around real human behaviour.",
    images: ["/assets/frankenteen/frankenteen-hero-crop.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

/*
 * Complete Phase 1 homepage, preserving the approved static sequence and
 * keeping homepage-only frame/footer markup off the project routes.
 */
export default function Home() {
  return (
    <>
      <SkipLink href="#content" />
      <SiteHeader />
      <main id="content">
        <HeroG />
        <WorkIndex />
        <HomepageClosing />
      </main>
      <SiteFooter />
    </>
  );
}
