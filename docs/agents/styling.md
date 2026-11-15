# Styling

Tailwind v4 with the Shadcn theme (zinc base colour, default radius). There is no `tailwind.config`: the theme lives in `src/styles/global.css`, imported once by `Layout.astro`.

- **Theme tokens**: colour with the Shadcn tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`), which switch with the theme. Leave raw palette classes (`gray-*`, `zinc-*`, `text-white`) out.
- **Dark mode**: the `.dark` class on `<html>`, declared with `@custom-variant dark` in `global.css`. The inline script in `Layout.astro` sets it before first paint: the stored choice wins, otherwise the system preference.
- **Breakpoints**: custom `xss` (360px) and `xs` (475px) below Tailwind's defaults. Mobile-first: base classes target the smallest screen, then `xss:`, `xs:`, `md:`, `lg:`.
- **Class composition**: combine classes with `cn()` (`@/lib/utils`; the generated `src/components/ui/` files import it from `cn` directly) in TS and around Shadcn variants, and `class:list` for conditional classes in `.astro`.
- **Utilities first**. A component-scoped `<style>` block is for what utilities cannot express.
