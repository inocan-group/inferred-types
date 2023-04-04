import {  Expect, Equal } from "@type-challenges/utils";
import { HasIndexOfValidationFn, defineType, hasIndexOf,  narrow } from "src/runtime";
import {  IsEqual, Keys, Scalar, TupleToUnion } from "src/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("hasIndexOf(value)(index)", () => {
  const lit_arr = narrow([1,2,3]);
  const num_arr = [1,2,3];
  const lit_obj = defineType({id: 1})();

  
  it("partial application", () => {
    const a = hasIndexOf(lit_arr);
    const b = hasIndexOf(num_arr);
    const c = hasIndexOf(lit_obj);
    
    type cases = [
      Expect<Equal<typeof a, HasIndexOfValidationFn<readonly [0,1,2]>>>,
      Expect<Equal<typeof b, HasIndexOfValidationFn<[]>>>,
      Expect<Equal<typeof c, HasIndexOfValidationFn<["id"]>>>,
    ];
    const cases: cases = [
      true, true
    ];
  });

  
  it("used as type guard", () => {
    const hasIdx = hasIndexOf(lit_arr);
    if(hasIdx(1)) {
type cases = [
      /** type tests */
    ];
}
    const cases: cases = [];
    
  });
  
  


  const ap = a(0);
  const bp = b(1);
  

  it("Array and valid index", () => {
    const idx = 1;
    const arrIdxTrue = hasIndexOf(lit_arr)(idx);
    expect(arrIdxTrue).toBe(true);

    if(hasIndexOf(lit_arr)(idx)) {
      expect(true).toBe(true);
      type K1 = Keys<Exclude<typeof lit_arr, Scalar | undefined>>;
      type I1 = TupleToUnion<Keys<typeof lit_arr>>;

      type Idx = typeof idx;
      type Value = typeof lit_arr;
      type cases = [
        Expect<IsEqual<Value, readonly [1,2,3]>>
      ];

      const cases: cases = [ true ];
    } else {
      throw new Error("lit_arr should report valid index for 1");
    }
  });

  it("Object and valid index", () => {
    const arrIdxTrue = hasIndexOf(lit_obj)("id");
    expect(arrIdxTrue).toBe(true);

    if(hasIndexOf(lit_obj)("id")) {
      expect(true).toBe(true);

      type Value = typeof lit_obj;
      type cases = [
        Expect<IsEqual<Value, {id: 1}>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_obj should report valid index for 1");
    }
  });

  it("Array and invalid index", () => {
    const val = hasIndexOf(lit_arr)(10);
    expect(val).toBe(false);

    if(hasIndexOf(lit_arr)(10)) {
      throw new Error("Invalid array index not caught!");
    } else {
      expect(true).toBe(true);
    }
  });

  it("Object with invalid index", () => {
    const val = hasIndexOf(lit_obj)("foo");
    expect(val).toBe(false);

    if(hasIndexOf(lit_obj)("foo")) {
      throw new Error("Invalid object index not caught!");
    } else {
      expect(true).toBe(true);
    }
  });

});
