import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ValueOrReturnValue } from "inferred-types/types";



describe("ValueOrReturnValue<T>", () => {

    it("happy path for non-tuple input", () => {
        type True = ValueOrReturnValue<true>;
        type RtnTrue = ValueOrReturnValue<() => true>;
        type Foobar = ValueOrReturnValue<"foobar">;
        type RtnFoobar = ValueOrReturnValue<() => `foobar`>;

        type cases = [
            Expect<Test<True, "equals",  true>>,
            Expect<Test<RtnTrue, "equals",  true>>,
            Expect<Test<Foobar, "equals",  "foobar">>,
            Expect<Test<RtnFoobar, "equals",  "foobar">>,
        ];
        const cases: cases = [
            true, true, true, true
        ];
    });


    it("happy path for tuple input", () => {
        type Bool = ValueOrReturnValue<readonly [true, () => false, true]>;
        type Mixed = ValueOrReturnValue<[true, () => false, "foo", () => `bar`]>;

        type cases = [
            Expect<Test<Bool, readonly [true, false, "equals",  true]>>,
            Expect<Test<Mixed, [true, false, "foo", "equals",  "bar"]>>,
        ];
        const cases: cases = [true, true];

    });


});
