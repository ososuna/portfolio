import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { iconNames } from '@icons/names';
import { projectLinkKinds } from '@lib/project-links';

// Localized collections hold one entry per Locale (`en.json`, `es.json`), each with an
// ordered list, so entries keep their data order. Read them with `getLocalized`.
const perLocale = (base: string) => glob({ pattern: '*.json', base });

const hero = defineCollection({
  loader: perLocale('./src/content/hero'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image(),
      photoAlt: z.string(),
      summary: z.object({ lineOne: z.string(), lineTwo: z.string() }),
    }),
});

const socialLinks = defineCollection({
  loader: file('src/content/social-links.json'),
  schema: z.object({
    name: z.string(),
    url: z.url(),
    icon: z.enum(iconNames),
  }),
});

const companies = defineCollection({
  loader: file('src/content/companies.json'),
  schema: z.object({
    name: z.string(),
    logo: z.enum(iconNames),
  }),
});

const roles = defineCollection({
  loader: perLocale('./src/content/roles'),
  schema: z.object({
    roles: z.array(
      z.object({
        title: z.string(),
        company: reference('companies'),
        // Free text per Locale, see docs/adr/0002-periods-are-free-text.md.
        period: z.string(),
        bulletPoints: z.array(z.string()),
      }),
    ),
  }),
});

const achievements = defineCollection({
  loader: perLocale('./src/content/achievements'),
  schema: ({ image }) =>
    z.object({
      achievements: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: image(),
          link: z.url().optional(),
        }),
      ),
    }),
});

const technologies = defineCollection({
  loader: file('src/content/technologies.json'),
  schema: z.object({
    name: z.string(),
    icon: z.enum(iconNames),
  }),
});

const projects = defineCollection({
  loader: perLocale('./src/content/projects'),
  schema: ({ image }) =>
    z.object({
      projects: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          image: image(),
          // Resolve with `getReferenced`: an unknown id only fails the build when resolved.
          technologies: z.array(reference('technologies')),
          // Rendered in data order; labels come from the `project` UI strings.
          links: z.array(z.object({ kind: z.enum(projectLinkKinds), url: z.url() })),
        }),
      ),
    }),
});

const about = defineCollection({
  loader: perLocale('./src/content/about'),
  schema: ({ image }) =>
    z.object({
      photo: image(),
      photoAlt: z.string(),
      // Each Bio Paragraph marks its Highlights with `**...**`, see `src/lib/highlights.ts`.
      paragraphs: z.array(z.string()),
    }),
});

export const collections = {
  hero,
  socialLinks,
  companies,
  roles,
  achievements,
  technologies,
  projects,
  about,
};
