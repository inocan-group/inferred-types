import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { OptionalKeys } from "src/types/dictionary";

type Test = { title: string; value: number; color?: string };

describe("OptionalKeys<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type T = OptionalKeys<Test>;

    type cases = [Expect<Equal<T, "color">>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("basic usage with a value filter", () => {
    type T1 = OptionalKeys<Test, string>;
    type T2 = OptionalKeys<Test, number>;

    type cases = [Expect<Equal<T1, "color">>, Expect<Equal<T2, never>>];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});
