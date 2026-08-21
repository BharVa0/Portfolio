import type { Metadata } from "next";
import { fraunces, inter, spaceMono, syne } from "@/styles/fonts";
import { MotionCursor } from "@/components/phase2/MotionCursor";
import { SiteNavbar } from "@/components/phase2/SiteNavbar";
import { NavCurtainProvider } from "@/components/phase2/NavCurtainTransition";
import { SkipLink } from "@/components/site/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  // Required so page- and route-level Open Graph images can use relative
  // paths. Page-specific metadata stays with each page so the real 404 does
  // not inherit homepage or project metadata.
  metadataBase: new URL("https://bharva0.github.io/Portfolio/"),
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
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NavCurtainProvider>
          <SkipLink href="#content" />
          <MotionCursor />
          <SiteNavbar />
          {children}
        </NavCurtainProvider>
      </body>
    </html>
  );
}
