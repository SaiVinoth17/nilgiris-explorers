const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('framer-motion')) {
    // Remove import
    content = content.replace(/import\s+{([^}]*)}\s+from\s+["']framer-motion["'];?/g, '');
    
    // Replace <AnimatePresence> and </AnimatePresence>
    content = content.replace(/<AnimatePresence[^>]*>/g, '<>');
    content = content.replace(/<\/AnimatePresence>/g, '</>');

    // Replace <motion.xyz ...> with <xyz ...>
    content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
    content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

    // Clean up common framer-motion props
    // We will match initial, animate, exit, transition, whileHover, whileTap, whileInView, viewport, variants
    const propsToRemove = ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'whileInView', 'viewport', 'variants', 'layout', 'layoutId'];
    
    propsToRemove.forEach(prop => {
      // Regex to remove `prop={...}` or `prop="..."`
      // This handles multi-line objects reasonably well by matching curly braces, but simple regex is tough for deeply nested.
      // We will do a basic replacement for single/double curlies and strings
      const regex = new RegExp(`\\s+${prop}=(?:{[^{}]*(?:{[^{}]*}[^{}]*)*[^{}]*}|"[^"]*"|'[^']*')`, 'g');
      content = content.replace(regex, '');
      
      // Also catch multiline objects if they have max 2 levels of nesting
      const multilineRegex = new RegExp(`\\s+${prop}={{[^}]*}}`, 'g');
      content = content.replace(multilineRegex, '');
    });

    // Add a simple fade-in class to items that had motion
    content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
      // Just a light touch, we won't add classes blindly, but we could.
      return match;
    });

    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log(`Modified ${file}`);
  }
});

console.log(`Removed framer-motion from ${modifiedCount} files.`);
