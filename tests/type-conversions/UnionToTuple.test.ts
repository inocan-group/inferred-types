import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UnionToTuple } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionToTuple<U>", () => {

  it("happy path", () => {
    type Foobar = UnionToTuple<"foo" | "bar">;
    type OneTwoThree = UnionToTuple<1 | 2 | 3>;
    
    type cases = [
      Expect<Equal<Foobar, ["foo", "bar"]>>,
      Expect<Equal<OneTwoThree, [1,2,3]>>,
    ];
    const cases: cases = [ true, true ];
  });

});
