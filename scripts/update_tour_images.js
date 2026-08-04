const fs = require('fs');

let content = fs.readFileSync('lib/data.ts', 'utf8');

content = content.replace(
  /name: "Ooty Sightseeing Day Tour",[\s\S]*?image: "[^"]+",/g,
  'name: "Ooty Sightseeing Day Tour",\n    description: "Explore all major Ooty attractions in a single day with an expert guide and premium vehicle.",\n    highlights: ["Botanical Garden", "Doddabetta Peak", "Ooty Lake", "Rose Garden", "Tea Factory & Museum"],\n    duration: "1 Day (10 hrs)",\n    price: 1800,\n    originalPrice: 2500,\n    persons: "Up to 4",\n    image: "/images/tour_ooty.jpg",'
);

content = content.replace(
  /name: "Ooty & Coonoor Combo Tour",[\s\S]*?image: "[^"]+",/g,
  'name: "Ooty & Coonoor Combo Tour",\n    description: "A complete experience covering the top highlights of both beautiful mountain towns.",\n    highlights: ["Sim\'s Park Coonoor", "Valley View Point", "Lamb\'s Rock", "Ooty Lake", "Dolphin\'s Nose"],\n    duration: "1 Day (12 hrs)",\n    price: 2500,\n    originalPrice: 3500,\n    persons: "Up to 4",\n    image: "/images/tour_train.jpg",'
);

content = content.replace(
  /name: "Honeymoon Special \(Standard\)",[\s\S]*?image: "[^"]+",/g,
  'name: "Honeymoon Special (Standard)",\n    description: "Create beautiful memories with a highly romantic and private tour designed for couples.",\n    highlights: ["Rose Garden Walk", "Private Boat Ride", "Sunset at Doddabetta", "Romantic Campfire Setup"],\n    duration: "2 Days / 1 Night",\n    price: 7000,\n    originalPrice: 9500,\n    persons: "2 Persons (Couple)",\n    image: "/images/tour_doddabetta_view.jpg",'
);

content = content.replace(
  /name: "Honeymoon Special \(Luxury\)",[\s\S]*?image: "[^"]+",/g,
  'name: "Honeymoon Special (Luxury)",\n    description: "An ultra-premium, all-inclusive luxury romantic getaway through Ooty\'s misty paradise.",\n    highlights: ["Tea Estate Private Walk", "VIP Boat Cruise", "Luxury Valley View Resort", "Candlelight Dinner"],\n    duration: "3 Days / 2 Nights",\n    price: 13999,\n    originalPrice: 18500,\n    persons: "2 Persons (Couple)",\n    image: "/images/real_tea_estate.jpg",'
);

content = content.replace(
  /name: "Friends & Family Group Package",[\s\S]*?image: "[^"]+",/g,
  'name: "Friends & Family Group Package",\n    description: "The perfect group package for friends or families traveling together. Fun, flexible, and affordable.",\n    highlights: ["Mudumalai Safari", "Pykara Boat House", "Campfire with Music", "Trekking & Hiking Trails"],\n    duration: "3 Days",\n    price: 1500,\n    originalPrice: 2200,\n    persons: "Per Head (Min 6)",\n    image: "/images/real_innova.jpg",'
);

content = content.replace(
  /name: "Adventure & Wilderness Special",[\s\S]*?image: "[^"]+",/g,
  'name: "Adventure & Wilderness Special",\n    description: "An off-beat, thrilling adventure featuring private jungle jeep safaris and high-altitude trekking.",\n    highlights: ["Avalanche Lake Permit", "Mudumalai Forest Safari", "Jungle Trekking", "Bison Valley View"],\n    duration: "1 Day (12 hrs)",\n    price: 1300,\n    originalPrice: 1800,\n    persons: "Per Head (Min 4)",\n    image: "/images/real_mudumalai.jpg",'
);

content = content.replace(
  /name: "Educational \/ Student Group Tour",[\s\S]*?image: "[^"]+",/g,
  'name: "Educational / Student Group Tour",\n    description: "An educational and fun-filled expedition for schools, colleges, and academic groups.",\n    highlights: ["Tea Museum Visit", "Botanical Garden Study", "Tribal Museum", "Safe & Guided Travel"],\n    duration: "2 Days / 1 Night",\n    price: 1800,\n    originalPrice: 2500,\n    persons: "Per Head (Min 20)",\n    image: "/images/tour_stone_house.jpg",'
);

fs.writeFileSync('lib/data.ts', content);
console.log('Successfully updated 7 unique tour package images!');
