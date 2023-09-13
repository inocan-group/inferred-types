import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { filter } from "src/runtime";
import { RemoveNever,  RetainFromList , Contains , Filter } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Filter<Tuple, Filter, Op>", () => {

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

  
  it("filter out tuples", () => {
    type Lookup = [
      ["man","men"],
      ["woman","women"]
    ];
    type Man = Filter<Lookup, ["man", string], "extends">[0];
    type Woman = Filter<Lookup, ["woman", string], "extends">[0];
    
    type cases = [
      Expect<Equal<Man, ["man","men"]>>,
      Expect<Equal<Woman, ["woman","women"]>>,
    ];
    const cases: cases = [ true, true ];
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

  it("read-write Tuple, multiple extends filters (OR)", () => {
    type T1 = Filter<[1,2, "foo", "bar"], ["foo", 5, 7], "extends(unionize)">; 
    type T2 = Filter<[1,2, "foo", "bar"], ["foo", 5, 7], "does-not-extend(unionize)">; 
    type T3 = Filter<[1,2, "foo", "bar"], [1, "foo"], "extends(unionize)">; 
    type T4 = Filter<[1,2, "foo", "bar", true], [string, boolean], "extends(unionize)">; 
      
      type cases = [
        Expect<Equal<T1, ["foo"]>>,
        Expect<Equal<T2, [1,2, "bar"]>>,
       Expect<Equal<T3, [1,"foo"]>>,
       Expect<Equal<T4, ["foo", "bar", true]>>,
      ];
      const cases: cases = [true, true, true, true];
  });

  it("readonly Tuple, OR/SOME filter", () => {
    type T1 = Filter<readonly [1,2, "foo", "bar"], ["foo", 5, 7], "extends(unionize)">; 
    type T2 = Filter<readonly [1,2, "foo", "bar"], [1, "foo"], "extends(unionize)">; 
    type T3 = Filter<readonly [1,2, "foo", "bar", true], [string, boolean], "extends(unionize)">; 
    
    type cases = [
     Expect<Equal<T1, readonly [ "foo"]>>, 
     Expect<Equal<T2, readonly [1, "foo"]>>,
     Expect<Equal<T3, readonly ["foo", "bar", true]>>,
    ];
    const cases: cases = [true, true, true];
  });

  it("Filtering with r/w no-equal and equals", () => {
    type List = [1,2, "foo", "bar", never, 1];
    type L2 = [1,2, "foo", "bar"];

    type One = Filter<List, 1, "equals">; 
    type NoFoo = Filter<List, "foo", "not-equal">;
    type NoFoo2 = Filter<L2, "foo", "not-equal">;

    
    type cases = [
      Expect<Equal<One, [1,1]>>,
      Expect<Equal<NoFoo, [1,2,"bar",never, 1]>>,
      Expect<Equal<NoFoo2, [1,2,"bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  it("Filtering with readonly no-equal and equals", () => {
    type List = readonly [1,2, "foo", "bar", never, 1];
    type L2 = readonly [1,2, "foo", "bar"];

    type One = Filter<List, 1, "equals">; 
    type NoFoo = Filter<List, "foo", "not-equal">;
    type NoFoo2 = Filter<L2, "foo", "not-equal">;

    type cases = [
      Expect<Equal<One, readonly [1,1]>>,
      Expect<Equal<NoFoo, readonly [1,2,"bar",never, 1]>>,
      Expect<Equal<NoFoo2, readonly [1,2,"bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  it("Filter array with equals", () => {
    type List = [1,2, "foo", "bar", never];

    type FooBar = Filter<List, ["foo", "bar"], "extends(unionize)">;
    type FooBar2 = RetainFromList<List, "extends(unionize)", ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<FooBar, FooBar2>>,
      Expect<Equal<FooBar, ["foo", "bar"]>>,
    ];
    const cases: cases = [ true, true ];
    
  });
  
  
  it("runtime: extends / does-not-extend", () => {
    const arr = [1,2, "foo", "bar"] as const;
    const foobar = filter(arr, "does-not-extend", 1 as number);
    const foobar2 = filter(arr, "not-equal", 1);
    
    expect(foobar).toEqual(["foo", "bar"]);
    expect(foobar2).toEqual([2, "foo","bar"]);
  });
});
