import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Awaited } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Awaited<T>", () => {

  it("happy path", () => {
    type Num = Awaited<Promise<number>>;
    type NumLit = Awaited<Promise<42>>;
    type NumLit2 = Awaited<PromiseLike<42>>;
    
    type cases = [
      Expect<Equal<Num, number>>,
      Expect<Equal<NumLit, 42>>,
      Expect<Equal<NumLit2, 42>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
