import fs from 'fs';

async function check() {
  try {
    const res = await fetch('https://github.com/shuklavaibhav30?tab=achievements');
    const html = await res.text();
    const badges = [];
    const re = /alt="Achievement:\s*([^"]+)"/g;
    let match;
    while ((match = re.exec(html)) !== null) {
      badges.push(match[1]);
    }
    console.log('GitHub badges:', badges);

    // Leetcode GraphQL
    try {
      const lcGql = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        body: JSON.stringify({
          query: `query userBadges($username: String!) {
            matchedUser(username: $username) {
              badges {
                id
                displayName
                icon
                creationDate
              }
              upcomingBadges {
                name
                icon
              }
            }
          }`,
          variables: { username: 'imvaibhavshukla' }
        })
      });
      const lcBadges = await lcGql.json();
      console.log('LeetCode badges GraphQL:', JSON.stringify(lcBadges, null, 2));
    } catch (e) {
      console.log('LC error:', e.message);
    }

    // HackerRank
    try {
      const hrRes = await fetch('https://www.hackerrank.com/rest/hackers/shuklavaibhav30/badges', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      console.log('HR status:', hrRes.status);
      if (hrRes.ok) {
        const hrData = await hrRes.json();
        console.log('HackerRank badges:', JSON.stringify(hrData, null, 2));
      }
    } catch (e) {
      console.log('HR error:', e.message);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

check();

