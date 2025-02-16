import { Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { CombinedKeys, HasSameKeys } from "inferred-types/types";

describe("CombinedKeys<A,B>", () => {

  it("Happy Path", () => {
    type T1 = CombinedKeys<{ foo: 1; bar: 2; baz: 3 }, { bar: 4; baz: 5; bax: 6 }>;
    type FooBarBaz = CombinedKeys<{ foo: 1; bar: 2 }, { baz: 3 }>;

    type cases = [
      Expect<HasSameKeys<T1, ["foo", "bar", "baz", "bax"]>>,
      Expect<HasSameKeys<FooBarBaz, ["foo", "bar", "baz"]>>,
    ];
    const cases: cases = [true, true];
  });

});
