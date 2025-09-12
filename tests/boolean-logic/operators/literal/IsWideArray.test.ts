import { describe, it } from "vitest";
import type { DropVariadic, Expect, IsWideArray, Test } from "inferred-types/types";

describe("IsWideArray<T>", () => {
    it("should return true for wide array types", () => {
        // Basic wide arrays
        type T1 = IsWideArray<string[]>;
        type T2 = IsWideArray<number[]>;
        type T3 = IsWideArray<boolean[]>;

        // Union type arrays
        type T4 = IsWideArray<(string | number)[]>;
        type T5 = IsWideArray<unknown[]>;
        type T6 = IsWideArray<any[]>;

        // Readonly arrays
        type T7 = IsWideArray<readonly string[]>;
        type T8 = IsWideArray<readonly number[]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
            Expect<Test<T8, "equals", true>>,
        ];
    });

    it("should return false for tuple types", () => {
        // Fixed length tuples
        type F1 = IsWideArray<[string]>;
        type F2 = IsWideArray<[string, number]>;
        type F3 = IsWideArray<[string, number, boolean]>;

        // Tuple with rest elements but fixed start
        type F4 = IsWideArray<[string, ...number[]]>;
        type F5 = IsWideArray<[...string[], number]>;
        type X = DropVariadic<[...string[]]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
        ];
    });

    it("should return false for non-array types", () => {
        // Primitive types
        type T1 = IsWideArray<string>;
        type T2 = IsWideArray<number>;
        type T3 = IsWideArray<boolean>;
        type T4 = IsWideArray<null>;
        type T5 = IsWideArray<undefined>;

        // Object types
        type T6 = IsWideArray<object>;
        type T7 = IsWideArray<{ foo: string }>;
        type T8 = IsWideArray<Record<string, unknown>>;

        // Function types
        type T9 = IsWideArray<() => void>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T5, "equals", false>>,
            Expect<Test<T6, "equals", false>>,
            Expect<Test<T7, "equals", false>>,
            Expect<Test<T8, "equals", false>>,
            Expect<Test<T9, "equals", false>>,
        ];
    });

    it("should return false for edge cases (any and never)", () => {
        // Special cases handled in the implementation
        type T1 = IsWideArray<any>;
        type T2 = IsWideArray<never>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
        ];
    });
});
