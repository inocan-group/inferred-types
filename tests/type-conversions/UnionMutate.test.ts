
import { describe, it } from "vitest";
import type { Expect, Test, UnionMutate } from "inferred-types/types";

describe("UnionMutate<T>", () => {

    it("CamelCase", () => {
        type T = UnionMutate<"Foo" | "Bar" | "FooBar", "CamelCase">;

        type cases = [
            Expect<Test<T, "equals",  "foo" | "bar" | "fooBar">>,
        ];
    });

    it("PascalCase", () => {
        type T = UnionMutate<"foo" | "bar" | "fooBar", "PascalCase">;

        type cases = [
            Expect<Test<T, "equals",  "Foo" | "Bar" | "FooBar">>,
        ];
    });

});
