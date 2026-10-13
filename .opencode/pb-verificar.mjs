import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

// Check the unifilar on fuerza page
await page.goto('http://127.0.0.1:4342/soluciones/tableros-de-fuerza/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2200); // wait for animation to complete

// Get the unifilar element and check its bounding box
const unifilar = await page.locator('.sol-unifilar').first();
const box = await unifilar.boundingBox();
console.log('Fuerza unifilar box:', box);

// Check the lit ramal elements
const litElements = await page.locator('.sol-unifilar [data-ramal="1"]').all();
console.log('Fuerza ramal 1 elements:', litElements.length);
for (const el of litElements) {
  const opacity = await el.evaluate((node) => window.getComputedStyle(node).opacity);
  console.log('  element opacity:', opacity);
}

await page.screenshot({ path: 'C:\\Users\\alvea\\AppData\\Local\\Temp\\opencode\\pb-capturas\\fuerza-hero-zoom.png', clip: { x: 0, y: 0, width: 1280, height: 600 } });

// Also check the supervision page
await page.goto('http://127.0.0.1:4342/soluciones/supervision-hmi/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2200);
const lit3 = await page.locator('.sol-unifilar [data-ramal="3"]').all();
console.log('Supervision ramal 3 elements:', lit3.length);
for (const el of lit3) {
  const opacity = await el.evaluate((node) => window.getComputedStyle(node).opacity);
  console.log('  element opacity:', opacity);
}

// Check the link in control FAQ
await page.goto('http://127.0.0.1:4342/soluciones/tableros-de-control/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const supHmiLink = await page.locator('a[href="/soluciones/supervision-hmi/"]').all();
console.log('Control page links to supervision-hmi:', supHmiLink.length);

// Check that the architecture SVG is present
await page.goto('http://127.0.0.1:4342/soluciones/comunicacion-industrial/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const archSvg = await page.locator('.sol-arch-svg').count();
console.log('Comunicaciones arch SVG count:', archSvg);
if (archSvg > 0) {
  const svgBox = await page.locator('.sol-arch-svg').first().boundingBox();
  console.log('  arch SVG box:', svgBox);
}

await browser.close();
console.log('done');
