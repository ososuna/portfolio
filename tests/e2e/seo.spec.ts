import { expect, test } from '@playwright/test';

const site = 'https://www.oswaldo-osuna.com';

const pages = [
  { locale: 'en', path: '/', url: `${site}/`, ogLocale: 'en_US', ogLocaleAlternate: 'es_MX' },
  { locale: 'es', path: '/es/', url: `${site}/es/`, ogLocale: 'es_MX', ogLocaleAlternate: 'en_US' },
];

for (const { locale, path, url, ogLocale, ogLocaleAlternate } of pages) {
  test(`the ${locale} page names its canonical URL and its other Locales`, async ({ page }) => {
    await page.goto(path);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
    const alternate = (hreflang: string) =>
      page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`);
    await expect(alternate('en')).toHaveAttribute('href', `${site}/`);
    await expect(alternate('es')).toHaveAttribute('href', `${site}/es/`);
    await expect(alternate('x-default')).toHaveAttribute('href', `${site}/`);
  });

  test(`the ${locale} page describes itself for search results and link previews`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    const meta = (key: string) =>
      page.locator(`meta[name="${key}"], meta[property="${key}"]`).getAttribute('content');

    const description = await meta('description');
    // Search engines cut a description off at about 155 characters.
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length).toBeLessThanOrEqual(155);

    expect(await meta('og:type')).toBe('profile');
    expect(await meta('og:site_name')).toBe('Oswaldo Osuna');
    expect(await meta('og:title')).toBe('Oswaldo Osuna - AI Engineer');
    expect(await meta('og:description')).toBe(description);
    expect(await meta('og:url')).toBe(url);
    expect(await meta('og:locale')).toBe(ogLocale);
    expect(await meta('og:locale:alternate')).toBe(ogLocaleAlternate);
    expect(await meta('twitter:card')).toBe('summary_large_image');

    const image = await meta('og:image');
    expect(image).toMatch(new RegExp(`^${site}/_astro/.+\\.png$`));
    expect(await meta('og:image:width')).toBe('1200');
    expect(await meta('og:image:height')).toBe('630');
    expect(await meta('og:image:alt')).toBeTruthy();
    const imageResponse = await request.get(new URL(image!).pathname);
    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()['content-type']).toBe('image/png');
  });

  test(`the ${locale} page reserves the real shape of every image`, async ({ page }) => {
    await page.goto(path);
    const images = await page.locator('main img').evaluateAll((elements) =>
      Promise.all(
        (elements as HTMLImageElement[]).map(async (image) => {
          image.loading = 'eager';
          await image.decode();
          return {
            alt: image.alt,
            reserved: Number(image.getAttribute('width')) / Number(image.getAttribute('height')),
            real: image.naturalWidth / image.naturalHeight,
          };
        }),
      ),
    );

    expect(images.length).toBeGreaterThan(0);
    for (const { alt, reserved, real } of images) {
      expect(reserved, `the width and height of "${alt}"`).toBeCloseTo(real, 1);
    }
  });

  test(`the ${locale} page loads the Hero photo first and sizes the other images to the screen`, async ({
    page,
  }) => {
    await page.goto(path);

    const heroPhoto = page.locator('main section').first().locator('img');
    await expect(heroPhoto).toHaveAttribute('loading', 'eager');
    await expect(heroPhoto).toHaveAttribute('fetchpriority', 'high');

    for (const sectionId of ['projects', 'achievements']) {
      for (const image of await page.locator(`#${sectionId} img`).all()) {
        await expect(image).toHaveAttribute('loading', 'lazy');
        await expect(image).toHaveAttribute('srcset', /\d+w/);
        await expect(image).toHaveAttribute('sizes', /.+/);
      }
    }
  });

  test(`the ${locale} page identifies the site and its owner in structured data`, async ({
    page,
  }) => {
    await page.goto(path);
    const data = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    );
    const byType = (type: string) =>
      data['@graph'].find((node: { '@type': string }) => node['@type'] === type);

    expect(data['@context']).toBe('https://schema.org');
    // The same ids on every Locale, so both pages describe one person and one site.
    expect(byType('Person')).toMatchObject({
      '@id': `${site}/#person`,
      name: 'Oswaldo Osuna',
      url: `${site}/`,
      jobTitle: 'AI Engineer',
      worksFor: { '@type': 'Organization', name: 'ARCOS LLC' },
      sameAs: ['https://github.com/ososuna', 'https://www.linkedin.com/in/ososuna/'],
    });
    expect(byType('Person').image).toMatch(new RegExp(`^${site}/_astro/.+`));
    expect(byType('WebSite')).toMatchObject({
      '@id': `${site}/#website`,
      name: 'Oswaldo Osuna',
      url: `${site}/`,
      inLanguage: ['en', 'es'],
      publisher: { '@id': `${site}/#person` },
    });
  });
}

test('the 404 page asks search engines not to index it', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('robots.txt allows crawling and points at a sitemap of both Locales', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  expect(rules).toContain('User-agent: *\nAllow: /');
  expect(rules).toContain(`Sitemap: ${site}/sitemap-index.xml`);

  const index = await request.get('/sitemap-index.xml');
  expect(index.status()).toBe(200);
  expect(await index.text()).toContain(`<loc>${site}/sitemap-0.xml</loc>`);

  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  expect(urls).toEqual(pages.map(({ url }) => url));
});

test('browsers that ask for /favicon.ico get an icon', async ({ request }) => {
  const icon = await request.get('/favicon.ico');
  expect(icon.status()).toBe(200);
  expect(icon.headers()['content-type']).toMatch(/icon/);
});
