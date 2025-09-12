import { describe, it } from "vitest";
import type { Expect, IsLiteralFn, Test } from "inferred-types/types";

import { TypedFunction } from "inferred-types";

describe("IsLiteralFn<T>", () => {
    it("should return true for literal functions with literal parameters and return types", () => {
        // Function with no parameters and literal return type
        type T1 = IsLiteralFn<() => "hello">;

        // Function with literal parameter and literal return type
        type T2 = IsLiteralFn<(x: "foo") => "bar">;

        // Function with multiple literal parameters and literal return type
        type T3 = IsLiteralFn<(x: "foo", y: 42) => true>;

        // Function with literal union parameters
        type T4 = IsLiteralFn<(x: "foo" | "bar") => "result">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>
        ];
    });

    it("should return true for functions with fixed number of non-literal parameters", () => {
        // Function with string parameter (non-literal)
        type T1 = IsLiteralFn<(x: string) => "hello">;

        // Function with number parameter (non-literal)
        type T2 = IsLiteralFn<(x: number) => "bar">;

        // Function with mixed literal and non-literal parameters
        type T3 = IsLiteralFn<(x: "foo", y: number) => true>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>
        ];
    });

    it("should return false with variadic parameters unless explicitly allowed for", () => {
        type T1 = IsLiteralFn<(name: string, ...nickNames: string[]) => string, "allow-variadic-tail">;
        type F1 = IsLiteralFn<(name: string, ...nickNames: string[]) => string>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("should return false when a wide array is used for parameters", () => {
        type F1 = IsLiteralFn<TypedFunction>;
        type F2 = IsLiteralFn<((...params: any[]) => string)>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("should return true for functions with non-literal return types", () => {
        // Function with string return type (non-literal)
        type T1 = IsLiteralFn<() => string>;

        // Function with number return type (non-literal)
        type T2 = IsLiteralFn<(x: "foo") => number>;

        // Function with boolean return type (non-literal)
        type T3 = IsLiteralFn<(x: "foo") => boolean>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>
        ];
    });

    it("should return false for non-function types", () => {
        type T1 = IsLiteralFn<string>;
        type T2 = IsLiteralFn<number>;
        type T3 = IsLiteralFn<boolean>;
        type T4 = IsLiteralFn<object>;
        type T5 = IsLiteralFn<null>;
        type T6 = IsLiteralFn<undefined>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T5, "equals", false>>,
            Expect<Test<T6, "equals", false>>
        ];
    });

    it("should handle edge cases correctly", () => {
        // any type
        type T1 = IsLiteralFn<any>;

        // never type
        type T2 = IsLiteralFn<never>;

        // Function type (built-in)
        type T3 = IsLiteralFn<Function>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>
        ];
    });

    it("should work with complex literal types", () => {
        // Function with literal object parameter
        type T1 = IsLiteralFn<(x: { type: "foo" }) => "result">;

        // Function with literal tuple parameter
        type T2 = IsLiteralFn<(x: ["foo", 42]) => true>;

        // Function with literal array return type
        type T3 = IsLiteralFn<() => ["foo", "bar"]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>
        ];
    });
});
