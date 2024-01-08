import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Decrement } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Decrement<T>", () => {

  it("happy path (numbers)", () => {
    type Ten = Decrement<10>;
    type Thirty = Decrement<30>;
    type Zero = Decrement<0>;

    type cases = [
      Expect<Equal<Ten, 9>>,
      Expect<Equal<Thirty, 29>>,
      Expect<Equal<Zero, 0>>
    ];
    const cases: cases = [ true, true, true ];
  });

  it("happy path (string literals)", () => {
    type Ten = Decrement<"10">;
    type Thirty = Decrement<"30">;
    type Zero = Decrement<"0">;

    type cases = [
      Expect<Equal<Ten, "9">>,
      Expect<Equal<Thirty, "29">>,
      Expect<Equal<Zero, "0">>
    ];
    const cases: cases = [ true, true, true ];
  });

});
