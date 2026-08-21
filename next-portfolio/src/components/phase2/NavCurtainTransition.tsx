"use client";

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";
import styles from "./NavCurtainTransition.module.css";

export interface CurtainOptions {
  label: string;
  bgColor?: string;
  textColor?: string;
}

interface NavCurtainContextType {
  navigateWithCurtain: (href: string, options: string | CurtainOptions) => void;
  isNavigating: boolean;
}

const NavCurtainContext = createContext<NavCurtainContextType>({
  navigateWithCurtain: () => {},
  isNavigating: false,
});

export function useNavCurtain() {
  return useContext(NavCurtainContext);
}

const PROJECT_ACCENT_MAP: Record<string, { accent: string; textColor: string; title: string }> = {
  "above-the-noise": {
    accent: "#3ddc84",
    textColor: "#0d0c0b",
    title: "Above the Noise",
  },
  bettr: {
    accent: "#ff4d8d",
    textColor: "#ffffff",
    title: "BETTR.",
  },
  cardiopal: {
    accent: "#82b5a5",
    textColor: "#0d0c0b",
    title: "CardioPal",
  },
  frankenteen: {
    accent: "#c68a2e",
    textColor: "#0d0c0b",
    title: "FrankenTeen",
  },
  echoes: {
    accent: "#87a2b8",
    textColor: "#0d0c0b",
    title: "Echoes of Home",
  },
  "smartphone-mold": {
    accent: "#38bdf8",
    textColor: "#0d0c0b",
    title: "Breaking the Smartphone Mold",
  },
  "playing-freedom": {
    accent: "#e14b3c",
    textColor: "#ffffff",
    title: "Playing Freedom",
  },
};

const panelVariants: Variants = {
  hiddenLeft: {
    x: "-100%",
    transition: { duration: 0 },
  },
  center: {
    x: "0%",
    transition: {
      duration: 0.3, // 300ms entering from left edge
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exitLeft: {
    x: "-100%",
    transition: {
      duration: 0.3, // 300ms retreating back off to left
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function NavCurtainProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");
  const [panelBg, setPanelBg] = useState("var(--ink, #0d0c0b)");
  const [panelTextColor, setPanelTextColor] = useState("var(--paper, #f4efe6)");
  const [animVariant, setAnimVariant] = useState<"hiddenLeft" | "center" | "exitLeft">("hiddenLeft");

  const isTransitioningRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const navigateWithCurtain = useCallback(
    (href: string, options: string | CurtainOptions) => {
      // If already on this path or currently transitioning, ignore
      if (pathname === href || isTransitioningRef.current) {
        return;
      }

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion: instant cut, zero animation, no curtain
      if (reducedMotion) {
        router.push(href);
        return;
      }

      const label = typeof options === "string" ? options : options.label;
      const bg = typeof options === "string" ? "var(--ink, #0d0c0b)" : (options.bgColor || "var(--ink, #0d0c0b)");
      const textCol = typeof options === "string" ? "var(--paper, #f4efe6)" : (options.textColor || "var(--paper, #f4efe6)");

      isTransitioningRef.current = true;
      clearAllTimers();
      setTargetLabel(label);
      setPanelBg(bg);
      setPanelTextColor(textCol);
      setIsOpen(true);
      setAnimVariant("center"); // Step 1: Animate from -100% to 0% (300ms entering)

      // Step 2: Route change happens while fully covered during the static hold
      const routeSwapTimer = setTimeout(() => {
        router.push(href);

        // Step 3: Hold for 450ms total with the destination word fully static & visible
        const retreatTimer = setTimeout(() => {
          setAnimVariant("exitLeft"); // Step 4: Animate from 0% back to -100% (300ms retreating)

          // Step 5: Settle and cleanup (after 300ms retreat)
          const cleanupTimer = setTimeout(() => {
            setIsOpen(false);
            setAnimVariant("hiddenLeft");
            isTransitioningRef.current = false;
          }, 310);

          timersRef.current.push(cleanupTimer);
        }, 450); // 450ms hold

        timersRef.current.push(retreatTimer);
      }, 300); // 300ms enter

      timersRef.current.push(routeSwapTimer);
    },
    [pathname, router]
  );

  // Global listener for case study "Next project" footer links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      if (target.classList.contains("proj-nav-next")) {
        const href = target.getAttribute("href");
        if (!href) return;

        const slug = href.replace("/projects/", "").trim();
        const projectMeta = PROJECT_ACCENT_MAP[slug];

        if (projectMeta) {
          e.preventDefault();
          navigateWithCurtain(href, {
            label: projectMeta.title,
            bgColor: projectMeta.accent,
            textColor: projectMeta.textColor,
          });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [navigateWithCurtain]);

  return (
    <NavCurtainContext.Provider
      value={{
        navigateWithCurtain,
        isNavigating: isTransitioningRef.current,
      }}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={styles.curtainPanel}
            style={{
              "--curtain-bg": panelBg,
              "--curtain-text": panelTextColor,
            } as React.CSSProperties}
            initial="hiddenLeft"
            animate={animVariant}
            variants={panelVariants}
            aria-hidden="true"
          >
            {/* ONLY the single centered destination word — nothing else */}
            <h2 className={styles.curtainTitle}>{targetLabel}</h2>
          </motion.aside>
        )}
      </AnimatePresence>
    </NavCurtainContext.Provider>
  );
}
