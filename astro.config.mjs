import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
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

  integrations: [react()],
});
