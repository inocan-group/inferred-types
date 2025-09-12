import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { DropChars, Test, UpperAlphaChar } from "inferred-types/types";

describe("DropChars<TContent,TDrop>", () => {
    it("dropping using a single string sequence", () => {
        type Foobar = DropChars<"foobar", "fb">;
        type Foobarbaz = DropChars<"foo, bar, baz", " b">;
        type All = DropChars<"foo", "fo">;

        type cases = [
            Expect<Test<Foobar, "equals",  "ooar">>,
            Expect<Test<Foobarbaz, "equals", "foo,ar,az">>,
            Expect<Test<All, "equals",  "">>,
        ];
        const cases: cases = [true, true, true];
    });

    it("dropping with a union type", () => {
        type FooBarBaz = DropChars<"foo, bar, baz", "b" | "f">;
        type FooBarBaz2 = DropChars<"Foo, Bar, Baz", UpperAlphaChar>;

        type cases = [
            Expect<Test<FooBarBaz, "equals", "oo, ar, az">>,
            Expect<Test<FooBarBaz2,"equals", "oo, ar, az">>,
        ];
    });
});
