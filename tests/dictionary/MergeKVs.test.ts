import { Equal, Expect } from "@type-challenges/utils";
import { KV, MergeKVs } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeKVs<T>", () => {

  it("Happy Path", () => {
    type Foo = KV<"foo","foo">;
    type Bar = KV<"bar","bar">;
    type Baz = KV<"baz","baz">;
    type M = MergeKVs<[Foo,Bar,Baz]>;
    
    type cases = [
     Expect<Equal<M, {
      foo: "foo";
      bar: "bar";
      baz: "baz";
     }>>,
    ];
    const cases: cases = [ true ];
  });

});
