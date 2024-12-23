import { Equal, Expect,  ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {
  Chars,
  IsErrMsg,
  Split,
  UpperAlphaChar,
  IsEqual,
  UnionToTuple
} from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Split<T,SEP>", () => {

  it("happy path", () => {
    type FooBarBaz = Split<"foo, bar, baz", ", ">;
    type FooBarBazBefore = Split<"foo, bar, baz", ", ", "before">;
    type FooBarBazAfter = Split<"foo, bar, baz", ", ", "after">;
    type Characters = Split<"hello","">;
    type Char2 = Chars<"hello">;
    type Empty = Split<"","">;
    type EmptyToo = Split<"",",">;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBarBaz, ["foo", "bar", "baz"]>>,
      Expect<Equal<FooBarBazBefore, ["foo, ", "bar, ", "baz"]>>,
      Expect<Equal<FooBarBazAfter, ["foo", ", bar", ", baz"]>>,
      ExpectTrue<IsErrMsg<Characters, "invalid-separator">>,
      Expect<Equal<
        Char2,
        ["h", "e", "l", "l", "o"]
      >>,
      ExpectTrue<IsErrMsg<Empty, "invalid-separator">>,
      Expect<Equal<EmptyToo, [""]>>,
    ];

  });

  it("Split<T, SEP> with string literals", () => {
    const str = "hello world, nice to meet you" as const;
    type Space = Split<typeof str, " ">;
    type Comma = Split<typeof str, ", ">;

    // @ts-ignore
    type cases = [
      Expect<Equal<Space, ["hello", "world,", "nice", "to", "meet", "you"]>>,
      Expect<Equal<Comma, ["hello world", "nice to meet you"]>>,
    ];
  });

  it("Split<T, SEP> where string and separator are same", () => {
    type Str = "hello";
    type S1 = Split<Str,Str>;
    const str = "hello world" as const;
    type S2 = Split<typeof str, typeof str>;

    // @ts-ignore
    type cases = [
      Expect<Equal<S1, ["", ""]>>,
      Expect<Equal<S2, ["", ""]>>
    ];
  });

  it("Split with separator as wide type", () => {
    type S = Split<string, ",">;

    type cases = [Expect<Equal<S, string[]>>];
    const cases: cases = [true];
  });

  it("Split with a tuple separator", () => {
    type UAC = UnionToTuple<UpperAlphaChar>;
    type FooBar = Split<"FooBar", UAC, "omit">;
    type FooBarBefore = Split<"FooBar", UAC, "before">;
    type FooBarAfter = Split<"FooBar", UAC, "after">;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, ["oo", "ar"]>>,
      Expect<Equal<FooBarBefore, ["F", "ooB", "ar"]>>,
      Expect<IsEqual<FooBarAfter, ["Foo", "Bar"]>>,
    ];
  });

  it("Split with a union separator", () => {
    type FooBar = Split<"FooBar", UpperAlphaChar, "omit">;
    type FooBarBefore = Split<"FooBar", UpperAlphaChar, "before">;
    type FooBarAfter = Split<"FooBar", UpperAlphaChar, "after">;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, ["oo", "ar"]>>,
      Expect<Equal<FooBarBefore, ["F", "ooB", "ar"]>>,
      Expect<IsEqual<FooBarAfter, ["Foo", "Bar"]>>,
    ];
  });

});

