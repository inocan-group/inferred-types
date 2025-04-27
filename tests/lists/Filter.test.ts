import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Filter, Test, UpperAlphaChar } from "inferred-types/types";



describe("Filter", () => {

    it("read-write Tuple, single filter", () => {
        type T1 = Filter<[1, 2, "foo", "bar"], "extends", string>;
        type T2 = Filter<[1, 2, "foo", "bar"], "extends", number>;
        type T3 = Filter<[1, 2, "foo", "bar", 1], "extends", 1>;

        type cases = [
            Expect<Test<T1, "equals", ["foo", "bar"]>>,
            Expect<Test<T2, "equals", [1, 2]>>,
            Expect<Test<T3, "equals", [1, 1]>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("readonly Tuple, single filter", () => {
        type T1 = Filter<readonly [1, 2, "foo", "bar"], "extends", string>;
        type T2 = Filter<readonly [1, 2, "foo", "bar"], "extends", number>;
        type T3 = Filter<readonly [1, 2, "foo", "bar"], "extends", 1>;

        type cases = [
            Expect<Test<T1, "equals",  ["foo",  "bar"]>>,
            Expect<Test<T2, "equals",  [1,  2]>>,
            Expect<Test<T3, "equals",   [1]>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("read-write Tuple, OR/SOME filter", () => {
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

    it("using a tuple comparator", () => {
        type T1 = Filter<[1, 2, "foo", "bar", 1], "extends", [1, "foo"]>;
        type T2 = Filter<[1, 2, "foo", "bar", false], "extends", [number, string]>;
        type T3 = Filter<[1, 2, "foo", "bar", true], "extends", [string, boolean]>;

        type cases = [
            Expect<Test<T1, "equals", [1, "foo",  1]>>,
            Expect<Test<T2, "equals", [1, 2, "foo",  "bar"]>>,
            Expect<Test<T3, "equals", ["foo", "bar",  true]>>,
        ];

    });


    it("using keyEquals", () => {
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



    it("Using operators other than extends", () => {
        type One = Filter<[1, 2, "foo", "bar", 1], "equals", 1>;
        type FooBar = Filter<[1, "foo", 42, false, "foobar"], "contains", "foo">;
        type Cappy = Filter<["foo", "Bar", "Baz"], "startsWith", UpperAlphaChar>;

        type cases = [
            Expect<Test<One, "equals", [1,   1]>>,
            Expect<Test<FooBar, "equals", ["foo",   "foobar"]>>,
            Expect<Test<Cappy, "equals", ["Bar",   "Baz"]>>,
        ];

    });
});
