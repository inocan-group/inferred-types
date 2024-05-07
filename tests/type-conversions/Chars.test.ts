import { Equal, Expect } from "@type-challenges/utils";
import { Chars } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Chars<T>", () => {

  it("happy path", () => {
    type FooBar = Chars<"FooBar">;
    
    type cases = [
      Expect<Equal<FooBar, ["F","o","o","B","a","r"]>>,
    ];
    const cases: cases = [
      true
    ];
  });

});
