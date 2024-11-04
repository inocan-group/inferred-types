import { Equal, Expect } from "@type-challenges/utils";
import { IsNegativeNumber } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsNegativeNumber", () => {

  it("happy path", () => {
    type Neg = IsNegativeNumber<-1>;
    type NegStr = IsNegativeNumber<"-1">;
    type Pos = IsNegativeNumber<1>;
    type PosStr = IsNegativeNumber<"1">;
    type Bool = IsNegativeNumber<number>;

    type cases = [
      Expect<Equal<Neg, true>>,
      Expect<Equal<NegStr, true>>,
      Expect<Equal<Pos, false>>,
      Expect<Equal<PosStr, false>>,
      Expect<Equal<Bool, boolean>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
