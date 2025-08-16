// Test that would have caused "Type instantiation is excessively deep" with old implementation
import type { And, Or } from "./modules/types/dist/index.js";

// This would have been problematic with the old complex implementation
type Level1And = And<[true, true, true]>;
type Level1Or = Or<[false, true, false]>;
type Level2And = And<[Level1And, Level1Or, true]>;
type Level2Or = Or<[Level2And, false]>;
type VeryDeepNesting = And<[Level2Or, true, true]>;

// Large array that would stress the old recursive implementation
type LargeArrayTest = And<[
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, false
]>;

// Function types that require the Reduce logic
type FunctionComplexity = And<[
    () => true,
    () => And<[true, true]>,
    () => Or<[false, true]>,
    () => boolean,
    () => false
]>;

// Combination that would have caused exponential complexity growth
type ExponentialTest = And<[
    VeryDeepNesting,
    LargeArrayTest extends false ? true : false,
    FunctionComplexity extends false ? true : false
]>;

// Result validation - all should resolve to concrete types
type ResultTypes = [
    VeryDeepNesting,      // Should be boolean or concrete true/false
    LargeArrayTest,       // Should be false (ends with false)
    FunctionComplexity,   // Should be false (ends with () => false)
    ExponentialTest       // Should be boolean or concrete
];

export type {
    VeryDeepNesting,
    LargeArrayTest, 
    FunctionComplexity,
    ExponentialTest,
    ResultTypes
};