import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { intersection } from "src/runtime";
import { Intersection } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Set Intersection", () => {
  type Foo = { foo: 1 };
  type Bar = { bar: 55 };
  type Baz = { baz: 25 };

  type IdFoobar1 = { id: 1; foo: "foo"; bar: string };
  type IdFoobar2 = { id: 2; foo: "bar"; bar: string };
  type IdFoobar2alt = { id: 2; value: 55 };
  type IdFoobar3 = { id: 3; foo: "baz"; bar: string };

  describe("Intersect<A,B, Deref>", () => {
    it("happy path", () => {
      type Set1 = readonly ["foo", "bar"];
      type Set2 = readonly ["bar", "baz", 42];
  
      type T1 = Intersection<Set1, Set2>;
      type T2 = Intersection<Set2, Set1>;
      type EmptyA = Intersection<[], Set1>;
      type EmptyB = Intersection<Set1, []>;
  
      type cases = [
        Expect<Equal<T1, readonly ["bar"]>>,
        Expect<Equal<T2, readonly ["bar"]>>,
        Expect<Equal<EmptyA, readonly []>>,
        Expect<Equal<EmptyB, readonly []>>,
      ];
      
      const cases: cases = [ true, true, true, true ];
    });
  
    it("Intersect<Obj,Obj>, no deref", () => {
      type T1 = Intersection<[Foo,Bar], [Bar, Baz]>;
      type T2 = Intersection<[IdFoobar1,IdFoobar2],[IdFoobar2alt, IdFoobar1,IdFoobar3]>;

      type cases = [
        Expect<Equal<T1, readonly [Bar]>>, 
        Expect<Equal<T2, readonly [IdFoobar1]>>, 
      ];
      const cases: cases = [ true, true  ];
    });

    
    it("Intersect<Obj,Obj>, with deref property", () => {
      type IOneAndTwo = Intersection<
        [IdFoobar1,IdFoobar2],
        [IdFoobar2alt, IdFoobar1, IdFoobar3], 
        "id"
      >;
      
      type cases = [
        Expect<Equal<
          IOneAndTwo, 
          [
            [IdFoobar1, IdFoobar2],
            [IdFoobar2alt, IdFoobar1]
          ]
        >>
      ];
      const cases: cases = [ true ];
    });
  });


  describe("Runtime", () => {

    it("scalar arrays passed in; no deref", () => {
      const three = intersection([1,2,3],[3,4,5]);
      const none = intersection([1,2,3],[4,5,6]);
      console.log({result: three});
      
      expect(three).toHaveLength(1); // scalars return a single array
      expect(three).toEqual([3]);
      expect(none).toEqual([]);
    });

    it("array of objects with no deref or shallow deref", () => {
      const one = { id: 1, foo: 1, bar: 45 } as const;
      const oneAlt = { id: 1, bar: 1, baz: 25 } as const;
      const two = { id: 2, foo: 123, bar: 66 } as const;
      const three = { id: 3, foo: 123, bar: 66 } as const;

      // no offset means a single array is returned and it's 
      // comparing on the object as a whole
      const oneTwo = intersection([one], [two]); // no overlap
      expect(oneTwo).toEqual([]);
      const oneOne = intersection([one, two], [one]); // single overlap
      expect(oneOne).toHaveLength(1);
      expect(oneOne).toEqual([ one ]);

      // the more common situation is to deref by a property like
      // "id" which then let's us see how many "id" are found in 
      // both sets
      const oneTwoId = intersection([one, two],[ oneAlt, three ], "id");
      expect(oneTwoId).toHaveLength(2); // tuple
      const [a,b] = oneTwoId;
      expect(a).toEqual([{ id: 1, foo: 1, bar: 45 }]);
      expect(b).toEqual([{ id: 1, bar: 1, baz: 25 }]);

    });
  });
});
