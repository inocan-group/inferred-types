import { describe, it } from "vitest";
import { Expect, AfterFirstChar, Test } from "inferred-types/types";



describe("LastChar<T>", () => {

    it("with string input", () => {
        type Foobar = AfterFirstChar<"Foobar">;
        type EmptyStr = AfterFirstChar<"">;

        type cases = [
            Expect<Test<Foobar, "equals",  "oobar">>,
            Expect<Test<EmptyStr, "equals",  "">>,
        ];
        const cases: cases = [true, true];
    });


    it("with array input", () => {
        type FooBarBaz = AfterFirstChar<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Test<FooBarBaz, "equals",  ["oo", "ar", "az"]>>
        ];

    });


});
