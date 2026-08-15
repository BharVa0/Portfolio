"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ReelMotionProps = {
  children: ReactNode;
  onStageChange?: (index: number) => void;
};

export function ReelMotion({ children, onStageChange }: ReelMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();
      let refreshFrame = 0;
      let active = true;

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const lenis = new Lenis({
            autoRaf: false,
            lerp: 0.085,
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 0.9,
          });

          const updateScrollTrigger = () => ScrollTrigger.update();
          const advanceLenis = (time: number) => lenis.raf(time * 1000);

          lenis.on("scroll", updateScrollTrigger);
          gsap.ticker.add(advanceLenis);
          root.dataset.reelMotion = "desktop";

          const stages = gsap.utils.toArray<HTMLElement>(
            "[data-reel-stage]",
            root,
          );

          stages.forEach((stage, index) => {
            const chrome = stage.querySelectorAll("[data-reel-chrome]");
            const words = stage.querySelectorAll("[data-split-word]");
            const copy = stage.querySelectorAll("[data-reel-copy]");
            const meta = stage.querySelectorAll("[data-reel-meta]");

            const timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.55,
                invalidateOnRefresh: true,
                onToggle: (self) => {
                  if (self.isActive && onStageChange) {
                    onStageChange(index);
                  }
                },
              },
            });

            timeline
              .fromTo(
                chrome,
                { autoAlpha: 0, yPercent: 60 },
                { autoAlpha: 1, yPercent: 0, duration: 0.18, stagger: 0.015 },
                0,
              )
              .fromTo(
                words,
                { autoAlpha: 0, yPercent: 110, rotate: 1.2 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  rotate: 0,
                  duration: 0.25,
                  stagger: 0.02,
                },
                0.01,
              )
              .fromTo(
                meta,
                { autoAlpha: 0, y: 28 },
                { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.02 },
                0.025,
              )
              .fromTo(
                copy,
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.025 },
                0.04,
              )
              .to(
                [chrome, words, meta, copy],
                {
                  autoAlpha: 0,
                  yPercent: -40,
                  duration: 0.32,
                  stagger: 0.006,
                  ease: "power2.inOut",
                },
                0.68,
              );
          });

          refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
          });

          void document.fonts.ready.then(() => {
            if (active) ScrollTrigger.refresh();
          });

          return () => {
            window.cancelAnimationFrame(refreshFrame);
            lenis.off("scroll", updateScrollTrigger);
            gsap.ticker.remove(advanceLenis);
            lenis.destroy();
            delete root.dataset.reelMotion;
          };
        },
      );

      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.dataset.reelMotion = "compact";
          const stages = gsap.utils.toArray<HTMLElement>(
            "[data-reel-stage]",
            root,
          );

          stages.forEach((stage, index) => {
            ScrollTrigger.create({
              trigger: stage,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: (self) => {
                if (self.isActive && onStageChange) {
                  onStageChange(index);
                }
              },
            });
          });

          const revealGroups = gsap.utils.toArray<HTMLElement>(
            "[data-mobile-reveal]",
            root,
          );

          revealGroups.forEach((group) => {
            gsap.from(group, {
              autoAlpha: 0,
              y: 24,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
                once: true,
              },
            });
          });

          return () => {
            delete root.dataset.reelMotion;
          };
        },
      );

      return () => {
        active = false;
        window.cancelAnimationFrame(refreshFrame);
        media.revert();
      };
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
