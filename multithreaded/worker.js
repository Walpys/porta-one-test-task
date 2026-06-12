const { parentPort, workerData } = require('worker_threads');
const { findLongestSequenceCore } = require('../core');

const { puzzles, starters } = workerData;

const result = findLongestSequenceCore(puzzles, starters);

parentPort.postMessage(result);