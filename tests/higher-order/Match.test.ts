import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";



// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe.skip("Match<TInput,TMatcher>", () => {
  // const ifStr = createTypeMatcher("IsString").throwErrors();
  // const containsFoo = createTypeMatcher("Contains", "foo").throwErrors();

  // it("happy path", () => {
  //   type Str = AsMatcher<"IsString">;
  //   type IsStr = Match<"str", Str>;

  //   type Contains = AsMatcher<"Contains", ["foo"]>;
  //   type DoesContain = Match<["foo", "bar", "baz"], Contains>;

  //   type Num = AsMatcher<"IsNumber", []>;
  //   type IsNum = Match<42, Num>;

  //   type StartsWith = AsMatcher<"StartsWith", ["foo-"]>;
  //   type DoesStartWith = Match<"foo-bar", StartsWith>;
    
  //   type cases = [
  //     Expect<DoesExtend<IsStr, MatchResponse<"success">>>,
  //     Expect<DoesExtend<DoesContain, MatchResponse<"success">>>,
  //     Expect<DoesExtend<IsNum, MatchResponse<"success">>>,
  //     Expect<DoesExtend<DoesStartWith, MatchResponse<"success">>>,
  //   ];
  //   const cases: cases = [
  //     true, true, true, true
  //   ];
  // });

});

describe.skip("MatchAll<TInput,TMatcher>", () => {

  // it("testing with singular matcher", () => {
  //   type Str = AsMatcher<"IsString">;
  //   type IsStr = MatchAll<"str", [Str]>;

  //   type Contains = AsMatcher<"Contains", ["foo"]>;
  //   type DoesContain = MatchAll<["foo", "bar", "baz"], [Contains]>;

  //   type Num = AsMatcher<"IsNumber", []>;
  //   type IsNum = MatchAll<42, [Num]>;

  //   type StartsWith = AsMatcher<"StartsWith", ["foo-"]>;
  //   type DoesStartWith = MatchAll<"foo-bar", [StartsWith]>;
    
  //   type cases = [
  //     Expect<DoesExtend<IsStr, MatchResponse<"success">>>,
  //     Expect<DoesExtend<DoesContain, MatchResponse<"success">>>,
  //     Expect<DoesExtend<IsNum, MatchResponse<"success">>>,
  //     Expect<DoesExtend<DoesStartWith, MatchResponse<"success">>>,
  //   ];
  //   const cases: cases = [
  //     true, true, true, true
  //   ];
  // });

});
