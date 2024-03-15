import { Equal, Expect } from "@type-challenges/utils";
import { isShape, shape } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("shape(s => s.[api])", () => {

  it("happy path", () => {
    const str = shape(s => s.string());
    const bool = shape(s => s.boolean());
    const lit = shape(s => s.literals(1).add(2).add(3).done());
    const lit_undone = shape(s => s.literals(1).add(2).add(3));
    const tup = shape(s => s.tuple(1).add(2).add(3).done());
    const optStr = shape(s => s.optional.string());

    expect(isShape(str), `"${str}" was supposed to be a Shape string`).toEqual(true);
    expect(isShape(bool)).toEqual(true);
    expect(isShape(lit), `"${lit}" was supposed to be a Shape string`).toEqual(true);
    expect(isShape(tup)).toEqual(true);
    expect(isShape(optStr)).toEqual(true);
    
    type cases = [
      Expect<Equal<typeof str, string>>,
      Expect<Equal<typeof bool, boolean>>,
      Expect<Equal<typeof lit, 1 | 2 | 3>>,
      Expect<Equal<typeof lit_undone, 1 | 2 | 3>>,
      Expect<Equal<typeof tup, [1 , 2 , 3]>>,
      Expect<Equal<typeof optStr, string | undefined>>,
    ];
    const cases: cases = [
      true, true, true, true, true, true
    ];
  });

});
