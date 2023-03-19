import { Equal, Expect } from "@type-challenges/utils";
import { AfterFirst } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AfterFirst", () => {

  
  it("happy path for lists", () => {
    type Foobar = AfterFirst<["foo", "bar"]>;
    type Foobar2 = AfterFirst<readonly ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<Foobar, readonly ["bar"]>>,
      Expect<Equal<Foobar2, readonly ["bar"]>>,

    ];
    const cases: cases = [true, true];
    
  });
  
});
