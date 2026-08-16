import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "About | Bharat Vyas Kodamana",
  description:
    "MSc Design and Digital Media, University of Edinburgh. Tools, methods, and practice across interactive systems, playable worlds, and research-led experiences.",
};

export default function Page() {
  return (
    <>
      <main id="content">
        <AboutPage />
      </main>
      <SiteFooter />
    </>
  );
}
