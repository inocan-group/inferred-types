import { describe, it } from "vitest";
import { Expect, Test, HasVariadicParameters } from "inferred-types/types";

describe("HasVariadicParameters<T>", () => {
  it("should return true for functions with variadic parameters that are not wide arrays", () => {
    // Function with rest parameters (variadic tail) - this should return true
    type T1 = HasVariadicParameters<(name: string, ...nickNames: string[]) => string>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for functions without variadic parameters or with wide arrays", () => {
    // Function with no parameters
    type T1 = HasVariadicParameters<() => string>;

    // Function with fixed parameters
    type T2 = HasVariadicParameters<(x: string, y: number) => boolean>;

    // Function with only rest parameters (wide array) - this should return false
    type T3 = HasVariadicParameters<(...args: any[]) => void>;

    // Non-function types
    type T4 = HasVariadicParameters<string>;
    type T5 = HasVariadicParameters<number>;

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
    type T1 = HasVariadicParameters<any>;

    // never type
    type T2 = HasVariadicParameters<never>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });
});
