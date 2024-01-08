import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IntoSet } from "src/types/lists";
import { HasSameValues } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntoSet", () => {

  it("happy path", () => {
    type TupleSet = IntoSet<["foo", "bar"]>; 
    type UnionSet = IntoSet<"foo" | "bar">; // no order guaranteed
    type ObjSet = IntoSet<{foo: 1; bar: string }>; // no order guaranteed

    type cases = [
      Expect<Equal<TupleSet, readonly ["foo", "bar"]>>,
      Expect<HasSameValues<UnionSet, readonly ["foo", "bar"]>>,
      Expect<HasSameValues<
        ObjSet,
        readonly [["KV", "foo", 1], ["KV", "bar", string]]
      >>
    ];
    
    const cases: cases = [ true, true, true ];
  });

});
