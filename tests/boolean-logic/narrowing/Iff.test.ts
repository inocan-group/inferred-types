import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { DoesExtend, ErrorCondition, Iff } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Iff<TEval,[TOptions]>", () => {

  it("something tests", () => {
    type T1 = Iff<[undefined, null, 456, 567, undefined], { find: "something" }>;
    type T2 = Iff<[undefined, null, 456, 567, undefined]>;
    type E1 = Iff<[null,undefined]>;
    type E2 = Iff<[null,undefined], { find: "something" }>;
    type E3 = Iff<[null, undefined], { else: ErrorCondition<"bad-juju"> }>;
    
    type cases = [
      Expect<Equal<T1, 456>>,
      Expect<Equal<T2, 456>>,

      Expect<DoesExtend<E1, ErrorCondition<"nothing-found">>>,
      Expect<DoesExtend<E2, ErrorCondition<"nothing-found">>>,
      Expect<DoesExtend<E3, ErrorCondition<"bad-juju">>>,
    ];
    const cases: cases = [ 
      true, true,
      true, true, true
    ];
  });


  it("truthy tests", () => {
    type T1 = Iff<[false, null, 456, 567], { find: "truthy" }>;
    
    type cases = [
      Expect<Equal<T1, 456>>,
    ];
    const cases: cases = [ true ];
  });

});
