import { describe, it, expect } from "vitest";

import type { DictPrependWithFn } from "src/types";
import type { Expect, Equal } from "@type-challenges/utils";

describe("WrapValuesWithFunction<T, R, O>", () => {
  it("happy path", () => {
    const api = {
      static: 42,
      foo: (name: string) => `${name}`,
      multiply: (v1: number, v2: number) => v1 * v2,
    };

    type Api = typeof api;
    type T1 = DictPrependWithFn<Api, [name: string, age: number]>;
    type T2 = DictPrependWithFn<Api, [name: string, age: number], Function>;

    type Expected1 = {
      static: (name: string, age: number) => number;
      foo: (name: string, age: number) => (name: string) => string;
      multiply: (name: string, age: number) => (v1: number, v2: number) => number;
    };

    type Expected2 = {
      static: number;
      foo: (name: string, age: number) => (name: string) => string;
      multiply: (name: string, age: number) => (v1: number, v2: number) => number;
    };

    type cases = [Expect<Equal<T1, Expected1>>, Expect<Equal<T2, Expected2>>];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});
