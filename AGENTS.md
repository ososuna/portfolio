# AGENTS.md

Static, bilingual (en/es) Astro portfolio deployed on Vercel. Content lives in Astro content collections; the UI is official Shadcn components rendered through React on the server.

## Language and decisions

- Name things with the terms in [GLOSSARY.md](GLOSSARY.md) (Locale, Section, Hero, Role, Project Link, Technology, Bio Paragraph, Highlight) in code, docs and commits.
- Read the ADRs in [docs/adr/](docs/adr/) before changing what they cover: Shadcn through React ([0001](docs/adr/0001-shadcn-via-react.md)) and Periods as free text ([0002](docs/adr/0002-periods-are-free-text.md)).

## Setup

Node 26 and pnpm 12, pinned in `package.json` and `.node-version`. Node 26 ships without corepack: run `nvm use 26` and `npm i -g pnpm@12.21.0`, then `pnpm install`.

pnpm 12 fails the install on any dependency build script it has not approved. Approve a new one under `allowBuilds` in `pnpm-workspace.yaml`, the home for every pnpm setting.

## Feedback loop

Run both after every change; both must pass:

- `pnpm check`: ESLint and Prettier, `astro check`, Vitest, then the build.
- `pnpm test:e2e`: builds, then runs Playwright against `astro preview` on port 4322 in both Locales: the content baseline, every Section, the theme and Locale toggles, and the 404 page.

The content baseline (`tests/e2e/content-baseline/`) records each Locale's visible text, link URLs, image alt text and Section order. A failing baseline means published content changed: fix the code. Run `pnpm baseline:update` only when the site owner has explicitly approved the content change.

Astro moves `astro dev` and `astro preview` to the background when it detects an agent. If you start preview yourself, set `ASTRO_PREVIEW_BACKGROUND=0` or stop it with `astro preview stop`; a server left on port 4322 makes the next `pnpm test:e2e` fail with "already used".

## Rules

- Every user-facing string exists in both `en` and `es`. Change both.
- Vercel Analytics (`<Analytics />` in `Layout.astro`), the static output and the Vercel adapter stay as they are unless the owner asks for a change.

## Docs

- **Content** (Projects, Roles, Achievements, Bio Paragraphs, UI strings, a new Locale): [docs/agents/content.md](docs/agents/content.md)
- **Components** (Shadcn, React islands, `.astro` structure, icons, images, rendered whitespace): [docs/agents/components.md](docs/agents/components.md)
- **Styling** (Tailwind, theme tokens, dark mode, breakpoints): [docs/agents/styling.md](docs/agents/styling.md)
- **Code style** (Prettier, ESLint, imports, naming): [docs/agents/code-style.md](docs/agents/code-style.md)
