import { describe, it } from "vitest";
import type { Expect, Some, Test, UnionMemberExtends } from "inferred-types/types";

describe("UnionMemberExtends<T,U>", () => {
  it("should return true when any union member extends the target type", () => {
    // String literal union with matching member
    type T1 = UnionMemberExtends<"foo" | "bar" | "baz", string>;

    // Numeric literal union with matching member
    type T2 = UnionMemberExtends<1 | 2 | 3, number>;

    // Mixed union with matching member
    type T3 = UnionMemberExtends<"hello" | 42 | true, string>;

    // Union with object member extending target
    type T4 = UnionMemberExtends<{ foo: string } | { bar: number }, object>;

    // Union with array member extending target
    type T5 = UnionMemberExtends<string[] | number, Array<any>>;

    type X = string[] extends Array<any> ? true : false;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
      Expect<Test<T4, "equals", true>>,
      Expect<Test<T5, "equals", true>>,
    ];
  });

  it("should return false when no union member extends the target type", () => {
    // String literal union with no number members
    type T1 = UnionMemberExtends<"foo" | "bar" | "baz", number>;

    // Numeric literal union with no string members
    type T2 = UnionMemberExtends<1 | 2 | 3, string>;

    // Boolean literal union with no string members
    type T3 = UnionMemberExtends<true | false, string>;

    // Object union with no array members
    type T4 = UnionMemberExtends<{ foo: string } | { bar: number }, Array<any>>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
    ];
  });

  it("should return false when T is not a union type", () => {
    // Single string literal
    type T1 = UnionMemberExtends<"foo", string>;

    // Single number
    type T2 = UnionMemberExtends<42, number>;

    // Single boolean
    type T3 = UnionMemberExtends<true, boolean>;

    // Object type
    type T4 = UnionMemberExtends<{ foo: string }, object>;

    // Array type
    type T5 = UnionMemberExtends<string[], Array<any>>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });

  it("should handle special cases correctly", () => {
    // any type should return false
    type T1 = UnionMemberExtends<any, string>;

    // never type should return false
    type T2 = UnionMemberExtends<never, string>;

    // unknown type should return boolean
    type T3 = UnionMemberExtends<unknown, string>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", boolean>>,
    ];
  });

  it("should handle edge cases", () => {
    // Union with null and undefined
    type T1 = UnionMemberExtends<"hello" | null, string>;
    type T2 = UnionMemberExtends<"hello" | undefined, string>;
    type T3 = UnionMemberExtends<null | undefined, object>;

    // Union with any/never/unknown
    type T4 = UnionMemberExtends<"hello" | any, string>;

    type T6 = UnionMemberExtends<"hello" | unknown, string>;

    // Empty union (never)
    type T7 = UnionMemberExtends<never, string>;

    // Complex object unions
    type T8 = UnionMemberExtends<{ type: "A"; value: string } | { type: "B"; value: number }, { type: string }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T6, "equals", boolean>>,
      Expect<Test<T7, "equals", false>>,
      Expect<Test<T8, "equals", true>>,
    ];
  });
});

