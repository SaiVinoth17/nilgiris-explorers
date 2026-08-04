const fs = require('fs');

let content = fs.readFileSync('components/home/BookingWidget.tsx', 'utf8');

// 1. Ensure ChevronDown is imported
if (!content.includes('ChevronDown')) {
    content = content.replace('import { MapPin', 'import { MapPin, ChevronDown');
}

// 2. Fix all `<select>` and `<input>` wrapper layouts.
// All left icons should be: `absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]`
// All inputs should have: `input-field pl-11`

// Fix Left Icons
content = content.replace(/absolute left-3 top-1\/2 -translate-y-1\/2 w-4 h-4/g, 'absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]');
content = content.replace(/absolute left-3 top-3\.5 w-4 h-4/g, 'absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]');

// Fix Input Padding
content = content.replace(/className="input-field pl-9/g, 'className="input-field pl-11');

// Add ChevronDown to all selects
// The easiest way is to find `</select>` and add `<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/40 pointer-events-none" />` right after it.
const chevronHTML = `\n                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/40 pointer-events-none" />`;

content = content.replace(/<\/select>/g, `</select>${chevronHTML}`);

// We also need to fix the Free Custom Planning section and CTA alignment.
// The user said: "Align the Free Custom Planning section and CTA button on the same visual baseline."
// This means ensuring the footer of the widget uses `items-center`.
// Let's find: `className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"`
content = content.replace(/flex flex-col sm:flex-row justify-between items-start sm:items-center/g, 'flex flex-col md:flex-row justify-between items-center text-center md:text-left');

// Standardize labels to sit exactly on the baseline.
// `mb-1.5` to `mb-2.5` to give a bit more breathing room and align exactly.
content = content.replace(/mb-1\.5/g, 'mb-2');

fs.writeFileSync('components/home/BookingWidget.tsx', content);
console.log('Fixed BookingWidget.tsx');
