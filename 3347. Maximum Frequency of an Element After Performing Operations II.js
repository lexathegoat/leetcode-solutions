/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function(nums, k, numOperations) {
    const cnt = new Map();
    const diff = new Map();

    for (const x of nums) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
    }

    for (const x of nums) {
        const start = x - k;
        const endPlusOne = x + k + 1;

        diff.set(start, (diff.get(start) || 0) + 1);
        diff.set(endPlusOne, (diff.get(endPlusOne) || 0) - 1);

        if (!diff.has(x)) diff.set(x, 0);
    }

    const keys = Array.from(diff.keys()).sort((a, b) => a - b);

    let running = 0;
    let result = 0;

    for (const key of keys) {
        running += diff.get(key);
        const originalCnt = cnt.get(key) || 0;
        const possible = Math.min(running, originalCnt + numOperations);
        result = Math.max(result, possible);
    }

    return result;
};
