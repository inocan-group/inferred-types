import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ToInteger } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ToInteger", () => {

  it("happy path", () => {
    type Numeric = ToInteger<4.555>;
    type StrNum = ToInteger<"4.755">;
    type StrRoundUp = ToInteger<"4.755", "round">;
    type StrRoundDown = ToInteger<"4.355", "round">;

    type NumInt = ToInteger<4>;
    type StrInt = ToInteger<"4">;
    
    type cases = [
      Expect<Equal<Numeric, 4>>,
      Expect<Equal<StrNum, "4">>,

      Expect<Equal<StrRoundUp, "5">>,
      Expect<Equal<StrRoundDown, "4">>,

      Expect<Equal<NumInt, 4>>,
      Expect<Equal<StrInt, "4">>,
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true
    ];
  });

});
