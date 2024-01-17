import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IntersectingKeys } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntersectingKeys<L,R>", () => {

  it("happy path", () => {
    type I = IntersectingKeys<{foo:1; bar: 2}, {bar:2; baz: 3}>;
    
    type cases = [
      Expect<Equal<I, ["bar"] & PropertyKey[]>>,
    ];
    const cases: cases = [true];
  });

});
