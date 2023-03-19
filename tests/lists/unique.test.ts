import { Equal, Expect } from "@type-challenges/utils";
import { unique } from "src/runtime/lists/unique";
import { Unique } from "src/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Unique properties in Sets", () => {
  describe("Unique<A,B,Deref>", () => {
    type Scalar1 = [1,2,3,4];
    type Scalar2 = [3,4,5,6];
    type Obj1 = {id: 1; bar: 2};
    type Obj2 = {id: 2; bar: 10};
    type Obj2b = {id: 2; bar: 22};
    type Obj3 = {id: 3; bar: 20};
  
    it("type check: no dereferencing", () => {
      type T1 = Unique<Scalar1, Scalar2>;
      type T2 = Unique<Scalar2, Scalar1>;
      type T3 = Unique<[Obj1,Obj2], [Obj2,Obj3]>;
  
      type cases = [
        Expect<Equal<T1, readonly [ [1,2], [5,6] ]>>,
        Expect<Equal<T2, readonly [ [5,6], [1,2] ]>>,
        // object testing
        Expect<Equal<T3, readonly [ [Obj1], [Obj3] ]>>,
      ];
      
      const cases: cases = [ true, true, true ];
    });

    it("type check: with dereferencing", () => {
      type T1 = Unique<[Obj1,Obj2], [Obj2b,Obj3], "id">;
  
      type cases = [
        Expect<Equal<
          T1, readonly [ 
            [{id:1; bar: 2}], 
            [{id:3; bar:20}] 
          ]
        >>,
      ];
      
      const cases: cases = [ true ];
    });

  });

  describe("unique(a,b,deref)", () => {
    const numArr1 = [1,2,3,4] as const;
    const numArr2 = [3,4,5,6] as const;
  
    it("runtime tests, no dereferencing", () => {
      const [a1,b1] = unique(numArr1, numArr2);
      expect(a1).toEqual([1,2]);
      expect(b1).toEqual([5,6]);
      type cases = [
        Expect<Equal<typeof a1, [1,2]>>, 
        Expect<Equal<typeof b1, [5,6]>>, 
      ];
      const cases: cases = [ true, true ];
    });
  });
  
});
