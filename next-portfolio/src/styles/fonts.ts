import { Fraunces, Inter, Space_Mono, Syne } from "next/font/google";

/* The fonts loaded site-wide:
 * - Fraunces: display serif for headings and stage titles
 * - Inter: body sans
 * - Space_Mono: metadata and technical labels
 * - Syne: distinctive, confident lettering for the site wordmark
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-wordmark",
  display: "swap",
});

