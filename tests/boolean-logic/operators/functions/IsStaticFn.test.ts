import { describe, it } from "vitest";
import { Expect, Test, IsStaticFn } from "inferred-types/types";

describe("IsStaticFn<T>", () => {
  it("should return true for functions that do not use generics to narrow input parameters", () => {
    // Regular function with fixed types
    type T1 = IsStaticFn<(x: string) => string>;

    // Function with no parameters
    type T2 = IsStaticFn<() => void>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("should return false for functions that use generics to narrow input parameters", () => {
    // Function that uses generics to narrow input parameters
    type T1 = IsStaticFn<<T extends string>(x: T) => T>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = IsStaticFn<any>;

    // non-function types
    type T2 = IsStaticFn<string>;
    type T3 = IsStaticFn<number>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });
});
