import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Copied, protected third-party assets (Lesson 4E) — BETTR's live
    // build, served as-is from public/. Not application source; never
    // edited, so never linted as if it were ours.
    "public/**",
  ]),
]);

export default eslintConfig;
