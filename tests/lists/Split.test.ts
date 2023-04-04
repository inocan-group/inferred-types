import { describe, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { Split } from "src/types";

describe("Split<T, SEP>", () => {
  it("Split<T, SEP> with string literals", () => {
    const str = "hello world, nice to meet you" as const;
    type Space = Split<typeof str, " ">;
    type Comma = Split<typeof str, ", ">;
    type Chars = Split<"hello">;

    type cases = [
      Expect<Equal<Space, ["hello", "world,", "nice", "to", "meet", "you"]>>,
      Expect<Equal<Comma, ["hello world", "nice to meet you"]>>,
      Expect<Equal<Chars, ["h","e","l","l","o"]>>
    ];
    const cases: cases = [true, true, true ];
  });

  it("Split<T, SEP> where string and separator are same", () => {
    const str = "hello world, 42 nice to meet you" as const;
    type S = Split<typeof str, typeof str>;

    type cases = [Expect<Equal<S, ["",""]>>];
    const cases: cases = [true];
  });

  it("Split<T, SEP> string is wide type", () => {
    const str = "hello world, 42 nice to meet you" as string;
    type S = Split<typeof str, ",">;

    type cases = [Expect<Equal<S, string[]>>];
    const cases: cases = [true];
  });
});
