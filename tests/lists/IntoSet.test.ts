import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";
import { IntoSet } from "src/types/lists/sets";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntoSet", () => {

  it("happy path", () => {
    type T1 = IntoSet<["foo", "bar"]>; 
    type T2 = IntoSet<"foo" | "bar">; // no order guaranteed

    type cases = [
      Expect<Equal<T1, readonly ["foo", "bar"]>>,
      Expect<ExpectExtends<readonly ["foo", "bar"] | readonly ["bar", "foo"], T2>>,
    ];
    
    const cases: cases = [ true, true ];
  });

});
