import { describe, expect, it } from "vitest";
import { indexOf } from "inferred-types/runtime";
import type { Expect, IndexOf, Test } from "inferred-types/types";
import { Dictionary } from "inferred-types";



describe("IndexOf<T>", () => {

    it("type tests", () => {
        type Arr = IndexOf<[1, 2, 3], 1>;
        // @ts-expect-error
        type ArrBadIdx = IndexOf<[1, 2, 3], 8>;
        // @ts-expect-error
        type InvalidStrIdx = IndexOf<[1, 2, 3], "foo">;

        type Neg = IndexOf<[1, 2, 3], -1>;

        type Obj = IndexOf<{ foo: 1; bar: 2; baz: 3 }, "bar">;
        type Identity = IndexOf<{foo:1, bar: 2}, null>;
        // @ts-expect-error
        type Never = IndexOf<"foo", 1>;

        type cases = [
            Expect<Test<Obj, "equals", 2>>,
            Expect<Test<Arr, "equals", 2>>,
            Expect<Test<InvalidStrIdx, "isError", "invalid-index">>,


            Expect<Test<Neg, "equals", 3>>,

            Expect<Test<ArrBadIdx, "isError", true>>,
            Expect<Test<Identity, "equals", {foo:1,bar:2}>>,
            Expect<Test<ArrBadIdx, "isError", "invalid-index">>,
        ];

    });


    it("wide arrays", () => {
        type Arr1 = IndexOf<string[], 2>;
        type Arr2 = IndexOf<number[], 2>;
        type Obj1 = IndexOf<Dictionary, "foo">;

        type cases = [
            /** type tests */
        ];
    });



    it("using Override feature", () => {
        // @ts-expect-error
        type Arr = IndexOf<[1, 2, 3], 8, "oops">;
        // @ts-expect-error
        type Obj = IndexOf<{ foo: 1 }, "bar", "oops">;

        type cases = [
            Expect<Test<Arr, "equals", "oops">>,
            Expect<Test<Obj, "equals", "oops">>,
        ];
        const cases: cases = [
            true, true
        ];

    });



    it.todo("type tests for negative offsets", () => {


        type cases = [
            /** type tests */
        ];
        const cases: cases = [];

    });


    it("runtime", () => {
        const arr = indexOf([1, 2, 3] as const, 1);
        const obj = indexOf({ foo: 1, bar: 2, baz: 3 } as const, "bar");
        const identity = indexOf("foo", null);
        const invalidIndex = indexOf("foo", 1);

        expect(arr).toBe(2);
        expect(obj).toBe(2);
        expect(identity).toBe("foo");
        expect(
            invalidIndex instanceof Error,
            `Use of an invalid index: ${JSON.stringify(invalidIndex)}`
        ).toBe(true);
    });


});
