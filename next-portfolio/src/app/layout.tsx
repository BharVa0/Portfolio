import type { Metadata } from "next";
import { fraunces, inter, spaceMono } from "@/styles/fonts";
import { SkipLink } from "@/components/site/SkipLink";
import { SiteHeader } from "@/components/site/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
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
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
