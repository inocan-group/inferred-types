import { Equal, Expect } from "@type-challenges/utils";
import { IntoSet, Unique } from "src/types/lists";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Unique properties in Sets", () => {

  describe("Unique<A,B,Deref>", () => {
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
});
