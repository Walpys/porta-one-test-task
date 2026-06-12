const { parseFile } = require('../parser');
const { findLongestSequence } = require('./solver');

function main() {
    const fileName = process.argv[2] || '../source.txt';

    console.log('--- Processing initialization (Singlethreaded) ---');

    const puzzles = parseFile(fileName);
    console.log(`Loaded items: ${puzzles.length}`);

    const startTime = performance.now(); 

    const result = findLongestSequence(puzzles);

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2); 

    console.log('\n================ EXECUTION TRACE ================');
    console.log(`Sequence length: ${result.maxLen} / ${puzzles.length} items used`);
    console.log(`Processing time: ${duration} ms`);
    console.log(`Result sequence:\n${result.resultString}`);
    console.log('=================================================');
}

main();