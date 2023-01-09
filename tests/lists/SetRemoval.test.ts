import { Equal, Expect } from "@type-challenges/utils";
import { SetInput, SetRemoval } from "src/types/lists/set-ops";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("SetRemoval<TSet, TRemoval>", () => {
  
  it("Set<T> basics", () => {
    const builder = <S extends readonly string[]>(...s: S) => s as S;

    const t = builder("foo");
    const t2 = builder("foo", "bar");
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
    
  });
  

  it("happy path", () => {
    type Set1 = ["foo", "bar", "baz"];
    type Set2 = ["bat-shit-crazy", "never mind"];

    type T1 = SetRemoval<Set1, "foo">;
    type T2 = SetRemoval<Set1, ["foo"]>;
    type T3 = SetRemoval<[...Set1, ...Set2], ["foo", "never mind"]>;
    
    
    type cases = [
      Expect<Equal<T1, readonly ["bar", "baz"]>>,
      Expect<Equal<T2, readonly ["bar", "baz"]>>,
      Expect<Equal<T3, readonly ["bar", "baz", "bat-shit-crazy"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});