import { describe, it } from "vitest";
import type { Expect, IsStaticFn, Test } from "inferred-types/types";

describe("IsStaticFn<T>", () => {
  it("should return true for functions that do not use generics to narrow input parameters", () => {
    type T1 = IsStaticFn<(x: string) => string>;
    type T2 = IsStaticFn<(x: string, y: number) => void & { foo: 1 }>;
    type T3 = IsStaticFn<((name: string) => `hi ${string}`) & {foo:1}>;
    type T4 = IsStaticFn<((name: string) => `hi ${string}`)>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
      Expect<Test<T4, "equals", true>>,
    ];
  });


  it("functions with NO parameters return false", () => {
    type F1 = IsStaticFn<() => "nope">;

    type cases = [
        Expect<Test<F1, "equals", false>>,
    ];
  });


  it("should return false for functions that use generics to narrow input parameters", () => {
    // Function that uses generics to narrow input parameters
    type F1 = IsStaticFn<<T extends string>(x: T) => T>;

    type cases = [
      Expect<Test<F1, "equals", false>>,
    ];
  });

  it("should handle edge cases correctly", () => {
    // any type
    type T1 = IsStaticFn<any>;

    // non-function types
    type T2 = IsStaticFn<string>;
    type T3 = IsStaticFn<number>;
    type T4 = IsStaticFn<never>;

    type cases = [
      Expect<Test<T1, "equals", boolean>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
    ];
  });
});
