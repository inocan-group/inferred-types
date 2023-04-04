import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { pop } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("pop(list)", () => {

  it("happy path", () => {
    const arr = [1,2,3] as const;
    const [val, list] = pop(arr);
    expect(list).toEqual([1,2]);
    expect(val).toBe(1);

    const empty = pop([]);
    
    type cases = [
      Expect<Equal<typeof val, 3>>,
      Expect<Equal<typeof list, [1,2]>>,
      Expect<Equal<typeof empty, undefined>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
