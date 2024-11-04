import { Equal, Expect } from "@type-challenges/utils";
import { PriorDigit } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("PriorDigit<T>", () => {

  it("happy path", () => {
    type Two = PriorDigit<2>;
    type Three = PriorDigit<3>;
    type Overflow = PriorDigit<0>;

    type TwoStr = PriorDigit<"2">;
    type ThreeStr = PriorDigit<"3">;
    type OverflowStr = PriorDigit<"0">;

    type cases = [
      Expect<Equal<Two, 1>>,
      Expect<Equal<Three, 2>>,
      Expect<Equal<Overflow, 9>>,

      Expect<Equal<TwoStr, "1">>,
      Expect<Equal<ThreeStr, "2">>,
      Expect<Equal<OverflowStr, "9">>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
