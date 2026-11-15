# Content and i18n

Hero, Roles and Achievements are content collections (`src/content.config.ts`, data in `src/content/`), read with `getLocalized(collection, locale)` from `src/lib/content.ts`; Social Links and Companies are shared by every Locale. The rest of the content is still JSON, one file per locale: `src/data/{section}/en.json` and `src/data/{section}/es.json`. Components import both and pick by `locale`. Keep the two files structurally identical (same entries, same order, same keys); only the text differs.

UI strings (nav, section titles, button labels) live in `src/data/i18n/ui.ts`, read via `useTranslations(locale)`. Add every key to both `en` and `es`; missing `es` keys silently fall back to English.

Pages: `src/pages/index.astro` (en, unprefixed) and `src/pages/es/index.astro`. Both render the same five sections, each receiving `lang`. A section change lands in both pages.

## Recipes

- **Project**: add the entry to both `src/data/projects/{en,es}.json`. A new tag key needs an entry in the `tags` object in `src/components/ProjectsSection.astro` and an icon in `src/icons/`.
- **Experience**: add the Role to `roles` in both `src/content/roles/{en,es}.json` (newest first). `company` is an id from `src/content/companies.json`; a new Company needs an entry there and its logo registered in `src/icons/names.ts` and `src/icons/index.ts`. An unknown id fails the build.
- **Achievement**: add the entry to `achievements` in both `src/content/achievements/{en,es}.json`; its image goes in `src/assets/img/achievements/` and `image` is a path relative to the JSON file. A missing image fails the build.
- **Image referenced from JSON**: the filename must match the component's glob; a mismatch fails the build (see [components.md](components.md#images)).
