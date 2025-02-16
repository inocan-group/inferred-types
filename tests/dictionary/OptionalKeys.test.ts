import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { OptionalKeys, OptionalKeysTuple } from "inferred-types/types";


describe("OptionalKeys<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type Multiple = OptionalKeys<{ title?: string; value?: number; color?: string }>;
    type OneOptional = OptionalKeys<{ title: string; value: number; color?: string }>;
    type NoOptional = OptionalKeys<{ title: string; value: number; color: string }>;

    type cases = [
      Expect<Equal<Multiple, "color" | "title" | "value">>,
      Expect<Equal<OneOptional, "color">>,
      Expect<Equal<NoOptional, never>>,
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

});


describe("OptionalKeysTuple<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type Multiple = OptionalKeysTuple<{ title?: string; value?: number; color?: string }>;
    type OneOptional = OptionalKeysTuple<{ title: string; value: number; color?: string }>;
    type NoOptional = OptionalKeysTuple<{ title: string; value: number; color: string }>;

    type cases = [
      Expect<Equal<Multiple, ["title", "value", "color"]>>,
      Expect<Equal<OneOptional, ["color"]>>,
      Expect<Equal<NoOptional, []>>,
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

});
