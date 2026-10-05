import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  workers: 2,
  retries: 0,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3000', browserName: 'chromium', channel: 'chrome', viewport: { width: 1440, height: 1000 }, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  outputDir: 'test-results',
});

