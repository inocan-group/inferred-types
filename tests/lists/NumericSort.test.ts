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

    it("numeric sort with 'first' property - single element", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { first: 8 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { first: 33 }>;
        type S3 = NumericSort<[7, 1, 4, 9], { first: 1 }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", first: 8 }>;
        type SR2 = NumericSort<[22, 33, 44, 11], { order: "DESC", first: 33 }>;
        type SR3 = NumericSort<[7, 1, 4, 9], { order: "DESC", first: 1 }>;

        type cases = [
            // Ascending with first
            Expect<Test<S1, "equals", [8, 1, 2, 3, 5]>>, // 8 first, then [1,2,3,5]
            Expect<Test<S2, "equals", [33, 11, 22, 44]>>, // 33 first, then [11,22,44]
            Expect<Test<S3, "equals", [1, 4, 7, 9]>>, // 1 first, then [4,7,9]

            // Descending with first
            Expect<Test<SR1, "equals", [8, 5, 3, 2, 1]>>, // 8 first, then [5,3,2,1]
            Expect<Test<SR2, "equals", [33, 44, 22, 11]>>, // 33 first, then [44,22,11]
            Expect<Test<SR3, "equals", [1, 9, 7, 4]>>, // 1 first, then [9,7,4]
        ];
    });

    it("numeric sort with 'first' property - multiple elements", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { first: [8, 2] }>;
        type S2 = NumericSort<[22, 33, 44, 11, 33], { first: [33, 11] }>;
        type S3 = NumericSort<[7, 1, 4, 9, 1], { first: [1, 7] }>;

        type SR1 = NumericSort<[5, 2, 8, 1, 3], { order: "DESC", first: [8, 2] }>;
        type SR2 = NumericSort<[22, 33, 44, 11, 33], { order: "DESC", first: [33, 11] }>;

        type cases = [
            // Ascending with multiple first elements
            Expect<Test<S1, "equals", [8, 2, 1, 3, 5]>>, // [8,2] first, then [1,3,5]
            Expect<Test<S2, "equals", [33, 33, 11, 22, 44]>>, // [33,33,11] first, then [22,44]
            Expect<Test<S3, "equals", [1, 1, 7, 4, 9]>>, // [1,1,7] first, then [4,9]

            // Descending with multiple first elements
            Expect<Test<SR1, "equals", [8, 2, 5, 3, 1]>>, // [8,2] first, then [5,3,1]
            Expect<Test<SR2, "equals", [33, 33, 11, 44, 22]>>, // [33,33,11] first, then [44,22]
        ];
    });

    it("numeric sort with 'first' property - element not in array", () => {
        type S1 = NumericSort<[5, 2, 8, 1, 3], { first: 99 }>;
        type S2 = NumericSort<[22, 33, 44, 11], { first: [99, 88] }>;

        type cases = [
            // First element not in array - should behave like normal sort
            Expect<Test<S1, "equals", [1, 2, 3, 5, 8]>>, // Normal sort since 99 not present
            Expect<Test<S2, "equals", [11, 22, 33, 44]>>, // Normal sort since 99,88 not present
        ];
    });

    it("numeric sort with 'first' property - duplicates", () => {
        type S1 = NumericSort<[5, 2, 8, 2, 3], { first: 2 }>;
        type S2 = NumericSort<[5, 2, 8, 2, 3, 5], { first: [2, 5] }>;

        type cases = [
            // Handle duplicates correctly
            Expect<Test<S1, "equals", [2, 2, 3, 5, 8]>>, // Both 2s first, then [3,5,8]
            Expect<Test<S2, "equals", [2, 2, 5, 5, 3, 8]>>, // [2,2,5,5] first, then [3,8]
        ];
    });

    it("numeric sort with 'first' property and numeric literals", () => {
        type S1 = NumericSort<[`5`, 2, `8`, 1, 3], { first: `8` }>;
        type S2 = NumericSort<[22, `33`, 44, 11], { first: [`33`, 22] }>;

        type cases = [
            // Handle numeric literals with first
            Expect<Test<S1, "equals", [8, 1, 2, 3, 5]>>, // 8 first, then [1,2,3,5]
            Expect<Test<S2, "equals", [33, 22, 11, 44]>>, // [33,22] first, then [11,44]
        ];
    });

    it("numeric sort with 'first' property - edge cases", () => {
        type S1 = NumericSort<[42], { first: 42 }>;
        type S2 = NumericSort<[], { first: 42 }>;
        type S3 = NumericSort<[1, 2, 3], { first: [] }>;

        type cases = [
            // Edge cases
            Expect<Test<S1, "equals", [42]>>, // Single element array
            Expect<Test<S2, "equals", []>>, // Empty array
            Expect<Test<S3, "equals", [1, 2, 3]>>, // Empty first array - normal sort
        ];
    });
});
