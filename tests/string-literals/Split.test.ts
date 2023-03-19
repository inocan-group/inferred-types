import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Split } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Split<T,SEP>", () => {

  it("happy path", () => {
    type CommaFooBar = Split<"foo,bar", ",">;
    type Chars = Split<"hello","">;
    type Empty = Split<"">;
    type Empty2 = Split<"",",">;
    
    type cases = [
      Expect<Equal<CommaFooBar, ["foo", "bar"]>>,
      Expect<Equal<
        Chars, 
        ["h", "e", "l", "l", "o"]
      >>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<Empty2, []>>,
    ];

    const cases: cases = [
      true, true, true, true
    ];
  });

});
