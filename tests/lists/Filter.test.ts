import { Equal, Expect } from "@type-challenges/utils";
import { filter } from "src/runtime/lists/filter";
import { Contains } from "src/types";
import { RemoveNever } from "src/types/lists/extractors";
import { Filter } from "src/types/lists/Filter";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterTuple<Tuple, Filter>", () => {

  it("read-write Tuple, single filter", () => {
    type Foobar = Filter<[1,2, "foo", "bar"], string>; 
    type Foobar2 = Filter<[1,2, "foo", "bar"], string, "extends">; 
    type Foobar3 = Filter<[1,2, "foo", "bar"], number, "does-not-extend">;
    type Numeric = Filter<[1,2, "foo", "bar"], number>;
    type Hybrid = Filter<[1,2, "foo", "bar"], 1, "does-not-extend">; 
    
    type cases = [
     Expect<Equal<Foobar, ["foo", "bar"]>>, //
     Expect<Equal<Foobar2, ["foo", "bar"]>>,
     Expect<Equal<Foobar3, ["foo", "bar"]>>,
     Expect<Equal<Numeric, [1,2]>>,
     Expect<Equal<Hybrid, [2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

  
  it("readonly Tuple, single filter", () => {
    type Foobar = Filter<readonly [1,2, "foo", "bar"], string>; 
    type Foobar2 = Filter<readonly [1,2, "foo", "bar"], string, "extends">; 
    type Foobar3 = Filter<readonly [1,2, "foo", "bar"], number, "does-not-extend">;
    type Numeric = Filter<readonly [1,2, "foo", "bar"], number>;
    type Hybrid = Filter<readonly [1,2, "foo", "bar"], 1, "does-not-extend">; 
    
    type cases = [
     Expect<Equal<Foobar, readonly ["foo", "bar"]>>, //
     Expect<Equal<Foobar2, readonly ["foo", "bar"]>>,
     Expect<Equal<Foobar3, readonly ["foo", "bar"]>>,
     Expect<Equal<Numeric, readonly [1,2]>>,
     Expect<Equal<Hybrid, readonly [2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

  
  it("filter out never", () => {
    type StripNumbers = Filter<[1, never, "foo", number, "bar"], number, "does-not-extend">;
    type StripStrings = Filter<[never, 1, never, "foo", never, "bar", false], string, "does-not-extend">; 
    type HasNever = Contains<never, [1, never, "foo", number, "bar"]>;
    type StripNever = RemoveNever<[1, never, "foo", number, "bar"]>;
    
    type cases = [
      Expect<Equal<StripNumbers, ["foo", "bar"]>>,
      Expect<Equal<StripStrings, [1, false]>>,
      Expect<Equal<HasNever, true>>,
      Expect<Equal<StripNever, [1, "foo", number, "bar"]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });
  

  it("read-write Tuple, multiple filters (OR)", () => {
    type T1 = Filter<[1,2, "foo", "bar"], ["foo", 5, 7], "extends">; 
    type T2 = Filter<[1,2, "foo", "bar"], ["foo", 5, 7], "does-not-extend">; 
    type T3 = Filter<[1,2, "foo", "bar"], [1, "foo"]>; 
      type T4 = Filter<[1,2, "foo", "bar", true], [string, boolean]>; 
      
      type cases = [
       Expect<Equal<T1, ["foo"]>>,
       Expect<Equal<T2, [2, "bar"]>>,
       Expect<Equal<T3, [1,2]>>,
      ];
      const cases: cases = [true, true, true];
  });

  it("readonly Tuple, OR/SOME filter", () => {
    type T1 = Filter<readonly [1,2, "foo", "bar"], ["foo", 5, 7]>; 
    type T2 = Filter<readonly [1,2, "foo", "bar"], [1, "foo"]>; 
    type T3 = Filter<readonly [1,2, "foo", "bar", true], [string, boolean]>; 
    
    type cases = [
     Expect<Equal<T1, readonly [ 1, 2, "bar"]>>, 
     Expect<Equal<T2, readonly [2, "bar"]>>,
     Expect<Equal<T3, readonly [1,2]>>,
    ];
    const cases: cases = [true, true, true];
});
  
  
  it("runtime: extends / does-not-extend", () => {
    const arr = [1,2, "foo", "bar"] as const;
    const foobar = filter(arr, "does-not-extend", 1 as number);
    expect(foobar).toEqual(["foo", "bar"]);

  });
  


});
