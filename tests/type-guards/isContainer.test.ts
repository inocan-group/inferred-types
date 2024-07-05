import {   ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { narrow, isContainer, optional } from "src/runtime/index";
import {  Container, DoesExtend } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isContainer(val)", () => {
  const lit_obj = {id: 1} as {id: 1} | null;
  const wide_obj =  {id: 1} as {id: number} | null;
  const lit_arr =  optional(narrow([1,2,3]))
  const wide_arr =  [1,2,3] as number[] | undefined;

  it("literal object", () => {
    const v = isContainer(lit_obj);
    expect(v).toBe(true);

    if(isContainer(lit_obj)) {
      expect(true).toBe(true);

      type Value = typeof lit_obj;
      type cases = [
        ExpectTrue<DoesExtend<Value, {id: 1}>>
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
        ExpectTrue<DoesExtend<Value, {id: number} >>
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
        ExpectTrue<DoesExtend<Value, readonly [1,2,3]>>
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
        ExpectTrue<DoesExtend<Value, Container>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("wide_arr was NOT seen as a Container!");
    }
  });

});
