import { describe, it } from "vitest";
import { Expect, Test, HasEscapeFunction } from "inferred-types/types";

describe("HasEscapeFunction<T>", () => {
  it("should return true for objects with an escape function", () => {
    // Object with escape function property
    type T1 = HasEscapeFunction<{
      escape: (() => void) & { escape: true }
    }>;

    // Object with multiple functions, one being an escape function
    type T2 = HasEscapeFunction<{
      doSomething: () => string;
      escape: (() => void) & { escape: true };
      doSomethingElse: () => number;
    }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>
    ];
  });

  it("should return false for objects without an escape function", () => {
    // Object with no functions
    type T1 = HasEscapeFunction<{
      name: string;
      age: number;
    }>;

    // Object with functions but no escape function
    type T2 = HasEscapeFunction<{
      doSomething: () => string;
      doSomethingElse: () => number;
    }>;

    // Object with escape property that is not a function
    type T3 = HasEscapeFunction<{
      escape: string;
    }>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = HasEscapeFunction<any>;

    // never type
    type T2 = HasEscapeFunction<never>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>
    ];
  });
});
