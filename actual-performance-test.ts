// Test actual And/Or performance by importing from the built modules
import type { And, Or } from "./modules/types/dist/index.js";

// Test 1: Simple case (should be fast)
type SimpleAnd = And<[true, true, false]>;
type SimpleOr = Or<[false, false, true]>;

// Test 2: Medium complexity
type MediumAnd = And<[
    true, true, true, true, true,
    true, true, true, true, false
]>;

type MediumOr = Or<[
    false, false, false, false, false,
    false, false, false, false, true
]>;

// Test 3: Large arrays (stress test)
type LargeAnd = And<[
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    false
]>;

// Test 4: Function types (tests the Reduce logic)
type FunctionAnd = And<[
    () => true,
    () => true, 
    () => false
]>;

// Test 5: Nested combinations
type NestedComplexity = And<[
    SimpleAnd,
    MediumOr,
    true
]>;

// Test 6: Error handling
type ErrorHandling = And<[true, "invalid"], { err: "error" }>;

// Validation that results are correct
type ResultValidation = [
    SimpleAnd extends false ? true : false,      // true & true & false = false
    SimpleOr extends true ? true : false,        // false | false | true = true
    MediumAnd extends false ? true : false,      // ends with false
    MediumOr extends true ? true : false,        // ends with true
    LargeAnd extends false ? true : false,       // ends with false
    FunctionAnd extends false ? true : false,    // () => false makes it false
    NestedComplexity extends false ? true : false // includes false result
];

export type {
    SimpleAnd,
    SimpleOr,
    MediumAnd,
    MediumOr,
    LargeAnd,
    FunctionAnd,
    NestedComplexity,
    ErrorHandling,
    ResultValidation
};