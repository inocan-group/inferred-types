import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { CombinedKeys } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("CombinedKeys<A,B>", () => {

  it("Happy Path", () => {
    type T1 = CombinedKeys<{foo: 1; bar: 2; baz: 3}, {bar: 4; baz: 5; bax: 6}>;
    type FooBarBaz = CombinedKeys<{foo: 1; bar: 2}, {baz: 3}>;

    type cases = [
      Expect<Equal<T1, ["foo","bar","baz", "bax"]>>,
      Expect<Equal<FooBarBaz, ["foo","bar","baz"]>>,
    ];
    const cases: cases = [ true, true ];
  });

});
