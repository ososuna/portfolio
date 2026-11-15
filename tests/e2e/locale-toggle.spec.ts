import { expect, test } from '@playwright/test';

const toggles = [
  { from: '/', label: 'Switch language', to: '/es/', locale: 'es' },
  { from: '/es/', label: 'Cambiar idioma', to: '/', locale: 'en' },
  { from: '/#projects', label: 'Switch language', to: '/es/#projects', locale: 'es' },
  { from: '/es/#about-me', label: 'Cambiar idioma', to: '/#about-me', locale: 'en' },
];

for (const { from, label, to, locale } of toggles) {
  test(`the Locale toggle on ${from} lands on ${to}`, async ({ page, baseURL }) => {
    await page.goto(from);
    await page.getByRole('button', { name: label }).click();

    await expect(page).toHaveURL(`${baseURL}${to}`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
  });
}
