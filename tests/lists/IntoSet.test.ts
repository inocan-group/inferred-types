import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";
import { IntoSet } from "src/types/lists/sets";
import { describe, it } from "vitest";

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
      Expect<ExpectExtends<readonly ["foo", "bar"] | readonly ["bar", "foo"], UnionSet>>,
      Expect<ExpectExtends<
        readonly [["KV", "bar", string], ["KV", "foo", 1]] | readonly [["KV", "foo", 1], ["KV", "bar", string]], 
        ObjSet
      >>
    ];
    
    const cases: cases = [ true, true, true ];
  });

});
