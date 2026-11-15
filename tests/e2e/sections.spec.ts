import { expect, test } from '@playwright/test';

// Each Section is identified by its heading, in page order: Hero, Experience, Projects,
// Achievements, About.
const pages = [
  {
    locale: 'en',
    path: '/',
    headings: ['Oswaldo Osuna', 'Professional Experience', 'Projects', 'Achievements', 'About Me'],
  },
  {
    locale: 'es',
    path: '/es/',
    headings: ['Oswaldo Osuna', 'Experiencia profesional', 'Proyectos', 'Logros', 'Sobre mí'],
  },
];

for (const { locale, path, headings } of pages) {
  test(`every Section renders on the ${locale} page`, async ({ page }) => {
    await page.goto(path);
    const sections = page.locator('main section').filter({ has: page.getByRole('heading') });

    await expect(sections).toHaveCount(headings.length);
    for (const [index, heading] of headings.entries()) {
      const section = sections.nth(index);
      await expect(section).toBeVisible();
      await expect(section.getByRole('heading').first()).toHaveText(heading);
    }
  });
}
