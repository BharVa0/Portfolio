import type { Metadata } from "next";
import { HeroG } from "@/components/hero/HeroG";

export const metadata: Metadata = {
  title: "Phase 2 Preview | Bharat Vyas Kodamana",
  description:
    "An isolated preview of the approved Hero G and persistent navigation redesign.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Phase2PreviewPage() {
  return (
    <>
      <a className="skip-link" href="#hero-g">
        Skip to main content
      </a>
      <main id="main-content">
        <HeroG />
      </main>
    </>
  );
}
