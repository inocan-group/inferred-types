/**
 * Performance test comparing endsWith vs startsWith
 */

import { describe, it, expect } from 'vitest';
import { endsWith, startsWith } from 'inferred-types/runtime';

describe('Performance comparison: endsWith vs startsWith', () => {
    const testData = Array.from({ length: 1000 }, (_, i) => `test-string-${i}`);
    
    it('should measure startsWith performance', () => {
        const startsWithFn = startsWith('test-string-5');
        
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            testData.filter(item => startsWithFn(item));
        }
        const end = performance.now();
        
        console.log(`startsWith: ${(end - start).toFixed(2)}ms`);
        expect(end - start).toBeGreaterThan(0);
    });
    
    it('should measure endsWith performance', () => {
        const endsWithFn = endsWith('-500');
        
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            testData.filter(item => endsWithFn(item));
        }
        const end = performance.now();
        
        console.log(`endsWith: ${(end - start).toFixed(2)}ms`);
        expect(end - start).toBeGreaterThan(0);
    });
    
    it('should verify both functions work correctly', () => {
        const startsWithFn = startsWith('test-string-5');
        const endsWithFn = endsWith('-500');
        
        const startsWithResults = testData.filter(item => startsWithFn(item));
        const endsWithResults = testData.filter(item => endsWithFn(item));
        
        console.log(`startsWith found ${startsWithResults.length} items`);
        console.log(`endsWith found ${endsWithResults.length} items`);
        
        expect(startsWithResults.length).toBe(10); // test-string-5, test-string-50-59
        expect(endsWithResults.length).toBe(1);   // test-string-500
    });
});