import { defaultLang, type Lang } from '@data/i18n/utils';

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
      switchLanguage: 'Switch language',
    },
    project: {
      sourceCode: 'Source code',
      ui: 'UI',
      restApi: 'Rest API',
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
      switchLanguage: 'Cambiar idioma',
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

type TranslationMap = typeof ui[typeof defaultLang];
type SectionKey = keyof TranslationMap;
type TranslationKey<T extends SectionKey> = keyof TranslationMap[T];

export const useTranslations = (lang: Lang) => {
  return <T extends SectionKey>(section: T, key: TranslationKey<T>) => {
    const selectedLang = ui[lang][section][key];
    const fallbackLang = ui[defaultLang][section][key];
    return selectedLang ?? fallbackLang;
  };
};
