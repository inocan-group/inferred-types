// Simple type performance comparison without complex imports
// We'll define minimal versions to test instantiation depth

// Current optimized versions (simplified for testing)
type OptimizedAnd<T extends readonly boolean[]> = 
    number extends T["length"] ? boolean :
    [] extends T ? false :
    T extends readonly [infer First, ...infer Rest] 
        ? First extends false 
            ? false 
            : Rest extends readonly boolean[]
                ? OptimizedAnd<Rest>
                : boolean
        : true;

type OptimizedOr<T extends readonly boolean[]> = 
    number extends T["length"] ? boolean :
    [] extends T ? false :
    T extends readonly [infer First, ...infer Rest] 
        ? First extends true 
            ? true 
            : Rest extends readonly boolean[]
                ? OptimizedOr<Rest>
                : boolean
        : false;

// Legacy-style complex versions (mimicking old behavior)
type LegacyAnd<T extends readonly boolean[], Depth extends readonly unknown[] = []> = 
    Depth["length"] extends 50 ? boolean : // Prevent infinite recursion
    T extends readonly [] ? false :
    T extends readonly [infer First, ...infer Rest] 
        ? First extends false 
            ? false 
            : Rest extends readonly boolean[]
                ? First extends true
                    ? LegacyAnd<Rest, [...Depth, unknown]>
                    : First extends boolean
                        ? boolean
                        : LegacyAnd<Rest, [...Depth, unknown]>
                : boolean
        : true;

// Test scenarios with increasing complexity
type SimpleTest = [
    OptimizedAnd<[true, true, true]>,
    OptimizedOr<[false, false, true]>,
    LegacyAnd<[true, true, true]>
];

type MediumComplexity = [
    OptimizedAnd<[true, true, true, true, true, true, true, true, true, false]>,
    OptimizedOr<[false, false, false, false, false, false, false, false, false, true]>,
    LegacyAnd<[true, true, true, true, true, true, true, true, true, false]>
];

type HighComplexity = [
    OptimizedAnd<[
        true, true, true, true, true, true, true, true, true, true,
        true, true, true, true, true, true, true, true, true, true,
        false
    ]>,
    OptimizedOr<[
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        true
    ]>
];

// Nested complexity test
type NestedTest = OptimizedAnd<[
    OptimizedOr<[false, true]>,
    OptimizedAnd<[true, true]>,
    OptimizedOr<[false, false, true]>
]>;

export type {
    SimpleTest,
    MediumComplexity,
    HighComplexity,
    NestedTest
};