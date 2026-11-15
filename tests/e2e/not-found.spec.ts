import { expect, test } from '@playwright/test';

test('the 404 page renders and links home', async ({ page, baseURL }) => {
  const response = await page.goto('/this-page-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('404 - Page Not Found');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'The page you are looking for does not exist.',
  );
  await expect(page.locator('main')).toHaveText(
    '404 ERROR Page not found The page you are trying to reach does not exist or has been moved. Return to home page',
    { useInnerText: true },
  );
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();

  await page.getByRole('link', { name: 'Return to home page' }).click();
  await expect(page).toHaveURL(`${baseURL}/`);
  await expect(page.getByRole('heading', { name: 'Oswaldo Osuna' })).toBeVisible();
});
