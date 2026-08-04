const fs = require('fs');

let content = fs.readFileSync('lib/data.ts', 'utf8');

// Replacements for destinations and gallery
content = content.replace(/\/images\/dest_ooty_lake\.jpg/g, '/images/stunning_ooty_lake.png');
content = content.replace(/\/images\/dest_doddabetta\.jpg/g, '/images/stunning_doddabetta.png');
content = content.replace(/\/images\/dest_tea_estate\.jpg/g, '/images/stunning_tea_estate.png');
content = content.replace(/\/images\/dest_pykara\.jpg/g, '/images/stunning_pykara.png');
content = content.replace(/\/images\/dest_avalanche\.jpg/g, '/images/stunning_doddabetta.png'); // fallback
content = content.replace(/\/images\/dest_mudumalai\.jpg/g, '/images/stunning_mudumalai.png');
content = content.replace(/\/images\/dest_coonoor\.jpg/g, '/images/stunning_tea_estate.png'); // fallback

content = content.replace(/\/images\/gallery_botanical\.jpg/g, '/images/stunning_botanical.png');
content = content.replace(/\/images\/gallery_toy_train\.jpg/g, '/images/stunning_toy_train.png');
content = content.replace(/\/images\/hero_nilgiris\.jpg/g, '/images/stunning_tea_estate.png');
content = content.replace(/\/images\/gallery_sunset_hills\.jpg/g, '/images/stunning_doddabetta.png');
content = content.replace(/\/images\/gallery_mountain_road\.jpg/g, '/images/stunning_tea_estate.png');

// Replace the real ones we just added in gallery
content = content.replace(/\/images\/real_train\.jpg/g, '/images/stunning_toy_train.png');
content = content.replace(/\/images\/real_coonoor\.jpg/g, '/images/stunning_tea_estate.png');
content = content.replace(/\/images\/real_ooty\.jpg/g, '/images/stunning_ooty_lake.png');
content = content.replace(/\/images\/real_pykara\.jpg/g, '/images/stunning_pykara.png');

fs.writeFileSync('lib/data.ts', content);
console.log('Successfully updated lib/data.ts to use stunning images globally!');
