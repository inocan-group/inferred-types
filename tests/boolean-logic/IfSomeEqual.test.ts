import { Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { SomeEqual, Test } from "inferred-types/types";
import { describe, it } from "vitest";


describe("IfSomeEqual & SomeEqual", () => {

    it("SomeEqual<TVal,TCompareTo> happy path", () => {
        type OneTwo = [1, 2];
        type FooBar = ["foo", "bar"];
        type Never = [never];
        type NeverFoo = [never, "foo"];
        type Wide = [string, number];

        type cases = [
            // numeric literals
            Expect<Test<SomeEqual<OneTwo, 1>, "equals",  true>>,
            Expect<Test<SomeEqual<OneTwo, 2>, "equals",  true>>,
            Expect<Test<SomeEqual<OneTwo, 3>, "equals",  false>>,
            //,
            Expect<Test<SomeEqual<FooBar, "foo">, "equals",  true>>,
            Expect<Test<SomeEqual<FooBar, "bar">, "equals",  true>>,
            Expect<Test<SomeEqual<FooBar, "baz">, "equals",  false>>,

            // never
            Expect<Test<SomeEqual<NeverFoo, "foo">, "equals",  true>>,
            Expect<Test<SomeEqual<Never, never>, "equals",  true>>,
            Expect<Test<SomeEqual<Never, "foo">, "equals",  false>>,

            // wide types
            Expect<Test<SomeEqual<Wide, "foo">, "equals",  false>>,
            Expect<Test<SomeEqual<Wide, 42>, "equals",  false>>,
            Expect<Test<SomeEqual<Wide, number>, "equals",  true>>,

        ];
        const cases: cases = [
            true, true, true,
            true, true, true,
            true, true, true,
            true, true, true
        ];
    });


    it("SomeEqual<TVal,TCompareTo> edge cases", () => {
        type UnionMatch = SomeEqual<[string | symbol, string, symbol], string | symbol>;
        type UnionNotMatch = SomeEqual<[string, symbol], string | symbol>;

        type cases = [
            ExpectTrue<UnionMatch>,
            ExpectFalse<UnionNotMatch>
        ];
        const cases: cases = [true, false];

    });


});


