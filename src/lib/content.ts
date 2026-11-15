import { getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Locale } from '@data/i18n/locales';

type LocalizedCollection = 'hero' | 'roles' | 'achievements' | 'projects' | 'about';

/** The entry of a per-Locale collection for one Locale. A missing Locale fails the build. */
export const getLocalized = async <C extends LocalizedCollection>({
  collection,
  locale,
}: {
  collection: C;
  locale: Locale;
}): Promise<CollectionEntry<C>['data']> => {
  const entry = await getEntry(collection, locale);
  if (!entry) throw new Error(`Collection "${collection}" has no entry for Locale "${locale}"`);
  return entry.data;
};

/**
 * The data of each referenced entry, in order. An unknown id fails the build: Astro only
 * logs an invalid `reference()` during content sync and still exits 0.
 */
export const getReferenced = async <C extends CollectionKey>(
  refs: { collection: C; id: string }[],
): Promise<CollectionEntry<C>['data'][]> =>
  Promise.all(
    refs.map(async ({ collection, id }) => {
      const entry = await getEntry(collection, id);
      if (!entry) throw new Error(`Collection "${collection}" has no entry with id "${id}"`);
      return entry.data;
    }),
  );

export type Achievement = CollectionEntry<'achievements'>['data']['achievements'][number];
