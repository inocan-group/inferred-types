import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { shift } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("shift(list)", () => {

  it("happy path", () => {
    const arr = [1,2,3] as const;
    const [val, list] = shift(arr);
    expect(list).toEqual([2,3]);
    expect(val).toBe(1);

    const empty = shift([]);
    
    type cases = [
      Expect<Equal<typeof val, 1>>,
      Expect<Equal<typeof list, [2,3]>>,
      Expect<Equal<typeof empty, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
