import { describe, it } from "vitest";
import type { Expect, IsUnitPrimitive, Test } from "inferred-types/types";

describe("IsUnitPrimitive<T>", () => {
  it("should return true for unit primitive types", () => {
    // null and undefined
    type T1 = IsUnitPrimitive<null>;
    type T2 = IsUnitPrimitive<undefined>;

    // literal strings
    type T3 = IsUnitPrimitive<"hello">;
    type T4 = IsUnitPrimitive<"">;

    // literal numbers
    type T5 = IsUnitPrimitive<42>;
    type T6 = IsUnitPrimitive<0>;
    type T7 = IsUnitPrimitive<-1>;

    // literal bigints
    type T8 = IsUnitPrimitive<42n>;
    type T9 = IsUnitPrimitive<0n>;

    // boolean literals
    type T10 = IsUnitPrimitive<true>;
    type T11 = IsUnitPrimitive<false>;

    // unique symbols
    const sym1 = Symbol("test");
    type T12 = IsUnitPrimitive<typeof sym1>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
      Expect<Test<T4, "equals", true>>,
      Expect<Test<T5, "equals", true>>,
      Expect<Test<T6, "equals", true>>,
      Expect<Test<T7, "equals", true>>,
      Expect<Test<T8, "equals", true>>,
      Expect<Test<T9, "equals", true>>,
      Expect<Test<T10, "equals", true>>,
      Expect<Test<T11, "equals", true>>,
      Expect<Test<T12, "equals", true>>,
    ];
  });

  it("should return false for wide primitive types", () => {
    // wide types
    type T1 = IsUnitPrimitive<string>;
    type T2 = IsUnitPrimitive<number>;
    type T3 = IsUnitPrimitive<boolean>;
    type T4 = IsUnitPrimitive<bigint>;
    type T5 = IsUnitPrimitive<symbol>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
    ];
  });

  it("should return false for union types", () => {
    // string unions
    type T1 = IsUnitPrimitive<"foo" | "bar">;
    type T2 = IsUnitPrimitive<"foo" | string>;

    // number unions
    type T3 = IsUnitPrimitive<1 | 2>;
    type T4 = IsUnitPrimitive<1 | number>;

    // boolean unions
    type T5 = IsUnitPrimitive<true | false>;

    // bigint unions
    type T6 = IsUnitPrimitive<1n | 2n>;
    type T7 = IsUnitPrimitive<1n | bigint>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>,
      Expect<Test<T7, "equals", false>>,
    ];
  });

  it("should return false for any type", () => {
    type T1 = IsUnitPrimitive<any>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
    ];
  });

  it("should return false for non-primitive types", () => {
    // objects
    type T1 = IsUnitPrimitive<{}>;
    type T2 = IsUnitPrimitive<{ foo: "bar" }>;

    // arrays
    type T3 = IsUnitPrimitive<[]>;
    type T4 = IsUnitPrimitive<[1, 2, 3]>;

    // functions
    type T5 = IsUnitPrimitive<() => void>;

    // other types
    type T6 = IsUnitPrimitive<never>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>,
    ];
  });
});
