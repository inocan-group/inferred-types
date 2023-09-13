import { Equal, Expect } from "@type-challenges/utils";
import { Hexadecimal } from "../../src/types/base";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Hexadecimal<T>", () => {

  it("happy path", () => {
    type T1 = Hexadecimal<"#ABABAB">;
    type T2 = Hexadecimal<"ABABAB">;
    type T3 = Hexadecimal<"#ccc">;

    type F1 = Hexadecimal<"GG">;
    type F2 = Hexadecimal<string>;
    
    type cases = [
      Expect<Equal<T1, "#ABABAB">>,
      Expect<Equal<T2, "ABABAB">>,
      Expect<Equal<T3, "#ccc">>,

      Expect<Equal<F1, never>>,
      Expect<Equal<F2, never>>,
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
