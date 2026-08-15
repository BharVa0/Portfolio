"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PreviewNavbar.module.css";

interface MagneticNavItemProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
  dataCursorColor?: string;
}

function MagneticNavItem({
  children,
  href,
  isActive = false,
  isExternal = false,
  dataCursorColor = "var(--ember, #ff6a78)",
}: MagneticNavItemProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;

    const clampedX = Math.max(-5, Math.min(5, distanceX));
    const clampedY = Math.max(-5, Math.min(5, distanceY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const combinedClassName = `${styles.navItem} ${isActive ? styles.activeRoute : ""}`.trim();
  const inlineStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  if (isExternal || href.startsWith("#") || href.includes("#")) {
    return (
      <a
        href={href}
        className={combinedClassName}
        style={inlineStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-color={dataCursorColor}
      >
        <span className={styles.navText}>{children}</span>
        {isActive && <span className={styles.activeDot} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={combinedClassName}
      style={inlineStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-color={dataCursorColor}
    >
      <span className={styles.navText}>{children}</span>
      {isActive && <span className={styles.activeDot} aria-hidden="true" />}
    </Link>
  );
}

export function PreviewNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isReelActive = pathname === "/phase-2-preview";
  const isWorkActive = pathname === "/phase-2-preview/work";

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        {/* Logo/wordmark is kept completely static per design restraint contract */}
        <Link
          href="/phase-2-preview"
          className={styles.logoMark}
          aria-label="Bharat Vyas Portfolio Home"
          data-cursor-color="var(--ember, #ff6a78)"
        >
          <span className={styles.logoName}>Bharat Vyas</span>
          <span className={styles.logoTag}>· Portfolio</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary Navigation">
          <MagneticNavItem href="/phase-2-preview" isActive={isReelActive}>
            Reel
          </MagneticNavItem>
          <MagneticNavItem href="/phase-2-preview/work" isActive={isWorkActive}>
            Work
          </MagneticNavItem>
          <MagneticNavItem href="/phase-2-preview#about" isExternal>
            About
          </MagneticNavItem>
          <MagneticNavItem href="/phase-2-preview#contact" isExternal>
            Contact
          </MagneticNavItem>
        </nav>
      </div>
    </header>
  );
}
