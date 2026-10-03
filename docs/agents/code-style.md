# Code style

## Imports

Import through the `tsconfig.json` path aliases (`@components/`, `@layouts/`, `@icons/`, `@data/`, `@assets/`, `@img/`, `@styles/`), never relative paths.

Order: framework (`astro:assets`, `@vercel/analytics`), then data and i18n, then components, then icons.

## Naming

- Components: PascalCase `.astro` (`ProjectLinkButton.astro`).
- Icons: `{Name}Icon.astro`.
- Variables and functions: camelCase.

## Formatting

No formatter runs. Match these: 2-space indent, semicolons in frontmatter, single quotes in JS/TS, double quotes in HTML attributes, trailing commas in multi-line literals.
