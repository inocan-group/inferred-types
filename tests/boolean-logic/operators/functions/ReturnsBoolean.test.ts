import { describe, it } from "vitest";
import type { Expect, ReturnsBoolean, Test } from "inferred-types/types";

describe("ReturnsBoolean<T>", () => {
  it("should return true for functions that return boolean types", () => {
    // Function returning literal true
    type T1 = ReturnsBoolean<() => true>;

    // Function returning literal false
    type T2 = ReturnsBoolean<() => false>;

    // Function returning boolean
    type T3 = ReturnsBoolean<() => boolean>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for functions that do not return boolean types", () => {
    // Function returning string
    type T1 = ReturnsBoolean<() => string>;

    // Function returning number
    type T2 = ReturnsBoolean<() => number>;

    // Function returning object
    type T3 = ReturnsBoolean<() => object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // Non-function type
    type T1 = ReturnsBoolean<string>;

    // never type
    type T2 = ReturnsBoolean<never>;

    // any type
    type T3 = ReturnsBoolean<any>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });
});
