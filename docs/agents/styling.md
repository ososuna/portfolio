# Styling

Tailwind v4. There is no `tailwind.config`; theme config lives in `src/styles/global.css`, imported once by `Layout.astro`.

- **Dark mode**: `.dark` class on `<html>`, declared via `@custom-variant dark` in `global.css`, set before first paint by the inline script in `Layout.astro`. Colours come from the Shadcn zinc theme tokens (`bg-background`, `text-foreground`, `text-muted-foreground`) defined in `global.css`.
- **Breakpoints**: custom `xss` (360px) and `xs` (475px) below Tailwind's defaults. Mobile-first: base classes target the smallest screen, then `xss:`, `xs:`, `md:`, `lg:`.
- **Utilities first**. A component-scoped `<style>` block is for what utilities cannot express.
