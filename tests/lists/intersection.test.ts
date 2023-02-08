import { Equal, Expect } from "@type-challenges/utils";
import { ifKvTupleArray } from "../../src/runtime/boolean-logic/ifKvTupleArray";
import { fromSet } from "../../src/runtime/lists/fromSet";
import { intersection } from "../../src/runtime/lists/intersection";
import { intoSet } from "../../src/runtime/lists/intoSet";
import { Intersection } from "../../src/types/lists";
import { describe, expect, it } from "vitest";

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
  
    it("Intersect<Obj,Obj>, no offset", () => {
      type T1 = Intersection<[Foo,Bar], [Bar, Baz]>;
      type T2 = Intersection<[IdFoobar1,IdFoobar2],[IdFoobar2alt, IdFoobar1,IdFoobar3]>;

      type cases = [
        Expect<Equal<T1, readonly [Bar]>>, 
        Expect<Equal<T2, readonly [IdFoobar1]>>, 
      ];
      const cases: cases = [ true, true  ];
    });

    
    it("Intersect<Obj,Obj>, with deref", () => {
      type T1 = Intersection<[IdFoobar1,IdFoobar2],[IdFoobar2alt, IdFoobar1,IdFoobar3], "id">;
      
      type cases = [
        Expect<Equal<T1, readonly [IdFoobar1, IdFoobar2, IdFoobar2alt]>>
      ];
      const cases: cases = [ true ];
    });
  });


  describe("Runtime", () => {
    const foobar = { foo: 1, bar: 45 } as const;
    const barBaz = { bar: 1, baz: 25 } as const;

    const sFoobar = intoSet(foobar);
    // identified as a KV array
    const isKvTupleArray = ifKvTupleArray(sFoobar, () => true, () => false);
    expect(isKvTupleArray).toBe(true);
    // should be able to move back to object
    const rFoobar = fromSet(sFoobar);
    expect(rFoobar, "fromSet should have converted back to object").toEqual(foobar);

    const sBarBaz = intoSet(barBaz);
    
    it("happy path", () => {
      // the resultant KV arrays does not intersect
      const empty = intersection(sFoobar, sBarBaz);
      expect(empty, "no intersection expected").toEqual([]);
      // if we deref to the second property of the KV's
      // we then compare on the "keys" (aka, index 1)
      const some = intersection(foobar, barBaz, 1);
      expect(
        some, 'the "bar" property on both arrays expected to match'
      ).toEqual([["KV", "bar", 45], ["KV", "bar", 1]]);

      const isKvArr = ifKvTupleArray(some, () => true, () => false);
      expect(isKvArr).toBe(true);
    });
  });
});
