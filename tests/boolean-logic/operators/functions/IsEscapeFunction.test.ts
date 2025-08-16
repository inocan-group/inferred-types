import { describe, it } from "vitest";
import { Expect, Test, IsEscapeFunction } from "inferred-types/types";

describe("IsEscapeFunction<T>", () => {
  it("should return true for escape functions", () => {
    // Function with no parameters and escape property set to true
    type T1 = IsEscapeFunction<(() => void) & { escape: true }>;

    // Function with no parameters, return type any, and escape property set to true
    type T2 = IsEscapeFunction<(() => any) & { escape: true }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("should return false for non-escape functions", () => {
    // Regular function without escape property
    type T1 = IsEscapeFunction<() => void>;

    // Function with parameters and escape property set to true (not an escape function)
    type T2 = IsEscapeFunction<((x: string) => void) & { escape: true }>;

    // Function with escape property set to false
    type T3 = IsEscapeFunction<(() => void) & { escape: false }>;

    // Function with escape property as string
    type T4 = IsEscapeFunction<(() => void) & { escape: "true" }>;

    // Non-function types
    type T5 = IsEscapeFunction<string>;
    type T6 = IsEscapeFunction<number>;
    type T7 = IsEscapeFunction<object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>,
      Expect<Test<T7, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = IsEscapeFunction<any>;

    // never type
    type T2 = IsEscapeFunction<never>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });
});
