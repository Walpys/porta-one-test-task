const path = require('path');
const os = require('os');
const { Worker } = require('worker_threads');

function runWorker(puzzles, starters) {
    return new Promise((resolve) => {
        if (!starters || starters.length === 0) {
            return resolve({ maxLen: 0, bestPath: [] });
        }

        const worker = new Worker(path.join(__dirname, 'worker.js'), {
            workerData: { puzzles, starters }
        });

        let localResult = { maxLen: 0, bestPath: [] };

        worker.on('message', (msg) => {
            localResult = msg;
        });

        worker.on('error', (err) => {
            console.error('Worker error:', err);
        });

        worker.on('exit', () => {
            resolve(localResult);
        });
    });
}


async function findLongestSequenceMultithreaded(puzzles) {
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
    const cpusCount = os.cpus().length;
    const threadCount = cpusCount > 4 ? Math.floor(cpusCount / 2) : cpusCount;
    console.log(`Allocating pool on ${threadCount} worker threads (Total CPU threads: ${cpusCount})`);

    const chunks = Array.from({ length: threadCount }, () => []);
    startingCandidates.forEach((starterId, index) => {
        chunks[index % threadCount].push(starterId);
    });

    const workerPromises = chunks.map(chunk => runWorker(puzzles, chunk));
    const results = await Promise.all(workerPromises);

    let globalMaxLen = 0;
    let globalBestPath = [];

    for (const res of results) {
        if (res.maxLen > globalMaxLen) {
            globalMaxLen = res.maxLen;
            globalBestPath = res.bestPath;
        }
    }

    let resultString = "";
    if (globalBestPath.length > 0) {
        resultString = puzzles[globalBestPath[0]];

        for (let i = 1; i < globalBestPath.length; i++) {
            const nextPuzzle = puzzles[globalBestPath[i]];
            resultString += nextPuzzle.slice(2);
        }
    }

    return { maxLen: globalMaxLen, resultString };
}

module.exports = { findLongestSequenceMultithreaded };