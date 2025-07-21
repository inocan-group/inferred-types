import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
    Filter,
    Test,
    UnionToTuple,
    UpperAlphaChar,
    EndsWith,
    NumberLike
} from "inferred-types/types";
import { filter } from "inferred-types/runtime";


describe("Filter", () => {

    it("extends, read-write Tuple, single filter", () => {
        type T1 = Filter<[1, 2, "foo", "bar"], "extends", [string]>;
        type T2 = Filter<[1, 2, "foo", "bar"], "extends", [number]>;
        type T3 = Filter<[1, 2, "foo", "bar", 1], "extends", [1]>;

        type cases = [
            Expect<Test<T1, "equals", ["foo", "bar"]>>,
            Expect<Test<T2, "equals", [1, 2]>>,
            Expect<Test<T3, "equals", [1, 1]>>,
        ];
    });

    it("extends, readonly Tuple, single filter", () => {
        type T1 = Filter<readonly [1, 2, "foo", "bar"], "extends", [string]>;
        type T2 = Filter<readonly [1, 2, "foo", "bar"], "extends", [number]>;
        type T3 = Filter<readonly [1, 2, "foo", "bar"], "extends", [1]>;

        type cases = [
            Expect<Test<T1, "equals",  ["foo",  "bar"]>>,
            Expect<Test<T2, "equals",  [1,  2]>>,
            Expect<Test<T3, "equals",   [1]>>,
        ];
    });


    it("isTemplateLiteral", () => {
        type One = Filter<[1,2,"foo", `Hi ${string}`], "isTemplateLiteral", []>;

        type cases = [
            Expect<Test<One, "equals", [`Hi ${string}`]>>
        ];
    });


    it("extends, read-write Tuple, OR/SOME filter", () => {
        type T1 = Filter<[1, 2, "foo", "bar"], "extends", ["foo", 1, 7]>;
        type T2 = Filter<[1, 2, "foo", "bar", false], "extends", [number, string]>;
        type T3 = Filter<[1, 2, "foo", "bar", true], "extends", [string, boolean]>;

        type cases = [
            Expect<Test<T1, "equals", [1,   "foo"]>>,
            Expect<Test<T2, "equals", [1, 2, "foo",  "bar"]>>,
            Expect<Test<T3, "equals", ["foo", "bar",  true]>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("extends, using a tuple comparator", () => {
        type T1 = Filter<[1, 2, "foo", "bar", 1], "extends", [1, "foo"]>;
        type T2 = Filter<[1, 2, "foo", "bar", false], "extends", [number, string]>;
        type T3 = Filter<[1, 2, "foo", "bar", true], "extends", [string, boolean]>;

        type cases = [
            Expect<Test<T1, "equals", [1, "foo",  1]>>,
            Expect<Test<T2, "equals", [1, 2, "foo",  "bar"]>>,
            Expect<Test<T3, "equals", ["foo", "bar",  true]>>,
        ];

    });


    it("objectKeyEquals", () => {
        type Objects = [
            { foo: 1, bar: "hi" },
            { foo: 2, bar: "bye" },
            { foo: 3, bar: "hello again", color: "blue" }
        ];
        type Isolate = Filter<Objects, "objectKeyEquals", ["foo", 2]>

        type cases = [
            Expect<Equal<
                Isolate,
                [ { foo: 2, bar: "bye" } ]
            >>
        ];
    });

    it("startsWith", () => {
        type Cappy = Filter<
            ["foo", "Bar", "Baz"],
            "startsWith",
            [UpperAlphaChar]
        >;


        type CappyTuple = Filter<
            ["foo", "Bar", "Baz"],
            "startsWith",
            UnionToTuple<UpperAlphaChar>
        >;

        type cases = [
            Expect<Test<Cappy, "equals", ["Bar", "Baz"]>>,
            Expect<Test<CappyTuple, "equals", ["Bar", "Baz"]>>,
        ]

    });

    it("endsWith", () => {
        type T1 = Filter<["hello", "world", "testing"], "endsWith", ["ing"]>;
        type T2 = Filter<["foo", "bar", "baz"], "endsWith", ["ar"]>;
        type T3 = Filter<["hello", "world", "testing"], "endsWith", ["o", "ld"]>;

        type X = EndsWith<"hello", ["o", "ld"]>;

        type cases = [
            Expect<Test<T1, "equals", ["testing"]>>,
            Expect<Test<T2, "equals", ["bar"]>>,
            Expect<Test<T3, "equals", ["hello", "world"]>>,
        ];
    });

    it("endsWithNumber", () => {
        type T1 = Filter<["hello1", "world", "test42"], "endsWithNumber">;
        type T2 = Filter<["foo", "bar", "baz"], "endsWithNumber">;

        type cases = [
            Expect<Test<T1, "equals", ["hello1", "test42"]>>,
            Expect<Test<T2, "equals", []>>,
        ];
    });

    it("startsWithNumber", () => {
        type T1 = Filter<["1hello", "world", "42test"], "startsWithNumber">;
        type T2 = Filter<["foo", "bar", "baz"], "startsWithNumber">;

        type cases = [
            Expect<Test<T1, "equals", ["1hello", "42test"]>>,
            Expect<Test<T2, "equals", []>>,
        ];
    });

    it("onlyNumbers", () => {
        type T1 = Filter<["123", "abc", "456"], "onlyNumbers">;
        type T2 = Filter<["12a", "789", "b45"], "onlyNumbers">;

        type cases = [
            Expect<Test<T1, "equals", ["123", "456"]>>,
            Expect<Test<T2, "equals", ["789"]>>,
        ];
    });

    it("alphaNumeric", () => {
        type T1 = Filter<["abc123", "def!", "ghi456"], "alphaNumeric">;
        type T2 = Filter<["hello@", "world123", "test"], "alphaNumeric">;

        type cases = [
            Expect<Test<T1, "equals", ["abc123", "ghi456"]>>,
            Expect<Test<T2, "equals", ["world123", "test"]>>,
        ];
    });

    it("onlyLetters", () => {
        type T1 = Filter<["abc", "def1", "ghi"], "onlyLetters">;
        type T2 = Filter<["hello", "world!", "test"], "onlyLetters">;

        type cases = [
            Expect<Test<T1, "equals", ["abc", "ghi"]>>,
            Expect<Test<T2, "equals", ["hello", "test"]>>,
        ];
    });

    it("contains", () => {
        type T1 = Filter<["hello", "world", "testing"], "contains", ["ell"]>;
        type T2 = Filter<["foo", "bar", "baz"], "contains", ["a"]>;
        type T3 = Filter<[["a", "b"], ["c", "d"], ["e", "f"]], "contains", ["b"]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello"]>>,
            Expect<Test<T2, "equals", ["bar", "baz"]>>,
            Expect<Test<T3, "equals", [["a", "b"]]>>,
        ];
    });

    it("containsAll", () => {
        type T1 = Filter<["hello world", "foo bar", "test"], "containsAll", ["o", "l"]>;
        type T2 = Filter<[["a", "b", "c"], ["d", "e"], ["a", "c"]], "containsAll", ["a", "c"]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello world"]>>,
            Expect<Test<T2, "equals", [["a", "b", "c"], ["a", "c"]]>>,
        ];
    });

    it("containsSome", () => {
        type T1 = Filter<["hello", "world", "testing"], "containsSome", ["x", "ell", "z"]>;
        type T2 = Filter<[["a", "b"], ["c", "d"], ["e", "f"]], "containsSome", ["b", "d"]>;

        type cases = [
            Expect<Test<T1, "equals", ["hello"]>>,
            Expect<Test<T2, "equals", [["a", "b"], ["c", "d"]]>>,
        ];
    });

    it("greaterThan", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "greaterThan", [3]>;
        type T2 = Filter<[10, 20, 15, 5], "greaterThan", [12]>;

        type cases = [
            Expect<Test<T1, "equals", [5, 8]>>,
            Expect<Test<T2, "equals", [20, 15]>>,
        ];
    });

    it("greaterThanOrEqual", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "greaterThanOrEqual", [3]>;
        type T2 = Filter<[10, 20, 15, 5], "greaterThanOrEqual", [15]>;

        type cases = [
            Expect<Test<T1, "equals", [5, 3, 8]>>,
            Expect<Test<T2, "equals", [20, 15]>>,
        ];
    });

    it("lessThan", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "lessThan", [3]>;
        type T2 = Filter<[10, 20, 15, 5], "lessThan", [12]>;

        type cases = [
            Expect<Test<T1, "equals", [1, 2]>>,
            Expect<Test<T2, "equals", [10, 5]>>,
        ];
    });

    it("lessThanOrEqual", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "lessThanOrEqual", [3]>;
        type T2 = Filter<[10, 20, 15, 5], "lessThanOrEqual", [15]>;

        type cases = [
            Expect<Test<T1, "equals", [1, 3, 2]>>,
            Expect<Test<T2, "equals", [10, 15, 5]>>,
        ];
    });

    it("betweenInclusively", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "betweenInclusively", [2, 5]>;
        type T2 = Filter<[10, 20, 15, 5], "betweenInclusively", [10, 15]>;

        type cases = [
            Expect<Test<T1, "equals", [5, 3, 2]>>,
            Expect<Test<T2, "equals", [10, 15]>>,
        ];
    });

    it("betweenExclusively", () => {
        type T1 = Filter<[1, 5, 3, 8, 2], "betweenExclusively", [2, 5]>;
        type T2 = Filter<[10, 20, 15, 5], "betweenExclusively", [5, 20]>;

        type cases = [
            Expect<Test<T1, "equals", [3]>>,
            Expect<Test<T2, "equals", [10, 15]>>,
        ];
    });

    it("equals", () => {
        type T1 = Filter<[1, 2, 3, 2, 4], "equals", [2]>;
        type T2 = Filter<["foo", "bar", "foo"], "equals", ["foo"]>;

        type cases = [
            Expect<Test<T1, "equals", [2, 2]>>,
            Expect<Test<T2, "equals", ["foo", "foo"]>>,
        ];
    });

    it("equalsSome", () => {
        type T1 = Filter<[1, 2, 3, 4, 5], "equalsSome", [2, 4, 6]>;
        type T2 = Filter<["foo", "bar", "baz"], "equalsSome", ["bar", "qux"]>;

        type cases = [
            Expect<Test<T1, "equals", [2, 4]>>,
            Expect<Test<T2, "equals", ["bar"]>>,
        ];
    });

    it("truthy", () => {
        type T1 = Filter<[1, 0, "hello", "", true, false], "truthy">;
        type T2 = Filter<[null, undefined, "test", 42], "truthy">;

        type cases = [
            Expect<Test<T1, "equals", [1, "hello", true]>>,
            Expect<Test<T2, "equals", ["test", 42]>>,
        ];
    });

    it("falsy", () => {
        type T1 = Filter<[1, 0, "hello", "", true, false], "falsy">;
        type T2 = Filter<[null, undefined, "test", 42], "falsy">;

        type cases = [
            Expect<Test<T1, "equals", [0, "", false]>>,
            Expect<Test<T2, "equals", [null, undefined]>>,
        ];
    });

    it("true", () => {
        type T1 = Filter<[true, false, 1, 0], "true">;
        type T2 = Filter<[false, "true", true], "true">;

        type cases = [
            Expect<Test<T1, "equals", [true]>>,
            Expect<Test<T2, "equals", [true]>>,
        ];
    });

    it("false", () => {
        type T1 = Filter<[true, false, 1, 0], "false">;
        type T2 = Filter<[false, "false", true], "false">;

        type cases = [
            Expect<Test<T1, "equals", [false]>>,
            Expect<Test<T2, "equals", [false]>>,
        ];
    });

    it("objectKeyGreaterThan", () => {
        type Objects = [
            { age: 25, name: "Alice" },
            { age: 30, name: "Bob" },
            { age: 20, name: "Charlie" }
        ];
        type T1 = Filter<Objects, "objectKeyGreaterThan", ["age", 25]>;

        type cases = [
            Expect<Equal<T1, [{ age: 30, name: "Bob" }]>>
        ];
    });

    it("objectKeyGreaterThanOrEqual", () => {
        type Objects = [
            { age: 25, name: "Alice" },
            { age: 30, name: "Bob" },
            { age: 20, name: "Charlie" }
        ];
        type T1 = Filter<Objects, "objectKeyGreaterThanOrEqual", ["age", 25]>;

        type cases = [
            Expect<Equal<T1, [{ age: 25, name: "Alice" }, { age: 30, name: "Bob" }]>>
        ];
    });

    it("objectKeyLessThan", () => {
        type Objects = [
            { age: 25, name: "Alice" },
            { age: 30, name: "Bob" },
            { age: 20, name: "Charlie" }
        ];
        type T1 = Filter<Objects, "objectKeyLessThan", ["age", 25]>;

        type cases = [
            Expect<Equal<T1, [{ age: 20, name: "Charlie" }]>>
        ];
    });

    it("objectKeyLessThanOrEqual", () => {
        type Objects = [
            { age: 25, name: "Alice" },
            { age: 30, name: "Bob" },
            { age: 20, name: "Charlie" }
        ];
        type T1 = Filter<Objects, "objectKeyLessThanOrEqual", ["age", 25]>;

        type cases = [
            Expect<Equal<T1, [{ age: 25, name: "Alice" }, { age: 20, name: "Charlie" }]>>
        ];
    });

    it("objectKeyExtends", () => {
        type Objects = [
            { id: 1, name: "Alice" },
            { id: "test", name: "Bob" },
            { id: 2, name: "Charlie" }
        ];
        type T1 = Filter<Objects, "objectKeyExtends", ["id", number]>;
        type T2 = Filter<Objects, "objectKeyExtends", ["id", string]>;

        type cases = [
            Expect<Equal<T1, [{ id: 1, name: "Alice" }, { id: 2, name: "Charlie" }]>>,
            Expect<Equal<T2, [{ id: "test", name: "Bob" }]>>
        ];
    });

    it("errors", () => {
        type T1 = Filter<[Error, "string", 42, Error], "errors">;
        type T2 = Filter<["no", "errors", "here"], "errors">;

        type cases = [
            Expect<Test<T1, "equals", [Error, Error]>>,
            Expect<Test<T2, "equals", []>>,
        ];
    });

    it("returnEquals", () => {
        type Fns = [
            () => string,
            () => number,
            () => boolean,
            () => string
        ];
        type T1 = Filter<Fns, "returnEquals", [string]>;

        type cases = [
            Expect<Test<T1, "equals", [() => string, () => string]>>
        ];
    });

    it("returnExtends", () => {
        type Fns = [
            () => "hello",
            () => number,
            () => "world",
            () => boolean
        ];
        type T1 = Filter<Fns, "returnExtends", [string]>;

        type cases = [
            Expect<Test<T1, "equals", [() => "hello", () => "world"]>>
        ];
    });

});


