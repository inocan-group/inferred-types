/**
 * Find Runtime Performance Benchmarks
 * 
 * Measures runtime performance of find() function with various operations
 * and data sizes to establish performance baselines.
 */

import { bench, describe } from 'vitest';
import { find } from 'inferred-types/runtime';

// =============================================================================
// TEST DATA SETS
// =============================================================================

const smallArray = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `item-${i}`,
    value: i * 10,
    category: i % 3 === 0 ? 'alpha' : i % 3 === 1 ? 'beta' : 'gamma'
}));

const mediumArray = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `item-${i}`,
    value: i * 10,
    category: i % 3 === 0 ? 'alpha' : i % 3 === 1 ? 'beta' : 'gamma'
}));

const largeArray = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    name: `item-${i}`,
    value: i * 10,
    category: i % 3 === 0 ? 'alpha' : i % 3 === 1 ? 'beta' : 'gamma'
}));

const stringArray = Array.from({ length: 1000 }, (_, i) => `test-string-${i}`);

// =============================================================================
// BASIC EQUALITY OPERATIONS
// =============================================================================

describe('find() with equals operation', () => {
    bench('small array (10 items)', () => {
        find('equals', 5)(smallArray.map(item => item.id));
    });

    bench('medium array (1k items)', () => {
        find('equals', 500)(mediumArray.map(item => item.id));
    });

    bench('large array (100k items)', () => {
        find('equals', 50000)(largeArray.map(item => item.id));
    });
});

// =============================================================================
// STRING OPERATIONS
// =============================================================================

describe('find() with string operations', () => {
    bench('startsWith - small array', () => {
        find('startsWith', 'test-string-5')(stringArray);
    });

    bench('endsWith - small array', () => {
        find('endsWith', '-500')(stringArray);
    });

    bench('contains - small array', () => {
        find('contains', 'string-5')(stringArray);
    });
});

// =============================================================================
// OBJECT KEY OPERATIONS
// =============================================================================

describe('find() with object operations', () => {
    bench('objectKeyEquals - small objects', () => {
        find('objectKeyEquals', 'category', 'beta')(smallArray);
    });

    bench('objectKeyEquals - medium objects', () => {
        find('objectKeyEquals', 'category', 'beta')(mediumArray);
    });

    bench('objectKeyEquals - large objects', () => {
        find('objectKeyEquals', 'category', 'beta')(largeArray);
    });
});

// =============================================================================
// NUMERIC OPERATIONS
// =============================================================================

describe('find() with numeric operations', () => {
    const numericArray = Array.from({ length: 1000 }, (_, i) => i);

    bench('greaterThan operation', () => {
        find('greaterThan', 500)(numericArray);
    });

    bench('lessThan operation', () => {
        find('lessThan', 500)(numericArray);
    });

    bench('between operation', () => {
        find('between', 400, 600)(numericArray);
    });
});

// =============================================================================
// EDGE CASES
// =============================================================================

describe('find() edge cases', () => {
    bench('not found in large array', () => {
        find('equals', 'non-existent')(stringArray);
    });

    bench('first item match', () => {
        find('equals', 'test-string-0')(stringArray);
    });

    bench('last item match', () => {
        find('equals', 'test-string-999')(stringArray);
    });
});

// =============================================================================
// COMPARISON WITH NATIVE ARRAY.FIND
// =============================================================================

describe('find() vs native Array.find', () => {
    bench('find() with equals', () => {
        find('equals', 500)(mediumArray.map(item => item.id));
    });

    bench('native Array.find with ===', () => {
        mediumArray.map(item => item.id).find(id => id === 500);
    });

    bench('find() with objectKeyEquals', () => {
        find('objectKeyEquals', 'category', 'beta')(mediumArray);
    });

    bench('native Array.find with object access', () => {
        mediumArray.find(item => item.category === 'beta');
    });
});