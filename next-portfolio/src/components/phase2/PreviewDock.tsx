"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./PreviewDock.module.css";

interface DockItemData {
  id: string;
  label: string;
  glyph: string;
  href: string;
  isExternal?: boolean;
}

const DOCK_ITEMS: DockItemData[] = [
  { id: "reel", label: "Reel", glyph: "RL", href: "/phase-2-preview" },
  { id: "work", label: "Work", glyph: "WK", href: "/phase-2-preview/work" },
  { id: "about", label: "About", glyph: "AB", href: "/phase-2-preview#about", isExternal: true },
  { id: "contact", label: "Contact", glyph: "CT", href: "/phase-2-preview#contact", isExternal: true },
];

export function PreviewDock() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Disable proximity magnification under reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const radius = 140; // Proximity threshold in px
      const maxScale = 1.35; // Maximum magnification scale

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(mouseX - itemCenterX);

        let targetScale = 1;
        let targetY = 0;

        if (dist < radius) {
          // Cosine-squared bell curve for smooth proximity scaling and spring physics
          const normalized = dist / radius;
          const factor = Math.cos((normalized * Math.PI) / 2);
          const curve = factor * factor;
          targetScale = 1 + (maxScale - 1) * curve;
          targetY = -6 * curve;
        }

        gsap.to(item, {
          scale: targetScale,
          y: targetY,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseLeave = () => {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleFocus = (index: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item = itemRefs.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1.35,
        y: -6,
        duration: 0.25,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    }
  };

  const handleBlur = (index: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const item = itemRefs.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "back.out(1.5)",
        overwrite: "auto",
      });
    }
  };

  return (
    <div className={styles.dockWrapper} aria-label="Floating Navigation Dock">
      <nav ref={containerRef} className={styles.dockContainer} aria-label="Dock routes">
        {DOCK_ITEMS.map((item, index) => {
          const isActive =
            item.id === "reel"
              ? pathname === "/phase-2-preview"
              : item.id === "work"
              ? pathname === "/phase-2-preview/work"
              : false;

          const linkProps = {
            ref: (el: HTMLAnchorElement | null) => {
              itemRefs.current[index] = el;
            },
            href: item.href,
            className: `${styles.dockItem} ${isActive ? styles.activeItem : ""}`,
            onFocus: () => handleFocus(index),
            onBlur: () => handleBlur(index),
            "data-cursor-color": "var(--ember, #ff6a78)",
            "aria-label": `${item.label}${isActive ? " (current page)" : ""}`,
          };

          return item.isExternal || item.href.includes("#") ? (
            <a key={item.id} {...linkProps}>
              <span className={styles.tooltip}>{item.label}</span>
              <span className={styles.glyphBox}>
                <span className={styles.glyph}>{item.glyph}</span>
              </span>
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </a>
          ) : (
            <Link key={item.id} {...linkProps}>
              <span className={styles.tooltip}>{item.label}</span>
              <span className={styles.glyphBox}>
                <span className={styles.glyph}>{item.glyph}</span>
              </span>
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
