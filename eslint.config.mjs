import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores([
    'dist/',
    '.vercel/',
    '.astro/',
    'node_modules/',
    'playwright-report/',
    'test-results/',
    '.claude/',
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  { languageOptions: { globals: { ...globals.node } } },
  {
    // TypeScript already reports undefined names, and knows Astro's ambient types (ImageMetadata).
    files: ['**/*.ts', '**/*.tsx', '**/*.astro'],
    rules: { 'no-undef': 'off' },
  },
  {
    // Ambient declaration files reference types this way by design.
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
  // Last, so stylistic rules that clash with Prettier stay off.
  prettier,
]);
