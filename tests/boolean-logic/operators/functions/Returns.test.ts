import { describe, it } from "vitest";
import { Expect, Test, Returns } from "inferred-types/types";

describe("Returns<TFn, TExpected>", () => {
  it("should return true when function returns type that extends expected type", () => {
    // Function returning string, checking if it returns string
    type T1 = Returns<() => string, string>;

    // Function returning number, checking if it returns number | string
    type T2 = Returns<(x: number) => number, number | string>;

    // Function returning literal, checking if it returns wider type
    type T3 = Returns<() => "hello", string>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false when function does not return expected type", () => {
    // Function returning string, checking if it returns number
    type T1 = Returns<() => string, number>;

    // Function returning number, checking if it returns string
    type T2 = Returns<(x: number) => number, string>;

    // Function returning object, checking if it returns primitive
    type T3 = Returns<() => object, string>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // Non-function type
    type T1 = Returns<string, string>;

    // never type
    type T2 = Returns<never, string>;

    // any type
    type T3 = Returns<any, string>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });
});
