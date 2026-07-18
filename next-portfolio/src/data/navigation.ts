export type NavigationEntry = {
  label: string;
  href: string;
};

/* Labels and hrefs match the approved static site's frame-nav exactly
 * (index.html). They're anchors into homepage sections that don't exist
 * on this temporary shell page yet (Lesson 2H) — they'll resolve once
 * the real homepage sections are built in a later lesson. */
export const primaryNavigation: readonly NavigationEntry[] = [
  { label: "Work", href: "#work" },
  { label: "Practice", href: "#practice" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
