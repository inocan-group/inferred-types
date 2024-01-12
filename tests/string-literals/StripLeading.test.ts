;import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {StripLeading} from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("StripLeading<TRemove, TStr>", () => {

  it("Happy Path", () => {
    type World = StripLeading<"HelloWorld", "Hello">;
    type Missing = StripLeading<"World", "Hello">;
    
    type cases = [
      Expect<Equal<World, "World">>,
      Expect<Equal<Missing, "World">>,
    ];
    const cases: cases = [ true, true ];
  });

});
