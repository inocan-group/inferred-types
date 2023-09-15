import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Iff } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Iff<TEval,TOptions>", () => {

  it("something tests", () => {
    type T1 = Iff<[undefined, null, 456, 567, undefined], { find: "something" }>;
    type T2 = Iff<[undefined, null, 456, 567, undefined]>;
    type Nada1 = Iff<[null,undefined]>;
    type Nada2 = Iff<[null,undefined], { find: "something"}
    
    type cases = [
      Expect<Equal<T1, 456>>,
      Expect<Equal<T2, 456>>,


    ];
    const cases: cases = [ 
      true, true,

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
