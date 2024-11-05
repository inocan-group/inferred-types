import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsFloat } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsFloat<T>", () => {

  it("Happy Path", () => {
    type T1 = IsFloat<1.1>;
    type T2 = IsFloat<"1.1">;
    type T3 = IsFloat<"1.0">;

    type F1 = IsFloat<1>;
    type F2 = IsFloat<"1">;
    type F3 = IsFloat<1.0>;


    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>, // unfortunately a numeric 1.0 doesn't preserve the decimal
    ];
    const cases: cases = [
      true, true,true,
      false, false, false
    ];
  });

});
