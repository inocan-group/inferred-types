import { describe, it } from "vitest";
import type {
    Expect,
    IsNarrowingFn,
    Test,
    Increment,
} from "inferred-types/types";

describe("IsNarrowingFn<T>", () => {
    it("should return true for functions that use generics to narrow input parameters", () => {
        // Function that uses generics to narrow input parameters
        type T1 = IsNarrowingFn<<T extends string>(x: T) => T>;

        // Another narrowing function
        type T2 = IsNarrowingFn<<T extends number>(x: T) => T>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });

    it("correctly detects narrow functions which use the generic as a part of the return type", () => {
        // returns a string literal which includes the input parameter (narrowed by generic)
        type T1 = IsNarrowingFn<<T extends string>(x: T) => `hi ${T}`>;
        // a simple test to validate that a simple abstraction doesn't block the test
        type Fn = <T extends string>(x: T) => `hi ${T}`;
        type T2 = IsNarrowingFn<Fn>;
        // using another type utility in return type
        type T3 = IsNarrowingFn<<T extends number>(x: T) => Increment<T>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("detects narrowing when a UNION constraint is woven into a template-literal return", () => {
        // Regression: TypeScript collapses `ReturnType<BobNancy>` to `any` when a
        // generic whose constraint is a *union* feeds the type parameter into a
        // template literal. That `any` used to poison `IsStaticFn`'s reconstruction
        // check, causing `IsNarrowingFn` to (wrongly) report `false`.
        type BobNancy = <T extends "Bob" | "Nancy">(name: T) => `hi ${T}`;

        type Narrowing = IsNarrowingFn<BobNancy>;

        type cases = [
            Expect<Test<Narrowing, "equals", true>>,
        ];
    });

    it("should return false for functions that don't use generics to narrow input parameters", () => {
        // Regular function with fixed types
        type T1 = IsNarrowingFn<(x: string) => string>;

        // Function with literal types
        type T2 = IsNarrowingFn<(x: "foo") => "bar">;

        // Function with no parameters
        type T3 = IsNarrowingFn<() => void>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });

    it("should handle edge cases correctly", () => {
        // any type
        type T1 = IsNarrowingFn<any>;

        // non-function types
        type T2 = IsNarrowingFn<string>;
        type T3 = IsNarrowingFn<number>;

        type cases = [
            Expect<Test<T1, "equals", boolean>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });
});
