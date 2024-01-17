import { Equal, Expect } from "@type-challenges/utils";
import { IfReadonlyArray } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfReadonlyArray", () => {

  it("happy path", () => {
    type T1 = IfReadonlyArray<readonly [1,2,3], true, false>;

    type F1 = IfReadonlyArray<[1,2,3], true, false>;
    
    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<F1, false>>,
    ];
    const cases: cases = [true, true];
  });

});
