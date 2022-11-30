import { describe, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { AfterFirst, First } from "src/types/lists";

describe("First<T>, AfterFirst<T>", () => {
  it("First<T> with literals", () => {
    const arr = ["one", "two", 42] as const;
    type F = First<typeof arr>;
    type cases = [Expect<Equal<F, "one">>];
    const cases: cases = [true];
  });
  it("First<T> with wide types but literal array", () => {
    const arr = ["one" as string, "two", 42] as const;
    type F = First<typeof arr>;
    type cases = [Expect<Equal<F, string>>];
    const cases: cases = [true];
  });
  it("First<T> with a non const array", () => {
    const arr = ["one", "two", 42];
    type F = First<typeof arr>;
    type cases = [Expect<Equal<F, string | number>>];
    const cases: cases = [true];
  });

  it("AfterFirst<T> with literals", () => {
    const arr = ["one", "two", 42] as const;
    type AF = AfterFirst<typeof arr>;
    type cases = [Expect<Equal<AF, ["two", 42]>>];
    const cases: cases = [true];
  });
  it("AfterFirst<T> with wide types but literal array", () => {
    const arr = ["one", "two" as string, 42] as const;
    type AF = AfterFirst<typeof arr>;
    type cases = [Expect<Equal<AF, [string, 42]>>];
    const cases: cases = [true];
  });
  it("AfterFirst<T> with a non const array", () => {
    const arr = ["one", "two", 42];
    type AF = AfterFirst<typeof arr>;
    type cases = [Expect<Equal<AF, (string | number)[]>>];
    const cases: cases = [true];
  });
});
