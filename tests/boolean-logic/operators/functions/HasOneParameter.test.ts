import { describe, it } from "vitest";
import { Expect, Test, HasOneParameter } from "inferred-types/types";

describe("HasOneParameter<T>", () => {
  it("should return the parameters array for functions", () => {
    // Function with one string parameter
    type T1 = HasOneParameter<(x: string) => string>;

    // Function with one number parameter
    type T2 = HasOneParameter<(x: number) => boolean>;

    // Function with no parameters
    type T3 = HasOneParameter<() => string>;

    // Function with multiple parameters
    type T4 = HasOneParameter<(x: string, y: number) => boolean>;

    type cases = [
      Expect<Test<T1, "equals", [string]>>,
      Expect<Test<T2, "equals", [number]>>,
      Expect<Test<T3, "equals", []>>,
      Expect<Test<T4, "equals", [string, number]>>,
    ];
  });

  it("should return false for non-function types", () => {
    // any type
    type T1 = HasOneParameter<any>;

    // never type
    type T2 = HasOneParameter<never>;

    // non-function types
    type T3 = HasOneParameter<string>;
    type T4 = HasOneParameter<number>;
    type T5 = HasOneParameter<object>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });
});
