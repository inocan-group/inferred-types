import { Equal, Expect } from "@type-challenges/utils";
import { HasSameValues, LeftRight, Relate } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Relate<L,R>", () => { 

  it("happy path", () => {
    type L = {foo: 1; bar: 2};
    type R = {bar: 5; baz: 3};

    type Obj = Relate<L,R>;
    
    type cases = [
      Expect<Equal<Obj["length"], LeftRight<2,2>>>,
      Expect<Equal<Obj["sharedKeys"], ["bar"]>>,
      Expect<HasSameValues<
        Obj["uniqueKeys"], 
        LeftRight<["foo"],["baz"]>
      >>,
    ];
    const cases: cases = [ true, true, true];
  });

});
