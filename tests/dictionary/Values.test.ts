import { describe, expect, it } from "vitest";
import type { Dictionary, EmptyObject, Expect, ObjectKey, Test, Values } from "inferred-types/types";

import { valuesOf } from "inferred-types/runtime";

describe("Values<T>", () => {

    it("Values<T> where T is a wide object", () => {

        type Dict = Values<Dictionary>;
        type Rec = Values<Record<ObjectKey, unknown>>;
        type Union = Values<Record<ObjectKey, number | string>>;

        type cases = [
            Expect<Test<Dict, "equals", unknown[]>>,
            Expect<Test<Rec, "equals", unknown[]>>,
            Expect<Test<Union, "equals", (number | string)[]>>,
        ];

    });

    it("Values<T> where T is a LiteralLike object", () => {
        type FooBar = Values<{ foo: 1; bar: 2}>;

        type cases = [
            Expect<Test<FooBar, "hasSameValues", [1,2]>>,
        ];
    });

    it("Values<T> where T is a LiteralLike object with optional props", () => {
        type FooBar = Values<{ foo: 1; bar?: 2}>;
        type FooBar2 = Values<{ foo?: 1; bar: 2}>;

        type cases = [
            Expect<Test<FooBar, "equals", [1,2?]>>,
            Expect<Test<FooBar2, "equals", [2,1?]>>,
        ];
    });

    it("Values<T> where T is an array", () => {
        type VArr = Values<[1, 2, 3]>;
        type VEmpty = Values<[]>;
        type VStrArr = Values<string[]>;
        type VMixedTuple = Values<[number, string, boolean]>;
        type VUnion = Values<(string | number)[]>

        type cases = [
            Expect<Test<VArr, "equals", [1, 2, 3]>>,
            Expect<Test<VEmpty, "equals", []>>,
            Expect<Test<VStrArr, "equals", string[]>>,
            Expect<Test<VMixedTuple, "equals", [number, string, boolean]>>,
            Expect<Test<VUnion, "equals", (string | number)[]>>,
        ];

    });
});

describe("valuesOf()", () => {
    const obj = {
        foo: 1,
        bar: "bar",
        baz: true
    } as const;

    it("Happy Path", () => {
        const v_obj = valuesOf(obj);
        const v_empty = valuesOf({} as EmptyObject);
        const v_infer = valuesOf({ foo: 1, bar: "bar", baz: true });

        expect(v_obj).toEqual([1, "bar", true]);
        expect(v_infer).toEqual([1, "bar", true]);
        expect(v_empty).toEqual([]);

        type cases = [
            Expect<Test<typeof v_obj, "hasSameValues", [1, "bar", true]>>,
            Expect<Test<typeof v_infer, "hasSameValues", [1, "bar", true]>>,
            Expect<Test<typeof v_empty, "equals", []>>,
        ];

    });

});
