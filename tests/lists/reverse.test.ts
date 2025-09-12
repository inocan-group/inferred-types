import { reverse } from "inferred-types/runtime";
import type { Expect, Reverse, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("Reverse a Readonly Array", () => {

  describe("Type Testing", () => {

    it("happy path", () => {
      type FooBarBaz = Reverse<["foo", "bar", "baz"]>;
      type Tup = Reverse<[[1, "foo"], [2, "bar"], [3, "baz"]]>;
      type Counting = Reverse<[1, 2, 3, 4, 5]>;

      type cases = [
            Expect<Test<
                FooBarBaz,
                "equals",
                ["baz", "bar", "foo"]
            >>, //
        Expect<Test<
            Tup,
            "equals",
            [[3, "baz"], [2, "bar"], [1, "foo"]]
        >>,
        Expect<Test<
            Counting,
            "equals",
            [5, 4, 3, 2, 1]>>
      ];
    });

  });

  describe("Runtime tests", () => {

    it("happy path", () => {
      const counting = reverse([1, 2, 3, 4, 5] as const);

      expect(counting).toEqual([5, 4, 3, 2, 1]);
      type cases = [
        Expect<Test<
            typeof counting,
            "equals",
            [5, 4, 3, 2, 1]>>, //

      ];
    });

  });

});
