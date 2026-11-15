# Code style

## Formatting and linting

Prettier formats everything (`pnpm format` writes, `pnpm lint` checks); its config is `prettier.config.mjs`, with the Astro and Tailwind class sorting plugins. Classes inside `cn()` and `cva()` are sorted too. Run `pnpm format` rather than matching the style by hand.

ESLint uses the flat config in `eslint.config.mjs`: recommended JS, typescript-eslint and Astro rules, with `eslint-config-prettier` last. `no-undef` is off for `.ts`, `.tsx` and `.astro`, since TypeScript reports undefined names.

## Imports

Import through the `tsconfig.json` path aliases, never relative paths:

- `@/` for Shadcn code and what it generates: `@/components/ui/*`, `@/lib/utils`, `@/hooks/*`. It matches the aliases in `components.json`, so `shadcn add` output works unchanged.
- `cn` comes from `@/lib/utils`, except in `src/components/ui/`: the Shadcn CLI (4.23) writes those files importing it straight from the `cn` package, which `@/lib/utils` re-exports. Leave the CLI's import as is, so re-adding a component gives no import diff.
- The named aliases for everything else: `@components/`, `@layouts/`, `@icons/`, `@data/`, `@lib/`, `@assets/`, `@img/`, `@styles/`, and `@tests/` for the Playwright support code.

## Naming

- Use the GLOSSARY.md terms in names (`Hero`, `locale`, `period`, `ProjectLink`).
- `.astro` components and React components: PascalCase (`SectionContainer.astro`, `ThemeToggle.tsx`).
- Shadcn components and hooks: kebab-case files as the CLI writes them (`button.tsx`, `use-hydrated.ts`).
- Icons: `{Name}Icon.astro`.
- Variables and functions: camelCase.
