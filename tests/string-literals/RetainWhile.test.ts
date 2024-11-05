import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { NumericChar, RetainWhile, retainWhile, NUMERIC_CHAR } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.


describe("RetainWhile<TContent,TComparator>", () => {

  it("happy path", () => {
    type Num = RetainWhile<"42 is a number", NumericChar>;


    type cases = [
      Expect<Equal<Num, "42">>,
    ];
    const cases: cases = [
      true
    ];
  });

});


describe("retainWhile(content,...retain)", () => {

  it("happy path", () => {
    const num = retainWhile("42 is a number", ...NUMERIC_CHAR);
  });

});
