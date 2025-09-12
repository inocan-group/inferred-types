import type { Compare } from "inferred-types/types";

/**
 * Compare Type Performance Benchmarking
 * 
 * Tests the performance impact of our optimizations:
 * 1. Fast path for simple ISO date strings
 * 2. Complexity levels (weak, normal, strong)
 * 3. Early termination patterns
 */

// Test data types for progressive complexity
type SimpleDate = "2023-01-15";
type SimpleDateLater = "2023-01-16";

// =============================================================================
// BASELINE PERFORMANCE TESTS
// =============================================================================

// Test datetime operations with normal complexity (default)
type NormalComplexityComparisons = {
    sameDay: Compare<SimpleDate, "sameDay", [SimpleDate]>;
    sameDayFalse: Compare<SimpleDate, "sameDay", [SimpleDateLater]>;
    sameMonth: Compare<SimpleDate, "sameMonth", [SimpleDate]>;
    sameYear: Compare<SimpleDate, "sameYear", [SimpleDate]>;
    after: Compare<SimpleDateLater, "after", [SimpleDate]>;
    before: Compare<SimpleDate, "before", [SimpleDateLater]>;
};

// Test with weak complexity mode - should be faster
type WeakComplexityComparisons = {
    sameDay: Compare<SimpleDate, "sameDay", [SimpleDate], "weak">;
    sameDayFalse: Compare<SimpleDate, "sameDay", [SimpleDateLater], "weak">;
    sameMonth: Compare<SimpleDate, "sameMonth", [SimpleDate], "weak">;
    sameYear: Compare<SimpleDate, "sameYear", [SimpleDate], "weak">;
    after: Compare<SimpleDateLater, "after", [SimpleDate], "weak">;
    before: Compare<SimpleDate, "before", [SimpleDateLater], "weak">;
};

// Test with strong complexity mode - same as normal for now
type StrongComplexityComparisons = {
    sameDay: Compare<SimpleDate, "sameDay", [SimpleDate], "strong">;
    sameDayFalse: Compare<SimpleDate, "sameDay", [SimpleDateLater], "strong">;
    sameMonth: Compare<SimpleDate, "sameMonth", [SimpleDate], "strong">;
    sameYear: Compare<SimpleDate, "sameYear", [SimpleDate], "strong">;
    after: Compare<SimpleDateLater, "after", [SimpleDate], "strong">;
    before: Compare<SimpleDate, "before", [SimpleDateLater], "strong">;
};

// =============================================================================
// FAST PATH VALIDATION TESTS
// =============================================================================

// Test that simple ISO date patterns work with our fast path
type FastPathTests = {
    // These should use the FastPath__DateCompare
    isoDateSameDay: Compare<"2023-01-15", "sameDay", ["2023-01-15"]>;
    isoDateSameMonth: Compare<"2023-01-15", "sameMonth", ["2023-02-15"]>;
    isoDateSameYear: Compare<"2023-01-15", "sameYear", ["2023-12-31"]>;
    
    // These should fall back to normal processing
    numberDate: Compare<1640995200000, "sameDay", [1640995200000]>;
    objectDate: Compare<{year: 2023}, "sameDay", [{year: 2023}]>;
};

// =============================================================================
// EDGE CASES THAT COMMONLY CAUSE STACK DEPTH ISSUES
// =============================================================================

type EdgeCaseComparisons = {
    leapYear: Compare<"2024-02-29", "sameDay", ["2024-02-29"]>;
    monthBoundary: Compare<"2023-03-01", "sameDay", ["2023-02-28"]>;
    yearBoundary: Compare<"2024-01-01", "sameDay", ["2023-12-31"]>;
    
    // Test weak mode on edge cases (should be more performant)
    leapYearWeak: Compare<"2024-02-29", "sameDay", ["2024-02-29"], "weak">;
    monthBoundaryWeak: Compare<"2023-03-01", "sameDay", ["2023-02-28"], "weak">;
    yearBoundaryWeak: Compare<"2024-01-01", "sameDay", ["2023-12-31"], "weak">;
};

// =============================================================================
// CORRECTNESS VALIDATION
// =============================================================================

// Ensure our optimizations produce correct results
type _CorrectNormalSameDay = NormalComplexityComparisons["sameDay"] extends true ? true : false;
type _CorrectNormalDifferentDay = NormalComplexityComparisons["sameDayFalse"] extends false ? true : false;
type _CorrectWeakMode = WeakComplexityComparisons["sameDay"] extends boolean ? true : false;
type _CorrectEdgeCaseLeap = EdgeCaseComparisons["leapYear"] extends true ? true : false;
type _CorrectEdgeCaseBoundary = EdgeCaseComparisons["monthBoundary"] extends false ? true : false;

// =============================================================================
// PERFORMANCE ANALYSIS EXPORTS
// =============================================================================

// Export performance data for analysis
export type ComparePerformanceResults = {
    normal: NormalComplexityComparisons;
    weak: WeakComplexityComparisons;
    strong: StrongComplexityComparisons;
    fastPath: FastPathTests;
    edgeCases: EdgeCaseComparisons;
    validation: {
        correctNormalSameDay: _CorrectNormalSameDay;
        correctNormalDifferentDay: _CorrectNormalDifferentDay;
        correctWeakMode: _CorrectWeakMode;
        correctEdgeCaseLeap: _CorrectEdgeCaseLeap;
        correctEdgeCaseBoundary: _CorrectEdgeCaseBoundary;
    };
};