import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Increment } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Increment<T>", () => {

  it("happy path (numbers)", () => {
    type Ten = Increment<10>;
    type Thirty = Increment<30>;
    type Zero = Increment<0>;

    type cases = [
      Expect<Equal<Ten, 11>>,
      Expect<Equal<Thirty, 31>>,
      Expect<Equal<Zero, 1>>
    ];
    const cases: cases = [ true, true, true ];
  });

  it("happy path (string literals)", () => {
    type Ten = Increment<"10">;
    type Thirty = Increment<"30">;
    type Zero = Increment<"0">;

    type cases = [
      Expect<Equal<Ten, "11">>,
      Expect<Equal<Thirty, "31">>,
      Expect<Equal<Zero, "1">>
    ];
    const cases: cases = [ true, true, true ];
  });

});
