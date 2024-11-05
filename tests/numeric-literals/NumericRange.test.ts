import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { NumericRange } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("NumericRange<TLow,THigh>", () => {

  it("happy path", () => {
    type R1 = NumericRange<2,7>;
    type R2 = NumericRange<5,6>;

    type cases = [
      Expect<Equal<R1, 2 | 3 | 4| 5| 6 | 7>>,
      Expect<Equal<R2, 5 | 6>>
    ];
    const cases: cases = [ true, true ];
  });

});
