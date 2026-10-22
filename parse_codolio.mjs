import fs from 'fs';

const html = fs.readFileSync('codolio.html', 'utf8');

// Find all push calls
const lines = html.split('self.__next_f.push(');
console.log('Split parts:', lines.length);

let combined = '';
for (let i = 1; i < lines.length; i++) {
  const part = lines[i];
  const firstBracket = part.indexOf('[');
  const comma = part.indexOf(',', firstBracket);
  const quoteStart = part.indexOf('"', comma);
  const quoteEnd = part.lastIndexOf('"]');
  if (quoteStart !== -1 && quoteEnd !== -1 && quoteEnd > quoteStart) {
    const raw = part.slice(quoteStart + 1, quoteEnd);
    try {
      // unescape json string
      const unescaped = JSON.parse('"' + raw.replace(/"/g, '\\"') + '"');
      combined += unescaped;
    } catch (e) {
      combined += raw;
    }
  }
}

fs.writeFileSync('codolio_combined.txt', combined);
console.log('Combined text length:', combined.length);

// Search for patterns
const keywords = ['total', 'solved', 'rank', 'question', 'problem', 'count', 'codechef', 'leetcode', 'codeforces'];
for (const kw of keywords) {
  let pos = 0;
  let matches = 0;
  while ((pos = combined.toLowerCase().indexOf(kw, pos)) !== -1 && matches < 3) {
    console.log(`Match for "${kw}" at ${pos}:`, combined.slice(Math.max(0, pos - 40), pos + 100).replace(/\n/g, ' '));
    pos += kw.length;
    matches++;
  }
}
