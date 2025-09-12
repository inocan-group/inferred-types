import { describe, it } from "vitest";
import type { Expect, HasIndexSignature, Test } from "inferred-types/types";

describe("HasIndexSignature<T>", () => {
  it("should return true for types with index signatures", () => {
    type WithStringIndex = { [key: string]: number };
    type T1 = HasIndexSignature<WithStringIndex>;

    type WithNumberIndex = { [key: number]: string };
    type T2 = HasIndexSignature<WithNumberIndex>;

    type WithSymbolIndex = { [key: symbol]: boolean };
    type T3 = HasIndexSignature<WithSymbolIndex>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
    ];
  });

  it("should return false for types without index signatures", () => {
    type RegularObject = { foo: string; bar: number };
    type T1 = HasIndexSignature<RegularObject>;

    type EmptyObject = {};
    type T2 = HasIndexSignature<EmptyObject>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
    ];
  });

  it("should handle arrays and built-in types correctly", () => {
    type ArrayType = string[];
    type T1 = HasIndexSignature<ArrayType>;

    type cases = [
      Expect<Test<T1, "equals", true>>, // Arrays have numeric index signature
    ];
  });

  it("should handle edge cases", () => {
    type AnyType = any;
    type T1 = HasIndexSignature<AnyType>;

    type NeverType = never;
    type T2 = HasIndexSignature<NeverType>;

    type UnknownType = unknown;
    type T3 = HasIndexSignature<UnknownType>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
    ];
  });
});
