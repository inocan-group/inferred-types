import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IfAnd } from "src/types/index";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfAnd<TList>", () => {

  it("happy path", () => {
    type All = IfAnd<[ true, true ], true, false>;
    type AllFn = IfAnd<[ true, () => true ], true, false>;
    // TODO: get this to work!
    // type Identity<V extends boolean> = IfAnd<[true, <I extends boolean>(i: I) => I], true, false, [V]>;
    type Some = IfAnd<[ false, true ], true, false>;
    type None = IfAnd<[ false, false ], true, false>;
    type Runtime = IfAnd<[ true, true, boolean, true], true, false>;
    
    type cases = [
      Expect<Equal<All, true>>, //
      Expect<Equal<AllFn, true>>, //
      // Expect<Equal<Identity<true>, true>>, //
      // Expect<Equal<Identity<false>, false>>, //
      Expect<Equal<Some, false>>,
      Expect<Equal<None, false>>,
      Expect<Equal<Runtime, boolean>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

});
