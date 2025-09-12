import { describe, it } from "vitest";
import type { Expect, Test, UnionMutate } from "inferred-types/types";

describe("UnionMutation<T, Op>", () => {

    it("Capitalize", () => {
        type T1 = UnionMutate<"foo" | "bar", "Capitalize">;
        type T2 = UnionMutate<"foo" | "bar" | 42, "Capitalize">;

        type cases = [
            Expect<Test<T1, "equals", "Foo" | "Bar">>,
            Expect<Test<T2, "equals", "Foo" | "Bar" | 42>>,
        ];
    });

    it("Uppercase", () => {
        type T1 = UnionMutate<"foo" | "bar", "Uppercase">;
        type T2 = UnionMutate<"foo" | "bar" | 42, "Uppercase">;

        type cases = [
            Expect<Test<T1, "equals", "FOO" | "BAR">>,
            Expect<Test<T2, "equals", "FOO" | "BAR" | 42>>,
        ];
    });

    it("Lowercase", () => {
        type T1 = UnionMutate<"Foo" | "BAR", "Lowercase">;
        type T2 = UnionMutate<"Foo" | "BAR" | 42, "Lowercase">;

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>,
            Expect<Test<T2, "equals", "foo" | "bar" | 42>>,
        ];
    });

    it("KebabCase", () => {
        type T1 = UnionMutate<"fooBar" | "BarBaz", "KebabCase">;
        type T2 = UnionMutate<"fooBar" | "BarBaz" | 42, "KebabCase">;

        type cases = [
            Expect<Test<T1, "equals", "foo-bar" | "bar-baz">>,
            Expect<Test<T2, "equals", "foo-bar" | "bar-baz" | 42>>,
        ];
    });

    it("SnakeCase", () => {
        type T1 = UnionMutate<"fooBar" | "BarBaz", "SnakeCase">;
        type T2 = UnionMutate<"fooBar" | "BarBaz" | 42, "SnakeCase">;

        type cases = [
            Expect<Test<T1, "equals", "foo_bar" | "bar_baz">>,
            Expect<Test<T2, "equals", "foo_bar" | "bar_baz" | 42>>,
        ];
    });

    it("Required", () => {
        type T1 = UnionMutate<"foo" | "bar", "Required">;
        type T2 = UnionMutate<"foo" | "bar" | undefined, "Required">;

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>,
            Expect<Test<T2, "equals", "foo" | "bar">>,
        ];
    });

});
