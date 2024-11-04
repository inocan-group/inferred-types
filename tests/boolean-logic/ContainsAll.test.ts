import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ContainsAll } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ContainsAll<TList,THasAll>", () => {

  it("happy path", () => {
    type Arr = ["foo", "bar", "baz"];
    type T1 = ContainsAll<Arr, ["foo", "bar"]>;

    type cases = [
      Expect<Equal<T1, true>>,
    ];
    const cases: cases = [ true ];
  });

});
