import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsCssHexadecimal } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Hexadecimal<T>", () => {

  it("happy path", () => {
    type T1 = IsCssHexadecimal<"#ABABAB">;
    type T2 = IsCssHexadecimal<"#ccc">;

    type F1 = IsCssHexadecimal<"GG">;
    type F2 = IsCssHexadecimal<"ABABAB">;

    type B1 = IsCssHexadecimal<string>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,

      Expect<Equal<B1, boolean>>
    ];
    const cases: cases = [
      true, true,
      false, false,
      true
    ];
  });

});
