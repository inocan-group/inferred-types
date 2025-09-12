import { describe, it, expect } from "vitest";
import type { Expect, OptionalKeys, OptionalKeysTuple, Test } from "inferred-types/types";

describe("OptionalKeys<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type Multiple = OptionalKeys<{ title?: string; value?: number; color?: string }>;
    type OneOptional = OptionalKeys<{ title: string; value: number; color?: string }>;
    type NoOptional = OptionalKeys<{ title: string; value: number; color: string }>;

    type cases = [
      Expect<Test<Multiple, "equals",  "color" | "title" | "value">>,
      Expect<Test<OneOptional, "equals",  "color">>,
      Expect<Test<NoOptional, "equals",  never>>,
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
      Expect<Test<Multiple, "hasSameKeys",  ["title", "value", "color"]>>,
      Expect<Test<OneOptional, "equals",  ["color"]>>,
      Expect<Test<NoOptional, "equals",  []>>,
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

});
