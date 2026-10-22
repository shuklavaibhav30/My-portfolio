async function test() {
  console.log('--- Testing Codolio ---');
  try {
    const codolioRes = await fetch('https://codolio.com/profile/shuklavaibhav', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('Codolio HTTP status:', codolioRes.status);
    const text = await codolioRes.text();
    console.log('Codolio length:', text.length);
    // Search for numbers, problems solved, etc.
    const matches = text.match(/(?:total|solved|problem|rating|rank)[^<]{0,50}/gi);
    if (matches) console.log('Sample matches:', matches.slice(0, 10));
    
    // Check if there is next.js data or json script tag
    const nextDataMatch = text.match(/<script id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/);
    if (nextDataMatch) {
      console.log('Found __NEXT_DATA__ in Codolio!');
      const nextData = JSON.parse(nextDataMatch[1]);
      console.log('Keys:', Object.keys(nextData.props?.pageProps || {}));
      console.log('pageProps:', JSON.stringify(nextData.props?.pageProps || {}).slice(0, 500));
    }
  } catch (err) {
    console.error('Codolio error:', err.message);
  }

  console.log('--- Testing CodeChef ---');
  try {
    const ccRes = await fetch('https://www.codechef.com/users/shuklagvk', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('CodeChef HTTP status:', ccRes.status);
    const ccText = await ccRes.text();
    console.log('CodeChef length:', ccText.length);
    const titleMatch = ccText.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');
    
    // Check rating
    const ratingMatch = ccText.match(/class="rating-number">([^<]+)/);
    console.log('Rating:', ratingMatch ? ratingMatch[1] : 'not found');
    const starsMatch = ccText.match(/class="rating-star">([^<]+)/);
    console.log('Stars:', starsMatch ? starsMatch[1] : 'not found');
    const divMatch = ccText.match(/class="rating-header">[\s\S]*?<div>([^<]+)/);
    console.log('Div:', divMatch ? divMatch[1] : 'not found');
    const solvedMatch = ccText.match(/Problems Solved:?\s*<[^>]+>\s*(\d+)/i) || ccText.match(/Fully Solved\s*\(([0-9]+)\)/i);
    console.log('Solved match:', solvedMatch ? solvedMatch[1] : 'not found');
  } catch (err) {
    console.error('CodeChef error:', err.message);
  }
}

test();
