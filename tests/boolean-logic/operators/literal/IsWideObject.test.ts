import { describe, it } from "vitest";
import {
    Expect,
    IsWideObject,
    Test,
} from "inferred-types/types";

describe("IsWideObject<T>", () => {
    it("should return true for wide object types", () => {
        // The base `object` type is considered wide
        type T1 = IsWideObject<object>;

        // Dictionary types are considered wide
        type T2 = IsWideObject<Record<string, string>>;
        type T3 = IsWideObject<Record<string, number>>;

        // Map with non-literal keys is considered wide
        type T4 = IsWideObject<Map<string, string>>;
        type T5 = IsWideObject<Map<number, string>>;

        // Set
        type T6 = IsWideObject<Set<string>>;

        // Weakmap
        type T7 = IsWideObject<WeakMap<object, string>>;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
        ];
    });

    it("should return false for literal objects", () => {
        // Literal objects with known keys and literal values
        type F1 = IsWideObject<{ foo: "bar"; baz: 42 }>;
        type F2 = IsWideObject<{ x: 1; y: 2; z: 3 }>;

        // Record with literal keys is not wide
        type F4 = IsWideObject<Record<"foo" | "bar", string>>;
        type F5 = IsWideObject<Record<1 | 2 | 3, string>>;

        // Map with literal union keys is not wide
        type F6 = IsWideObject<Map<"foo" | "bar", string>>;
        type F7 = IsWideObject<Map<1 | 2 | 3, number>>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
            Expect<Test<F7, "equals", false>>,
        ];
    });

    it("should return false for non-object types", () => {
        // Primitive types
        type T1 = IsWideObject<string>;
        type T2 = IsWideObject<number>;
        type T3 = IsWideObject<boolean>;
        type T4 = IsWideObject<null>;
        type T5 = IsWideObject<undefined>;

        // Array types (not objects)
        type T6 = IsWideObject<string[]>;
        type T7 = IsWideObject<[string, number]>;

        // Function types
        type T8 = IsWideObject<() => void>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T5, "equals", false>>,
            Expect<Test<T6, "equals", false>>,
            Expect<Test<T7, "equals", false>>,
            Expect<Test<T8, "equals", false>>,
        ];
    });
});
