# Content and i18n

Content is JSON, one file per locale: `src/data/{section}/en.json` and `src/data/{section}/es.json`. Components import both and pick by `lang`. Keep the two files structurally identical (same entries, same order, same keys); only the text differs.

UI strings (nav, section titles, button labels) live in `src/data/i18n/ui.ts`, read via `useTranslations(lang)`. Add every key to both `en` and `es`; missing `es` keys silently fall back to English.

Pages: `src/pages/index.astro` (en, unprefixed) and `src/pages/es/index.astro`. Both render the same five sections, each receiving `lang`. A section change lands in both pages.

## Recipes

- **Project**: add the entry to both `src/data/projects/{en,es}.json`. A new tag key needs an entry in the `tags` object in `src/components/ProjectsSection.astro` and an icon in `src/icons/`.
- **Experience**: add the entry to both `src/data/experience/{en,es}.json`. A new company needs a `{ company === '...' && (<XIcon />) }` line in `src/components/TimelineItem.astro`; `company` must match exactly.
- **Achievement**: add the entry to both `src/data/achievements/{en,es}.json`; its image goes in `src/assets/img/achievements/`.
- **Image referenced from JSON**: the filename must match the component's glob; a mismatch fails the build (see [components.md](components.md#images)).
