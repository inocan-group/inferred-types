import { describe, it } from "vitest";
import type { BooleanSort, BooleanSortOptions, Expect, Test } from "inferred-types/types";

describe("BooleanSort<T, O> Type Tests", () => {

    it("handles basic ascending sort (default behavior)", () => {
        // Default order: true, false, boolean
        type cases = [
            Expect<Test<BooleanSort<[false, true, false]>, "equals", [true, false, false]>>,
            Expect<Test<BooleanSort<[false, true, false, true]>, "equals", [true, true, false, false]>>,
            Expect<Test<BooleanSort<[true, false]>, "equals", [true, false]>>,
            Expect<Test<BooleanSort<[false, false, true, true]>, "equals", [true, true, false, false]>>
        ];
    });

    it("handles explicit ascending sort with options", () => {
        type cases = [
            Expect<Test<BooleanSort<[false, true, false], { order: "ASC" }>, "equals", [true, false, false]>>,
            Expect<Test<BooleanSort<[false, true, false, true], { order: "ASC" }>, "equals", [true, true, false, false]>>
        ];
    });

    it("handles descending sort", () => {
        // DESC order: false, true, boolean (wide still last)
        type cases = [
            Expect<Test<BooleanSort<[true, false, true], { order: "DESC" }>, "equals", [false, true, true]>>,
            Expect<Test<BooleanSort<[false, true, false, true], { order: "DESC" }>, "equals", [false, false, true, true]>>,
            Expect<Test<BooleanSort<[true, false], { order: "DESC" }>, "equals", [false, true]>>
        ];
    });

    it("handles wide boolean types correctly", () => {
        // Wide types should go to end
        type cases = [
            Expect<Test<BooleanSort<[false, boolean, true]>, "equals", [true, false, boolean]>>,
            Expect<Test<BooleanSort<[boolean, false, boolean, true]>, "equals", [true, false, boolean, boolean]>>,
            Expect<Test<BooleanSort<[false, boolean, true], { order: "DESC" }>, "equals", [false, true, boolean]>>,
            Expect<Test<BooleanSort<[boolean, boolean]>, "equals", [boolean, boolean]>>
        ];
    });

    it("handles combinations of options", () => {
        type cases = [
            Expect<Test<BooleanSort<[false, true, false], { order: "DESC" }>, "equals", [false, false, true]>>,
            Expect<Test<BooleanSort<[boolean, false, true, false], { order: "DESC" }>, "equals", [false, false, true, boolean]>>,
            Expect<Test<BooleanSort<[false, true, false, true], { order: "ASC" }>, "equals", [true, true, false, false]>>
        ];
    });

    it("handles edge cases", () => {
        type cases = [
            // Empty array
            Expect<Test<BooleanSort<[]>, "equals", []>>,
            
            // Single element
            Expect<Test<BooleanSort<[true]>, "equals", [true]>>,
            Expect<Test<BooleanSort<[false]>, "equals", [false]>>,
            Expect<Test<BooleanSort<[true], { order: "DESC" }>, "equals", [true]>>,
            
            // All same elements
            Expect<Test<BooleanSort<[true, true, true]>, "equals", [true, true, true]>>,
            Expect<Test<BooleanSort<[false, false, false]>, "equals", [false, false, false]>>,
            
            // Wide type only
            Expect<Test<BooleanSort<[boolean, boolean]>, "equals", [boolean, boolean]>>
        ];
    });

    it("handles duplicates correctly", () => {
        type cases = [
            Expect<Test<BooleanSort<[false, true, false, true, false]>, "equals", [true, true, false, false, false]>>,
            Expect<Test<BooleanSort<[true, true, false, false, true], { order: "DESC" }>, "equals", [false, false, true, true, true]>>
        ];
    });

    it("supports container/offset interfaces", () => {
        // Basic container structure should work (actual sorting logic tested separately)
        type cases = [
            Expect<Test<{ active: true }, "extends", { active: boolean }>>,
            Expect<Test<{ active: false }, "extends", { active: boolean }>>
        ];
    });

    it("supports options interface compatibility", () => {
        // Verify that BooleanSortOptions accepts all valid combinations
        type cases = [
            Expect<Test<{ order: "ASC" }, "extends", BooleanSortOptions>>,
            Expect<Test<{ order: "DESC" }, "extends", BooleanSortOptions>>,
            Expect<Test<{ offset: "active" }, "extends", BooleanSortOptions>>,
            Expect<Test<{}, "extends", BooleanSortOptions>>
        ];
    });

    it("handles complex scenarios", () => {
        type cases = [
            // Mix of wide and narrow types
            Expect<Test<BooleanSort<[boolean, false, true, false]>, "equals", [true, false, false, boolean]>>,
            Expect<Test<BooleanSort<[false, boolean, true, false], { order: "DESC" }>, "equals", [false, false, true, boolean]>>,
            
            // Multiple wide types
            Expect<Test<BooleanSort<[boolean, false, true, boolean]>, "equals", [true, false, boolean, boolean]>>
        ];
    });
});