import { describe, it } from "vitest";
import {
    Expect,
    IsLiteralLikeArray,
    Test,
} from "inferred-types/types";

describe("IsLiteralLikeArray<T>", () => {

    it("should return true for literal-like arrays", () => {
        // Arrays with variadic tails but fixed start
        type T1 = IsLiteralLikeArray<[...string[], number]>;
        type T2 = IsLiteralLikeArray<[string, ...number[]]>;
        type T3 = IsLiteralLikeArray<[string, number, ...boolean[]]>;
        type T4 = IsLiteralLikeArray<[...boolean[], string, number]>;

        // Tuples with fixed elements
        type T5 = IsLiteralLikeArray<[string, number]>;
        type T6 = IsLiteralLikeArray<[1, 2, 3]>;
        type T7 = IsLiteralLikeArray<["hello", "world"]>;

        // Tuples with optional elements
        type T8 = IsLiteralLikeArray<[string, number?]>;
        type T9 = IsLiteralLikeArray<[1, 2?]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
            Expect<Test<T8, "equals", true>>,
            Expect<Test<T9, "equals", true>>,
        ];
    });

    it("should return false for wide arrays", () => {
        // Basic wide arrays
        type F1 = IsLiteralLikeArray<string[]>;
        type F2 = IsLiteralLikeArray<number[]>;
        type F3 = IsLiteralLikeArray<boolean[]>;
        type F4 = IsLiteralLikeArray<(string | number)[]>;

        // Readonly wide arrays
        type F5 = IsLiteralLikeArray<readonly string[]>;
        type F6 = IsLiteralLikeArray<readonly number[]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
        ];
    });

    it("should return false for non-array types", () => {
        // Primitive types
        type F1 = IsLiteralLikeArray<string>;
        type F2 = IsLiteralLikeArray<number>;
        type F3 = IsLiteralLikeArray<boolean>;
        type F4 = IsLiteralLikeArray<null>;
        type F5 = IsLiteralLikeArray<undefined>;

        // Object types
        type F6 = IsLiteralLikeArray<object>;
        type F7 = IsLiteralLikeArray<{ foo: string }>;
        type F8 = IsLiteralLikeArray<Record<string, unknown>>;

        // Function types
        type F9 = IsLiteralLikeArray<() => void>;

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
        type F1 = IsLiteralLikeArray<any>;
        type F2 = IsLiteralLikeArray<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });
});
