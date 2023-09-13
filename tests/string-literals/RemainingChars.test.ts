import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  RemainingChars } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("LastChar<T>", () => {

  it("with string input", () => {
    type Foobar = RemainingChars<"Foobar">;
    type EmptyStr = RemainingChars<"">;
    
    type cases = [
      Expect<Equal<Foobar, "oobar">>,
      Expect<Equal<EmptyStr, "">>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("with array input", () => {
    type FooBarBaz = RemainingChars<["foo", "bar", "baz"]>;
    
    type cases = [
      Expect<Equal<FooBarBaz, ["oo","ar","az"]>>
    ];
    const cases: cases = [ true ];
    
  });
  

});
