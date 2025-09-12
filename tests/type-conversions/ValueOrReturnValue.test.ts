import { describe, it } from "vitest";
import type { Expect, Test, ValueOrReturnValue } from "inferred-types/types";

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

    });

    it("happy path for tuple input", () => {
        type Bool = ValueOrReturnValue<readonly [true, () => false, true]>;
        type Mixed = ValueOrReturnValue<[true, () => false, "foo", () => `bar`]>;

        type cases = [
            Expect<Test<Bool, "equals", readonly [true, false,  true]>>,
            Expect<Test<Mixed,"equals", [true, false, "foo",  "bar"]>>,
        ];

    });
});
