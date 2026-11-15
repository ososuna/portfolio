import { expect, test } from '@playwright/test';

test('the 404 page renders and links home', async ({ page, baseURL }) => {
  const response = await page.goto('/this-page-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();

  await page.getByRole('link', { name: 'Return to home page' }).click();
  await expect(page).toHaveURL(`${baseURL}/`);
  await expect(page.getByRole('heading', { name: 'Oswaldo Osuna' })).toBeVisible();
});
