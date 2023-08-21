import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { RefTypeForComparison, Tuple } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("RefTypeForComparison<TOp> utility", () => {

  it("happy path", () => {
    type GreaterThan = RefTypeForComparison<"GreaterThan">;
    type StartsWith = RefTypeForComparison<"StartsWith">;
    type IsString = RefTypeForComparison<"IsString">;
    type Contains = RefTypeForComparison<"Contains">;
    
    type cases = [
      Expect<Equal<GreaterThan, number>>,
      Expect<Equal<StartsWith, string>>,
      Expect<Equal<IsString, string>>,
      Expect<Equal<Contains, Tuple>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
