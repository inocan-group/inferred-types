import { describe, it, expect } from "vitest";
import type { AsArray, AssertEqual, Expect, Test, UnionToTuple } from "inferred-types/types";

import { asArray } from "inferred-types/runtime";

describe("AsArray<T>", () => {
    it("happy path", () => {
        type T1 = AsArray<4>;
        type T2 = AsArray<[4, 5, 6]>;
        type T3 = AsArray<T2>;
        type T4 = AsArray<undefined>;
        type T5 = AsArray<null>;
        type T6 = AsArray<unknown>;
        type T7 = AsArray<unknown[]>;

        type cases = [
            //
            Expect<Test<T1, "equals", [4]>>,
            Expect<Test<T2, "equals", [4, 5, 6]>>,
            Expect<Test<T3, "equals", [4, 5, 6]>>,
            Expect<Test<T4, "equals", []>>,
            Expect<Test<T5, "equals", [null]>>,
            Expect<Test<T6, "equals", unknown[]>>,
            Expect<Test<T7, "equals", unknown[]>>,
        ];
    });


    it("singular or array variant", () => {
        type T1 = AsArray<string | string[]>;
        type T2 = AsArray<number | number[] | string[]>;

        type cases = [
            Expect<AssertEqual<T1, string[]>>,
            Expect<AssertEqual<T2, string[] | number[]>>,
        ];
    });


});

describe("asArray() function", () => {
    it("non-array is returned as an array", () => {
        const o = asArray("a");
        type O = typeof o;

        // run-time
        expect(o).toEqual(["a"]);
        // design-time
        type cases = [
            Expect<AssertEqual<typeof o, ["a"]>>,
        ];

    });

    it("array is returned as an array", () => {
        const i = ["a"];
        const o = asArray(i);
        type O = typeof o;

        // run-time
        expect(o).toEqual(["a"]);
        // design-time
        type cases = [
            Expect<Test<O, "equals", string[]>>
        ];
    });

    it("handling non-array element which presents as undefined", () => {
        type T = string | undefined;
        const i = undefined;
        const i2: T = undefined;
        const o = asArray(i);
        const o2 = asArray(i2 as T);
        type O = typeof o;
        type O2 = typeof o2;

        // run-time
        expect(o).toEqual([]);
        expect(o2).toEqual([]);
        // design-time
        type cases = [
            Expect<Test<O, "equals", []>>, //
            Expect<Test<O2, "equals", (string | undefined)[]>>,
        ];
    });

    it("handling array element which contains undefined is unaffected", () => {
        type T = string | undefined;
        const i = [undefined, "foobar"];
        const i2: T[] = [undefined, "foobar"];
        const o = asArray(i);
        const o2 = asArray(i2 as T[]);
        type O = typeof o;
        type O2 = typeof o2;

        // run-time
        expect(o).toEqual([undefined, "foobar"]);
        expect(o2).toEqual([undefined, "foobar"]);
        // design-time
        type cases = [
            Expect<Test<O, "equals", (string | undefined)[]>>, //
            Expect<Test<O2, "equals", T[]>>
        ];
    });
});
