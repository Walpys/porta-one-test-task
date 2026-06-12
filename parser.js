const fs = require('fs');
const path = require('path');

function parseFile(fileName) {
    try {
        const filePath = path.resolve(fileName);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        
        return rawData.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    } catch (error) {
        console.error(`Error while reading file ${fileName}:`, error.message);
        process.exit(1);
    }
}

module.exports = { parseFile };