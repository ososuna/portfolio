# Styling

Tailwind v4. There is no `tailwind.config`; theme config lives in `src/styles/global.css`, imported once by `Layout.astro`.

- **Dark mode**: `.dark` class on `<html>`, declared via `@custom-variant dark` in `global.css`. Dark palette: `zinc-950` background, `white` text.
- **Breakpoints**: custom `xss` (360px) and `xs` (475px) below Tailwind's defaults. Mobile-first: base classes target the smallest screen, then `xss:`, `xs:`, `md:`, `lg:`.
- **Utilities first**. A component-scoped `<style>` block is for what utilities cannot express (e.g. `ThemeSelector` and `LanguageSelector` icon animations, using `:global(.dark)` for dark variants).
