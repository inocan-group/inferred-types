import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  Split, UpperAlphaChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Split<T,SEP>", () => {

  it("happy path", () => {
    type CommaFooBarBaz = Split<"foo,bar,baz", ",">;
    type Empty = Split<"">;
    type EmptyToo = Split<"",",">;
    type Characters = Split<"hello","">;
    
    type cases = [
      Expect<Equal<CommaFooBarBaz, ["foo", "bar", "baz"]>>,
      Expect<Equal<
        Characters, 
        ["h", "e", "l", "l", "o"]
      >>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<EmptyToo, []>>,
    ];

    const cases: cases = [
      true, true, true, true
    ];
  });

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
    type Str = "hello";
    type S1 = Split<Str,Str>;
    const str = "hello world" as const;
    type S2 = Split<typeof str, typeof str>;

    type cases = [
      Expect<Equal<S1, ["",""]>>,
      Expect<Equal<S2, ["",""]>>
    ];
    const cases: cases = [true, true];
  });

  it("Split<T, SEP> string is wide type", () => {
    const str = "hello world, 42 nice to meet you" as string;
    type S = Split<typeof str, ",">;

    type cases = [Expect<Equal<S, string[]>>];
    const cases: cases = [true];
  });
  
  it("Split with a union type", () => {
    // TODO: fix split's implementation for union types
    type FooBar = Split<"FooBar", UpperAlphaChar>;
    type FooBarOmit = Split<"FooBar", UpperAlphaChar, "omit">;
    type FooBarLeading = Split<"FooBar", UpperAlphaChar, "leading">;
    type FooBarTrailing = Split<"Foo, Bar, Baz", ", ", "trailing">;
    
    type cases = [
      Expect<Equal<FooBar, ["oo", "ar"]>>,
      Expect<Equal<FooBarOmit, ["oo", "ar"]>>,
      Expect<Equal<FooBarLeading, ["Foo", "Bar"]>>,
      Expect<Equal<FooBarTrailing, ["Foo, ", "Bar, ", "Baz"]>>,
    ];
    const cases: cases = [ true, true, true ];
    
  });
  

});
