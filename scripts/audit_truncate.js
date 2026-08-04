const fs = require('fs');
const path = require('path');

function search(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            search(full);
        } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
            const content = fs.readFileSync(full, 'utf8');
            if (content.includes('truncate') && !content.includes('min-w-0 flex-1')) {
                console.log(full);
            }
        }
    }
}
search('components');
search('app');
