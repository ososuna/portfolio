/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Vitest covers the Highlight parser only (spec Seam 2); the built site is covered by Playwright.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
