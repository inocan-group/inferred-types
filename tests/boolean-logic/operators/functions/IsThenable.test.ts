import { describe, it } from "vitest";
import { Expect, Test, IsThenable } from "inferred-types/types";

describe("IsThenable<T>", () => {
  it("should return true for thenable objects (promise-like)", () => {
    // Promise object
    type T1 = IsThenable<Promise<string>>;

    // Promise with number
    type T2 = IsThenable<Promise<number>>;

    // Custom thenable object
    type T3 = IsThenable<{ then: (fn: () => void) => void }>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for non-thenable objects", () => {
    // String type
    type T1 = IsThenable<string>;

    // Number type
    type T2 = IsThenable<number>;

    // Object without then method
    type T3 = IsThenable<{ prop: string }>;

    // Function
    type T4 = IsThenable<() => void>;

    // Array
    type T5 = IsThenable<string[]>;

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
    type T1 = IsThenable<any>;

    // never type
    type T2 = IsThenable<never>;

    // null
    type T3 = IsThenable<null>;

    // undefined
    type T4 = IsThenable<undefined>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
    ];
  });
});
