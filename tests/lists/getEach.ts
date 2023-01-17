import { Equal, Expect } from "@type-challenges/utils";
import { GetEach } from "src/types/lists/GetEach";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("GetEach<T,P>", () => {

  it("happy path", () => {
    type List = readonly [
      {id: 1; value: "foo"}, 
      {id: 2; value: "bar"; cost: 5},
      {id: 3; value: "baz"; cost: 15}
    ];

    type ID = GetEach<List, "id">;
    type Value = GetEach<List, "value">;
    type Cost = GetEach<List, "cost">;
    type ID2 = GetEach<List, "id", true>;
    type Value2 = GetEach<List, "value">;
    type Cost2 = GetEach<List, "cost">;

    
    type cases = [
      Expect<Equal<ID, [1,2,3]>>,
      Expect<Equal<Value, ["foo", "bar", "baz"]>>,
      Expect<Equal<Cost, [never, 5, 15]>>
    ];
    const cases: cases = [ true, true, true ];
  });

  
  it("deep path", () => {
    type List = readonly [
      {id: 1; color: { favorite: "blue" }},
      {id: 2; color: { favorite: "green" }},
      {id: 3; color: { favorite: undefined; owns: "grey" }},
    ];

    type Fav = GetEach<List, "color.favorite">;
    type Owns = GetEach<List, "color.owns">;
    
    type cases = [
      Expect<Equal<Fav, [ "blue", "green", undefined ]>>,
      Expect<Equal<Owns, [ never, never, "grey" ]>>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("into an array structure", () => {
    type List = readonly [
      { id: 1; colors: ["blue", "green", "red"] },
      { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
    ];

    type First = GetEach<List, "colors.0">;
    type Incomplete = GetEach<List, "colors.3">;
    type Empty = GetEach<List, "colors.5">;
    
    type cases = [
      Expect<Equal<First, ["blue", "purple"]>>,
      Expect<Equal<Incomplete, [never, "fuchsia"]>>,
      Expect<Equal<Empty, [never, never]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
