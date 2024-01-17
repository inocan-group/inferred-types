import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { MergeObjects } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("MergeObjects<A,B>", () => {


  it("happy path", () => {
    type T1 = MergeObjects<{ foo: 1; bar: 2 }, { bar: 4; baz: "howdy" }>;
    type T2 = MergeObjects<{ bar: 4; baz: "howdy" }, { foo: 1; bar: 2 }>;

    
    type cases = [
      Expect<Equal<T1, {foo: 1; bar: 4; baz: "howdy"}>>,
      Expect<Equal<T2, {foo: 1; bar: 2; baz: "howdy"}>>,
    ];

    const cases: cases = [ 
      true, true,
    ];
  });

});
