import { Equal, Expect } from "@type-challenges/utils";
import {  NumericSort, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Sort<TValues,[TReverse]>", () => {

    it("numeric sort", () => {
        type S1 = NumericSort<[2, 3, 4, 1]>;
        type S2 = NumericSort<[22, 33, 44, 11, 11]>;
        type S3 = NumericSort<[1, 2, 3, 4]>;

        type SR1 = NumericSort<[2, 3, 4, 1], { order: "DESC" }>;
        type SR2 = NumericSort<[22, 33, 44, 11, 11], { order: "DESC" }>;
        type SR3 = NumericSort<[1, 2, 3, 4], { order: "DESC" }>;

        // @ts-ignore
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

        // @ts-ignore
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

        // @ts-ignore
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
});
