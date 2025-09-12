import { describe, it } from "vitest";
import type { Expect, IsWideScalar, Test } from "inferred-types/types";

describe("IsWideScalar<T>", () => {
    it("should return true for wide scalar types", () => {
        // Wide string type
        type T1 = IsWideScalar<string>;

        // Wide number type
        type T2 = IsWideScalar<number>;

        // Wide boolean type
        type T3 = IsWideScalar<boolean>;

        // Wide symbol type
        type T4 = IsWideScalar<symbol>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];
    });

    it("should return false for literal scalar types", () => {
        // Literal string types
        type F1 = IsWideScalar<"hello">;
        type F2 = IsWideScalar<"world">;

        // Literal number types
        type F3 = IsWideScalar<42>;
        type F4 = IsWideScalar<0>;
        type F5 = IsWideScalar<-1>;

        // Literal boolean types
        type F6 = IsWideScalar<true>;
        type F7 = IsWideScalar<false>;

        // Note: `symbol` is actually a wide type in TypeScript, not a literal
        // True literal symbols would be created with Symbol(), which can't be tested here

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
            Expect<Test<F7, "equals", false>>,
        ];
    });

    it("should return false for null and undefined by default", () => {
        // null and undefined are considered literal types by default
        type F1 = IsWideScalar<null>;
        type F2 = IsWideScalar<undefined>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("should return true for null when using allow-null modifier", () => {
        // null with allow-null modifier
        type T1 = IsWideScalar<null, "allow-null">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });

    it("should return true for undefined when using allow-undefined modifier", () => {
        // undefined with allow-undefined modifier
        type T1 = IsWideScalar<undefined, "allow-undefined">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });

    it("should return true for both null and undefined when using both modifiers", () => {
        // both null and undefined with both modifiers
        type T1 = IsWideScalar<null, ["allow-null", "allow-undefined"]>;
        type T2 = IsWideScalar<undefined, ["allow-null", "allow-undefined"]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });

    it("should return false for non-scalar types", () => {
        // Object types
        type F1 = IsWideScalar<object>;
        type F2 = IsWideScalar<{ foo: string }>;
        type F3 = IsWideScalar<Record<string, unknown>>;

        // Array types
        type F4 = IsWideScalar<string[]>;
        type F5 = IsWideScalar<number[]>;
        type F6 = IsWideScalar<[string, number]>;

        // Function types
        type F7 = IsWideScalar<() => void>;
        type F8 = IsWideScalar<(x: string) => number>;

        // Other types
        type F9 = IsWideScalar<bigint>;
        type F10 = IsWideScalar<never>;

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
            Expect<Test<F10, "equals", false>>,
        ];
    });

    it("should return false for edge cases (any and never)", () => {
        // Special cases handled in the implementation
        type F1 = IsWideScalar<any>;
        type F2 = IsWideScalar<never>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });
});
