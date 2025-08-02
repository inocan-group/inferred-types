import { describe, it } from "vitest";
import { Expect, Test, HasNoParameters } from "inferred-types/types";

describe("HasNoParameters<T>", () => {
  it("should return true for functions with no parameters", () => {
    // Function with no parameters and string return type
    type T1 = HasNoParameters<() => string>;

    // Function with no parameters and number return type
    type T2 = HasNoParameters<() => number>;

    // Function with no parameters and void return type
    type T3 = HasNoParameters<() => void>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for functions with parameters", () => {
    // Function with one parameter
    type T1 = HasNoParameters<(x: string) => string>;

    // Function with multiple parameters
    type T2 = HasNoParameters<(x: string, y: number) => boolean>;

    // Function with rest parameters
    type T3 = HasNoParameters<(...args: any[]) => void>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = HasNoParameters<any>;

    // never type
    type T2 = HasNoParameters<never>;

    // non-function types
    type T3 = HasNoParameters<string>;
    type T4 = HasNoParameters<number>;
    type T5 = HasNoParameters<object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });
});
