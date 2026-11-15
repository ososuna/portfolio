# Use official Shadcn components through React

The UI used to imitate Shadcn by hand with Tailwind classes. We adopted the official Shadcn components, which are React, so the site now includes `@astrojs/react`. Components are rendered on the server and ship no JavaScript. Only interactive controls (theme and Locale switching) become client islands. This was chosen over a community Astro port of Shadcn, which would avoid React but depend on a third-party project tracking upstream. It was also chosen over keeping Astro components with Shadcn tokens, which would keep the imitation we wanted to remove.

## Consequences

- React is a dependency of a site that is otherwise static. Don't remove it to "simplify": it's what makes `shadcn add` work unmodified.
- A `client:*` directive is the exception, not the default. Each one ships JavaScript to every visitor.
