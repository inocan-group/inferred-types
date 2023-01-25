import { Equal, Expect } from "@type-challenges/utils";
import { intersection } from "src/runtime/lists/intersection";
import { intoSet } from "src/runtime/lists/intoSet";
import { Intersection } from "src/types/lists";
import { describe, it } from "vitest";

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
    const foo = { foo: 1 } as const;
    const bar = { bar: 55 } as const;
    const baz = { baz: 25 } as const;
  
    it("happy path", () => {
      const t1 = intersection(intoSet([foo, bar]),intoSet([bar, baz]));
      console.log({t1});
      
    });
  
  });
  
  

});
