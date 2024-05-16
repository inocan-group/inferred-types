import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { LowerAlphaChar, Replace, ReplaceAll, UpperAlphaChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Replace<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = Replace<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = Replace<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;
    
    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be [[T]]">>,
      Expect<Equal<WideStr, string>>
    ];
    const cases: cases = [
      true, true, true
    ];
  });

});

describe("ReplaceAll<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = ReplaceAll<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = ReplaceAll<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;
    
    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be foobar">>,
      Expect<Equal<WideStr, string>>
    ];
    const cases: cases = [
      true, true, true
    ];
  });

  
  it("using a union type for TFind", () => {
    type Lowered = ReplaceAll<"And there she WAS", UpperAlphaChar, "">;
    type Raised = ReplaceAll<"And there she WAS", LowerAlphaChar | " ", "">;
    
    type cases = [
      Expect<Equal<Lowered, "nd there she ">>,
      Expect<Equal<Raised, "AWAS">>,
    ];
    const cases: cases = [
      true, true
    ];
    
  });
  

});
