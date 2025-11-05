import { describe, it } from "vitest";
import type {
    AsArray,
    Expect,
    Test,
    UnionMemberEquals,
    AssertFalse
} from "inferred-types/types";

describe("UnionMemberEquals<T,U>", () => {
    it("should return true when any union member equals the target type", () => {
        type T1 = UnionMemberEquals<"foo" | "bar" | "baz", "foo">;
        type T2 = UnionMemberEquals<1 | 2 | 3, 2>;
        type T3 = UnionMemberEquals<"hello" | 42 | true, true>;
        type T4 = UnionMemberEquals<{ foo: string } | { bar: number }, { bar: number }>;
        type T5 = UnionMemberEquals<string[] | number, number>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
        ];
    });

    it("should return false when there is no equality match", () => {
        type T1 = UnionMemberEquals<"foo" | "bar" | "baz", string>;
        type T2 = UnionMemberEquals<1 | 2 | 3, string>;
        type T3 = UnionMemberEquals<true | false, string>;
        type T4 = UnionMemberEquals<{ foo: string } | { bar: number }, Array<any>>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
        ];
    });

    it("can provide more than one value to test the equality check with", () => {
        type T1 = UnionMemberEquals<"foo" | 42, ["foo", "bar"]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });

    it("when U is a union type it will be converted to a tuple of it's elements", () => {
        type X = AsArray<"foo" | "bar">;
        type F1 = UnionMemberEquals<"foo"  | 42, "foo" | "bar">;
        type F2 = UnionMemberEquals<99  | 42, "foo" | "bar">;

        type cases = [
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F1>>,
        ];
    });

    it("should handle special cases correctly", () => {
        // any type should return false
        type T1 = UnionMemberEquals<any, string>;

        // never type should return false
        type T2 = UnionMemberEquals<never, string>;

        // unknown type should return boolean
        type T3 = UnionMemberEquals<unknown, string>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", boolean>>,
        ];
    });

    it("should handle edge cases", () => {
        type T1 = UnionMemberEquals<"hello" | null, null>;
        type T2 = UnionMemberEquals<"hello" | undefined, undefined>;
        type T3 = UnionMemberEquals<null | undefined, object>;

        // Union with any/never/unknown
        type T4 = UnionMemberEquals<"hello" | any, string>;

        type T6 = UnionMemberEquals<"hello" | unknown, string>;

        // Empty union (never)
        type T7 = UnionMemberEquals<never, string>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T6, "equals", boolean>>,
            Expect<Test<T7, "equals", false>>,
        ];
    });
});

