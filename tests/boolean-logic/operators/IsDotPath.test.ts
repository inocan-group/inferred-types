import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsDotPath } from "../../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsDotPath<T>", () => {

  it("happy path", () => {
    type Root = IsDotPath<"">;
    type SingleOffset = IsDotPath<"foo">;
    type MultiOffset = IsDotPath<"foo.bar">;
    type InvalidChar = IsDotPath<"foo/bar">;
    
    type cases = [
      Expect<Equal<Root, true>>,
      Expect<Equal<SingleOffset, true>>,
      Expect<Equal<MultiOffset, true>>,
      Expect<Equal<InvalidChar, false>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
