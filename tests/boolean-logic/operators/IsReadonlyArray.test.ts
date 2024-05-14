import { Equal, Expect } from "@type-challenges/utils";
import { IsReadonlyArray } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsReadonlyArray", () => {

  it("happy path", () => {
    type T1 = IsReadonlyArray<readonly [1,2,3]>;
    type F1 = IsReadonlyArray<[1,2,3]>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<F1, false>>,
    ];
    const cases: cases = [true, true];
  });

});
