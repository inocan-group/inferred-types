import { describe, it } from "vitest";
import type { Expect, FirstChar, Test } from "inferred-types/types";

describe("FirstChar<T>", () => {

    it("with string input", () => {
        type Foobar = FirstChar<"Foobar">;
        type EmptyStr = FirstChar<"">;

        type cases = [
            Expect<Test<Foobar, "equals",  "F">>,
            Expect<Test<EmptyStr, "equals",  never>>,
        ];
        const cases: cases = [true, true];
    });

    it("with array input", () => {
        type FooBarBaz = FirstChar<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Test<FooBarBaz, "equals", ["f", "b", "b"]>>
        ];

    });
});
