const fs = require('fs');

let content = fs.readFileSync('components/home/BookingWidget.tsx', 'utf8');

// Remove the manual ChevronDown injected earlier to prevent double arrows
content = content.replace(/<ChevronDown className="absolute right-4 top-1\/2 -translate-y-1\/2 w-\[18px\] h-\[18px\] text-white\/40 pointer-events-none" \/>\n/g, '');
content = content.replace(/<ChevronDown className="absolute right-4 top-1\/2 -translate-y-1\/2 w-\[18px\] h-\[18px\] text-white\/40 pointer-events-none" \/>/g, '');

fs.writeFileSync('components/home/BookingWidget.tsx', content);
console.log('Removed manual Chevrons');
