import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { tuple } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("tuple(value)", () => {

  it("happy path", () => {
    const t1 = tuple(1,2,3);
    const t2 = tuple([1,2,3]);

    expect(t1).toEqual([1,2,3]);
    expect(t2).toEqual([1,2,3]);

    type cases = [
      Expect<Equal<typeof t1, [1,2,3]>>,
      Expect<Equal<typeof t2, [1,2,3]>>,
    ];
    const cases: cases = [ true, true ];
  });

});
