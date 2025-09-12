import { describe, it } from "vitest";
import type { Expect, IsLiteralLikeTuple, Test } from "inferred-types/types";

describe("IsLiteralLikeTuple<T>", () => {

    it("should return true for literal-like tuples", () => {
        // Literal value tuples
        type T1 = IsLiteralLikeTuple<[1, 2, 3]>;
        type T2 = IsLiteralLikeTuple<["hello", "world"]>;
        type T3 = IsLiteralLikeTuple<[true, false]>;
        type T4 = IsLiteralLikeTuple<[1, "hello", true]>;

        // Mixed literal and wide type tuples
        type T5 = IsLiteralLikeTuple<[string, number, boolean]>;
        type T6 = IsLiteralLikeTuple<[1, string, true]>;
        type T7 = IsLiteralLikeTuple<[number, "hello", boolean]>;

        // Empty tuples
        type T10 = IsLiteralLikeTuple<[]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
            Expect<Test<T10, "equals", true>>,
        ];
    });

    it("should return false for non-tuple arrays", () => {
        // Wide arrays
        type F1 = IsLiteralLikeTuple<string[]>;
        type F2 = IsLiteralLikeTuple<number[]>;
        type F3 = IsLiteralLikeTuple<boolean[]>;
        type F4 = IsLiteralLikeTuple<(string | number)[]>;

        // Readonly arrays
        type F5 = IsLiteralLikeTuple<readonly string[]>;
        type F6 = IsLiteralLikeTuple<readonly number[]>;

        // Tuples with optional elements do NOT have a known length
        type F7 = IsLiteralLikeTuple<[1, 2?]>;
        type F8 = IsLiteralLikeTuple<[string, number?]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
            Expect<Test<F7, "equals", false>>,
            Expect<Test<F8, "equals", false>>,
        ];
    });

    it("should return false for variadic tuples", () => {
        // Tuples with variadic tails
        type F1 = IsLiteralLikeTuple<[string, ...number[]]>;
        type F2 = IsLiteralLikeTuple<[...string[], number]>;
        type F3 = IsLiteralLikeTuple<[string, number, ...boolean[]]>;

        // Tuples with variadic heads
        type F4 = IsLiteralLikeTuple<[...string[], number, boolean]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
        ];
    });

    it("should return false for non-array types", () => {
        // Primitive types
        type F1 = IsLiteralLikeTuple<string>;
        type F2 = IsLiteralLikeTuple<number>;
        type F3 = IsLiteralLikeTuple<boolean>;
        type F4 = IsLiteralLikeTuple<null>;
        type F5 = IsLiteralLikeTuple<undefined>;

        // Object types
        type F6 = IsLiteralLikeTuple<object>;
        type F7 = IsLiteralLikeTuple<{ foo: string }>;
        type F8 = IsLiteralLikeTuple<Record<string, unknown>>;

        // Function types
        type F9 = IsLiteralLikeTuple<() => void>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
            Expect<Test<F7, "equals", false>>,
            Expect<Test<F8, "equals", false>>,
            Expect<Test<F9, "equals", false>>,
        ];
    });

    it("should return false for edge cases (any and never)", () => {
        type F1 = IsLiteralLikeTuple<any>;
        type F2 = IsLiteralLikeTuple<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });
});
