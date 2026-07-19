# Next.js Migration Guide — for Bharat

This is the beginner-friendly companion to the migration. It explains every
tool and concept introduced in Lesson 1, in the order they showed up, and
relates each one back to the actual portfolio rather than generic docs.

Read this alongside [PORTFOLIO_PRODUCTION_LOG.md](PORTFOLIO_PRODUCTION_LOG.md),
which has the terse, dated record of what actually happened. This guide is
the "why does this exist" version.

---

## 1. What this migration is trying to achieve

The live portfolio (`index.html`, `projects/*.html`, `css/portfolio.css`,
`js/portfolio.js`) is seven static HTML pages with no build step — you open
a file, edit tags and CSS by hand, and a browser (or GitHub Pages) serves it
directly. That's stayed the right call while the site was small.

`next-portfolio/` is a **parallel, separate project** that will eventually
let the same content be built with React components, shared layouts, and a
proper toolchain, without touching the static site while it's still being
worked on. Nothing in `next-portfolio/` is live yet. It doesn't replace
`redesign-v2` or the static pages — it's scaffolding on its own branch,
`nextjs-port`, created from a permanent snapshot tag,
`static-redesign-checkpoint`, so there is always a known-good fallback to
return to.

Lesson 1's entire job was: get the tools installed, get an empty Next.js app
running, and prove the toolchain works. No portfolio content moved yet.

## 2. Node.js, in plain language

Node.js is a program that runs JavaScript **outside a browser** — on your
own machine, as a command-line tool. Every tool in this migration (`npm`,
`next dev`, `eslint`, the TypeScript compiler) is itself a JavaScript
program, so all of them need Node installed to run at all.

Your machine has **Node.js v24.18.0**, an LTS ("Long-Term Support") release
— LTS versions get security patches for years and are what production
tooling is built and tested against, unlike "Current" releases which move
faster but change more.

## 3. npm, in plain language

npm ("Node Package Manager") is Node's tool for downloading and tracking
other people's published code — "packages" — so you don't write everything
from scratch. `npm install` reads a shopping list (`package.json`),
downloads exactly what's listed (into `node_modules/`), and writes down the
exact versions it actually got (`package-lock.json`).

`npx` (used once, to run `create-next-app`) is npm's "run a package without
permanently installing it" command — it downloaded `create-next-app` just
long enough to scaffold the project, then didn't keep it around.

## 4. package.json, package-lock.json, and node_modules

- **`next-portfolio/package.json`** — the project's manifest: its name, the
  three run scripts (`dev`, `build`, `start`, `lint`), and which packages it
  depends on (`next`, `react`, `react-dom` to run; `typescript`,
  `tailwindcss`, `eslint` to develop with). This is the file you'd hand-edit
  to add a new dependency.
- **`next-portfolio/package-lock.json`** — the *exact* version of every
  package and every one of *their* dependencies (dependencies have their own
  dependencies, recursively). Without this file, a fresh `npm install` six
  months from now could silently pull newer versions and behave differently.
  This file is committed to git for that reason.
- **`next-portfolio/node_modules/`** — the actual downloaded code, ~357
  packages' worth. This is never committed (`.gitignore` excludes it) — it's
  regenerated from `package-lock.json` by running `npm install` on any
  machine.

## 5. React and components

React is a JavaScript library for building UIs out of **components** —
reusable functions that return markup. Instead of one giant HTML file, a
React app is a tree of small functions like `Header()`, `ProjectCard()`,
`Footer()`, each returning a piece of the page, composed together. This is
the part of the migration that will eventually let a "project card" be
written once and reused across all project pages, instead of the current
static site's sixth copy-pasted HTML block per project.

## 6. JSX and TSX

JSX is a syntax extension that lets you write HTML-looking markup directly
inside JavaScript, e.g. `<h1>{title}</h1>` inside a function. It isn't valid
JavaScript on its own — a build tool transforms it into plain function calls
before it runs.

`.tsx` = a file containing JSX **and** using TypeScript (see below). Every
file under `next-portfolio/src/app/` you saw generated — `page.tsx`,
`layout.tsx` — is a component written in this style.

## 7. Next.js and the App Router

Next.js is a framework built on top of React that adds the pieces React
alone doesn't provide: page routing, a dev server, an optimized production
build, image optimization, and more. The version installed here is
**Next.js 16.2.10**, using the **App Router** — the convention where the
*folder structure itself* under `src/app/` defines the URL routes. A folder
named `src/app/about/` with a `page.tsx` inside it would automatically
become the route `/about`. Right now there's only `src/app/page.tsx`, which
is the homepage route `/`.

`next-portfolio/src/app/layout.tsx` is the **root layout** — it wraps every
page in the app (fonts, `<html>`/`<body>` tags, and later, shared nav/footer
go here once real pages exist).

## 8. TypeScript

