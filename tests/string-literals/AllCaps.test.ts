import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AllCaps } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AllCaps<T>", () => {

  it("happy path", () => {
    type HelloWorld = AllCaps<"hello world">;
    type MixedCase = AllCaps<"HEllo wORLd">;

    type cases = [
      Expect<Equal<HelloWorld, "HELLO WORLD">>,
      Expect<Equal<MixedCase, "HELLO WORLD">>
    ];
    const cases: cases = [ true, true ];
  });

});
