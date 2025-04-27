import { describe, it } from "vitest";
import { Expect, LastChar, Test } from "inferred-types/types";



describe("LastChar<T>", () => {

    it("with string input", () => {
        type Foobar = LastChar<"Foobar">;
        type EmptyStr = LastChar<"">;
        type WideStr = LastChar<string>;

        type cases = [
            Expect<Test<Foobar, "equals",  "r">>,
            Expect<Test<EmptyStr, "equals",  never>>,
            Expect<Test<WideStr, "equals",  string>>
        ];
    });

    it("with array input", () => {
        type FooBarBaz = LastChar<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Test<FooBarBaz, "equals",  ["o", "r", "z"]>>
        ];
    });
});
