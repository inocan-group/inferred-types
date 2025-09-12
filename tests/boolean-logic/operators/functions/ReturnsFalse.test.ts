import { describe, it } from "vitest";
import type { Expect, ReturnsFalse, Test } from "inferred-types/types";

describe("ReturnsFalse<T>", () => {
  it("should return true for functions that return false", () => {
    // Function returning literal false
    type T1 = ReturnsFalse<() => false>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for functions that do not return false", () => {
    // Function returning literal true
    type T1 = ReturnsFalse<() => true>;

    // Function returning string
    type T2 = ReturnsFalse<() => string>;

    // Function returning number
    type T3 = ReturnsFalse<() => number>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // Non-function type
    type T1 = ReturnsFalse<string>;

    // never type
    type T2 = ReturnsFalse<never>;

    // any type
    type T3 = ReturnsFalse<any>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });
});
