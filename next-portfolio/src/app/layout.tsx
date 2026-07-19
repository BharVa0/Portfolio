import type { Metadata } from "next";
import { fraunces, inter, spaceMono } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Required so route-level metadata (e.g. the BETTR project route's
  // og:image) can use a relative path instead of a hand-built absolute
  // URL — Next.js errors on a relative URL-based metadata field without
  // this set. Matches this repo's actual GitHub Pages deployment target
  // (no custom domain/CNAME configured).
  metadataBase: new URL("https://bharva0.github.io/Portfolio/"),
  title: "Bharat Vyas Kodamana — Design Portfolio",
  description:
    "Bharat Vyas Kodamana — MSc Design and Digital Media portfolio. Interactive systems, playable worlds and research-led experiences designed around real human behaviour.",
  openGraph: {
    type: "website",
    title: "Bharat Vyas Kodamana — Design Portfolio",
    description:
      "Interactive systems, playable worlds and research-led experiences designed around real human behaviour.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: Hero G's bootstrap script (see
    // components/hero/HeroG.tsx) adds classes to this element before
    // React's first hydration pass, so it can decide the loader/entrance
    // state without a flash. That's an intentional, expected class
    // change React didn't make itself — this only silences the harmless
    // mismatch warning for it, nothing deeper in the tree is affected.
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
