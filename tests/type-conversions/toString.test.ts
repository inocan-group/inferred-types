import { Equal, Expect } from "@type-challenges/utils";
import { ToString, UnionToString } from "inferred-types/types";
import { describe, it } from "vitest";


describe("ToString<T>", () => {

    it("happy path", () => {
        type Obj = ToString<{ foo: 1, bar: "hi", baz: { color: "red" } }>;
        type Tup = ToString<[1, 2, "foo"]>
        type Tup2 = ToString<[2, 3, { foo: 1, bar: "hi" }]>
        type Rec = ToString<Record<string, boolean>>
        type Rec2 = ToString<Record<string, true>>
        type M = ToString<Map<string, number>>;
        type S = ToString<Set<string[]>>;
        type Arr = ToString<string[]>;
        type Arr2 = ToString<number[]>;
        type U1 = ToString<string | number>;
        type U2 = UnionToString<string | number>;

        type cases = [
            Expect<Test<Obj, "{ foo: 1, bar: 'hi', "equals",  baz: { color: 'red' } }">>,
            Expect<Test<Tup, "[ 1, 2, "equals",  'foo' ]">>,
            Expect<Test<Tup2, "[ 2, 3, { foo: 1, "equals",  bar: 'hi' } ]">>,
            Expect<Test<Rec, "Record<string, "equals",  boolean>">>,
            Expect<Test<Rec2, "Record<string, "equals",  true>">>,
            Expect<Test<M, "Map<string, "equals",  number>">>,
            Expect<Test<S, "equals",  "Set<string[]>">>,
            Expect<Test<Arr, "equals",  "string[]">>,
            Expect<Test<Arr2, "equals",  "number[]">>,

            Expect<Test<U1, "equals",  "Union<...>">>,
            Expect<Test<U2, "equals",  "string | number">>,
        ];
    });

});
