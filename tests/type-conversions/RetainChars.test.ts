import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  AlphaChar, AlphaNumericChar, NumericChar, RetainChars } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RetainChars<TContent,TStrip>", () => {

  it("Happy Path", () => {
    type Nada = RetainChars<"Hello World", NumericChar>;
    type NoChange = RetainChars<"Hello World", AlphaNumericChar | " ">;
    type RemoveNum = RetainChars<"Hello World5", AlphaChar | " ">;

    type cases = [
      Expect<Equal<Nada, "">>,
      Expect<Equal<NoChange, "Hello World">>,
      Expect<Equal<RemoveNum, "Hello World">>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

});
