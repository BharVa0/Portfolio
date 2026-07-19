export type NavigationEntry = {
  label: string;
  href: string;
};

/* Labels and hrefs match the approved static homepage frame-nav exactly.
 * SiteHeader renders only on `/`; project routes retain their separate
 * approved project frame with an Index link and next-project navigation. */
export const primaryNavigation: readonly NavigationEntry[] = [
  { label: "Work", href: "#work" },
  { label: "Practice", href: "#practice" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
