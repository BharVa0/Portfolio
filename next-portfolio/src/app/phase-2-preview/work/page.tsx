import type { Metadata } from "next";
import { WorkIndexPage } from "@/components/phase2/WorkIndexPage";

export const metadata: Metadata = {
  title: "Work Index | Phase 2 Preview | Bharat Vyas Kodamana",
  description:
    "An image-free, typographic index of the six portfolio projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Phase2WorkIndexPage() {
  return <WorkIndexPage />;
}
