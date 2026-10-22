import fs from 'fs';

const html = fs.readFileSync('codolio.html', 'utf8');

// Search for any api endpoints in javascript bundles or html
const matches = html.match(/\/api\/[a-zA-Z0-9_\-\/]+/g) || [];
console.log('API routes found:', [...new Set(matches)]);

const apiHostMatches = html.match(/https?:\/\/[a-zA-Z0-9_\.\-]+api[a-zA-Z0-9_\.\-]+[^\s"']*/gi) || [];
console.log('API host URLs found:', [...new Set(apiHostMatches)]);

// Look for JS bundles in html
const scriptSrcs = html.match(/src="([^"]+\.js)"/g) || [];
console.log('Script bundles:', scriptSrcs.slice(0, 5));

async function checkBundles() {
  for (const s of scriptSrcs.slice(0, 10)) {
    const src = s.replace('src="', '').replace('"', '');
    const fullUrl = src.startsWith('http') ? src : 'https://codolio.com' + src;
    try {
      const res = await fetch(fullUrl);
      const js = await res.text();
      const endpoints = js.match(/\/api\/[a-zA-Z0-9_\-\/]+/g) || [];
      const hosts = js.match(/https?:\/\/[a-zA-Z0-9_\.\-]*api[a-zA-Z0-9_\.\-]*\/[a-zA-Z0-9_\-\/]+/g) || [];
      if (endpoints.length > 0 || hosts.length > 0) {
        console.log(`In ${src}:`, [...new Set([...endpoints, ...hosts])]);
      }
    } catch (e) {}
  }
}

checkBundles();
