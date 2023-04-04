import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { getEach } from "src/runtime/lists";
import { GetEach } from "src/types/lists";

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
    
    type cases = [
      Expect<Equal<ID, readonly [1,2,3] >>,
      Expect<Equal<Value, readonly ["foo", "bar", "baz"] >>,
      Expect<Equal<Cost, readonly [ 5, 15 ] >>
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
      Expect<Equal<Fav, readonly [ "blue", "green" ] >>,
      Expect<Equal<Owns, readonly [ "grey" ] >>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("into an array structure", () => {
    type List =  [
      { id: 1; colors: ["blue", "green", "red"] },
      { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
    ];

    type First = GetEach<List, "colors.0">;
    type Incomplete = GetEach<List, "colors.3">;
    type Empty = GetEach<List, "colors.5">;
    
    type cases = [
      Expect<Equal<First, ["blue", "purple"]>>,
      Expect<Equal<Incomplete, ["fuchsia"]>>,
      Expect<Equal<Empty, []>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  it("into a readonly array structure", () => {
    type List =  readonly [
      { id: 1; colors: ["blue", "green", "red"] },
      { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
    ];

    type First = GetEach<List, "colors.0">;
    type Incomplete = GetEach<List, "colors.3">;
    type Empty = GetEach<List, "colors.5">;
    
    type cases = [
      Expect<Equal<First, readonly ["blue", "purple"]>>,
      Expect<Equal<Incomplete, readonly ["fuchsia"]>>,
      Expect<Equal<Empty, readonly []>>,
    ];
    const cases: cases = [ true, true, true ];
  });

  const objSet = [
    {id: 1, color: { favorite: "blue" }},
    {id: 2, color: { favorite: "green" }},
    {id: 3 },
  ] as const;
  const arrSet = [
      { id: 1, color: ["blue", "green", "red"] as const },
      { id: 2, color: ["purple", "lime", "orange", "fuchsia"] as const },
      { id: 3 },
  ] as const;
  
  it("runtime: happy path", () => {
    const idObjSet = getEach(objSet, "id");
    const idArrSet = getEach(arrSet, "id");
    expect(idObjSet).toEqual([1,2,3]);
    expect(idArrSet).toEqual([1,2,3]);
    
    const colorsObjSet = getEach(objSet, "color");
    const colorsArrSet = getEach(arrSet, "color");
    
    expect(colorsObjSet).toEqual([{favorite: "blue"}, {favorite: "green"}]);
    expect(colorsArrSet).toHaveLength(2);
  });

  
  it("runtime: optional inclusion of never values", () => {
    const shallowNoErr = getEach(objSet, "color");
    const shallowWithNever = getEach(objSet, "color", { handleErrors:  "to-never"});

    expect(shallowNoErr, "shallow without never").toHaveLength(2);
    expect(shallowWithNever, "shallow with never").toHaveLength(3);

    const objNoErr = getEach(objSet, "color.favorite", { handleErrors: "ignore" });
    const arrNoErr = getEach(arrSet, "color.0");
    const objWithNever = getEach(objSet, "color.favorite", { handleErrors: "to-never" });
    const arrWithNever = getEach(arrSet, "color.0", { handleErrors: "to-never" });

    expect(objNoErr, "object with nevers eliminated").toHaveLength(2);
    expect(arrNoErr, "array with nevers eliminated").toHaveLength(2);
    expect(objWithNever, "object with nevers included").toHaveLength(3);
    expect(objWithNever, "array with nevers included").toHaveLength(3);

    type cases = [
      // deep
      Expect<Equal<typeof objNoErr, readonly ["blue", "green"]>>,
      Expect<Equal<typeof arrNoErr, readonly ["blue", "purple"]>>,
      Expect<Equal<typeof objWithNever, readonly ["blue", "green", never]>>,
      Expect<Equal<typeof arrWithNever, readonly ["blue", "purple", never]>>,
    ];
    
    const cases: cases = [ true, true, true, true ];
  });

});
