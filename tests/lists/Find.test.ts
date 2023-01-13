import { Equal, Expect } from "@type-challenges/utils";
import { Find } from "src/types/lists/Find";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Find<TList, TProp, TValue>", () => {

  it("happy path", () => {
    type List = [ { id: 1, val: "hi" }, { id: 2, val: "bye" } ];
    type T1 = Find<List, "id", 1>;
    type T2 = Find<List, "id", 2>;
    type T3 = Find<List, "id", 3>;
    
    type cases = [
      Expect<Equal<T1, { id: 1, val: "hi" }>>,
      Expect<Equal<T2, { id: 2, val: "bye" }>>,
      Expect<Equal<T3, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
