import { chromium } from '@playwright/test';
const base = process.env.QA_URL || 'http://127.0.0.1:4173/napoli-personale-gianmarco-brandi';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const result = {};
for (const width of [390, 768, 1280, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const locale of ['it', 'en']) {
    if (locale === 'en') await page.getByRole('button', { name: 'EN', exact: true }).click();
    result[`${width}-${locale}`] = await page.evaluate(() => {
      const words = document.querySelector('main')?.innerText.trim().split(/\s+/u).length || 0;
      const section = selector => Math.round(document.querySelector(selector)?.getBoundingClientRect().height || 0);
      return { words, height: document.documentElement.scrollHeight, strategy: section('.np-strategy'), portfolio: section('.portfolio-evidence'), yours: section('.np-yours'), overflow: document.documentElement.scrollWidth - innerWidth };
    });
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(result, null, 2));
