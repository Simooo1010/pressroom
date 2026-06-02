import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('note.html');
const $ = cheerio.load(html);

console.log('ProseMirror content:');
console.log($('.ProseMirror').html());
console.log('\nfeedCommentBodyInner content:');
console.log($('div[class*="feedCommentBodyInner"]').html());
