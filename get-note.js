import * as cheerio from 'cheerio';

const url = 'https://substack.com/@physicsgene/note/c-269399383';

async function run() {
  console.log('Fetching note...');
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    }
  });
  const html = await response.text();
  const $ = cheerio.load(html);

  console.log('\n--- Title ---');
  console.log($('title').text().trim());

  console.log('\n--- Common Note Containers ---');
  console.log('.note-body length:', $('.note-body').length);
  console.log('.note-content length:', $('.note-content').length);
  console.log('.available-content length:', $('.available-content').length);
  console.log('article length:', $('article').length);
  console.log('.note length:', $('.note').length);
  console.log('.substack-note length:', $('.substack-note').length);

  // Let's print out all divs with classes containing 'note' or 'body'
  console.log('\n--- Divs with relevant classes ---');
  $('div').each((i, el) => {
    const className = $(el).attr('class') || '';
    if (className.includes('note') || className.includes('body') || className.includes('post')) {
      console.log(`div class="${className}" (text length: ${$(el).text().trim().length})`);
    }
  });

  // Let's check meta tags
  console.log('\n--- Meta og:description ---');
  console.log($('meta[property="og:description"]').attr('content'));

  console.log('\n--- Meta description ---');
  console.log($('meta[name="description"]').attr('content'));
  
  console.log('\n--- Metadata Inspection ---');
  // Log all meta tags
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || '';
    const property = $(el).attr('property') || '';
    const content = $(el).attr('content') || '';
    if (name || property) {
      console.log(`Meta: name="${name}" property="${property}" content="${content}"`);
    }
  });

  // Log all links and elements that look like author profiles
  console.log('\n--- Elements with testid or profile info ---');
  $('[data-testid], [class*="author"], [class*="profile"], [class*="name"]').each((i, el) => {
    const testid = $(el).attr('data-testid') || '';
    const className = $(el).attr('class') || '';
    const text = $(el).text().trim();
    if (text.length > 0 && text.length < 100) {
      console.log(`<${el.tagName} data-testid="${testid}" class="${className}">: "${text}"`);
    }
  });

  // Log all time elements
  console.log('\n--- Time elements ---');
  $('time').each((i, el) => {
    console.log(`<time datetime="${$(el).attr('datetime')}">: "${$(el).text().trim()}"`);
  });
}

run().catch(console.error);
