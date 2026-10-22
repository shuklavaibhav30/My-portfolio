import fs from 'fs';
const html = fs.readFileSync('codolio.html', 'utf8');

const targets = ['465', '873', '296', '16776', '16,776', 'GeeksForGeeks'];
for (const t of targets) {
  const idx = html.indexOf(t);
  console.log(`Found "${t}"?`, idx !== -1 ? `Yes at ${idx}` : 'No');
  if (idx !== -1) {
    console.log(`Context for "${t}":`, html.slice(Math.max(0, idx - 80), idx + 120).replace(/\n/g, ' '));
  }
}
