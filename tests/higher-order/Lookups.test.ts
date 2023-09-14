import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ComparisonParams, ComparisonRefType, TransformDesc, TransformParams, TransformRefType } from "src/types";

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

describe("Comparison Lookups", () => {

  
  it("happy path for ref type", () => {    
    type U = ComparisonRefType<"Falsy">;
    type S = ComparisonRefType<"StartsWith">;
    type N = ComparisonRefType<"GreaterThan">;
    
    type cases = [
      Expect<Equal<U, unknown>>,
      Expect<Equal<S, string>>,
      Expect<Equal<N, number>>,
    ];
  
    const cases: cases = [ true, true, true ];
  });


  it("happy path for params", () => {
    type None = ComparisonParams<"Falsy">;
    type NoneElse = ComparisonParams<"Falsy", "use-else">;
    type Surround = ComparisonParams<"EndsWith">;
    type SurroundElse = ComparisonParams<"EndsWith", "use-else">;
    
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
