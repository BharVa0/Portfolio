import type { Metadata } from "next";
import { HeroG } from "@/components/hero/HeroG";
import { HomepageClosing } from "@/components/home/HomepageClosing";
import { SiteFooter } from "@/components/site/SiteFooter";

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
 * Phase 2 Homepage: Hero G kinetic typography hero + editorial
 * practice/about/contact closing sections.
 */
export default function Home() {
  return (
    <>
      <main id="content">
        <HeroG />
        <HomepageClosing />
      </main>
      <SiteFooter />
    </>
  );
}

