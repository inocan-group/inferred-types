import { describe, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { Split } from "src/types/lists";

describe("Split<T, SEP>", () => {
  it("Split<T, SEP> with string literals", () => {
    const str = "hello world, nice to meet you" as const;
    type S = Split<typeof str, " ">;

    type cases = [Expect<Equal<S, ["hello", "world,", "nice", "to", "meet", "you"]>>];
    const cases: cases = [true];
  });

  it("Split<T, SEP> where string and separator are same", () => {
    const str = "hello world, 42 nice to meet you" as const;
    type S = Split<typeof str, typeof str>;

    type cases = [Expect<Equal<S, []>>];
    const cases: cases = [true];
  });

  it("Split<T, SEP> string is wide type", () => {
    const str = "hello world, 42 nice to meet you" as string;
    type S = Split<typeof str, ",">;

    type cases = [Expect<Equal<S, string[]>>];
    const cases: cases = [true];
  });
});
