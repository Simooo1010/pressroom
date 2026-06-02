import fs from 'fs';

const html = fs.readFileSync('note.html', 'utf8');
const startStr = 'window._preloads        = JSON.parse("';
const idx = html.indexOf(startStr);
if (idx !== -1) {
  const jsonStart = idx + startStr.length - 1;
  const endIdx = html.indexOf('");', jsonStart);
  if (endIdx !== -1) {
    const jsonStr = html.substring(jsonStart, endIdx + 1);
    try {
      const preloads = JSON.parse(JSON.parse(jsonStr));
      
      const targetText = 'Every photo on your phone is held in place by a particle doing something forbidden';
      let foundPath = null;
      let foundHtml = null;

      const searchObj = (obj, path) => {
        if (!obj) return;
        if (typeof obj === 'string') {
          if (obj.includes(targetText)) {
            console.log('Found in path:', path);
            foundPath = path;
            foundHtml = obj;
          }
        } else if (typeof obj === 'object') {
          for (const k in obj) {
            searchObj(obj[k], path + '.' + k);
          }
        }
      };
      
      searchObj(preloads, 'preloads');
      if (foundHtml) {
        console.log('HTML content length:', foundHtml.length);
        console.log('HTML preview:', foundHtml.substring(0, 200));
        fs.writeFileSync('preload-note.html', foundHtml);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  }
}
