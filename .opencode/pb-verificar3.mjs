import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

await page.goto('http://127.0.0.1:4342/soluciones/comunicacion-industrial/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Scroll to arquitectura section
await page.evaluate(() => {
  const el = document.querySelector('.sol-arch-svg');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
});
await page.waitForTimeout(1500);

const svgBox = await page.locator('.sol-arch-svg').boundingBox();
console.log('Arch SVG position after scroll:', svgBox);

const pathEl = await page.locator('.sol-arch-svg .sol-arch-line').first();
const strokeOffset = await pathEl.evaluate((el) => {
  const computed = window.getComputedStyle(el);
  return { strokeDasharray: computed.strokeDasharray, strokeDashoffset: computed.strokeDashoffset };
});
console.log('Path stroke:', strokeOffset);

await page.screenshot({ path: 'C:\\Users\\alvea\\AppData\\Local\\Temp\\opencode\\pb-capturas\\comunicaciones-arquitectura.png' });

await browser.close();
console.log('done');
