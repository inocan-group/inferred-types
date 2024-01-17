import { Equal, Expect } from "@type-challenges/utils";
import { Repeat } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Repeat<TStr,TCount>", () => {

  it("happy path", () => {
    type T1 = Repeat<"a", 5>;
    type T2 = Repeat<"foo", 3>;
    
    type cases = [
      Expect<Equal<T1, "aaaaa">>,
      Expect<Equal<T2, "foofoofoo">>,
    ];
    const cases: cases = [ true, true ];
  });

});
