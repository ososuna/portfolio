import { defaultLocale, type Locale } from '@data/i18n/locales';

export const ui = {
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      projects: 'Projects',
      achievements: 'Achievements',
      about: 'About Me',
    },
    sections: {
      experience: 'Professional Experience',
      projects: 'Projects',
      achievements: 'Achievements',
      about: 'About Me',
    },
    controls: {
      toggleTheme: 'Toggle theme',
      switchLocale: 'Switch language',
    },
    project: {
      sourceCode: 'Source code',
      ui: 'UI',
      restApi: 'REST API',
      goToProject: 'Go to project',
    },
    achievement: {
      learnMore: 'Learn more about this topic',
    },
    notFound: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
      eyebrow: '404 ERROR',
      heading: 'Page not found',
      message: 'The page you are trying to reach does not exist or has been moved.',
      home: 'Return to home page',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      projects: 'Proyectos',
      achievements: 'Logros',
      about: 'Sobre mí',
    },
    sections: {
      experience: 'Experiencia profesional',
      projects: 'Proyectos',
      achievements: 'Logros',
      about: 'Sobre mí',
    },
    controls: {
      toggleTheme: 'Cambiar tema',
      switchLocale: 'Cambiar idioma',
    },
    project: {
      sourceCode: 'Código fuente',
      ui: 'UI',
      restApi: 'API REST',
      goToProject: 'Ir al proyecto',
    },
    achievement: {
      learnMore: 'Conoce más sobre este tema',
    },
    notFound: {
      title: '404 - Página no encontrada',
      description: 'La página que buscas no existe.',
      eyebrow: 'ERROR 404',
      heading: 'Página no encontrada',
      message: 'La página que intentas abrir no existe o se ha movido.',
      home: 'Volver a la página de inicio',
    },
  },
} as const;

type TranslationMap = (typeof ui)[typeof defaultLocale];
type SectionKey = keyof TranslationMap;
type Translations = { [S in SectionKey]: Record<keyof TranslationMap[S], string> };

// Fails to compile when a Locale is missing a key the Default Locale has.
const translations: Record<Locale, Translations> = ui;

/** A UI string's path, `section.key` (for example `nav.home`). */
export type TranslationKey = {
  [S in SectionKey]: `${S}.${keyof TranslationMap[S] & string}`;
}[SectionKey];

export const useTranslations = (locale: Locale) => {
  return (path: TranslationKey): string => {
    const [section, key] = path.split('.') as [SectionKey, string];
    return (translations[locale][section] as Record<string, string>)[key]!;
  };
};
