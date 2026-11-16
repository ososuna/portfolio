# Content and i18n

## Collections

All content is in Astro content collections: schemas in `src/content.config.ts`, data in `src/content/`. A schema violation, an unknown id or a missing image fails the build.

- **Per Locale**: Hero, Roles, Projects, Achievements and About hold one file per Locale (`en.json`, `es.json`), each with an ordered list, read with `getLocalized({ collection, locale })` from `@lib/content`. Keep both Locale files structurally identical (same entries, same order, same keys); only the text differs. Entries render in data order.
- **Shared by every Locale**: Social Links, Companies and Technologies, one `file()` collection each (`src/content/{social-links,companies,technologies}.json`).
- **References**: a Role's `company` and a Project's `technologies` are ids into the shared collections. Resolve each one with `getReferenced(ref)` from `@lib/content`: Astro only logs an unknown `reference()` id and still exits 0, while `getReferenced` throws.
- **Icons**: `icon` and `logo` fields are names from `src/icons/names.ts`, rendered through the registry in `src/icons/index.ts`. A new name goes in both files.
- **Images**: `image()` fields hold a path relative to the JSON file, pointing into `src/assets/img/`.

## UI strings

Strings that are not content (nav, Section headings, control labels, Project Link labels, the 404 page) live in `src/data/i18n/ui.ts`, read with `useTranslations(locale)`, which returns `t`: pass the string's `section.key` path, as in `t('nav.home')`. Add every key to both `en` and `es`; a key missing from one Locale fails `pnpm typecheck`. The 404 page is published in the Default Locale only; its `es` strings keep the two Locales' keys identical.

## Pages

`src/pages/index.astro` (Default Locale, unprefixed) and `src/pages/es/index.astro` render the same five Sections, each receiving `locale`. A Section change lands in both pages. A new Locale needs an entry in `src/data/i18n/locales.ts` and `astro.config.mjs` `i18n.locales`, a file in every per-Locale collection, its UI strings and a page. The Navbar links, `LocaleToggle.tsx` and the Locale detection script in `Layout.astro` assume exactly `en` and `es`, and with a third Locale the toggle has to become a menu.

## Recipes

- **Project**: an entry in `projects` in both `src/content/projects/{en,es}.json`. `technologies` are Technology ids; a new Technology needs an entry in `technologies.json` and its icon registered. `links` are Project Links `{ kind, url }`, kind `live` or `source` (`src/lib/project-links.ts`), rendered in data order with labels from the `project` UI strings, keyed by kind; the `live` link also wraps the image. The image goes in `src/assets/img/projects/`.
- **Role**: an entry in `roles` in both `src/content/roles/{en,es}.json`, newest first. `company` is a Company id; a new Company needs an entry in `companies.json` and its logo registered. `period` is free text per Locale (ADR-0002).
- **Achievement**: an entry in `achievements` in both `src/content/achievements/{en,es}.json`; its image goes in `src/assets/img/achievements/`.
- **Bio Paragraph**: one string in `paragraphs` in both `src/content/about/{en,es}.json`, each Highlight wrapped in `**...**` (parsed by `src/lib/highlights.ts`). An unclosed `**` renders as literal text. The third English Bio Paragraph's "aerospace industry , building" is published as is; keep the space before the comma.
