const { parentPort, workerData } = require('worker_threads');
const { findLongestSequenceCore } = require('../core');

const { indexedPuzzles, starters } = workerData;

const result = findLongestSequenceCore(indexedPuzzles, starters);

parentPort.postMessage(result);