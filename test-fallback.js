import fs from 'fs';
import * as cheerio from 'cheerio';

// load modified parser
import { parseNote } from './server/parser.js';

async function test() {
  const url = 'https://substack.com/@physicsgene/note/c-269399383?r=6xamqv&utm_medium=ios&utm_source=notes-share-action';
  
  // monkey patch fetch to return our modified HTML
  const originalFetch = global.fetch;
  global.fetch = async (...args) => {
    if (args[0] === url) {
      const html = fs.readFileSync('note.html', 'utf8');
      const $ = cheerio.load(html);
      $('.ProseMirror').remove();
      $('div[class*="feedCommentBodyInner"]').remove();
      $('div[class*="feedCommentBody"]').remove();
      
      return {
        ok: true,
        text: async () => $.html()
      };
    }
    return originalFetch(...args);
  };
  
  try {
    const result = await parseNote(url);
    console.log('Result Elements length:', result.elements.length);
    console.log('Title:', result.title);
    if (result.elements.length > 0) {
      console.log('First element:', result.elements[0]);
    }
  } catch(e) {
    console.error(e);
  }
}
test();
