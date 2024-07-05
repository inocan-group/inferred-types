import { Equal, Expect } from "@type-challenges/utils";
import { AsNegativeNumber } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsNegativeNumber<T>", () => {

  it("testing with numbers", () => {
    type T1 = AsNegativeNumber<-1>;
    type T2 = AsNegativeNumber<1>;
    type T3 = AsNegativeNumber<500>;

    type cases = [
      Expect<Equal<T1, -1>>,
      Expect<Equal<T2, -1>>,
      Expect<Equal<T3, -500>>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });


  it("testing with numeric strings", () => {
    type T1 = AsNegativeNumber<"-1">;
    type T2 = AsNegativeNumber<"1">;
    type T3 = AsNegativeNumber<"500">;

    type cases = [
      Expect<Equal<T1, "-1">>,
      Expect<Equal<T2, "-1">>,
      Expect<Equal<T3, "-500">>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });


});
