import type { Metadata } from "next";
import { WorkFlowingPage } from "@/components/phase2/WorkFlowingPage";

export const metadata: Metadata = {
  title: "Work Flowing Comparison | Phase 2 Preview | Bharat Vyas Kodamana",
  description:
    "An image-free FlowingMenu comparison view of the six portfolio projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Phase2WorkFlowingPage() {
  return <WorkFlowingPage />;
}
