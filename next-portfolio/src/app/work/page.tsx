import type { Metadata } from "next";
import { WorkIndexPage } from "@/components/phase2/WorkIndexPage";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Work Index | Bharat Vyas Kodamana",
  description:
    "Seven projects exploring decision profiling, health reassurance, guitar-driven identity, memory space, industrial design research, and critical documentary.",
};

export default function WorkPage() {
  return (
    <>
      <main id="content">
        <WorkIndexPage />
      </main>
      <SiteFooter />
    </>
  );
}
