import { Equal, Expect } from "@type-challenges/utils";
import { intoSet } from "src/runtime/lists/intoSet";
import { unique } from "src/runtime/lists/unique";
import { uniqueByProp } from "src/runtime/lists/uniqueProp";
import { IntoSet, Intersection, SetRemoval, Unique } from "src/types/lists/set-ops";
import {  describe, expect,  it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntoSet", () => {

  it("happy path", () => {
    type T1 = IntoSet<["foo", "bar"]>; 
    type T2 = IntoSet<"foo" | "bar">; 

    type cases = [
      Expect<Equal<T1, readonly ["foo", "bar"]>>,
      Expect<Equal<T2, readonly ["bar", "foo"]>>,
    ];
    
    const cases: cases = [ true, true ];
  });

});


describe("SetRemoval<TSet, TRemoval>", () => {
  
  it("happy path", () => {
    type Set1 = ["foo", "bar", "baz"];
    type Set2 = ["bat-shit-crazy", "never mind"];
    type Set3 = readonly ["foo", "bar", "baz"];
    type Set4 = readonly ["bat-shit-crazy", "never mind"];

    type T1 = SetRemoval<Set1, "foo">;
    type T2 = SetRemoval<Set1, ["foo"]>;
    type T3 = SetRemoval<[...Set1, ...Set2], ["foo", "never mind"]>;

    type T4 = SetRemoval<Set3, "foo">;
    type T5 = SetRemoval<Set3, ["foo"]>;
    type T6 = SetRemoval<[...Set3, ...Set4], ["foo", "never mind"]>;

    
    type cases = [
      Expect<Equal<T1, readonly ["bar", "baz"]>>,
      Expect<Equal<T2, readonly ["bar", "baz"]>>,
      Expect<Equal<T3, readonly ["bar", "baz", "bat-shit-crazy"]>>,
      Expect<Equal<T4, readonly ["bar", "baz"]>>,
      Expect<Equal<T5, readonly ["bar", "baz"]>>,
      Expect<Equal<T6, readonly ["bar", "baz", "bat-shit-crazy"]>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});

describe("Intersection", () => {

  it("happy path", () => {
    type Set1 = readonly ["foo", "bar"];
    type Set2 = readonly ["bar", "baz", 42];

    type T1 = Intersection<Set1, Set2>;
    type T2 = Intersection<Set2, Set1>;
    type T3 = Intersection<Set1, []>;
    type T4 = Intersection<[], Set1>;

    type cases = [
      Expect<Equal<T1, readonly ["bar"]>>,
      Expect<Equal<T2, readonly ["bar"]>>,
      Expect<Equal<T3, readonly []>>,
      Expect<Equal<T4, readonly []>>,
    ];
    
    const cases: cases = [ true, true, true, true ];
  });

});

describe("Unique", () => {
  type Scalar1 = [1,2,3,4];
  type Scalar2 = [3,4,5,6];
  type Obj1 = {id: 1; bar: 2};
  type Obj2 = {id: 1; bar: 10};
  type Obj3 = {id: 2; bar: 20};

  type OSet1 = IntoSet<[Obj1, Obj2]>;
  type OSet2 = IntoSet<[Obj2, Obj3]>;

  it("type check: no dereferencing", () => {
    type T1 = Unique<Scalar1, Scalar2>;
    type T2 = Unique<Scalar2, Scalar1>;
    type T3 = Unique<OSet1, OSet2>;

    type cases = [
      Expect<Equal<T1, readonly [ [1,2], [5,6] ]>>,
      Expect<Equal<T2, readonly [ [5,6], [1,2] ]>>,
      // object testing
      Expect<Equal<T3, readonly [ [Obj1], [Obj2] ]>>,
    ];
    
    const cases: cases = [ true, true, true ];
  });

  
  it("type check: with dereferencing", () => {
    type T3 = Unique<OSet1, OSet2, "id">;
    
    type cases = [
      Expect<Equal<
        T3,
        readonly [
          [{ id: 1; bar: 2}],
          [{ id: 3; bar: 20}]
        ]
      >>
    ];
    const cases: cases = [ true ];
    
  });
  
  it("runtime", () => {
    const list1 = intoSet([1,2,3,4] as const);
    const list2 = intoSet([3,4,5,6] as const);
    const obj1 = {id: 1, val: "hi" } as const;
    const obj2 = {id: 2, val: "middling" } as const;
    const obj3 = {id: 3, val: "bye" } as const;

    const u = unique(list1,list2);
    const u2 = unique(list2,list1);
    const uObjects = unique([obj1, obj2] as const, [obj2, obj3] as const);

    expect(u).toEqual([[1,2],[5,6]]);
    expect(u2).toEqual([[5,6],[1,2]]);
    expect(uObjects).toEqual([
      [ obj1 ],
      [ obj3 ]
    ]);
  });
});




