import { describe, it } from "vitest";
import type { Expect, IsNarrowingFn, Test } from "inferred-types/types";

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
