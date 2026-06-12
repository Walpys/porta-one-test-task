function findLongestSequenceCore(puzzles, starters) {
    const indexedPuzzles = puzzles.map((str, index) => ({
        id: index,
        str: str,
        start: +str.slice(0, 2),
        end: +str.slice(-2)
    }));

    const graph = Array.from({ length: 100 }, () => []);
    for (let i = 0; i < indexedPuzzles.length; i++) {
        const p = indexedPuzzles[i];
        graph[p.start].push(p.id);
    }

    let maxLen = 0;
    let bestPath = [];
    
    const currentPathIds = [];
    const used = new Uint8Array(indexedPuzzles.length);

    function dfs(currentTwoDigits) {
        if (currentPathIds.length > maxLen) {
            maxLen = currentPathIds.length;
            bestPath = [...currentPathIds];
        }

        const candidates = graph[currentTwoDigits];
        if (!candidates) return;
        const len = candidates.length;

        for (let i = 0; i < len; i++) {
            const nextId = candidates[i];
            
            if (used[nextId] === 1) continue;

            const nextPuzzle = indexedPuzzles[nextId];

            used[nextId] = 1;
            currentPathIds.push(nextId);

            dfs(nextPuzzle.end);

            currentPathIds.pop();
            used[nextId] = 0;
        }
    }

    for (let i = 0; i < starters.length; i++) {
        const firstPuzzle = indexedPuzzles[starters[i]];
        if (!firstPuzzle) continue;
        
        used[firstPuzzle.id] = 1;
        currentPathIds.push(firstPuzzle.id);
        
        dfs(firstPuzzle.end);
        
        currentPathIds.pop();
        used[firstPuzzle.id] = 0;
    }

    return { maxLen, bestPath };
}

module.exports = { findLongestSequenceCore };