// RUNTIME

describe("filter()", () => {

    it("partial application of truthy (no params, no accept clause)", () => {
        const truthy = filter("truthy");
        const greaterThanFive = filter("greaterThan", 5);

        type TruthyParams = Parameters<typeof truthy>;
        type GtParams = Parameters<typeof greaterThanFive>;

        type cases = [
            Expect<Test<
                TruthyParams, "equals",
                [ val: readonly unknown[] ]
            >>,
            Expect<Test<
                GtParams, "equals",
                [ val: readonly NumberLike[] ]
            >>,
        ];
    });

    it("extends operation", () => {
        const findFoo = filter("extends", "string" as string);
        const t = findFoo(["foo", "" as string, 42, "bar", 99]);

        expect(t).toEqual(["foo", "", "bar"]);
        type cases = [
            Expect<Test<typeof t, "equals", ["foo", string, "bar"]>>
        ];
    });

    it("equals operation", () => {
        const findFoo = filter("equals", 42);
        const literal = findFoo(["foo", "" as string, 42, "bar", 99]);

        expect(literal).toEqual([42]);
        type cases = [
            Expect<Test<typeof literal, "equals", [42]>>
        ];
    });

    it("startsWith operation", () => {
        const findFoo = filter("startsWith", "foo");
        const t = findFoo(["fooBar", "barBar", "baz", "boot", "foo"]);
        type T = typeof t;

        expect(t).toEqual(["fooBar", "foo"]);
        type cases = [
            Expect<Test<T, "equals", ["fooBar", "foo"]>>
        ];
    });

    it("endsWith operation", () => {
        const findFoo = filter("endsWith", "r");
        const t = findFoo(["fooBar", "barBar", "baz", "boot", "foo"]);
        type T = typeof t;

        expect(t).toEqual(["fooBar", "barBar"]);

        type cases = [
            Expect<Test<T, "equals", ["fooBar", "barBar"]>>
        ];
    });



});
