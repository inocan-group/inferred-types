import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Replace, ReplaceAll } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Replace<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = Replace<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = Replace<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    
    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be [[T]]">>,
    ];
    const cases: cases = [
      true, true 
    ];
  });

});

describe("ReplaceAll<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = ReplaceAll<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = ReplaceAll<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    
    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be foobar">>,
    ];
    const cases: cases = [
      true, true 
    ];
  });

});
