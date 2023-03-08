import {  Expect } from "@type-challenges/utils";
import { defineType, hasIndexOf, kind, unionize, narrow } from "src/runtime";
import { ExpandRecursively, IsEqual } from "src/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("hasIndexOf(value)", () => {
  const lit_arr = unionize( narrow([1,2,3]), kind.undefined() );
  const lit_obj = unionize( defineType({id: 1})(), kind.undefined() );

  it("Array and valid index", () => {
    const arrIdxTrue = hasIndexOf(lit_arr, 1);
    expect(arrIdxTrue).toBe(true);

    if(hasIndexOf(lit_arr, 1)) {
      expect(true).toBe(true);

      type Value = typeof lit_arr;
      type cases = [
        Expect<IsEqual<Value, readonly [1,2,3] & readonly[unknown, unknown, unknown]>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_arr should report valid index for 1");
    }
  });

  it("Object and valid index", () => {
    const arrIdxTrue = hasIndexOf(lit_obj, "id");
    expect(arrIdxTrue).toBe(true);

    if(hasIndexOf(lit_obj, "id")) {
      expect(true).toBe(true);

      type Value = typeof lit_obj;
      type cases = [
        Expect<IsEqual<Value, {id: 1} & Record<"id", unknown>>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_obj should report valid index for 1");
    }
  });

  it("Array and invalid index", () => {
    const val = hasIndexOf(lit_arr, 10);
    expect(val).toBe(false);

    if(hasIndexOf(lit_arr, 10)) {
      throw new Error("Invalid array index not caught!");
    } else {
      expect(true).toBe(true);
    }
  });

  it("Object with invalid index", () => {
    const val = hasIndexOf(lit_obj, "foo");
    expect(val).toBe(false);

    if(hasIndexOf(lit_obj, "foo")) {
      throw new Error("Invalid object index not caught!");
    } else {
      expect(true).toBe(true);
    }
  });

});
