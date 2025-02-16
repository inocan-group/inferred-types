import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Filter, HasSameValues } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Filter using extends operation", () => {

    it("read-write Tuple, single filter", () => {
        type Foobar = Filter<[1, 2, "foo", "bar"], number>;
        type Foobar2 = Filter<[1, 2, "foo", "bar"], number, "extends">;

        type Numeric = Filter<[1, 2, "foo", "bar"], string>;
        type Hybrid = Filter<[1, 2, "foo", "bar"], 1>;

        type cases = [
            Expect<Equal<Foobar, ["foo", "bar"]>>, //
            Expect<Equal<Foobar2, ["foo", "bar"]>>,
            Expect<Equal<Numeric, [1, 2]>>,
            Expect<Equal<Hybrid, [2, "foo", "bar"]>>,
        ];
        const cases: cases = [true, true, true, true];
    });


    it("readonly Tuple, single filter", () => {
        type Foobar = Filter<readonly [1, 2, "foo", "bar"], number>;
        type Foobar2 = Filter<readonly [1, 2, "foo", "bar"], number, "extends">;
        type Numeric = Filter<readonly [1, 2, "foo", "bar"], string>;
        type Hybrid = Filter<readonly [1, 2, "foo", "bar"], 1>;

        type cases = [
            Expect<Equal<Foobar, readonly ["foo", "bar"]>>, //
            Expect<Equal<Foobar2, readonly ["foo", "bar"]>>,
            Expect<Equal<Numeric, readonly [1, 2]>>,
            Expect<Equal<Hybrid, readonly [2, "foo", "bar"]>>,
        ];
        const cases: cases = [true, true, true, true];
    });



    it("startsWith operation", () => {
        type Foo = Filter<[1, 2, "foo", "foobar", "bar"], "foo", "startsWith">;

        type cases = [
            Expect<Equal<Foo, [1, 2, "bar"]>>,
        ];
        const cases: cases = [
            true
        ];

    });


    it("filter out wide types, including never", () => {
        type StripNumbers = Filter<[1, never, "foo", number, "bar"], number>;
        type StripStrings = Filter<[never, 1, never, "foo", never, "bar", false], string>;
        type StripNever = Filter<[1, never, "foo", number, "bar"], never>;

        type cases = [
            Expect<Equal<StripNumbers, [never, "foo", "bar"]>>,
            Expect<Equal<StripStrings, [never, 1, never, never, false]>>,
            Expect<Equal<StripNever, [1, "foo", number, "bar"]>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("read-write Tuple, multiple extends filters (OR)", () => {
        type T1 = Filter<[1, 2, "foo", "bar"], ["bar", 1, 7]>;
        type T2 = Filter<[1, 2, "foo", "bar"], "bar" | 1 | 7>;
        type T3 = Filter<[1, 2, "foo", "bar"], [1, "foo"]>;
        type T4 = Filter<[1, 2, "foo", "bar", true], [string, boolean]>;

        type cases = [
            Expect<Equal<T1, [2, "foo"]>>,
            Expect<Equal<T2, [2, "foo"]>>,
            Expect<Equal<T3, [2, "bar"]>>,
            Expect<Equal<T4, [1, 2]>>,
        ];
        const cases: cases = [true, true, true, true];
    });

    it("readonly Tuple, Tuple Filter", () => {
        type T1 = Filter<readonly [1, 2, "foo", "bar"], [number, boolean]>;
        type T2 = Filter<readonly [1, 2, "foo", "bar"], [1, "foo"]>;
        type T3 = Filter<readonly [1, 2, "foo", "bar", true], [string, boolean]>;

        type cases = [
            Expect<Equal<T1, readonly ["foo", "bar"]>>,
            Expect<Equal<T2, readonly [2, "bar"]>>,
            Expect<Equal<T3, readonly [1, 2]>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("Filtering with r/w no-equal and equals", () => {
        type List = [1, 2, "foo", "bar", never, 1];

        type One = Filter<List, 1, "equals">;


        type cases = [
            Expect<Equal<One, [2, "foo", "bar", never]>>,
        ];
        const cases: cases = [true];
    });

    it("Filtering with readonly no-equal and equals", () => {
        type List = readonly [1, 2, "foo", "bar", never, 1];

        type One = Filter<List, 1, "equals">;

        type cases = [
            Expect<Equal<One, readonly [2, "foo", "bar", never]>>,
        ];
        const cases: cases = [true];
    });

    it("Filter array with equals", () => {
        type T1 = Filter<
            [1, 2, "foo", "bar", "baz", never],
            "foo",
            "equals"
        >;

        type cases = [
            Expect<HasSameValues<T1, [1, 2, "bar", "baz", never]>>,
        ];
        const cases: cases = [true];

    });


});

describe.skip("filter() runtime", () => {

    it("using extends", () => {

    });


    it("using equals", () => {


        type cases = [
            /** type tests */
        ];
        const cases: cases = [];

    });


});

