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
