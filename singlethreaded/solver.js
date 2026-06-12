const { findLongestSequenceCore } = require('../core');

function findLongestSequence(puzzles) {
    const indexedPuzzles = puzzles.map((str, index) => ({
        id: index,
        start: +str.slice(0, 2),
        end: +str.slice(-2)
    }));

    const endsSet = new Set(indexedPuzzles.map(p => p.end));
    let startingCandidates = indexedPuzzles.filter(p => !endsSet.has(p.start)).map(p => p.id);

    if (startingCandidates.length === 0) {
        startingCandidates = indexedPuzzles.map(p => p.id);
    }

    console.log(`Unique entry points found: ${startingCandidates.length}`);

    const { maxLen, bestPath } = findLongestSequenceCore(puzzles, startingCandidates);

    let resultString = "";
    if (bestPath.length > 0) {
        const fullPuzzlesArray = bestPath.map(id => puzzles[id]);
        resultString = fullPuzzlesArray.join(" ");
    }

    return { maxLen, resultString };
}

module.exports = { findLongestSequence };