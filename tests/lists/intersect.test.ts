import { Equal, Expect } from "@type-challenges/utils";
import { Intersection } from "src/types/lists";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Set Intersection", () => {
  type IdFoobar1 = { id: 1; foo: "foo"; bar: string };
  type IdFoobar2 = { id: 2; foo: "bar"; bar: string };
  type RGB = { red: string; green: string; blue: string };

  describe("Intersect<A,B> happy path", () => {
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
  
    it("first test", () => {
      
    });
  
  });
  

});
