import {  Expect, Equal } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { defineObj, hasIndexOf,  narrow } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("hasIndexOf(value, index)", () => {
  const lit_arr = narrow([1,2,3]);
  const lit_obj = defineObj({id: 1})();
  
  it("runtime produces correct result; type is boolean", () => {
    const numIdx = hasIndexOf(lit_arr, 2);
    expect(numIdx).toBe(true);
    const objIdx = hasIndexOf(lit_obj, "id");
    expect(objIdx).toBe(true);

    type cases = [
      Expect<Equal<typeof numIdx, boolean>>,
      Expect<Equal<typeof objIdx, boolean>>
    ];

    const cases: cases = [ true, true ];
  });
  
  
  it("used as type guard, type is reduced", () => {
    if(hasIndexOf(lit_arr, 2)) {
      expect(true).toBe(true);
      expect(lit_arr[2]).toBe(3);

    } else {
      expect(true, "hasIndexOf(lit_arr,2) should have resolved to true!").toBe(false);
    }

  });
});
