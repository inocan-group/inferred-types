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
    ObjectKeys,
    Values,
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


describe("Keys<T>", () => {

    describe("objects (using ObjectKeys)", () => {
        it("narrow/discrete", () => {
            type Foobar = ObjectKeys<{ foo: 1; bar: 2 }>;
            type FoobarWideVal = ObjectKeys<{ foo: number; bar: string }>;
            type FooBar_RO = ObjectKeys<Readonly<{ foo: 1; bar: 2 }>>;

            type ExplicitlyEmpty = ObjectKeys<ExplicitlyEmptyObject>;

            type Uno = ObjectKeys<{ baz: 3 }>;
            type UnionRec = ObjectKeys<Record<"foo" | "bar", number>>;


            type cases = [
                Expect<HasSameValues<Foobar, ["foo", "bar"]>>,
                Expect<HasSameValues<FoobarWideVal, ["foo", "bar"]>>,
                Expect<Test<ExplicitlyEmpty, "equals", []>>,

                Expect<HasSameValues<FooBar_RO, ["foo", "bar"]>>,
                Expect<HasSameValues<Uno, ["baz"]>>,

                Expect<Test<UnionRec, "equals", ["foo", "bar"]>>,

            ];
        });

        it("narrow/expandable", () => {
            // must have foo and bar, optionally can have keys leading with `_`
            type Expandable = ObjectKeys<Record<"foo" | "bar" | `_${string}`, number>>;
            type FooBar_EXT = ObjectKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;
            //   ^?

            type cases = [
                Expect<Test<Expandable, "equals", ["foo", "bar", ...(`_${string})[]`)]>>,
            ];
        });


        it("wide", () => {
            type Obj = ObjectKeys<object>;
            type EmptyObj = ObjectKeys<EmptyObject>;
            type VeryEmpty = ObjectKeys<ExplicitlyEmptyObject>;
            type KV = ObjectKeys<Dictionary>;

            type X1 = keyof ExplicitlyEmptyObject;
            type X1a = Values<ExplicitlyEmptyObject>;
            type X2 = keyof EmptyObject;
            type X3 = keyof Dictionary;
            type X4 = keyof `_${string}`;

            type StrStr = ObjectKeys<Record<string, string>>;
            type StrAny = ObjectKeys<Record<string, any>>;

            type PatternKey = ObjectKeys<Record<`_${string}`, string>>;
            //   ^?
            type L = Record<`_${string}`, string> extends Record<infer Key, any> ? Key : false;
            type PatternUnion = ObjectKeys<Record<`pub_${string}` | `priv_${string}`, string>>;

            type cases = [
                Expect<Test<Obj, "equals", PropertyKey[]>>,
                Expect<Test<EmptyObj, "equals", PropertyKey[]>>,
                Expect<Test<VeryEmpty, "equals", []>>,
                Expect<Test<KV, "equals", ObjectKey[]>>,


                Expect<Test<StrStr, "equals", string[]>>,
                Expect<Test<StrAny, "equals", string[]>>,

                Expect<Test<PatternKey, "equals", `_${string}`[]>>,
                Expect<Test<PatternUnion, "equals", (`priv_${string}` | `pub_${string}`)[]>>,

            ];

        });


    })

    describe("arrays", () => {

        it("array resolution", () => {

            type cases = [
                Expect<Test<Keys<[]>, "equals", number[]>>,
                Expect<Test<Keys<string[]>, "equals", number[]>>,
                Expect<HasSameKeys<Keys<[1, 2, 3]>, [0, 1, 2]>>,
                Expect<Test<Keys<[1, 2, 3]>, "equals", [0, 1, 2]>>,
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
