"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import styles from "./DecryptedText.module.css";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  isTriggered?: boolean;
  delay?: number;
}

export function DecryptedText({
  text,
  speed = 45,
  maxIterations = 8,
  sequential = true,
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  className = "",
  isTriggered = false,
  delay = 0,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const availableChars = useMemo<string[]>(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealedCount: number) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < currentRevealedCount) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayText(text);
      return;
    }

    if (isTriggered) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      const startScramble = () => {
        let revealedCount = 0;
        let iteration = 0;
        const totalLen = text.length;

        intervalRef.current = setInterval(() => {
          if (sequential) {
            revealedCount += 1;
            if (revealedCount <= totalLen) {
              setDisplayText(shuffleText(text, revealedCount));
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = null;
              setDisplayText(text);
            }
          } else {
            iteration += 1;
            if (iteration < maxIterations) {
              setDisplayText(shuffleText(text, 0));
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = null;
              setDisplayText(text);
            }
          }
        }, speed);
      };

      if (delay > 0) {
        timeoutRef.current = setTimeout(startScramble, delay);
      } else {
        startScramble();
      }
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTriggered, text, speed, maxIterations, sequential, shuffleText, delay]);

  return (
    <motion.span className={`${styles.decryptedWrapper} ${className}`}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}
