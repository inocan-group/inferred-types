import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Expect, Contains, NarrowlyContains, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Contains<T,A>", () => {
    it("Content is a tuple (using auto op)", () => {
        type T1 = Contains<[number, 32, 64, "foo"], string>;
        type T2 = Contains<["foo", false, true], boolean>;
        type T3 = Contains<[42, 64, 128], number>;
        type T4 = Contains<["foo", "bar"], string>;
        type T5 = Contains<["foo", "bar", null, undefined], null>;

        type TNum = Contains<[number, 32, 64, "foo"], number>;

        type cases = [
            // "foo" extends string so true
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            // "bar" does NOT extend "foo"
            Expect<Test<
                Contains<[number, 32, 64, "foo"], "bar">,
                "equals",  false
            >>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T4, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,
            Expect<Test<T5, "equals",  true>>,
            Expect<Test<TNum, "equals",  true>>,
        ];

    });

    it("using equals operation", () => {
        type T1 = Contains<[number, 32, 64, "foo"], "foo">;
        type T2 = Contains<[number, 32, 64, "foo"], "foo", "equals">;
        type T3 = Contains<[42, 64, 128], 42, "equals">

        type F1 = Contains<[number, 32, 64, "foo"], string, "equals">;
        type F2 = Contains<[42, 64, 128], 442, "equals">;
        type F3 = Contains<[false, true], boolean, "equals">;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];

    });


    it("undefined and null", () => {
        type T1 = Contains<[null], null>;
        type T2 = Contains<[undefined], undefined>;

        type F1 = Contains<[undefined], null>; // =>
        type F2 = Contains<[null], undefined>; // =>

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });



    it("Using numeric literals", () => {
        type Found = Contains<2000, 2>;
        type Found2 = Contains<2000, "2">;
        type Found3 = Contains<"2000", 2>;

        type NotFound = Contains<2000, 1>;
        type NotFound2 = Contains<2000, "1">;
        type NotFound3 = Contains<"2000", 1>;

        type cases = [
            Expect<Test<Found, "equals", true>>,
            Expect<Test<Found2, "equals", true>>,
            Expect<Test<Found3, "equals", true>>,

            Expect<Test<NotFound, "equals", false>>,
            Expect<Test<NotFound2, "equals", false>>,
            Expect<Test<NotFound3, "equals", false>>,
        ];
    });

    it("Content is a string", () => {
        type HasBar = Contains<"FooBar", "Bar">;
        type NoBar = Contains<"FooBaz", "Bar">;
        type WideContent = Contains<string, "Bar">;
        type WideContains = Contains<"FooBar", string>;

        type cases = [
            ExpectTrue<HasBar>,
            ExpectFalse<NoBar>,
            Expect<Test<WideContent, "equals",  boolean>>,
            Expect<Test<WideContains, "equals",  boolean>>
        ];
    });


    it("Comparator is a union", () => {
        type Foo = Contains<["foo", "bar"], ["foo", 42]>;
        type Nada = Contains<["foo", "bar"], [boolean, 42]>;

        type cases = [
            Expect<Test<Foo, "equals", true>>,
            Expect<Test<Nada, "equals", false>>
        ];

    });
});

describe("NarrowlyContains<T,A>", () => {
    it("happy-path", () => {
        type T1 = [number, 32, 64, "foo"];
        type T2 = [false, true];
        type T3 = [42, 64, 128];
        type T4 = ["foo", "bar"];

        type cases = [
            // "foo" is not equal to string
            Expect<Test<NarrowlyContains<T1, string>, "equals",  false>>,
            // "foo" does equal "foo"
            Expect<Test<NarrowlyContains<T1, "foo">, "equals",  true>>,
            // T4 has literal string but this doesn't match with NarrowlyContains
            Expect<Test<NarrowlyContains<T4, string>, "equals",  false>>,
            // T1 has both wide and narrow versions of "number" but match is only on wide type
            Expect<Test<NarrowlyContains<T1, number>, "equals",  true>>,
            // T3 has matches on narrow number
            Expect<Test<NarrowlyContains<T3, 42>, "equals",  true>>,
            // T3 identifies a non-match of narrow numbers
            Expect<Test<NarrowlyContains<T3, 442>, "equals",  false>>,
            // boolean literals evaluate to wide type
            Expect<Test<NarrowlyContains<T2, boolean>, "equals",  false>>
        ];

    });
});
