import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  MatchParams, MatchRefType, TransformDesc, TransformParams, TransformRefType } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Transform Lookups", () => {

  it("happy path for ref type", () => {
    type U = TransformRefType<"Identity">;
    type S = TransformRefType<"Lowercase">;
    type N = TransformRefType<"Increment">;
    
    type cases = [
      Expect<Equal<U, unknown>>,
      Expect<Equal<S, string>>,
      Expect<Equal<N, number>>,
    ];

    const cases: cases = [ true, true, true ];
  });

  
  it("happy path for params", () => {
    type None = TransformParams<"Identity">;
    type NoneElse = TransformParams<"Identity", "use-else">;
    type Surround = TransformParams<"Surround">;
    type SurroundElse = TransformParams<"Surround", "use-else">;
    
    type cases = [
      Expect<Equal<None, []>>,
      Expect<Equal<NoneElse, [unknown]>>,
      Expect<Equal<Surround, [string, string]>>,
      Expect<Equal<SurroundElse, [string, string, unknown ]>>
    ];
    const cases: cases = [ 
      true, true, true, true
    ];
  });

  it("happy path for desc", () => {
    type D = TransformDesc<"AllCaps">;

    type cases = [
      Expect<Equal<
        D,
        "Converts a string input to all uppercase characters"
      >>
    ];
    const cases: cases = [ true ];
  
  });
  

});

describe("Match Lookups", () => {
  it("happy path for ref type", () => {    
    type U = MatchRefType<"Falsy">;
    type S = MatchRefType<"Includes">;
    type N = MatchRefType<"GreaterThan">;
    
    type cases = [
      Expect<Equal<U, unknown>>,
      Expect<Equal<S, string>>,
      Expect<Equal<N, number>>,
    ];
  
    const cases: cases = [ true, true, true ];
  });


  it("happy path for params", () => {
    type None = MatchParams<"Falsy">;
    type NoneElse = MatchParams<"Falsy", "use-else">;
    type Surround = MatchParams<"EndsWith">;
    type SurroundElse = MatchParams<"EndsWith", "use-else">;
    
    type cases = [
      Expect<Equal<None, []>>,
      Expect<Equal<NoneElse, [unknown]>>,
      Expect<Equal<Surround, [string]>>,
      Expect<Equal<SurroundElse, [string, unknown ]>>
    ];
    const cases: cases = [ 
      true, true, true, true
    ];
  });

});
