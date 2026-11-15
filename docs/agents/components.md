# Components

## Structure

Order inside an `.astro` file: frontmatter (imports, `interface Props`, logic), template, optional `<style>`, optional `<script is:inline>`.

Components that take props declare `interface Props` and destructure from `Astro.props`:

```astro
---
interface Props {
  title: string;
  link?: string;
}
const { title, link } = Astro.props;
---
```

Section components take `locale: Locale` (from `@data/i18n/locales`) and pass it down to children that render text.

Shadcn components (React, `src/components/ui/`) render on the server and ship no JS. The only client islands are `ThemeToggle` and `LocaleToggle` (`client:load`, ADR-0001). The theme and Locale detection scripts are `<script is:inline>` in `Layout.astro`. Style links as buttons with `cn(buttonVariants(...))` on a plain `<a>`, since `<Button asChild>` does not work from `.astro`.

## Icons

`src/icons/{Name}Icon.astro`: bare SVG, no frontmatter, with `{...Astro.props}` spread on the root so parents can pass `class`, `width`, `height`:

```astro
<svg {...Astro.props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- paths -->
</svg>
```

No barrel file; import each icon by path.

## Images

Use `<Image>` from `astro:assets`. Content images live in `src/assets/img/`, never `public/`.

Content images are `image()` fields in the collection schema: the JSON holds a path relative to the JSON file, a missing file fails the build, and the component passes the resulting `ImageMetadata` straight to `<Image src>`.
