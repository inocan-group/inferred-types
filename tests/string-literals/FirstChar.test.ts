import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { FirstChar } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FirstChar<T>", () => {

  it("with string input", () => {
    type Foobar = FirstChar<"Foobar">;
    type EmptyStr = FirstChar<"">;
    
    type cases = [
      Expect<Equal<Foobar, "F">>,
      Expect<Equal<EmptyStr, never>>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("with array input", () => {
    type FooBarBaz = FirstChar<["foo", "bar", "baz"]>;
    
    type cases = [
      Expect<Equal<FooBarBaz, ["f","b","b"]>>
    ];
    const cases: cases = [ true ];
    
  });
  

});
