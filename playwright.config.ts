import { defineConfig, devices } from '@playwright/test';

const port = 4322;
const baseURL = `http://localhost:${port}`;

// Runs against the preview server of the production build, so build first:
// `pnpm test:e2e` and `pnpm baseline:update` do that for you.
export default defineConfig({
  testDir: './tests/e2e',
  // The content baseline is plain text, one file per Locale, committed so changes show in PR diffs.
  snapshotPathTemplate: '{testDir}/content-baseline/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    // A fixed browser language keeps the Default Locale page from redirecting to `es`.
    locale: 'en-US',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm exec astro preview --port ${port}`,
    // Astro 7 detaches the preview server when it detects an AI agent, so Playwright would lose it.
    env: { ASTRO_PREVIEW_BACKGROUND: '0' },
    url: baseURL,
    reuseExistingServer: false,
  },
});
