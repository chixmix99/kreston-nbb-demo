import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts/screenshots', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, path, width, height] of [
  ['home-desktop', '/en', 1440, 1000],
  ['home-mobile', '/en', 390, 844],
  ['home-arabic-mobile', '/ar', 390, 844],
  ['service-desktop', '/en/services/audit-assurance', 1440, 1000],
  ['contact-desktop', '/en/contact', 1440, 1000],
  ['about-desktop', '/en/about', 1440, 1000],
]) {
  await page.setViewportSize({ width, height });
  await page.goto('http://127.0.0.1:3000' + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const image of document.images) {
      image.loading = 'eager';
      await image.decode().catch(() => {});
    }
  });
  await page.screenshot({ path: 'artifacts/screenshots/' + name + '.png', fullPage: true });
  if (name === 'home-desktop') await page.screenshot({ path: 'artifacts/screenshots/home-viewport.png' });
  console.log(name + ' captured');
}
console.log('Browser runtime errors:', errors);
await browser.close();
if (errors.length) process.exitCode = 1;
