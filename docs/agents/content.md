# Content and i18n

All content is in content collections (`src/content.config.ts`, data in `src/content/`). Hero, Roles, Projects, Achievements and About hold one file per Locale (`en.json`, `es.json`), read with `getLocalized(collection, locale)` from `src/lib/content.ts`; Social Links, Companies and Technologies are shared by every Locale. Keep the two Locale files structurally identical (same entries, same order, same keys); only the text differs.

UI strings (nav, section titles, button labels) live in `src/data/i18n/ui.ts`, read via `useTranslations(locale)`. Add every key to both `en` and `es`; missing `es` keys silently fall back to English.

Pages: `src/pages/index.astro` (en, unprefixed) and `src/pages/es/index.astro`. Both render the same five sections, each receiving `lang`. A section change lands in both pages.

## Recipes

- **Project**: add the entry to `projects` in both `src/content/projects/{en,es}.json`. `technologies` are ids from `src/content/technologies.json` (resolved with `getReferenced`, so an unknown id fails the build); a new Technology needs an entry there and its icon registered in `src/icons/names.ts` and `src/icons/index.ts`. `links` are Project Links `{ kind, url }` with kind `live`, `source`, `ui-source` or `api-source`, rendered in data order with labels from the `project` UI strings; the `live` link also wraps the image. The image goes in `src/assets/img/projects/`; a missing image fails the build.
- **Bio Paragraph**: one string in `paragraphs` in both `src/content/about/{en,es}.json`, with each Highlight wrapped in `**...**` (parsed by `src/lib/highlights.ts`). An unclosed `**` renders as literal text.
- **Experience**: add the Role to `roles` in both `src/content/roles/{en,es}.json` (newest first). `company` is an id from `src/content/companies.json`; a new Company needs an entry there and its logo registered in `src/icons/names.ts` and `src/icons/index.ts`. An unknown id fails the build.
- **Achievement**: add the entry to `achievements` in both `src/content/achievements/{en,es}.json`; its image goes in `src/assets/img/achievements/` and `image` is a path relative to the JSON file. A missing image fails the build.
- **Image referenced from JSON**: a path relative to the JSON file; a missing file fails the build (see [components.md](components.md#images)).
