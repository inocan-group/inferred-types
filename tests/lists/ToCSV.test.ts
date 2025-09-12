import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Test, ToCSV } from "inferred-types/types";

describe("ToCSV<TTuple,TReplace>", () => {

    it("happy path", () => {
        type FooBarBaz = ToCSV<["foo", "bar", "baz"]>;
        type MixedUp = ToCSV<["foo", 42, true]>;
        type WithComma = ToCSV<["foo, bar", "baz"]>;
        type WithComma2 = ToCSV<["foo, bar", "baz"], "|">;

        type cases = [
            Expect<Test<FooBarBaz, "equals", "foo,bar,baz">>,
            Expect<Test<MixedUp, "equals", "foo,42,true">>,
            Expect<Test<WithComma, "equals", "foo<comma> bar,baz">>,
            Expect<Test<WithComma2, "equals", "foo| bar,baz">>,

        ];
    });

});
