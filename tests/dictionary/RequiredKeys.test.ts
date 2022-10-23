import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { RequiredKeys } from "src/types/dictionary";

type Test = { title: string; value: number; color?: string };

describe("RequiredKeys<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type T = RequiredKeys<Test>;

    type cases = [Expect<Equal<T, "title" | "value">>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("basic usage with a value filter", () => {
    type T1 = RequiredKeys<Test, string>;
    type T2 = RequiredKeys<Test, number>;

    type cases = [Expect<Equal<T1, "title">>, Expect<Equal<T2, "value">>];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});
