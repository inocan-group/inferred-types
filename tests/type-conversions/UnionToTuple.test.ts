import { Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UnionToTuple,  SameKeys } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionToTuple<U>", () => {

  it("happy path", () => {
    type Foobar = UnionToTuple<"foo" | "bar">;
    type OneTwoThree = UnionToTuple<1 | 2 | 3>;
    type Mixed =  UnionToTuple<1 | 2 | "foo" | "bar">;
    
    type cases = [
      Expect<SameKeys<Foobar, ["foo", "bar"]>>,
      Expect<SameKeys<OneTwoThree, [1,2,3]>>,
      Expect<SameKeys<Mixed, [1,2,"foo","bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
