import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { StripTrailing } from "../../src/inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("StripTrailing", () => {

  it("happy path", () => {
    type RemoveBar = StripTrailing<"FooBar","Bar">;
    type SameAsItEverWas = StripTrailing<"Foo","Bar">;
    
    type cases = [
      Expect<Equal<RemoveBar, "Foo">>,
      Expect<Equal<SameAsItEverWas, "Foo">>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});
