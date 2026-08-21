"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavCurtain } from "./NavCurtainTransition";
import styles from "./SiteNavbar.module.css";

interface MagneticNavItemProps {
  children: React.ReactNode;
  href: string;
  curtainLabel?: string;
  isActive?: boolean;
  isExternal?: boolean;
  dataCursorColor?: string;
}

function MagneticNavItem({
  children,
  href,
  curtainLabel,
  isActive = false,
  isExternal = false,
  dataCursorColor = "var(--ember, #ff6a78)",
}: MagneticNavItemProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { navigateWithCurtain } = useNavCurtain();

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept primary left clicks without modifier keys
    if (
      curtainLabel &&
      !isExternal &&
      !href.startsWith("#") &&
      e.button === 0 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigateWithCurtain(href, curtainLabel);
    }
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
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-color={dataCursorColor}
    >
      <span className={styles.navText}>{children}</span>
      {isActive && <span className={styles.activeDot} aria-hidden="true" />}
    </Link>
  );
}

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { navigateWithCurtain } = useNavCurtain();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isWorkActive = pathname === "/work";
  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";

  const handleWordmarkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !isHome &&
      e.button === 0 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigateWithCurtain("/", "HOME");
    }
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${isHome ? styles.isHome : ""}`}>
      <div className={styles.navInner}>
        {/* Conditional wordmark: hidden on homepage ('/') where Hero G's knockout card already prominently displays the name */}
        {!isHome && (
          <Link
            href="/"
            className={styles.logoMark}
            aria-label="Bharat Vyas K Portfolio Home"
            onClick={handleWordmarkClick}
            data-cursor-color="var(--ember, #ff6a78)"
          >
            <span className={styles.logoName}>Bharat Vyas K</span>
          </Link>
        )}

        <nav className={styles.navLinks} aria-label="Primary Navigation">
          <MagneticNavItem href="/work" curtainLabel="WORK" isActive={isWorkActive}>
            Work
          </MagneticNavItem>
          <MagneticNavItem href="/about" curtainLabel="ABOUT" isActive={isAboutActive}>
            About
          </MagneticNavItem>
          <MagneticNavItem href="/contact" curtainLabel="CONTACT" isActive={isContactActive}>
            Contact
          </MagneticNavItem>
        </nav>
      </div>
    </header>
  );
}
