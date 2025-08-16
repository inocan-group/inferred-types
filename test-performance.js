/**
 * Simple performance test to measure endsWith vs startsWith
 */

import { endsWith, startsWith } from './modules/runtime/src/type-guards/higher-order/index.js';

const testArray = Array.from({ length: 10000 }, (_, i) => `test-string-${i}`);

function benchmark(name, fn, iterations = 1000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    const time = end - start;
    console.log(`${name}: ${time.toFixed(2)}ms (${(time / iterations).toFixed(4)}ms per iteration)`);
    return time;
}

console.log('Performance comparison: endsWith vs startsWith');
console.log('Testing with array of 10,000 strings, 1000 iterations each\n');

// Test startsWith
const startsWithTime = benchmark('startsWith', () => {
    testArray.filter(item => startsWith('test-string-5')(item));
});

// Test endsWith  
const endsWithTime = benchmark('endsWith', () => {
    testArray.filter(item => endsWith('-500')(item));
});

console.log(`\nPerformance ratio: endsWith is ${(endsWithTime / startsWithTime).toFixed(1)}x slower than startsWith`);