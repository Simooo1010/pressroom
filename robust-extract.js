import fs from 'fs';
const html = fs.readFileSync('note.html', 'utf8');
const prefix = 'window._preloads        = JSON.parse("';
const idx = html.indexOf(prefix);
if (idx !== -1) {
  let jsonStart = idx + prefix.length - 1;
  let escape = false;
  let endIdx = -1;
  for (let i = jsonStart + 1; i < html.length; i++) {
    const char = html[i];
    if (escape) {
      escape = false;
    } else if (char === '\\') {
      escape = true;
    } else if (char === '"') {
      endIdx = i;
      break;
    }
  }
  if (endIdx !== -1) {
    const jsonStr = html.substring(jsonStart, endIdx + 1);
    const preloads = JSON.parse(JSON.parse(jsonStr));
    fs.writeFileSync('preloads_parsed.json', JSON.stringify(preloads, null, 2));
    console.log('Successfully parsed! Wrote to preloads_parsed.json');
  }
}
