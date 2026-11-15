import { expect, test, type Page } from '@playwright/test';

/**
 * Reads the theme a visitor sees: whether the page background is dark. The colour is
 * resolved through a canvas so any CSS colour syntax (rgb, oklch, ...) compares the same way.
 */
const backgroundIsDark = (page: Page) =>
  page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d')!;
    for (const element of [document.body, document.documentElement]) {
      const colour = getComputedStyle(element).backgroundColor;
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = colour;
      context.fillRect(0, 0, 1, 1);
      const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
      if (alpha === 0) continue;
      return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255 < 0.5;
    }
    // Nothing paints a background, so the browser's canvas shows through.
    return matchMedia('(prefers-color-scheme: dark)').matches;
  });

const expectTheme = async (page: Page, theme: 'dark' | 'light') => {
  await expect.poll(() => backgroundIsDark(page)).toBe(theme === 'dark');
};

for (const theme of ['dark', 'light'] as const) {
  test(`the ${theme} system preference applies when no theme is stored`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto('/');
    await expectTheme(page, theme);
  });
}

test('the theme choice persists across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expectTheme(page, 'light');

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expectTheme(page, 'dark');

  await page.reload();
  await expectTheme(page, 'dark');

  // The stored choice wins over the system preference.
  await page.emulateMedia({ colorScheme: 'light' });
  await page.reload();
  await expectTheme(page, 'dark');

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.reload();
  await expectTheme(page, 'light');
});
