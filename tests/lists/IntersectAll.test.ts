import { Equal, Expect } from "@type-challenges/utils";
import { IntersectAll } from "../../src/types/lists";

import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntersectAll", () => {

  it("happy path", () => {
    type List = [{id: 1; foo: "hi"}, {id: 2; foo: "bye"}];
    type L2 = readonly [{id: 1; foo: "hi"}, {id: 2; foo: "bye"}];

    type T1 = IntersectAll<List, { bar: number }>;
    type T2 = IntersectAll<L2, { bar: number }>;
    
    type cases = [
      Expect<Equal<T1[0], {id: 1; foo: "hi"; bar: number }>>,
      Expect<Equal<T1[1], {id: 2; foo: "bye"; bar: number }>>,

      Expect<Equal<T2[0], {id: 1; foo: "hi"; bar: number }>>,
      Expect<Equal<T2[1], {id: 2; foo: "bye"; bar: number }>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
