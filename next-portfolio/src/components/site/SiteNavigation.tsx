import { primaryNavigation } from "@/data/navigation";

export function SiteNavigation() {
  return (
    <nav className="frame-nav" aria-label="Primary">
      {primaryNavigation.map((entry) => (
        <a key={entry.href} href={entry.href}>
          {entry.label}
        </a>
      ))}
    </nav>
  );
}
