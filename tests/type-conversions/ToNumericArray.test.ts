import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ToNumericArray } from "src/types/numeric-literals";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ToNumericArray<T>", () => {

  it("happy path", () => {
    type Mixed = ToNumericArray<[1,2,"3",4]>;
    type Mixed_RO = ToNumericArray<readonly [1,2,"3",4]>;
    type AllStr = ToNumericArray<["1","2","3","4"]>;
    type AllStr_RO = ToNumericArray<readonly ["1","2","3","4"]>;
    type None = ToNumericArray<number[]>;
    type None_RO = ToNumericArray<readonly number[]>;
    
    type cases = [
      Expect<Equal<Mixed, [1,2,3,4]>>,
      Expect<Equal<Mixed_RO, readonly [1,2,3,4]>>,
      Expect<Equal<AllStr, [1,2,3,4]>>,
      Expect<Equal<AllStr_RO, readonly [1,2,3,4]>>,
      Expect<Equal<None, number[]>>,
      Expect<Equal<None_RO, readonly number[]>>,
    ];
    const cases: cases = [ 
      true, true, true,
      true, true, true,
    ];
  });

});
