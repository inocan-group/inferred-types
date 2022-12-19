import { Equal, Expect } from "@type-challenges/utils";
import { FilterTuple } from "src/types/lists/FilterTuple";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterTuple<Tuple, Filter>", () => {

  it("happy path", () => {
    type T1 = FilterTuple<[1,2, "foo", "bar"], string>; // [1,2]
    type T2 = FilterTuple<[1,2, "foo", "bar"], number>; // [ "foo", "bar"]
    type T3 = FilterTuple<[1,2, "foo", "bar"], 1>; // [ 2, "foo", "bar"]
    
    type cases = [
     Expect<Equal<T1, [1,2]>>, //
     Expect<Equal<T2, ["foo", "bar"]>>,
     Expect<Equal<T3, [2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true];
  });

  
  it("readonly arrays", () => {
    type T1 = FilterTuple<readonly [1,2, "foo", "bar"], string>; // [1,2]
    type T2 = FilterTuple<readonly [1,2, "foo", "bar"], number>; // [ "foo", "bar"]
    type T3 = FilterTuple<readonly [1,2, "foo", "bar"], 1>; // [ 2, "foo", "bar"]
    
    type cases = [
      Expect<Equal<T1, readonly [1,2]>>, //
      Expect<Equal<T2, readonly ["foo", "bar"]>>,
      Expect<Equal<T3, readonly [2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true];
  });
  

});