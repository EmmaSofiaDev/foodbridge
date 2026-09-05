const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'images');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  console.log('Page loaded successfully at http://localhost:5199/');

  // 1. Hero & Impact Stats
  const heroPath = path.join(OUTPUT_DIR, 'screenshot_hero.png');
  await page.screenshot({ path: heroPath, clip: { x: 0, y: 0, width: 1280, height: 720 } });
  console.log('Saved screenshot_hero.png');

  // 2. Scroll to Rescue Grid
  await page.evaluate(() => window.scrollBy(0, 750));
  await new Promise(r => setTimeout(r, 600));
  const invPath = path.join(OUTPUT_DIR, 'screenshot_inventory.png');
  await page.screenshot({ path: invPath, clip: { x: 0, y: 100, width: 1280, height: 750 } });
  console.log('Saved screenshot_inventory.png');

  // 3. Scroll to Snowflake Console
  await page.evaluate(() => {
    const el = document.getElementById('snowflake-console');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  const consolePath = path.join(OUTPUT_DIR, 'screenshot_console.png');
  await page.screenshot({ path: consolePath, clip: { x: 0, y: 100, width: 1280, height: 750 } });
  console.log('Saved screenshot_console.png');

  // Also copy all screenshots to dist/images
  fs.copyFileSync(heroPath, path.join(DIST_DIR, 'screenshot_hero.png'));
  fs.copyFileSync(invPath, path.join(DIST_DIR, 'screenshot_inventory.png'));
  fs.copyFileSync(consolePath, path.join(DIST_DIR, 'screenshot_console.png'));

  await browser.close();
  console.log('All screenshots captured and mirrored to dist/images successfully!');
}

main().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
