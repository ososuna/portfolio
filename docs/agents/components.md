# Components

## Shadcn and React islands

The UI is official Shadcn components (React) in `src/components/ui/`, rendered on the server with no JavaScript (ADR-0001). Add one with `pnpm dlx shadcn@latest add <name>`, then run `pnpm format`: the CLI writes its own formatting, so re-adding an existing component also shows a formatting diff.

Client islands are the exception, since each `client:*` directive ships JavaScript to every visitor. The only two are `ThemeToggle` and `LocaleToggle` (`client:load` in `Navbar.astro`, labels passed as props). Both render `disabled` until `useHydrated()` reports hydration, so an early click is never lost. The theme and Locale detection scripts stay `<script is:inline>` in `Layout.astro`, so they run before first paint.

Composing Shadcn from `.astro`:

- Style links and other plain elements with the variant functions: `cn(buttonVariants({ variant: 'outline' }), extra)` on an `<a>`, `cn(badgeVariants({ variant: 'outline' }))` on a `<span>`. Always wrap them in `cn`: only `cn` drops the conflicting `border-transparent`, so a bare `buttonVariants()` outline has no border. `<Button asChild>` does not work from `.astro`.
- Write a composition that nests Shadcn components (a Card with its image) as a whole `.tsx` component, as `Achievement.tsx` does. `.astro` children passed into a React component arrive wrapped in `<astro-static-slot>`, which breaks Shadcn's child selectors.
- React cannot use Astro's `<Image>`: build the optimized image with `getImage` in the `.astro` parent and pass the result, as `Achievement.tsx` does (`<img src={image.src} {...image.attributes} />`).
- `CardTitle` is a `div`: give it `role="heading"` and `aria-level` so Sections keep their heading outline.

## `.astro` structure

Order: frontmatter (imports, `interface Props`, logic), template, optional `<style>`, optional `<script is:inline>`. Components that take props declare `interface Props` and destructure `Astro.props`. Section components take `locale: Locale` (from `@data/i18n/locales`) and pass it to children that render text. They render inside `SectionContainer`, passing the Section heading as its `heading` prop.

## Icons

`src/icons/{Name}Icon.astro` is a bare SVG with `{...Astro.props}` spread on the root, so parents pass `class`, `width` and `height`:

```astro
<svg {...Astro.props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- paths -->
</svg>
```

- Content refers to icons by name: register a new one in `src/icons/names.ts` and `src/icons/index.ts`.
- Prefix every SVG `id` with the icon's name (`mongodb-a`). Every icon is inlined into the same page, so a short id like `a` collides and blanks another icon.
- Use `currentColor` for single-colour marks, so they stay visible on light and dark backgrounds.
- Interface icons inside React components come from `lucide-react`.

## Images

Use `<Image>` from `astro:assets`, fed the `ImageMetadata` from an `image()` collection field. Content images live in `src/assets/img/`, never `public/`.

## Rendered whitespace

The content baseline catches any change in visible text, including a space gained or lost.

- `astro.config.mjs` keeps `compressHTML: true`. Astro 7's default (`'jsx'`) drops the space between expressions on separate lines.
- Prettier prints markup inside `{...}` expressions as JSX and can split text onto new lines, adding spaces. Render text that sits against markup with `set:text` (`<span set:text={text} />`, `<Fragment set:text={text} />`), as the About Section does for Highlights.
