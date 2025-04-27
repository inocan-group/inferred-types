import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { HasSameValues, Test, Unique } from "inferred-types/types";
import { unique } from "inferred-types/runtime";



describe("Unique properties in Sets", () => {
  describe("Unique<A,B,Deref>", () => {
    type Scalar1 = [1, 2, 3, 4];
    type Scalar2 = [3, 4, 5, 6];
    type Obj1 = { id: 1; bar: 2 };
    type Obj2 = { id: 2; bar: 10 };
    type Obj3 = { id: 3; bar: 20 };

    it("type check: no dereferencing", () => {
      type T0 = Unique<[2, 3, 2, 1]>;
      type T1 = Unique<[...Scalar1, ...Scalar2]>;
      type T2 = Unique<[...Scalar2, ...Scalar1]>;
      type T3 = Unique<[...[Obj1, Obj2], ...[Obj2, Obj3]]>;

      type cases = [
        Expect<Test<T0, "hasSameValues", [2, 3, 1]>>,
        Expect<Test<T1, "hasSameValues", [1, 2, 3, 4, 5, 6]>>,
        Expect<Test<T2, "hasSameValues", [3, 4, 5, 6, 1, 2]>>,
        // object testing
        Expect<Test<T3, "equals", [Obj1, Obj2,  Obj3]>>,
      ];

    });

  });

  describe("unique(a,b,deref)", () => {

    it("runtime", () => {

      const t1 = unique(1, 2, 3, 4, 4, 5, 6, 6, 8);

      expect(t1).toEqual([1, 2, 3, 4, 5, 6, 8]);

      type cases = [
        Expect<Test<typeof t1, "hasSameValues", [1, 2, 3, 4, 5, 6, 8]>>
      ];
    });

  });

});
