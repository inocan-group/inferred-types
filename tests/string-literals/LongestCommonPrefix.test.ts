import { describe, it } from "vitest";
import type { Expect, LongestCommonPrefix, Test } from "inferred-types/types";

describe("LongestCommonPrefix<T>", () => {
    it("finds the shared prefix across a union of literals", () => {
        type P1 = LongestCommonPrefix<"hi Bob" | "hi Nancy">;
        type P2 = LongestCommonPrefix<"abc" | "abd" | "abe">;
        type P3 = LongestCommonPrefix<"foobar" | "foobaz" | "foo">;

        type cases = [
            Expect<Test<P1, "equals", "hi ">>,
            Expect<Test<P2, "equals", "ab">>,
            Expect<Test<P3, "equals", "foo">>,
        ];
    });

    it("a single literal is its own prefix", () => {
        type P1 = LongestCommonPrefix<"hi Bob">;
        type P2 = LongestCommonPrefix<"">;

        type cases = [
            Expect<Test<P1, "equals", "hi Bob">>,
            Expect<Test<P2, "equals", "">>,
        ];
    });

    it("returns an empty string when nothing is shared", () => {
        type P1 = LongestCommonPrefix<"foo" | "bar">;
        // a differing first character short-circuits immediately
        type P2 = LongestCommonPrefix<"axy" | "bxy">;

        type cases = [
            Expect<Test<P1, "equals", "">>,
            Expect<Test<P2, "equals", "">>,
        ];
    });

    it("a wide string collapses the prefix to empty", () => {
        type P1 = LongestCommonPrefix<string>;
        // a wide member within a union also collapses the prefix
        type P2 = LongestCommonPrefix<"hi Bob" | string>;

        type cases = [
            Expect<Test<P1, "equals", "">>,
            Expect<Test<P2, "equals", "">>,
        ];
    });
});
