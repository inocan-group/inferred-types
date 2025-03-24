import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { FirstChar } from "inferred-types/types";


describe("FirstChar<T>", () => {

    it("with string input", () => {
        type Foobar = FirstChar<"Foobar">;
        type EmptyStr = FirstChar<"">;

        type cases = [
            Expect<Equal<Foobar, "F">>,
            Expect<Equal<EmptyStr, never>>,
        ];
        const cases: cases = [true, true];
    });


    it("with array input", () => {
        type FooBarBaz = FirstChar<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Equal<FooBarBaz, ["f", "b", "b"]>>
        ];
        const cases: cases = [true];

    });


});
