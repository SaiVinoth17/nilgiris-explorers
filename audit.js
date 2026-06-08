const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.next', '.git'];
const includeExts = ['.tsx', '.ts', '.css'];
const searchRegex = /(z-\d+|z-\[\d+\]|fixed|absolute|backdrop-blur|bg-black\/|overlay|modal|drawer)/g;

function searchFiles(dir) {
    const results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                results.push(...searchFiles(fullPath));
            }
        } else {
            const ext = path.extname(file);
            if (includeExts.includes(ext)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (searchRegex.test(line)) {
                        results.push(`${fullPath}:${index + 1}: ${line.trim()}`);
                    }
                });
            }
        }
    }
    return results;
}

const res = searchFiles('.');
fs.writeFileSync('zindex_audit.txt', res.join('\n'));
console.log(`Found ${res.length} matches. Saved to zindex_audit.txt`);
