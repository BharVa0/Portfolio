"use client";

import { useState } from "react";
import { ProjectBackground } from "@/components/projects/ProjectBackground";
import styles from "./ContactPage.module.css";

const SECONDARY_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bharat-vyas-k-bb9680217/",
    icon: "↗",
  },
  {
    label: "Resume, PDF",
    href: "/assets/resume/Bharat-Vyas-Resume.pdf",
    icon: "↓",
  },
  {
    label: "GitHub",
    href: "https://github.com/BharVa0",
    icon: "↗",
  },
] as const;

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("bharatvyask@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback clipboard command
      const textarea = document.createElement("textarea");
      textarea.value = "bharatvyask@gmail.com";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Neutral/ember ambient background tuned to shared portfolio palette */}
      <ProjectBackground
        accent="#d35c34"
        bgHex="#0d0c0b"
        motif="profiling-grid"
        intensity="standard"
      />

      <div className={styles.mainContent}>
        {/* Zone 1: Opening Dark Zone (Lead Statement) */}
        <section
          id="contact-statement"
          className={styles.heroZone}
          aria-label="Contact Statement"
        >
          <div className={styles.eyebrow}>Contact</div>
          <h1 className={styles.leadStatement}>
            If something here was worth a closer look,
            <br />
            I&apos;d like to hear about it.
          </h1>
        </section>

        {/* Zone 2: Warm-Tinted Actionable Surface (Action Register Shift) */}
        <section
          id="contact-actions"
          className={styles.actionZone}
          aria-label="Contact Actions and Links"
        >
          {/* Primary Action Area: Direct mailto link + Copy email fallback */}
          <div className={styles.primaryActionBlock}>
            <div className={styles.emailCard}>
              <div className={styles.emailTextGroup}>
                <span className={styles.emailAddress}>bharatvyask@gmail.com</span>
              </div>
              <div className={styles.buttonGroup}>
                <a
                  href="mailto:bharatvyask@gmail.com"
                  className={styles.primaryCtaBtn}
                  data-cursor="Email"
                  aria-label="Send email to bharatvyask@gmail.com — Get in touch"
                >
                  Get in touch <span aria-hidden="true">→</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
                  aria-label="Copy email address to clipboard"
                >
                  <span className={styles.copyIcon} aria-hidden="true">
                    {copied ? "✓" : "⧉"}
                  </span>
                  <span>{copied ? "Copied" : "Copy email"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Action Channels: LinkedIn, Resume PDF, GitHub */}
          <div className={styles.channelsGrid}>
            {SECONDARY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener"
                className={styles.channelCard}
              >
                <span className={styles.channelTitle}>{link.label}</span>
                <span className={styles.channelIcon} aria-hidden="true">
                  {link.icon}
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          {/* Zone Footer Context (Location line only) */}
          <div className={styles.zoneFooter}>
            <span className={styles.locationText}>Edinburgh, Scotland</span>
          </div>
        </section>
      </div>
    </div>
  );
}
