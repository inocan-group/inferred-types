import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  ValueOrReturnValue } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ValueOrReturnValue<T>", () => {

  it("happy path for non-tuple input", () => {
    type True = ValueOrReturnValue<true>;
    type RtnTrue = ValueOrReturnValue<() => true>;
    type Foobar = ValueOrReturnValue<"foobar">;
    type RtnFoobar = ValueOrReturnValue<() => `foobar`>;
    
    type cases = [
      Expect<Equal<True, true>>,
      Expect<Equal<RtnTrue, true>>,
      Expect<Equal<Foobar, "foobar">>,
      Expect<Equal<RtnFoobar, "foobar">>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

  
  it("happy path for tuple input", () => {
    type Bool = ValueOrReturnValue<readonly [true, () => false, true]>;
    type Mixed = ValueOrReturnValue<[true, () => false, "foo", () => `bar`]>;
    
    type cases = [
      Expect<Equal<Bool, readonly [true, false, true]>>,
      Expect<Equal<Mixed, [true, false, "foo", "bar"]>>,
    ];
    const cases: cases = [ true, true ];
    
  });
  

});
