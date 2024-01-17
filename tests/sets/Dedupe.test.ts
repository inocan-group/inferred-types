import { Expect } from "@type-challenges/utils";
import { Dedupe, HasSameValues } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Dedupe<T>", () => {

  it("happy path", () => {
    type OneTwo = Dedupe<[1,1,1,1,2,2]>;
    type NoWork = Dedupe<[1,2,3]>;
    type Empty = Dedupe<[]>;
    
    type cases = [
      Expect<HasSameValues<OneTwo, [1,2]>>,
      Expect<HasSameValues<NoWork, [1,2,3]>>,
      Expect<HasSameValues<Empty, []>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
