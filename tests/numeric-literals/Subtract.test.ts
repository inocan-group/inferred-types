;import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Subtract } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Subtract<A,B>", () => {

  it("happy path", () => {
    type One = Subtract<5,4>;
    type Two = Subtract<500,498>;
    
    type cases = [
      Expect<Equal<One, 1>>,
      Expect<Equal<Two, 2>>,
    ];
    const cases: cases = [ true, true];
  });

  
  it("Negative results", () => {
    type NegOne = Subtract<4,5>;
    type NegTwo = Subtract<498,500>;
    
    type cases = [
      Expect<Equal<NegOne, -1>>,
      Expect<Equal<NegTwo, -2>>,
    ];
    const cases: cases = [ true, true ];
  });
  

});
