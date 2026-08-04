const fs = require('fs');

let content = fs.readFileSync('components/home/HeroSection.tsx', 'utf8');

content = content.replace(/\/images\/hero_nilgiris_v2\.png/g, '/images/stunning_tea_estate.png');
content = content.replace(/\/images\/hero_nilgiris\.jpg/g, '/images/stunning_tea_estate.png');

fs.writeFileSync('components/home/HeroSection.tsx', content);
console.log('Successfully updated HeroSection.tsx!');
