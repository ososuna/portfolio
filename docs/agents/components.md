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

Section components take `lang: Lang` (from `@data/i18n/utils`) and pass it down to children that render text.

Client JS is `<script is:inline>` only (theme toggle, language detection in `Layout.astro`). There is no client framework.

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

- Known single image: static import (`import me from '@img/oswaldo-osuna-01.jpeg'`).
- Image named in JSON: `import.meta.glob` plus a build-time guard. This guard is the codebase's only error handling; keep it on every glob:

```astro
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/projects/*.png');
if (!images[image]) throw new Error(`"${image}" does not exist in glob: "/src/assets/img/projects/*.png"`);
<Image src={images[image]()} alt={title} width="1920" height="1080" />
```
