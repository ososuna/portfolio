export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const getLangFromUrl = (url: URL): Lang => {
  const [lang] = url.pathname.split('/').filter(Boolean);
  if (lang && lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
};
