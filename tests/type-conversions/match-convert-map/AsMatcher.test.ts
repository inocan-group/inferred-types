import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsMatcher, DescForComparison, DoesExtend, Matcher } from "../../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsMatcher<TOp,TParams,THandler>", () => {

  it("happy path", () => {
    type IsString = AsMatcher<"IsString">;
    type IsStringSkip = AsMatcher<"IsString", [], "skip">;

    type cases = [
      Expect<DoesExtend<IsString, Matcher<"IsString", [], "throw">>>,
      Expect<Equal<
        IsString[3],
        DescForComparison<IsString>
      >>,
      Expect<DoesExtend<
        DescForComparison<IsString>,
        `${string}throw the error.`
      >>,

      Expect<DoesExtend<IsStringSkip, Matcher<"IsString", [], "skip">>>,
      Expect<DoesExtend<
        DescForComparison<IsStringSkip>,
        `${string}skip the associated task.`
      >>,
    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });

});
