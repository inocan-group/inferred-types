import { describe, it } from "vitest";
import type { CombinedKeys, Expect, Test } from "inferred-types/types";

describe("CombinedKeys<A,B>", () => {

  it("Happy Path", () => {
    type T1 = CombinedKeys<{ foo: 1; bar: 2; baz: 3 }, { bar: 4; baz: 5; bax: 6 }>;
    type FooBarBaz = CombinedKeys<{ foo: 1; bar: 2 }, { baz: 3 }>;

    type cases = [
      Expect<Test<T1, "hasSameKeys", ["foo", "bar", "baz", "bax"]>>,
      Expect<Test<FooBarBaz, "hasSameKeys", ["foo", "bar", "baz"]>>,
    ];

  });

});
