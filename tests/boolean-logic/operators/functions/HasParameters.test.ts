import { describe, it } from "vitest";
import type { Expect, HasParameters, Test } from "inferred-types/types";

describe("HasParameters<T>", () => {
  it("should return true for functions with at least one parameter", () => {
    // Function with one parameter
    type T1 = HasParameters<(x: string) => string>;

    // Function with multiple parameters
    type T2 = HasParameters<(x: string, y: number) => boolean>;

    // Function with rest parameters
    type T3 = HasParameters<(...args: any[]) => void>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for functions with no parameters", () => {
    // Function with no parameters
    type T1 = HasParameters<() => string>;

    // Function with no parameters and void return
    type T2 = HasParameters<() => void>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = HasParameters<any>;

    // never type
    type T2 = HasParameters<never>;

    // non-function types
    type T3 = HasParameters<string>;
    type T4 = HasParameters<number>;
    type T5 = HasParameters<object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });
});
