import { describe, expect, it } from "vitest";
import { indexOf, isErrorCondition } from "inferred-types/runtime";
import type { Expect, IndexOf, IsErrorCondition, Test } from "inferred-types/types";



describe("IndexOf<T>", () => {

    it("type tests", () => {
        type Arr = IndexOf<[1, 2, 3], 1>;
        type ArrBadIdx = IndexOf<[1, 2, 3], 8>;
        type InvalidStrIdx = IndexOf<[1, 2, 3], "foo">;

        type Neg = IndexOf<[1, 2, 3], -1>;

        type Obj = IndexOf<{ foo: 1; bar: 2; baz: 3 }, "bar">;
        type Identity = IndexOf<"foo", null>;
        type Never = IndexOf<"foo", 1>;

        type cases = [
            Expect<Test<Obj, "equals", 2>>,
            Expect<Test<Arr, "equals", 2>>,
            Expect<Test<IsErrorCondition<InvalidStrIdx, "invalid-index">, "equals", true>>,


            Expect<Test<Neg, "equals", 3>>,

            Expect<Test<IsErrorCondition<ArrBadIdx, "invalid-index">, "equals", true>>,
            Expect<Test<Identity, "equals", "foo">>,
            Expect<Test<IsErrorCondition<ArrBadIdx, "invalid-index">, "equals", true>>,
        ];

    });


    it("using Override feature", () => {
        type Arr = IndexOf<[1, 2, 3], 8, "oops">
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
            isErrorCondition(invalidIndex),
            `Use of an invalid index: ${JSON.stringify(invalidIndex)}`
        ).toBe(true);
    });


});
