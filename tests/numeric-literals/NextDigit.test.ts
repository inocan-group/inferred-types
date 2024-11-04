import { Equal, Expect } from "@type-challenges/utils";
import { NextDigit } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("NextDigit<T>", () => {

  it("happy path", () => {
    type One = NextDigit<1>;
    type Two = NextDigit<2>;
    type Overflow = NextDigit<9>;

    type OneStr = NextDigit<"1">;
    type TwoStr = NextDigit<"2">;
    type OverflowStr = NextDigit<"9">;

    type cases = [
      Expect<Equal<One, 2>>,
      Expect<Equal<Two, 3>>,
      Expect<Equal<Overflow, 0>>,
      Expect<Equal<OneStr, "2">>,
      Expect<Equal<TwoStr, "3">>,
      Expect<Equal<OverflowStr, "0">>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
