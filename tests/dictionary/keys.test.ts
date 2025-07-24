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
        ];

    });
});


describe("ObjectKeys<T>", () => {

    // `ObjectKeys` is a more direct way of getting keys for Objects
    // we will test this first and then move up to the more abstracted `Keys<T>`
    // which works on both objects and arrays
    describe("objects", () => {
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
            //    ^?

            // this is a different nomenclature for the same type as above
            type FooBarIndex = ObjectKeys<{ foo: 1; bar: 2; [x: `_${string}`]: unknown }>;
            //   ^?

            // here we discretely define `foo` and `bar` but then provide an index
            // which overlaps with them
            type FooBarOverlap = ObjectKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;
            //   ^?

            // what's interesting is that when we overlap we:
            // 1. loose all type information about "foo" and "bar"
            // 2. it seems as though we actually loose the perspective that this is
            //    an object as the keys allowed now is any string or number which
            //    make this type less distinguishable from an array
            type KeyOf = keyof { foo: 1; bar: 2; [x: string]: unknown };
            //    ^?

            type cases = [
                Expect<Test<Expandable, "equals", ["foo", "bar", ...(`_${string})[]`)]>>,
            ];
        });


        it("wide", () => {
            type Obj = ObjectKeys<object>;
            //   ^?
            type EmptyObj = ObjectKeys<EmptyObject>;
            type VeryEmpty = ObjectKeys<ExplicitlyEmptyObject>;
            type KV = ObjectKeys<Dictionary>;

            type X1 = keyof ExplicitlyEmptyObject;
            type X1a = Values<ExplicitlyEmptyObject>;
            type X2 = keyof EmptyObject;
            type X3 = keyof object;
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
    });

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

