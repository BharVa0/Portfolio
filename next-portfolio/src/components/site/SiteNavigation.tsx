import Link from "next/link";
import { primaryNavigation } from "@/data/navigation";

export function SiteNavigation() {
  return (
    <nav className="frame-nav" aria-label="Primary">
      {primaryNavigation.map((entry) => (
        <Link key={entry.href} href={entry.href}>
          {entry.label}
        </Link>
      ))}
    </nav>
  );
}
