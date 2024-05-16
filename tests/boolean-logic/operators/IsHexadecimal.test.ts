import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  IsHexadecimal } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Hexadecimal<T>", () => {

  it("happy path", () => {
    type T1 = IsHexadecimal<"#ABABAB">;
    type T2 = IsHexadecimal<"#ccc">;
    
    type F1 = IsHexadecimal<"GG">;
    type F2 = IsHexadecimal<"ABABAB">;
    
    type B1 = IsHexadecimal<string>;
    
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
