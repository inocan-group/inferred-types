import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Split, UpperAlphaChar } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Split<T,SEP>", () => {

  it("happy path", () => {
    type CommaFooBar = Split<"foo,bar", ",">;
    type Characters = Split<"hello","">;
    type Empty = Split<"">;
    type Empty2 = Split<"",",">;
    
    type cases = [
      Expect<Equal<CommaFooBar, ["foo", "bar"]>>,
      Expect<Equal<
        Characters, 
        ["h", "e", "l", "l", "o"]
      >>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<Empty2, []>>,
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

  
  it("Split with a union type", () => {
    type FooBar = Split<"FooBar", UpperAlphaChar>;
    type FooBarOmit = Split<"FooBar", UpperAlphaChar, "omit">;
    type FooBarRetain = Split<"FooBar", UpperAlphaChar, "retain">;
    
    type cases = [
      Expect<Equal<FooBar, ["oo", "ar"]>>,
      Expect<Equal<FooBarOmit, ["oo", "ar"]>>,
      Expect<Equal<FooBarRetain, ["Foo", "Bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
    
  });
  

});
