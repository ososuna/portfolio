import { expect, test, type Locator } from '@playwright/test';

// Common phone and tablet widths, plus the edges of the `xss` (360px), `xs` (475px) and `sm`
// (640px) breakpoints, where the Navbar changes its layout.
const viewportWidths = [320, 359, 360, 375, 390, 393, 414, 430, 474, 475, 639, 640, 768, 1024];
// Below `sm` the Section links collapse into the menu.
const menuBreakpoint = 640;

const pages = [
  {
    path: '/',
    menu: 'Section menu',
    sectionLinks: ['experience', 'projects', 'achievements', 'about me'],
  },
  {
    path: '/es/',
    menu: 'Menú de secciones',
    sectionLinks: ['experiencia', 'proyectos', 'logros', 'sobre mí'],
  },
];

const expectInsideScreen = async (control: Locator, width: number) => {
  const box = await control.boundingBox();
  const name = (await control.getAttribute('aria-label')) ?? (await control.innerText());
  expect(box, `${name} has a box`).not.toBeNull();
  expect(box!.x, `${name} starts inside the screen`).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width, `${name} ends inside the screen`).toBeLessThanOrEqual(width);
};

for (const { path, menu, sectionLinks } of pages) {
  for (const width of viewportWidths) {
    test(`every Navbar control fits a ${width}px wide screen on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);

      const header = page.getByRole('banner');
      await expect(header.getByRole('link').first()).toBeVisible();
      for (const control of await header.locator('a, button').all()) {
        if (await control.isVisible()) await expectInsideScreen(control, width);
      }

      // Every Section link is reachable, directly or through the menu.
      const menuButton = header.getByRole('button', { name: menu });
      if (width < menuBreakpoint) {
        await expect(header.getByRole('link', { name: sectionLinks[0] })).toBeHidden();
        await menuButton.click();
      } else {
        await expect(menuButton).toBeHidden();
      }
      for (const name of sectionLinks) {
        const link = header.getByRole('link', { name, exact: true });
        await expect(link).toBeVisible();
        await expectInsideScreen(link, width);
      }
    });
  }

  test(`following a Section link from the menu closes it on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 800 });
    await page.goto(path);

    const header = page.getByRole('banner');
    await header.getByRole('button', { name: menu }).click();
    const link = header.getByRole('link', { name: sectionLinks[1], exact: true });
    await link.click();

    await expect(link).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });
}
