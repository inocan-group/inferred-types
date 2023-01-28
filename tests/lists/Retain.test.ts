import { Equal, Expect } from "@type-challenges/utils";
import { Retain } from "src/types/lists/Retain";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Retain", () => {

  it("read-write Tuple, single filter", () => {
    type T1 = Retain<[1,2, "foo", "bar"], string>; 
    type T2 = Retain<[1,2, "foo", "bar"], number>; 
    type T3 = Retain<[1,2, "foo", "bar"], 1>; 
    
    type cases = [
     Expect<Equal<T1, ["foo", "bar"]>>,
     Expect<Equal<T2, [1,2]>>,
     Expect<Equal<T3, [1]>>,
    ];
    const cases: cases = [true, true, true];
  });

  it("readonly Tuple, single filter", () => {
    type T1 = Retain<readonly [1,2, "foo", "bar"], string>; 
    type T2 = Retain<readonly [1,2, "foo", "bar"], number>; 
    type T3 = Retain<readonly [1,2, "foo", "bar"], 1>; 
    
    type cases = [
     Expect<Equal<T1, readonly ["foo", "bar"]>>,
     Expect<Equal<T2, readonly [1,2]>>,
     Expect<Equal<T3, readonly [1]>>,
    ];
    const cases: cases = [true, true, true];
  });

  it("read-write Tuple, OR/SOME filter", () => {
    type T1 = Retain<[1,2, "foo", "bar"], ["foo", 1, 7]>; 
    type T2 = Retain<[ 1,2, "foo", "bar", false ], [number, string]>; 
    type T3 = Retain<[ 1, 2, "foo", "bar", true], [string, boolean]>; 
    
    type cases = [
     Expect<Equal<T1, [ "foo", 1 ]>>, 
     Expect<Equal<T2, [1,2, "foo", "bar"]>>,
     Expect<Equal<T3, ["foo", "bar", true]>>,
    ];
    const cases: cases = [true, true, true];
});

});
