import { Equal, Expect } from "@type-challenges/utils";
import { Negative } from "src/types/numeric-literals/Negative";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Negative<T>", () => {

  it("happy path", () => {
    type Neg = Negative<-42>;
    type Pos = Negative<42>;
    type NegStr = Negative<"-42">;
    type PosStr = Negative<"42">;
    
    type cases = [
      Expect<Equal<Neg, -42>>,
      Expect<Equal<Pos, -42>>,
      Expect<Equal<NegStr, "-42">>,
      Expect<Equal<PosStr, "-42">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
