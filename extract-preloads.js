import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('note.html', 'utf8');
const $ = cheerio.load(html);

let preloads = null;
$('script').each((i, el) => {
  const content = $(el).html();
  if (content && content.includes('window._preloads')) {
    const match = content.match(/window\._preloads\s*=\s*(JSON\.parse\('.*?'\)|\{.*?\});/);
    if (match) {
      try {
        let jsonStr = match[1];
        if (jsonStr.startsWith('JSON.parse(')) {
          // Extract the string inside JSON.parse('...')
          const stringMatch = jsonStr.match(/JSON\.parse\('(.*)'\)/);
          if (stringMatch) {
            // Unescape the string
            const unescaped = stringMatch[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
            preloads = JSON.parse(unescaped);
          }
        } else {
          preloads = JSON.parse(jsonStr);
        }
      } catch (e) {
        console.error('Failed to parse preloads', e);
      }
    }
  }
});

if (preloads) {
  fs.writeFileSync('preloads.json', JSON.stringify(preloads, null, 2));
  console.log('Saved preloads.json');
} else {
  console.log('No preloads found');
}
