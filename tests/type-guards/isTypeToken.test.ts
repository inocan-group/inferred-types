import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { isTypeToken } from "inferred-types/runtime";
import { AsOutputToken } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isTypeToken(val)", () => {

  it("positive test", () => {
    const str = "" as string;

    type cases = [
      // the `TypeToken` is seen as a string
      // by the type system
      Expect<Equal<typeof str, string>>
    ];
    const cases: cases = [true];

    if (isTypeToken(str)) {
      type Token = typeof str;
      type cases2 = [
        // inside the type guard the type has been
        // changed to
        Expect<Equal<Token, AsOutputToken>>
      ];
      const cases2: cases2 = [true];

      // runtime sees the token "as is"
      expect(str).toEqual("<<string>>");
    }
  });

});
