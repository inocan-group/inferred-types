import { Equal, Expect } from "@type-challenges/utils";
import { Contains } from "src/types";
import { ExcludeNever, TupleFilter } from "src/types/lists/TupleFilter";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterTuple<Tuple, Filter>", () => {

  it("read-write Tuple, single filter", () => {
    type T1 = TupleFilter<[1,2, "foo", "bar"], string>; // [1,2]
    type T2 = TupleFilter<[1,2, "foo", "bar"], number>; // [ "foo", "bar"]
    type T3 = TupleFilter<[1,2, "foo", "bar"], 1>; // [ 2, "foo", "bar"]
    
    type cases = [
     Expect<Equal<T1, [1,2]>>, //
     Expect<Equal<T2, ["foo", "bar"]>>,
     Expect<Equal<T3, [2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true];
  });

  
  it("readonly Tuple, single filter", () => {
    type T1 = TupleFilter<readonly [1,2, "foo", "bar"], string>; // [1,2]
    type T2 = TupleFilter<readonly [1,2, "foo", "bar"], number>; // [ "foo", "bar"]
    type T3 = TupleFilter<readonly [1,2, "foo", "bar"], 1>; // [ 2, "foo", "bar"]
    type T4 = TupleFilter<readonly [1,2, "foo", "bar"], 2>; // [ 2, "foo", "bar"]
    
    type cases = [
      Expect<Equal<T1, readonly [1,2]>>, //
      Expect<Equal<T2, readonly ["foo", "bar"]>>,
      Expect<Equal<T3, readonly [2, "foo", "bar"]>>,
      Expect<Equal<T4, readonly [1, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true, true];
  });

  
  it("filter out never", () => {
    type StripNumbers = TupleFilter<[1, never, "foo", number, "bar"], number>;
    type StripStrings = TupleFilter<[never, 1, never, "foo", never, "bar", false], string>; 
    type HasNever = Contains<never, [1, never, "foo", number, "bar"]>;
    type StripNever = ExcludeNever<[1, never, "foo", number, "bar"]>;
    
    type cases = [
      Expect<Equal<StripNumbers, ["foo", "bar"]>>,
      Expect<Equal<StripStrings, [1, false]>>,
      Expect<Equal<HasNever, true>>,
      Expect<Equal<StripNever, [1, "foo", number, "bar"]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });
  

  it("read-write Tuple, OR/SOME filter", () => {
      type T1 = TupleFilter<[1,2, "foo", "bar"], ["foo", 5, 7]>; 
      type T2 = TupleFilter<[1,2, "foo", "bar"], [1, "foo"]>; 
      type T3 = TupleFilter<[1,2, "foo", "bar", true], [string, boolean]>; 
      
      type cases = [
       Expect<Equal<T1, [ 1, 2, "bar"]>>, 
       Expect<Equal<T2, [2, "bar"]>>,
       Expect<Equal<T3, [1,2]>>,
      ];
      const cases: cases = [true, true, true];
  });
  

});
