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
  },
} as const;

type TranslationMap = (typeof ui)[typeof defaultLocale];
type SectionKey = keyof TranslationMap;
type TranslationKey<T extends SectionKey> = keyof TranslationMap[T];

export const useTranslations = (locale: Locale) => {
  return <T extends SectionKey>(section: T, key: TranslationKey<T>) => {
    const selected = ui[locale][section][key];
    const fallback = ui[defaultLocale][section][key];
    return selected ?? fallback;
  };
};
