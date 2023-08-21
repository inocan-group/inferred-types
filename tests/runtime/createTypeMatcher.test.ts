
import { describe, expect, it } from "vitest";
import {  Expect } from "@type-challenges/utils";

import { DoesExtend, Matcher } from "src/types";
import { createTypeMatcher, isArray } from "src/runtime";
// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("createTypeMatcher() runtime utility", () => {
  const contains = createTypeMatcher("Contains", "foobar").throwErrors();
  const containsSkip = createTypeMatcher("Contains", "foobar").skipFailures();
  const isString = createTypeMatcher("IsString").throwErrors();

  it("typing of matcher is correct", () => {
    
    type cases = [
      Expect<DoesExtend<typeof contains, Matcher<"Contains", ["foobar"], "throw">>>,
      Expect<DoesExtend<typeof containsSkip, Matcher<"Contains", ["foobar"], "skip">>>,
      Expect<DoesExtend<typeof isString, Matcher<"IsString", [], "throw">>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  
  it("runtime shaped as expected", () => {
    expect(contains).toBeTypeOf("object");
    expect(isArray(contains)).toBeTruthy();
    //  [ op, params, handler, desc ]
    expect(contains.length).toBe(4);
    const [op, params, handler, desc] = contains;
    expect(op).toBe("Contains");
    expect(params).toEqual(["foobar"]);
    expect(handler).toBe("throw");
    expect(desc).toBeTypeOf("string");
  });
  


});
