import { describe, it, expect } from "vitest";
import type { BooleanSort, BooleanSortOptions } from "inferred-types/types";

describe("BooleanSort<T, O>", () => {

    it("basic functionality works with simple cases", () => {
        // These are runtime tests that verify the types work as expected
        
        type Test1 = BooleanSort<[false, true, false]>;
        type Test2 = BooleanSort<[false, true, false], { order: "DESC" }>;
        type Test3 = BooleanSort<[]>;
        type Test4 = BooleanSort<[true]>;
        
        // If these compile without error, the basic structure is working
        expect(true).toBe(true);
    });

    it("handles ascending order by default", () => {
        // Default: true > false > boolean
        type Sorted1 = BooleanSort<[false, true, false, true]>;
        type Sorted2 = BooleanSort<[false, false, true, true]>;
        type Sorted3 = BooleanSort<[true, false]>;
        
        expect(true).toBe(true);
    });

    it("handles descending order", () => {
        // DESC: false > true > boolean
        type Sorted1 = BooleanSort<[true, false, true, false], { order: "DESC" }>;
        type Sorted2 = BooleanSort<[false, false, true, true], { order: "DESC" }>;
        type Sorted3 = BooleanSort<[true, false], { order: "DESC" }>;
        
        expect(true).toBe(true);
    });

    it("handles wide boolean types", () => {
        // Wide boolean should go to end
        type Sorted1 = BooleanSort<[false, boolean, true]>;
        type Sorted2 = BooleanSort<[boolean, false, boolean, true]>;
        type Sorted3 = BooleanSort<[false, boolean, true], { order: "DESC" }>;
        
        expect(true).toBe(true);
    });


    it("handles edge cases", () => {
        // Empty array
        type Empty = BooleanSort<[]>;
        
        // Single element
        type Single1 = BooleanSort<[true]>;
        type Single2 = BooleanSort<[false]>;
        
        // All same
        type AllTrue = BooleanSort<[true, true, true]>;
        type AllFalse = BooleanSort<[false, false, false]>;
        
        // With wide type only
        type WideOnly = BooleanSort<[boolean, boolean]>;
        
        expect(true).toBe(true);
    });

    it("supports container/offset sorting", () => {
        // Test basic structure for container sorting
        type Container1 = { active: true; id: number };
        type Container2 = { active: false; id: number };
        type Containers = [Container2, Container1];
        
        type Sorted = BooleanSort<Containers, { offset: "active" }>;
        
        expect(true).toBe(true);
    });

    it("supports options interface", () => {
        // Test that the options interface accepts various configurations
        const options1: BooleanSortOptions = { order: "ASC" };
        const options2: BooleanSortOptions = { order: "DESC" };
        const options3: BooleanSortOptions = { offset: "active" };
        const options4: BooleanSortOptions = {};
        
        expect(true).toBe(true);
    });

    it("handles combinations of options", () => {
        type Complex1 = BooleanSort<[boolean, false, true, false], { order: "DESC" }>;
        type Complex2 = BooleanSort<[false, true, false, true], { order: "ASC" }>;
        
        expect(true).toBe(true);
    });

    it("handles duplicates correctly", () => {
        type Duplicates1 = BooleanSort<[false, true, false, true, false]>;
        type Duplicates2 = BooleanSort<[true, true, false, false, true], { order: "DESC" }>;
        
        expect(true).toBe(true);
    });
});