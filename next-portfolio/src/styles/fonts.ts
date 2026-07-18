import { Fraunces, Inter, Space_Mono } from "next/font/google";

/* The three fonts already loaded site-wide by the static portfolio
 * (index.html's Google Fonts <link>). BETTR's project-specific faces
 * (Jersey 25, Rajdhani) are excluded — they arrive with that project's
 * own migration, not the shared shell.
 *
 * Fraunces is loaded as a true variable font (weight range + optical
 * size axis + italic) rather than a few fixed weights: the static site
 * already relies on in-between weights (e.g. 380, 560) that only exist
 * on the variable instance, not at discrete steps.
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
