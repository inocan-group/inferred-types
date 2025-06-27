import { Expect, ReduceValues, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ReduceValues<T>", () => {

    it("happy path with tuples", () => {
        type T1 = ReduceValues<[]>;
        type T2 = ReduceValues<["foo", "bar", "baz"]>;
        type T3 = ReduceValues<["foo", () => false, () => true]>;
        type T4 = ReduceValues<["foo", () => false, () => boolean]>;
        type T5 = ReduceValues<["foo", () => false, () => "blue"]>;

        type cases = [
            Expect<Test<T1, "equals",  []>>, //
            Expect<Test<T2, "equals", ["foo", "bar",  "baz"]>>,
            Expect<Test<T3, "equals", ["foo", false,  true]>>,
            Expect<Test<T4, "equals", ["foo", false,  boolean]>>,
            Expect<Test<T5, "equals", ["foo", false,  "blue"]>>,
        ];
        const cases: cases = [true, true, true, true, true];
    });



    it("happy path with dictionaries", () => {
        type T1 = ReduceValues<{ foo: number; bar: () => "hi" }>;

        type cases = [
            Expect<Test<T1, "equals", [number,  "hi"]>>
        ];
        const cases: cases = [
            true
        ];

    });


});
