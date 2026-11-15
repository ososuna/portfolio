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
 * The data of a referenced entry. Resolve every `reference()` through this, not `getEntry`:
 * Astro 7.4 only logs an unknown `reference()` id and still exits 0, so this throw is what
 * fails the build.
 */
export const getReferenced = async <C extends CollectionKey>({
  collection,
  id,
}: {
  collection: C;
  id: string;
}): Promise<CollectionEntry<C>['data']> => {
  const entry = await getEntry(collection, id);
  if (!entry) throw new Error(`Collection "${collection}" has no entry with id "${id}"`);
  return entry.data;
};

export type Role = CollectionEntry<'roles'>['data']['roles'][number];
export type Project = CollectionEntry<'projects'>['data']['projects'][number];
export type Achievement = CollectionEntry<'achievements'>['data']['achievements'][number];
