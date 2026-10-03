# AGENTS.md

Static, bilingual (en/es) Astro portfolio deployed on Vercel. All content is JSON under `src/data/`.

- Package manager: **pnpm**.
- No tests, linter, or formatter exist. `pnpm build` is the only check (type errors, broken imports, missing images); run it after every change.
- Every user-facing string exists in both `en` and `es`. Change both.

## Docs

- **Content** (projects, experience, achievements, about, UI strings, new locale): [docs/agents/content.md](docs/agents/content.md)
- **Components** (`.astro` structure, props, icons, images): [docs/agents/components.md](docs/agents/components.md)
- **Styling** (Tailwind, dark mode, breakpoints): [docs/agents/styling.md](docs/agents/styling.md)
- **Code style** (imports, naming, formatting): [docs/agents/code-style.md](docs/agents/code-style.md)
