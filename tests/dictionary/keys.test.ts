import { describe, it, expect } from "vitest";
import type {
    Expect,
    Keys,
    NumericKeys,
    EmptyObject,
    ObjectKey,
    Dictionary,
    HasSameValues,
    HasSameKeys,
    Test,
} from "inferred-types/types";
import { keysOf } from "inferred-types/runtime";
import { ExplicitlyEmptyObject } from "inferred-types/types";

describe("NumericKeys<T>", () => {

    it("happy path", () => {
        type StringArr = ["foo", "bar", "baz"];
        type StrArr_RO = readonly ["foo", "bar", "baz"];
        type NumArr = [1, 2, 3];

        type Numeric = NumericKeys<NumArr>;
        type Str = NumericKeys<StringArr>;
        type Str_RO = NumericKeys<StrArr_RO>;
        type Empty = NumericKeys<[]>;
        type Empty_RO = NumericKeys<readonly []>;

        type cases = [
            Expect<Test<Numeric, "equals", [0, 1, 2]>>,
            Expect<Test<Str, "equals", [0, 1, 2]>>,
            Expect<Test<Str_RO, "equals", readonly [0, 1, 2]>>,
            Expect<Test<Empty, "equals", number[]>>,
            Expect<Test<Empty_RO, "equals", number[]>>,
        ];

    });
});


describe("Keys<T> with object targets", () => {
    type OBJ = { foo: 1; bar: 2 };


    type Foobar = Keys<OBJ>;
    type FooBar_RO = Keys<Readonly<OBJ>>;
    type FooBar_EXT = Keys<{ foo: 1; bar: 2;[x: string]: unknown }>;
    type EmptyObj = Keys<EmptyObject>;
    type VeryEmpty = Keys<ExplicitlyEmptyObject>;
    type Uno = Keys<{ baz: 3 }>;
    type StrRec = Keys<Record<string, string>>;
    type UnionRec = Keys<Record<"foo" | "bar", number>>;
    type KeyVal = Keys<Dictionary>;

    type Curly = Keys<EmptyObject>;

    it("object resolution", () => {
        type cases = [
            Expect<Test<EmptyObj, "equals", []>>,
            Expect<Test<Curly, "equals", []>>,
            Expect<HasSameValues<Foobar, ["foo", "bar"]>>,
            Expect<HasSameValues<FooBar_RO, ["foo", "bar"]>>,
            Expect<HasSameValues<FooBar_EXT, ["foo", "bar"]>>,
            Expect<HasSameValues<Uno, ["baz"]>>,

            Expect<Test<StrRec, "equals", string[]>>,
            Expect<Test<UnionRec, "equals", ["foo", "bar"]>>,
            Expect<Test<KeyVal, "equals", ObjectKey[]>>,
        ];
    });


    it("array resolution", () => {

        type cases = [
            Expect<Test<Keys<[]>, "equals", number[]>>,
            Expect<Test<Keys<string[]>, "equals", number[]>>,
            Expect<HasSameKeys<Keys<[1, 2, 3]>, [0, 1, 2]>>,
            Expect<Test<Keys<[1, 2, 3]>, "equals", [0, 1, 2]>>,
        ];
    });

});

describe("runtime keysOf() utility on object", () => {
    it("with just object passed in, keys are extracted as expected", () => {
        const obj = {
            id: 123,
            color: "blue",
            isFavorite: false
        } as { id: 123; color: string; isFavorite: boolean };


        const k = keysOf(obj);
        const k2 = keysOf({} as EmptyObject);
        type K = typeof k;

        expect(k, "The object should have 3 keys: ${Json}").toHaveLength(3);
        expect(k).toContain("id");
        expect(k).toContain("color");
        expect(k).toContain("isFavorite");

        expect(k2).toEqual([]);

        type cases = [
            Expect<HasSameValues<K, ["id", "color", "isFavorite"]>>,
            Expect<Test<typeof k2, "equals", []>>
        ];
        const cases: cases = [true, true];
        expect(cases).toBe(cases);
    });
});
