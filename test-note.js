import { parseNote } from './server/parser.js';

async function test() {
  try {
    const url = 'https://substack.com/@physicsgene/note/c-269399383?r=6xamqv&utm_medium=ios&utm_source=notes-share-action';
    console.log('Fetching note...');
    const result = await parseNote(url);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
