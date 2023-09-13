import {  Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineObj, narrow, unionize , isContainer, kind } from "src/runtime";
import {  IsEqual } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("isContainer(val)", () => {
  const lit_obj = unionize(defineObj({id: 1})(), kind.undefined());
  const wide_obj =  unionize(defineObj()({id: 1}), kind.undefined());
  const lit_arr =  unionize(narrow([1,2,3]), kind.undefined());
  const wide_arr =  unionize([1,2,3], kind.undefined());
  
  it("literal object", () => {
    const v = isContainer(lit_obj);
    expect(v).toBe(true);

    if(isContainer(lit_obj)) {
      expect(true).toBe(true);

      type Value = typeof lit_obj;
      type cases = [
        Expect<IsEqual<Value, {id: 1} & object>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_obj was NOT seen as a Container!");
    }
  });

  it("wide object", () => {
    const v = isContainer(wide_obj);
    expect(v).toBe(true);

    if(isContainer(wide_obj)) {
      expect(true).toBe(true);

      type Value = typeof wide_obj;
      type cases = [
        Expect<IsEqual<Value, {id: number} & object>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_obj was NOT seen as a Container!");
    }
  });

  it("literal array", () => {
    const v = isContainer(lit_arr);
    expect(v).toBe(true);

    if(isContainer(lit_arr)) {
      expect(true).toBe(true);

      type Value = typeof lit_arr;
      type cases = [
        Expect<IsEqual<Value, readonly [1,2,3] & unknown[]>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("lit_arr was NOT seen as a Container!");
    }
  });

  it("wide array", () => {
    const v = isContainer(wide_arr);
    expect(v).toBe(true);

    if(isContainer(wide_arr)) {
      expect(true).toBe(true);

      type Value = typeof wide_arr;
      type cases = [
        Expect<IsEqual<Value, number[] & unknown[]>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("wide_arr was NOT seen as a Container!");
    }
  });

});
