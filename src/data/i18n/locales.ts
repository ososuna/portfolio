export const locales = {
  en: 'English',
  es: 'Español',
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';
