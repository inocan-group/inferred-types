import { Equal, Expect } from "@type-challenges/utils";
import { EnsureLeadingEvery } from "src/types/string-literals/EnsureLeadingEvery";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureLeadingEvery<TList, TLeading>", () => {

  it("happy path", () => {
    type List = ["foo", 42, "bar"];
    type T1 = EnsureLeadingEvery<List, "a.">;
    
    type cases = [
      Expect<Equal<T1, readonly ["a.foo", "a.42", "a.bar"]>>,
    ];
    const cases: cases = [ true ];
  });

});
