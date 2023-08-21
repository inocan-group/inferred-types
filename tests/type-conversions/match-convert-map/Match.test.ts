import { Equal, Expect } from "@type-challenges/utils";
import { createTypeMatcher } from "src/runtime";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Match<TInput,TMatcher>", () => {

  it("happy path", () => {
    const ifStr = createTypeMatcher("IsString").throwErrors();
    const containsFoo = createTypeMatcher("Contains", "foo").throwErrors();
    type CFoo = typeof containsFoo;
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});
