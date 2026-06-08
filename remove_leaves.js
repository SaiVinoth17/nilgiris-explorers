const fs = require('fs');

let dataContent = fs.readFileSync('lib/data.ts', 'utf8');
dataContent = dataContent.replace(/\/images\/stunning_tea_estate\.png/g, '/images/stunning_panoramic_hero.png');
dataContent = dataContent.replace(/\/images\/stunning_botanical\.png/g, '/images/stunning_valley_view.png');
fs.writeFileSync('lib/data.ts', dataContent);

let heroContent = fs.readFileSync('components/home/HeroSection.tsx', 'utf8');
heroContent = heroContent.replace(/\/images\/stunning_tea_estate\.png/g, '/images/stunning_panoramic_hero.png');
fs.writeFileSync('components/home/HeroSection.tsx', heroContent);

console.log('Successfully replaced tea estate/botanical with true panoramic wide shots!');
