import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The production domain: canonical URLs, hreflang links, the sitemap and social tags are built on it.
  site: 'https://www.oswaldo-osuna.com',
  output: 'static',
  adapter: vercel(),

  // Astro 7 defaults to 'jsx', which drops spaces between expressions on separate lines and changes visible text.
  compressHTML: true,

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    // The i18n option lists each page's translations in the sitemap, mirroring the hreflang links.
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } } }),
  ],
});
