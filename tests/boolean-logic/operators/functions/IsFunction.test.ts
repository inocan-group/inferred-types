import { describe, it } from "vitest";
import { Expect, Test, IsFunction } from "inferred-types/types";

describe("IsFunction<T>", () => {
  it("should return true for functions of any kind", () => {
    // Regular function
    type T1 = IsFunction<() => void>;

    // Function with parameters
    type T2 = IsFunction<(x: string) => number>;

    // Function with dictionary properties
    type T3 = IsFunction<(() => void) & { prop: string }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for non-function types", () => {
    // String type
    type T1 = IsFunction<string>;

    // Number type
    type T2 = IsFunction<number>;

    // Object type
    type T3 = IsFunction<object>;

    // Undefined
    type T4 = IsFunction<undefined>;

    // Null
    type T5 = IsFunction<null>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = IsFunction<any>;

    // never type
    type T2 = IsFunction<never>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });
});