TypeScript is JavaScript with an optional **type system** layered on top —
you can declare that a function expects a `string` or that a component's
`title` prop is required, and the compiler checks this *before* the code
runs, catching a category of bugs (wrong argument, typo'd property name)
that plain JavaScript would only surface at runtime, if at all.
`next-portfolio/tsconfig.json` configures the compiler; **TypeScript 5.9.3**
is installed. `next-env.d.ts` and the `.next/types/` folders referenced in
it are auto-generated — never hand-edited.

## 9. Tailwind CSS

Tailwind is a CSS framework built around small, single-purpose utility
classes applied directly in markup (`className="flex items-center gap-4"`)
instead of writing custom CSS selectors per component. **Tailwind 4.3.3** is
installed and wired in through `next-portfolio/postcss.config.mjs` (which
runs Tailwind as a PostCSS plugin) and imported at the top of
`next-portfolio/src/app/globals.css` via `@import "tailwindcss";`. This is a
deliberate departure from the current static site's hand-written
`css/portfolio.css` — nothing about that decision is finalized yet; Lesson 1
only proves the tooling works.

## 10. ESLint

ESLint is a linter — it reads your code without running it and flags
patterns that are likely bugs or inconsistent style (unused variables,
suspicious comparisons, accessibility issues in JSX). **ESLint 9.39.5** is
installed, configured by `next-portfolio/eslint.config.mjs`, using Next.js's
own recommended rule sets (`eslint-config-next`). `npm run lint` ran clean
on the generated scaffold with zero warnings.

## 11. Turbopack

Turbopack is Next.js's newer, Rust-based bundler — the tool that takes all
the separate `.tsx`/`.css` files and assembles them into what a browser can
actually load, and rebuilds only what changed when you save a file (that's
what made the hot-reload test in Lesson 1 near-instant). It replaces an
older bundler called Webpack for this project; both scaffolding
(`--turbopack` flag) and every `dev`/`build` script use it.

## 12. Development build vs. production build

- **`npm run dev`** — starts a local server that rebuilds instantly on save
  and keeps helpful debugging info (this is what ran on port 4202 during
  verification).
- **`npm run build`** — compiles the whole app once, optimized: minified
  code, static pages pre-rendered where possible, dead code removed. Slower,
  but this is what actually gets deployed.
- **`npm run start`** — runs the app using the output of `npm run build`
  (not dev mode) — this is what a production server would run; it was not
  invoked in Lesson 1 since verification only required confirming the build
  succeeds.

## 13. The generated folder structure

```
next-portfolio/
├── src/app/
│   ├── layout.tsx      — root layout, wraps every route
│   ├── page.tsx        — the "/" homepage route
│   └── globals.css     — global styles + Tailwind import
├── public/              — files served as-is at the site root
│                          (next.svg, vercel.svg, etc. → /next.svg, /vercel.svg)
├── package.json          — manifest + scripts
├── package-lock.json     — exact dependency versions (committed)
├── node_modules/         — downloaded packages (never committed)
├── tsconfig.json         — TypeScript compiler config, defines the @/* alias
├── next.config.ts        — Next.js app-level config (currently empty defaults)
├── eslint.config.mjs     — lint rules
├── postcss.config.mjs    — wires Tailwind into the CSS pipeline
├── AGENTS.md             — Next.js-16-specific note for AI coding agents
│                          (this Next.js version is newer than most training
│                          data; check node_modules/next/dist/docs/ before
│                          writing unfamiliar APIs)
└── CLAUDE.md             — one line, "@AGENTS.md": Claude Code's convention
                           for importing another file's instructions rather
                           than duplicating them. This is scoped to
                           next-portfolio/ only and doesn't conflict with
                           the root CLAUDE.md's portfolio rules — the two
                           files govern different projects in the same repo.
```

`@/*` (from `tsconfig.json`) is a shortcut import path — `import X from
"@/components/X"` reaches into `src/` instead of writing relative paths like
`../../components/X`.

## 14. Commands used in this lesson

```
node --version
npm --version
git --version

git switch -c nextjs-port static-redesign-checkpoint

npx create-next-app@latest next-portfolio \
  --typescript --tailwind --eslint --app --src-dir --turbopack \
  --import-alias "@/*" --use-npm --no-react-compiler --disable-git --yes

npm run dev -- --port 4202     # via .claude/launch.json "next-portfolio" config
npm run lint
npm run build

git add next-portfolio .claude/launch.json docs/NEXTJS_MIGRATION_GUIDE.md docs/PORTFOLIO_PRODUCTION_LOG.md
git commit -m "Scaffold Next.js migration foundation"
```

## 15. Installed package versions

| Package | Version |
|---|---|
| next | 16.2.10 |
| react | 19.2.4 |
| react-dom | 19.2.4 |
| typescript | 5.9.3 |
| tailwindcss | 4.3.3 |
| eslint | 9.39.5 |

Toolchain: Node.js v24.18.0, npm 11.16.0, Git 2.53.0.windows.2.

## 16. Errors encountered and how they were resolved

None. The scaffold, dev server, hot reload, lint, and build all succeeded
on the first attempt. Two non-error notices appeared and needed no action:

- `npm warn allow-scripts` for `unrs-resolver` and `sharp` (postinstall
  scripts npm flagged for review under its script-allowlisting feature) —
  informational, not a failure; both are legitimate Next.js/Tailwind
  dependencies, no action taken.
- Port 4200 was already occupied by an unrelated Python static-file server
  from a prior session when checking that the static site was undisturbed —
  expected, not an error; it confirmed the static site was running
  independently, untouched by this work.

## 17. What Bharat should be able to explain after Lesson 1

- Why `nextjs-port` is safe to experiment on without risking `redesign-v2`
  or the live static site.
- What each of `package.json`, `package-lock.json`, and `node_modules` is
  for, and why only two of the three get committed.
- The difference between `npm run dev`, `npm run build`, and `npm run
  start`.
- What a React component is, and what `.tsx` means.
- What the App Router convention is (folders under `src/app/` = routes).
- Why `next-portfolio/CLAUDE.md` doesn't conflict with the root
  `CLAUDE.md` — different projects, same repo.

## 18. Glossary

- **LTS** — "Long-Term Support"; a release line that gets patches for years,
  the safe choice for tooling.
- **Bundler** — a tool that combines many source files into what a browser
  can load; Turbopack is this project's bundler.
- **Linter** — a tool that flags likely bugs/style issues by reading code
  without running it; ESLint is this project's linter.
- **Transpile/compile** — converting code from one form to another before
  it runs; TypeScript compiles to plain JavaScript, JSX compiles to function
  calls.
- **Scaffold** — the initial generated project structure from a tool like
  `create-next-app`, before any custom code is added.
- **Route** — a URL path an app responds to; in the App Router, defined by
  folder structure.
- **Hot reload / HMR** — updating running code in the browser instantly on
  save, without a full page refresh or losing state.
- **Static generation** — pre-rendering a page's HTML at build time rather
  than on every request; the build output showed `/` and `/_not-found` both
  marked `○ (Static)`.

---

# Lesson 2 — Components, layouts, design tokens, and the first shared shell

Lesson 1 proved the toolchain. Lesson 2 builds the first real, reusable
pieces: a header shared by every future page, a design-token system carried
over from the approved static site (not reinvented), and a temporary demo
homepage that exercises all of it. Still no Hero G, no project page, no new
dependency — this lesson is entirely about shared foundation.

## Components and props

A **component** is a function that returns markup. `SiteHeader()` returns a
`<header>`; calling `<SiteHeader />` from `layout.tsx` is exactly like
calling a function and inlining its return value. **Props** are that
function's arguments, passed like HTML attributes: `<Section rhythm="major">`
passes `{ rhythm: "major" }` as the single argument object. Props are
read-only — a component receives them but never reassigns them; if it needs
to change, that's a job for state, which none of this lesson's components
have.

## Layouts and pages, revisited

`layout.tsx` now does real work: it loads three fonts, wraps every route in
`<html>`/`<body>`, renders `SkipLink` and `SiteHeader` once, and renders
`{children}` inside a `<main id="main-content">`. `page.tsx` is still just
the `/` route's content — the temporary demo sections. Because `layout.tsx`
wraps `page.tsx`, the header and skip link will automatically appear on
every future route added under `src/app/`, without repeating that markup
per page.

## Server Components (why nothing here needed "use client")

Every component built this lesson — `SkipLink`, `SiteNavigation`,
`SiteHeader`, `PageContainer`, `Section`, plus `layout.tsx` and `page.tsx`
— is a Server Component: no `useState`, no `useEffect`, no event handlers,
no `window`/`document` access. Next.js renders all of them to plain HTML
on the server (or at build time, since the build output marked `/` as
prerendered `○ (Static)`) and ships zero extra JavaScript for them. This
is why the production build has almost no client bundle yet — there's
nothing that needs to run in the browser.

## What will require "use client" (not built this lesson)

Lesson 3 introduces the first Client Components, because these specific
features are impossible without browser-side JavaScript:

- **Hero G's pointer-follow inspection lens** — reads live mouse position
  (`mousemove`), which only exists in the browser, and re-renders on every
  move (state).
- **The custom cursor** — same: tracks pointer position continuously.
- **The first-visit loader** — reads `sessionStorage` (`hs-loader-seen`) to
  decide whether to show itself, and runs a countdown animation — both
  browser-only, both need state.
- **Any Motion/animation library usage** — animation libraries drive state
  or refs across frames.
- **Browser storage of any kind** (`sessionStorage`, `localStorage`) — these
  APIs don't exist during server rendering at all.
- The static site's own **`.reveal` + `IntersectionObserver` scroll-entrance
  pattern** (`js/portfolio.js`), used site-wide beyond just the hero, is
  also a future Client Component candidate for the same reason: it observes
  live scroll position in the browser.

None of these are implemented yet. `"use client"` is deliberately absent
from every file in this lesson.

## Design tokens

A **design token** is a named value standing in for a hardcoded one —
`--ember` instead of typing `#B84624` in forty places. `src/styles/tokens.css`
is the new source of truth, holding the *exact* values audited from the
approved static site's `css/portfolio.css :root` block: `--ink`, `--paper`,
`--muted`, the `--ember` family, the type scale, the `--page-margin` gutter,
and the three content widths (`--width-reading` / `--width-standard` /
`--width-wide`) that map directly onto the static site's own
`[data-layout="reading"|"standard"|"wide"]` modes — not new numbers, the
same ones, just exposed as component props instead of a data attribute.

One honest gap: the static site has exactly one `prefers-reduced-motion`
rule, and it's entirely Hero G-specific. There is no separate *global*
reduced-motion rule to carry over yet, so `tokens.css`'s
`--motion-duration-*`/`--motion-ease` values are placeholders for Lesson 3,
not ported values — the comment in the file says so rather than implying
they came from an existing rule.

## Tailwind 4's CSS-first theme

Tailwind 4 doesn't require a `tailwind.config.js`. Instead, `globals.css`
imports `tokens.css` and then has an `@theme inline` block that maps a
subset of those same custom properties into Tailwind's own namespace —
`--color-ember: var(--ember)` makes `bg-ember`/`text-ember` work as
utilities, reading the identical value `tokens.css` defines. Nothing is
duplicated: Tailwind utilities and hand-written CSS both trace back to one
file.

## Next.js font loading

`next/font/google` downloads Google Fonts at build time and self-hosts
them — the browser never makes a request to Google, unlike a normal CSS
`@import url(fonts.googleapis.com/...)`, which does. This avoids an extra
render-blocking network round trip and a layout shift when the font
finally arrives.

Three fonts were selected — the exact three already loaded by the static
site's own Google Fonts `<link>` in `index.html` — no new font was
introduced:

- **Fraunces** (display) — loaded as a true variable font
  (`weight: "variable"`, `axes: ["opsz"]`, both italic and normal styles).
  A discrete weight list wouldn't work here: the static site already uses
  in-between weights like `380` and `560` (Hero G's `.b2`/`.b1` bands) that
  only exist on the variable instance.
- **Inter** (body) — loaded as a variable font, matching how the static
  site uses it at several static weights (400/500/600); a variable font
  covers all of them from one file.
- **Space Mono** (metadata/mono) — loaded at a single static weight, `400`
  — Space Mono isn't a variable font on Google Fonts, and the static site
  only ever uses it at regular weight (`.hero-meta strong` explicitly resets
  bold back to 400).

BETTR's project-specific fonts (Jersey 25, Rajdhani) were deliberately not
touched — they're scoped to that project's own future migration, not the
shared shell.

Each font is configured with a `variable` option (`--font-display`,
`--font-body`, `--font-mono`) in `src/styles/fonts.ts`, applied to
`<html className>` in `layout.tsx`, and consumed by `tokens.css`'s
`--font-display`/`--font-body`/`--font-mono` declarations — the same
variable names the static site already used, so the rest of the CSS didn't
need to change.

## File structure created

```
next-portfolio/src/
├── app/
│   ├── globals.css       — imports tokens.css, Tailwind theme, global rules
│   ├── layout.tsx        — root layout: fonts, metadata, SkipLink, SiteHeader
│   └── page.tsx          — temporary Lesson 2 shell-validation homepage
├── components/
│   ├── layout/
│   │   ├── PageContainer.tsx
│   │   └── Section.tsx
│   └── site/
│       ├── SiteHeader.tsx
│       ├── SiteNavigation.tsx
│       └── SkipLink.tsx
├── data/
│   └── navigation.ts     — typed navigation entries
└── styles/
    ├── tokens.css         — design tokens (source of truth)
    └── fonts.ts            — next/font/google definitions
```

This matches the structure sketched at the start of the lesson exactly,
with one small addition explained here: `styles/fonts.ts` alongside
`styles/tokens.css`, since Next.js's font loader is a TypeScript module
call (it has to run in a Server Component), not something that fits inside
a `.css` file the way the color/spacing tokens do.

## TypeScript types added

Four small types, each catching a specific category of mistake:

- **`NavigationEntry`** (`data/navigation.ts`) — `{ label: string; href: string }`.
  Protects against a navigation entry silently missing its `href` or having
  a typo'd field name (`herf`) that would otherwise fail only at runtime,
  as a broken link, with no warning at all.
- **`PageContainerVariant`** — `"reading" | "standard" | "wide"`, a fixed
  union rather than `string`. A union of exact allowed values means the
  compiler rejects anything not in that list *before the code ever runs*.
  A plain `string` prop would accept `"reeding"` (a typo) or `"huge"` (a
  variant that doesn't exist) silently — it would compile, run, and quietly
  render as the browser's default (no `max-width` rule matches), with no
  error anywhere. Confirmed directly: temporarily writing
  `<PageContainer variant="huge">` and running `tsc --noEmit` produces
  ```
  error TS2322: Type '"huge"' is not assignable to type 'PageContainerVariant | undefined'.
  ```
  That test file was written, checked, and deleted — nothing broken is
  left in the project.
- **`SectionRhythm`** — `"major" | "compact"`, the same reasoning as
  `PageContainerVariant`: a typo'd rhythm name fails at compile time instead
  of silently falling back to no spacing rule matching.
- **`children: ReactNode`** (on both `PageContainerProps` and
  `SectionProps`) — `ReactNode` is React's type for "anything React can
  render": a string, a number, an element, an array of elements, or
  nothing. It's used instead of a narrower type because a layout
  component's whole job is to wrap arbitrary content — a `PageContainer`
  might wrap a paragraph today and a whole page section with three
  headings and a list tomorrow, and `ReactNode` is the type that permits
  that without lying about what's actually allowed (a narrower type like
  `string` would reject perfectly valid JSX children).

## Commands used

```
npm run dev -- --port 4202     # via .claude/launch.json "next-portfolio" config
npm run lint
npm run build
npx tsc --noEmit -p tsconfig.json   # one-off, to confirm the variant-union error

git add next-portfolio docs/NEXTJS_MIGRATION_GUIDE.md docs/PORTFOLIO_PRODUCTION_LOG.md
git commit -m "Build shared Next.js site shell"
```

## QA results

- Dev server (port 4202): one real error surfaced and was fixed — see
  below — after which the page rendered cleanly with zero console/terminal
  errors.
- Screenshots reviewed at 1280 / 1920px (headless Chrome) and 375px (via
  the iframe-harness pattern, since a bare headless capture at narrow
  widths has been unreliable in past sessions on this project): header and
  nav readable at all widths, nav and swatches wrap gracefully at 375px, no
  horizontal overflow at any width, `PageContainer`'s three variants
  (reading/standard/wide) visibly different widths at every breakpoint.
- Skip link: confirmed via keyboard `Tab` that it's the first focusable
  element, becomes visible on focus (`top` moves from `-48px` to `16px`),
  and targets `#main-content`, which is confirmed to exist on the page's
  actual `<main>` element.
- `npm run lint`: clean, zero warnings.
- `npm run build`: succeeded, TypeScript passed, `/` and `/_not-found` both
  prerendered as static content.
- All components confirmed to contain no `"use client"` directive
  (`grep` across `src/`, zero matches).

**One real error surfaced and fixed this lesson:** the first font
configuration used `weight: "300 700"` for Fraunces (a range string),
which this Next.js version's font loader rejected outright —
`Unknown weight 300 700 for font Fraunces. Available weights: 100, 200,
300, 400, 500, 600, 700, 800, 900, variable` — because this build only
accepts a discrete weight, a list of discrete weights, or the literal
string `"variable"` for a variable font, not an arbitrary range string.
Fixed by changing to `weight: "variable"`, which is also the more correct
choice here since the static site actually relies on in-between weights
(380, 560) that only exist on the true variable instance.

## What Bharat should now be able to explain

- What a props type protects against, with a concrete example
  (`PageContainerVariant` rejecting `"huge"` at compile time).
- Why every component built this lesson is a Server Component, and which
  four specific future features (pointer lens, custom cursor, loader,
  Motion) will be the first to need `"use client"`.
- Where a color or width value lives (`tokens.css`) versus where it's
  exposed as a Tailwind utility (`globals.css`'s `@theme inline` block).
- Why Next.js font loading avoids an extra network request that a plain
  CSS `@import` wouldn't.
- Why `PageContainer` and `Section` are two separate components rather
  than one (gutter + rhythm vs. width + centering are different concerns).

---

# Lesson 3 — Client Components, hooks, browser APIs, and porting Hero G

Lesson 2 built a shell that shipped zero client JavaScript. Lesson 3 ports
Hero G — the four kinetic thesis bands, the pointer-follow inspection
lens, the first-visit loader — from the approved static integration
(`index.html` + `css/portfolio.css` + `js/portfolio.js`, commit `e37af20`)
onto that shell. This is the lesson where the app gets its first real
client-side JavaScript, and the concepts below are the reason it needs it.

## What "use client" means

Every file in Lessons 1–2 was a **Server Component**: React renders it to
HTML on the server (or at build time), sends that HTML to the browser,
and ships no JavaScript for it at all — there's nothing to "run" in the
browser because the component doesn't do anything after it's rendered.

`"use client"` is a directive at the top of a file that tells Next.js
"this component needs to keep running in the browser after the initial
HTML arrives." Only one new file in this lesson has it:
`src/components/hero/HeroGInteractive.tsx`. Everything else — the root
layout, `SiteHeader`, `HeroG.tsx` itself, `page.tsx` — stays a Server
Component, exactly as the brief required.

## What a Client Component actually is

A Client Component is not "a component that only runs in the browser." By
default, Next.js still renders it to HTML on the server first (so a
visitor with JavaScript disabled, or a slow connection, still gets real
content) — the directive's real effect is that React **also** ships that
component's JavaScript to the browser and re-attaches it there. That
re-attachment step has a name:

## Hydration

**Hydration** is React taking the static HTML the server already sent and
"waking it up" — attaching event listeners, running effects, turning
inert markup back into an interactive component — without throwing away
and re-building the DOM from scratch. For Hero G, this means the four
bands, the name, and the CTA link are all real, readable HTML the moment
the page arrives; hydration is what makes the pointer lens and the loader
start working a moment later, on the same markup.

This matters for a subtle bug class: a **hydration mismatch**. If the
server-rendered HTML and the very first thing React renders in the
browser don't match, React logs a warning (or in bad cases, visibly
flickers). `HeroG.tsx`'s bootstrap script deliberately causes one small,
expected mismatch — it adds classes to `<html>` before React hydrates —
which is why `layout.tsx`'s `<html>` tag now carries
`suppressHydrationWarning`. That prop doesn't disable hydration checking
site-wide; it only tells React "I know this specific element's attributes
get changed by something outside React, don't warn about it."

## useRef

`useRef` gives a component a mutable box (`{ current: ... }`) that
**survives across re-renders without causing one when it changes**. Hero G
uses it two ways:

1. **DOM references.** `bandRefs`, `lensRef`, `anchorRef`, and friends are
   how `HeroGInteractive` gets a real handle to the `<p>` and `<div>`
   elements it needs to animate — the `ref={el => bandRefs.current[i] = el}`
   pattern on each band is React's way of saying "hand me this DOM node
   once it exists."
2. **Non-visual engine state.** The `engineRef` holds the pointer engine's
   entire mutable state — current and target positions for all four
   bands, the lens coordinates, scroll easing, whether the engine is
   currently running. None of this is ever read by JSX, so none of it
   needs to be React state.

```ts
// Simplified from HeroGInteractive.tsx
const engineRef = useRef({ px: [0, 0, 0, 0], /* ...more fields... */ });

function onHeroPointerMove(e: MouseEvent) {
  engineRef.current.tx[0] = /* ...new target... */;
  // no setState call — nothing needs to re-render because of this
}
```

## useState

`useState` is for **values a component's JSX actually branches on** —
when a different value should visibly produce different markup. Hero G
uses **zero `useState` calls**, which is worth explaining rather than
treating as an oversight: the loader overlay isn't JSX at all (it's a
plain DOM node the bootstrap script inserts directly — see below), the
entrance animation is driven entirely by CSS classes on `<html>`, and the
lens label text is written straight to `lensLabelRef.current.textContent`
in the same way the original static `js/portfolio.js` did. There was
never a point where "if X, render different markup" applied, so there was
never a reason to reach for `useState`. This is the flip side of the
brief's own rule — use refs, not state, for anything that updates every
animation frame — taken to its actual conclusion for this component.

## useEffect

`useEffect` is where a component does things that aren't "return some
markup": talking to browser APIs, setting up subscriptions, starting
timers. `HeroGInteractive` has exactly one `useEffect`, with an empty
dependency array plus `bands` (`[bands]`) — it runs once, right after the
component's first real DOM nodes exist, and never again for the life of
that mounted component.

```ts
useEffect(() => {
  // ...set up alignBand2, the loader continuation, the pointer/scroll engine...
  return () => {
    // ...undo every single thing the block above did...
  };
}, [bands]);
```

## Why effects need cleanup

Every `addEventListener`, every `requestAnimationFrame`, every
`setTimeout` this effect starts is something the *browser*, not React,
keeps doing until told to stop. If the component ever re-runs this effect
— and in development, **React Strict Mode deliberately runs every effect
twice** (mount → cleanup → mount again) specifically to catch code that
forgot this — an effect without cleanup would attach a second
`mousemove` listener, start a second `requestAnimationFrame` loop, and so
on, on top of the first. Nothing removes the old ones, so the page gets
progressively more listeners every time.

The cleanup function `HeroGInteractive`'s effect returns removes, in
order: the `resize` listener for band-2 alignment, the loader's pending
`requestAnimationFrame` and `setTimeout` handles, the engine's
`mousemove`/`mouseleave`/`scroll`/`resize` listeners, both `matchMedia`
`change` listeners, and the engine's own `requestAnimationFrame` handle.
This was verified directly during QA: after several Fast Refresh cycles
in development (each one exercising mount → cleanup → mount), the page
still had exactly one `#hero-g`, one lens, and four bands — no
duplicates.

## requestAnimationFrame

`requestAnimationFrame` (rAF) asks the browser to run a callback right
before its next repaint — the standard way to drive smooth, 60fps-ish
visual updates, instead of a `setInterval` that has no relationship to
when the screen actually redraws. Hero G's `heroFrame()` function is a rAF
loop: it computes new positions, writes them to the DOM, and — this is
the important part — **only schedules another frame if something is still
moving**:

```ts
if (moving) {
  rafIdRef.current = requestAnimationFrame(heroFrame);
} else {
  engine.running = false;
  rafIdRef.current = null; // the loop stops entirely here
}
```

This is why the animation "sleeps": once the pointer stops and every
lerped value has settled within a small threshold, the loop simply
doesn't reschedule itself. It wakes back up the next time `heroWake()` is
called, from a pointer move or a scroll event.

## Direct DOM/CSS updates versus React re-renders

Every visual update in the pointer engine — band `transform`, band
`opacity`, the lens's `transform`, the anchor's inline styles — is
written with `element.style.property = value` directly through a ref,
**never** through `setState`. If this went through React state instead,
every pointer move (potentially 60+ times a second) would trigger a full
component re-render and a diff against the previous render, for a value
React never needed to know about in the first place. Writing straight to
the DOM through a ref is the standard escape hatch for exactly this
situation: high-frequency updates where React's rendering model would
only add overhead, never correctness.

## Browser APIs used, and why they can't run on the server

None of the following exist while Next.js is rendering a Server
Component on the server — they're all only defined once actual browser
code is running:

- **`sessionStorage`** — remembers, for one browser tab's session, whether
  the loader has already played (`hs-next-loader-seen`, namespaced
  separately from the static site's own `hs-loader-seen`).
- **`matchMedia`** — reads `(prefers-reduced-motion: reduce)`,
  `(hover: hover) and (pointer: fine)`, and `(min-width: 1024px)` live, and
  the two input-mode queries are re-checked on `change` so a hybrid device
  (a touchscreen laptop with a mouse plugged in mid-session) never gets
  stuck with a stale mode.
- **`document.fonts.ready`** — a promise that resolves once web fonts have
  finished loading, used both by the loader (to track *real* readiness,
  not a fake delay) and by `alignBand2` (font metrics affect the measured
  text width it depends on).
- **`requestAnimationFrame`**, **`getBoundingClientRect`**,
  **`document.createRange`** — all real-time, real-layout browser APIs
  with no server-side equivalent.

This is the concrete answer to "why browser APIs can't run during server
rendering": a server has no viewport, no pointer, no fonts rendered on a
screen, and no per-tab session — these APIs only mean something once an
actual page is actually displayed somewhere.

IntersectionObserver was **not** used this lesson — that's the static
site's site-wide `.reveal` scroll-entrance system, out of scope until the
lesson that ports it everywhere, not just the hero.

## The component boundary: why one Client Component, not several

The brief's default preference is the smallest possible `"use client"`
boundary. Hero G is the case it explicitly carves an exception for: one
`requestAnimationFrame` loop reads and writes the pointer offsets, scroll
easing, and lens position of the bands, their ember twins, the anchor,
and the CTA row **together, in the same frame** — splitting that into
multiple Client Components would mean either duplicating this markup
between a "static" and an "interactive" version, or threading eight-plus
DOM refs through props for no real benefit. So the boundary landed at:

- **`HeroG.tsx`** (Server Component) — owns the real content (band text,
  name, statement, CTA, metadata) as plain data, owns the semantic outer
  `<section id="hero-g">`, and renders the bootstrap `<script>`. Zero
  client JavaScript cost for any of this.
- **`HeroGInteractive.tsx`** (Client Component) — receives that content as
  a prop and renders the entire interactive subtree itself (bands, twin
  bands, anchor, lens). This is still server-rendered on the initial
  request (Client Components aren't skipped during SSR, only hydrated
  afterward), so a no-JavaScript visitor still gets the complete hero.

## The loader and hydration: why a plain `<script>`, not `next/script`

The obvious tool for "run something before the page settles" is
`next/script`'s `beforeInteractive` strategy. The installed Next.js 16
docs (`node_modules/next/dist/docs/.../script.md`) rule it out here for a
specific reason: `beforeInteractive` scripts **must be placed in the root
layout** — they're meant for site-wide concerns (bot detectors, consent
managers), and putting Hero-G-only logic there would mean every future
route pays for it.

Instead, `HeroG.tsx` renders a plain inline `<script>` with
`dangerouslySetInnerHTML`, positioned exactly where the hero renders. This
is the same technique libraries like `next-themes` use to avoid a
theme-flash: a literal `<script>` tag executes synchronously, in document
order, as the browser parses that part of the page — before React
hydrates anything. There is no user input anywhere in that string (every
value is a build-time constant or a CSS Modules class name resolved at
build time), so the usual risk `dangerouslySetInnerHTML`'s name warns
about doesn't apply here.

That script does two things, matching the static site's own early inline
script:

1. Adds `hg-can-animate` to `<html>` unless `prefers-reduced-motion:
   reduce` is set.
2. On a first visit with motion allowed, adds `hg-pending` and inserts the
   loader overlay; otherwise (repeat visit, or reduced motion) adds
   `hg-ready` directly — no loader, no flash, no visible jump.

`HeroGInteractive`'s effect then **continues** whatever the bootstrap
script started — driving the 00→100 tick via `document.fonts.ready` and
a clamped 800–1400ms window, exactly like `js/portfolio.js`'s loader
section — because `sessionStorage`, `matchMedia`, and the tick's own
`requestAnimationFrame` loop are all browser-only APIs a Server Component
genuinely cannot touch.

## Reduced motion and input modes

Verified directly via headless Chrome's `--force-prefers-reduced-motion`
flag against both the static site and the Next.js port: both land on
exactly `<html class="ready">` / `<html class="... hg-ready">` — no
`can-animate`/`hg-can-animate`, no loader element in the DOM, no pending
class. Because the interactive engine's entire `useEffect` body checks
`html.classList.contains("hg-can-animate")` before starting the pointer
engine at all, reduced-motion users never run the lens, never get pointer
displacement, and see the complete, final composition immediately — the
same outcome as the static site, reached the same way (never starting the
engine, not starting-then-hiding it).

Coarse pointers and viewports under 1024px are handled the same way as
static: a CSS media-query backstop (`display: none !important` on the
lens and the ember twin field) plus the engine's own `lensAllowed()`
check, so the native pointer is never hidden on a touch device.

## Errors encountered

One TypeScript build error, fixed during this lesson: `heroEl` (from
`document.getElementById("hero-g")`) was checked for `null` at the top of
the effect (`if (!heroEl) return;`), but TypeScript doesn't carry that
narrowing into the `heroFrame` function declared later in the same
effect, because that function is called asynchronously (via rAF), not in
the same synchronous pass. Fixed by rebinding to an explicitly-typed
`const heroEl: HTMLElement = heroElMaybe;` right after the check, which
closures capture as definitely non-null everywhere.

One ESLint warning, fixed: an `eslint-disable-next-line` comment added
defensively around the bootstrap `<script>` turned out to disable rules
that weren't actually firing — removed once `npm run lint` confirmed it
was reporting an "unused directive" warning instead.

## QA results

Compared directly against the approved static homepage (port 4200) from
the Next.js dev server (port 4202):

- **Geometry, byte-for-byte:** band widths, unshifted anchor position, and
  the JS-computed `--anchor-shift` value all matched to sub-pixel
  precision once both pages were given a fresh, settled measurement — an
  initial ~90px discrepancy traced back to a *testing* artifact (the two
  pages' `alignBand2` had last run at different moments during repeated
  manual viewport resizes), not a real difference; forcing a synchronous
  resize event on both converged them to the identical value
  (`-19.036865234375px`).
- **Responsive breakpoints:** 1280×800, 1440×900, 1600×1000, 1920×1080,
  2560×1080, 2560×1440, 3440×1440, and 375×812 all checked for horizontal
  overflow (`scrollWidth` vs `clientWidth`) on both sites — identical,
  zero overflow, at every width. The ultra-wide letter-spacing/font-size
  tier (`min-aspect-ratio: 22/10`) engaged identically on both at
  3440×1440.
- **Header overlay:** confirmed `position: absolute` on `.site-frame` at
  desktop widths on both sites (the `:has()` rule), and confirmed it
  reverts to `position: static` below 1024px and at 375px on both.
- **Loader/hydration:** confirmed via a fresh session that the loader
  shows on first visit and is skipped on a repeat visit (the
  `sessionStorage` flag persisted correctly across a reload in the same
  tab); confirmed via `--force-prefers-reduced-motion` that no loader
  element ever enters the DOM under reduced motion, on either site.
- **No-JS content:** fetched the raw served HTML directly (no browser
  JavaScript involved) and confirmed "Bharat Vyas" and "Interactive
  Systems" are present as real text, not JS-injected.
- **Keyboard/skip link:** confirmed the skip link is the first focusable
  element, targets `#main-content` (which exists), and that `#work`
  exists with the CTA's `href="#work"` pointing at it.
- **Fast Refresh:** edited a comment in `HeroGInteractive.tsx` to force
  several Fast Refresh cycles, then confirmed exactly one `#hero-g`, one
  lens, and four bands remained — no duplicates from repeated
  mount/cleanup.
- **Pointer engine:** a dispatched synthetic `mousemove` produced an
  immediate, correctly-directioned band `transform` and toggled the lens
  to its "live" state on the first animation frame — full multi-frame
  lerp convergence could not be observed live in this session's Browser
  pane, which has a known issue (documented from prior sessions) where
  `requestAnimationFrame` stalls in that specific pane independent of tab
  focus; this is a tooling limitation of this environment, not something
  observed to affect the shipped code, whose rAF loop logic mirrors the
  verified static implementation line-for-line.
- **`npm run lint`:** clean, zero warnings.
- **`npm run build`:** succeeded; TypeScript passed; `/` and `/_not-found`
  both prerendered as static content.
- **Console/network:** zero errors in either dev-server console or the
  network panel; every asset (fonts, chunks, the inline SVG grain
  texture) returned `200`.
- **Static site:** confirmed untouched — `git diff --stat` against
  `index.html`, `css/portfolio.css`, `js/portfolio.js`, `projects/`,
  `assets/`, and `v2-preview/` reports no changes.

## What Bharat should now be able to explain

- The difference between a Server Component and a Client Component, and
  why "use client" doesn't mean "server rendering is skipped."
- What hydration is, and why a deliberate, expected class-list mismatch
  (Hero G's bootstrap script) needs `suppressHydrationWarning` rather
  than being treated as a bug.
- Why `useRef` — not `useState` — is correct for a value that updates 60
  times a second, and why this component ended up needing exactly zero
  `useState` calls despite that being an available tool.
- Why an effect that adds a listener must return a function that removes
  it, and what actually breaks (duplicate listeners) if it doesn't —
  demonstrated concretely via the Fast Refresh + element-count check.
- Why `requestAnimationFrame` loops should stop scheduling themselves once
  nothing is moving, instead of running forever.
- Why `next/script`'s `beforeInteractive` strategy was the wrong tool
  here, and what a plain inline `<script>` gets you instead.
- Why sessionStorage, matchMedia, and document.fonts are all browser-only
  and cannot run during server rendering.

## What Lesson 4 will cover

Project data, dynamic routes, reusable case-study components, and porting
BETTR as the first project route. Lesson 4 has not started in this
session.

---

# Lesson 4 — Project data, dynamic routes, reusable case-study components, and porting BETTR

Lesson 3 gave the homepage its first Client Component. Lesson 4 gives the
app its first *content* route: `/projects/bettr`, generated from a typed
data registry and a shared component system meant to be reused by every
project page that follows — not just this one.

## Routes, in plain language

A **route** is a URL path the app responds to. In the App Router, a folder
under `src/app/` becomes a URL segment automatically — no router config
file to edit by hand.

## Dynamic `[slug]` segments and params

`src/app/projects/[slug]/page.tsx` — the square brackets mean this folder
matches *any* single path segment: `/projects/bettr`, `/projects/cardiopal`,
`/projects/anything` all route here. The matched text arrives as **route
params**, delivered to the page (and to `generateMetadata`) as
`params: Promise<{ slug: string }>` — a Promise, in this Next.js version,
so both functions `await params` before reading `slug` off it.

## generateStaticParams and static prerendering

`generateStaticParams` returns the list of param values that actually
exist — here, `PROJECT_SLUGS.map(slug => ({ slug }))`, which is just
`["bettr"]` this lesson. Next.js calls this at build time and
**prerenders** `/projects/bettr` to a plain HTML file then — `npm run
build`'s route table confirms it with `●  (SSG)`. A visitor gets that
pre-built file instantly; nothing runs per-request for this route. Only
slugs actually in `PROJECT_SLUGS` get a route — CardioPal, FrankenTeen,
Echoes stay unimplemented rather than shipping empty pages.

## notFound()

Calling `notFound()` inside the page bails out and renders Next.js's real
404 UI. This route calls it whenever a slug has no metadata *or* no
registered content component — covering both "this project doesn't exist"
and "this project is documented but not built yet" with the same honest
result, rather than a blank page or a crash.

## Route metadata

`generateMetadata` returns the `<title>`, description, and Open Graph tags
for a route — here, pulled from the project's own metadata record so the
`<head>` never needs hand-written per-route markup. It needed one small
addition to the root layout: `metadataBase`, because a relative-path
`og:image` requires it (Next.js errors the build otherwise) — set to this
repo's actual GitHub Pages URL, not a placeholder.

## Project data vs. a React component

`src/data/projects.ts` holds `PROJECTS`, a typed, plain-object record —
title, tools, accent, route, and so on. It's safe to loop over: a future
homepage project index can map it straight into cards. `src/content/
projects/registry.ts` holds a *different* mapping, slug → the React
component that renders that project's actual case study. These are
deliberately two files: metadata is a serializable value; a case-study
composition is executable UI logic. Forcing BETTR's seven chapters of
prose and images into the metadata object would mean inventing a tiny
templating language just to reassemble them at render time — the whole
reason this lesson keeps them apart.

## Reusable components, controlled variants

Eight components make up the shared case-study system, all Server
Components, all visually neutral (BETTR's own colour, fonts and bespoke
widgets stay out of them): `ProjectPageShell`, `ProjectOpening`,
`ProjectSection`, `SectionHeading`, `MediaFigure`, `ProjectAnnotation`,
`VideoBlock`, `PrototypeEmbed`. Every prop that controls layout is a
**controlled union**, not a bare string — `ProjectSectionRhythm` is
`"standard" | "feature" | "tight"`, not `string`. A typo like `"standrd"`
fails at compile time with a real TypeScript error, instead of silently
matching no CSS rule and rendering with no rhythm at all — confirmed
directly this lesson (see "TypeScript guards, confirmed" below).

Why controlled variants instead of one identical template per project: a
generic `layout: string` would let every future project page invent its
own ad hoc layout name, at which point the "shared" component system stops
meaning anything — the type system is what keeps every project page
actually using the same small vocabulary of layouts.

## Why copy assets, never move them

`assets/bettr-live/**` is a shipped, case-sensitive build the *live static
site* still serves from directly — GitHub Pages' case sensitivity means
even a renamed folder would break it. Copying (`public/assets/bettr-live/`
in `next-portfolio`) gives the Next.js app its own independent files;
moving would delete the static site's copy out from under it. Verified
with `diff -rq` after copying: byte-identical, filenames, casing, and
internal relative paths all untouched.

## TypeScript guards, confirmed

Four scratch-file checks (written, run through `npx tsc --noEmit`, then
deleted — the Lesson 2 precedent):

```
const badSlug: ProjectSlug = "cardiopal";
// error TS2322: Type '"cardiopal"' is not assignable to type '"bettr"'.

const badMeta: ProjectMeta = { slug: "bettr", /* ...no title... */ };
// error TS2741: Property 'title' is missing in type '{...}' but required in type 'ProjectMeta'.

const badRhythm: ProjectSectionRhythm = "loose";
// error TS2322: Type '"loose"' is not assignable to type 'ProjectSectionRhythm'.

const badFigure: MediaFigureProps = { src: "...", alt: "x" };
// error TS2739: Type '{...}' is missing the following properties: width, height
```

## The one Client Component: BettrLiveEmbed

`BettrLiveEmbed.tsx` is this lesson's only `"use client"` file — the
same-origin PLAY cursor bridge, ported from `js/portfolio.js`'s
`bindBridge`/`releaseBridges`. One real, documented difference from the
static site: there, the bridge hands control to a site-wide custom-cursor
dot that doesn't exist in this Next.js app yet (a later lesson's job, per
Lesson 3's own notes). This component ports the bridge's actual mechanics
— same-origin `contentDocument` access, translating the iframe's local
pointer coordinates directly (they're already relative to the iframe's own
viewport, which is exactly where the overlay is positioned), injecting a
`cursor: none` style into the iframe's document, dropping the reveal the
instant the *parent* document receives pointer movement (iframes are their
own document — motion inside never bubbles out, so a parent `mousemove`
only ever fires once the pointer has actually left) — into a small,
self-contained overlay instead of wiring into cursor infrastructure that
isn't there. Verified directly: a synthetic `PointerEvent` dispatched
inside the iframe's document produced the injected style, the overlay
fading toward full opacity at the translated coordinates, and a synthetic
parent `mousemove` immediately dropped it back to zero.

Kept as the smallest practical boundary: `PrototypeEmbed` (the shared
frame/bar/iframe chrome) stays a plain, directive-free component that
`BettrLiveEmbed` imports and wraps with a ref plus one effect — the rest
of the BETTR page, including `ProjectOpening` around the embed, stays
Server Components.

## Small Client Component islands inside Server pages

The pattern from Lesson 3 (Hero G's Server/Client split) repeats here at a
much smaller scale: `app/projects/[slug]/page.tsx` and every one of the 8
shared components are Server Components; only `BettrLiveEmbed` opts into
client rendering, and only for the one thing that genuinely needs a
browser API (`iframe.contentDocument`, pointer events).

## Project-scoped fonts, without a global font change

BETTR ships its own fonts (Jersey 25, Rajdhani) that the rest of the site
never uses. Rather than `next/font/local` (which would still work), this
lesson uses a scoped `@font-face` inside `BettrCaseStudy.css`, pointing at
the *same* copied font files the live embed itself already needs
(`/assets/bettr-live/Fonts/**`) — no second copy of the font files, and no
change to the global Fraunces/Inter/Space Mono setup in `tokens.css`/
`fonts.ts`. This mirrors exactly what `css/portfolio.css` already does for
BETTR on the static site.

## Diagram

```
/projects/[slug]
      │
      ├─ generateStaticParams()  ──── PROJECT_SLUGS ("bettr")
      ├─ generateMetadata()      ──── data/projects.ts (PROJECTS registry)
      └─ <Content /> ─────────────── content/projects/registry.ts
                                            │
                                            ▼
                                  BettrCaseStudy.tsx
                                            │
                    ┌───────────────────────┼────────────────────────┐
                    ▼                       ▼                        ▼
        components/projects/*     BettrLiveEmbed.tsx        BettrCaseStudy.css
        (ProjectPageShell,        (Client Component,        (.project-bettr scope,
         ProjectOpening,           PLAY cursor bridge)        Jersey 25/Rajdhani
         ProjectSection,                                      @font-face, palette
         MediaFigure, etc.)                                   band, specimen)
                    │
                    ▼
        public/assets/bettr/**, public/assets/bettr-live/**
        (copied from the static site, never moved)
```

## Files created

```
next-portfolio/src/
├── app/
│   └── projects/
│       └── [slug]/
│           └── page.tsx
├── components/
│   └── projects/
│       ├── ProjectPageShell.tsx
│       ├── ProjectOpening.tsx
│       ├── ProjectSection.tsx
│       ├── SectionHeading.tsx
│       ├── MediaFigure.tsx
│       ├── ProjectAnnotation.tsx
│       ├── VideoBlock.tsx
│       ├── PrototypeEmbed.tsx
│       └── BettrLiveEmbed.tsx
├── content/
│   └── projects/
│       ├── BettrCaseStudy.tsx
│       ├── BettrCaseStudy.css
│       └── registry.ts
├── data/
│   └── projects.ts
├── types/
│   └── project.ts
└── styles/
    └── projects.css        (new — shared grid + proj-* component classes)
```

Plus `public/assets/bettr/**` (7 images) and `public/assets/bettr-live/**`
(the complete copied live build), and small edits to `tokens.css` (added
`--ed-fs-*`/`--grid-gap`/`--seam`), `globals.css` (imports `projects.css`),
`app/layout.tsx` (`metadataBase`), `app/page.tsx` (the temporary link), and
`eslint.config.mjs` (excludes `public/**`).

## Errors and fixes

- ESLint initially flagged the copied `assets/bettr-live/**` JavaScript
  files as if they were application source (unused-variable warnings in
  third-party code that must never be edited) — fixed by adding
  `public/**` to `eslint.config.mjs`'s ignore list.
- `react/no-unescaped-entities` flagged every literal apostrophe in
  BETTR's ported prose — fixed with `&apos;`, matching how the copy
  already used `&ldquo;`/`&rdquo;` entities elsewhere in the same file.
- `@next/next/no-html-link-for-pages` flagged the breadcrumb/footer `<a>`
  tags pointing at internal routes — fixed by switching to `next/link`.
- `@next/next/no-img-element` flagged `MediaFigure`'s plain `<img>` — fixed
  by switching to `next/image`, the correct call here since every figure
  is a static screenshot with known dimensions and no special iframe- or
  animation-adjacent requirement.
- Next.js's build step required `metadataBase` once BETTR's route-level
  `og:image` used a relative path — fixed by adding it to the root
  layout's metadata (see "Route metadata" above).

## QA

Run on port 4202 (`.claude/launch.json`'s `next-portfolio` config):
`/projects/bettr` loads directly and via the temporary homepage link;
browser back/forward and a hard reload on the route all work; an unknown
slug 404s properly; zero console errors or hydration warnings in a fresh
tab; no horizontal overflow at 1280/1440/1920/3440px (checked live via
`scrollWidth`/`clientWidth`); the PLAY bridge's same-origin access,
style-injection, overlay reveal, and drop-on-parent-motion all confirmed
by dispatching synthetic pointer events; skip link first-focusable; one
`<main>`, correct heading order, all iframes titled. `npm run lint`: zero
warnings. `npm run build`: succeeded, `/projects/bettr` statically
generated. Full detail, including the headless-Chrome tooling artifact
encountered at 375px (a stale render from a reused browser session, not a
real overflow — cross-checked live and documented in memory for future
sessions), is in this lesson's production-log entry.

## What Bharat should now be able to explain

- What a dynamic `[slug]` route is, what `params` contains, and why it's a
  `Promise` in this Next.js version.
- What `generateStaticParams` does and how to read `●  (SSG)` in a build's
  route table as proof it worked.
- Why project metadata and a project's React component live in two
  separate files, with a concrete example of what each is used for.
- Why `ProjectSectionRhythm`/`MediaFigureCrop`/etc. are unions, not
  `string` — and what compiler error each one actually catches (see the
  four confirmed scratch-file errors above).
- Why `assets/bettr-live/**` gets copied, never moved, into
  `next-portfolio/public/`.
- Why `BettrLiveEmbed` is the only Client Component this lesson, and what
  specifically it does that a Server Component cannot.
- Why BETTR's fonts are a scoped `@font-face`, not a change to the site's
  global font setup.

## What Lesson 5 will cover

Porting CardioPal, testing component reuse, and learning external embeds,
fallbacks and project-specific variants. Lesson 5 has not started in this
session.

---

# Workflow note — Portfolio migration subagents (configured 2026-07-18)

This is a configuration note, not a lesson — no portfolio content moved and
no application code changed. It explains a tool the main agent now has
available for the remaining lessons, most immediately Lesson 5 (CardioPal).

## What a subagent actually is

A subagent is a separate Claude Code conversation with its own system
prompt, its own tool access, and its own context window. When the main
agent (the one Bharat is talking to) delegates a task to a subagent, that
subagent reads only what it's told and what it looks up itself — it does
not see this conversation's history. It works independently and returns a
summary; only that summary lands back in the main conversation.

## Why a separate context matters here

Auditing a static HTML page line by line, or reading through
`next-portfolio/node_modules/next/dist/docs/` to confirm one API's exact
behavior, produces a lot of text that's only useful once, in the moment
it's being decided. If the main agent read all of that directly, the main
conversation's context would fill up with source dumps and doc excerpts
that aren't needed again five minutes later — this is exactly the kind of
content-pollution the migration's own lessons have been careful about
(e.g. never reading `assets/bettr-live/**` end-to-end unnecessarily). A
subagent absorbs that cost in its own disposable context and hands back
only the finding.

## The four portfolio subagents

All four live in `.claude/agents/` (checked into Git, so they're
available in every session on this repo, not just this machine) and are
all **read-only**: none of them can use Write, Edit, or (for three of the
four) Bash, so none of them can modify a file, and none of them can stage
or commit to Git.

- **`static-source-auditor`** — reads one approved static page (HTML plus
  the relevant CSS/JS) and returns a structured inventory: visible
  content, referenced media with dimensions/aspect ratios (read from the
  HTML's own `width`/`height` attributes), fonts/colors/motifs,
  interactions and embeds, which CSS is global versus project-specific,
  what must be preserved, and anything weak or unsupported. Use this
  before writing the first line of a new project page's Next.js
  component.
- **`nextjs-docs-researcher`** — checks a specific framework-API question
  against the Next.js docs actually installed in
  `next-portfolio/node_modules/next/dist/docs/` (this Next.js version is
  newer than most training data, per `next-portfolio/AGENTS.md`), and
  only falls back to a live web search if the installed docs don't cover
  it. Use this before writing code that touches an API this session
  hasn't already confirmed.
- **`content-integrity-reviewer`** — compares a migrated project page
  against the approved static source (and any other source documents
  provided) for factual accuracy: titles, roles, tools, results, and
  participant claims, plus the site's writing rules (no invented claims,
  no over/under-crediting collaborators, no AI-sounding language, no
  teammate scores anywhere). Use this right after a page's content is
  ported, before considering it done.
- **`visual-qa-reviewer`** — audits an already-implemented Next.js route:
  compares it against the static source, checks console/network output,
  runs `npm run lint`/`npm run build`, checks responsive behavior and
  reduced motion, and returns a blocker-first report. This one does have
  Bash and browser-inspection tools (it needs to actually run the build
  and load the page), but is still barred from Write/Edit and from
  fixing anything itself. Use this after a route is implemented, before
  considering it done.

## What the main agent still owns

Subagents report; they don't decide or implement. Writing the actual
Next.js components, choosing the architecture, editing `tokens.css` or
`projects.css`, resolving a discrepancy a reviewer flags, and every Git
commit still happen in the main conversation, with the main agent reading
each subagent's findings and deciding what to do with them. None of the
four subagents can commit their own findings as code changes even if they
wanted to — that boundary is enforced by their tool restrictions, not
just by instruction.

## When to use a subagent, and when not to

Reach for one of these four when a task is read-only, self-contained, and
would otherwise dump a lot of one-time-use detail into the main
conversation (a full page audit, a docs lookup, a line-by-line content
comparison, a QA pass). Skip them for quick, targeted questions where the
answer is already visible in context, or for anything that requires
actually writing code — that stays in the main conversation, where
iteration is fast and the full picture is already loaded.

## How this reduces context pollution without replacing anything else

This doesn't replace `CLAUDE.md`, the direction doc, or the production
log — those still hold the durable decisions and facts. It doesn't
replace Git checkpoints either — commits are still how work actually gets
saved. What it changes is where the *scratch work* behind a decision
lives: in a subagent's disposable context instead of permanently in the
main conversation's history.

## Restart note

Because `.claude/agents/` did not exist in this repository before this
session started, this session's file-watcher does not pick up the new
directory automatically — per the installed Claude Code documentation, the
watcher only covers directories that already existed when the session
began. **A new Claude Code session (or a restart of this one) is required
before any of these four subagents can actually be delegated to.** They
are not used later in this same session for that reason; first real use
is intended to be during the Lesson 5 CardioPal migration, in a fresh
session.

---

# Lesson 5 — Reusing the project route for CardioPal

Lesson 4 established the dynamic project route and the neutral case-study
components with BETTR. Lesson 5 proves that architecture can carry a second,
visually distinct project without turning the shared components into BETTR
components or redesigning CardioPal to fit them.

## What moved

`PROJECT_SLUGS` now contains `"bettr"` and `"cardiopal"`. CardioPal has a
plain metadata entry in `src/data/projects.ts`, a component entry in
`src/content/projects/registry.ts`, and its own composition and scoped styles
in `CardioPalCaseStudy.tsx` / `CardioPalCaseStudy.css`. The existing
`app/projects/[slug]/page.tsx` generates the new route without another page
file or route branch.

The content component follows the same boundary as BETTR: reusable structure
comes from `ProjectPageShell`, `ProjectOpening`, `ProjectSection`, and
`PrototypeEmbed`; the project's own visual identity stays scoped beneath
`.project-cardiopal`. All visible content and ordering come from the approved
static `projects/cardiopal.html` source.

## Why there are no copied CardioPal assets

The static CardioPal page has no image source and no `assets/cardiopal/`
folder. That absence is deliberate: the live Figma prototype is the only real
interface evidence and acts as the opening artifact. The migration therefore
copies no screenshots, crops, placeholders, or unrelated images.

## Completing PrototypeEmbed without making it interactive

CardioPal's Figma iframe needs two presentational details BETTR did not:

- `allowFullScreen`, which emits the standard React `allowFullScreen` iframe
  attribute; and
- `toneLight`, which adds the static page's `.tone-light` class so the iframe
  has a white loading surface instead of BETTR's black one.

These are plain rendered attributes/classes. They do not need state, effects,
or a Client Component. `CardioPalCaseStudy` and `PrototypeEmbed` remain Server
Components. BETTR does not pass either option, so its existing iframe markup
and cursor bridge remain unchanged.

## Metadata for a project with no image

`ProjectMeta.ogImage` is optional because requiring a fabricated image would
misrepresent CardioPal. `generateMetadata` conditionally adds
`openGraph.images` only when a project supplies a real image. BETTR therefore
keeps its existing image metadata, while CardioPal emits valid Open Graph
metadata without an image array containing `undefined`.

CardioPal's approved static page also uses a shorter Open Graph description
than its normal meta description. The optional `ogDescription` field preserves
that distinction while letting other projects fall back to
`shortDescription`.

## Verification and external-iframe boundary

Lint and the production build pass, with both project slugs listed as SSG
output. The route was checked at 1280, 1440, and 1920 with no horizontal
overflow; static-vs-Next content is exact, and the internal CardioPal geometry
at 1440/1920 matches the approved page. BETTR and invalid-slug routing remain
clean.

The Figma canvas and its native controls render in the iframe, and the source
URL, open-prototype URL, title, light tone, and fullscreen permission all match
the static page. Because the iframe is cross-origin, its internal DOM is not
available to the parent route or the browser inspector used here. Automated
control clicks did not expose a reliable state change, so deep prototype
interaction is recorded as externally constrained rather than claimed as
passed.

---

# Lesson 6 — Reusing the project route for FrankenTeen

FrankenTeen completes the first sequential project-migration session. It uses
the same dynamic `app/projects/[slug]/page.tsx` route and neutral case-study
components as BETTR and CardioPal, while preserving the approved page's own
mustard, violet, and dark theatrical identity.

## What moved

`PROJECT_SLUGS` now includes `"frankenteen"`. Its approved metadata lives in
`src/data/projects.ts`, its content-registry entry lives in
`src/content/projects/registry.ts`, and the complete page is rendered by
`FrankenTeenCaseStudy.tsx` with scoped rules in
`FrankenTeenCaseStudy.css`. The route is statically generated alongside BETTR
and CardioPal; no separate page file or routing branch was added.

The component preserves the static source's opening and six numbered chapters
in order, including the two Act III feature chapters, their low-opacity Roman
numeral marks, the paired native-capped evidence figures, the testing findings,
references, and both project-navigation bars. `ProjectSection` and
`SectionHeading` now accept `ReactNode` titles so the approved chapter-mark
markup can pass through the existing heading component. Plain string titles
for BETTR and CardioPal are unchanged.

## Assets and Kaltura embed

Only the nine JPEGs referenced by `projects/frankenteen.html` were copied to
`public/assets/frankenteen/`: the mansion gate, bedroom, guitar prop, pacing
chart, mansion approach and progression, attic approach and lab, and Blender
wall module. Each copied file matches its static original by SHA-256. The
untracked FrankenTeen crops that the approved page does not reference were not
used or touched.

The Kaltura process recording remains a plain 16:9 iframe with the exact
approved `entry_id=1_j1w7k3an` source, title, lazy loading, autoplay/fullscreen/
encrypted-media permission string, and standard plus legacy fullscreen
attributes. There is no autoplay, loop, mute, poster replacement, or new
facade. The player visibly renders its Unity-editor poster and play control.

## Server and Client Component boundary

`FrankenTeenCaseStudy` remains a Server Component. Static images, links, and a
third-party iframe need no state, effects, event listeners, or browser APIs, so
the migration adds no FrankenTeen Client Component and no dependency. The only
shared type change is the backward-compatible `ReactNode` heading title noted
above.

## Content and visual parity

The rendered opening, all six chapters, references, and footer navigation were
compared with the approved static page after normalizing insignificant HTML
whitespace. The texts match exactly and in the same order. All nine images,
their captions, native dimensions/caps, the Kaltura placement, the feature
chapter hierarchy, and the `#C68A2E` / `#7A5A82` identity remain associated
with the same content.

## Verification and Session 1 QA

`npm.cmd run lint` and `npm.cmd run build` pass. The production route table
lists BETTR, CardioPal, and FrankenTeen as SSG output. FrankenTeen and its nine
local asset URLs load directly; metadata, project navigation, keyboard-focus
targets, iframe permissions, 16:9 framing, and the real invalid-slug 404 were
checked. The page has no horizontal overflow at 1280, 1440, or 1920 pixels,
and its console is clean at the checked widths.

The combined Session 1 pass reloaded the homepage, BETTR, and CardioPal at the
same three widths and reconfirmed clean consoles, no horizontal overflow, and
distinct project tokens. Hero G's four approved thesis lines, name anchor,
inspection lens, and shell remain present. BETTR retains its approved Open
Graph image and oxblood/red treatment; CardioPal still emits no fabricated OG
image and retains its sage/paper exhibit; FrankenTeen emits only its approved
metadata. CardioPal's next-project link navigates to FrankenTeen, and an
unknown project slug returns HTTP 404.

The Kaltura document is cross-origin and therefore unavailable to parent-page
DOM inspection. One automation click on the visible play control produced no
observable state change, so deep playback is not claimed as verified; the
loaded poster, source, permissions, focusability, and framing are verified.

---

# Lesson 7 — Preserving Echoes of Home's click-to-load media

Echoes of Home starts Session 2 of the sequential project migration. Its
authoritative source is `projects/echoes.html`, its approved public slug is
`echoes`, and the existing dynamic route now generates `/projects/echoes`.
The shared case-study shell remains neutral; Echoes supplies its own quiet,
spatial composition and cool blue-grey/slate identity.

## Route and component architecture

`PROJECT_SLUGS` now includes `"echoes"`. Approved metadata lives in
`src/data/projects.ts`, the content registry maps the slug to
`EchoesCaseStudy`, and `EchoesCaseStudy.css` scopes the project's tokens,
type ramp, chapter rhythm, memory-room interlude, six-step flow corridor,
runner composition, implementation record, quote pair, and media poster.

`EchoesCaseStudy` remains a Server Component. The one exception is
`EchoesVideoPoster`, a small Client Component that preserves the approved
click-to-load behavior: initial HTML renders the quiet “Watch the recording”
button and a `noscript` fallback; the exact Kaltura iframe is created only
after activation. This interaction genuinely needs browser state, while the
rest of the page remains server-rendered. No dependency or shared visual
component was added.

## Approved assets and media sequence

Only the four JPEGs directly referenced by `projects/echoes.html` were copied
to `public/assets/echoes/`: `laptop-interaction-crop.jpg`,
`room-scene-crop.jpg`, `runner-scene-crop.jpg`, and
`track-blender-crop.jpg`. Each copy matches its static original by SHA-256 and
returns HTTP 200. The pre-existing untracked `runner-text-crop.jpg` is not
referenced by the approved page and was neither used nor touched.

The approved sequence remains: laptop interaction in the opening, room scene
in chapter 01, runner scene plus the smaller Blender track inset in chapter
03, then the Kaltura full playthrough inside chapter 04. The Kaltura source
retains `entry_id=1_6anm1jue`, the approved widget configuration, title,
fullscreen flag, and `autoplay *; fullscreen *; encrypted-media *` permission.
It remains behind the poster because its host thumbnail exposes Unity chrome,
placeholder copy, and a facecam.

## Content and visual parity

The rendered project frame, opening, five chapters, quiet interlude, all six
experience-flow steps, testing record, quotes, reflection, poster label, and
footer navigation match the approved static source exactly after insignificant
whitespace normalization: 4,218 characters in the same order. All four images
retain their approved declared dimensions and native display caps; the video
surface remains 16:9. Echoes adds no Open Graph image because the static source
does not define one.

Static and Next layouts were compared at 1280, 1440, and 1920 pixels. Hero,
chapter, interlude, runner, full-bleed video, quote, and footer widths align;
there is no horizontal overflow. The approved `#87A2B8` accent, `#171B20`
feature surface, and rare `#C99A5B` lamp emphasis remain distinct from the
other projects.

## Verification and focused regression

`git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass. The build
lists BETTR, CardioPal, FrankenTeen, and Echoes as SSG output. Direct load,
hard refresh, metadata, navigation from FrankenTeen, expected next-project
hrefs, focus targets, asset requests, console/hydration output, image loading,
poster activation, iframe framing, and the real unknown-slug HTTP 404 were
checked.

The click-to-load control removes the poster and renders one visible
1308×736 Kaltura iframe at 1440 pixels. Its source, title, permission string,
and fullscreen flag are exact. The cross-origin player document cannot be
inspected from the parent route, so deep playback is not claimed.

The focused regression pass reconfirmed the homepage/Hero G shell and the
BETTR, CardioPal, and FrankenTeen routes at 1440 pixels: correct titles and
project tokens, expected embeds, no metadata leakage, no console warnings, and
no horizontal overflow. BETTR and FrankenTeen retain their approved OG images;
CardioPal still emits none. No package or lockfile changed.

Three migration defects were corrected during verification: an omitted JSX
space after the highlighted “lamp light” phrase; the room chapter's blue-grey
heading accent, restored through the shared heading's existing ReactNode title
slot; and Next.js's above-the-fold image warning, resolved by eagerly loading
only the opening image without changing its source, dimensions, crop, or
appearance.

## What Lesson 8 will cover

Breaking the Smartphone Mold is the next sequential Session 2 migration task.
It was not started in this lesson.

---

# Lesson 8 — Preserving Breaking the Smartphone Mold's research dossier

Breaking the Smartphone Mold is the fifth approved project and the second
Session 2 migration. Its authoritative source is
`projects/smartphone-mold.html`, its existing public slug is
`smartphone-mold`, and the dynamic project route now generates
`/projects/smartphone-mold`.

## Route and component architecture

`PROJECT_SLUGS`, `PROJECTS`, and `PROJECT_CONTENT` now include
`"smartphone-mold"`. `SmartphoneMoldCaseStudy` carries the complete static
content, while `SmartphoneMoldCaseStudy.css` scopes the project's original
Space Mono/Inter research-dossier treatment, `#0C1118` field,
`#E14B3C` accent, 980px reading frame, tag pills, three-part isomorphism
framework, evidence pairs, interview quote, reflection, and references.

The component is a Server Component. The approved page contains no state,
hooks, event listeners, script, video, iframe, or browser-only interaction,
so no Client Component or dependency is needed. The existing root shell and
dynamic route remain unchanged.

## Approved assets and media sequence

Only the four files directly referenced by the approved source were copied to
`public/assets/smartphone/`: `convergence-figure1.jpeg`,
`nothing-transparent.jpeg`, `cmf-product.jpeg`, and `glyph-leak.jpeg`. The
unused `nothing-transparent-480.jpg` was not copied. Each public file matches
its static original by SHA-256.

All four `next/image` instances use `unoptimized`, deliberately preserving the
approved JPEG URL, format, original bytes, intrinsic resolution, and browser
decode rather than introducing a generated WebP/AVIF derivative. The opening
figure retains its natural aspect ratio; the three photographic evidence
images keep the static page's fixed 260px `object-fit: cover` treatment.

## Content and visual parity

The rendered project status bar, opening, tags, caption, five numbered
sections, framework cards, quote, reflection, references, and footer
navigation match the approved source exactly after insignificant whitespace
normalization: 5,692 characters in the same order. No copy, metric, caption,
credit, or reference was added, removed, or rewritten.

Static and Next layouts were compared at 1280, 1440, and 1920 pixels. The
project-local 980px frame, 916px hero figure, 457px evidence cards, 260px crop
height, section count, dark surfaces, red accent, and Space Mono title all
match. The Next root's established shared site header accounts for the only
expected vertical offset above the otherwise matching project-local geometry.
No horizontal overflow appears at any checked width.

## Verification and focused regression

`git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass. The build
statically generates Breaking the Smartphone Mold alongside the four earlier
projects. Direct loading, a fresh same-URL navigation, route metadata, exact
next-project href, focus outline, local media decoding, HTTP asset responses,
console/hydration output, and the real unknown-slug HTTP 404 were checked.

All four browser image requests resolve directly to the approved `.jpeg`
files, report their source dimensions, and return HTTP 200. The route has no
embed or local video to test. It intentionally emits no Open Graph image
because the approved static source defines none.

The one defect found during verification was generated image optimization,
which could change format and compression even though the copied public files
were exact. Adding `unoptimized` to these four project-local images restored
direct delivery of the approved JPEGs without changing layout or shared image
behavior elsewhere.

## What Lesson 9 will cover

Playing Freedom is the sixth and final approved lighter project and the next
sequential Session 2 migration task. It was not started in this lesson.

---

# Lesson 9 — Preserving Playing Freedom's documentary-first dossier

Playing Freedom is the sixth and final approved project in the current static
portfolio sequence. Its authoritative source is `projects/playing-freedom.html`,
its approved slug is `playing-freedom`, and the existing dynamic route now
generates `/projects/playing-freedom`.

## Route and component architecture

`PROJECT_SLUGS`, `PROJECTS`, and `PROJECT_CONTENT` now include
`"playing-freedom"`. `PlayingFreedomCaseStudy` contains the complete approved
page, while `PlayingFreedomCaseStudy.css` scopes its Space Mono/Inter research
dossier, `#0C1118` field, `#E14B3C` accent, 980px reading frame, 16:9
documentary surface, notes, references, reflection, and footer navigation.

The case study remains a Server Component. A third-party iframe does not need
React state, hooks, or browser APIs, and the static source defines no custom
player control. No Client Component, shared component variant, dependency, or
package change was introduced.

## Approved media and content

The static source references no local image, audio, or video asset, so nothing
was copied. Its sole media item is the Kaltura documentary iframe. The port
retains the exact provider URL, `entry_id=1_jf3kb1k3`, widget configuration,
title, fullscreen attributes, and `autoplay *; fullscreen *; encrypted-media *`
permission string.

The rendered status bar, opening, tags, documentary framing and caption, four
numbered sections, sourcing note, scholarship and references, reflection, and
footer links match the approved source exactly after insignificant whitespace
normalization: 4,232 characters in the same order. The route intentionally
emits no Open Graph image because the static source defines none.

## Verification

`git diff --check`, `npm.cmd run lint`, and `npm.cmd run build` pass. The build
statically generates all six approved project slugs. Direct route loading and
fresh same-URL navigation work, the iframe remains visible at the approved
16:9 ratio, the browser console is clean, keyboard focus is visible, and an
unknown slug returns HTTP 404.

At 1280, 1440, and 1920 pixels, the project-local frame remains centered and
overflow-free. At the shared 1440 comparison width, the static and Next iframe
are both 915×515 pixels; the established Next.js site header accounts for the
only expected vertical offset. The Kaltura document is cross-origin and
cannot be inspected from the parent route, so source, permissions, visibility,
and framing are verified but deep playback is not claimed.

## What follows Lesson 9

All six approved project routes are now implemented. The next step is combined
Session 2 regression QA and documentation; homepage work-index development
remains a separate later task.

---

# Session 2 completion — combined project-route QA

Session 2 is complete. Echoes of Home, Breaking the Smartphone Mold, and
Playing Freedom are committed as `f2df6d76f4ad51b076d3114df9e2556576070116`,
`3188ed190d5c941e8002cd2cdb3cbd2b1333ccf8`, and
`77ca9b61f952466b8acbefab47675b0c4dd9fe65` respectively. Together with
BETTR, CardioPal, and FrankenTeen, the typed route now generates all six
approved project slugs.

## Combined verification

The homepage and all six project routes were directly loaded at 1280, 1440,
and 1920 pixels. All routes remain console- and hydration-warning-free with
no horizontal overflow or clipped headings. Image geometry preserves declared
or intentionally cropped proportions; every local asset URL referenced by the
project source returned HTTP 200. Kaltura documentary surfaces remain 16:9,
the BETTR live build and CardioPal Figma canvas retain their approved fixed
framing, and captions remain with their source media.

Route titles and descriptions remain isolated. Only BETTR and FrankenTeen
emit their approved Open Graph images. BETTR retains `#EB5160`, CardioPal
retains sage `#5B7A73` and its paper panel, FrankenTeen retains mustard/violet,
Echoes retains blue-grey `#87A2B8` and slate `#171B20`, and the two research
dossiers retain their approved dark/red treatment. Project next links follow
the approved sequence through Playing Freedom, whose footer returns to the
index.

Hero G still completes its first-visit loader into the four approved thesis
bands, asymmetric Bharat Vyas anchor, contextual labels, and inspection lens.
The shared shell is unchanged. Echoes' poster remains keyboard-focusable and
loads its exact 1308×736 Kaltura iframe after activation. Cross-origin player
documents and the Figma document remain inaccessible to parent-page DOM
inspection, so visible loading, sources, titles, permissions, focusability,
and framing are verified without claiming deep playback or editing behavior.

`npm.cmd run lint` passes. `npm.cmd run build` passes and reports ten generated
pages, including all six project slugs. Every intended route returns HTTP 200;
`/projects/not-a-project` returns the real HTTP 404. No package, lockfile,
dependency, approved static source, Hero G source, earlier project-specific
implementation, or protected untracked file changed during the remaining
migrations or combined QA.

No new defect was found during the combined pass. The Session 2 migration-only
corrections remain the three documented Echoes fixes (JSX spacing, room-heading
accent, and eager loading for the opening image) and Smartphone Mold's direct
JPEG delivery fix. No shared regression correction was required.

The next migration task is the homepage work index. Contact and navigation
work, broader responsive redesign, and Phase 2 polish remain explicitly out of
scope until their own tasks.
