import { describe, it } from "vitest";
import { Expect, Test, IsFnWithDictionary } from "inferred-types/types";

describe("IsFnWithDictionary<T>", () => {
  it("should return true for functions with dictionary properties when TParamMatch is undefined", () => {
    // Function with dictionary properties
    type T1 = IsFnWithDictionary<(() => void) & { prop: string }>;

    // Function with multiple dictionary properties
    type T2 = IsFnWithDictionary<((x: number) => string) & { id: number; name: string }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
    ];
  });

  it("negative tests", () => {
    type F1 = IsFnWithDictionary<() => void>;
    type F2 = IsFnWithDictionary<(x: string) => number>;

    type cases = [
      Expect<Test<F1, "equals", false>>,
      Expect<Test<F2, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = IsFnWithDictionary<any>;

    // never type
    type T2 = IsFnWithDictionary<never>;

    // non-function types
    type T3 = IsFnWithDictionary<string>;
    type T4 = IsFnWithDictionary<number>;
    type T5 = IsFnWithDictionary<object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });
});
