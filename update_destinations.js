const fs = require('fs');

let content = fs.readFileSync('lib/data.ts', 'utf8');

// The destinations array looks like this:
// export const destinations = [
//   {
//     id: 1,
//     name: "Ooty Lake",
//     ...
//     image: "/images/stunning_ooty_lake.png",

content = content.replace(
  /name: "Ooty Lake",[\s\S]*?image: "[^"]+",/g,
  'name: "Ooty Lake",\n    description: "A serene artificial lake surrounded by lush Eucalyptus trees, perfect for boating and lakeside walks.",\n    image: "/images/dest_new_ooty_lake.png",'
);

content = content.replace(
  /name: "Doddabetta Peak",[\s\S]*?image: "[^"]+",/g,
  'name: "Doddabetta Peak",\n    description: "The highest peak in the Nilgiris at 2,637m, offering panoramic views of the surrounding mountains.",\n    image: "/images/dest_new_doddabetta.png",'
);

content = content.replace(
  /name: "Botanical Garden",[\s\S]*?image: "[^"]+",/g,
  'name: "Botanical Garden",\n    description: "A magnificent 55-acre garden with over 650 plant species, established in 1848 on terraced hillsides.",\n    image: "/images/dest_new_botanical.png",'
);

content = content.replace(
  /name: "Tea Estates",[\s\S]*?image: "[^"]+",/g,
  'name: "Tea Estates",\n    description: "Sprawling emerald tea plantations offering guided tours, fresh tea tasting, and scenic walks.",\n    image: "/images/dest_new_tea_estates.png",'
);

content = content.replace(
  /name: "Pykara Lake",[\s\S]*?image: "[^"]+",/g,
  'name: "Pykara Lake",\n    description: "A pristine lake surrounded by shola forests, offering breathtaking beauty and a boat house.",\n    image: "/images/dest_new_pykara.png",'
);

content = content.replace(
  /name: "Avalanche Lake",[\s\S]*?image: "[^"]+",/g,
  'name: "Avalanche Lake",\n    description: "A hidden gem at 2,400m altitude, a pristine blue lake with spectacular mountain views.",\n    image: "/images/dest_new_avalanche.png",'
);

content = content.replace(
  /name: "Mudumalai Reserve",[\s\S]*?image: "[^"]+",/g,
  'name: "Mudumalai Reserve",\n    description: "A UNESCO World Heritage wildlife sanctuary home to tigers, elephants, leopards and rich flora.",\n    image: "/images/dest_new_mudumalai.png",'
);

content = content.replace(
  /name: "Coonoor",[\s\S]*?image: "[^"]+",/g,
  'name: "Coonoor",\n    description: "A charming hill station nestled at 1,858m with tea estates, colonial bungalows, and misty valleys.",\n    image: "/images/dest_new_coonoor.png",'
);

fs.writeFileSync('lib/data.ts', content);
console.log('Successfully updated destinations in lib/data.ts');
