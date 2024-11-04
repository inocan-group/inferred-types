import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { intersection } from "src/runtime/index";
import { Intersection } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Set Intersection", () => {


  describe("Intersection<A,B, Deref>", () => {
    it("intersecting scalar values", () => {
      type Foo = Intersection<["foo", "bar","blue"], ["foo","baz"]>;
      type All = Intersection<["foo","bar"], ["foo", "bar"]>;
      type None = Intersection<["foo"], ["bar"]>;

      type cases = [
        Expect<Equal<Foo, ["foo"]>>,
        Expect<Equal<All, ["foo", "bar"]>>,
        Expect<Equal<None, []>>,
      ];

      const cases: cases = [ true, true, true ];
    });


    it("intersection objects with deref", () => {
      type One = Intersection<
        [{id: 1; value: "foo"}, {id: 2; value: "bar"}],
        [{id: 1; value: "not-foo"}, {id: 3; value: "blue"}],
        "id"
      >
      type Two = Intersection<
        [{id: 1; value: "foo"}, {id: 2; value: "bar"}],
        [{id: 1; value: "not-foo"}, {id: 2; value: "blue"}],
        "id"
      >

      type cases = [
        Expect<Equal<One, [1]>>,
        Expect<Equal<Two, [1,2]>>,
      ];
      const cases: cases = [
        true, true
      ];
    });


    it("intersection objects with deref and reporting", () => {
      type One = Intersection<
        [{id: 1; value: "foo"}, {id: 2; value: "bar"}],
        [{id: 1; value: "not-foo"}, {id: 3; value: "blue"}],
        "id",
        true
      >
      type ExpectOne = [
        [{id: 1; value: "foo"}],
        [{id: 1; value: "not-foo"}]
      ]

      type cases = [
        Expect<Equal<One, ExpectOne>>,
      ];
      const cases: cases = [
        true
      ];
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


    });
  });
});
