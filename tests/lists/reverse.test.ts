import { Equal, Expect } from "@type-challenges/utils";
import { reverse } from "inferred-types";
import type { Reverse } from "inferred-types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Reverse a Readonly Array", () => {

  describe("Type Testing", () => {

    it("happy path", () => {
      type FooBarBaz = Reverse<["foo", "bar", "baz"]>;
      type Counting = Reverse<[1,2,3,4,5]>;

      type cases = [
        Expect<Equal<FooBarBaz,  ["baz", "bar", "foo"]>>, //
        Expect<Equal<Counting,  [5,4,3,2,1]>>
      ];
      const cases: cases = [ true, true ];
    });

  });


  describe("Runtime tests", () => {

    it("happy path", () => {
      const counting = reverse([1,2,3,4,5] as const);

      expect(counting).toEqual([5,4,3,2,1]);
      type cases = [
        Expect<Equal<typeof counting,  [5,4,3,2,1]>>, //

      ];
      const cases: cases = [ true ];
    });

  });




});
