import { Equal, Expect } from "@type-challenges/utils";
import { ReplaceLast } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ReplaceLast<TList, TVal>", () => {

  it("happy path", () => {
    type T1 = ReplaceLast<[1,2,3], "foo">;

    type cases = [
      Expect<Equal<T1, [1,2, "foo"]>>
    ];
    const cases: cases = [ true ];
  });

});
