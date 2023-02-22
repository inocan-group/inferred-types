import { Equal, Expect } from "@type-challenges/utils";
import { Slice } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Slice<TList, TStart, TEnd>", () => {

  it("happy path", () => {
    type List = [1,2,3,4,5,6,7,8];
    type FirstTwo = Slice<List, 0, 2>;
    type FirstThree = Slice<List, 0, 3>;
    type OneToThree = Slice<List, 1, 3>;
    type ThreeOnward = Slice<List, 3>; 

    
    type cases = [
      Expect<Equal<FirstTwo, [1,2]>>,
      Expect<Equal<FirstThree, [1,2,3]>>,
      Expect<Equal<OneToThree, [2,3]>>,
      Expect<Equal<ThreeOnward, [4,5,6,7,8]>>,
    ];
    const cases: cases = [true, true, true, true];
  });

});
