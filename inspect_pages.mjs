import fs from 'fs';

async function inspectPages() {
  const codolioRes = await fetch('https://codolio.com/profile/shuklavaibhav', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const codolioHtml = await codolioRes.text();
  fs.writeFileSync('codolio.html', codolioHtml);
  console.log('Saved codolio.html, length:', codolioHtml.length);

  const ccRes = await fetch('https://www.codechef.com/users/shuklagvk', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const ccHtml = await ccRes.text();
  fs.writeFileSync('codechef.html', ccHtml);
  console.log('Saved codechef.html, length:', ccHtml.length);

  // Search Codolio for script or JSON data
  const scripts = codolioHtml.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
  console.log('Codolio scripts found:', scripts.length);
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    if (s.includes('shuklavaibhav') || s.includes('total') || s.includes('LeetCode')) {
      console.log('Interesting script in Codolio:', s.slice(0, 300));
    }
  }

  // Search CodeChef for user data
  console.log('CodeChef contains shuklagvk?', ccHtml.includes('shuklagvk'));
}

inspectPages();
