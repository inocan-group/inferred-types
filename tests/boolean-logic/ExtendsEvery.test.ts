import { Equal, Expect } from "@type-challenges/utils";
import { ExtendsEvery } from "src/types/boolean-logic/Extends";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ExtendsEvery<V,T>", () => {

  it("happy path", () => {
    type F1 = ExtendsEvery<string, ["foo", 42, "bar"]>;
    type F2 = ExtendsEvery<number, ["foo", 42, "bar"]>;
    type F3 = ExtendsEvery<42, [1, 42, 99]>;

    type T1 = ExtendsEvery<string, ["foo", "bar", "baz"]>;
    type T2 = ExtendsEvery<number, [1,2,3]>;
    type T3 = ExtendsEvery<"foo" | "bar", ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<F1, false>>,//
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
    ];
    const cases: cases = [ true, true, true, true, true, true];
  });

  

});
