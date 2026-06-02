import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('note.html');
const $ = cheerio.load(html);

$('script[type="application/ld+json"]').each((i, el) => {
  console.log('JSON-LD:', $(el).html());
});
