const { parseFile } = require('../parser');
const { findLongestSequenceMultithreaded } = require('./solver');
async function main() {
    const fileName = process.argv[2] || '../source.txt';

    console.log('--- Processing initialization (Multithreaded) ---');

    const puzzles = parseFile(fileName);
    console.log(`Loaded items: ${puzzles.length}`);

    const startTime = performance.now(); 

    const result = await findLongestSequenceMultithreaded(puzzles);

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2); 

    console.log('\n================ EXECUTION TRACE ================');
    console.log(`Sequence length: ${result.maxLen} / ${puzzles.length} items used`);
    console.log(`Processing time: ${duration} ms`);
    console.log(`Result sequence:\n${result.resultString}`);
    console.log('=================================================');
}

main();