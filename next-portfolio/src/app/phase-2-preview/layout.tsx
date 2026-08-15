import type { ReactNode } from "react";
import { MotionCursor } from "@/components/phase2/MotionCursor";
import { PreviewNavbar } from "@/components/phase2/PreviewNavbar";
import styles from "./layout.module.css";

export default function Phase2PreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.previewScope}>
      <MotionCursor />
      <PreviewNavbar />
      {children}
    </div>
  );
}
