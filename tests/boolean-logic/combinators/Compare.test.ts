import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Compare, IsBoolean, UpperAlphaChar, IsFalse } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Compare<TVal,TOp,TComparator", () => {

    it("happy path", () => {
        type T1 = Compare<42, "extends", number>;
        type T1a = Compare<42, "extends", [number]>;

        type T2 = Compare<42, "equals", 42>;
        type T2a = Compare<42, "equals", [42]>;
        type T2b = Compare<42, "equals", [42, 99]>;

        type T2s = Compare<42, "equalsSome", 42>;
        type T2sb = Compare<42, "equalsSome", [42, 99]>;
        type T2sc = Compare<99, "equalsSome", [42, 99]>;

        type T3 = Compare<420, "startsWith", 42>;
        type T4 = Compare<"foobar", "startsWith", "foo">;
        type T5 = Compare<["foo", "bar"], "containsSome", "bar">;
        type T6 = Compare<"Foo", "startsWith", UpperAlphaChar>;
        type T7 = Compare<42, "greaterThan", 30>;

        type F1 = Compare<number, "extends", 42>;
        type F2 = Compare<["foo", "bar"], "containsSome", "baz">;
        type F3 = Compare<"foo", "startsWith", UpperAlphaChar>;

        type O1 = Compare<"foobar", "greaterThan", 42>;
        type O2 = Compare<number, "greaterThan", 42>;
        type O3 = Compare<string, "startsWith", "foo">;


        type cases = [
            Expect<Equal<T1, true>>,
            Expect<Equal<T1a, true>>,

            Expect<Equal<T2, true>>,
            Expect<Equal<T2a, true>>,
            Expect<Equal<T2b, never>>, // only allows single param

            // "equalsSome" requires at least two params
            Expect<Equal<T2s, never>>,
            Expect<Equal<T2sb, true>>,
            Expect<Equal<T2sc, true>>,

            Expect<Equal<T3, true>>,
            Expect<Equal<T4, true>>,
            Expect<Equal<T5, true>>,
            Expect<Equal<T6, true>>,
            Expect<Equal<T7, true>>,
            Expect<Equal<F1, false>>,
            Expect<Equal<F2, false>>,
            Expect<Equal<F3, false>>,

            Expect<Equal<O1, false>>,
            Expect<Equal<O2, boolean>>,
            Expect<Equal<O3, boolean>>,
        ];

    });

});

