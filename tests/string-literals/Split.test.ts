import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Split, UpperAlphaChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Split<T,SEP>", () => {

  it("happy path", () => {
    type FooBarBaz = Split<"foo, bar, baz", ", ">;
    type FooBarBaz2 = Split<"foo, bar, baz", ", ", "include">;
    type Characters = Split<"hello","">;
    type Empty = Split<"","">;
    type EmptyToo = Split<"",",">;

    type cases = [
      Expect<Equal<FooBarBaz, ["foo", "bar", "baz"]>>,
      Expect<Equal<FooBarBaz2, ["foo, ", "bar, ", "baz"]>>,
      Expect<Equal<
        Characters,
        ["h", "e", "l", "l", "o"]
      >>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<EmptyToo, []>>,
    ];

    const cases: cases = [
      true, true, true, true, true
    ];
  });

  it("Split<T, SEP> with string literals", () => {
    const str = "hello world, nice to meet you" as const;
    type Space = Split<typeof str, " ">;
    type Comma = Split<typeof str, ", ">;
    type Chars = Split<"hello","">;

    type cases = [
      Expect<Equal<Space, ["hello", "world,", "nice", "to", "meet", "you"]>>,
      Expect<Equal<Comma, ["hello world", "nice to meet you"]>>,
      Expect<Equal<Chars, ["h","e","l","l","o"]>>
    ];
    const cases: cases = [true, true, true ];
  });

  it("Split<T, SEP> where string and separator are same", () => {
    type Str = "hello";
    type S1 = Split<Str,Str>;
    const str = "hello world" as const;
    type S2 = Split<typeof str, typeof str>;

    type cases = [
      Expect<Equal<S1, []>>,
      Expect<Equal<S2, []>>
    ];
    const cases: cases = [true, true];
  });

  it("Split with separator as wide type", () => {
    type S = Split<string, ",">;

    type cases = [Expect<Equal<S, string[]>>];
    const cases: cases = [true];
  });

  it("Split with a union type", () => {
    // type LongText = Split<"Hello world, Nice to meet you", UpperAlphaChar>;
    type FooBar = Split<"FooBar", UpperAlphaChar>;
    type FooBarOmitExplicit = Split<"FooBar", UpperAlphaChar, "omit">;
    type FooBarIncluded = Split<"FooBar", UpperAlphaChar, "include">;

    type cases = [
      Expect<Equal<FooBar, ["oo", "ar"]>>,
      Expect<Equal<FooBarOmitExplicit, ["oo", "ar"]>>,
      Expect<Equal<FooBarIncluded, ["Foo", "Bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
