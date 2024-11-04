import { Equal, Expect } from "@type-challenges/utils";
import { NotLength } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("NotLength<T,U>", () => {

  it("happy path", () => {
    type True = NotLength<[1,2,3], 0>;
    type False = NotLength<[1,2,3], 3>;

    type cases = [
      Expect<Equal<True, true>>, //
      Expect<Equal<False, false>>,
    ];
    const cases: cases =  [ true, true ];
  });

});
