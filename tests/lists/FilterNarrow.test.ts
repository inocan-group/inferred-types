import { Equal, Expect } from "@type-challenges/utils";
import { FilterNarrow } from "src/types/lists/FilterNarrow";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FilterNarrow<TList, Filter>", () => {

  it("read-write list, single filter", () => {
    type List = [1,2, "foo", "bar", never];
    type L2 = [1,2, "foo", "bar"];
    type WideString = FilterNarrow<List, string>; 
    type WideString2 = FilterNarrow<L2, string>;
    type WideNumber = FilterNarrow<List, number>; 
    type L1 = FilterNarrow<List, 1>;
    type Foo = FilterNarrow<List, "foo">;
    type NotNever = FilterNarrow<List, never>;
    
    type cases = [
      Expect<Equal<WideString, [1,2, "foo", "bar", never]>>,
      Expect<Equal<WideString2, [1,2, "foo", "bar"]>>,
      Expect<Equal<WideNumber, [1,2, "foo", "bar", never]>>,
      Expect<Equal<L1, [2, "foo", "bar", never]>>,
      Expect<Equal<Foo, [1, 2,  "bar", never]>>,
      Expect<Equal<NotNever, [1, 2,  "foo", "bar"]>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

  it("readonly list, single filter", () => {
    type List = readonly [1,2, "foo", "bar", never];
    type WideString = FilterNarrow<List, string>; 
    type WideNumber = FilterNarrow<List, number>; 
    type L1 = FilterNarrow<List, 1>;
    type Foo = FilterNarrow<List, "foo">;
    type NotNever = FilterNarrow<List, never>;
    
    type cases = [
     Expect<Equal<WideString, readonly [1,2, "foo", "bar", never]>>,
     Expect<Equal<WideNumber, readonly [1,2, "foo", "bar", never]>>,
     Expect<Equal<L1, readonly [2, "foo", "bar", never]>>,
     Expect<Equal<Foo, readonly [1, 2,  "bar", never]>>,
     Expect<Equal<NotNever, readonly [1, 2,  "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true, true, true ];
  });

  
  it("read/write list, filter array", () => {
    type List = [1,2, "foo", "bar", never];

    type FooBar = FilterNarrow<List, ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<FooBar, [1, 2]>>,
    ];
    const cases: cases = [ true ];
    
  });

  it("readonly list, filter array", () => {
    type List = readonly [1,2, "foo", "bar", never];

    type FooBar = FilterNarrow<List, ["foo", "bar"]>;
    
    type cases = [
      Expect<Equal<FooBar, readonly [1, 2]>>,
    ];
    const cases: cases = [ true ];
    
  });
  
});
