import { Expect, Test, ToString, UnionToString } from "inferred-types/types";
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
            Expect<Test<Obj, "equals",  "{ foo: 1, bar: 'hi',  baz: { color: 'red' } }">>,
            Expect<Test<Tup, "equals",  "[ 1, 2,  'foo' ]">>,
            Expect<Test<Tup2, "equals",  "[ 2, 3, { foo: 1,  bar: 'hi' } ]">>,
            Expect<Test<Rec, "equals",  "Record<string,  boolean>">>,
            Expect<Test<Rec2, "equals",  "Record<string,  true>">>,
            Expect<Test<M, "equals",  "Map<string,  number>">>,
            Expect<Test<S, "equals",  "Set<string[]>">>,
            Expect<Test<Arr, "equals",  "string[]">>,
            Expect<Test<Arr2, "equals",  "number[]">>,

            Expect<Test<U1, "equals",  "Union<...>">>,
            Expect<Test<U2, "equals",  "string | number">>,
        ];
    });

});
