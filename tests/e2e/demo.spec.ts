import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const services = ['audit-assurance', 'internal-audit-risk-compliance', 'tax-zakat', 'accounting-advisory', 'management-consulting', 'operations-technology'];
const insights = ['doing-business-in-saudi-arabia', 'preparing-for-a-financial-audit', 'financial-information-for-better-decisions'];
const paths = ['', 'about', 'services', 'insights', 'contact', 'careers', 'privacy', ...services.map(s => 'services/' + s), ...insights.map(s => 'insights/' + s)];

test('every English and Arabic route returns meaningful server HTML', async ({ request }) => {
  for (const locale of ['en', 'ar']) {
    for (const path of paths) {
      const response = await request.get('/' + locale + (path ? '/' + path : ''));
      expect(response.status(), locale + '/' + path).toBe(200);
      const html = await response.text();
      expect(html).toContain('lang="' + locale + '"');
      expect(html).toContain('dir="' + (locale === 'ar' ? 'rtl' : 'ltr') + '"');
      expect((html.match(/<h1[ >]/g) || []).length).toBe(1);
      expect(html).not.toContain('mailto:undefined');
      expect(response.headers()['x-robots-tag']).toContain('noindex');
    }
  }
});

test('service explorer changes content with mouse and keyboard', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('tab', { name: /03.*Tax/ }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Clarity on your obligations.');
  await page.getByRole('tab', { name: /03.*Tax/ }).press('ArrowDown');
  await expect(page.getByRole('tab', { name: /04.*Accounting/ })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Make your information work harder.');
  await page.getByRole('link', { name: 'Explore this service' }).click();
  await expect(page).toHaveURL('/en/services/accounting-advisory');
});

test('language switching keeps the service and mobile menu supports escape', async ({ page }) => {
  await page.goto('/en/services/audit-assurance');
  await page.getByRole('link', { name: 'Switch to Arabic' }).click();
  await expect(page).toHaveURL('/ar/services/audit-assurance');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.setViewportSize({ width: 390, height: 844 });
  const button = page.getByRole('button', { name: 'فتح القائمة' });
  await button.click();
  await expect(page.getByRole('navigation', { name: 'التنقل عبر الهاتف' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'التنقل عبر الهاتف' })).toBeHidden();
});

test('insight filters, empty results and reset work', async ({ page }) => {
  await page.goto('/en/insights');
  await page.getByRole('button', { name: 'Audit', exact: true }).click();
  await expect(page.locator('.insight-card')).toHaveCount(1);
  await page.getByRole('searchbox').fill('not-in-the-content');
  await expect(page.getByRole('heading', { name: 'A different perspective?' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('.insight-card')).toHaveCount(3);
});

test('enquiry errors recover, service stays selected, no data is sent or stored', async ({ page }) => {
  const sent: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') sent.push(request.url()); });
  await page.goto('/en/contact?service=audit_assurance');
  await expect(page.locator('#serviceKey')).toHaveValue('audit_assurance');
  await page.getByRole('button', { name: 'Request a consultation' }).click();
  await expect(page.locator('.error-summary')).toBeFocused();
  await page.getByLabel('Full name').fill('Demo Visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Organisation', { exact: false }).fill('Demo Company');
  await page.getByLabel('Tell us a little more').fill('We would like to discuss preparation for our financial audit.');
  await page.locator('#consent').check();
  await page.getByRole('button', { name: 'Request a consultation' }).click();
  await expect(page.getByRole('heading', { name: 'That’s how the conversation starts.' })).toBeVisible();
  expect(sent).toEqual([]);
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
  await expect(page).not.toHaveURL(/visitor|example.com/);
});

test('legacy routes redirect, missing routes return 404 and integrations are disabled', async ({ request, page }) => {
  const legacy = await request.get('/services/64ae7d153a75882b4691e53c', { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe('/en/services/audit-assurance');
  const missing = await request.get('/ar/unknown-demo-route');
  expect(missing.status()).toBe(404);
  await page.goto('/ar/unknown-demo-route');
  await expect(page.getByRole('heading', { name: 'لنبحث عن طريق آخر.' })).toBeVisible();
  const disabled = await request.post('/api/enquiries', { data: {} });
  expect(disabled.status()).toBe(503);
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
});

test('representative pages pass automated accessibility checks', async ({ page }) => {
  for (const path of ['/en', '/ar', '/en/services/audit-assurance', '/en/contact', '/ar/contact', '/en/insights']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), path).toEqual([]);
  }
});

test('mobile and desktop have no overflow or broken images', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/en', '/ar', '/en/services/audit-assurance', '/ar/contact', '/en/insights', '/en/about']) {
      await page.goto(path);
      await page.evaluate(async () => { await document.fonts.ready; });
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflows, path + ' at ' + width).toBe(false);
      const missing = await page.locator('img').evaluateAll(images => images.filter((img): img is HTMLImageElement => img instanceof HTMLImageElement && img.complete && img.naturalWidth === 0).map(img => img.src));
      expect(missing, path).toEqual([]);
    }
  }
});
