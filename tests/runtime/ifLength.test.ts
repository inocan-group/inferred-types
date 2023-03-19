import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IfLength,  Length } from "src/types";
import { ifLength, narrow } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfLength<TCompareTo,TVal,IF,ELSE>", () => {

  it("happy path", () => {
    type Tup1 = [1,2,3];
    type Tup2 = [3,4,5];

    type Equality = IfLength<Tup1, Length<Tup2>, "yes", "no">;

    type cases = [
      Expect<Equal<Equality, "yes">>, //
      
    ];
    const cases: cases = [ true ];
  });

});


describe("ifLength(val,len,if,else)", () => {

  it("happy path", () => {
    const tuple1 = narrow([1,2,3]);
    const tuple2 = narrow(["foo", "bar", "baz"]);

    const t1 = ifLength(tuple1, 3, () => "yes", () => "no");
    const t2 = ifLength(tuple1, tuple2.length, () => "yes", () => "no");

    const f1 = ifLength(tuple1, 1, () => "yes", () => "no");
    
    type cases = [
      Expect<Equal<typeof t1, "yes">>,
      Expect<Equal<typeof t2, "yes">>,
      Expect<Equal<typeof f1, "no">>,
    ];
    const cases: cases = [ true, true, true ];
  });



});
