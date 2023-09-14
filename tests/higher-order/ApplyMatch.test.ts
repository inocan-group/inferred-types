import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ApplyMatch, DoesExtend,  MatchDef, ToMatchDef } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ApplyMatch<TVal,TMatchDef>", () => {
  // const ifStr = createTypeMatcher("IsString").throwErrors();
  // const containsFoo = createTypeMatcher("Contains", "foo").throwErrors();

  it("happy path with throw handler", () => {
    type Str = ToMatchDef<"IsString">;
    type IsStr = ApplyMatch<"str", Str>;
    type IsNotStr = ApplyMatch<42, Str>;

    type Contains1 = ToMatchDef<"Contains", ["foo"]>;
    type Contains2 = ToMatchDef<"Contains", "foo">;
    type AppliedContains = ApplyMatch<["foo", "bar", "baz"], Contains1>;
    type AppliedContains2 = ApplyMatch<["foo", "bar", "baz"], Contains2>;

    type Num = ToMatchDef<"IsNumber", []>;
    type IsNum = ApplyMatch<42, Num>;

    type StartsWith = ToMatchDef<"StartsWith", ["foo-"]>;
    type StartsWith2 = ToMatchDef<"StartsWith", "foo-">;

    type AppliedStartWith = ApplyMatch<"foo-bar", StartsWith>;
    type AppliedStartWith2 = ApplyMatch<"foo-bar", StartsWith2>;
    type AppliedNotStartWith = ApplyMatch<"bar", StartsWith2>;
    
    type cases = [
      Expect<Equal<IsStr, true>>,
      Expect<Equal<IsNotStr, false>>,

      ExpectTrue<DoesExtend<Contains1, MatchDef<"Contains">>>,
      ExpectTrue<DoesExtend<Contains2, MatchDef<"Contains">>>,
      Expect<Equal<AppliedContains, true>>,
      Expect<Equal<AppliedContains2, true>>,

      Expect<Equal<IsNum, true>>,

      Expect<Equal<AppliedStartWith, true>>,
      Expect<Equal<AppliedNotStartWith, false>>,
      Expect<Equal<AppliedStartWith2, true>>,
    ];

    const cases: cases = [
      true, true, 
      true, true, true, true,
      true, 
      true, true, true
    ];
  });

});


