import { ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { valuesOf } from "inferred-types/runtime";
import { Expect, HasSameValues, Dictionary, ObjectKey, Values, EmptyObject, Test } from "inferred-types/types";


describe("Values<T>", () => {


    it("Values<T> where T is a wide object", () => {
        type VObj = Values<{
            foo: 1;
            bar: "bar";
            baz: true;
        }>;
        type VEmpty = Values<Dictionary>;
        type VRecord = Values<Record<ObjectKey, unknown>>;
        type VUnion = Values<Record<ObjectKey, number | string>>;

        type cases = [
            Expect<Test<VObj, "hasSameValues", [1, "bar", true]>>,
            Expect<Test<VEmpty, "equals", any[]>>,
            Expect<Test<VRecord, "equals", unknown[]>>,
            Expect<Test<VUnion, "equals", (number | string)[]>>,
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
