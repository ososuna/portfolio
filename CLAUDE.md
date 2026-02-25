# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm** as the package manager.

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at localhost:4321
pnpm build         # Build for production (outputs to ./dist/)
pnpm preview       # Preview the production build locally
```

## Architecture

Single-page Astro portfolio site deployed as a static site on Vercel. There are no server-side routes or API endpoints — everything is static.

**Page composition** (`src/pages/index.astro`): One page that renders five sections in order — `MainSection`, `ProfessionalExperience`, `ProjectsSection`, `AchievementsSection`, `AboutMeSection` — wrapped in `Layout.astro`.

**Data layer** (`src/data/`): All portfolio content lives in JSON files imported directly into Astro components at build time:
- `experience/experience.json` — work history rendered by `Timeline.astro` via `TimelineItem.astro`
- `projects/projects.json` — projects with tag keys (e.g. `"astro"`, `"react"`) that map to icon components and CSS classes defined in `ProjectsSection.astro`
- `achievements/achievements.json` — certifications/achievements rendered by `AchievementsSection.astro`

To update portfolio content, edit the JSON files. To add a new project tag, add the tag key to the `tags` object in `src/components/ProjectsSection.astro` and create the corresponding icon in `src/icons/`.

**Icons** (`src/icons/`): Each technology/brand has its own `.astro` icon component. Icons are imported individually in components that need them.

## Path Aliases

Defined in `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@icons/*` | `src/icons/*` |
| `@data/*` | `src/data/*` |
| `@assets/*` | `src/assets/*` |
| `@img/*` | `src/assets/img/*` |

## Tailwind Configuration

Dark mode uses the `class` strategy. Two custom breakpoints are defined below Tailwind's defaults:
- `xss`: 360px
- `xs`: 475px

The `xss:` and `xs:` prefixes appear throughout components for fine-grained responsive control at small screen sizes.
