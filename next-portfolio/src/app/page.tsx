import { HeroG } from "@/components/hero/HeroG";
import { WorkIndex } from "@/components/home/WorkIndex";

/*
 * Phase 1 homepage: the approved Hero G implementation followed by the
 * approved editorial introduction and six-entry work index. Practice,
 * about, contact, navigation restructuring, and the footer remain later work.
 */
export default function Home() {
  return (
    <>
      <HeroG />
      <WorkIndex />
    </>
  );
}
