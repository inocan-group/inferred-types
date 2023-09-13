import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { OptionalKeys } from "../../src/types/base";


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
