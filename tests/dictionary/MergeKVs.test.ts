import { Equal, Expect } from "@type-challenges/utils";
import { Dictionary, MergeKVs } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeKVs<T>", () => {

  it("Happy Path", () => {
    type Foo = Dictionary<"foo","foo">;
    type Bar = Dictionary<"bar","bar">;
    type Baz = Dictionary<"baz","baz">;
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
