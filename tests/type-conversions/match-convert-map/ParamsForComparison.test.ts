import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ParamsForComparison } from "../../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ParamsForComparison<TOp> utility", () => {

  it("happy path", () => {
    type GreaterThan = ParamsForComparison<"GreaterThan">;
    type StartsWith = ParamsForComparison<"StartsWith">;
    type IsString = ParamsForComparison<"IsString">;
    type Contains = ParamsForComparison<"Contains">;
    
    type cases = [
      Expect<Equal<GreaterThan, [number]>>,
      Expect<Equal<StartsWith, [string]>>,
      Expect<Equal<IsString, []>>,
      Expect<Equal<Contains, [ unknown ]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
