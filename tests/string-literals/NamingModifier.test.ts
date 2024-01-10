import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { NamingModifier } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("NamingModifier", () => {

  it("happy path", () => {
    type None = NamingModifier<"PascalCase">;
    type None2 = NamingModifier<"camelCase">;
    type Some = NamingModifier<"kebab-case">;
    type Some2 = NamingModifier<"snake_case">;
    
    
    type cases = [
      Expect<Equal<None, "none">>,
      Expect<Equal<None2, "none">>,
      Expect<Equal<Some, "ALL_CAPS" | "no_caps" | "none">>,
      Expect<Equal<Some2, "ALL_CAPS" | "no_caps" | "none">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
