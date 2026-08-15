import type { Metadata } from "next";
import { WorkIndexPage } from "@/components/phase2/WorkIndexPage";
import { SiteNavbar } from "@/components/phase2/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SkipLink } from "@/components/site/SkipLink";

export const metadata: Metadata = {
  title: "Work Index | Bharat Vyas Kodamana",
  description:
    "Six projects exploring decision profiling, health reassurance, guitar-driven identity, memory space, industrial design research, and critical documentary.",
};

export default function WorkPage() {
  return (
    <>
      <SkipLink href="#work-content" />
      <SiteNavbar />
      <div id="work-content">
        <WorkIndexPage />
      </div>
      <SiteFooter />
    </>
  );
}
