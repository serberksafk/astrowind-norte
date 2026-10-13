import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

await page.goto('http://127.0.0.1:4342/soluciones/tableros-de-control/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Click the last FAQ to open it
const lastFaq = page.locator('details.faq-item').last();
await lastFaq.locator('summary').click();
await page.waitForTimeout(500);

// Check the link is there
const linkText = await lastFaq.locator('a[href="/soluciones/supervision-hmi/"]').textContent();
console.log('Last FAQ link text:', linkText);

await page.screenshot({ path: 'C:\\Users\\alvea\\AppData\\Local\\Temp\\opencode\\pb-capturas\\control-faq-open.png' });

// Also check supervision: arquitectura
await page.goto('http://127.0.0.1:4342/soluciones/supervision-hmi/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const intLinks = await page.locator('.sol-link-arrow').all();
console.log('Supervision integracion links:', intLinks.length);
for (const l of intLinks) {
  const text = await l.textContent();
  const href = await l.getAttribute('href');
  console.log('  ', text, '->', href);
}

await browser.close();
console.log('done');
