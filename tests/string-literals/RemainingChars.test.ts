import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AfterFirstChar } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("LastChar<T>", () => {

    it("with string input", () => {
        type Foobar = AfterFirstChar<"Foobar">;
        type EmptyStr = AfterFirstChar<"">;

        type cases = [
            Expect<Equal<Foobar, "oobar">>,
            Expect<Equal<EmptyStr, "">>,
        ];
        const cases: cases = [true, true];
    });


    it("with array input", () => {
        type FooBarBaz = AfterFirstChar<["foo", "bar", "baz"]>;

        type cases = [
            Expect<Equal<FooBarBaz, ["oo", "ar", "az"]>>
        ];
        const cases: cases = [true];

    });


});
