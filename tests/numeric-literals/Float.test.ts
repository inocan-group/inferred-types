import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Float } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Float", () => {

  it("happy path", () => {
    type DecNum = Float<123.456>;
    type DecStr = Float<"123.456">;

    type WithoutNum = Float<123>;
    type WithoutStr = Float<"123">;

    type EmptyNum = Float<123.>;
    type EmptyStr = Float<"123.">;
    
    type cases = [
      Expect<Equal<DecNum, 456>>,
      Expect<Equal<DecStr, "456">>,

      Expect<Equal<WithoutNum, 0>>,
      Expect<Equal<WithoutStr, "0">>,

      Expect<Equal<EmptyNum, 0>>,
      Expect<Equal<EmptyStr, "0">>,
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true
    ];
  });

});
