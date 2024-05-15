import { Equal, ExpectTrue, ExpectFalse, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { HasOtherCharacters, HexadecimalChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("HasOtherCharacters<TStr,TChars>", () => {

  it("happy path", () => {
    type T1 = HasOtherCharacters<"#AC04FFk", HexadecimalChar | "#">;
    type T2 = HasOtherCharacters<"abcd", "a">;
    
    type F1 = HasOtherCharacters<"#AC04FF", HexadecimalChar | "#">;
    type F2 = HasOtherCharacters<"abcd", "a"| "b"| "c"| "d">;
    type F3 = HasOtherCharacters<"abcd", ["a", "b", "c", "d"]>;

    type B1 = HasOtherCharacters<string, "a">;
    type B2 = HasOtherCharacters<"a", string>;

    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,

      Expect<Equal<B1, boolean>>,
      Expect<Equal<B2, boolean>>,
    ];
    const cases: cases = [
      true, true,
      false, false, false,
      true, true
    ];
  });

});


