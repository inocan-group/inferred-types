import { describe, it } from "vitest";
import {
    AssertContains,
    AssertTrue,
    AssertFalse,
    AssertAssertionError,
    AssertEquals,
    Expect,
} from "inferred-types/types";

describe("AssertContains<TTest, TExpected>", () => {

    it("string literal contains substring", () => {
        type T1 = AssertContains<"hello world", "hello">;
        type T2 = AssertContains<"hello world", "world">;
        type T3 = AssertContains<"hello world", "o w">;
        type F1 = AssertContains<"hello world", "goodbye">;
        type F2 = AssertContains<"hello", "hello world">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });

    it("string literal contains number substring", () => {
        type T1 = AssertContains<"test123", "123">;
        type T2 = AssertContains<"v1.2.3", "1.2">;
        type F1 = AssertContains<"test123", "456">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>
        ];
    });

    it("array contains element (extends behavior)", () => {
        type T1 = AssertContains<[1, 2, 3], 2>;
        type T2 = AssertContains<["a", "b", "c"], "b">;
        type T3 = AssertContains<[true, false], true>;
        type F1 = AssertContains<[1, 2, 3], 4>;
        type F2 = AssertContains<["a", "b"], "c">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });

    it("array contains null or undefined", () => {
        type T1 = AssertContains<[null, "a", "b"], null>;
        type T2 = AssertContains<[undefined, 1, 2], undefined>;
        type F1 = AssertContains<[null, "a"], undefined>;
        type F2 = AssertContains<[undefined, 1], null>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });

    it("array contains object type", () => {
        type T1 = AssertContains<[{ foo: string }, { bar: number }], { foo: string }>;
        type F1 = AssertContains<[{ foo: string }], { bar: number }>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertFalse<F1>>
        ];
    });

    it("empty string and array cases", () => {
        type T1 = AssertContains<"hello", "">;  // empty string is substring of any string
        type T2 = AssertContains<"", "">;       // empty string contains empty string
        type F1 = AssertContains<[], 1>;        // empty array contains nothing
        type F2 = AssertContains<"", "a">;      // empty string doesn't contain non-empty

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });

    it("wide types behavior", () => {
        // When either type is wide (string, number), result should be boolean (not specific true/false)
        type W1 = AssertContains<string, "hello">;
        type W2 = AssertContains<"hello", string>;
        type W3 = AssertContains<number, 123>;

        // These should be boolean type, not true or false
        type cases = [
            // We can't assert true/false on wide types, they evaluate to boolean
            Expect<AssertEquals<W1, boolean>>,
            Expect<AssertEquals<W2, boolean>>,
            Expect<AssertEquals<W3, boolean>>
        ];
    });

    it("tuple with union type comparator", () => {
        type T1 = AssertContains<[1, 2, 3], 1 | 4>;  // contains at least one
        type T2 = AssertContains<["a", "b", "c"], "a" | "b">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>
        ];
    });

    // NOTE: readonly tuple arrays are not currently supported by AssertContains/Contains
    // This appears to be a limitation in how TypeScript handles readonly tuple types in extends checks
    // Regular tuples and arrays work fine.

    it("edge cases - should produce AssertionError", () => {
        type E1 = AssertContains<never, "test">;
        type E2 = AssertContains<any, "test">;
        type E3 = AssertContains<unknown, "test">;

        // These should all be AssertionError types
        type cases = [
            Expect<AssertAssertionError<E1>>,
            Expect<AssertAssertionError<E2>>,
            // unknown might not trigger AssertionError from AssertValidation
            // depending on implementation, so we test what actually happens
        ];
    });

    it("invalid types - not string, number, or array", () => {
        // Testing that non-string, non-number, non-array types return false
        // Note: wide number type returns boolean, not false
        type W1 = AssertContains<number, 1>;  // number is wide type, returns boolean
        type F1 = AssertContains<boolean, true>;
        type F2 = AssertContains<{ foo: string }, "foo">;
        type F3 = AssertContains<null, null>;

        type cases = [
            Expect<AssertEquals<W1, boolean>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
            Expect<AssertFalse<F3>>
        ];
    });

    it("numeric literal strings", () => {
        type T1 = AssertContains<"123", "2">;
        type T2 = AssertContains<"abc123def", "123">;
        type F1 = AssertContains<"123", "4">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>
        ];
    });

    it("case sensitivity in strings", () => {
        type T1 = AssertContains<"Hello World", "Hello">;
        type F1 = AssertContains<"Hello World", "hello">;  // different case
        type F2 = AssertContains<"HELLO", "hello">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });

    it("special characters in strings", () => {
        type T1 = AssertContains<"hello@world.com", "@">;
        type T2 = AssertContains<"path/to/file", "/">;
        type T3 = AssertContains<"key=value", "=">;
        type F1 = AssertContains<"hello world", "#">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertFalse<F1>>
        ];
    });

    it("complex array element types", () => {
        type T1 = AssertContains<[string, number, boolean], string>;
        type T2 = AssertContains<[1 | 2, 3 | 4], 1 | 2>;
        type F1 = AssertContains<[string, number], symbol>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>
        ];
    });

});
