import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('note.html', 'utf8');
let preloads = null;
const startStr = 'window._preloads        = JSON.parse("';
const idx = html.indexOf(startStr);
if (idx !== -1) {
  const jsonStart = idx + startStr.length - 1;
  // find the closing ");"
  const endIdx = html.indexOf('");', jsonStart);
  if (endIdx !== -1) {
    const jsonStr = html.substring(jsonStart, endIdx + 1);
    try {
      preloads = JSON.parse(JSON.parse(jsonStr)); // double parse because it's JSON.parse("{\"...")
      console.log('Successfully parsed preloads.');
      // Let's find the note content inside preloads
      // Substack preloads usually has `pub`, `post`, `comments`, etc.
      // For notes, it might be in `note` or `post` or inside `graphql` cache.
      const keys = Object.keys(preloads);
      console.log('Preloads keys:', keys);
      if (preloads.post) {
        console.log('Has post:', typeof preloads.post);
        console.log('post keys:', Object.keys(preloads.post));
        if (preloads.post.body) console.log('post body length:', preloads.post.body.length);
      }
      // Let's look for any string that looks like our text
      const targetText = 'Every photo on your phone is held in place by a particle doing something forbidden';
      const searchObj = (obj, path) => {
        if (!obj) return;
        if (typeof obj === 'string') {
          if (obj.includes(targetText)) {
            console.log('Found in path:', path);
            if (obj.length < 500) console.log('Value:', obj);
          }
        } else if (typeof obj === 'object') {
          for (const k in obj) {
            searchObj(obj[k], path + '.' + k);
          }
        }
      };
      searchObj(preloads, 'preloads');
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  }
}
