import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { MergeObjects } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeObjects<A,B>", () => {
  type FooBar = { foo: 1; bar: 2 };
  type BarBaz = { bar: 4; baz: "howdy" };

  it("happy path", () => {
    type T1 = MergeObjects<FooBar, BarBaz>;
    type T2 = MergeObjects<BarBaz, FooBar>;
    
    type cases = [
      Expect<Equal<T1, {foo: 1; bar: 4; baz: "howdy"}>>,
      Expect<Equal<T2, {foo: 1; bar: 2; baz: "howdy"}>>,
    ];

    const cases: cases = [ 
      true, true
    ];
  });

});
