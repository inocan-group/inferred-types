import { 
    Expect, 
    Test, 
    Compare, 
    HasWideValues, 
    IsWideType,
    IsBetweenInclusively,
    IsGreaterThanOrEqual,
    IsLessThanOrEqual,
    And,
    Or
} from "inferred-types/types";
import { describe, it } from "vitest";

// Test the specific case that's failing
type TestCompare = Compare<7, "betweenInclusively", [5, 10]>;

// Let's break down the components to see where the issue is
type TestHasWideValues = HasWideValues<[5, 10]>;
type TestIsWideType = IsWideType<7>;

// Test the wide type check combination
type TestOrWideCheck = Or<[IsWideType<7>, HasWideValues<[5, 10]>]>;

// Test the underlying IsBetweenInclusively directly
type TestIsBetween = IsBetweenInclusively<7, 5, 10>;

// Test the individual comparison parts
type TestGreaterOrEqual = IsGreaterThanOrEqual<7, 5>;
type TestLessOrEqual = IsLessThanOrEqual<7, 10>;
type TestAnd = And<[IsGreaterThanOrEqual<7, 5>, IsLessThanOrEqual<7, 10>]>;

// Test edge cases
type TestEdgeLow = Compare<5, "betweenInclusively", [5, 10]>;
type TestEdgeHigh = Compare<10, "betweenInclusively", [5, 10]>;

describe("Debug Compare betweenInclusively", () => {
    it("should work correctly", () => {
        type cases = [
            // These should all be false
            Expect<Test<TestHasWideValues, "equals", false>>,
            Expect<Test<TestIsWideType, "equals", false>>,
            Expect<Test<TestOrWideCheck, "equals", false>>,
            
            // These should all be true
            Expect<Test<TestIsBetween, "equals", true>>,
            Expect<Test<TestGreaterOrEqual, "equals", true>>,
            Expect<Test<TestLessOrEqual, "equals", true>>,
            Expect<Test<TestAnd, "equals", true>>,
            
            // This should be true but might be failing
            Expect<Test<TestCompare, "equals", true>>,
            
            // Edge cases should also be true
            Expect<Test<TestEdgeLow, "equals", true>>,
            Expect<Test<TestEdgeHigh, "equals", true>>,
        ];
    });
});

// Export types to examine in IDE
export type Debug = {
    TestCompare: TestCompare;
    TestHasWideValues: TestHasWideValues;
    TestIsWideType: TestIsWideType;
    TestIsBetween: TestIsBetween;
    TestOrWideCheck: TestOrWideCheck;
};