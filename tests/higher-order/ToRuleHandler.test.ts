import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ToRuleHandler } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ToRuleHandler", () => {

  it("happy path", () => {
    type Default = ToRuleHandler<[]>;
    type ErrCond = ToRuleHandler<["ErrorCondition"]>;
    type ErrCond2 = ToRuleHandler<"ErrorCondition">;
    type NoFlat = ToRuleHandler<"throw-on-flatten">;
    type FlipFlop = ToRuleHandler<["throw-on-flatten", "allow-flatten"]>;

    
    type cases = [
      Expect<Equal<Default, ["rule-handler", "allow-flatten", "allow-ignore", "throw"]>>,
      Expect<Equal<ErrCond, ["rule-handler", "allow-flatten", "allow-ignore", "ErrorCondition"]>>,
      Expect<Equal<ErrCond2, ["rule-handler", "allow-flatten", "allow-ignore", "ErrorCondition"]>>,
      Expect<Equal<NoFlat, ["rule-handler", "throw-on-flatten", "allow-ignore", "throw"]>>,
      Expect<Equal<FlipFlop, Default>>
    ];
    const cases: cases = [ true, true, true, true, true ];
  });

});
