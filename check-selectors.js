import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('note.html');
const $ = cheerio.load(html);

console.log('ProseMirror:', $('.ProseMirror').length);
console.log('feedCommentBodyInner:', $('div[class*="feedCommentBodyInner"]').length);
console.log('feedCommentBody:', $('div[class*="feedCommentBody"]').length);
console.log('note-body:', $('.note-body').length);
console.log('note-content:', $('.note-content').length);
console.log('available-content:', $('.available-content').length);
console.log('article:', $('article').length);

const articleHtml = $('article').html();
if (articleHtml) {
  console.log('article preview:', articleHtml.substring(0, 500));
} else {
  console.log('No article tag');
}
