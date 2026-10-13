import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4342';

const PAGES = [
  { name: 'hub', path: '/soluciones/' },
  { name: 'fuerza', path: '/soluciones/tableros-de-fuerza/' },
  { name: 'control', path: '/soluciones/tableros-de-control/' },
  { name: 'supervision', path: '/soluciones/supervision-hmi/' },
  { name: 'comunicaciones', path: '/soluciones/comunicacion-industrial/' },
];

const VIEWPORTS = [
  { name: '1280', width: 1280, height: 900 },
  { name: '375', width: 375, height: 812 },
];

const OUT_DIR = 'C:\\Users\\alvea\\AppData\\Local\\Temp\\opencode\\pb-capturas';

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error(`[console.${vp.name}] ${msg.text()}`);
    });
    page.on('pageerror', (err) => console.error(`[pageerror.${vp.name}] ${err.message}`));
    page.on('requestfailed', (req) => console.error(`[reqfail.${vp.name}] ${req.url()} -> ${req.failure()?.errorText}`));

    for (const p of PAGES) {
      const url = BASE + p.path;
      console.log(`-- ${vp.name}px -> ${p.name} (${url})`);
      const resp = await page.goto(url, { waitUntil: 'networkidle' });
      console.log(`   status: ${resp?.status()}`);
      // give SVG/CSS animations a moment
      await page.waitForTimeout(500);
      // scroll to bottom to reveal lazy/reveal sections, then back up
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      const filePath = `${OUT_DIR}\\${p.name}-${vp.name}.png`;
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`   saved: ${filePath}`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log('done');
