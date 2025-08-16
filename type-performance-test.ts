// Type Performance Test for And<T> and Or<T> optimizations
import type { And } from "./modules/types/src/boolean-logic/combinators/And";
import type { Or } from "./modules/types/src/boolean-logic/combinators/Or";

// Test 1: Deep Nesting - Measure type instantiation depth
type DeepAnd = And<[
    And<[true, true, true, true, true]>,
    And<[true, true, true, true, true]>,
    And<[true, true, true, true, true]>,
    And<[true, true, true, true, true]>,
    And<[true, true, true, true, true]>
]>;

type DeepOr = Or<[
    Or<[false, false, false, false, false]>,
    Or<[false, false, false, false, false]>,
    Or<[false, false, false, false, false]>,
    Or<[false, false, false, false, false]>,
    Or<[false, false, false, false, false]>
]>;

// Test 2: Large Arrays - Measure performance with many elements
type LargeAnd = And<[
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, false
]>;

type LargeOr = Or<[
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, true
]>;

// Test 3: Function Types - Measure complexity with functions
type FunctionAnd = And<[
    () => true,
    () => true,
    () => boolean,
    () => true,
    () => false
]>;

type FunctionOr = Or<[
    () => false,
    () => false,
    () => boolean,
    () => false,
    () => true
]>;

// Test 4: Mixed Types with Error Handling
type MixedAndWithErrors = And<[true, "invalid", false], { err: "error" }>;
type MixedOrWithErrors = Or<[false, "invalid", true], { err: "error" }>;

// Test 5: Wide Boolean Types
type WideBooleanAnd = And<[boolean, true, false, boolean]>;
type WideBooleanOr = Or<[boolean, false, true, boolean]>;

// Test 6: Complex Nested Scenario
type ComplexNested = And<[
    Or<[false, true, false]>,
    And<[true, true, true]>,
    Or<[boolean, false]>,
    And<[() => true, () => boolean]>
]>;

// Test 7: Type Resolution Validation
type cases = [
    // Verify results are correct
    DeepAnd extends true ? true : false,
    DeepOr extends false ? true : false,
    LargeAnd extends false ? true : false,
    LargeOr extends true ? true : false,
    FunctionAnd extends false ? true : false,
    FunctionOr extends true ? true : false,
    WideBooleanAnd extends boolean ? true : false,
    WideBooleanOr extends boolean ? true : false,
    ComplexNested extends boolean ? true : false
];

// Export types for compilation timing tests
export type {
    DeepAnd,
    DeepOr,
    LargeAnd,
    LargeOr,
    FunctionAnd,
    FunctionOr,
    MixedAndWithErrors,
    MixedOrWithErrors,
    WideBooleanAnd,
    WideBooleanOr,
    ComplexNested
};