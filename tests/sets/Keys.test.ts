import { describe, it, expect } from "vitest";
import type { Dictionary, EmptyObject, Expect, HasSameValues, Keys, NumericKeys, ObjectKey, ObjectKeys, RemoveIndexKeys, Test } from "inferred-types/types";

import { keysOf } from "inferred-types/runtime";

describe("NumericKeys<T>", () => {

    it("happy path", () => {
        type Numeric = NumericKeys<[1, 2, 3]>;
        type Str = NumericKeys<["foo", "bar", "baz"]>;
        type Str_RO = NumericKeys<readonly ["foo", "bar", "baz"]>;
        type Empty = NumericKeys<[]>;
        type Empty_RO = NumericKeys<readonly []>;
        type Wide = NumericKeys<string[]>;

        type Variadic = NumericKeys<["foo","bar", ...string[]]>;

        type cases = [
            Expect<Test<Numeric, "equals", [0, 1, 2]>>,
            Expect<Test<Str, "equals", [0, 1, 2]>>,
            Expect<Test<Str_RO, "equals",  [0, 1, 2]>>,
            Expect<Test<Empty, "equals", []>>,
            Expect<Test<Empty_RO, "equals", []>>,
            Expect<Test<Wide, "equals", number[]>>,
            Expect<Test<Variadic, "equals", [0,1, ...number[]]>>
        ];

    });
});

describe("Keys<T>", () => {

    // `ObjectKeys` is a more direct way of getting keys for Objects
    // we will test this first and then move up to the more abstracted `Keys<T>`
    // which works on both objects and arrays
    describe("objects", () => {
        it("narrow", () => {
            type Uno = Keys<{ baz: 3 }>;

            type Foobar = Keys<{ foo: 1; bar: 2 }>;
            type Foobar_Alt = ObjectKeys<{ foo: 1; bar: 2 }>;
            type FooBar_RO = Keys<Readonly<{ foo: 1; bar: 2 }>>;
            type FoobarWideVal = Keys<{ foo: number; bar: string }>;

            type UnionRec = Keys<Record<"foo" | "bar", number>>;

            type cases = [
                Expect<HasSameValues<Uno, ["baz"]>>,
                Expect<HasSameValues<Foobar, ["foo", "bar"]>>,
                Expect<HasSameValues<FoobarWideVal, ["foo", "bar"]>>,
                Expect<HasSameValues<FooBar_RO, ["foo", "bar"]>>,

                Expect<Test<UnionRec, "hasSameValues", ["foo", "bar"]>>,
            ];
        });

        it("narrow with optional", () => {
            type Uno = Keys<{ baz?: 3 }>;
            type FooBar = Keys<{ foo: 1; bar?: 2 }>;
            type A_Foobar = ObjectKeys<{ foo: 1; bar?: 2 }>;

            type cases = [
                Expect<Test<Uno, "equals", [("baz" | undefined)?]>>,
                Expect<Test<FooBar, "equals", ["foo", ("bar" | undefined)?]>>,
            ];
        });

        it("wide", () => {
            type Obj = Keys<object>;
            type Rec = Keys<Record<string,string>>;
            type Dict = Keys<Dictionary>;

            type cases = [
                Expect<Test<Obj, "equals", PropertyKey[]>>,
                Expect<Test<Rec, "equals", string[]>>,
                Expect<Test<Dict, "equals", ObjectKey[]>>,
            ];
        });

        it("variadic", () => {
            // must have foo and bar, optionally can have keys leading with `_`
            type Optional = Keys<Record<"foo" | "bar" | `_${string}`, number>>;
            //    ^?

            // this is a different nomenclature for the same type as above
            type FooBarIndex = Keys<{ foo: 1; bar: 2; [x: `_${string}`]: unknown }>;
            //   ^?

            // here we discretely define `foo` and `bar` but then provide an index
            // which overlaps with them
            type FooBarOverlap = Keys<{ foo: 1; bar: 2; [x: string]: unknown }>;
            //   ^?
            type X = RemoveIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;

            type cases = [
                Expect<Test<
                    Optional, "equals",
                    ["foo", "bar", (`_${string}` | undefined)?]
                >>,
                Expect<Test<
                    FooBarIndex, "equals",
                    ["foo", "bar", (`_${string}` | undefined)?]
                >>,
                Expect<Test<
                    FooBarOverlap, "equals",
                    (string|number)[]
                >>
            ];
        });

    });

    describe("arrays", () => {

        it("array resolution", () => {
            type EmptyArr = Keys<[]>;
            type WideStr = Keys<string[]>;
            type LitNum = Keys<[1, 2, 3]>;

            type cases = [
                Expect<Test<EmptyArr, "equals", []>>,
                Expect<Test<WideStr, "equals", number[]>>,
                Expect<Test<LitNum, "equals", [0, 1, 2]>>,
            ];
        });
    })

});

// RUNTIME
describe("keysOf()", () => {
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

