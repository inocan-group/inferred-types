import { Equal, Expect } from "@type-challenges/utils";
import { Flatten } from "src/types/lists/Flatten";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Flatten<T>", () => {

  it("first test", () => {
    type F1 = Flatten<[1,2, [3,4]]>;
    type F1a = Flatten<[1,2, [3,4]], 2>;
    type F2 = Flatten<[1,2, readonly [3,4]]>;
    type F2a = Flatten<[1,2, readonly [3,4]], 2>;

    type D1 = Flatten<[[1,2],[3,4],[[5],6]]>;
    type D2 = Flatten<[[1,2],[3,4],[[5],6]], 2>;

    type DS = [[1,2],[3,4],[[5,6],[7,[8,9]]]];
    type DeeperStill1 = Flatten<DS, 1>;
    type DeeperStill2 = Flatten<DS, 2>;
    type DeeperStill3 = Flatten<DS, 3>;
    
    type cases = [
      Expect<Equal<F1,  [1,2,3,4]>>,
      Expect<Equal<F1a,  [1,2,3,4]>>,
      Expect<Equal<F2,  [1,2,3,4]>>,
      Expect<Equal<F2a,  [1,2,3,4]>>,

      Expect<Equal<D1,  [1,2,3,4, [5], 6]>>,
      Expect<Equal<D2,  [1,2,3,4,5,6]>>,

      Expect<Equal<DeeperStill1,  [1,2,3,4,[5,6], [7,[8,9]]]>>,
      Expect<Equal<DeeperStill2,  [1,2,3,4,5,6, 7,[8,9]]>>,
      Expect<Equal<DeeperStill3,  [1,2,3,4,5,6, 7,8,9]>>,
    ];
    const cases: cases = [ 
      true, true, true, 
      true, true, true, 
      true, true, true  
    ];
  });

});
