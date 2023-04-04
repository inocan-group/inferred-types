import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Truncate } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Truncate<T>", () => {

  it("happy path", () => {
    type NoTrunc = Truncate<"Foobar", 10>;
    type Trunc = Truncate<"Foobar", 3>;
    type TruncWithEllipsis = Truncate<"Foobar", 3, true>;
    
    type cases = [
      Expect<Equal<NoTrunc, "Foobar">>,
      Expect<Equal<Trunc, "Foo">>,
      Expect<Equal<TruncWithEllipsis, "Foo...">>,
    ];
    const cases: cases = [ true, true, true ];
  });
});
