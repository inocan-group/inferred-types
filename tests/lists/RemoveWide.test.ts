import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { RemoveWide } from "../../src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveWide<TList>", () => {

  it("happy path", () => {
    type Answer = RemoveWide<[string, "42", number, 42]>;
    type None = RemoveWide<[number, string, boolean]>;
    
    type cases = [
      Expect<Equal<Answer, ["42",42]>>,
      Expect<Equal<None, []>>
    ];
    const cases: cases = [ true, true  ];
  });

});
