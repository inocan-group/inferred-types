import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { KeyOf, PublicKeyOf } from "@inferred-types/types";

describe("KeyOf<T> and PublicKeyOf<T>", () => {

  it("Happy Path", () => {
    type FooBarBaz = {_kind: "foo-bar-baz", foo: number; bar: string; baz: boolean};

    type KObj = KeyOf<FooBarBaz>;
    type KPubObj = PublicKeyOf<FooBarBaz>;

    type cases = [
      Expect<Equal<KObj, "_kind" | "foo" | "bar" | "baz">>,
      Expect<Equal<KPubObj, "foo" | "bar" | "baz">>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});
