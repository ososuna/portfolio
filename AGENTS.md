# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Dev Commands

Package manager: **pnpm** (pinned via `packageManager` field in package.json).

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at localhost:4321
pnpm build         # Build for production (outputs to ./dist/)
pnpm preview       # Preview the production build locally
```

**There are no tests, linters, or formatters configured.** No ESLint, Prettier,
editorconfig, vitest, or jest. The only validation is `pnpm build` — run it to
catch TypeScript errors and broken imports. Always run `pnpm build` after making
changes to verify nothing is broken.

## Architecture

Single-page static Astro portfolio site deployed on Vercel. No SSR, no API
endpoints, no client-side framework at runtime. The only client JS is an inline
theme toggle script.

- **One page**: `src/pages/index.astro` renders five sections in order:
  `MainSection` → `ProfessionalExperience` → `ProjectsSection` →
  `AchievementsSection` → `AboutMeSection`, wrapped in `Layout.astro`.
- **Data-driven content**: All portfolio content is in JSON files under
  `src/data/`, imported at build time. Edit JSON to update content.
- **Static output**: `astro.config.mjs` sets `output: 'static'` with the
  Vercel adapter and web analytics enabled.

## Project Structure

```
src/
  assets/img/          # Optimized images (projects/, achievements/, personal)
  components/          # Astro components (sections, cards, buttons, nav)
  data/                # JSON content files (experience, projects, achievements)
  icons/               # SVG icon components ({Name}Icon.astro)
  layouts/Layout.astro # HTML shell, global styles, Navbar
  pages/index.astro    # Single page composing all sections
  env.d.ts             # Astro type references
```

## Path Aliases

Always use path aliases for imports. Never use relative paths (`./` or `../`).

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@icons/*` | `src/icons/*` |
| `@data/*` | `src/data/*` |
| `@assets/*` | `src/assets/*` |
| `@img/*` | `src/assets/img/*` |

## Code Style

### File & Variable Naming

- **Components**: PascalCase `.astro` files — `MainSection.astro`, `ProjectLinkButton.astro`
- **Icons**: `{Name}Icon.astro` — `ReactIcon.astro`, `GitHubIcon.astro`
- **Data files**: lowercase directory matching the JSON filename — `data/projects/projects.json`
- **Variables/functions**: camelCase — `projectsData`, `handleToggleClick`, `menuOptions`
- **CSS classes**: Tailwind utility classes only. Avoid custom class names.

### Imports

- Use path aliases exclusively (`@components/`, `@icons/`, `@data/`, `@img/`, `@layouts/`).
- Framework imports first (e.g., `astro:assets`), then data, then components, then icons.
- Import icons individually — there is no barrel/index file.

### TypeScript

- tsconfig extends `astro/tsconfigs/strict` — strict mode is active.
- Define `interface Props` in the frontmatter for components that accept props:
  ```astro
  ---
  interface Props {
    title: string;
    link?: string;
  }
  const { title, link } = Astro.props;
  ---
  ```
- Use `?` for optional props. Avoid `any` types where possible.
- All logic lives in `.astro` frontmatter — no separate `.ts` files exist.

### Component Structure

Astro components follow this order:

1. `---` frontmatter (imports, interface, logic)
2. HTML template
3. Optional `<style>` block (only when Tailwind classes aren't sufficient)
4. Optional `<script is:inline>` block (only for client-side interactivity)

Props are always destructured from `Astro.props` in the frontmatter.

### Formatting

No formatter is enforced. Follow these dominant patterns:

- **Indentation**: 2 spaces for `.astro` component files and JSON data files.
- **Semicolons**: Always use them in frontmatter code.
- **Quotes**: Single quotes for JS/TS imports, double quotes for HTML attributes.
- **Trailing commas**: Include them in multi-line objects and arrays.
- **Line length**: No hard limit, but Tailwind class strings naturally run long.

### Tailwind & Styling

- **All styling via Tailwind utility classes** — no external CSS files.
- **Dark mode**: `class` strategy. Toggle `dark` class on `<html>`. Use `dark:`
  prefix for dark variants. Dark palette: `zinc-950` background, `white` text.
- **Custom breakpoints** (below Tailwind defaults):
  - `xss:` → 360px
  - `xs:` → 475px
- **Responsive approach**: Mobile-first. Base styles target smallest screens,
  then `xss:`, `xs:`, `md:`, `lg:` for progressively larger viewports.
- Global styles (font-face, scroll behavior) live only in `Layout.astro`
  via `<style is:global>`.

### Icon Components

Icons are pure SVG `.astro` files with no frontmatter:

```astro
<svg {...Astro.props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- SVG paths -->
</svg>
```

Always spread `{...Astro.props}` on the root `<svg>` so parents can pass
`class`, `width`, `height`, etc.

### Image Handling

Two patterns depending on context:

1. **Static import** (known single images):
   ```astro
   import meImage from '@img/oswaldo-osuna-01.jpeg';
   <Image src={meImage} alt="..." class="..." />
   ```

2. **Dynamic glob** (images referenced from JSON data):
   ```astro
   const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/projects/*.png');
   if (!images[image]) throw new Error(`"${image}" does not exist in glob`);
   <Image src={images[image]()} alt={title} width="1920" height="1080" />
   ```

Always use Astro's `<Image>` component from `astro:assets` for optimization.
Content images go in `src/assets/img/` (not `public/`).

### Error Handling

This is a static site — errors surface at build time, not runtime. The only
error handling pattern is build-time validation for dynamic image imports:

```typescript
if (!images[image]) throw new Error(`"${image}" does not exist in glob: "..."`);
```

There are no try/catch blocks, error boundaries, or error pages.

### Conditional Rendering & Iteration

- **Conditional**: Use `&&` for "show if truthy", ternary for if/else:
  ```astro
  { link && ( <a href={link}>...</a> ) }
  { link ? <a><Image .../></a> : <Image .../> }
  ```
- **Iteration**: Use `.map()` with parenthesized return values:
  ```astro
  { items.map((item) => ( <Component {...item} /> )) }
  ```

## Adding Content

- **New project**: Add entry to `src/data/projects/projects.json`. If using a
  new tag key, add it to the `tags` object in `ProjectsSection.astro` and create
  a matching icon in `src/icons/`.
- **New experience**: Add entry to `src/data/experience/experience.json`. If the
  company is new, add a conditional icon render in `TimelineItem.astro`.
- **New achievement**: Add entry to `src/data/achievements/achievements.json`.
- **New icon**: Create `{Name}Icon.astro` in `src/icons/` following the SVG-only
  pattern with `{...Astro.props}` spread.

## CI/CD

- **Deployment**: Static build on Vercel via `@astrojs/vercel` adapter.
- **GitHub Actions**: Two workflows in `.github/workflows/`:
  - `claude.yml` — Claude Code bot triggered by `@claude` mentions in issues/PRs.
  - `claude-code-review.yml` — Automated Claude Code review on every PR.
