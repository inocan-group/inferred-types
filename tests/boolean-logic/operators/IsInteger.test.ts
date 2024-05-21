import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsInteger } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsInteger<T>", () => {

  it("Happy Path", () => {
    type T1 = IsInteger<1>;
    type T2 = IsInteger<"1">;
    type T3 = IsInteger<1.0>; // bummer but the `.0` is lost before we can match against

    type F1 = IsInteger<1.1>;
    type F2 = IsInteger<"1.1">;
    
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>
    ];
    const cases: cases = [
      true, true, true,
      false, false
    ];
  });

});
