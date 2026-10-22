import fs from 'fs';

const b64 = fs.readFileSync('public/favicon.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <clipPath id="circleClip">
      <circle cx="128" cy="128" r="126" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${b64}" width="256" height="256" clip-path="url(#circleClip)" />
</svg>`;

fs.writeFileSync('public/favicon.svg', svg);
console.log('Saved public/favicon.svg successfully!');
