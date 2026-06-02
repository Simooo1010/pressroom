import fs from 'fs';

async function test() {
  const url = 'https://substack.com/@physicsgene/note/c-269399383?r=6xamqv&utm_medium=ios&utm_source=notes-share-action';
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });
  const html = await response.text();
  fs.writeFileSync('note.html', html);
  console.log('Saved note.html');
}
test();
