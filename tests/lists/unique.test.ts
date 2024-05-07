import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {  SameKeys, Unique } from "src/types/index";
import {  unique } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Unique properties in Sets", () => {
  describe("Unique<A,B,Deref>", () => {
    type Scalar1 = [1,2,3,4];
    type Scalar2 = [3,4,5,6];
    type Obj1 = {id: 1; bar: 2};
    type Obj2 = {id: 2; bar: 10};
    type Obj3 = {id: 3; bar: 20};
  
    it("type check: no dereferencing", () => {
      type T0 = Unique<[2,3,2,1]>;
      type T1 = Unique<[...Scalar1, ...Scalar2]>;
      type T2 = Unique<[...Scalar2, ...Scalar1]>;
      type T3 = Unique<[...[Obj1,Obj2], ...[Obj2,Obj3]]>;
  
      type cases = [
        Expect<SameKeys<T0, [2,3,1]>>,
        Expect<SameKeys<T1, [1,2, 3,4,5,6 ]>>,
        Expect<SameKeys<T2, [ 3,4,5,6,1,2 ]>>,
        // object testing
        Expect<Equal<T3, [ Obj1, Obj2, Obj3 ]>>,
      ];
      
      const cases: cases = [ true, true, true, true ];
    });

    
    it("using dereferencing", () => {
      type T = Unique<[...[Obj1,Obj2], ...[Obj2,Obj3]], "id">;
      
      type cases = [
        /** type tests */
      ];
      const cases: cases = [];
      
    });
    

  });

  describe("unique(a,b,deref)", () => {
    
    it("runtime", () => {
      
      const t1 = unique(1,2,3,4,4,5,6,6,8);
  
      expect(t1).toEqual([1,2,3,4,5,6,8]);
  
      type cases = [
        Expect<Equal<typeof t1, [1,2,3,4,5,6,8]>>
      ];
      const cases: cases = [ true ];
    });
    
  });
  
});
