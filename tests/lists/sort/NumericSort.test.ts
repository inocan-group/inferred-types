import {  Expect, NumericSort, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Sort<TValues,[TReverse]>", () => {

    it("numeric sort", () => {
        type S1 = NumericSort<[2, 3, 4, 1]>;
        type S2 = NumericSort<[22, 33, 44, 11, 11]>;
        type S3 = NumericSort<[1, 2, 3, 4]>;

        type SR1 = NumericSort<[2, 3, 4, 1], { order: "DESC" }>;
        type SR2 = NumericSort<[22, 33, 44, 11, 11], { order: "DESC" }>;
        type SR3 = NumericSort<[1, 2, 3, 4], { order: "DESC" }>;

        type cases = [
            Expect<Test<S1, "equals", [1, 2, 3,  4]>>,
            Expect<Test<S2, "equals", [11, 11, 22, 33,  44]>>,
            Expect<Test<S3, "equals", [1, 2, 3,  4]>>,

            Expect<Test<SR1, "equals", [4, 3, 2,  1]>>,
            Expect<Test<SR2, "equals", [44, 33, 22, 11,  11]>>,
            Expect<Test<SR3, "equals", [4, 3, 2, 1]>>,
        ];
    });

    it("numeric sort with numeric literals", () => {
        type S1 = NumericSort<[`2`, `3`, `4`, 1]>;
        type S2 = NumericSort<[22, `33`, 44, 11, 11]>;
        type S3 = NumericSort<[1, 2, 3, `4`]>;

        type SR1 = NumericSort<[`2`, `3`, `4`, `1`], { order: "DESC" }>;
        type SR2 = NumericSort<[22, 33, 44, `11`, 11], { order: "DESC" }>;
        type SR3 = NumericSort<[1, `2`, `3`, 4], { order: "DESC" }>;

        type cases = [
            Expect<Test<S1, "equals", [1, 2, 3, 4]>>,
            Expect<Test<S2, "equals", [11, 11, 22, 33, 44]>>,
            Expect<Test<S3, "equals", [1, 2, 3, 4]>>,

            Expect<Test<SR1, "equals", [4, 3, 2,  1]>>,
            Expect<Test<SR2, "equals", [44, 33, 22, 11, 11]>>,
            Expect<Test<SR3, "equals", [4, 3, 2, 1]>>,
        ];
    });

    it("numeric sort on an offset", () => {
        type DATA = [
            { id: "foo", value: 14 },
            { id: "baz", value: 0 },
            { id: "bar", value: 2 },
        ]


        type Asc = NumericSort<DATA, { offset: "value", order: "ASC" }>;
        type Desc = NumericSort<DATA, { offset: "value", order: "DESC" }>;

        type cases = [
            Expect<Test<
                Asc,
                "equals",
                [
                    { id: "baz", value: 0 },
                    { id: "bar", value: 2 },
                    { id: "foo", value: 14 },
                ]
            >>,
            Expect<Test<
                Desc,
                "equals",
                [
                    { id: "foo", value: 14 },
                    { id: "bar", value: 2 },
                    { id: "baz", value: 0 },
                ]
            >>,
        ];

    });

    it("numeric sort with 'start' property - single element", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { start: 8 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { start: 33 }>;
        type S3 = NumericSort<[7, 1, 4, 9], { start: 1 }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", start: 8 }>;
        type SR2 = NumericSort<[22, 33, 44, 11], { order: "DESC", start: 33 }>;
        type SR3 = NumericSort<[7, 1, 4, 9], { order: "DESC", start: 1 }>;

        type cases = [
            // Ascending with start
            Expect<Test<S1, "equals", [8, 1, 2, 3, 5]>>, // 8 start, then [1,2,3,5]
            Expect<Test<S2, "equals", [33, 11, 22, 44]>>, // 33 start, then [11,22,44]
            Expect<Test<S3, "equals", [1, 4, 7, 9]>>, // 1 start, then [4,7,9]

            // Descending with start
            Expect<Test<SR1, "equals", [8, 5, 3, 2, 1]>>, // 8 start, then [5,3,2,1]
            Expect<Test<SR2, "equals", [33, 44, 22, 11]>>, // 33 start, then [44,22,11]
            Expect<Test<SR3, "equals", [1, 9, 7, 4]>>, // 1 start, then [9,7,4]
        ];
    });

    it("numeric sort with 'start' property - multiple elements", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { start: [8, 2] }>;
        type S2 = NumericSort<[22, 33, 44, 11, 33], { start: [33, 11] }>;
        type S3 = NumericSort<[7, 1, 4, 9, 1], { start: [1, 7] }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", start: [8, 2] }>;
        type SR2 = NumericSort<[22, 33, 44, 11, 33], { order: "DESC", start: [33, 11] }>;

        type cases = [
            // Ascending with multiple start elements
            Expect<Test<S1, "equals", [8, 2, 1, 3, 5]>>, // [8,2] start, then [1,3,5]
            Expect<Test<S2, "equals", [33, 33, 11, 22, 44]>>, // [33,33,11] start, then [22,44]
            Expect<Test<S3, "equals", [1, 1, 7, 4, 9]>>, // [1,1,7] start, then [4,9]

            // Descending with multiple start elements
            Expect<Test<SR1, "equals", [8, 2, 5, 3, 1]>>, // [8,2] start, then [5,3,1]
            Expect<Test<SR2, "equals", [33, 33, 11, 44, 22]>>, // [33,33,11] start, then [44,22]
        ];
    });

    it("numeric sort with 'start' property - element not in array", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { start: 99 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { start: [99, 88] }>;

        type cases = [
            // Start element not in array - should behave like normal sort
            Expect<Test<S1, "equals", [1, 2, 3, 5, 8]>>, // Normal sort since 99 not present
            Expect<Test<S2, "equals", [11, 22, 33, 44]>>, // Normal sort since 99,88 not present
        ];
    });

    it("numeric sort with 'start' property - duplicates", () => {
        type S1 = NumericSort<[5, 2, 8, 2, 3], { start: 2 }>;
        type S2 = NumericSort<[5, 2, 8, 2, 3, 5], { start: [2, 5] }>;

        type cases = [
            // Handle duplicates correctly
            Expect<Test<S1, "equals", [2, 2, 3, 5, 8]>>, // Both 2s start, then [3,5,8]
            Expect<Test<S2, "equals", [2, 2, 5, 5, 3, 8]>>, // [2,2,5,5] start, then [3,8]
        ];
    });

    it("numeric sort with 'start' property and numeric literals", () => {
        type S1 = NumericSort<[`5`, 2, `8`, 1, 3], { start: `8` }>;
        type S2 = NumericSort<[22, `33`, 44, 11], { start: [`33`, 22] }>;

        type cases = [
            // Handle numeric literals with start
            Expect<Test<S1, "equals", [8, 1, 2, 3, 5]>>, // 8 start, then [1,2,3,5]
            Expect<Test<S2, "equals", [33, 22, 11, 44]>>, // [33,22] start, then [11,44]
        ];
    });

    it("numeric sort with 'start' property - edge cases", () => {
        type S1 = NumericSort<[42], { start: 42 }>;
        type S2 = NumericSort<[], { start: 42 }>;
        type S3 = NumericSort<[1, 2, 3], { start: [] }>;

        type cases = [
            // Edge cases
            Expect<Test<S1, "equals", [42]>>, // Single element array
            Expect<Test<S2, "equals", []>>, // Empty array
            Expect<Test<S3, "equals", [1, 2, 3]>>, // Empty start array - normal sort
        ];
    });

    it("numeric sort with 'end' property - single element", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { end: 3 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { end: 44 }>;
        type S3 = NumericSort<[7, 1, 4, 9], { end: 9 }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", end: 3 }>;
        type SR2 = NumericSort<[22, 33, 44, 11], { order: "DESC", end: 44 }>;
        type SR3 = NumericSort<[7, 1, 4, 9], { order: "DESC", end: 9 }>;

        type cases = [
            // Ascending with end
            Expect<Test<S1, "equals", [1, 2, 5, 8, 3]>>, // [1,2,5,8], then 3 at end
            Expect<Test<S2, "equals", [11, 22, 33, 44]>>, // [11,22,33], then 44 at end
            Expect<Test<S3, "equals", [1, 4, 7, 9]>>, // [1,4,7], then 9 at end

            // Descending with end
            Expect<Test<SR1, "equals", [8, 5, 2, 1, 3]>>, // [8,5,2,1], then 3 at end
            Expect<Test<SR2, "equals", [33, 22, 11, 44]>>, // [33,22,11], then 44 at end
            Expect<Test<SR3, "equals", [7, 4, 1, 9]>>, // [7,4,1], then 9 at end
        ];
    });

    it("numeric sort with 'end' property - multiple elements", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { end: [3, 5] }>;
        type S2 = NumericSort<[22, 33, 44, 11, 33], { end: [44, 22] }>;
        type S3 = NumericSort<[7, 1, 4, 9, 1], { end: [9, 4] }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", end: [3, 5] }>;
        type SR2 = NumericSort<[22, 33, 44, 11, 33], { order: "DESC", end: [44, 22] }>;

        type cases = [
            // Ascending with multiple end elements
            Expect<Test<S1, "equals", [1, 2, 8, 3, 5]>>, // [1,2,8], then [3,5] at end
            Expect<Test<S2, "equals", [11, 33, 33, 44, 22]>>, // [11,33,33], then [44,22] at end
            Expect<Test<S3, "equals", [1, 1, 7, 9, 4]>>, // [1,1,7], then [9,4] at end

            // Descending with multiple end elements
            Expect<Test<SR1, "equals", [8, 2, 1, 3, 5]>>, // [8,2,1], then [3,5] at end
            Expect<Test<SR2, "equals", [33, 33, 11, 44, 22]>>, // [33,33,11], then [44,22] at end
        ];
    });

    it("numeric sort with both 'start' and 'end' properties", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { start: 8, end: 3 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { start: 11, end: 44 }>;
        type S3 = NumericSort<[7, 1, 4, 9, 2], { start: [1, 2], end: 9 }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", start: 8, end: 3 }>;
        type SR2 = NumericSort<[22, 33, 44, 11], { order: "DESC", start: 11, end: 44 }>;

        type cases = [
            // Ascending with both start and end
            Expect<Test<S1, "equals", [8, 1, 2, 5, 3]>>, // 8 at start, [1,2,5] middle, 3 at end
            Expect<Test<S2, "equals", [11, 22, 33, 44]>>, // 11 at start, [22,33] middle, 44 at end
            Expect<Test<S3, "equals", [1, 2, 4, 7, 9]>>, // [1,2] at start, [4,7] middle, 9 at end

            // Descending with both start and end
            Expect<Test<SR1, "equals", [8, 5, 2, 1, 3]>>, // 8 at start, [5,2,1] middle, 3 at end
            Expect<Test<SR2, "equals", [11, 33, 22, 44]>>, // 11 at start, [33,22] middle, 44 at end
        ];
    });

    it("numeric sort with 'end' property - edge cases", () => {
        type S1 = NumericSort<[42], { end: 42 }>;
        type S2 = NumericSort<[], { end: 42 }>;
        type S3 = NumericSort<[1, 2, 3], { end: [] }>;
        type S4 = NumericSort<[5, 2, 8, 1, 3], { end: 99 }>; // element not in array

        type cases = [
            // Edge cases
            Expect<Test<S1, "equals", [42]>>, // Single element array
            Expect<Test<S2, "equals", []>>, // Empty array
            Expect<Test<S3, "equals", [1, 2, 3]>>, // Empty end array - normal sort
            Expect<Test<S4, "equals", [1, 2, 3, 5, 8]>>, // End element not in array - normal sort
        ];
    });

    it("numeric sort with duplicates in start and end", () => {
        type S1 = NumericSort<[5, 2, 8, 2, 3], { end: 2 }>;
        type S2 = NumericSort<[5, 2, 8, 2, 3, 5], { start: 5, end: 2 }>;
        type S3 = NumericSort<[1, 2, 3, 2, 1], { start: 1, end: 2 }>;

        type cases = [
            // Handle duplicates correctly
            Expect<Test<S1, "equals", [3, 5, 8, 2, 2]>>, // [3,5,8], then both 2s at end
            Expect<Test<S2, "equals", [5, 5, 3, 8, 2, 2]>>, // Both 5s at start, [3,8] middle, both 2s at end
            Expect<Test<S3, "equals", [1, 1, 3, 2, 2]>>, // Both 1s at start, 3 middle, both 2s at end
        ];
    });

    it("numeric sort with Natural order", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { order: "Natural" }>;
        type S2 = NumericSort<[22, 33, 44, 11], { order: "Natural" }>;
        type S3 = NumericSort<[9, 7, 1, 4], { order: "Natural" }>;

        type cases = [
            // Natural order preserves original order
            Expect<Test<S1, "equals", [5, 2, 8, 1, 3]>>, // Original order preserved
            Expect<Test<S2, "equals", [22, 33, 44, 11]>>, // Original order preserved
            Expect<Test<S3, "equals", [9, 7, 1, 4]>>, // Original order preserved
        ];
    });

    it("numeric sort with Natural order and start", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { order: "Natural", start: 8 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { order: "Natural", start: [11, 33] }>;
        type S3 = NumericSort<[9, 7, 1, 4, 7], { order: "Natural", start: 7 }>;

        type cases = [
            // Natural order with start pinning
            Expect<Test<S1, "equals", [8, 5, 2, 1, 3]>>, // 8 moved to start, rest in original order
            Expect<Test<S2, "equals", [11, 33, 22, 44]>>, // [11,33] moved to start, rest in original order
            Expect<Test<S3, "equals", [7, 7, 9, 1, 4]>>, // Both 7s moved to start, rest in original order
        ];
    });

    it("numeric sort with Natural order and end", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { order: "Natural", end: 2 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { order: "Natural", end: [44, 22] }>;
        type S3 = NumericSort<[9, 7, 1, 4, 7], { order: "Natural", end: 7 }>;

        type cases = [
            // Natural order with end pinning
            Expect<Test<S1, "equals", [5, 8, 1, 3, 2]>>, // 2 moved to end, rest in original order
            Expect<Test<S2, "equals", [33, 11, 44, 22]>>, // [44,22] moved to end, rest in original order
            Expect<Test<S3, "equals", [9, 1, 4, 7, 7]>>, // Both 7s moved to end, rest in original order
        ];
    });

    it("numeric sort with Natural order and both start and end", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { order: "Natural", start: 8, end: 3 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { order: "Natural", start: 11, end: 44 }>;
        type S3 = NumericSort<[9, 7, 1, 4, 2], { order: "Natural", start: [1, 7], end: 9 }>;

        type cases = [
            // Natural order with both start and end pinning
            Expect<Test<S1, "equals", [8, 5, 2, 1, 3]>>, // 8 at start, 3 at end, rest in original order
            Expect<Test<S2, "equals", [11, 22, 33, 44]>>, // 11 at start, 44 at end, rest in original order
            Expect<Test<S3, "equals", [1, 7, 4, 2, 9]>>, // [1,7] at start, 9 at end, rest in original order
        ];
    });

    it("numeric sort with Natural order on offset", () => {
        type DATA = [
            { id: "foo", value: 14 },
            { id: "baz", value: 0 },
            { id: "bar", value: 2 },
        ]

        type Natural = NumericSort<DATA, { offset: "value", order: "Natural" }>;

        type cases = [
            Expect<Test<
                Natural,
                "equals",
                [
                    { id: "foo", value: 14 },
                    { id: "baz", value: 0 },
                    { id: "bar", value: 2 },
                ]
            >>, // Original order preserved with offset
        ];
    });
});
