import type { Expect, Find, Test, UnionToTuple } from "inferred-types/types";
/**
 * Find Type Performance Tests
 * 
 * Tests type-level performance of Find<> utility with various complexity levels
 * to identify type inference bottlenecks and union explosion issues.
 */

// =============================================================================
// UNION SIZE MEASUREMENT UTILITIES
// =============================================================================

type UnionSize<T> = UnionToTuple<T>["length"];

// =============================================================================
// TEST DATA TYPES
// =============================================================================

// Small lists
type SmallNumberList = [1, 2, 3, 4, 5];
type SmallStringList = ["a", "b", "c", "d", "e"];
type SmallObjectList = [
    { id: 1, name: "alice" },
    { id: 2, name: "bob" },
    { id: 3, name: "charlie" }
];

// Medium lists (to test recursion limits)
type MediumNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
type MediumStringList = [
    "apple", "banana", "cherry", "date", "elderberry",
    "fig", "grape", "honeydew", "kiwi", "lemon",
    "mango", "nectarine", "orange", "papaya", "quince"
];

// Complex nested objects
type ComplexObjectList = [
    { id: 1, user: { name: "alice", age: 25 }, settings: { theme: "dark" } },
    { id: 2, user: { name: "bob", age: 30 }, settings: { theme: "light" } },
    { id: 3, user: { name: "charlie", age: 35 }, settings: { theme: "auto" } }
];

// =============================================================================
// BASIC FIND OPERATIONS - TYPE PERFORMANCE
// =============================================================================

/**
 * Test basic equality operations with different list sizes
 */

// Small list performance
type FindInSmallNumbers = Find<SmallNumberList, "equals", 3>;
type FindInSmallStrings = Find<SmallStringList, "equals", "c">;
type FindInSmallObjects = Find<SmallObjectList, "objectKeyEquals", "id", 2>;

// Medium list performance (test recursion depth)
type FindInMediumNumbers = Find<MediumNumberList, "equals", 15>;
type FindInMediumStrings = Find<MediumStringList, "equals", "mango">;

// Performance measurement for small lists
type SmallNumberFindSize = UnionSize<FindInSmallNumbers>;
type SmallStringFindSize = UnionSize<FindInSmallStrings>;
type SmallObjectFindSize = UnionSize<FindInSmallObjects>;

// =============================================================================
// STRING OPERATION PERFORMANCE
// =============================================================================

/**
 * Test string operations that may cause union explosions
 */

type StringList = ["testing", "typescript", "performance", "benchmark", "testing123"];

// String operations
type FindStartsWith = Find<StringList, "startsWith", "test">;
type FindEndsWith = Find<StringList, "endsWith", "ing">;
type FindContains = Find<StringList, "contains", "type">;

// Measure string operation performance
type StartsWithFindSize = UnionSize<FindStartsWith>;
type EndsWithFindSize = UnionSize<FindEndsWith>;
type ContainsFindSize = UnionSize<FindContains>;

// =============================================================================
// COMPLEX NESTED OPERATIONS
// =============================================================================

/**
 * Test performance with deeply nested object structures
 */

type NestedFindResult = Find<ComplexObjectList, "objectKeyEquals", "user.name", "bob">;
type NestedFindSize = UnionSize<NestedFindResult>;

// =============================================================================
// PROGRESSIVE COMPLEXITY TESTING
// =============================================================================

/**
 * Test performance with progressively larger lists to find breaking points
 */

// Build progressively larger lists
type TinyList = [1, 2, 3];
type SmallList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type MediumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// Test find performance at each level
type TinyFindResult = Find<TinyList, "equals", 2>;
type SmallFindResult = Find<SmallList, "equals", 5>;
type MediumFindResult = Find<MediumList, "equals", 15>;

// Measure complexity growth
type TinyFindSize = UnionSize<TinyFindResult>;
type SmallFindSize = UnionSize<SmallFindResult>;
type MediumFindSize = UnionSize<MediumFindResult>;

// =============================================================================
// TYPE SAFETY VALIDATION
// =============================================================================

/**
 * Ensure type correctness while measuring performance
 */

type cases = [
    // Basic equality tests
    Expect<Test<FindInSmallNumbers, "equals", 3>>,
    Expect<Test<FindInSmallStrings, "equals", "c">>,
    
    // Object operations
    Expect<Test<FindInSmallObjects, "equals", { id: 2, name: "bob" }>>,
    
    // String operations should return correct types
    Expect<Test<FindStartsWith, "equals", "testing" | "testing123">>,
    Expect<Test<FindEndsWith, "equals", "testing">>,
    Expect<Test<FindContains, "equals", "typescript">>,
    
    // Not found cases should return undefined
    Expect<Test<Find<SmallNumberList, "equals", 99>, "equals", undefined>>,
    Expect<Test<Find<SmallStringList, "equals", "xyz">, "equals", undefined>>,
];

// =============================================================================
// PERFORMANCE COMPARISON DATA
// =============================================================================

/**
 * Collect all performance metrics for analysis
 */
export type FindTypePerformanceResults = {
    // Basic operation sizes
    basicOperations: {
        smallNumberSize: SmallNumberFindSize;
        smallStringSize: SmallStringFindSize;
        smallObjectSize: SmallObjectFindSize;
    };
    
    // String operation sizes
    stringOperations: {
        startsWithSize: StartsWithFindSize;
        endsWithSize: EndsWithFindSize;
        containsSize: ContainsFindSize;
    };
    
    // Nested operation sizes
    nestedOperations: {
        nestedFindSize: NestedFindSize;
    };
    
    // Progressive complexity
    progressiveComplexity: {
        tinySize: TinyFindSize;
        smallSize: SmallFindSize;
        mediumSize: MediumFindSize;
    };
};

// =============================================================================
// RECURSION DEPTH TESTING
// =============================================================================

/**
 * Test Find operations at the edge of TypeScript's recursion limits
 */

// Test with moderately large list (should work)
type ModerateList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40
];

type ModerateFindResult = Find<ModerateList, "equals", 35>;
type ModerateFindSize = UnionSize<ModerateFindResult>;

// =============================================================================
// COMPARATIVE ANALYSIS
// =============================================================================

/**
 * Compare Find performance against simpler type operations
 */

// Simple tuple indexing (baseline)
type DirectAccess = SmallNumberList[2]; // Should be 3
type DirectAccessSize = UnionSize<DirectAccess>;

// Compare with Find operation
type FindAccess = Find<SmallNumberList, "equals", 3>;
type FindAccessSize = UnionSize<FindAccess>;

export type PerformanceComparison = {
    directAccessComplexity: DirectAccessSize;
    findAccessComplexity: FindAccessSize;
    performanceRatio: DirectAccessSize extends FindAccessSize ? "equal" : "different";
};

// Force type evaluation for performance testing
type _ForceFindPerformanceEvaluation = FindTypePerformanceResults extends object ? true : false;
type _ForcePerformanceComparisonEvaluation = PerformanceComparison extends object ? true : false;