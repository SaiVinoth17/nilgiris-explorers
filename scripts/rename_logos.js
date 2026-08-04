const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            if (content.includes('primary-logo.png')) {
                content = content.replace(/primary-logo\.png/g, 'primary-logo-v2.png');
                modified = true;
            }
            if (content.includes('horizontal-logo.png')) {
                content = content.replace(/horizontal-logo\.png/g, 'horizontal-logo-v2.png');
                modified = true;
            }
            if (content.includes('compact-logo.png')) {
                content = content.replace(/compact-logo\.png/g, 'compact-logo-v2.png');
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDirectory('app');
processDirectory('components');
console.log('Done renaming logo references!');
