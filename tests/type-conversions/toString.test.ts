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
            Expect<Equal<Obj, "{ foo: 1, bar: 'hi', baz: { color: 'red' } }">>,
            Expect<Equal<Tup, "[ 1, 2, 'foo' ]">>,
            Expect<Equal<Tup2, "[ 2, 3, { foo: 1, bar: 'hi' } ]">>,
            Expect<Equal<Rec, "Record<string, boolean>">>,
            Expect<Equal<Rec2, "Record<string, true>">>,
            Expect<Equal<M, "Map<string, number>">>,
            Expect<Equal<S, "Set<string[]>">>,
            Expect<Equal<Arr, "string[]">>,
            Expect<Equal<Arr2, "number[]">>,

            Expect<Equal<U1, "Union<...>">>,
            Expect<Equal<U2, "string | number">>,
        ];
    });

});
