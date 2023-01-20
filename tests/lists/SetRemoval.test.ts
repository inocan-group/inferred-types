import { Equal, Expect } from "@type-challenges/utils";
import {  SetRemoval } from "src/types/lists/sets";
import {  describe, expect,  it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.




describe("SetRemoval<TSet, TRemoval>", () => {
  
  it("happy path", () => {
    type Set1 = ["foo", "bar", "baz"];
    type Set2 = ["bat-shit-crazy", "never mind"];
    type Set3 = readonly ["foo", "bar", "baz"];
    type Set4 = readonly ["bat-shit-crazy", "never mind"];

    type T1 = SetRemoval<Set1, "foo">;
    type T2 = SetRemoval<Set1, ["foo"]>;
    type T3 = SetRemoval<[...Set1, ...Set2], ["foo", "never mind"]>;

    type T4 = SetRemoval<Set3, "foo">;
    type T5 = SetRemoval<Set3, ["foo"]>;
    type T6 = SetRemoval<[...Set3, ...Set4], ["foo", "never mind"]>;

    
    type cases = [
      Expect<Equal<T1, readonly ["bar", "baz"]>>,
      Expect<Equal<T2, readonly ["bar", "baz"]>>,
      Expect<Equal<T3, readonly ["bar", "baz", "bat-shit-crazy"]>>,
      Expect<Equal<T4, readonly ["bar", "baz"]>>,
      Expect<Equal<T5, readonly ["bar", "baz"]>>,
      Expect<Equal<T6, readonly ["bar", "baz", "bat-shit-crazy"]>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
