import { describe, it } from "vitest";
import { Expect, Test, ReturnsTrue } from "inferred-types/types";

describe("ReturnsTrue<T>", () => {
  it("should return true for functions that return true", () => {
    // Function returning literal true
    type T1 = ReturnsTrue<() => true>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
    ];
  });

  it("should return false for functions that do not return true", () => {
    // Function returning literal false
    type T1 = ReturnsTrue<() => false>;

    // Function returning boolean
    type T2 = ReturnsTrue<() => boolean>;

    // Function returning string
    type T3 = ReturnsTrue<() => string>;

    // Function returning number
    type T4 = ReturnsTrue<() => number>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // Non-function type
    type T1 = ReturnsTrue<string>;

    // never type
    type T2 = ReturnsTrue<never>;

    // any type
    type T3 = ReturnsTrue<any>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", never>>,
      Expect<Test<T3, "equals", boolean>>,
    ];
  });
});
