/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 100,
  // prettier-plugin-tailwindcss must come last. prettier-plugin-astro stays on 0.14: its 1.x AST is
  // not yet understood by the released prettier-plugin-tailwindcss (0.8.1), so classes go unsorted.
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  // Tailwind v4 reads the theme and custom breakpoints (xss, xs) from the CSS entry point.
  tailwindStylesheet: './src/styles/global.css',
  // Sort classes passed to the Shadcn helpers, not only class attributes.
  tailwindFunctions: ['cn', 'cva'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
