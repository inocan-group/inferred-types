;import { Equal, Expect } from "@type-challenges/utils";
import { AsNumber, IsNever } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsNumber<T>", () => {

  it("Happy Path", () => {
    type Int = AsNumber<"3">;
    type Float = AsNumber<"3.4">;
    type NegInt = AsNumber<"-3">;
    type NegFloat = AsNumber<"-3.4">;

    type cases = [
      Expect<Equal<Int, 3>>,
      Expect<Equal<Float, 3.4>>,
      Expect<Equal<NegInt, -3>>,
      Expect<Equal<NegFloat, -3.4>>,

      IsNever<AsNumber<"foobar">>
    ];
    const cases: cases = [
      true, true, true, true,
      true
    ];
  });

});
