import { describe, it } from "vitest";
import { Expect, NotFilter, HasSameValues, Test } from "inferred-types/types";

describe("Filter using extends operation", () => {

    it("read-write Tuple, single filter", () => {
        type Foobar = NotFilter<[1, 2, "foo", "bar"], "extends", number>;
        type Foobar2 = NotFilter<[1, 2, "foo", "bar"], "extends", number>;

        type Numeric = NotFilter<[1, 2, "foo", "bar"], "extends", string>;
        type Hybrid = NotFilter<[1, 2, "foo", "bar"], "extends", 1>;

        type cases = [
            Expect<Test<Foobar, "equals", ["foo", "bar"]>>, //
            Expect<Test<Foobar2, "equals", ["foo", "bar"]>>,
            Expect<Test<Numeric, "equals", [1, 2]>>,
            Expect<Test<Hybrid, "equals", [2, "foo", "bar"]>>,
        ];
    });


    it("readonly Tuple, single filter", () => {
        type Foobar = NotFilter<readonly [1, 2, "foo", "bar"], "extends", number>;
        type Foobar2 = NotFilter<readonly [1, 2, "foo", "bar"], "extends", number>;

        type Numeric = NotFilter<readonly [1, 2, "foo", "bar"], "extends", string>;
        type Hybrid = NotFilter<readonly [1, 2, "foo", "bar"], "extends", 1>;

        type cases = [
            Expect<Test<Foobar, "equals", ["foo", "bar"]>>, //
            Expect<Test<Foobar2, "equals", ["foo", "bar"]>>,
            Expect<Test<Numeric, "equals", [1, 2]>>,
            Expect<Test<Hybrid, "equals", [2, "foo", "bar"]>>,
        ];
    });

    it("startsWith operation", () => {
        type Foo = NotFilter<[1, 2, "foo", "foobar", "bar"], "startsWith", "foo">;

        type cases = [
            Expect<Test<Foo, "equals",  [1, 2, "bar"]>>,
        ];
    });


    it("filter out wide types, including never", () => {
        type StripNumbers = NotFilter<[1, never, "foo", number, "bar"], "extends", number>;
        type StripStrings = NotFilter<[never, 1, never, "foo", never, "bar", false], "extends", string>;
        type StripNever = NotFilter<[1, never, "foo", number, "bar"], "equals", never>;

        type cases = [
            Expect<Test<StripNumbers, "equals",  [never, "foo", "bar"]>>,
            Expect<Test<StripStrings, "equals",  [never, 1, never, never, false]>>,
            Expect<Test<StripNever, "equals",  [1, "foo", number, "bar"]>>,
        ];

    });

    it("read-write Tuple, multiple extends filters (OR)", () => {
        type T1 = NotFilter<[1, 2, "foo", "bar"], "extends", ["bar", 1, 7]>;
        type T2 = NotFilter<[1, 2, "foo", "bar"], "extends", "bar" | 1 | 7>;
        type T3 = NotFilter<[1, 2, "foo", "bar"], "extends", [1, "foo"]>;
        type T4 = NotFilter<[1, 2, "foo", "bar", true], "extends", [string, boolean]>;

        type cases = [
            Expect<Test<T1, "equals", [2, "foo"]>>,
            Expect<Test<T2, "equals", [2, "foo"]>>,
            Expect<Test<T3, "equals", [2, "bar"]>>,
            Expect<Test<T4, "equals", [1, 2]>>,
        ];
    });

    it("readonly Tuple, Tuple Filter", () => {
        type T1 = NotFilter<readonly [1, 2, "foo", "bar"], "extends", [number, boolean]>;
        type T2 = NotFilter<readonly [1, 2, "foo", "bar"], "extends", [1, "foo"]>;
        type T3 = NotFilter<readonly [1, 2, "foo", "bar", true], "extends", [string, boolean]>;

        type cases = [
            Expect<Test<T1, "equals", readonly ["foo", "bar"]>>,
            Expect<Test<T2, "equals", readonly [2, "bar"]>>,
            Expect<Test<T3, "equals", readonly [1, 2]>>,
        ];
    });

    it("Filtering with r/w no-equal and equals", () => {
        type List = [1, 2, "foo", "bar", never, 1];

        type One = NotFilter<List, "equals", 1>;


        type cases = [
            Expect<Test<One, "equals", [2, "foo", "bar", never]>>,
        ];

    });

    it("Filtering with readonly no-equal and equals", () => {
        type List = readonly [1, 2, "foo", "bar", never, 1];

        type One = NotFilter<List, "equals", 1>;

        type cases = [
            Expect<Test<One, readonly [2, "foo", "bar", "equals",  never]>>,
        ];
        const cases: cases = [true];
    });

    it("Filter array with equals", () => {
        type T1 = NotFilter<
            [1, 2, "foo", "bar", "baz", never],
            "equals",
            "foo"
        >;

        type cases = [
            Expect<Test<T1, "hasSameValues", [1, 2, "bar", "baz", never]>>,
        ];
    });


});

