import { Equal, Expect } from "@type-challenges/utils";
import { Find, FindExtends } from "src/types/lists/Find";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Find<TList, TValue, TIndex>", () => {

  it("happy path", () => {
    type List = [ { id: 1; val: "hi" }, { id: 2; val: "bye" } ];
    type T1 = Find<List, 1, "id">;
    type T2 = Find<List, 2, "id">;
    type T3 = Find<List, 3, "id">;
    
    type cases = [
      Expect<Equal<T1, { id: 1; val: "hi" }>>,
      Expect<Equal<T2, { id: 2; val: "bye" }>>,
      Expect<Equal<T3, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});

describe("FindExtends<TList, TValue, TIndex", () => {

  it("first test", () => {
    type List = [ { id: 1; val: "hi" }, { id: 2; val: "bye" } ];
    type T1 = FindExtends<List, 1, "id">;
    type T2 = FindExtends<List, 2, "id">;
    type T3 = FindExtends<List, 3, "id">;
    
    type cases = [
      Expect<Equal<T1, { id: 1; val: "hi" }>>,
      Expect<Equal<T2, { id: 2; val: "bye" }>>,
      Expect<Equal<T3, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
