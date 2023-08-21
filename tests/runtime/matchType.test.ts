import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { MatchTypeComparison, createTypeMatcher, matchType } from "src/runtime";
import { MatchResponse,  ErrorCondition, DoesExtend, AsMatcher } from "src/types";
// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("matchType(type, matcher)", () => {

  const contains = createTypeMatcher("Contains", "foo").throwErrors();
  const containsSkip = createTypeMatcher("Contains", "foo").skipFailures();
  const isString = createTypeMatcher("IsString").throwErrors();

  
  it("partial application", () => {
    const partialTuple = matchType(contains);
    const partialString = matchType(isString);

    expect(partialTuple).toBeTypeOf("function");
    expect(partialString).toBeTypeOf("function");
    
    type cases = [
      Expect<Equal<
        typeof partialTuple,
        MatchTypeComparison<AsMatcher<"Contains", ["foo"], "throw">>
      >>,
      Expect<Equal<
        typeof partialString,
        MatchTypeComparison<AsMatcher<"IsString", [], "throw">>
      >>,
    ];
    const cases: cases = [ true, true  ];
    
  });
  

  it("full application", () => {
    const doesMatchFoo = matchType(contains)("foo", "bar");
    const doesNotMatchFoo = matchType(contains)("bar", "baz");
    const skippedFoo = matchType(containsSkip)("bar", "baz");

    expect(doesMatchFoo).toEqual(["success", ["foo", "bar"]]);
    expect(doesNotMatchFoo).toEqual(["throw", false]);
    
    type cases = [
      Expect<Equal<typeof doesMatchFoo, MatchResponse<"success", ["foo", "bar"]>>>,
      Expect<DoesExtend<
        typeof doesNotMatchFoo, 
        MatchResponse<"throw", ErrorCondition<"did-not-match">>
      >>,
      Expect<DoesExtend<
        typeof skippedFoo,
        MatchResponse<"skip">
      >>,

    ];
    const cases: cases = [
      true, true, true
    ];
    

  });

});
