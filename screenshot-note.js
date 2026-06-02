import puppeteer from 'puppeteer';
import path from 'path';

const outDir = 'C:\\Users\\Utente\\.gemini\\antigravity\\brain\\bb3725f7-374a-4087-8408-7e2e9a2c3a08\\';
const noteUrl = 'https://substack.com/@physicsgene/note/c-269399383?r=6xamqv&utm_medium=ios&utm_source=notes-share-action';

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));
  
  // Set viewport to mobile
  await page.setViewport({ width: 375, height: 800 });
  
  console.log('Navigating to app...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  console.log('Waiting for scripts to load...');
  await new Promise(r => setTimeout(r, 1500));
  
  console.log('Filling Note URL and submitting...');
  await page.type('#url-input', noteUrl);
  await page.click('#submit-btn');
  
  console.log('Waiting for preview to render...');
  await page.waitForSelector('#preview-content .format-default', { timeout: 15000 });
  
  // Scroll preview section into view
  await page.evaluate(() => document.getElementById('preview-section').scrollIntoView());
  await new Promise(r => setTimeout(r, 1500));
  
  console.log('Capturing Note preview screenshot...');
  await page.screenshot({ path: path.join(outDir, 'note_render.png') });
  
  await browser.close();
  console.log('Completed successfully!');
}

run().catch(console.error);
