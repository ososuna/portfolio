import { expect, test } from '@playwright/test';
import { renderContentBaseline } from '@tests/e2e/support/content';

// Regenerate with `pnpm baseline:update` when a content change is intended.
const pages = [
  { locale: 'en', path: '/' },
  { locale: 'es', path: '/es/' },
];

for (const { locale, path } of pages) {
  test(`the ${locale} page matches the content baseline`, async ({ page }) => {
    await page.goto(path);
    expect(await renderContentBaseline(page)).toMatchSnapshot(`${locale}.txt`);
  });
}
